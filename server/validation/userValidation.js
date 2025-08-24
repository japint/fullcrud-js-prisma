import { z } from "zod";

// Validation rules for user
export const userSchema = {
  // For creating a new user
  create: z.object({
    name: z.string().min(1, "Name is required").trim(),
    email: z.string().email("Invalid email format").trim(), // REMOVE .toLowerCase()
    age: z
      .union([z.string(), z.number()])
      .transform((val) => (val === "" ? null : Number(val)))
      .refine((val) => val === null || val > 0, "Age must be positive")
      .optional(),
  }),

  // For updating an existing user
  update: z.object({
    name: z.string().min(1, "Name is required").trim().optional(),
    email: z.string().email("Invalid email format").trim().optional(), // REMOVE .toLowerCase()
    age: z
      .union([z.string(), z.number()])
      .transform((val) => (val === "" ? null : Number(val)))
      .refine((val) => val === null || val > 0, "Age must be positive")
      .optional(),
  }),

  // param validation for routes like /users/:id
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
};
