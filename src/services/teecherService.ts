import { ITeacher } from "../models/teecheModel";
import { authDto } from "../types/authDto";
import Class from "../models/classModel";
import Teacher from "../models/teecheModel";
import bcrypt from "bcrypt";

export const createClassForTeacher = async (
  teacher: ITeacher,
  className: string
) => {
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
    //@ts-ignore
    teacher.classId = newClass._id;
    await teacher.save();

    return { teacher, newClass };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create class and associate it with teacher.");
  }
};

export const registerTeacher = async (
  teacherData: ITeacher,
  className: string
) => {
  try {
    const existingTeacher = await Teacher.findOne({ email: teacherData.email });
    if (existingTeacher) {
      throw new Error("Teacher already exists. Please log in.");
    }

    const hashedPassword = await bcrypt.hash(teacherData.password, 10);

    const newTeacher = new Teacher({
      name: teacherData.name,
      email: teacherData.email,
      password: hashedPassword,
      students: [],
    });

    const { teacher, newClass } = await createClassForTeacher(
      newTeacher,
      className
    );

    return { teacher, newClass };
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
