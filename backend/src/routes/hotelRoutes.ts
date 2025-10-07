import { Router } from "express";
import { hotelController } from "../controllers/hotelController";
const router = Router();

// hotel routes ////
router.post("/", hotelController.create);
router.get("/", hotelController.findAll);
router.get("/:id", hotelController.findById);
router.put("/:id", hotelController.update);
router.delete("/:id", hotelController.delete);

/// end hotel routes ///

export default router;