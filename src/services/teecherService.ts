import { ITeacher } from "../models/teecheModel";
import Class from "../models/classModel";
import Teacher from "../models/teecheModel";
import bcrypt from "bcrypt";
import { IGrade, IStudent } from "../models/studentModel";
import Student from "../models/studentModel";
import { Types } from "mongoose";

const createClassForTeacher = async (teacher: ITeacher, className: string) => {
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

export const getMyClassGrades = async (
  teacherId: string
): Promise<IGrade[] | null> => {
  try {
    const classData = await Class.findOne({ teacher: teacherId }).populate(
      "students"
    );
    if (!classData) {
      return null;
    }

    const allGrades: IGrade[] = [];

    for (const student of classData.students) {
      //@ts-ignore
      for (const grade of student.grades) {
        allGrades.push(grade);
      }
    }

    return allGrades;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to retrieve class grades.");
  }
};

export const getOneGradeByStudentId = async (
  studentId: string,
  gradeId: string
): Promise<IGrade | null> => {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error("Student not found.");
    }
    //@ts-ignore
    const grade = student.grades.id(gradeId);
    if (!grade) {
      throw new Error("Grade not found.");
    }

    return grade;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to retrieve grade.");
  }
};

export const addGradeToStudent = async (
  studentId: string,
  teacherId: string,
  newGrade: IGrade
): Promise<IStudent | null> => {
  try {
    const classData = await Class.findOne({
      teacher: new Types.ObjectId(teacherId),
      students: new Types.ObjectId(studentId),
    });

    if (!classData) {
      throw new Error("Class not found for this student.");
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return null;
    }

    student.grades.push(newGrade);
    await student.save();

    return student;
  } catch (err) {
    console.log("Error:", err);
    throw new Error("Failed to add grade to student.");
  }
};

export const changeGradeToStudent = async (
  studentId: string,
  gradeId: string,
  newScore: number
): Promise<IGrade | null> => {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error("Student not found.");
    }
    //@ts-ignore
    const grade = student.grades.id(gradeId);
    if (!grade) {
      throw new Error("Grade not found.");
    }

    grade.score = newScore;
    await student.save();

    return grade;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to change grade.");
  }
};

export const getAvgGrades = async (classId: string): Promise<number | null> => {
  try {
    const result = await Class.aggregate([
      {
        $match: { _id: new Types.ObjectId(classId) },
      },
      {
        $lookup: {
          from: "students",
          localField: "students",
          foreignField: "_id",
          as: "studentData",
        },
      },
      {
        $unwind: "$studentData",
      },
      {
        $unwind: "$studentData.grades",
      },
      {
        $group: {
          _id: null,
          totalGrades: { $sum: "$studentData.grades.score" },
          numberOfGrades: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          averageGrade: {
            // elif
            $cond: {
              if: { $gt: ["$numberOfGrades", 0] },
              then: { $divide: ["$totalGrades", "$numberOfGrades"] },
              else: null,
            },
          },
        },
      },
    ]);

    if (result.length > 0) {
      return result[0].averageGrade;
    }

    return null;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to calculate average grades.");
  }
};
