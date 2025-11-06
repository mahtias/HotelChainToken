// backend/src/controllers/pmsController.ts
import { Request, Response } from "express";
import { ethers } from "ethers";
import { db } from "../db";
import { bookings, payments } from "../../shared/schema";
import { verifyPayment } from "../utils/verifyPayment";
import { issueVoucher } from "../contracts/voucher";
import { eq } from "drizzle-orm";

/**
 * 1. Create a new booking (before payment)
 */

export const handleBooking = async (req: Request, res: Response) => {
  try {
    const { hotelId, userId, checkinDate, checkoutDate } = req.body;

    await db.insert(bookings).values({
      hotelId,
      userId,
      checkinDate: new Date(checkinDate),
      checkoutDate: new Date(checkoutDate),
      status: "pending",
    });

    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Failed to create booking" });
  }
};

export const handleCheckout = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;

    await db.update(bookings)
      .set({ status: "completed" })
      .where(eq(bookings.id, bookingId));

    res.json({ success: true, message: "Booking marked as completed" });
  } catch (error) {
    console.error("Error completing booking:", error);
    res.status(500).json({ success: false, message: "Failed to complete checkout" });
  }
};
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { hotelId, userId, checkinDate, checkoutDate } = req.body;

    if (!hotelId || !userId || !checkinDate || !checkoutDate) {
      return res.status(400).json({ message: "Missing booking details" });
    }

    const [newBooking] = await db
      .insert(bookings)
      .values({
        hotelId: Number(hotelId),
        userId: Number(userId),
        checkinDate: new Date(checkinDate),
        checkoutDate: new Date(checkoutDate),
        status: "pending",
      })
      .returning();

    return res.json({ success: true, booking: newBooking });
  } catch (error) {
    console.error("createBooking error:", error);
    res.status(500).json({ success: false, message: "Failed to create booking" });
  }
};

/**
 *  2. Confirm and record an on-chain payment, then issue a voucher NFT
 */
export const confirmPayment = async (req: Request, res: Response) => {
  try {
    const { txHash, bookingId, userWallet } = req.body as {
      txHash?: string;
      bookingId?: number | string | null;
      userWallet?: string;
    };

    // Basic validation
    if (!txHash || typeof txHash !== "string") {
      return res.status(400).json({ success: false, message: "txHash is required" });
    }
    if (!userWallet || typeof userWallet !== "string" || !ethers.isAddress(userWallet)) {
      return res.status(400).json({ success: false, message: "Valid userWallet address is required" });
    }

    // Verify payment on-chain
    const verified = await verifyPayment(txHash, { expectedRecipient: userWallet });

    // Legacy boolean response support
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

    // Structured verifier response
    if (!verified.ok) {
      const reason = (verified as any).reason || "verification_failed";
      return res.status(400).json({ success: false, message: "Invalid payment", reason });
    }

    const details = (verified as any).details ?? {};
    const amountSmallestUnit: string | null =
      typeof details.amountSmallestUnit === "string" ? details.amountSmallestUnit : null;
    const amountHuman: string | null =
      typeof details.amountHuman === "string" ? details.amountHuman : null;

    // Build DB insert payload
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

    // Issue voucher
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
