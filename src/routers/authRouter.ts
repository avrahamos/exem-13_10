import { Router } from "express";
import {
  loginController,
  logoutController,
} from "../controllers/authController";

const router = Router();

router.post("/login", loginController);
router.delete("/logout", logoutController);

export default router;
