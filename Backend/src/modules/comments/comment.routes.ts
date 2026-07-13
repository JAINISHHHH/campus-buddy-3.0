import { Router } from "express";

import {
  create,
  getAll,
} from "./comment.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import { createCommentSchema } from "./comment.validation.js";

const router = Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Complaint Comments APIs
 */

/**
 * @swagger
 * /complaints/{id}/comments:
 *   post:
 *     summary: Add comment to a complaint
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 example: We are investigating this issue.
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       404:
 *         description: Complaint not found
 */
router.post(
  "/",
  authenticate,
  validate(createCommentSchema),
  create
);

/**
 * @swagger
 * /complaints/{id}/comments:
 *   get:
 *     summary: Get all comments of a complaint
 *     tags: [Comments]
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
 *         description: List of comments
 */
router.get(
  "/",
  authenticate,
  getAll
);

export default router;