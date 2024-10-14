import { Request, Response } from "express";
import {
  getMyGrades,
  registerStudent,
  getMyGradeById,
} from "../services/studentService";

export const registerStudentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, className } = req.body;

    if (!name || !email || !password || !className) {
      res.status(400).json({ message: "All fields are required." });
    }

    const student = await registerStudent(
      { name, email, password } as any,
      className
    );

    res.status(201).json({
      message: "Student registered successfully and added to class.",
      student,
    });
  } catch (err) {
    console.error("Validation Error:", err);
    res.status(500).json({ message: err || "Server error" });
  }
};

export const getAllMyGrades = async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.userId;
    const grades = await getMyGrades(studentId!);

    res.status(200).json(grades);
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const getOneMyGrade = async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.userId;
    const { id: gradeId } = req.params;

    const grade = await getMyGradeById(studentId!, gradeId);
    res.status(200).json(grade);
  } catch (err) {
    res.status(500).json({ err });
  }
};
