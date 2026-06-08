"use client";

import Link from "next/link";

function HomeButton() {
  return (
    <div className="flex flex-col w-auto items-start justify-center py-6">
      <Link href={"/"} className="color-zinc-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className="size-10 stroke-zinc-800 hover:stroke-indigo-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
      </Link>
    </div>
  );
}

export default HomeButton;
