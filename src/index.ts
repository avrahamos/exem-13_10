import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
