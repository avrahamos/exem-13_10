import { Router } from "express";
import { registerStudentController } from "../controllers/studentConteoller";

const router = Router();

router.post("/register", registerStudentController);
router.get("/grades");
router.get("/grade/:id");

export default router;
