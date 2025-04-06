import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send({
    status: 200,
    message: "Server is running fine",
  });
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on http://localhost:3000/`);
});
