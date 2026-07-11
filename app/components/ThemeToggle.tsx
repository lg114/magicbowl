"use client";

import { useEffect, useState } from "react";

// 主题切换：与原型 blog.html 完全一致。
// - localStorage key = memorized-theme
// - 暗色（默认）时按钮显示「LIGHT」（点击切到亮色），亮色时显示「DARK」
export default function ThemeToggle() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const btn = document.getElementById("theme");
    const root = document.documentElement;

    const applyTheme = (t: string) => {
      if (t === "light") root.setAttribute("data-theme", "light");
      else root.removeAttribute("data-theme");
      const text = t === "light" ? "DARK" : "LIGHT";
      setLabel(text);
      if (btn) btn.textContent = text;
    };

    // 初始化为当前已生效的主题（首屏脚本已写好 data-theme）
    const current =
      root.getAttribute("data-theme") === "light" ? "light" : "dark";
    applyTheme(current);

    const onClick = () => {
      const next =
        root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try {
        localStorage.setItem("memorized-theme", next);
      } catch {
        /* ignore */
      }
    };

    btn?.addEventListener("click", onClick);
    return () => btn?.removeEventListener("click", onClick);
  }, []);

  return (
    <button id="theme" className="toggle" type="button" suppressHydrationWarning>
      {label}
    </button>
  );
}
