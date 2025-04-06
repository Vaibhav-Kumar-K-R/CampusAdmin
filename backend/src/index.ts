import express, { Application, Request, Response } from "express";
import cors from "cors";
import adminRouter from "./routes/adminRouter";
import connectDB from "./config/db";
import dotenv from "dotenv";
dotenv.config();
connectDB();

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/admin", adminRouter);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send({
    status: 200,
    message: "Server is running fine",
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on https://localhost:${port}/`);
});
