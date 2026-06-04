// frontend/src/lib/auth.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface User {
  userId: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUser(token: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      console.log("User data");
      setUser(data);
      setToken(token);
    } catch {
      // token is invalid or expired — clear it
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  }

  // on mount — check if a token exists in localStorage and fetch the user
  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      fetchUser(stored);
    } else {
      setIsLoading(false);
    }
  }, []);

  async function login(token: string) {
    localStorage.setItem("token", token);
    await fetchUser(token);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook — this is how every component accesses the auth state
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
