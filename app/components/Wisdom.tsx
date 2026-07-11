"use client";

import { useEffect, useState, type MouseEvent } from "react";

// 箴言数组：来自 gc 指定（含署名）。每次刷新随机展示一条，点击句子也可随机换一条。
const QUOTES = [
  { text: "Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
];

// 取一个随机下标；传入 exclude 时保证与当前不同（用于点击换句）。
function randomIndex(exclude?: number): number {
  if (QUOTES.length <= 1) return 0;
  const notThis = exclude ?? -1;
  let i = notThis;
  while (i === notThis) {
    i = Math.floor(Math.random() * QUOTES.length);
  }
  return i;
}

export default function Wisdom() {
  const [index, setIndex] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    setIndex(randomIndex()); // 每次挂载（即每次刷新）随机选一条
  }, []);

  // 服务端首屏与客户端首次渲染都返回 null，避免「随机值」造成的 hydration 不一致；
  // 挂载后由上面的 effect 随机填入，再以淡入呈现。
  if (index === null) return null;

  const advance = () => setIndex((prev) => randomIndex(prev ?? undefined));
  const scrollDown = (e: MouseEvent) => {
    e.stopPropagation();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const q = QUOTES[index];

  return (
    <section className="wisdom">
      <blockquote
        className="wisdom__quote"
        key={index}
        onClick={advance}
        title="点击换一句"
      >
        <span className="wisdom__text">{q.text}</span>
        <cite className="wisdom__cite">— {q.author}</cite>
      </blockquote>
      <button className="scroll-cue" aria-label="向下滚动" onClick={scrollDown}>
        <span className="scroll-cue__arrow" aria-hidden="true" />
      </button>
    </section>
  );
}
