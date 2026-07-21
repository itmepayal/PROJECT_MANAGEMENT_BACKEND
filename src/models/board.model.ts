import { Document, Schema, Types, model } from "mongoose";

export interface IBoard extends Document {
  name: string;
  workspace: Types.ObjectId;
  project: Types.ObjectId;
  description?: string;
  type: "kanban" | "scrum";
  columns: string[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const boardSchema = new Schema<IBoard>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["kanban", "scrum"],
      default: "kanban",
    },
    columns: {
      type: [String],
      default: ["Backlog", "Todo", "In Progress", "Review", "Done"],
    },
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

boardSchema.index({ project: 1 });
boardSchema.index({ workspace: 1 });

boardSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const Board = model<IBoard>("Board", boardSchema);
export default Board;
