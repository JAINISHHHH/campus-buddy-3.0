import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./lostfound.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import {
  createLostFoundSchema,
  updateLostFoundSchema,
} from "./lostfound.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("STUDENT"),
  validate(createLostFoundSchema),
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
  authorize("STUDENT"),
  validate(updateLostFoundSchema),
  update
);

router.delete(
  "/:id",
  authenticate,
  authorize("STUDENT"),
  remove
);

export default router;