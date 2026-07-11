import type { Metadata } from "next";
import "./styles/globals.css";
import { siteConfig } from "../lib/site";
import ThemeToggle from "./components/ThemeToggle";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
};

// 首屏前应用主题，避免闪烁。原型约定：localStorage key = memorized-theme，
// 未设置时跟随系统 prefers-color-scheme，回退为暗色（原型默认暗色）。
const themeInitScript = `(function(){try{var t=localStorage.getItem('memorized-theme');if(!t){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark';}if(t==='light'){document.documentElement.setAttribute('data-theme','light');}else{document.documentElement.removeAttribute('data-theme');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {/* 全屏萤火虫夜空层：body 级背景，所有路由共享（首页/归档/详情）。
            蓝点固定于 z-index:1，内容层（main 等）均在 z-index:2 之上，
            且 pointer-events:none 不挡交互。 */}
        <div className="firefly-field" aria-hidden="true">
          <span className="spark" />
          <span className="spark" />
          <span className="spark" />
          <span className="spark" />
          <span className="spark" />
          <span className="spark" />
          <span className="spark" />
          <span className="spark" />
          <span className="spark" />
          <span className="spark" />
          <span className="spark" />
          <span className="spark" />
        </div>
        <ThemeToggle />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
