import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),

  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "One uppercase letter required")
    .regex(/[a-z]/, "One lowercase letter required")
    .regex(/[0-9]/, "One number required")
    .regex(/[^A-Za-z0-9]/, "One special character required"),

  role: z.enum([
    "STUDENT",
    "FACULTY",
    "ADMIN",
    "SUPER_ADMIN",
  ]),

  firstName: z.string().min(2),

  lastName: z.string().min(2),

  enrollmentNumber: z.string().min(3),

  semester: z.number().min(1).max(8),

  departmentId: z.string().uuid(),

  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});