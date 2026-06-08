"use client";

import { useAuth } from "@/lib/auth";
import Link from "next/link";

type Props = {
  title: string;
};

function CreateButton({ title }: Props) {
  const { user } = useAuth();

  console.log("Create button user", user);

  return (
    <Link
      href={"/posts/create"}
      className="border border-box border-solid text-zinc-800 bg-zinc-50 hover:text-indigo-500 stroke-zinc-800 hover:stroke-indigo-500 py-2 px-2"
    >
      <div className="flex flex-row w-auto items-end justify-center">
        <h4 className="text-xl leading-none">{title}</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="size-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
    </Link>
  );
}

export default CreateButton;
