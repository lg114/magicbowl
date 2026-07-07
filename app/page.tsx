import "./styles/home.css";
import "./styles/blog.css";
import Link from "next/link";
import { getAllPosts } from "../lib/posts";
import { siteConfig } from "../lib/site";

export default function Home() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <main className="home-wrap">
      <div className="home-grid">
        {/* Row 1: 技术栈 | MagicBowl | 头像 */}
        <div className="home-card home-card--skills">
          <h2 className="home-card__title">技术栈</h2>
          <div className="skill-tags">
            {siteConfig.skills.map((s) => (
              <span key={s} className="skill-tag">
                {s}
              </span>
            ))}
          </div>
        </div>

        <h1 className="home-title-cell">{siteConfig.name}</h1>

        <div className="home-card home-card--avatar">
          <div className="avatar-placeholder">
            <span className="avatar-placeholder__text">头像</span>
          </div>
        </div>

        {/* Row 2: 文章 | 关于我 | 爱好 */}
        <div className="home-card home-card--posts">
          <div className="home-card__header">
            <h2 className="home-card__title">文章</h2>
            <Link href="/posts" className="home-card__more">
              全部 →
            </Link>
          </div>
          <ul className="home-post-list">
            {posts.length > 0 ? (
              posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/posts/${post.slug}`} className="home-post-item">
                    <span className="home-post-item__title">{post.title}</span>
                    <span className="home-post-item__date">
                      {new Date(post.date).toLocaleDateString("zh-CN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </Link>
                </li>
              ))
            ) : (
              <p className="empty-state">还没有文章，敬请期待。</p>
            )}
          </ul>
        </div>

        <div className="home-card home-card--about">
          <h2 className="home-card__title">关于我</h2>
          <p className="about-brief">
            你好，我是 MagicBowl。这里记录我的技术探索、设计思考与生活碎片。
          </p>
          <Link href="/about" className="home-card__action">
            了解更多 →
          </Link>
        </div>

        <div className="home-card home-card--hobbies">
          <h2 className="home-card__title">爱好</h2>
          <div className="hobby-list">
            {siteConfig.hobbies.map((h) => (
              <span key={h} className="hobby-tag">
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
