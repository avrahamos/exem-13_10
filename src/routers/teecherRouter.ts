import { Router } from "express";
import { registerTeacherController } from "../controllers/teecherController";

const router = Router();

router.post("/register", registerTeacherController);
router.get("/grades");
router.post("/add-grade/:id");
router.get("/avr");
router.put("/change/:id");
router.get("/grade/:id");

export default router;
