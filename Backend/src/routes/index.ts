import { Router } from "express";

import { authRoutes } from "../modules/auth/index.js";
import { userRoutes } from "../modules/users/index.js";
import { complaintRoutes } from "../modules/complaints/index.js";
import { adminRoutes } from "../modules/admin/index.js";

const router = Router();

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/complaints", complaintRoutes);

router.use("/admin", adminRoutes);

export default router;