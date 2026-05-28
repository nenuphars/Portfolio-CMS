import * as z from "zod";
import { UserLogin, UserSignup } from "../types/User.type";
import { NextFunction, Request, Response } from "express";

export const loginSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(12).max(34),
});
z.util.assertEqual<UserLogin, z.infer<typeof loginSchema>>(true);

export const registerSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(12).max(30),
});
z.util.assertEqual<UserSignup, z.infer<typeof registerSchema>>(true);

export function validate(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: z.treeifyError(result.error) });
    }
    req.body = result.data;
    next();
  };
}
