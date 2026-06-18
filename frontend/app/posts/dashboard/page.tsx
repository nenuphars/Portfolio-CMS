"use client";

import { useDeleteConfirmation } from "@/components/ConfirmDeleteDialog/confirmDelete";
import CreateButton from "@/components/CreateButton";
import PostCard from "@/components/PostCard";
import { TagFilter } from "@/components/TagFilter";
import { useAuth } from "@/lib/auth";
import { deletePost, getOwnPosts, getTags } from "@/lib/posts.api";
import { Post, PostResponse } from "@/types/Post.type";
import { useRouter } from "next/dist/client/components/navigation";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";

type Props = {
  searchParams: Promise<{ tag?: string; page?: string }>;
};

export default function Dashboard({ searchParams }: Props) {
  const { token, user } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[] | PostResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [page, setPage] = useState<string>("1");
  const [pagination, setPagination] = useState<{ page: number; pages: number }>({
    page: 1,
    pages: 1,
  });

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }
    searchParams
      .then(({ tag, page }) => {
        setTag(tag || "");
        setPage(page || "1");
      })
      .catch(console.error);

    getOwnPosts(token, { tag, page: page ? parseInt(page) : 1 })
      .then((res) => {
        setPosts(res.posts);
        setPagination(res.pagination);
        getTags().then((allTags) => {
          const existingTags = allTags.filter((t) => res.posts.some((p) => p.tags.includes(t)));
          setTags(existingTags);
        });
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [token, page, searchParams, tag, router]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-16 px-10 bg-white dark:bg-zinc-800 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div className="flex flex-1 flex-row w-full max-w-3xl items-center justify-between">
            <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-zinc-800 dark:text-zinc-50">
              Dashboard
            </h1>
            <CreateButton title="Add" />
          </div>
          <TagFilter tags={tags} activeTag={tag} />

          <div>
            {posts.map((onePost: Post | PostResponse) => {
              return (
                <PostCard
                  key={onePost._id}
                  post={onePost}
                  author={user?.username}
                  parent="dashboard"
                />
              );
            })}
          </div>
          {pagination.page > 1 && (
            <Link href={`?page=${pagination.page - 1}${tag ? `&tag=${tag}` : ""}`}>Previous</Link>
          )}
          {pagination.page < pagination.pages && (
            <Link href={`?page=${pagination.page + 1}${tag ? `&tag=${tag}` : ""}`}>Next</Link>
          )}
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row"></div>
      </main>
    </div>
  );
}
