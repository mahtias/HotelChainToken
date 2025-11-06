import { ethers } from "ethers";
import { db } from "../db"; // your Drizzle ORM instance
import { payments, vouchers } from "../../shared/schema";

/**
 * Verify a USDC payment on Base and record it in the DB.
 *
 * Improvements over the original:
 * - Filters logs to the USDC contract address to avoid parsing unrelated logs.
 * - Parses logs safely and prefers transfers to `expectedRecipient` if provided.
 * - Uses BigInt-safe handling and ethers.formatUnits to avoid precision loss.
 * - Stores the raw amount as a decimal string (smallest unit) and also returns a human readable amount.
 * - Attempts to map a user by wallet address is left as a placeholder (implement your own lookup).
 *
 * Usage:
 *   await verifyPayment(txHash, { expectedRecipient: "0x...", expectedDecimals: 6 });
 */

const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);

// USDC contract info on Base
const USDC_ADDRESS = (process.env.USDC_ADDRESS || "0x...").toLowerCase();
const USDC_DECIMALS = Number(process.env.USDC_DECIMALS ?? 6); // default 6 for many USDC deployments

const USDC_ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "function balanceOf(address) view returns (uint256)",
];
const usdcInterface = new ethers.Interface(USDC_ABI);

/**
 * verifyPayment
 * @param txHash - transaction hash to verify
 * @param opts.expectedRecipient - optional: require that transfer's `to` equals this address
 */
export async function verifyPayment(
  txHash: string,
  opts?: { expectedRecipient?: string; expectedAmountSmallestUnit?: string }
) {
  try {
    const receipt = await provider.getTransactionReceipt(txHash);
    if (!receipt) {
      console.log("Transaction not mined yet (no receipt)");
      return { ok: false, reason: "not_mined" };
    }

    // In EVM a status of 1 means success; some networks may use boolean/number - handle both
    if ((receipt as any).status !== 1 && (receipt as any).status !== true) {
      console.log("Transaction failed (status != 1)");
      return { ok: false, reason: "tx_failed" };
    }

    // Filter logs that belong to the USDC contract to avoid trying to parse unrelated logs
    const candidateLogs = (receipt.logs || []).filter(
      (l: any) => !!l.address && l.address.toLowerCase() === USDC_ADDRESS
    );

    if (candidateLogs.length === 0) {
      console.log("No USDC contract logs in receipt");
      return { ok: false, reason: "no_usdc_logs" };
    }

    // Transfer topic for quick sanity check
    const transferTopic = ethers.id("Transfer(address,address,uint256)");

    // Parse logs and collect Transfer events
    type TransferEvent = {
      from: string;
      to: string;
      value: bigint;
      rawLog: any;
    };
    const transfers: TransferEvent[] = [];

    for (const raw of candidateLogs) {
      try {
        // parseLog expects the log-like object
        const parsed = usdcInterface.parseLog({ topics: raw.topics, data: raw.data });
        if (parsed && parsed.name === "Transfer") {
          // parsed.args.value may be a BigInt (ethers v6)
          const valueRaw = parsed.args.value;
          // Value could be bigint or string; normalize to bigint
          const valueBigInt =
            typeof valueRaw === "bigint" ? valueRaw : BigInt(valueRaw.toString());
          transfers.push({
            from: parsed.args.from,
            to: parsed.args.to,
            value: valueBigInt,
            rawLog: raw,
          });
        }
      } catch {
        // ignore non-parseable logs
        continue;
      }
    }

    if (transfers.length === 0) {
      console.log("No Transfer events parsed from USDC logs");
      return { ok: false, reason: "no_transfer_events" };
    }

    // Prefer a transfer that matches expectedRecipient if provided
    let chosen: TransferEvent | undefined;
    if (opts?.expectedRecipient) {
      const want = opts.expectedRecipient.toLowerCase();
      chosen = transfers.find((t) => t.to.toLowerCase() === want);
      if (!chosen) {
        console.log("No transfer to expected recipient found");
        // still fall back to first transfer if you want; here we return an error
        return { ok: false, reason: "no_transfer_to_expected_recipient" };
      }
    } else if (opts?.expectedAmountSmallestUnit) {
      const expectedAmountBI = BigInt(opts.expectedAmountSmallestUnit);
      chosen = transfers.find((t) => t.value === expectedAmountBI) ?? transfers[0];
    } else {
      // fallback: take the first Transfer event
      chosen = transfers[0];
    }

    // Convert amount to human readable using decimals
    const amountSmallestUnit = chosen.value.toString(); // raw integer in smallest unit
    const amountHuman = ethers.formatUnits(chosen.value, USDC_DECIMALS);

    // Here you should map chosen.from (wallet address) to a user in your DB.
    // Implement your own lookup; placeholder below:
    let userId: number | null = null;
    try {
      // Example pseudo-code for lookup (uncomment and adapt to your schema)
      // const user = await db.select().from(users).where(users.walletAddress.eq(chosen.from.toLowerCase())).limit(1);
      // if (user?.length) userId = user[0].id;
    } catch (err) {
      // ignore mapping errors for now
    }
    // Insert payment record (store amount as string to avoid JS number issues)
    const insertResult = await db.insert(payments).values({
  userId: userId ?? undefined, // use undefined instead of null for optional columns
  walletAddress: chosen.from,
  bookingId: undefined,         // instead of null
  investmentId: undefined,      // instead of null
  amount: amountSmallestUnit,   // string if column is text()
  amountHuman: amountHuman ?? undefined,
  method: "USDC",
  status: "completed",
  txHash,
  receivedAt: new Date(),
}).returning();


    // Optional: create a voucher (example: 5% of paid amount)
    const discountAmountBI = (chosen.value * 5n) / 100n; // 5% in smallest unit
    const discountAmountNum = Number(discountAmountBI);
    const voucherInsert = await db.insert(vouchers).values({
      code: `USDC-${Date.now()}`,
      discountAmount: discountAmountNum,
      discountPercent: 5,
      maxUsage: 1,
      usedCount: 0,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      isActive: true,
    }).returning();

    console.log("Payment verified:", {
      txHash,
      from: chosen.from,
      to: chosen.to,
      amountSmallestUnit,
    });

    return {
      ok: true,
      txHash,
      payment: insertResult,
      voucher: voucherInsert,
      details: {
        from: chosen.from,
        to: chosen.to,
        amountSmallestUnit,
      },
    };
  } catch (err) {
    console.error("Error verifying payment:", err);
    return { ok: false, reason: "exception", error: String(err) };
  }
}