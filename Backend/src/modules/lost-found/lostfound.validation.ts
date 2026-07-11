import { z } from "zod";

export const createLostFoundSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),

  type: z.enum(["LOST", "FOUND"]),

  location: z
    .string()
    .trim()
    .min(3, "Location is required")
    .max(100),

  imageUrl: z.string().optional(),
});

export const updateLostFoundSchema = z.object({
  title: z.string().trim().min(3).max(100).optional(),

  description: z.string().trim().min(10).max(1000).optional(),

  location: z.string().trim().min(3).max(100).optional(),

  isResolved: z.boolean().optional(),
});