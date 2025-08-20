import express from "express";
import { userController } from "../controllers/userController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(userController.getAll));
router.get("/:id", asyncHandler(userController.getById));
router.post("/", asyncHandler(userController.create));
router.put("/:id", asyncHandler(userController.update));
router.delete("/:id", asyncHandler(userController.delete));

export default router;
