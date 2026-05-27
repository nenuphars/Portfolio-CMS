// backend/src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";

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
// app.use('/api/auth', authRoutes)
// app.use('/api/posts', postRoutes)

// Global error handler (added in issue #3)

export default app;
