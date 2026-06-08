"use client";
import { useAuth } from "@/lib/auth";
import { listComments } from "@/lib/comments.api";
import { timeAgo } from "@/lib/utils";
import { CommentType } from "@/types/Comment.type";
import React, { useEffect, useState } from "react";

type Props = {
  postId: string;
};

function CommentSection({ postId }: Props) {
  const { token } = useAuth();
  const [comments, setComments] = useState<CommentType[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    listComments(postId)
      .then(setComments)
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [postId, token]);

  if (!token) return <></>;

  if (isLoading)
    return (
      <>
        <h2>Loading</h2>
      </>
    );

  return (
    <>
      {!isLoading && comments && (
        <>
          <h4 className="text-xl font-semibold leading-10 tracking-tight text-zinc-600 dark:text-zinc-50">
            Comments:
          </h4>
          <div className="flex flex-col flex-1 gap-6">
            {comments.length > 0 ? (
              comments.map((oneComment) => {
                return (
                  <div
                    className="w-96 h-32 border-b border-solid border-zinc-300 border-box  p-2"
                    key={oneComment._id}
                  >
                    <p className="text-sm text-zinc-400">
                      {oneComment.author.username} commented{" "}
                      {timeAgo(oneComment.createdAt.toString())}
                    </p>
                    <p className="italic py-4">{`"${oneComment.body}"`}</p>
                  </div>
                );
              })
            ) : (
              <h2>No one has commented yet</h2>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default CommentSection;
