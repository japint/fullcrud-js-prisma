import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http.js";

export const handlePrismaError = (error) => {
  if (error.code) {
    switch (error.code) {
      case "P2002":
        return {
          status: BAD_REQUEST,
          message: "Unique constraint failed (e.g., email already exists)",
        };
      case "P2025":
        return { status: NOT_FOUND, message: "Record not found" };
      case "P2003":
        return {
          status: BAD_REQUEST,
          message:
            "Foreign key constraint failed (e.g., related record not found)",
        };
      default:
        return { status: INTERNAL_SERVER_ERROR, message: error.message };
    }
  }
  // Fallback for non-Prisma errors
  return {
    status: INTERNAL_SERVER_ERROR,
    message: "Unexpected error",
    detail: error.message,
  };
};
