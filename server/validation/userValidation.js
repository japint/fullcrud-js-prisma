import { z } from "zod";

// Validation rules for user
export const userSchema = {
  // For creating a new user
  create: z.object({
    name: z.string().min(1, "Name is required").trim(),
    email: z.string().email("Invalid email format").trim().toLowerCase(),
    age: z.number().int().positive().optional(),
  }),

  // For updating an existing user
  update: z.object({
    name: z.string().min(1, "Name is required").trim().optional(),
    email: z
      .string()
      .email("Invalid email format")
      .trim()
      .toLowerCase()
      .optional(),
    age: z.number().int().positive().optional(),
  }),

  // param validation for routes like /users/:id
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
};
