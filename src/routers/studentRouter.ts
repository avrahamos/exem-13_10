import { Router } from "express";
import {
  getAllMyGrades,
  getOneMyGrade,
  registerStudentController,
} from "../controllers/studentConteoller";
import { authMiddleware, onlyStudents } from "../middlewares/authMiddlewares";

const router = Router();

/**
 * @swagger
 * /student/register:
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
 *         description: Student registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", registerStudentController);

/**
 * @swagger
 * /student/grades:
 *   get:
 *     responses:
 *       200:
 *         description: List of all grades for the student
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
 *                   dateEntered:
 *                     type: string
 *                     format: date
 *       401:
 *         description: Unauthorized - student not authenticated
 *       403:
 *         description: Forbidden - access denied
 */
router.get("/grades", authMiddleware, onlyStudents, getAllMyGrades);

/**
 * @swagger
 * /student/grade/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the specific grade details for the authenticated student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subject:
 *                   type: string
 *                 score:
 *                   type: number
 *                 dateEntered:
 *                   type: string
 *                   format: date
 *       401:
 *         description: Unauthorized - student not authenticated
 *       403:
 *         description: Forbidden - the student is trying to access another student's data
 *       404:
 *         description: Grade not found
 */

router.get("/grade/:id", authMiddleware, onlyStudents, getOneMyGrade);

export default router;
