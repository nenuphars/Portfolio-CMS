import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { createComment, deleteComment, listComments } from "../controllers/comment.controller";

const commentRoutes = Router();

commentRoutes.get("/list/:postId", listComments);
commentRoutes.post("/:postId", authenticate, createComment);
commentRoutes.delete("/:commentId", authenticate, deleteComment);

export default commentRoutes;
