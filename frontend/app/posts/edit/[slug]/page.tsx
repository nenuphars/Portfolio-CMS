import { getPost, getTags } from "@/lib/posts.api";
import EditPostForm from "./EditPostForm";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EditPage({ params }: Props) {
  const tags = await getTags();
  const { slug } = await params;
  const post = await getPost(slug);
  console.log("slug from params:", slug);

  return <EditPostForm existingTags={tags} post={post} />;
}
