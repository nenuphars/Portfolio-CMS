import Router from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  getPostBySlug,
  getTags,
  publishPost,
  updatePost,
} from "../controllers/post.controller";
import { authenticate } from "../middleware/authenticate";

const postRoutes = Router();

postRoutes.get("/", getAllPosts);
postRoutes.get("/my-posts", authenticate, getMyPosts);
postRoutes.get("/tags", getTags);
postRoutes.post("/", authenticate, createPost);
postRoutes.patch("/publish/:id", authenticate, publishPost);
postRoutes.get("/:slug", getPostBySlug);
postRoutes.patch("/:id", authenticate, updatePost);
postRoutes.delete("/:id", authenticate, deletePost);

export default postRoutes;
