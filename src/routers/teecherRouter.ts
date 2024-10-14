import { Router } from "express";
import {
  registerTeacherController,
  getAllMyClassGrades,
  addGrade,
  getEvgGrades,
  changeGrade,
  getOneGrade,
} from "../controllers/teecherController";
import {
  authMiddleware,
  onlyTeachersMiddleware,
} from "../middlewares/authMiddlewares";

const router = Router();

/**
 * @swagger
 * /teecher/register:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               className:
 *                 type: string
 *     responses:
 *       200:
 *         description: Teacher registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", registerTeacherController);

/**
 * @swagger
 * /teecher/grades:
 *   get:
 *     responses:
 *       200:
 *         description: List of all grades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   subject:
 *                     type: string
 *                   score:
 *                     type: number
 *       403:
 *         description: Unauthorized access
 */
router.get(
  "/grades",
  authMiddleware,
  onlyTeachersMiddleware,
  getAllMyClassGrades
);

/**
 * @swagger
 * /teecher/add-grade/{id}:
 *   post:
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
 *             properties:
 *               subject:
 *                 type: string
 *               score:
 *                 type: number
 *     responses:
 *       200:
 *         description: Grade added successfully
 *       400:
 *         description: Invalid data
 */
router.post("/add-grade/:id", authMiddleware, onlyTeachersMiddleware, addGrade);

/**
 * @swagger
 * /teecher/avr/{classId}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Average grade retrieved
 *       403:
 *         description: Unauthorized access
 */
router.get(
  "/avr/:classId",
  authMiddleware,
  onlyTeachersMiddleware,
  getEvgGrades
);

/**
 * @swagger
 * /teecher/change/{id}:
 *   put:
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
 *             properties:
 *               newScore:
 *                 type: number
 *     responses:
 *       200:
 *         description: Grade updated successfully
 *       400:
 *         description: Invalid data
 */
router.put("/change/:id", authMiddleware, onlyTeachersMiddleware, changeGrade);

/**
 * @swagger
 * /teecher/grade/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grade retrieved successfully
 *       404:
 *         description: Grade not found
 */
router.get("/grade/:id", authMiddleware, onlyTeachersMiddleware, getOneGrade);

export default router;
