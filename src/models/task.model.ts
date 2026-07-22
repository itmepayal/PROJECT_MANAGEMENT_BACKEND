import { Document, Schema, Types, model } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  board: Types.ObjectId;
  project: Types.ObjectId;
  workspace: Types.ObjectId;
  column: string;
  assignee?: Types.ObjectId;
  priority: "low" | "medium" | "high" | "urgent";
  dueDate?: Date;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    column: {
      type: String,
      required: true,
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    dueDate: Date,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

taskSchema.index({ board: 1 });
taskSchema.index({ project: 1 });
taskSchema.index({ column: 1 });
taskSchema.index({ assignee: 1 });

taskSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const Task = model<ITask>("Task", taskSchema);
export default Task;
