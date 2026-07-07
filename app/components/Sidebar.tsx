import Link from "next/link";
import {
  formatDate,
  getCategories,
  getPopularPosts,
  getTags,
} from "../../lib/posts";

export default function Sidebar() {
  const categories = getCategories();
  const tags = getTags();
  const popular = getPopularPosts(5);

  const counts = tags.map((t) => t.count);
  const min = Math.min(...counts, 1);
  const max = Math.max(...counts, 1);

  return (
    <aside className="sidebar" aria-label="侧边栏">
      <section className="sidebar__block">
        <h3 className="sidebar__title">分类</h3>
        <ul className="category-nav">
          {categories.map((c) => (
            <li key={c.name}>
              <Link
                href={`/posts?category=${encodeURIComponent(c.name)}`}
                className="category-nav__link"
              >
                <span>{c.name}</span>
                <span className="category-nav__count">{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="sidebar__block">
        <h3 className="sidebar__title">标签云</h3>
        <div className="tag-cloud">
          {tags.map((t) => {
            const size = 0.82 + ((t.count - min) / (max - min || 1)) * 0.5;
            return (
              <Link
                key={t.name}
                href={`/posts?tag=${encodeURIComponent(t.name)}`}
                className="tag-cloud__item"
                style={{ fontSize: `${size}rem` }}
              >
                #{t.name}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="sidebar__block">
        <h3 className="sidebar__title">热门文章</h3>
        <ol className="popular-list">
          {popular.map((p) => (
            <li key={p.slug}>
              <Link href={`/posts/${p.slug}`} className="popular-list__link">
                <span className="popular-list__title">{p.title}</span>
                <time dateTime={p.date} className="popular-list__date">
                  {formatDate(p.date)}
                </time>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </aside>
  );
}
