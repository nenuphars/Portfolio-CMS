import { PostType } from "./Post.type";
import { UserType } from "./User.type";

export type CommentType = {
  _id: string;
  post: PostType;
  author: UserType;
  body: string;
  createdAt: Date;
};
