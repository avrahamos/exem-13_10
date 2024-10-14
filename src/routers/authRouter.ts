import { Router } from "express";
import {
  loginController,
  logoutController,
} from "../controllers/authController";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "avi@"
 *               password:
 *                 type: string
 *                 example: "password"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid email or password.
 *       500:
 *         description: Internal server error.
 */
router.post("/login", loginController);

/**
 * @swagger
 * /auth/logout:
 *   delete:
 *     summary: Logout in the system
 *     responses:
 *       200:
 *         description: Successfully logged out.
 *       400:
 *         description: Failed to log out.
 *       500:
 *         description: Internal server error.
 */

router.delete("/logout", logoutController);

export default router;
