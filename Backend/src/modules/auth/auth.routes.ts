import { Router } from "express";
import { register, login } from "./auth.controller.js";
import {
  registerSchema,
  loginSchema,
} from "./auth.validation.js";
import { validate } from "../../middleware/validate.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User Authentication APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new student
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - enrollmentNumber
 *               - semester
 *               - departmentId
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Jainish
 *               lastName:
 *                 type: string
 *                 example: Patel
 *               email:
 *                 type: string
 *                 example: jainish@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *               role:
 *                 type: string
 *                 example: STUDENT
 *               enrollmentNumber:
 *                 type: string
 *                 example: 22CE002
 *               semester:
 *                 type: integer
 *                 example: 6
 *               departmentId:
 *                 type: string
 *                 example: 0a6e2d8e-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 *               phone:
 *                 type: string
 *                 example: 9876543210
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: Email already exists
 */
router.post(
  "/register",
  validate(registerSchema),
  register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: jainish@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */
router.post(
  "/login",
  validate(loginSchema),
  login
);

export default router;