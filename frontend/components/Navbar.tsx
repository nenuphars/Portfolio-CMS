// any client component
"use client";

import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const [currentRoute, setCurrentRoute] = useState<string>(pathname);

  if (isLoading) return null; // avoid the flash

  const anonNavigation = [
    { name: "Login", href: "/login", current: currentRoute === "/login" },
    {
      name: "Register",
      href: "/register",
      current: currentRoute === "/register",
    },
    { name: "Posts", href: "/", current: currentRoute === "/" },
  ];

  const privateNavigation = [
    { name: "Dashboard", href: "/posts/dashboard", current: currentRoute === "/dashboard" },
    { name: "Posts", href: "/", current: currentRoute === "/" },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <nav className="relative bg-zinc-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {user ? (
            <>
              <div className="flex flex-row justify-between items-center space-x-4 w-full">
                <span>
                  <p className="text-zinc-600 hover:bg-white/5 rounded-md px-3 py-2 text-sm font-medium">
                    Hello, {user.username}
                  </p>
                </span>
                {privateNavigation.map((item) => {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setCurrentRoute(item.href)}
                    >
                      <p
                        className={classNames(
                          item.current
                            ? "bg-zinc-900 text-white"
                            : "text-zinc-600 hover:bg-white/5 hover:text-indigo-500",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                      >
                        {item.name}
                      </p>
                    </Link>
                  );
                })}
                <button onClick={logout}>
                  <p className="bg-zinc-900 text-white vrounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer">
                    Logout
                  </p>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex space x-4">
                {anonNavigation.map((item) => {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setCurrentRoute(item.href)}
                    >
                      <p
                        className={classNames(
                          item.current
                            ? "bg-zinc-900 text-white"
                            : "text-zinc-600 hover:bg-white/5 hover:text-indigo-500",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                      >
                        {item.name}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
