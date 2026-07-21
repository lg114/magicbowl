// 首页渲染背景（纯 CSS 静态网格，见 globals.css 的 body::before）
// + 居中头像（从上往下淡入落下、持续弹跳，见 .avatar）
// + 头像下方的欢迎语（见 .welcome）
// + 箴言区 Wisdom（见 app/components/Wisdom.tsx，每次刷新随机展示一条 + 滚动提示箭头）。
// + 文章卡片区 PostCards（见 app/components/PostCards.tsx，首屏之下的第二屏，纯展示）。
// 主题切换按钮由 layout 中的 ThemeToggle 提供。
import Wisdom from "./components/Wisdom";
import PostCards from "./components/PostCards";
import FeaturedProjects from "./components/FeaturedProjects";
import Image from "next/image";
import { siteConfig } from "../lib/site";

export default function Home() {
  return (
    <>
      <main>
        {/* 首屏：hero + 箴言收进同一屏（100dvh），保持「不滚动也能看全」 */}
        <section className="screen">
          <div className="hero">
            {/* 头像舞台：相对定位，承载「落下入场 + 弹跳」的头像 */}
            <div className="avatar-stage">
              {/* 外层做一次性落下入场，内层 img 做无限弹跳，各管各的 transform 避免冲突 */}
              <div className="avatar-drop">
                <Image
                  src={siteConfig.avatar}
                  alt="Gc 的头像"
                  width={200}
                  height={200}
                  className="avatar"
                  priority
                  decoding="async"
                  sizes="(max-width: 480px) 130px, (max-width: 680px) 160px, 200px"
                />
              </div>
            </div>
            <div className="welcome">
              <p className="welcome__hi">
                你好，我是 <span className="welcome__name">Gc</span>{" "}
                <span className="welcome__wave">👋</span>
              </p>
              <p className="welcome__roles">
                我是一个{" "}
                <span className="role-word">学习者</span>
                {" · "}
                <span className="role-word">设计者</span>
                {" · "}
                <span className="role-word">阅读者</span>
                {" · "}
                <span className="role-word">开发者</span>
              </p>
              <div className="social">
                <a
                  className="social__link"
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg className="social__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.21 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                  </svg>
                </a>
                <a
                  className="social__link"
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                >
                  <svg className="social__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <Wisdom />
        </section>
        {/* 卡片区：首屏之下的第二屏，箭头滚动至此 */}
        <PostCards />
        {/* 精选项目：文章区下方，引流到 /projects */}
        <FeaturedProjects />
      </main>
    </>
  );
}
