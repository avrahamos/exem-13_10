import { IStudent } from "../models/studentModel";
import Student from "../models/studentModel";
import Class from "../models/classModel";
import bcrypt from "bcrypt";

export const registerStudent = async (
  studentData: IStudent,
  className: string
) => {
  try {
    const existingClass = await Class.findOne({ name: className });
    if (!existingClass) {
      throw new Error("Class not found. Please provide a valid class.");
    }

    const existingStudent = await Student.findOne({ email: studentData.email });
    if (existingStudent) {
      throw new Error("Student already exists. Please log in.");
    }

    const hashedPassword = await bcrypt.hash(studentData.password, 10);

    const newStudent = new Student({
      name: studentData.name,
      email: studentData.email,
      password: hashedPassword,
      classId: existingClass._id,
      grades: [],
    });

    await newStudent.save();
    //@ts-ignore
    existingClass.students.push(newStudent._id);

    await existingClass.save();

    return newStudent;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to register student.");
  }
};

export const getMyGrades = async (studentId: string) => {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error("Student not found.");
    }

    return student.grades;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to retrieve grades.");
  }
};

export const getMyGradeById = async (studentId: string, gradeId: string) => {
  try {
    const student = await Student.findOne(
      {
        _id: studentId,
        "grades._id": gradeId,
      },
      { "grades.$": 1 }
    );

    if (!student || !student.grades || student.grades.length === 0) {
      throw new Error("Grade not found.");
    }

    return student.grades[0];
  } catch (err) {
    console.log(err);
    throw new Error("Failed to retrieve the grade.");
  }
};
