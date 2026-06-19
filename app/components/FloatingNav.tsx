"use client";

import { useLang } from "./LanguageContext";

const navItems = [
  { en: "Home", cn: "首页", href: "/" },
  { en: "Hobbies", cn: "爱好", href: "/hobbies" },
  { en: "Project", cn: "项目", href: "/project" },
  { en: "Blogs", cn: "博客", href: "/blogs" },
  { en: "Books", cn: "书单", href: "/books" },
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
