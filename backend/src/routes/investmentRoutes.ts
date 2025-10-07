import { Router } from "express";
import { investmentController } from "../controllers/investmentController";
const router = Router();

// investment routes ////

router.post("/", investmentController.create);
router.get("/", investmentController.findAll);
router.get("/:id", investmentController.findById);
router.put("/:id", investmentController.update);
router.delete("/:id", investmentController.delete);
/// end investment routes ///
export default router;