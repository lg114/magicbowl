import Link from "next/link";
import { formatDate, type PostMeta } from "../../lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="post-card">
      <div className="post-card__meta">
        <Link
          href={`/posts?category=${encodeURIComponent(post.category)}`}
          className="post-card__category"
        >
          {post.category}
        </Link>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
      <h2 className="post-card__title">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>
      {post.excerpt && <p className="post-card__excerpt">{post.excerpt}</p>}
      {post.tags.length > 0 && (
        <ul className="post-card__tags">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/posts?tag=${encodeURIComponent(tag)}`}
                className="tag-pill"
              >
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
