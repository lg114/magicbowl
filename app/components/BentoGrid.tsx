"use client";

import Link from "next/link";
import { useLang } from "./LanguageContext";
import { BookCard } from "./BookCard";
import { IntroCard } from "./IntroCard";
import {
  PlaceholderZone,
  type PlaceholderZoneVariant,
} from "./PlaceholderZone";
import { books } from "../lib/books";
import { hobbies } from "../lib/hobbies";
import type { BlogPostMeta } from "../lib/posts";

const zones: {
  variant: PlaceholderZoneVariant;
  image?: string;
  label?: string;
  labelCn?: string;
  sub?: string;
  subCn?: string;
  link?: string;
  tooltip?: string;
  tooltipCn?: string;
}[] = [
  {
    variant: "side",
    image: "/projects/ragmate.png",
    label: "Project",
    labelCn: "项目",
    sub: "RagMate",
    subCn: "RagMate",
    link: "https://github.com/lg114/RagMate",
    tooltip: "View on GitHub",
    tooltipCn: "去 GitHub 看看",
  },
];

export function BentoGrid({ posts }: { posts: BlogPostMeta[] }) {
  const { lang } = useLang();

  const items = [
    ...books.slice(0, 2).map((b) => ({ type: "book" as const, data: b })),
    ...hobbies.slice(0, 1).map((h) => ({ type: "hobby" as const, data: h })),
    ...posts.slice(0, 1).map((p) => ({ type: "blog" as const, data: p })),
    ...books.slice(2, 3).map((b) => ({ type: "book" as const, data: b })),
    ...hobbies.slice(1, 2).map((h) => ({ type: "hobby" as const, data: h })),
    ...posts.slice(1, 2).map((p) => ({ type: "blog" as const, data: p })),
    ...books.slice(3).map((b) => ({ type: "book" as const, data: b })),
    ...hobbies.slice(2).map((h) => ({ type: "hobby" as const, data: h })),
    ...posts.slice(2).map((p) => ({ type: "blog" as const, data: p })),
  ];

  const getSize = (i: number) => (i < 4 ? "narrow" : "wide");

  return (
    <div className="bento-grid">
      <IntroCard />
      {zones.map((zone) => (
        <PlaceholderZone
          key={zone.variant}
          variant={zone.variant}
          image={zone.image}
          label={zone.label}
          labelCn={zone.labelCn}
          sub={zone.sub}
          subCn={zone.subCn}
          link={zone.link}
          tooltip={zone.tooltip}
          tooltipCn={zone.tooltipCn}
        />
      ))}
      <div className="bento-cards">
        {items.map((item, i) => {
          if (item.type === "book") {
            const book = item.data as (typeof books)[number];
            return (
              <div className={`bento-item bento-item--${getSize(i)}`} key={`book-${book.slug}`}>
                <BookCard book={book} />
              </div>
            );
          }
          if (item.type === "hobby") {
            const hobby = item.data as (typeof hobbies)[number];
            return (
              <Link href="/hobbies" className={`mini-hobby-card bento-item bento-item--${getSize(i)}`} key={`hobby-${hobby.title}`}>
                <div className="content-zone-header">
                  <div className="content-zone-meta">
                    <span className="content-zone-label">
                      {lang === "zh" ? "爱好" : "Hobby"}
                    </span>
                  </div>
                  <span className="content-zone-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </span>
                </div>
                <h3 className="mini-hobby-title">
                  {lang === "zh" ? hobby.titleCn : hobby.title}
                </h3>
                <p className="mini-hobby-description">
                  {lang === "zh" ? hobby.descriptionCn : hobby.description}
                </p>
              </Link>
            );
          }
          const post = item.data as (typeof posts)[number];
          return (
            <Link href={`/blogs/${post.slug}`} className={`mini-blog-card bento-item bento-item--${getSize(i)}`} key={`blog-${post.slug}`}>
              <div className="content-zone-header">
                <div className="content-zone-meta">
                  <span className="content-zone-label">Blog</span>
                </div>
                <span className="content-zone-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </div>
              <h3 className="mini-blog-title">
                {lang === "zh" ? post.titleCn : post.title}
              </h3>
              <p className="mini-blog-excerpt">
                {lang === "zh" ? post.excerptCn : post.excerpt}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
