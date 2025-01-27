import { Schema, model, Document } from "mongoose";

export interface IClass extends Document {
  name: string;
  teacher: Schema.Types.ObjectId;
  students: Schema.Types.ObjectId[];
}

const classSchema = new Schema<IClass>({
  name: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
});

const Class = model<IClass>("Class", classSchema);
export default Class;
