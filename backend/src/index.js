import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/admin.routes.js";
import marksRoutes from "./routes/marks.routes.js";
import courseRoutes from "./routes/course.routes.js";
import facultyRoutes from "./routes/faculty.routes.js";
import sectionRoutes from "./routes/section.routes.js";
import studentRoutes from "./routes/student.routes.js";
import semesterRoutes from "./routes/semester.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import forgotPasswordRoute from "./routes/forgotPassword.route.js";
import verifyPasswordRoute from "./routes/verifypassword.route.js";
const PORT = process.env.PORT || 7001;

const app = express();

connectDB();

app.use(express.json());

app.use(cors({
  origin: "*",
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Hello, server is running!");
});

app.use("/api/admin", adminRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/semester", semesterRoutes);
app.use("/api/section", sectionRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/forgot-password", forgotPasswordRoute);
app.use("/api/verify-password", verifyPasswordRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at:http://localhost:${PORT}`);
});
