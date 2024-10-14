import { Request, Response } from "express";
import authService from "../services/authService";

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ msg: "Email and password are required" });
    }

    const { token, role } = await authService.login(email, password, res);

    res.status(200).json({
      msg: "Login successful",
      role: role,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const logoutController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.clearCookie("token").status(200).json({
      msg: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({ msg: "Logout failed" });
  }
};
