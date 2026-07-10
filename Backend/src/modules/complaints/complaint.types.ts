import { z } from "zod";
import {
  createComplaintSchema,
  updateComplaintStatusSchema,
} from "./complaint.validation.js";

export type CreateComplaintInput = z.infer<
  typeof createComplaintSchema
>;

export type UpdateComplaintStatusInput = z.infer<
  typeof updateComplaintStatusSchema
>;
