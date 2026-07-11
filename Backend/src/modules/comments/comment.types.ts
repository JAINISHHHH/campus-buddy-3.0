import { z } from "zod";
import { createCommentSchema } from "./comment.validation.js";

export type CreateCommentInput = z.infer<
  typeof createCommentSchema
>;