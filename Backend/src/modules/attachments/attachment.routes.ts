import { Router } from "express";

import {
  upload,
  getAll,
} from "./attachment.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { upload as multerUpload } from "../../middleware/upload.middleware.js";

const router = Router({ mergeParams: true });

router.post(
  "/",
  authenticate,
  multerUpload.single("image"),
  upload
);

router.get(
  "/",
  authenticate,
  getAll
);

export default router;