import { Document, Schema, Types, model } from "mongoose";

export type ProjectStatus =
  | "planning"
  | "active"
  | "on_hold"
  | "completed"
  | "cancelled"
  | "archived";

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
  tasks: Types.ObjectId[];
  color?: string;
  status: ProjectStatus;
  progress: number;
  isArchived: boolean;
  archivedAt?: Date;
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

    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],

    color: {
      type: String,
      default: "#6366F1",
    },

    status: {
      type: String,
      enum: [
        "planning",
        "active",
        "on_hold",
        "completed",
        "cancelled",
        "archived",
      ],
      default: "planning",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    archivedAt: {
      type: Date,
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
projectSchema.index({ status: 1 });
projectSchema.index({ isArchived: 1 });

projectSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const Project = model<IProject>("Project", projectSchema);

export default Project;
