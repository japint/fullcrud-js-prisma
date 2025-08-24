import { z } from "zod";

// Validation rules for user
export const userSchema = {
  // For creating a new user
  create: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    age: z.number().min(0, "Age must be a positive number").optional(),
  }),

  // For updating an existing user
  update: z.object({
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().email("Invalid email format").optional(),
    age: z.number().min(0, "Age must be a positive number").optional(),
  }),
};
