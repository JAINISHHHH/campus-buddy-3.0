import { z } from "zod";

export const createCommentSchema = z.object({
  message: z
    .string()
    .trim()
    .min(2, "Comment is required")
    .max(500, "Comment cannot exceed 500 characters"),
});