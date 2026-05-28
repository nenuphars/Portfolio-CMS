import { UserType } from "./User.type";

export type PostType = {
  _id: string;
  title: string;
  slug: string;
  body: string;
  author: UserType;
  status: "draft" | "published";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};
