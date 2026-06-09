import { Request, Response, NextFunction } from "express";
import { Post } from "../models/Post";
import { AppError } from "../utils/AppError";

// GET /api/posts?tag=${tag}&page=${page}
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

// GET /api/posts/my-posts — auth required
export async function getMyPosts(req: Request, res: Response, next: NextFunction) {
  const { tag, page = "1", limit = "10" } = req.query;

  // Additional parameters to porperly display the intended amount of posts per page
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  let filter: Record<string, unknown> = { tags: "" };

  // single tag — post must contain this tag
  if (tag && typeof tag === "string") {
    filter.tags = tag;
  }

  // multiple tags — post must contain ALL of these tags
  if (Array.isArray(tag)) {
    filter.tags = { $all: tag };
  }
  try {
    const posts = await Post.find({ author: req.user!.userId }, filter)
      .select("title slug status tags body createdAt updatedAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
    const total = await Post.countDocuments();
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

// CREATE /api/posts
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

// GET /api/posts/:slug
export async function getPostBySlug(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;
  try {
    const response = await Post.findOne({ slug: slug }).populate("author", "username");
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/posts/:id
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

// DELETE /api/posts/:id
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

// PATCH /api/posts/publish/:id
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
