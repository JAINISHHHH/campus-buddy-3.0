import { z } from "zod";

import {
  createEventSchema,
  updateEventSchema,
} from "./event.validation.js";

export type CreateEventInput =
  z.infer<typeof createEventSchema>;

export type UpdateEventInput =
  z.infer<typeof updateEventSchema>;