import type { Metadata } from "next";
import { getAllPosts } from "../../lib/posts";
import { siteConfig } from "../../lib/site";
import PostsArchive from "../../components/PostsArchive";

export const metadata: Metadata = {
  title: "Blog",
  description: "所有文章归档，按时间线浏览。",
  alternates: { canonical: `${siteConfig.url}/posts` },
  openGraph: {
    title: "Blog - MagicBowl",
    description: "所有文章归档，按时间线浏览。",
    type: "website",
    images: [{ url: "/api/og?title=Blog", width: 1200, height: 630, alt: "Blog - MagicBowl" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - MagicBowl",
    description: "所有文章归档，按时间线浏览。",
    images: ["/api/og?title=Blog"],
  },
};

// 归档页：极简时间线。按年份分组的渲染逻辑在 PostsArchive 内。
export default function PostsPage() {
  const posts = getAllPosts();
  return (
    <main className="blog">
      <div className="blog__inner">
        <PostsArchive posts={posts} />
      </div>
    </main>
  );
}
