"use client";

import { useAuth } from "@/lib/auth";
import Link from "next/link";

type Props = {
  slug: string;
};

function EditButton({ slug }: Props) {
  const { user } = useAuth();

  // console.log("Create button user", user);

  if (!user) return null;

  return (
    <Link
      href={`/posts/edit/${slug}`}
      className="border border-box border-solid text-zinc-800 bg-zinc-50 hover:text-indigo-500 stroke-zinc-800 hover:stroke-indigo-500 py-2 px-2"
    >
      <div className="flex flex-row w-auto items-end justify-center gap-1">
        <h4 className="text-xl leading-none">Edit</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </div>
    </Link>
  );
}

export default EditButton;
