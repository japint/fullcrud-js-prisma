import express from "express";
import { userController } from "../controllers/userController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { validate } from "../middleware/validate.js";
import { userSchema } from "../validation/userValidation.js";

const router = express.Router();
// No validate needed for GET
router.get("/", asyncHandler(userController.getAll));

// validate needed for GetById
router.get(
  "/:id",
  validate({ params: userSchema.params }),
  asyncHandler(userController.getById)
);

// Validate applied for POST & PUT
router.post(
  "/",
  validate({ body: userSchema.create }),
  asyncHandler(userController.create)
);
router.put(
  "/:id",
  validate({ params: userSchema.params, body: userSchema.update }),
  asyncHandler(userController.update)
);

router.delete("/:id", asyncHandler(userController.delete));

export default router;
