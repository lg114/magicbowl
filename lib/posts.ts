import type { Post, PostMeta } from "../types/post";
export type { Post, PostMeta } from "../types/post";
export { formatDate } from "../types/post";

// 文章数据在构建时由 scripts/generate-posts-data.ts 生成，内联到 bundle 中。
// Cloudflare Workers 运行时无法访问文件系统，因此不在此处使用 fs。
import postsData from "./posts-data.json";

export function getPostSlugs(): string[] {
  return postsData.map((p) => `${p.slug}.md`);
}

// 估算阅读时长：中文按 400 字/分、西文按 220 词/分，最少 1 分钟。
// 先剔除代码块与行内代码——代码不计入阅读字数，否则技术文章会被高估。
function estimateReadingTime(md: string): number {
  const text = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~|]/g, " ");
  const cjk = (text.match(/[\u3400-\u9fff]/g) ?? []).length;
  const latin = (text.replace(/[\u3400-\u9fff]/g, " ").match(/[A-Za-z0-9'’]+/g) ?? []).length;
  return Math.max(1, Math.round(cjk / 400 + latin / 220));
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.md$/, "");
  const post = postsData.find((p) => p.slug === realSlug);
  if (!post) return null;

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    category: post.category,
    tags: post.tags,
    excerpt: post.excerpt,
    readingTime: post.readingTime,
    content: post.content,
  };
}

// 模块级缓存：整个进程内只解析一次全部文章（灰度/解析开销集中在构建期），
// 归档页 / sitemap 都共享这一份结果，避免重复读盘。
let _allPostsCache: PostMeta[] | null = null;

export function getAllPosts(): PostMeta[] {
  if (_allPostsCache) return _allPostsCache;
  _allPostsCache = postsData
    .map((post) => {
      const { content: _content, ...meta } = post;
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return _allPostsCache;
}
