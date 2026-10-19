import Link from "next/link";
import { formatMonthDay, type PostMeta } from "../types/post";

// 归档页：按年份分组的极简时间线。
// - 每组背后压一个巨大的半透明年份数字作水印（纯装饰，aria-hidden）
// - 每篇只显示 标题 + 日期 + 阅读时长，信息密度刻意压到最低
// 无搜索 / 筛选 / 排序 / 分页，因此不需要 "use client"，整页在服务端渲染。

interface YearGroup {
  year: number;
  posts: PostMeta[];
}

// getAllPosts 已按日期倒序；这里只分组，组内顺序与年份倒序都保持不变。
function groupByYear(posts: PostMeta[]): YearGroup[] {
  const map = new Map<number, PostMeta[]>();
  for (const p of posts) {
    const year = Number(p.date.slice(0, 4));
    const bucket = map.get(year);
    if (bucket) bucket.push(p);
    else map.set(year, [p]);
  }
  return [...map.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, list]) => ({ year, posts: list }));
}

export default function PostsArchive({ posts }: { posts: PostMeta[] }) {
  const groups = groupByYear(posts);

  return (
    <>
      <header className="archive-page-header">
        <h1 className="archive-page-header__title">Blog</h1>
      </header>

      {groups.map(({ year, posts: list }) => (
        <section className="ygroup" key={year}>
          {/* 背景水印：视觉上分隔年份，同时强化时间线结构 */}
          <span className="ygroup__watermark" aria-hidden="true">
            {year}
          </span>

          {/* 年份在视觉上由水印承担，这里只保留语义（屏幕阅读器可读） */}
          <h2 className="sr-only">{year}</h2>

          <ul className="ygroup__list">
            {list.map((post) => (
              <li className="ygroup__item" key={post.slug}>
                <Link className="ygroup__link" href={`/posts/${post.slug}`}>
                  <span className="ygroup__title">{post.title}</span>
                  <span className="ygroup__meta">
                    <time dateTime={post.date}>{formatMonthDay(post.date)}</time>
                    <span className="ygroup__sep" aria-hidden="true">
                      ·
                    </span>
                    <span>{post.readingTime} min read</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
