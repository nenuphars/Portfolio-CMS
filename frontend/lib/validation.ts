import * as z from "zod";

// FORM VALIDATION

export const LoginSchema = z.object({
  username: z.string().min(3, { error: "Too short, min. 3 characters" }),
  password: z.string().min(12, { error: "Too short, min. 12 characters" }),
});

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(2, { error: "Too short, min. 2 characters" })
    .max(50, { error: "Too long, max. 50 characters" }),
  password: z
    .string()
    .min(12, { error: "Too short, min. 12 characters" })
    .max(30, { error: "Too long, max. 30 characters" }),
});

export const CommentSchema = z.object({
  body: z.string().min(3).max(200),
});

export const StatusEnum = z.enum(["published", "draft"]);

export const PostSchema = z.object({
  title: z.string().min(3).max(80),
  body: z.string().min(50).max(3000),
  status: StatusEnum,
  tags: z.string().or(z.array(z.string())),
});
