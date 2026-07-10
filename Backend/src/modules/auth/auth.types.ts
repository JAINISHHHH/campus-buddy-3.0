import { z } from "zod";
import { registerSchema } from "./auth.validation.js";

export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginInput = {
  email: string;
  password: string;
};