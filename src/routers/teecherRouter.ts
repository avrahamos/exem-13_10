import { Router } from "express";

const router = Router();

router.post("/register");
router.get("/grades");
router.post("/add-grade/:id");
router.get("/avr");
router.put("/change/:id");
router.get("/grade/:id");

export default router;
