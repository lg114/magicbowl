import { getAllPosts } from "../../lib/posts";
import PostCard from "./PostCard";

// 首页卡片区（橱窗）：只展示最近 4 篇，其余交给 /posts 归档页。
// 本组件为 server component，直接读取文件系统生成静态 HTML。
export default function PostCards() {
  const all = getAllPosts();
  if (all.length === 0) return null;

  const posts = all.slice(0, 4);
  const total = all.length;

  return (
    <section className="cards" id="posts">
      <div className="cards__inner">
        <h2 className="cards__heading">文章</h2>
        <div className="cards__grid">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        {total > posts.length && (
          <a className="cards__more" href="/posts">
            查看全部 {total} 篇文章 →
          </a>
        )}
      </div>
    </section>
  );
}
