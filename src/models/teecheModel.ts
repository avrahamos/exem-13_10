import { Document, Schema, model } from "mongoose";
import validator from "validator";

export interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;
  classId: Schema.Types.ObjectId;
  students: Schema.Types.ObjectId[];
}

const teacherSchema = new Schema<ITeacher>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "Invalid email address",
    },
  },
  password: { type: String, required: true },
  classId: { type: Schema.Types.ObjectId, ref: "Class", unique: true },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
});

const Teacher = model<ITeacher>("Teacher", teacherSchema);
export default Teacher;
