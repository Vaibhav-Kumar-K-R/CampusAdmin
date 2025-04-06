import mongoose, { Schema, Document } from "mongoose";

export interface Department extends Document {
  name: string;
  description: string;
  institutionName: String;
  departmentCode: string;
  isActive: boolean;
  startDate: Date;
  location: string;
  createdAt: Date;
}

const departmentSchema: Schema = new Schema<Department>(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      trim: true,
    },
    description: {
      type: String,
      maxlength: 200,
      trim: true,
      required: [true, "Description is required"],
    },
    institutionName: {
      type: String,
      required: [true, "Institution Name is required"],
    },
    departmentCode: {
      type: String,
      required: [true, "Department code is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
  },
  { timestamps: true },
);

const DepartmentModel = mongoose.model<Department>(
  "Department",
  departmentSchema,
);
