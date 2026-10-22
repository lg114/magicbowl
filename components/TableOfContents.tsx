"use client";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <ul className="toc__list">
        {headings.map((h) => (
          <li
            key={h.id}
            className={`toc__item toc__item--level-${h.level}`}
          >
            <a className="toc__link" href={`#${h.id}`}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
