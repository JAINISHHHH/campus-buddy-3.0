import { z } from "zod";

export const createComplaintSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description cannot exceed 1000 characters"),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "URGENT",
  ]),

  categoryId: z
    .string()
    .uuid("Invalid Category ID"),
});

export const updateComplaintStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "ASSIGNED",
    "IN_PROGRESS",
    "RESOLVED",
    "CLOSED",
  ]),
});

export const complaintIdSchema = z.object({
  id: z.string().uuid("Invalid Complaint ID"),
});