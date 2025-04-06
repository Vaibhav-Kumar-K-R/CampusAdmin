import mongoose, { Schema, Document } from "mongoose";

export interface InstitutionAdmin extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  super_admin: boolean;
  institutionName: string;
  institutionWebsite?: string;
  isVerified: boolean;
  createdAt: Date;
}

const InstitutionAdminSchema: Schema = new Schema<InstitutionAdmin>({
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
    required: [true, "A phone number is required"],
    minlength: [8, "Password must be atleast 8 characters"],
  },
  super_admin: {
    type: Boolean,
    unique: true,
    default: false,
  },
  institutionName: {
    type: String,
    required: [true, "Institution Name is required"],
  },
  institutionWebsite: {
    type: String,
    required: false,
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

InstitutionAdminSchema.pre<InstitutionAdmin>("save", async function (next) {
  if (this.isNew) {
    const count = await mongoose
      .model<InstitutionAdmin>("Admin")
      .countDocuments({ institutionName: this.institutionName });
    if (count == 0) {
      this.super_admin = true;
    }
  }
  next();
});

const Admin = mongoose.model<InstitutionAdmin>("Admin", InstitutionAdminSchema);
export default Admin;
