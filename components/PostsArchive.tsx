import Link from "next/link";
import { formatMonthDay, type PostMeta } from "../types/post";

// 归档页：按年份分组的极简时间线（只生成有文章的年份）。
// - 每组背后压一个巨大的描边年份数字作水印（SVG 描边，纯装饰，aria-hidden）
// - 每篇只显示 标题 + 日期 + 阅读时长，信息密度刻意压到最低
// 无搜索 / 筛选 / 排序 / 分页，因此不需要 "use client"，整页在服务端渲染。

interface YearGroup {
  year: number;
  posts: PostMeta[];
}

// 时间线：只纳入有文章的年份（学 antfu.me/posts 的分组方式），没有文章的年份
// 不生成分组，避免空年只剩一个水印撑场面；组内顺序沿用 getAllPosts 的日期倒序。
function buildTimeline(posts: PostMeta[]): YearGroup[] {
  const byYear = new Map<number, PostMeta[]>();
  for (const p of posts) {
    const y = Number(p.date.slice(0, 4));
    const bucket = byYear.get(y);
    if (bucket) bucket.push(p);
    else byYear.set(y, [p]);
  }

  return [...byYear.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, list]) => ({ year, posts: list }));
}

export default function PostsArchive({ posts }: { posts: PostMeta[] }) {
  const groups = buildTimeline(posts);

  return (
    <>
      <header className="archive-page-header">
        <h1 className="archive-page-header__title">Blog</h1>
      </header>

      {groups.map(({ year, posts: list }) => (
        <section className="ygroup" key={year}>
          {/* 背景水印：SVG 描边年份，视觉上分隔年份（描边细节见 archive.css） */}
          <svg
            className="ygroup__watermark"
            viewBox="0 0 330 152"
            aria-hidden="true"
            focusable="false"
          >
            <text x="2" y="120">
              {year}
            </text>
          </svg>

          {/* 年份在视觉上由水印承担，这里只保留语义（屏幕阅读器可读） */}
          <h2 className="sr-only">{year}</h2>

          {list.length > 0 && (
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
                      <span>{post.readingTime} min</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </>
  );
}
