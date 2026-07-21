import { Document, Schema, Types, model } from "mongoose";

export interface IProjectMember {
  user: Types.ObjectId;
  role: Types.ObjectId;
  joinedAt: Date;
}

export interface IProject extends Document {
  name: string;
  description?: string;
  workspace: Types.ObjectId;
  owner: Types.ObjectId;
  members: IProjectMember[];
  color?: string;
  status: "active" | "completed" | "archived";
  startDate?: Date;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: Schema.Types.ObjectId,
          ref: "Role",
          required: true,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    color: {
      type: String,
      default: "#6366F1",
    },
    status: {
      type: String,
      enum: ["active", "completed", "archived"],
      default: "active",
    },
    startDate: Date,
    dueDate: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

projectSchema.index({ workspace: 1 });
projectSchema.index({ owner: 1 });
projectSchema.index({ "members.user": 1 });

projectSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const Project = model<IProject>("Project", projectSchema);
export default Project;
