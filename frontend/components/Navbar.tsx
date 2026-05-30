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

  const navigation = [
    { name: "Login", href: "/login", current: currentRoute === "/login" },
    { name: "Register", href: "/register", current: currentRoute === "/register" },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <nav className="relative bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {user ? (
            <>
              <span>Hi, {user.name}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <div className="flex space x-4">
                {navigation.map((item) => {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setCurrentRoute(item.href)}
                    >
                      <p
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-white/5 hover:text-white",
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
