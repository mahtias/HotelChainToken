import {Router} from "express";
import {confirmPayment} from "../controllers/paymentController";

const router = Router();
router.post("/confirm-payment", confirmPayment);
//router.post("/issue-voucher", issueVoucher);

export default router;