import { getTags } from "@/lib/posts.api";
import CreatePostForm from "./CreatePostForm";

export default async function CreatePage() {
  const tags = await getTags();
  console.log("Existing tags on parent:", tags);

  return <CreatePostForm existingTags={tags} />;
}
