import express from "express";
import { postController } from "../controllers/postController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { validate } from "../middleware/validate.js";
import { postSchema } from "../validation/postValidation.js";

const router = express.Router();
// get
router.get("/", asyncHandler(postController.getAll));
router.get(
  "/:id",
  validate({ params: postSchema.params }),
  asyncHandler(postController.getById)
);

// Create, Update, Delete
router.post(
  "/",
  validate({ body: postSchema.create }),
  asyncHandler(postController.create)
);
router.put(
  "/:id",
  validate({ params: postSchema.params, body: postSchema.update }),
  asyncHandler(postController.update)
);

router.delete(
  "/:id",
  validate({ params: postSchema.params }),
  asyncHandler(postController.delete)
);

export default router;
