import { PostResponse } from "@/types/Post.type";
import Link from "next/link";
type Props = {
  post: PostResponse;
  key: string;
};
function PostCard({ post, key }: Props) {
  return (
    <div
      className="flex flex-col flex-1 justify-between py-16 border-b border-solid border-zinc-400"
      key={key}
    >
      <Link href={`/posts/${post.slug}`}>
        <h3 className=" text-2xl leading-6 tracking-tight text-zinc-800 dark:text-zinc-50  hover:text-indigo-500">
          {post.title}
        </h3>
      </Link>

      <h5 className="text-zinc-800 py-6 ">Written by {post.author.username}</h5>
      <p className="max-x-xs leading-6 tex-zinc-800 dark:text-zinc-50 line-clamp-4 overflow-hidden text-ellipsis">
        {post.body}
      </p>
    </div>
  );
}

export default PostCard;
