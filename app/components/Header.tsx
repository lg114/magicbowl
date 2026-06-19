"use client";

import { FloatingNav } from "./FloatingNav";

type HeaderProps = {
  activeItem?: string;
};

export function Header({ activeItem = "Home" }: HeaderProps) {
  return (
    <header className="site-header" aria-label="Primary">
      <nav className="social-links" aria-label="Social links">
        <a href="https://github.com/lg114" target="_blank" rel="noreferrer">
          Github
        </a>
        <a href="https://x.com/gc20010801" target="_blank" rel="noreferrer">
          X
        </a>
        <a href="/cv">CV</a>
      </nav>

      <FloatingNav activeItem={activeItem} />
    </header>
  );
}
