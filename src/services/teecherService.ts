import { ITeacher } from "../models/teecheModel";
import { authDto } from "../types/authDto";
import Class from "../models/classModel";
export const registerTeacher = async (teacher: ITeacher, className: string) => {
  try {
    const existingClass = await Class.findOne({ name: className });
    if (existingClass) {
      throw new Error(
        "Class name already exists. Please choose a different name."
      );
    }

    const newClass = new Class({
      name: className,
      teacher: teacher._id,
      students: [],
    });

    await newClass.save();

    await teacher.save();
    return teacher;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to register teacher and create class.");
  }
};

export const getMyClassGrades = async (authDto: authDto) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

export const getOneGradeByStudentId = async (authDto: authDto) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

export const addGradeToStudent = async (authDto: authDto) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

export const changeGradeToStudent = async (authDto: authDto) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

export const getAvgGrades = async (authDto: authDto) => {
  try {
  } catch (err) {
    console.log(err);
  }
};
