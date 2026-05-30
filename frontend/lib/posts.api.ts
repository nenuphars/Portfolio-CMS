// frontend/lib/posts.ts
import { apiRequest } from "./api";
import { Post } from "../types/Post.type";

export function getPosts(params?: { tag?: string; page?: number }) {
  const query = new URLSearchParams();
  if (params?.tag) query.set("tag", params.tag);
  if (params?.page) query.set("page", String(params.page));
  return apiRequest<{ posts: Post[]; pagination: object }>(`/api/posts?${query}`);
}

export function getPost(slug: string) {
  return apiRequest<Post>(`/api/posts/${slug}`);
}

export function createPost(body: Partial<Post>, token: string) {
  return apiRequest<Post>("/api/posts", { method: "POST", body, token });
}

export function updatePost(id: string, body: Partial<Post>, token: string) {
  return apiRequest<Post>(`/api/posts/${id}`, { method: "PATCH", body, token });
}

export function deletePost(id: string, token: string) {
  return apiRequest<void>(`/api/posts/${id}`, { method: "DELETE", token });
}

export function publishPost(id: string, token: string) {
  return apiRequest<Post>(`/api/posts/${id}/publish`, { method: "PATCH", token });
}
