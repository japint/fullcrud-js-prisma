import express from "express";
import { postController } from "../controllers/postController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(postController.getAll));
router.get("/:id", asyncHandler(postController.getById));
router.post("/", asyncHandler(postController.create));
router.put("/:id", asyncHandler(postController.update));
router.delete("/:id", asyncHandler(postController.delete));

export default router;
