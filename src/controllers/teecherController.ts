import { Request, Response } from "express";
import { registerTeacher } from "../services/teecherService";
import { addGradeToStudent } from "../services/teecherService";
import {
  getMyClassGrades,
  getOneGradeByStudentId,
  changeGradeToStudent,
  getAvgGrades,
} from "../services/teecherService";

export const registerTeacherController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, className } = req.body;

    if (!name || !email || !password || !className) {
      res.status(400).json({ msg: "All fields are required." });
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

export const getAllMyClassGrades = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //@ts-ignore
    const teacherId = req.user.userId;

    const grades = await getMyClassGrades(teacherId);

    if (!grades) {
      res.status(404).json({ msg: "Class not found for this teacher." });
      return;
    }

    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ msg: "Failed to retrieve class grades." });
  }
};

export const getOneGrade = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id: studentId } = req.params;
  const { gradeId } = req.body;

  try {
    const grade = await getOneGradeByStudentId(studentId, gradeId);

    if (!grade) {
      res.status(404).json({ msg: "Grade not found." });
      return;
    }

    res.status(200).json(grade);
  } catch (err) {
    res.status(500).json({ msg: "Failed to retrieve grade.", err });
  }
};

export const addGrade = async (req: Request, res: Response): Promise<void> => {
  const { id: studentId } = req.params;
  const { subject, score } = req.body;

  try {
    if (!studentId) {
      res.status(400).json({ msg: "Student ID is required." });
    }

    if (!req.user || !req.user.userId) {
      res.status(403).json({ msg: "Unauthorized. No userId found." });
    }
    //@ts-ignore
    const teacherId = req.user.userId;

    const grade = {
      subject,
      score,
      dateEntered: new Date(),
    };

    const updatedStudent = await addGradeToStudent(studentId, teacherId, grade);

    if (!updatedStudent) {
      res.status(404).json({ msg: "Failed to add grade. Student not found." });
    }

    res
      .status(201)
      .json({ msg: "Grade added successfully", student: updatedStudent });
  } catch (err) {
    console.log(err);

    if (!res.headersSent) {
      res.status(500).json({ err });
    }
  }
};

export const changeGrade = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id: studentId } = req.params;
  const { gradeId, newScore } = req.body;

  try {
    const updatedGrade = await changeGradeToStudent(
      studentId,
      gradeId,
      newScore
    );

    if (!updatedGrade) {
      res
        .status(404)
        .json({ msg: "Grade not found or failed to update grade" });
      return;
    }

    res.status(200).json({
      msg: "Grade updated successfully",
      grade: updatedGrade,
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update grade" });
  }
};

export const getEvgGrades = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { classId } = req.params;

    if (!classId) {
      res.status(400).json({ message: "Class ID is required." });
      return;
    }

    const averageGrade = await getAvgGrades(classId);

    if (averageGrade === null) {
      res.status(404).json({ message: "No grades found for this class." });
      return;
    }

    res.status(200).json({ averageGrade });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve average grades." });
  }
};
