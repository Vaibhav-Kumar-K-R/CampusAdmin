import express from "express";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Admin } from "../models/admin.model.js";
import { Faculty } from "../models/faculty.model.js";
import { Student } from "../models/student.model.js";
import { PasswordReset } from "../models/passwordReset.model.js";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { password, token, user } = req.body;

  if (!password || !token) {
    return res
      .status(400)
      .json({ code: 400, message: "Required fileds are missing" });
  }

  const passreset = await PasswordReset.findOne({ token });
  if (!passreset) {
    return res.status(404).json({ code: 404, message: "Something went wrong" });
  }

  if (user == "admin") {
    const admin = await Admin.findOne({ email: passreset.email });
    if (!admin) {
      return res
        .status(404)
        .json({ code: 404, message: "Admin with given email not found" });
    }
    admin.password = await bcrypt.hash(password, 10);
    await admin.save();
  } else if (user == "faculty") {
    const faculty = await Faculty.findOne({ email: passreset.email });
    if (!faculty) {
      return res
        .status(404)
        .json({ code: 404, message: "Faculty with given email not found" });
    }
    faculty.password = await bcrypt.hash(password, 10);
    await faculty.save();
  } else {
    const student = await Student.findOne({ email: passreset.emaill });
    if (!student) {
      return res
        .status(404)
        .json({ code: 404, message: "Student with given email not found" });
    }
    student.password = await bcrypt.hash(password, 10);
    await student.save();
  }
  await PasswordReset.deleteOne({ token });
  res.status(200).json({ code: 200, message: "Password reset successfull 🚀" });
});

export default router;
