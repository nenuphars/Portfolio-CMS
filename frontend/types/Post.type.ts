import { User } from "./User.type";

export type Status = "published" | "draft";

export type PostRequest = {
  _id?: string;
  title: string;
  slug?: string;
  body: string;
  author: string;
  status: Status;
  tags: string | string[];
};

export type PostResponse = {
  _id: string;
  title: string;
  slug: string;
  body: string;
  author: User;
  status: Status;
  tags: string | string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  body: string;
  author: User;
  status: Status;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type PostList = {
  posts: Post[];
  pagination: object;
};
