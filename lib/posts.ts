import postsData from "./posts-data.json";
import type { Post, PostMeta } from "../types/post";

export type { Post, PostMeta } from "../types/post";

export function getPostSlugs(): string[] {
  return postsData.map((p) => p.slug + ".md");
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.md$/, "");
  const post = postsData.find((p) => p.slug === realSlug);
  if (!post) return null;
  return post as Post;
}

export function getAllPosts(): PostMeta[] {
  return postsData.map(({ html, headings, ...meta }) => meta);
}

export function getAllPostsFull(): Post[] {
  return postsData as Post[];
}
