// frontend/lib/auth.api.ts  ← separate from auth.tsx to avoid circular imports
import { apiRequest } from "./api";
import { User } from "../types/User.type";

export function fetchMe(token: string) {
  return apiRequest<User>("/api/auth/me", { token });
}

export function registerUser(body: { username: string; password: string }) {
  return apiRequest<{ token: string }>("/api/auth/register", { method: "POST", body });
}

export function loginUser(body: { username: string; password: string }) {
  return apiRequest<{ token: string }>("/api/auth/login", { method: "POST", body });
}
