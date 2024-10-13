import { Router } from "express";
import {
  getAllMyGrades,
  getOneMyGrade,
  registerStudentController,
} from "../controllers/studentConteoller";
import { onlyStudents } from "../middlewares/authMiddlewares";
import { getMyGradeById } from "../services/studentService";

const router = Router();

router.post("/register", registerStudentController);
router.get("/grades", onlyStudents, getAllMyGrades);
router.get("/grade/:id", onlyStudents, getOneMyGrade);

export default router;
