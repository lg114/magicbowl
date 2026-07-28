import type { Metadata } from "next";
import { getAllPosts } from "../../lib/posts";
import PostsArchive from "../../components/PostsArchive";

export const metadata: Metadata = {
  title: "文章",
};

// 归档页：列出全部文章。标题、工具区、排序、侧边栏筛选都在 PostsArchive 内统一渲染。
export default function PostsPage() {
  const posts = getAllPosts();
  return (
    <main className="archive">
      <div className="cards__inner">
        <PostsArchive posts={posts} />
      </div>
    </main>
  );
}
