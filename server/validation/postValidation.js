import { transform, z } from "zod";

export const postSchema = {
  create: z.object({
    title: z.string().min(1, "Title is required").trim(),
    content: z.string().trim().optional(),
    authorId: z
      .string()
      .regex(/^\d+$/, "Author ID must be a number")
      .transform(Number),
    published: z.boolean().optional(),
  }),

  update: z.object({
    title: z.string().min(1, "Title is required").trim().optional(),
    content: z.string().trim().optional(),
    published: z.boolean().optional(),
  }),

  // param validation for routes like /posts/:id
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
  }),
};
