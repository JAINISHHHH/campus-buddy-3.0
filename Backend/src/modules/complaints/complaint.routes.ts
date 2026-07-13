import { Router } from "express";

import {
  create,
  getMy,
  getOne,
  updateStatus,
  remove,
} from "./complaint.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import { commentRoutes } from "../comments/index.js";

import {
  createComplaintSchema,
  updateComplaintStatusSchema,
} from "./complaint.validation.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Complaints
 *   description: Complaint Management APIs
 */

/**
 * @swagger
 * /complaints:
 *   post:
 *     summary: Create a complaint
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Complaint submitted successfully
 */
router.post(
  "/",
  authenticate,
  authorize("STUDENT"),
  validate(createComplaintSchema),
  create
);

/**
 * @swagger
 * /complaints:
 *   get:
 *     summary: Get logged in student's complaints
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Complaint list
 */
router.get(
  "/",
  authenticate,
  authorize("STUDENT"),
  getMy
);

/**
 * @swagger
 * /complaints/{id}:
 *   get:
 *     summary: Get complaint by ID
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Complaint details
 *       404:
 *         description: Complaint not found
 */
router.get(
  "/:id",
  authenticate,
  authorize("STUDENT"),
  getOne
);

/**
 * @swagger
 * /complaints/{id}/status:
 *   patch:
 *     summary: Update complaint status
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Complaint status updated
 */
router.patch(
  "/:id/status",
  authenticate,
  authorize(
    "ADMIN",
    "FACULTY",
    "SUPER_ADMIN"
  ),
  validate(updateComplaintStatusSchema),
  updateStatus
);

/**
 * @swagger
 * /complaints/{id}:
 *   delete:
 *     summary: Delete complaint
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Complaint deleted
 */
router.delete(
  "/:id",
  authenticate,
  authorize("STUDENT"),
  remove
);

router.use(
  "/:id/comments",
  commentRoutes
);

export default router;