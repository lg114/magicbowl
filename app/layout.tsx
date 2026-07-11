import type { Metadata } from "next";
import "./styles/globals.css";
import { siteConfig } from "../lib/site";
import ThemeToggle from "./components/ThemeToggle";

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
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
