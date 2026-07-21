"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { formatDate, type PostMeta } from "../../lib/post-types";

// 单页渲染文章数上限：超过则出现「加载更多」做客户端分页。
// 当前全站仅个位数文章，阈值门控使该逻辑静默；将来文章破 50 篇自动生效。
const PAGE_SIZE = 50;

// 相对日期：一个月内显示「N 天前 / 昨天 / 今天」，超过一个月显示完整日期。
function relativeDate(iso: string): string {
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return iso;
  const dayMs = 1000 * 60 * 60 * 24;
  const diffDays = Math.floor((Date.now() - then.getTime()) / dayMs);
  if (diffDays > 30) return formatDate(iso);
  if (diffDays <= 0) return "今天";
  if (diffDays === 1) return "昨天";
  return `${diffDays}天前`;
}

// 归档页：按年分组的博客文章流。
// 顶部：eyebrow+标题 → 计数/排序 → 搜索框 + 标签触发器 → 展开的分类/标签面板 → 文章流（按年分段、年份吸顶）。
// 筛选：搜索匹配标题/摘要；分类、标签为单选胶囊；排序支持最新/最早。
// 全部逻辑在浏览器内完成，动效仅颜色过渡（眩晕安全区）。

type SortOrder = "desc" | "asc";

interface TagWithCount {
  name: string;
  count: number;
}

interface YearGroup {
  year: number;
  posts: PostMeta[];
}

