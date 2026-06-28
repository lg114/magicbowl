"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "../context/LanguageContext";

const navItems = [
  { en: "Home", cn: "首页", href: "/", match: ["/"] },
  { en: "Writing", cn: "写作", href: "/blogs", match: ["/blogs", "/books"] },
  { en: "Bowl", cn: "碗里", href: "/hobbies", match: ["/hobbies", "/project"] },
];

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function FloatingNav() {
  const { lang, toggle } = useLang();
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  };

  const isActive = (item: (typeof navItems)[number]) => {
    if (item.match.length === 1 && item.match[0] === "/") {
      return pathname === "/";
    }
    return item.match.some((p) => pathname.startsWith(p));
  };

  return (
    <nav className="floating-nav" aria-label="Site sections">
      {navItems.map((item) => (
        <Link
          className={isActive(item) ? "nav-item is-active" : "nav-item"}
          href={item.href}
          key={item.en}
        >
          {lang === "zh" ? item.cn : item.en}
        </Link>
      ))}
      <button
        className="theme-toggle"
        type="button"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        onClick={toggleTheme}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
      <button
        className="language-toggle"
        type="button"
        aria-label="Switch language"
        onClick={toggle}
      >
        {lang === "en" ? "中" : "En"}
      </button>
    </nav>
  );
}
