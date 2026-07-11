import Link from "next/link";
import { formatDate, type PostMeta } from "../../lib/post-types";

// 单张可点击的文章卡片：被首页（限量展示）与 /posts 归档页（分页展示）共用。
// 纯展示标记，无 hooks，因此可在 server 与 client 组件里同时安全引用。
export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`} className="card-link">
      <article className="card">
        <div className="card__meta">
          <time className="card__date" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <span className="card__cat">{post.category}</span>
        </div>
        <h3 className="card__title">{post.title}</h3>
        <p className="card__excerpt">{post.excerpt}</p>
      </article>
    </Link>
  );
}
