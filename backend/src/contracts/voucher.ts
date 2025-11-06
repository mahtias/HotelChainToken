// backend/contracts/voucher.ts
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const RPC_URL = process.env.BASE_SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.VOUCHER_CONTRACT_ADDRESS;

if (!RPC_URL || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
  throw new Error(" Missing required environment variables for voucher contract.");
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const VOUCHER_ABI = [
  "function issueVoucher(address recipient, uint256 bookingId, uint256 amount) external returns (uint256)",
  "function getVoucher(uint256 id) view returns (address owner, uint256 amount, uint256 bookingId)",
];

export const voucherContract = new ethers.Contract(CONTRACT_ADDRESS, VOUCHER_ABI, signer);

/**
 * Issues a voucher NFT / token for a specific booking.
 *
 * @param walletAddress - Recipient wallet
 * @param bookingId - Related booking ID
 * @param extra - Optional info (for logging / on-chain amount conversion)
 * @returns voucherId (on-chain tokenId or simulated ID)
 */
export async function issueVoucher(
  walletAddress: string,
  bookingId: number | null = null,
  extra?: {
    amountSmallestUnit?: string | null;
    amountHuman?: string | null;
    txHash?: string;
  }
): Promise<string> {
  try {
    if (!ethers.isAddress(walletAddress)) {
      throw new Error("Invalid recipient wallet address");
    }

    // Parse amount (default to 0 if missing)
    const amount = extra?.amountSmallestUnit ? BigInt(extra.amountSmallestUnit) : 0n;
    const booking = bookingId ?? 0;

    console.log(" Issuing voucher on-chain:", {
      walletAddress,
      bookingId: booking,
      amount: amount.toString(),
      txHash: extra?.txHash,
    });

    const tx = await voucherContract.issueVoucher(walletAddress, booking, amount);
    console.log(" Waiting for tx:", tx.hash);

    const receipt = await tx.wait();
    const event = receipt?.logs
      .map((log: { topics: ReadonlyArray<string>; data: string; }) => {
        try {
          return voucherContract.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find((e: { name: string; }) => e && e.name === "VoucherIssued");

    const voucherId =
      event?.args?.voucherId?.toString() ??
      (receipt?.logs?.length ? `${receipt.logs[0].logIndex}` : `voucher_${Date.now()}`);

    console.log(" Voucher issued:", voucherId);
    return voucherId;
  } catch (error) {
    console.error(" issueVoucher failed:", error);
    throw new Error("Voucher issuance failed");
  }
}
