import express from "express";
import nodemailer from "nodemailer";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import { Admin } from "../models/admin.model.js";
import { Faculty } from "../models/faculty.model.js";
import { Student } from "../models/student.model.js";
import { PasswordReset } from "../models/passwordReset.model.js";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.log("Email transport error:", error);
  } else {
    console.log("Server ready to send emails ✅");
  }
});

export const sendPasswordResetEmail = async (to, resetLink) => {
  const mailOptions = {
    from: `Campus Admin <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset your password",
    html: `
      <div style="font-family: sans-serif;">
        <h2>Password Reset</h2>
        <p>We received a request to reset your password. Click the button below to continue:</p>
        <a href="${resetLink}" 
           style="display: inline-block; padding: 10px 20px; background-color: #048c7f; color: white; text-decoration: none; border-radius: 6px;">
          Reset Password
        </a>
        <p style="margin-top: 20px;">If you didn't request this, you can ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, user } = req.body;

  if (!email) {
    return res.status(400).json({ code: 400, message: "Email is required" });
  }

  // if(user=="admin"){
  //   const admin=await Admin.findOne({ email });
  //   if(!admin){
  //     return res.status(404).json({ code: 404, message: "Admin with given email not found" });
  //   }
  // }else if(user=="faculty"){
  //    const faculty=await Faculty.findOne({ email });
  //   if(!faculty){
  //     return res.status(404).json({ code: 404, message: "Faculty with given email not found" });
  //   }
  // }else{
  //   const student=await Student.findOne({ email });
  //   if(!student){
  //     return res.status(404).json({ code: 404, message: "Student with given email not found" });
  //   }
  // }
  const token = uuid();
  const passreset = new PasswordReset({
    email,
    token,
  });
  await passreset.save();
  console.log(passreset);
  const resetLink = `${process.env.FRONTEND_URL}/${user}/verify-reset-password?token=${token}&user=${user}`;

  try {
    await sendPasswordResetEmail(email, resetLink);
    res.status(200).json({ code: 200, message: "Reset link sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ code: 500, message: "Failed to send email" });
  }
});

router.post("/verify", async (req, res) => {
  console.log(req.body);
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
  passreset.email = "100x@sjcc.ac.in";

  if (user == "admin") {
    const admin = await Admin.findOne({ email: passreset.email });
    if (!admin) {
      return res
        .status(404)
        .json({ code: 404, message: "Admin with given email not found" });
    }
    admin.password = password;
  } else if (user == "faculty") {
    const faculty = await Faculty.findOne({ email: passreset.email });
    if (!faculty) {
      return res
        .status(404)
        .json({ code: 404, message: "Faculty with given email not found" });
    }
    faculty.password = password;
  } else {
    const student = await Student.findOne({ email: passreset.emaill });
    if (!student) {
      return res
        .status(404)
        .json({ code: 404, message: "Student with given email not found" });
    }
    student.password = password;
  }
  res.status(200).json({ code: 200, message: "Password reset successfull 🚀" });
});

export default router;
