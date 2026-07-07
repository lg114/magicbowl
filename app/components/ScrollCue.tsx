"use client";

import type { MouseEvent } from "react";

// Scroll-down cue. Implemented as a <button> (not an <a href="#...">) so clicking
// it smooth-scrolls without polluting the URL with a #hash or adding history
// entries — a refresh therefore stays at the top (see history.scrollRestoration
// in layout.tsx) instead of jumping back to #main-content.
export default function ScrollCue() {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document
      .getElementById("main-content")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      className="scroll-cue"
      onClick={handleClick}
      aria-label="下滑到主内容区"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
}
