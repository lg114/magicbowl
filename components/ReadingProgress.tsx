"use client";

import { useEffect, useRef } from "react";

// 顶部阅读进度条。页面没有滚动条时藏起它：整篇已在视野内，进度无意义。
export default function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) {
        bar.style.display = "none";
      } else {
        bar.style.display = "";
        bar.style.width = `${Math.min(100, (window.scrollY / max) * 100)}%`;
      }
    };
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    update();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return <div ref={ref} className="reading-progress" aria-hidden="true" />;
}
