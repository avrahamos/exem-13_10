import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Teacher from "../models/teecheModel";
import Student from "../models/studentModel";
import { Response } from "express";

class AuthService {
  async login(
    email: string,
    password: string,
    res: Response
  ): Promise<{ token: string; role: string }> {
    const processLogin = async (user: any, role: string) => {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        { userId: user._id, role },
        process.env.TOKEN_SECRET!,
        { expiresIn: "1h" }
      );

      res.cookie("token", token);

      return { token, role };
    };

    let user = await Teacher.findOne({ email });
    if (user) {
      return processLogin(user, "teacher");
    }

    user = await Student.findOne({ email });
    if (user) {
      return processLogin(user, "student");
    }

    throw new Error("User not found");
  }
}

export default new AuthService();
