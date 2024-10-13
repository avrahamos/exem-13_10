import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Teacher from "../models/teecheModel";
import Student from "../models/studentModel";

class AuthService {
  async login(
    email: string,
    password: string
  ): Promise<{ token: string; role: string }> {
    let user = await Teacher.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        { userId: user._id, role: "teacher" },
        process.env.TOKEN_SECRET!,
        { expiresIn: "1h" }
      );

      return { token, role: "teecher" };
    }

    user = await Student.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        { userId: user._id, role: "student" },
        process.env.TOKEN_SECRET!,
        { expiresIn: "1h" }
      );

      return { token, role: "student" };
    }

    throw new Error("User not found");
  }
}

export default new AuthService();
