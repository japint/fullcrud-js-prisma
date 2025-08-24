import { CREATED, NOT_FOUND } from "../constants/http.js";
import { postServices } from "../services/postServices.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const postController = {
  getAll: asyncHandler(async (req, res) => {
    const posts = await postServices.getAll();
    res.json(posts);
  }),

  getById: asyncHandler(async (req, res) => {
    const post = await postServices.getById(req.params.id);
    if (!post) {
      const err = new Error("Post not found");
      err.status = NOT_FOUND;
      throw err;
    }
    res.json(post);
  }),

  create: asyncHandler(async (req, res) => {
    const post = await postServices.create(req.body);
    res.status(CREATED).json(post);
  }),

  update: asyncHandler(async (req, res) => {
    const post = await postServices.update(req.params.id, req.body);
    res.json(post);
  }),

  delete: asyncHandler(async (req, res) => {
    await postServices.delete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  }),
};
