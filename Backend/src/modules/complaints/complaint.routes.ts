import { Router } from "express";
import {
  create,
  getMy,
  getOne,
} from "./complaint.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import {
  createComplaintSchema,
} from "./complaint.validation.js";

const router = Router();

/**
 * Student Routes
 */

// Create Complaint
router.post(
  "/",
  authenticate,
  authorize("STUDENT"),
  validate(createComplaintSchema),
  create
);

// Get My Complaints
router.get(
  "/",
  authenticate,
  authorize("STUDENT"),
  getMy
);

// Get Complaint by ID
router.get(
  "/:id",
  authenticate,
  authorize("STUDENT"),
  getOne
);

export default router;