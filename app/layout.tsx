import type { Metadata } from "next";
import "../styles/globals.css";
import { siteConfig } from "../lib/site";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

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

// 仅深色主题。Service Worker 注册（仅 https 且非 localhost，避免干扰 dev 热更新）。
const swRegisterScript = `(function(){try{if('serviceWorker' in navigator&&location.protocol==='https:'&&location.hostname!=='localhost'){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){});});}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" data-scroll-behavior="smooth">
        <head>
          <meta name="theme-color" content="#000000" />
          <script dangerouslySetInnerHTML={{ __html: swRegisterScript }} />
        </head>
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
