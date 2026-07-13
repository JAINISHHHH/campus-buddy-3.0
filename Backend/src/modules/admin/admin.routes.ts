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

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrator APIs
 */

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 */
router.get(
  "/dashboard",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  dashboard
);

/**
 * @swagger
 * /admin/complaints:
 *   get:
 *     summary: Get all complaints
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Complaint list
 */
router.get(
  "/complaints",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  complaints
);

/**
 * @swagger
 * /admin/students:
 *   get:
 *     summary: Get all students
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student list
 */
router.get(
  "/students",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  students
);

/**
 * @swagger
 * /admin/faculty:
 *   get:
 *     summary: Get all faculty members
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Faculty list
 */
router.get(
  "/faculty",
  authenticate,
 authorize("ADMIN", "SUPER_ADMIN"),
  faculty
);

export default router;