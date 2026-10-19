import type { Metadata } from "next";
import { getAllPosts } from "../../lib/posts";
import PostsArchive from "../../components/PostsArchive";

export const metadata: Metadata = {
  title: "Blog",
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
