import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Error", err);

  // Prisma specific error handling
  if (err.code === "P2002") {
    return res.status(CONFLICT).json({ error: "unique constraint failed" });
  }

  if (err.code === "P2025") {
    return res.status(NOT_FOUND).json({ error: "Record not found" });
  }

  if (err.code === "P2003") {
    return res
      .status(CONFLICT)
      .json({ error: "Foreign key constraint failed" });
  }

  // Default
  res.status(err.status || INTERNAL_SERVER_ERROR).json({
    error: err.message || "Internal server error",
  });
};
