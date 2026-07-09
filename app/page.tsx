import Link from "next/link";
import type { CSSProperties } from "react";
import { getAllPosts } from "../lib/posts";
import { siteConfig } from "../lib/site";
import GitHubHeatmap from "./components/GitHubHeatmap";
import BootSplash from "./components/BootSplash";
import AvatarCard from "./components/AvatarCard";
import FootprintMap from "./components/FootprintMap";

export default function Home() {
  const posts = getAllPosts().slice(0, 5);

  // 爱好卡滚动时长：按项目数与技术栈等比，使两张卡滚动视觉速度一致
  // 技术栈 14 项 = 18s，爱好 6 项 ≈ 7.7s（技术栈保持默认 18s 不变）
  const hobbyMarqueeDuration = `${
    (siteConfig.hobbies.length / siteConfig.skills.length) * 18
  }s`;

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

        {/* 左列：技术栈（上） | 爱好（下） */}
        <div className="home-col-left">
          <div className="home-card home-card--skills">
            <h2 className="home-card__title">技术栈</h2>
            <div className="skill-tags">
              <div className="marquee-track">
                {siteConfig.skills.map((s) => (
                  <span key={s.name} className="skill-logo" title={s.name}>
                    <img src={s.logo} alt={s.name} />
                    <span className="skill-logo__name">{s.name}</span>
                  </span>
                ))}
              </div>
              <div className="marquee-track" aria-hidden="true">
                {siteConfig.skills.map((s) => (
                  <span key={`${s.name}-dup`} className="skill-logo">
                    <img src={s.logo} alt="" />
                    <span className="skill-logo__name">{s.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="home-card home-card--hobbies">
            <h2 className="home-card__title">爱好</h2>
            <div
              className="hobby-list"
              style={{ "--marquee-duration": hobbyMarqueeDuration } as CSSProperties}
            >
              <div className="marquee-track">
                {siteConfig.hobbies.map((h) => (
                  <span key={h} className="hobby-tag">
                    {h}
                  </span>
                ))}
              </div>
              <div className="marquee-track" aria-hidden="true">
                {siteConfig.hobbies.map((h) => (
                  <span key={`${h}-dup`} className="hobby-tag">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="home-card home-card--links">
            <h2 className="home-card__title">链接</h2>
            <div className="link-list">
              {siteConfig.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="link-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={l.label}
                >
                  <img src={l.logo} alt={l.label} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 项目卡片 */}
        <div className="home-card home-card--projects">
          <h2 className="home-card__title">项目</h2>
          <ul className="project-list">
            {siteConfig.projects.map((p) => (
              <li key={p.name}>
                <a
                  href={p.href}
                  className="project-item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="project-item__name">{p.name}</span>
                  <span className="project-item__desc">{p.desc}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FootprintMap footprints={siteConfig.footprints} />

        {/* 第三行：足迹 | GitHub 热力图 */}
        <div className="home-card home-card--heatmap">
          <h2 className="home-card__title">GitHub 热力图</h2>
          <GitHubHeatmap />
        </div>
      </div>
    </main>
  );
}
