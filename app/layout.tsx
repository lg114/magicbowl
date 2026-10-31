import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { siteConfig } from "../lib/site";
import NavBar from "../components/NavBar";
import Brand from "../components/Brand";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  // Open Graph：社交分享预览（微信、Telegram、Discord 等）
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: siteConfig.name }],
  },
  // Twitter Card：X / Twitter 分享预览
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/api/og"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
};

// 仅深色主题。Service Worker 注册（仅 https 且非 localhost，避免干扰 dev 热更新）。
const swRegisterScript = `(function(){try{if('serviceWorker' in navigator&&location.protocol==='https:'&&location.hostname!=='localhost'){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){});});}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
        <head>
          <link rel="alternate" type="application/rss+xml" title="MagicBowl RSS" href="/feed.xml" />
          <meta name="theme-color" content="#000000" />
          <script dangerouslySetInnerHTML={{ __html: swRegisterScript }} />
        </head>
      <body className={inter.className}>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Brand />
        <NavBar />
        <div id="main-content">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
