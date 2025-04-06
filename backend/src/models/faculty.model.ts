import mongoose, { Schema, Document } from "mongoose";

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export interface Faculty extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  departmentId: mongoose.Types.ObjectId;
  institutionName: string;
  salary: number;
  designation: string;
  gender: Gender;
  isHod: boolean;
  currentAddress: string;
  isVerified: boolean;
  createdAt: Date;
}

const FacultySchema: Schema = new Schema<Faculty>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "An email is required"],
    match: [/\S+@\S+\.\S+/, "Please provide valid email"],
  },
  phone: {
    type: String,
    required: [true, "A phone number is required"],
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    minlength: [8, "Password must be at least 8 characters"],
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: [true, "Department ID is required"],
  },
  institutionName: {
    type: String,
    required: [true, "Institution Name is required"],
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
  },
  designation: {
    type: String,
    required: [true, "Designation is required"],
    enum: [
      "Professor",
      "Associate Professor",
      "Assistant Professor",
      "Lecturer",
    ],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  isHod: {
    type: Boolean,
    default: false,
  },
  currentAddress: {
    type: String,
    required: [true, "Current address is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
