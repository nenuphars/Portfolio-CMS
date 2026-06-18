"use client";

import FormValidationError from "@/components/FormValidationError";
import { useAuth } from "@/lib/auth";
import { updatePost } from "@/lib/posts.api";
import { PostSchema } from "@/lib/validation";
import { PostResponse, Status } from "@/types/Post.type";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import * as z from "zod";
import { TagsSelect } from "@/components/TagsSelect";
import BackButton from "@/components/BackButton";

type Props = {
  post: PostResponse;
  existingTags: string[];
};

function EditPostForm({ post, existingTags }: Props) {
  const { token, isLoading } = useAuth();

  // Form value states:
  const [title, setTitle] = useState<string>(post.title);
  const [body, setBody] = useState<string>(post.body);
  const [status, setStatus] = useState<"draft" | "published">(post.status);
  const [tags, setTags] = useState<string[]>(post.tags);
  const [id, setId] = useState<string>(post._id);

  // Error states:
  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [tagsError, setTagsError] = useState("");

  const router = useRouter();

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    // Reset error messages
    setTitleError("");
    setBodyError("");
    setStatusError("");
    setTagsError("");

    try {
      const validation = PostSchema.safeParse({ title, body, status, tags });
      if (!validation.success) {
        const tree = z.treeifyError(validation.error);
        if (tree.properties?.title) {
          setTitleError(tree.properties.title.errors[0]);
        }
        if (tree.properties?.body) {
          setBodyError(tree.properties.body.errors[0]);
        }
        if (tree.properties?.status) {
          setStatusError(tree.properties.status.errors[0]);
        }
        if (tree.properties?.tags) {
          setTagsError(tree.properties.tags.errors[0]);
        }
        return;
      }
      if (token && id) {
        const response: PostResponse = await updatePost(id, { title, body, status, tags }, token);
        router.push(`/posts/${response.slug}`);
      } else return;
    } catch (err) {
      console.log(err);
    }
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center font-sans w-full">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-start justify-between py-12 px-10 bg-white dark:bg-zinc-800 sm:item-start">
        <div className="flex flex-col items-start gap-6 w-full">
          <BackButton url="/posts/dashboard" />
          <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-zinc-800 dark:text-zinc-50 w-full">
            Edit Post
          </h1>
        </div>
        <div className="mt-10 sm:mx-auto w-full">
          <form
            onSubmit={(e) => {
              onSubmit(e);
            }}
            className="space-y-6 w-full"
          >
            <label htmlFor="title">Title</label>
            <div className="flex flex-col flex-1 w-full">
              <input
                id="title"
                name="title"
                type="title"
                required
                value={title}
                onChange={(e) => {
                  e.preventDefault();
                  setTitle(e.target.value);
                }}
                className="block w-full rounded-md bg-zinc/5 px-3 py-1.5 text-base text-zinc-800 outline-1 -outline-offset-1 outline-zinc/10 placeholder:text-zinc-700 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
              <FormValidationError message={titleError} />
            </div>
            <label htmlFor="title">Content</label>
            <div className="flex flex-col flex-1 w-full">
              <textarea
                id="body"
                name="body"
                required
                value={body}
                onChange={(e) => {
                  e.preventDefault();
                  setBody(e.target.value);
                }}
                className="block w-full rounded-md bg-zinc/5 px-3 py-1.5 text-base text-zinc-800 outline-1 -outline-offset-1 outline-zinc/10 placeholder:text-zinc-700 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 min-h-64"
              />
              <FormValidationError message={bodyError} />
            </div>
            <label htmlFor="status-select">Status</label>
            <div className="flex flex-col flex-1 w-full">
              <select
                id="status-select"
                name="status"
                required
                value={status}
                onChange={(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
                  e.preventDefault();
                  setStatus(e.target.value as Status);
                }}
                className="block w-full rounded-md bg-zinc/5 px-3 py-1.5 text-base text-zinc-800 outline-1 -outline-offset-1 outline-zinc/10 placeholder:text-zinc-700 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              >
                <option value="draft" className="text-base">
                  Draft
                </option>
                <option value="published" className="text-base">
                  Published
                </option>
              </select>
              <FormValidationError message={statusError} />
            </div>
            <label htmlFor="title">Tags</label>
            <div className="flex flex-col flex-1 w-full">
              <TagsSelect value={tags || []} onChange={setTags} existingTags={existingTags || []} />
              <FormValidationError message={tagsError} />
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm/6 font-semibold text-zinc-100 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditPostForm;