export default function PostsArchive({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOrder>("desc");
  const [tagsOpen, setTagsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // 分类与标签（带计数）。
  const categories = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of posts) {
      if (p.category) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    }
    return [...map.entries()].map(([name, count]) => ({ name, count }));
  }, [posts]);

  const tags = useMemo<TagWithCount[]>(() => {
    const map = new Map<string, number>();
    for (const p of posts) for (const t of p.tags) map.set(t, (map.get(t) ?? 0) + 1);
    return [...map.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "zh"));
  }, [posts]);

  // 过滤 + 排序。
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = posts.filter((p) => {
      if (activeCat && p.category !== activeCat) return false;
      if (activeTag && !p.tags.includes(activeTag)) return false;
      if (q) {
        const hay = `${p.title} ${p.excerpt}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (sort === "asc") list = [...list].reverse();
    return list;
  }, [posts, activeCat, activeTag, query, sort]);

  // 筛选条件变化时，分页游标回到首页，避免「加载更多」后残留旧偏移。
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, activeCat, activeTag, sort]);

  // 阈值分页：只取前 visibleCount 篇，再按年分组（年份顺序随排序）。
  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );
  const groups = useMemo<YearGroup[]>(() => {
    const map = new Map<number, PostMeta[]>();
    for (const p of visible) {
      const year = Number(p.date.slice(0, 4));
      const arr = map.get(year);
      if (arr) arr.push(p);
      else map.set(year, [p]);
    }
    return [...map.entries()]
      .map(([year, ps]) => ({ year, posts: ps }))
      .sort((a, b) => (sort === "asc" ? a.year - b.year : b.year - a.year));
  }, [visible, sort]);

  const hasFilter = Boolean(activeCat || activeTag || query.trim());
  const clearFilters = () => {
    setQuery("");
    setActiveCat(null);
    setActiveTag(null);
  };

  return (
    <div className="archive-list">
      <header className="archive-page-header">
        <span className="archive-page-header__eyebrow">博客</span>
        <h1 className="archive-page-header__title">全部文章</h1>
      </header>

      <div className="archive-layout">
        {/* 左主列：工具栏 + 搜索行 + 文章卡片流（单/双栏皆在） */}
        <div className="archive-feed-wrap">
          <div className="archive-toolbar">
            <p className="archive-count">
              {hasFilter ? `${filtered.length} 篇` : `共 ${posts.length} 篇`}
            </p>
            <div className="sort-row" role="group" aria-label="排序">
              <button
                type="button"
                className={"sort-btn" + (sort === "desc" ? " is-active" : "")}
                onClick={() => setSort("desc")}
              >
                最新
              </button>
              <button
                type="button"
                className={"sort-btn" + (sort === "asc" ? " is-active" : "")}
                onClick={() => setSort("asc")}
              >
                最早
              </button>
            </div>
          </div>

          {/* 搜索框：大屏独占一行；小屏与「标签 ▾」并排，坐在工具栏和文章之间 */}
          <div className="archive-filter-bar">
            <input
              type="search"
              className="archive-search"
              placeholder="搜索标题或摘要…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="搜索文章"
            />
            <button
              type="button"
              className={"filter-bar__toggle" + (tagsOpen ? " is-active" : "")}
              onClick={() => setTagsOpen((o) => !o)}
              aria-expanded={tagsOpen}
            >
              标签
              <span className="filter-toggle__icon" aria-hidden="true">
                {tagsOpen ? "▴" : "▾"}
              </span>
            </button>
          </div>

          {/* 小屏展开的分类/标签面板（大屏隐藏，改用右侧栏） */}
          {tagsOpen && (
            <div className="archive-filter-panel archive-filter-panel--mobile">
              <div className="filter-section">
                <span className="filter-section__label">分类</span>
                <div className="filter-cloud" role="group" aria-label="按分类筛选">
                  {categories.map(({ name, count }) => (
                    <button
                      key={name}
                      type="button"
                      className={"chip" + (activeCat === name ? " is-active" : "")}
                      onClick={() => setActiveCat(activeCat === name ? null : name)}
                    >
                      {name} <span className="tag-count">({count})</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="filter-section">
                <span className="filter-section__label">标签</span>
                <div className="filter-cloud" role="group" aria-label="按标签筛选">
                  {tags.map(({ name, count }) => (
                    <button
                      key={name}
                      type="button"
                      className={"chip" + (activeTag === name ? " is-active" : "")}
                      onClick={() => setActiveTag(activeTag === name ? null : name)}
                    >
                      {name} <span className="tag-count">({count})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="archive-empty">
              <p>没有匹配的文章</p>
              <button type="button" className="chip" onClick={clearFilters}>
                清除筛选
              </button>
            </div>
          ) : (
            <div className="archive-years">
              {groups.map(({ year, posts: items }) => (
                <section className="archive-year" key={year}>
                  <h2 className="archive-year__label" aria-label={`${year} 年`}>
                    {year}
                  </h2>
                  <ul className="archive-feed">
                    {items.map((post) => (
                      <li key={post.slug}>
                        <Link href={`/posts/${post.slug}`} className="feed-item">
                          <h3 className="feed-item__title">{post.title}</h3>
                          <p className="feed-item__excerpt">{post.excerpt}</p>
                          <div className="feed-item__meta">
                            <time dateTime={post.date} suppressHydrationWarning>
                              {relativeDate(post.date)}
                            </time>
                            <span className="feed-item__dot" aria-hidden="true">
                              ·
                            </span>
                            <span className="feed-item__cat">{post.category}</span>
                            {post.tags.map((tag) => (
                              <span key={tag} className="feed-item__tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              {filtered.length > visibleCount && (
                <div className="archive-loadmore-wrap">
                  <button
                    type="button"
                    className="archive-loadmore"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  >
                    加载更多（{filtered.length - visibleCount} 篇）
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 右栏：分类 / 标签云（大屏常驻，小屏隐藏 → 改用上方「标签 ▾」） */}
        <aside className="archive-aside" aria-label="筛选">
          {/* 统计头部：维度总量（分类/标签数），mono 小字弱化，让 sticky 侧栏不显得空。
              不含篇数——主列工具栏已承担「当前/共 N 篇」，此处避免重复 */}
          <p className="archive-stats">
            {categories.length} 分类 · {tags.length} 标签
          </p>
          <div className="filter-section">
            <span className="filter-section__label">分类</span>
            <div className="filter-cloud" role="group" aria-label="按分类筛选">
              {categories.map(({ name, count }) => (
                <button
                  key={name}
                  type="button"
                  className={"chip" + (activeCat === name ? " is-active" : "")}
                  onClick={() => setActiveCat(activeCat === name ? null : name)}
                >
                  {name} <span className="tag-count">({count})</span>
                </button>
              ))}
            </div>
          </div>
          <div className="filter-section">
            <span className="filter-section__label">标签</span>
            <div className="filter-cloud" role="group" aria-label="按标签筛选">
              {tags.map(({ name, count }) => (
                <button
                  key={name}
                  type="button"
                  className={"chip" + (activeTag === name ? " is-active" : "")}
                  onClick={() => setActiveTag(activeTag === name ? null : name)}
                >
                  {name} <span className="tag-count">({count})</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
