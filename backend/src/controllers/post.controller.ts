import { Request, Response, NextFunction } from "express";
import { Post } from "../models/Post";
import { AppError } from "../utils/AppError";

export async function getAllPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const { tag, page = "1", limit = "10" } = req.query;

    // We only want to show published posts
    const filter: Record<string, unknown> = { status: "published" };

    // Here we filter for the single string tag query in the prefiltered posts
    if (tag && typeof tag === "string") {
      filter.tags = tag;
    }

    // Additional parameters to porperly display the intended amount of posts per page
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const posts = await Post.find(filter)
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Post.countDocuments(filter);

    res.json({
      posts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function createPost(req: Request, res: Response, next: NextFunction) {
  const { title, body, status, tags } = req.body;
  try {
    const response = await Post.create({
      title,
      body,
      status: status || "draft",
      tags,
      author: req.user!.userId,
    });
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
}

export async function getPostBySlug(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;
  try {
    const response = await Post.findOne({ slug: slug }).populate("author", "username");
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

export async function updatePost(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const user = req.user!.userId;

  try {
    const post = await Post.findById(id);
    if (!post) {
      throw new AppError(404, "Post not found");
    }

    if (post.author?.toString() !== user) {
      throw new AppError(403, "Only the author can edit this post");
    }
    Object.assign(post, req.body);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}

export async function deletePost(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const user = req.user!.userId;
  try {
    const post = await Post.findById(id);

    if (!post) {
      throw new AppError(404, "Post not found");
    }

    if (post.author?.toString() !== user) {
      throw new AppError(403, "Only the author is allowed to delete this post");
    }
    await post.deleteOne();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function publishPost(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const user = req.user!.userId;

  try {
    const post = await Post.findById(id);

    if (!post) {
      throw new AppError(404, "Post not found");
    }
    if (post.author?.toString() !== user) {
      throw new AppError(403, "Only the author is allowed to publish this post");
    }
    if (post.status === "published") {
      throw new AppError(304, "Post was already published");
    }

    Object.assign(post, req.body);
    post.save();
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}

// GET /api/posts/tags
export async function getTags(req: Request, res: Response, next: NextFunction) {
  try {
    const tags = await Post.distinct("tags", { status: "published" });
    res.json(tags);
  } catch (err) {
    next(err);
  }
}
