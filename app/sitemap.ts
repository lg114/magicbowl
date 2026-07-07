import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/site";
import { getAllPosts } from "../lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/posts`, lastModified: new Date() },
    { url: `${siteConfig.url}/about`, lastModified: new Date() },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteConfig.url}/posts/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...postRoutes];
}
