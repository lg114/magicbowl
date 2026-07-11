import type { Metadata } from "next";
import { getAllPosts } from "../../lib/posts";
import PostsArchive from "../components/PostsArchive";

export const metadata: Metadata = {
  title: "Writing",
};

// 归档页（仓库）：列出全部文章，交给客户端 PostsArchive 做分页翻页。
// 首页只放「最近 4 篇」作为橱窗，这里才是完整列表。
export default function PostsPage() {
  const posts = getAllPosts();
  return (
    <main className="archive">
      <div className="cards__inner">
        <h1 className="cards__heading">All posts</h1>
        <PostsArchive posts={posts} />
      </div>
    </main>
  );
}
