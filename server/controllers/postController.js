import { postServices } from "../services/postServices.js";
import { BAD_REQUEST, CREATED, NOT_FOUND } from "../constants/http.js";

export const postController = {
  getAll: async (req, res) => {
    const posts = await postServices.getAll();
    res.json(posts);
  },

  getById: async (req, res) => {
    const post = await postServices.getById(req.params.id);
    if (!post) {
      const err = new Error("Post not found");
      err.status = NOT_FOUND;
      throw err;
    }
    res.json(post);
  },

  create: async (req, res) => {
    const { title, authorId } = req.body;
    if (!title || !authorId) {
      const err = new Error("Title and Author ID are required");
      err.status = BAD_REQUEST;
      throw err;
    }
    const post = await postServices.create(req.body);
    res.status(CREATED).json(post);
  },

  update: async (req, res) => {
    const post = await postServices.update(req.params.id, req.body);
    res.json(post);
  },

  delete: async (req, res) => {
    await postServices.delete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  },
};
