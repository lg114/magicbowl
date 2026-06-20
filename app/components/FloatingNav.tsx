"use client";

import { useLang } from "./LanguageContext";

const navItems = [
  { en: "Home", cn: "首页", href: "/" },
  { en: "Hobbies", cn: "爱好", href: "/hobbies" },
  { en: "Project", cn: "项目", href: "/project" },
  { en: "Blogs", cn: "博客", href: "/blogs" },
  { en: "Books", cn: "书单", href: "/books" },
];

const socialIcons = [
  {
    label: "GitHub",
    href: "https://github.com/lg114",
    svg: (
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/gc20010801",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

type FloatingNavProps = {
  activeItem?: string;
};

export function FloatingNav({ activeItem = "Home" }: FloatingNavProps) {
  const { lang, toggle } = useLang();

  return (
    <nav className="floating-nav" aria-label="Site sections">
      {navItems.map((item) => (
        <a
          className={
            item.en === activeItem ? "nav-item is-active" : "nav-item"
          }
          href={item.href}
          key={item.en}
        >
          {lang === "zh" ? item.cn : item.en}
        </a>
      ))}
      {socialIcons.map((icon) => (
        <a
          className="nav-icon"
          href={icon.href}
          target="_blank"
          rel="noreferrer"
          aria-label={icon.label}
          key={icon.label}
        >
          {icon.svg}
        </a>
      ))}
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
