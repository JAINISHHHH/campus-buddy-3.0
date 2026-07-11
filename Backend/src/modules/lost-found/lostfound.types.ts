import { z } from "zod";
import {
  createLostFoundSchema,
  updateLostFoundSchema,
} from "./lostfound.validation.js";

export type CreateLostFoundInput = z.infer<
  typeof createLostFoundSchema
>;

export type UpdateLostFoundInput = z.infer<
  typeof updateLostFoundSchema
>;