import {
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http";
import { userService } from "../services/userServices";

export const userController = {
  async getAll(req, res) {
    try {
      const user = await userService.getAll();
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await userService.getById(req.params.id);
      if (!user) {
        return res.status(NOT_FOUND).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        return res
          .status(BAD_REQUEST)
          .json({ error: "Name and email are required" });
      }
      const user = await userService.create(req.body);
      res.status(CREATED).json(user);
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(CONFLICT).json({ error: "User already exists" });
      }
      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const user = await userService.update(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(NOT_FOUND).json({ error: "User not found" });
      }
      if (error.code === "P2002") {
        return res.status(CONFLICT).json({ error: "User already exists" });
      }
      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await userService.delete(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(NOT_FOUND).json({ error: "User not found" });
      }
      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },
};

export default userController;
