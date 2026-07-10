import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { me } from "./user.controller.js";

const router = Router();

router.get("/me", authenticate, me);

export default router;