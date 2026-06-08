import CreateButton from "@/components/CreateButton";
import { getPosts } from "@/lib/posts.api";
import Link from "next/link";

export default async function Home() {
  const { posts } = await getPosts();
  console.log("posts", posts);

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-10 bg-white dark:bg-zinc-800 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div className="flex flex-1 flex-row w-full max-w-3xl items-center justify-between">
            <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-zinc-800 dark:text-zinc-50">
              Posts
            </h1>
            <CreateButton title="Add" />
          </div>

          <div>
            {posts.map((onePost) => {
              return (
                <div
                  className="flex flex-col flex-1 justify-between py-16 border-b border-solid border-zinc-400"
                  key={onePost.slug}
                >
                  <Link href={`/posts/${onePost.slug}`}>
                    <h3 className=" text-2xl leading-6 tracking-tight text-zinc-800 dark:text-zinc-50  hover:text-indigo-500">
                      {onePost.title}
                    </h3>
                  </Link>

                  <h5 className="text-zinc-800 py-6 ">Written by {onePost.author.username}</h5>
                  <p className="max-x-xs leading-6 tex-zinc-800 dark:text-zinc-50 line-clamp-4 overflow-hidden text-ellipsis">
                    {onePost.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row"></div>
      </main>
    </div>
  );
}
