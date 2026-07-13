import type { Metadata } from "next";
import "./styles/globals.css";
import { siteConfig } from "../lib/site";
import ThemeToggle from "./components/ThemeToggle";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
};

// 首屏前应用主题，避免闪烁。原型约定：localStorage key = memorized-theme，
// 未设置时跟随系统 prefers-color-scheme，回退为暗色（原型默认暗色）。
// 同时同步 theme-color meta，让 iOS Safari 的地址栏/刘海区颜色跟随主题。
// 末尾附 service worker 注册（仅 https 且非 localhost，避免干扰 dev 热更新）。
const themeInitScript = `(function(){try{var t=localStorage.getItem('memorized-theme');if(!t){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark';}var m=document.querySelector('meta[name="theme-color"]');if(t==='light'){document.documentElement.setAttribute('data-theme','light');if(m)m.setAttribute('content','#f6f6f6');}else{document.documentElement.removeAttribute('data-theme');if(m)m.setAttribute('content','#000000');}}catch(e){}try{if('serviceWorker' in navigator&&location.protocol==='https:'&&location.hostname!=='localhost'){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){});});}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
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
        <Footer />
      </body>
    </html>
  );
}
