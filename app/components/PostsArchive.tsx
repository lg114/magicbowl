import Link from "next/link";
import type { PostMeta } from "../../lib/post-types";

// 归档页：紧凑列表 + 按年分组。
// 设计取向：文章数量大时，卡片网格信息密度低、翻页累；
// 改为「一行一篇」的列表（日期 + 标题 + 分类），再按年份分段，
// 年份做吸顶小标题，一屏可扫 15–20 篇，几百篇也不慌。
// 全部文章一次性渲染、不翻页、无位移动效，契合「眩晕安全区」偏好。

// 由 YYYY-MM-DD 取「M月D日」，省去年份（年份已是分组标题）。
function shortDate(iso: string): string {
  const [, m, d] = iso.split("-");
  if (!m || !d) return iso;
  return `${Number(m)}月${Number(d)}日`;
}

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
          <h2 className="archive-year__label">{year}</h2>
          <ul className="archive-rows">
            {items.map((post) => (
              <li key={post.slug}>
                <Link href={`/posts/${post.slug}`} className="archive-row">
                  <time className="archive-row__date" dateTime={post.date}>
                    {shortDate(post.date)}
                  </time>
                  <span className="archive-row__title">{post.title}</span>
                  <span className="archive-row__cat">{post.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
