import { postServices } from "../services/postServices.js";
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http.js";

export const postController = {
  async getAll(req, res) {
    try {
      const posts = await postServices.getAll();
      res.json(posts);
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const post = await postServices.getById(req.params.id);
      if (!post) return res.status(NOT_FOUND).json({ error: "Post not found" });
      res.json(post);
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { title, authorId } = req.body;
      if (!title || !authorId)
        return res.status(BAD_REQUEST).json({
          error: "Title and authorId are required",
        });

      const post = await postServices.create(req.body);
      res.status(CREATED).json(post);
    } catch (error) {
      if (error.code === "P2003")
        return res.status(BAD_REQUEST).json({ error: "Author not found" });
      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const post = await postServices.update(req.params.id, req.body);
      res.json(post);
    } catch (error) {
      if (error.code === "P2025")
        return res.status(NOT_FOUND).json({ error: "Post not found" });
      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await postServices.delete(req.params.id);
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      if (error.code === "P2025")
        return res.status(NOT_FOUND).json({ error: "Post not found" });
      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },
};
