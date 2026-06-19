"use client";

import { useLang } from "./LanguageContext";

const navItems = ["Home", "Project", "Blogs", "Books"];

type FloatingNavProps = {
  activeItem?: string;
};

export function FloatingNav({ activeItem = "Home" }: FloatingNavProps) {
  const { lang, toggle } = useLang();

  return (
    <nav className="floating-nav" aria-label="Site sections">
      {navItems.map((item) => (
        <a
          className={item === activeItem ? "nav-item is-active" : "nav-item"}
          href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
          key={item}
        >
          {item}
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
