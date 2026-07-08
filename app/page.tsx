import "./styles/home.css";
import "./styles/blog.css";
import Link from "next/link";
import { getAllPosts } from "../lib/posts";
import { siteConfig } from "../lib/site";
import GitHubHeatmap from "./components/GitHubHeatmap";
import BootSplash from "./components/BootSplash";
import AvatarCard from "./components/AvatarCard";

export default function Home() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <main className="home-wrap">
      {/* 启动动画：每次刷新显示碗 ~1.2s 后淡出 */}
      <BootSplash />
      <div className="home-grid">
        {/* 第一行：头像（左） | 关于我（右，占两列） */}
        <div className="home-card home-card--about">
          <p className="about-greeting">你好，我是 Gc 👋</p>
          <p className="about-line">欢迎来到我的 magic bowl 🔮！</p>
          <p className="about-line">我喜欢捣鼓东西，最近对 AI 和 LLMs 特别着迷。</p>
          <p className="about-line">不忙的时候，我喜欢去健身房锻炼 💪🏻 和打斯诺克 🎱。</p>
          <p className="about-line">除此之外，我有空的时候会阅读有关哲学、历史和自我提升的书籍 📚。</p>
        </div>

        <AvatarCard />

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

        {/* 第二行：爱好 | 技术栈 | 文章 */}
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

        <div className="home-card home-card--footprints">
          <h2 className="home-card__title">足迹</h2>
          <div className="footprint-list">
            {siteConfig.footprints.map((f) => (
              <span key={f} className="footprint-tag">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* 第三行：足迹 | GitHub 热力图（占两列） */}
        <div className="home-card home-card--heatmap">
          <h2 className="home-card__title">GitHub 热力图</h2>
          <GitHubHeatmap />
        </div>
      </div>
    </main>
  );
}
