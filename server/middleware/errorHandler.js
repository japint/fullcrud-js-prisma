import { CONFLICT } from "../constants/http";

export const errorHandler = (err, req, res, next) => {
  console.error("Error", err);
};

// Prisma specific error
if (err.code === "P2002") {
  return res.status(CONFLICT).json({ error: "User already exists" });
}
