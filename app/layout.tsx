import type { Metadata } from "next";
import "./styles/globals.css";
import "./styles/clock.css";
import ThemeToggle from "./components/ThemeToggle";
import ClockBadge from "./components/ClockBadge";

export const metadata: Metadata = {
  title: "MagicBowl",
  description: "",
};

// Set theme before first paint to avoid a flash of the wrong theme.
const themeInitScript = `(function(){try{var t=localStorage.getItem('mb-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

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
