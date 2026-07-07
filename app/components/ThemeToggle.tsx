"use client";

import { useEffect, useState, type MouseEvent } from "react";

const STORAGE_KEY = "mb-theme";

export default function ThemeToggle() {
  // null until mounted → prevents a wrong icon flash before we read the DOM
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  const toggle = (e?: MouseEvent<HTMLButtonElement>) => {
    const next: "dark" | "light" = theme === "dark" ? "light" : "dark";

    const commit = () => {
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore storage errors (private mode, etc.) */
      }
      setTheme(next);
    };

    commit();

    // Button micro-interaction: scale down + fade as it switches themes.
    e?.currentTarget?.animate(
      [
        { transform: "scale(1)", opacity: 1 },
        { transform: "scale(0.4)", opacity: 0 },
      ],
      { duration: 500, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" }
    );
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label="切换明暗主题"
      title="切换明暗主题"
    >
      {theme === "light" ? (
        // Moon — switch to dark
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      ) : (
        // Sun — switch to light
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}
