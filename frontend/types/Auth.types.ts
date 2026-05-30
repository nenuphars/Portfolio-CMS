import { ZodError } from "zod";
import { ApiError } from "./Error.type";

export type LoginResponse =
  | {
      token: string;
    }
  | ZodError
  | ApiError;
