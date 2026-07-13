import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./lostfound.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import {
  createLostFoundSchema,
  updateLostFoundSchema,
} from "./lostfound.validation.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Lost & Found
 *   description: Lost and Found Management APIs
 */

/**
 * @swagger
 * /lost-found:
 *   post:
 *     summary: Create a lost or found post
 *     tags: [Lost & Found]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post(
  "/",
  authenticate,
  authorize("STUDENT"),
  validate(createLostFoundSchema),
  create
);

/**
 * @swagger
 * /lost-found:
 *   get:
 *     summary: Get all lost and found posts
 *     tags: [Lost & Found]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Posts fetched successfully
 */
router.get(
  "/",
  authenticate,
  getAll
);

/**
 * @swagger
 * /lost-found/{id}:
 *   get:
 *     summary: Get lost & found post by ID
 *     tags: [Lost & Found]
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
 *         description: Post fetched successfully
 *       404:
 *         description: Post not found
 */
router.get(
  "/:id",
  authenticate,
  getOne
);

/**
 * @swagger
 * /lost-found/{id}:
 *   patch:
 *     summary: Update lost & found post
 *     tags: [Lost & Found]
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
 *         description: Post updated successfully
 */
router.patch(
  "/:id",
  authenticate,
  authorize("STUDENT"),
  validate(updateLostFoundSchema),
  update
);

/**
 * @swagger
 * /lost-found/{id}:
 *   delete:
 *     summary: Delete lost & found post
 *     tags: [Lost & Found]
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
 *         description: Post deleted successfully
 */
router.delete(
  "/:id",
  authenticate,
  authorize("STUDENT"),
  remove
);

export default router;