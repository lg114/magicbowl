import type { Metadata } from "next";
import "./styles/globals.css";
import "./styles/clock.css";
import "./styles/blog.css";
import ThemeToggle from "./components/ThemeToggle";
import ClockBadge from "./components/ClockBadge";
import { siteConfig } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

// Set theme before first paint to avoid a flash of the wrong theme.
// Also disable browser scroll restoration so a refresh/Ctrl+R returns to the
// top instead of jumping back to a previous scroll position (e.g. #main-content).
const themeInitScript = `(function(){try{history.scrollRestoration='manual';}catch(e){}try{var t=localStorage.getItem('mb-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

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
        <ClockBadge />
      </body>
    </html>
  );
}
