import { CONFLICT, NOT_FOUND } from "../constants/http";

export const errorHandler = (err, req, res, next) => {
  console.error("Error", err);
};

// Prisma specific error
if (err.code === "P2002") {
  return res.status(CONFLICT).json({ error: "unique constraint failed" });
}

if (err.code === "P2025") {
  return res.status(NOT_FOUND).json({ error: "Record not found" });
}

if (err.code === "P2003") {
  return res.status(CONFLICT).json({ error: "Foreign key constraint failed" });
}

// Default
res.status(err.status || 500).json({
  error: err.message || "Internal server error",
});
