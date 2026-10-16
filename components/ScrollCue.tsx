"use client";

import { useEffect, useState, type MouseEvent } from "react";

// 首屏底部的「向下滚动」入口：点击平滑滚到文章卡片区顶部（而非页底），
// 让箭头成为通往下方卡片的入口。
export default function ScrollCue() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  const scrollDown = (e: MouseEvent) => {
    e.stopPropagation();
    const target = document.querySelector<HTMLElement>(".cards");
    const top = target
      ? target.getBoundingClientRect().top + window.scrollY
      : document.body.scrollHeight;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section className="scroll-cue-section">
      <button className="scroll-cue" aria-label="向下滚动" onClick={scrollDown}>
        <span className="scroll-cue__arrow" aria-hidden="true" />
        <span className="scroll-cue__label" aria-hidden="true">
          SCROLL
        </span>
      </button>
    </section>
  );
}
