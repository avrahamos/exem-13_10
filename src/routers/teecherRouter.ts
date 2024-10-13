import { Router } from "express";
import {
  registerTeacherController,
  getAllMyClassGrades,
  addGrade,
  getEvgGrades,
  changeGrade,
  getOneGrade,
} from "../controllers/teecherController";
import { onlyTeachersMiddleware } from "../middlewares/authMiddlewares";

const router = Router();

router.post("/register", registerTeacherController);
router.get("/grades", onlyTeachersMiddleware, getAllMyClassGrades);
router.post("/add-grade/:id", addGrade);
router.get("/avr", onlyTeachersMiddleware, getEvgGrades);
router.put("/change/:id", onlyTeachersMiddleware, changeGrade);
router.get("/grade/:id", onlyTeachersMiddleware, getOneGrade);

export default router;
