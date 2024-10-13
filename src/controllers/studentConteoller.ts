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
    res.status(500).json({ err });
  }
};

export const getAllMyGrades = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.body;
    const grades = await getMyGrades(userId);
    if (!grades) {
      res.status(400).json("grades not found");
    }
    res.status(200).json(grades);
  } catch (err) {
    console.log(err);
  }
};

export const getOneMyGrade = async (req: Request, res: Response) => {
  try {
    const studentId: string = req.body;
    const gradeId: string = req.params.id;
    const grade = await getMyGradeById(studentId, gradeId);
    if (!grade) {
      res.status(400).json("grades not found");
    }
    res.status(200).json(grade);
  } catch (err) {
    console.log(err);
  }
};
