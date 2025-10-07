import { Router } from "express";
import { userController } from "../controllers/userController";

const router = Router();
/// user routes ////
router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/:id", userController.findById);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

/// end user routes ///







export default router;
