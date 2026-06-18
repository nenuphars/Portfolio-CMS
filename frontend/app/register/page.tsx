"use client";

import FormValidationError from "@/components/FormValidationError";
import { useAuth } from "@/lib/auth";
import { registerUser } from "@/lib/auth.api";
import { RegisterSchema } from "@/lib/validation";
import { LoginResponse } from "@/types/Auth.types";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import * as z from "zod";

function Page() {
  const { login, token } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const router = useRouter();

  useMemo(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setPasswordError("");
    setUsernameError("");
    try {
      const validation = RegisterSchema.safeParse({ username, password });
      if (!validation.success) {
        const tree = z.treeifyError(validation.error);
        // console.log("Validation response", validation, tree);
        if (tree.properties?.password) {
          setPasswordError(tree.properties.password.errors[0]);
        }
        if (tree.properties?.username) {
          setUsernameError(tree.properties.username.errors[0]);
        }
        return;
      }
      const response: LoginResponse = await registerUser({ username, password });
      console.log(response);
      login(response.token);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-zinc-900">
            Register as a new user
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={(e) => onSubmit(e)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-zinc-800">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  required
                  value={username}
                  onChange={(e) => {
                    e.preventDefault();
                    setUsername(e.target.value);
                  }}
                  autoComplete="username"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-400 placeholder:text-zinc-700 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                <FormValidationError message={usernameError} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-zinc-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                  }}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-zinc/5 px-3 py-1.5 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-400 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                <FormValidationError message={passwordError} />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm/6 font-semibold text-zinc-100 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
