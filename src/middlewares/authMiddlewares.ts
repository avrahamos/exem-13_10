import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Student from "../models/studentModel";
import Class from "../models/classModel";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: string;
      role: "teacher" | "student";
    };
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ msg: " No token" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      userId: string;
      role: "teacher" | "student";
    };

    if (!decodedToken || !decodedToken.userId) {
      res.status(400).json({ msg: " userId filde" });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Invalid token" });
  }
};

export const onlyTeachersMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.params.studentId) {
      const studentId = req.params.studentId;
      const student = await Student.findById(studentId).populate("classId");

      if (!student) {
        res.status(404).json({ msg: "Student not found." });
        return;
      }

      const classData = student.classId;
      if (!classData) {
        res.status(404).json({ msg: "Class not found." });
        return;
      }

      if (
        req.user &&
        req.user.role === "teacher" &&
        //@ts-ignore
        classData.teacher.toString() === req.user.userId
      ) {
        next();
      } else {
        res.status(403).json({
          msg: "Access denied. You are not the teacher of this class.",
        });
      }
    } else if (req.params.classId) {
      const classId = req.params.classId;
      const classData = await Class.findById(classId);

      if (!classData) {
        res.status(404).json({ msg: "Class not found." });
        return;
      }

      if (
        req.user &&
        req.user.role === "teacher" &&
        classData.teacher.toString() === req.user.userId
      ) {
        next();
      } else {
        res.status(403).json({
          msg: "Access denied. You are not the teacher of this class.",
        });
      }
    } else {
      const classData = await Class.findOne({ teacher: req.user?.userId });

      if (!classData) {
        res.status(404).json({ msg: "Class not found for this teacher." });
        return;
      }

      next();
    }
  } catch (error) {
    res.status(500).json({ msg: "Failed to verify class ownership." });
  }
};

export const onlyStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.user && req.user.role === "student" && req.user.userId) {
      next();
    } else {
      res.status(403).json({ msg: " You can only access your own data." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Failed to verify student" });
  }
};
