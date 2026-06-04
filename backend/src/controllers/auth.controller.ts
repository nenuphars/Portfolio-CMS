import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AppError } from "../utils/AppError";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) throw new AppError(409, "Username already in use");
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, passwordHash });
    const token = signToken(user._id.toString());
    res.status(201).json({ token });
  } catch (err) {
    next(err); // passes to global error handler
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) throw new AppError(401, "Invalid credentials: incorrect username");
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new AppError(401, "Invalid credentials: incorrect password");
    const token = signToken(user._id.toString());
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  // req.user is attached by authenticate middleware
  try {
    if (!req.user) {
      throw new AppError(404, "Could not retrieve user id");
    }
    const user = await User.findById(req.user.userId);
    res.json({ username: user?.username });
  } catch (err) {
    next(err);
  }
}

function signToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });
}
