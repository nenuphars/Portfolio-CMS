"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  tags: string[];
  activeTag?: string;
};

export function TagFilter({ tags, activeTag }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleTagClick(tag: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get("tag") === tag) {
      params.delete("tag"); // clicking active tag deselects it
    } else {
      params.set("tag", tag);
      params.delete("page"); // reset to page 1 when changing tag
    }

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="border-b border-solid border-zinc-400 flex flex-col gap-2 py-6 items-start full-w">
      <div className="flex flex-row items-center gap-2">
        <p>Tag Filters:</p>
        {activeTag && (
          <button className="box bg-zinc-200 py-1 px-1 rounded-xs" onClick={() => router.push("/")}>
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-row gap-2 items-center">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            style={{ fontWeight: activeTag === tag ? "bold" : "normal" }}
            className="box bg-indigo-100 py-1 px-1 rounded-xs hover:text-indigo-500"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
