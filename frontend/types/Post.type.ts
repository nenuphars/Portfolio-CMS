import { User } from "./User.type";

export type Post = {
  _id: string;
  title: string;
  slug: string;
  body: string;
  author: User;
  status: "draft" | "published";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type PostList = {
  posts: Post[];
  pagination: object;
};
