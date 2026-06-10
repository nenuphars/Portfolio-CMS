"use client";
import { useAuth } from "@/lib/auth";
import { PostResponse } from "@/types/Post.type";
import Link from "next/link";
import EditButton from "./EditButton";
type Props = {
  author?: string;
  post: PostResponse;
  parent: "dashboard" | "home";
};
function PostCard({ author, post, parent }: Props) {
  const { user } = useAuth();

  return (
    <div className="flex flex-col flex-1 justify-between py-16 border-b border-solid border-zinc-400">
      <div>
        {user?.username === post.author.username && parent === "dashboard" && (
          <EditButton title="Edit" slug={post.slug} />
        )}

        <Link href={`/posts/${post.slug}`}>
          <h3 className=" text-2xl leading-6 tracking-tight text-zinc-800 dark:text-zinc-50  hover:text-indigo-500">
            {post.title}
          </h3>
        </Link>
      </div>

      <h5 className="text-zinc-800 py-6 ">Written by {author || post.author.username}</h5>
      <p className="max-x-xs leading-6 tex-zinc-800 dark:text-zinc-50 line-clamp-4 overflow-hidden text-ellipsis">
        {post.body}
      </p>
    </div>
  );
}

export default PostCard;
