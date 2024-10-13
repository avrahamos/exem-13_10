import { Router } from "express";

const router = Router();

router.post("/register");
router.get("/grades");
router.get("/grade/:id");

export default router;
