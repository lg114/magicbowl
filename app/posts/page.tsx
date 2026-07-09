import "../styles/blog.css";
import type { Metadata } from "next";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import { getAllPosts } from "../../lib/posts";

export const metadata: Metadata = {
  title: "文章",
  description: "所有文章，支持按分类与标签筛选。",
};

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string }>;
}) {
  const { category, tag } = await searchParams;
  let posts = getAllPosts();
  if (category) posts = posts.filter((p) => p.category === category);
  if (tag) posts = posts.filter((p) => p.tags.includes(tag));

  const filterLabel = category
    ? `分类 · ${category}`
    : tag
    ? `标签 · #${tag}`
    : null;

  return (
    <main className="blog-shell">
      <div className="blog-main">
        <Link href="/" className="back-link back-link--top">
          ← 返回主页面
        </Link>
        <div className="section-head">
          <h1 className="section-title">文章</h1>
          {filterLabel && (
            <span className="filter-chip">
              {filterLabel}
              <Link href="/posts" className="filter-chip__clear">
                清除筛选
              </Link>
            </span>
          )}
        </div>
        {posts.length > 0 ? (
          <div className="post-list">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="empty-state">没有符合条件的文章。</p>
        )}
      </div>
      <Sidebar />
    </main>
  );
}
