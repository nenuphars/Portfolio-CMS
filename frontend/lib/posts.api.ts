// frontend/lib/posts.ts
import { apiRequest } from "./api";
import { PaginationObject, Post, PostRequest, PostResponse } from "../types/Post.type";

export function getPosts(params?: { tag?: string; page?: number }) {
  const query = new URLSearchParams();
  if (params?.tag) query.set("tag", params.tag);
  if (params?.page) query.set("page", String(params.page));
  return apiRequest<{ posts: PostResponse[]; pagination: PaginationObject }>(`/api/posts?${query}`);
}

export function getTags() {
  return apiRequest<string[]>("/api/posts/tags");
}

export function getOwnPosts(token: string, params?: { tag?: string; page?: number }) {
  const query = new URLSearchParams();
  if (params?.tag) query.set("tag", params.tag);
  if (params?.page) query.set("page", String(params.page));
  return apiRequest<{ posts: PostResponse[]; pagination: PaginationObject }>(
    "/api/posts/own-posts",
    { token },
  );
}

export function getPost(slug: string) {
  return apiRequest<Post>(`/api/posts/${slug}`);
}

export function createPost(body: Partial<PostRequest>, token: string) {
  return apiRequest<PostResponse>("/api/posts", { method: "POST", body, token });
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
