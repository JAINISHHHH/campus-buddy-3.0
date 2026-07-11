import { Router } from "express";

import {
  create,
  getAll,
} from "./comment.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import { createCommentSchema } from "./comment.validation.js";

const router = Router({ mergeParams: true });

router.post(
  "/",
  authenticate,
  validate(createCommentSchema),
  create
);

router.get(
  "/",
  authenticate,
  getAll
);

export default router;