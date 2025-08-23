import { z } from "zod";

export const postSchema = {
  create: z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().optional(),
    published: z.boolean().optional(),
    authorId: z.number().int().positive(),
  }),

  update: z.object({
    title: z.string().min(1, "Title is required").optional(),
    content: z.string().optional(),
    published: z.boolean().optional(),
  }),
};
