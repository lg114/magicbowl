import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/site";
import { getAllPosts } from "../lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  // 静态路由：直接来自 nav 唯一真相源（首页/文章/项目…新增页面只改 lib/site.ts）
  const staticRoutes: MetadataRoute.Sitemap = siteConfig.nav.map((item) => ({
    url: `${base}${item.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: item.href === "/" ? 1 : 0.8,
  }));

  // 文章路由：每篇 slug 一个条目，lastModified 用文章日期（YYYY-MM-DD）
  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/posts/${post.slug}`,
    lastModified: post.date || new Date().toISOString().slice(0, 10),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
