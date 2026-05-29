import { Request, Response, NextFunction } from "express";
import { Comment } from "../models/Comment";
import { AppError } from "../utils/AppError";
import { Post } from "../models/Post";

export async function listComments(req: Request, res: Response, next: NextFunction) {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new AppError(404, "The post was not found");
    }
    const response = await Comment.find({ post: post._id }).populate("author", "username");
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

export async function createComment(req: Request, res: Response, next: NextFunction) {
  const user = req.user!.userId;
  const { postId } = req.params;
  const { body } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new AppError(404, "The post was not found");
    }
    const response = await Comment.create({ body, author: user, post: post._id });
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
}

export async function deleteComment(req: Request, res: Response, next: NextFunction) {
  const user = req.user!.userId;
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new AppError(404, "Comment not found");
    }
    if (comment.author?._id.toString() !== user) {
      throw new AppError(403, "Only the author of the comment can delete it");
    }
    await comment.deleteOne();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
