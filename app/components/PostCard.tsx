import Link from "next/link";
import { type PostMeta } from "../../lib/post-types";

// 时间线条目：日期·分类 元信息行 + 衬线标题，沿一条静止细竖线排列。
// 仅用于首页「最近文章」；详情页 meta 仍复用 .card__date / .card__cat。
function shortDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <li className="post-timeline__item">
      <Link href={`/posts/${post.slug}`} className="post-timeline__row">
        <span className="post-timeline__meta">
          <time className="card__date" dateTime={post.date}>
            {shortDate(post.date)}
          </time>
          <span className="post-timeline__cat">{post.category}</span>
        </span>
        <span className="post-timeline__title">{post.title}</span>
      </Link>
    </li>
  );
}
