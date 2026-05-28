import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  passwordHash: string;
  createdAt: Date;
}

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = model("User", userSchema);
