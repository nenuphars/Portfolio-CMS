import CreateButton from "@/components/CreateButton";
import PostCard from "@/components/PostCard";
import { TagFilter } from "@/components/TagFilter";
import { getPosts, getTags } from "@/lib/posts.api";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ tag?: string; page?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { tag, page } = await searchParams;
  const [{ posts, pagination }, tags] = await Promise.all([
    getPosts({ tag, page: page ? parseInt(page) : 1 }),
    getTags(),
  ]);
  console.log("pagination", pagination);

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-16 px-10 bg-white dark:bg-zinc-800 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div className="flex flex-1 flex-row w-full max-w-3xl items-center justify-between">
            <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-zinc-800 dark:text-zinc-50">
              Posts
            </h1>
            <CreateButton title="Add" />
          </div>
          <TagFilter tags={tags} activeTag={tag} />

          <div>
            {posts.map((onePost) => {
              return <PostCard post={onePost} key={onePost.slug} parent="home" />;
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
