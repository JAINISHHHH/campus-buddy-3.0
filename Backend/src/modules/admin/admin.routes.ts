import { Router } from "express";

import {
  dashboard,
  complaints,
  students,
  faculty,
} from "./admin.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const router = Router();

router.use(authenticate);

router.use(
  authorize("ADMIN", "SUPER_ADMIN")
);

router.get(
  "/dashboard",
  dashboard
);

router.get(
  "/complaints",
  complaints
);

router.get(
  "/students",
  students
);

router.get(
  "/faculty",
  faculty
);

export default router;