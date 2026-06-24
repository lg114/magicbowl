import type { MetadataRoute } from "next";
import { getAllPosts } from "./lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://magicbowl.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/blogs`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/books`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/hobbies`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/project`, lastModified: new Date(), priority: 0.7 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blogs/${post.slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
