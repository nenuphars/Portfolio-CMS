// backend/src/app.ts
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { AppError } from "./utils/AppError";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

// Health check — no auth, no router, just inline
app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// API routes (added later)
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Global error handler (added in issue #3)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err.name === "AppError") {
    const appErr = err as AppError;
    return res.status(appErr.statusCode).json({ error: appErr.message });
  }
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
