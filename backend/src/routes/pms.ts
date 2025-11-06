import { Router } from "express";
import { handleBooking, handleCheckout, createBooking, confirmPayment} from "../controllers/pmsController";

const router = Router();
// Webhooks (x402 → backend)
router.post("/webhook/booking", handleBooking);
router.post("/webhook/checkout", handleCheckout);

// User actions (frontend → backend)
router.post("/book", createBooking);
router.post("/confirm", confirmPayment);

export default router;
