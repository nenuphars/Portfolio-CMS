import { Schema, model, Document } from "mongoose";
import { UserType } from "../types/User.type";
import { User } from "./User";
import slugify from "slugify";

export interface PostI extends Document {
  title: string;
  slug: string;
  body: string;
  author: UserType;
  status: "draft" | "published";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: { type: String, unique: true },
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: User },
    status: { type: String, enum: ["draft", "published"], required: true },
    tags: { type: [String], required: false },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true },
);

postSchema.pre("save", async function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

export const Post = model("Post", postSchema);
