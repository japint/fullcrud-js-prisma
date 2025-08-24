import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http.js";
import { ZodError } from "zod";
import { handlePrismaError } from "../utils/prismaErrorHandler.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Error caught", err);

  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(BAD_REQUEST).json({
      error: "Validation error",
      details: err.issues.map((e) => ({
        // Use err.issues instead of err.errors
        field: e.path?.join(".") || "unknown",
        message: e.message,
      })),
    });
  }

  // Check if it has ZodError structure (for cases where instanceof fails)
  if (err.issues) {
    return res.status(BAD_REQUEST).json({
      error: "Validation error",
      details: err.issues.map((e) => ({
        field: e.path?.join(".") || "unknown",
        message: e.message,
      })),
    });
  }

  // Prisma specific error handling
  if (err.code && err.code.startsWith("P")) {
    const { status, message, detail } = handlePrismaError(err);
    return res.status(status).json({ error: message, detail });
  }

  // Default
  return res.status(INTERNAL_SERVER_ERROR).json({
    error: "Internal server error",
    detail: err.message || "An unexpected error occurred",
  });
};
