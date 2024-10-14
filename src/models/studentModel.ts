import { Schema, model, Document } from "mongoose";
import validator from "validator";

export interface IGrade {
  subject: string;
  score: number;
  dateEntered: Date;
}

export interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  classId: Schema.Types.ObjectId;
  grades: IGrade[];
}

const gradeSchema = new Schema<IGrade>({
  subject: { type: String, required: true },
  score: { type: Number, required: true },
  dateEntered: { type: Date, default: Date.now },
});

const studentSchema = new Schema<IStudent>({
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
  classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  grades: [gradeSchema],
});

const Student = model<IStudent>("Student", studentSchema);
export default Student;
