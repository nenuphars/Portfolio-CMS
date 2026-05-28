import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  console.log("Auth header:", req.headers);
  const token = req.headers.authorization?.split(" ")[1];
  const secret = process.env.JWT_SECRET;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  if (!secret) {
    return res.status(401).json({ message: "No JWT_SECRET found in .env" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded !== "string" && "userId" in decoded) {
      req.user = decoded as Express.Request["user"];
      next();
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
