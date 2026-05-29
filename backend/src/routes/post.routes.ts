import Router from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostBySlug,
  publishPost,
  updatePost,
} from "../controllers/post.controller";
import { authenticate } from "../middleware/authenticate";

const postRoutes = Router();

postRoutes.get("/", getAllPosts);
postRoutes.post("/", authenticate, createPost);
postRoutes.patch("/publish/:id", authenticate, publishPost);
postRoutes.get("/:slug", getPostBySlug);
postRoutes.patch("/:id", authenticate, updatePost);
postRoutes.delete("/:id", authenticate, deletePost);

export default postRoutes;
