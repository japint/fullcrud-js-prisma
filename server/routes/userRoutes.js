import express from "express";
import { userController } from "../controllers/userController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { validate } from "../middleware/validate.js";
import { userSchema } from "../validation/userValidation.js";

const router = express.Router();
// No validate needed for GET
router.get("/", asyncHandler(userController.getAll));
router.get("/:id", asyncHandler(userController.getById));

// Validate applied for POST & PUT
router.post(
  "/",
  validate(userSchema.create),
  asyncHandler(userController.create)
);
router.put(
  "/:id",
  validate(userSchema.update),
  asyncHandler(userController.update)
);

router.delete("/:id", asyncHandler(userController.delete));

export default router;
