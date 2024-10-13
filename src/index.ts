import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { specs, swaggerUi } from "../src/config/swagger config";
import authRouter from "../src/routers/authRouter";
import teecherRouter from "./routers/teecherRouter";
import studentRouter from "./routers/studentRouter";

const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/auth", authRouter);
app.use("/teecher", teecherRouter);
app.use("/student", studentRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
