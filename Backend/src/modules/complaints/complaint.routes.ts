import { Router } from "express";

import {
  create,
  getMy,
  getOne,
  updateStatus,
  remove,
} from "./complaint.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import { commentRoutes } from "../comments/index.js";

import {
  createComplaintSchema,
  updateComplaintStatusSchema,
} from "./complaint.validation.js";

import { attachmentRoutes } from "../attachments/index.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("STUDENT"),
  validate(createComplaintSchema),
  create
);

router.get(
  "/",
  authenticate,
  authorize("STUDENT"),
  getMy
);

router.get(
  "/:id",
  authenticate,
  authorize("STUDENT"),
  getOne
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("ADMIN", "FACULTY", "SUPER_ADMIN"),
  validate(updateComplaintStatusSchema),
  updateStatus
);

router.delete(
  "/:id",
  authenticate,
  authorize("STUDENT"),
  remove
);

router.use(
  "/:id/comments",
  commentRoutes
);

router.use(
  "/:id/attachments",
  attachmentRoutes
);

export default router;