import Link from "next/link";
import { formatDate, type PostMeta } from "../../lib/post-types";

// 归档页：传统博客文章流。
// 设计取向：每篇文章独立成一块（大标题 + 日期·分类 + 摘要），按年份分组，
// 年份做吸顶章节眉。阅读节奏接近独立博客，比「一行一篇」的密集表格更像一个文章流，
// 整块淡底板同时柔化背景网格，给眼睛一个落脚点（契合「眩晕安全区」偏好）。
// 全部文章一次性渲染、不翻页、无位移动效。

export default function PostsArchive({ posts }: { posts: PostMeta[] }) {
  // posts 已由 getAllPosts 按日期倒序排好，故首次遇到的年份即最新；
  // 直接按出现顺序塞进 Map，分组自然呈「年↓」排列。
  const groups = new Map<string, PostMeta[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4) || "未知";
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(post);
  }

  return (
    <div className="archive-list">
      {[...groups.entries()].map(([year, items]) => (
        <section className="archive-year" key={year}>
          <h2 className="archive-year__label">{year} 年</h2>
          <ul className="archive-feed">
            {items.map((post) => (
              <li key={post.slug}>
                <Link href={`/posts/${post.slug}`} className="feed-item">
                  <h3 className="feed-item__title">{post.title}</h3>
                  <div className="feed-item__meta">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="feed-item__dot" aria-hidden="true">
                      ·
                    </span>
                    <span className="feed-item__cat">{post.category}</span>
                  </div>
                  {post.excerpt ? (
                    <p className="feed-item__excerpt">{post.excerpt}</p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
