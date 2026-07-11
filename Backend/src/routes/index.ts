import { Router } from "express";

import { authRoutes } from "../modules/auth/index.js";
import { userRoutes } from "../modules/users/index.js";
import { complaintRoutes } from "../modules/complaints/index.js";
import { adminRoutes } from "../modules/admin/index.js";
import { lostFoundRoutes } from "../modules/lost-found/index.js";

const router = Router();

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/complaints", complaintRoutes);

router.use("/admin", adminRoutes);

router.use("/lost-found", lostFoundRoutes);

export default router;