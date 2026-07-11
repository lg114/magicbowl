"use client";

import { useEffect, useState } from "react";

// 主题切换：与原型 blog.html 语义一致。
// - localStorage key = memorized-theme
// - 当前为暗色（默认）时按钮显示「LIGHT」（点击切到亮色）+ 太阳图标
// - 当前为亮色时按钮显示「DARK」+ 月亮图标
// 用 React 状态渲染「图标 + 文字」，避免 textContent 覆盖子节点，
// 也让右上角胶囊的视觉重量与左上角 NavBar 更接近、左右更平衡。

type Mode = { label: string; icon: "sun" | "moon" };

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    const btn = document.getElementById("theme");
    const root = document.documentElement;

    const sync = () => {
      const isLight = root.getAttribute("data-theme") === "light";
      setMode(isLight ? { label: "DARK", icon: "moon" } : { label: "LIGHT", icon: "sun" });
    };

    const onClick = () => {
      const next =
        root.getAttribute("data-theme") === "light" ? "dark" : "light";
      if (next === "light") root.setAttribute("data-theme", "light");
      else root.removeAttribute("data-theme");
      try {
        localStorage.setItem("memorized-theme", next);
      } catch {
        /* ignore */
      }
      sync();
    };

    sync();
    btn?.addEventListener("click", onClick);
    return () => btn?.removeEventListener("click", onClick);
  }, []);

  return (
    <button
      id="theme"
      className="toggle"
      type="button"
      suppressHydrationWarning
      aria-label="切换明暗主题"
    >
      {mode && (
        <>
          <span className="toggle__icon" aria-hidden="true">
            {mode.icon === "sun" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </span>
          <span className="toggle__label">{mode.label}</span>
        </>
      )}
    </button>
  );
}
