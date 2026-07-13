import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./event.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import {
  createEventSchema,
  updateEventSchema,
} from "./event.validation.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: College Events APIs
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Event created successfully
 */
router.post(
  "/",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  validate(createEventSchema),
  create
);

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Events fetched successfully
 */
router.get(
  "/",
  authenticate,
  getAll
);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
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
 *         description: Event details
 */
router.get(
  "/:id",
  authenticate,
  getOne
);

/**
 * @swagger
 * /events/{id}:
 *   patch:
 *     summary: Update event
 *     tags: [Events]
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
 *         description: Event updated successfully
 */
router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  validate(updateEventSchema),
  update
);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete event
 *     tags: [Events]
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
 *         description: Event deleted successfully
 */
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  remove
);

export default router;