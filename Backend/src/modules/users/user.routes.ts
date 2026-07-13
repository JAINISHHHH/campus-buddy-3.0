import { Router } from "express";

import { me } from "./user.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User APIs
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current logged in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user details
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/me",
  authenticate,
  me
);

export default router;