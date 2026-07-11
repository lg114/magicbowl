import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// YAML 里的 date（如 2024-01-15）会被解析为 JS Date 对象，
// 若直接 String() 会得到 "Mon Jan 15 ... GMT+0800 (香港标准时间)" 这种脏串。
// 这里统一归一化为机器可读的 YYYY-MM-DD，详情页/排序/dateTime 属性都干净。
function toISODate(d: unknown): string {
  if (typeof d === "string") {
    const parsed = new Date(d);
    if (Number.isNaN(parsed.getTime())) return d;
    d = parsed;
  }
  if (d instanceof Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  return "";
}

// 纯类型与无副作用工具独立成模块（post-types.ts），供 client 组件引用，
// 避免把 fs / path 等 Node API 一起打进浏览器包。
import type { Post, PostMeta } from "./post-types";
export type { Post, PostMeta } from "./post-types";
export { formatDate } from "./post-types";

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"));
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(POSTS_DIR, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);

  return {
    slug: realSlug,
    title: data.title ?? realSlug,
    date: toISODate(data.date),
    category: data.category ?? "未分类",
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt ?? "",
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      const { content: _content, ...meta } = post;
      return meta;
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getCategories(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const post of getAllPosts()) {
    map.set(post.category, (map.get(post.category) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getTags(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// 热门文章：默认按发布日期最近排序（可在 siteConfig 调整策略）
export function getPopularPosts(limit = 5): PostMeta[] {
  return getAllPosts().slice(0, limit);
}
