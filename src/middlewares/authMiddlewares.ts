import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
    //@ts-ignore
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export const onlyTeachersMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  if (req.user && req.user.role === "teacher") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Teachers only." });
  }
};

export const onlyStudents = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  if (req.user && req.user.role === "student") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Students only." });
  }
};
