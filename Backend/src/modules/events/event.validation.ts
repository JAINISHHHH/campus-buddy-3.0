import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().trim().min(3).max(100),

  description: z.string().trim().min(10).max(3000),

  eventType: z.enum([
    "TECHNICAL",
    "CULTURAL",
    "SPORTS",
    "WORKSHOP",
    "SEMINAR",
    "OTHER",
  ]),

  venue: z.string().trim().min(3).max(100),

  bannerUrl: z.string().optional(),

  startDate: z.string().datetime(),

  endDate: z.string().datetime(),

  registrationDeadline: z.string().datetime(),

  capacity: z.number().int().positive(),

  organizer: z.string().trim().min(3).max(100),
});

export const updateEventSchema =
  createEventSchema.partial();