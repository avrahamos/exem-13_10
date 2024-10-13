import { Request, Response } from "express";
import { registerTeacher } from "../services/teecherService";
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
const getAllMyClassGrades = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

const getOneGrade = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

const addGrade = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log(err);
  }
};
const changeGrade = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

const getEvgGrades = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log(err);
  }
};
