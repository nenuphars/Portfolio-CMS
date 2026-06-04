// app/posts/[slug]/page.tsx

import { getPost } from "@/lib/posts.api";
import { notFound } from "next/navigation";
import CommentSection from "./components/CommentSection";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug).catch((err) => {
    console.error("Failed to fetch post data", err);
  });
  console.log("One Post Data:", post);
  if (post?.createdAt) {
    console.log("createdAt value:", post.createdAt, typeof post.createdAt);
  }

  if (!post) notFound();

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <p className="text-sm text-zinc-400">
            {post?.author.username}
            {", "}
            {formatDate(post.createdAt.toString())}
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-50 pb-0">
            {post?.title}
          </h1>

          <p>{post?.body}</p>
          <CommentSection postId={post._id} />
        </div>
      </main>
    </div>
  );
}
