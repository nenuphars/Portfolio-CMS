import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller";
import { authenticate } from "../middleware/authenticate";
import { validate, loginSchema, registerSchema } from "../middleware/validate";

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), register);
authRoutes.post("/login", validate(loginSchema), login);
authRoutes.get("/me", authenticate, me);

export default authRoutes;
