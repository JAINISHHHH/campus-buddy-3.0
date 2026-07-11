import { Router } from "express";

import {
  create,
  getMine,
  read,
  readAll,
} from "./notification.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", create);

router.get("/", getMine);

router.patch("/:id/read", read);

router.patch("/read-all", readAll);

export default router;