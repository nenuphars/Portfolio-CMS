import { model, Schema, Document } from "mongoose";
import { PostType } from "../types/Post.type";
import { UserType } from "../types/User.type";
import { Post } from "./Post";
import { User } from "./User";

export interface CommentI extends Document {
  post: PostType;
  author: UserType;
  body: string;
  createdAt: Date;
}

const CommentSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: Post },
    author: { type: Schema.Types.ObjectId, ref: User },
    body: { type: String, required: true },
    createdAt: { type: Date },
  },
  { timestamps: true },
);

export const Comment = model("Comment", CommentSchema);
