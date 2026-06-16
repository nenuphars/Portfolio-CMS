"use client";

import { useState } from "react";
import { useDeleteConfirmation } from "./ConfirmDeleteDialog/confirmDelete";
import { useAuth } from "@/lib/auth";
import { deletePost } from "@/lib/posts.api";
import { useRouter } from "next/navigation";

type Props = {
  postId: string;
};

function DeleteButton({ postId }: Props) {
  const { token } = useAuth();
  const router = useRouter();
  // Deletion Dialog
  const { confirmDelete } = useDeleteConfirmation();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async (id: string) => {
    console.log("Button clicked");
    if (isDeleting) return;
    if (!token) {
      console.log("Token not found when trying to delete post");
    }
    try {
      await confirmDelete({
        title: `Delete`,
        message: "You are about to delete the item",
      });
      setIsDeleting(true);
      if (token) {
        const response = await deletePost(id, token);
        router.refresh();

        console.log("Deletion Successful", response);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <button
      onClick={() => {
        handleDeleteClick(postId);
      }}
      className="border border-box border-solid text-zinc-800 bg-zinc-50 hover:text-indigo-500 stroke-zinc-800 hover:stroke-indigo-500 py-2 px-2"
    >
      <div className="flex flex-row w-auto items-end justify-center gap-1">
        <h4 className="text-xl leading-none">Delete</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>
    </button>
  );
}

export default DeleteButton;
