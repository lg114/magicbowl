import Link from "next/link";
import { formatMonthDay, type PostMeta } from "../types/post";
import { siteConfig } from "../lib/site";

// 归档页：按年份分组的极简时间线。
// - 每组背后压一个巨大的半透明年份数字作水印（纯装饰，aria-hidden）
// - 每篇只显示 标题 + 日期 + 阅读时长，信息密度刻意压到最低
// 无搜索 / 筛选 / 排序 / 分页，因此不需要 "use client"，整页在服务端渲染。

interface YearGroup {
  year: number;
  posts: PostMeta[];
}

// 时间线：从站点起始年（siteConfig.startYear）逐年排到今年，**中间没有文章的年份也保留**，
// 让年份水印构成一条连续的「时间脊」；组内顺序沿用 getAllPosts 的日期倒序。
function buildTimeline(posts: PostMeta[]): YearGroup[] {
  const byYear = new Map<number, PostMeta[]>();
  for (const p of posts) {
    const y = Number(p.date.slice(0, 4));
    const bucket = byYear.get(y);
    if (bucket) bucket.push(p);
    else byYear.set(y, [p]);
  }

  const postYears = [...byYear.keys()];
  // 文章里若有早于/晚于配置范围的年份，也一并纳入，避免内容被漏掉
  const from = Math.min(siteConfig.startYear, ...postYears);
  const to = Math.max(new Date().getFullYear(), ...postYears);

  const out: YearGroup[] = [];
  for (let y = to; y >= from; y--) out.push({ year: y, posts: byYear.get(y) ?? [] });
  return out;
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
          {/* 背景水印：视觉上分隔年份，同时强化时间线结构 */}
          <span className="ygroup__watermark" aria-hidden="true">
            {year}
          </span>

          {/* 年份在视觉上由水印承担，这里只保留语义（屏幕阅读器可读） */}
          <h2 className="sr-only">{year}</h2>

          {list.length > 0 ? (
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
          ) : (
            // 这一年还没有文章：留一个极简占位，让时间线保持连续
            <p className="ygroup__empty" aria-hidden="true">
              —
            </p>
          )}
        </section>
      ))}
    </>
  );
}
