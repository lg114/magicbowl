import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/site";
import { getAllPosts } from "../lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  // 静态路由：首页始终收录 + nav 里的其余页面（nav 只控制导航显示，
  // 首页不显示在导航里但必须进 sitemap）
  const navHrefs = siteConfig.nav.map((item) => item.href);
  const staticHrefs = ["/", ...navHrefs.filter((href) => href !== "/")];
  const staticRoutes: MetadataRoute.Sitemap = staticHrefs.map((href) => ({
    url: `${base}${href}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: href === "/" ? 1 : 0.8,
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
