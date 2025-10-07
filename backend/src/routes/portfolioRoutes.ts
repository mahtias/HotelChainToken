import { Router } from "express";
import { portfolioController } from "../controllers/portfolioController";
const router = Router();

// portfolio routes ////

router.post("/", portfolioController.create);
router.get("/", portfolioController.findAll);
router.get("/:id", portfolioController.findById);
router.put("/:id", portfolioController.update);
router.delete("/:id", portfolioController.delete);
/// end portfolio routes ///
export default router;