"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const probe = window.scrollY + window.innerHeight / 3;
      let current: string | null = headings[0]?.id ?? null;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= probe) {
          current = h.id;
        }
      }
      setActiveId(current);
    };
    let ticking = false;
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
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <ul className="toc__list">
        {headings.map((h) => (
          <li
            key={h.id}
            className={`toc__item toc__item--level-${h.level}`}
          >
            <a
              className={`toc__link${h.id === activeId ? " is-active" : ""}`}
              href={`#${h.id}`}
              aria-current={h.id === activeId ? true : undefined}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
