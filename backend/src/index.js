import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";


const PORT = process.env.PORT || 7001;

const app = express();

connectDB();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello, server is running!");
});



app.listen(PORT, () => {
    console.log(`🚀 Server running at:http://localhost:${PORT}`);
});
