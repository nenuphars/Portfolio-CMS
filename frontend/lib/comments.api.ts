import { CommentType } from "@/types/Comment.type";
import { apiRequest } from "./api";

export function listComments(postId: string) {
  return apiRequest<CommentType[]>(`/api/comments/list/${postId}`);
}

export function createComment(postId: string, body: Partial<Comment>, token: string) {
  return apiRequest<CommentType>(`/api/comments/${postId}`, { method: "Post", body, token });
}

export function deleteComment(commentId: string, token: string) {
  return apiRequest<void>(`/api/Comments/${commentId}`, { method: "DELETE", token });
}
