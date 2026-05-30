import { Post } from "./Post.type";
import { User } from "./User.type";

export type CommentType = {
  _id: string;
  post: Post;
  author: User;
  body: string;
  createdAt: Date;
};
