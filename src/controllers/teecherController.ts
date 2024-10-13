import { Request, Response } from "express";
import { registerTeacher } from "../services/teecherService";
import { addGradeToStudent } from "../services/teecherService";

export const registerTeacherController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, className } = req.body;

    if (!name || !email || !password || !className) {
      res.status(400).json({ message: "All fields are required." });
    }

    const { teacher, newClass } = await registerTeacher(
      { name, email, password } as any,
      className
    );

    res.status(201).json({
      message: "Teacher registered and class created successfully.",
      teacher,
      class: newClass,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};
export const getAllMyClassGrades = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

export const getOneGrade = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

export const addGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId } = req.params;
    const { subject, score } = req.body;

    if (!subject || !score) {
      res.status(400).json({ message: "Subject and score are required." });
    } else {
      const newGrade = { subject, score, dateEntered: new Date() };
      const updatedStudent = await addGradeToStudent(studentId, newGrade);
      res
        .status(201)
        .json({ message: "Grade added successfully", student: updatedStudent });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const changeGrade = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

export const getEvgGrades = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log(err);
  }
};
