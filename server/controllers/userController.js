import { BAD_REQUEST, CREATED, NOT_FOUND } from "../constants/http.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { userServices } from "../services/userServices.js";

export const userController = {
  getAll: asyncHandler(async (req, res) => {
    const user = await userServices.getAll();
    res.json(user);
  }),

  getById: asyncHandler(async (req, res) => {
    const user = await userServices.getById(req.params.id);
    if (!user) {
      const err = new Error("User not found");
      err.status = NOT_FOUND;
      throw err;
    }
    res.json(user);
  }),

  create: asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
      const err = new Error("Name and email are required");
      err.status = BAD_REQUEST;
      throw err;
    }
    const user = await userServices.create(req.body);
    res.status(CREATED).json(user);
  }),

  update: asyncHandler(async (req, res) => {
    const user = await userServices.update(req.params.id, req.body);
    res.json(user);
  }),

  delete: asyncHandler(async (req, res) => {
    await userServices.delete(req.params.id);
    res.json({ message: "User deleted successfully" });
  }),
};
