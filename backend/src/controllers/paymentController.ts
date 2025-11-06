import { Request, Response } from "express";
import { ethers } from "ethers";
import { db } from "../db";
import { payments } from "../../shared/schema";
import { verifyPayment } from "../utils/verifyPayment";
import { issueVoucher } from "../contracts/voucher";

/**
 * Confirm and record an on-chain payment, then issue a voucher NFT.
 */
export const confirmPayment = async (req: Request, res: Response) => {
  try {
    const { txHash, bookingId, userWallet } = req.body as {
      txHash?: string;
      bookingId?: number | string | null;
      userWallet?: string;
    };

    /** Basic validation */
    if (!txHash || typeof txHash !== "string") {
      return res.status(400).json({ success: false, message: "txHash is required" });
    }
    if (!userWallet || typeof userWallet !== "string" || !ethers.isAddress(userWallet)) {
      return res.status(400).json({ success: false, message: "Valid userWallet address is required" });
    }

    /**  Verify the payment on-chain */
    const verified = await verifyPayment(txHash, { expectedRecipient: userWallet });

    /** Legacy boolean response from verifier (backward compatibility) */
    if (typeof verified === "boolean") {
      if (!verified) {
        return res.status(400).json({ success: false, message: "Invalid payment (verification failed)" });
      }

      const insertData: Record<string, any> = {
        txHash,
        walletAddress: userWallet,
        method: "USDC",
        status: "confirmed",
        receivedAt: new Date(),
      };
      if (bookingId != null) insertData.bookingId = Number(bookingId);

      const inserted = await db.insert(payments).values(insertData as any).returning();

      let voucherId: string | null = null;
      try {
        voucherId = await issueVoucher(userWallet, bookingId ? Number(bookingId) : null);
      } catch (err) {
        console.warn("issueVoucher failed (non-fatal):", err);
      }

      return res.json({ success: true, txHash, payment: inserted, voucherId });
    }

    /** Structured verifier response */
    if (!verified.ok) {
      const reason = (verified as any).reason || "verification_failed";
      return res.status(400).json({ success: false, message: "Invalid payment", reason });
    }

    const details = (verified as any).details ?? {};
   const amountSmallestUnit: string | null =
   typeof details.amountSmallestUnit === "string" ? details.amountSmallestUnit : null;
    const amountHuman: string | null =
   typeof details.amountHuman === "string" ? details.amountHuman : null;

    /** Build DB insert payload */
    const insertPayload: Record<string, any> = {
      txHash,
      walletAddress: userWallet,
      method: "USDC",
      status: "confirmed",
      receivedAt: new Date(),
    };
    if (bookingId != null) insertPayload.bookingId = Number(bookingId);
    if (amountSmallestUnit) insertPayload.amount = amountSmallestUnit;
    if (amountHuman) insertPayload.amountHuman = amountHuman;

    const paymentInserted = await db.insert(payments).values(insertPayload as any).returning();

    /**  Issue voucher (if not already in verifyPayment result) */
   const voucherData = (verified as any).voucher;
let voucherId: number | string | null = null;

if (Array.isArray(voucherData) && voucherData.length > 0) {
  voucherId = voucherData[0].id ?? null;
} else if (voucherData && typeof voucherData === "object" && "id" in voucherData) {
  voucherId = (voucherData as any).id;
} else {
  try {
    voucherId = await issueVoucher(userWallet, bookingId ? Number(bookingId) : null, {
      amountSmallestUnit,
      amountHuman,
      txHash,
    });
  } catch (err) {
    console.warn("issueVoucher failed (non-fatal):", err);
  }
}
    /** Final success response */
    return res.json({
      success: true,
      txHash,
      payment: paymentInserted,
      voucherId,
      details: {
        amountSmallestUnit,
        amountHuman,
      },
    });
  } catch (error) {
    console.error("confirmPayment error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment confirmation failed",
    });
  }
};
