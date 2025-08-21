import { INTERNAL_SERVER_ERROR } from "../constants/http.js";
import { handlePrismaError } from "../utils/prismaErrorHandler.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Error caught", err);

  // Prisma specific error handling
  if (err.code && err.code.startsWith("P")) {
    const { status, message, detail } = handlePrismaError(err);
    return res.status(status).json({ error: message, detail });
  }

  // Default
  res.status(INTERNAL_SERVER_ERROR).json({
    error: "Internal server error",
    detail: err.message || "An unexpected error occurred",
  });
};
