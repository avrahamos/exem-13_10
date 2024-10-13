import { Document, Schema, model } from "mongoose";

export interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;
  classId: Schema.Types.ObjectId;
}

const teacherSchema = new Schema<ITeacher>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  classId: { type: Schema.Types.ObjectId, ref: "Class", unique: true },
});

const Teacher = model<ITeacher>("Teacher", teacherSchema);
export default Teacher;
