import { Document, Schema, model } from "mongoose";

export interface IRole extends Document {
  name: string;
  workspace?: Schema.Types.ObjectId;
  permissions: string[];
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      default: null,
    },
    permissions: [
      {
        type: String,
        required: true,
      },
    ],
    isSystem: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

roleSchema.index({ name: 1, workspace: 1 }, { unique: true });

roleSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const Role = model<IRole>("Role", roleSchema);
export default Role;
