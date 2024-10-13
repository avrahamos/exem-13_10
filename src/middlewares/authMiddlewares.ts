import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserData {
  role: string;
  [key: string]: any;
}

export const onlyStudentsAndTeachers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).send("Access denied. No token provided.");
      return;
    }

    const userData = jwt.verify(token, process.env.TOKEN_SECRET!) as UserData;

    if (userData.role !== "teacher" && userData.role !== "student") {
      res.status(403).send("Access denied. Teachers and students only.");
      return;
    }
    //@ts-ignore
    req.user = userData;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

export const onlyTeachers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).send("Access denied. No token provided.");
      return;
    }

    const userData = jwt.verify(token, process.env.TOKEN_SECRET!) as UserData;

    if (userData.role !== "teacher") {
      res.status(403).send("Access denied. Teachers only.");
      return;
    }
    //@ts-ignore
    req.user = userData;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};
