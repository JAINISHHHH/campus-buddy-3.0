import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./event.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import {
  createEventSchema,
  updateEventSchema,
} from "./event.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  validate(createEventSchema),
  create
);

router.get(
  "/",
  authenticate,
  getAll
);

router.get(
  "/:id",
  authenticate,
  getOne
);

router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  validate(updateEventSchema),
  update
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  remove
);

export default router;