"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "./LanguageContext";
import { IntroCard } from "./IntroCard";
import {
  PlaceholderZone,
  type PlaceholderZoneVariant,
} from "./PlaceholderZone";
import { books } from "../lib/books";
import { hobbies } from "../lib/hobbies";
import { posts } from "../lib/posts";

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

export function BentoGrid() {
  const { lang } = useLang();

  return (
    <div className="bento-grid">
      <IntroCard />
      {zones.map((zone) =>
        zone.variant === "side" ? (
          <div className="side-stack" key="side-stack">
            <PlaceholderZone
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
            <div className="mini-books-row">
              {books.map((book) => (
                <Link href="/books" className="mini-books-card" key={book.slug}>
                  <div className="content-zone-header">
                    <div className="content-zone-meta">
                      <span className="content-zone-label">Books</span>
                    </div>
                    <span className="content-zone-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </span>
                  </div>
                  <div className="mini-book-cover">
                    {book.image && <Image src={book.image} alt={book.title} width={200} height={300} sizes="120px" className="mini-book-cover-img" />}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
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
        )
      )}
      <div className="mini-hobbies-row">
        {hobbies.map((hobby) => (
          <Link href="/hobbies" className="mini-hobby-card" key={hobby.title}>
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
        ))}
      </div>
      <div className="mini-blogs-row">
        {posts.map((post) => (
          <Link href={`/blogs/${post.slug}`} className="mini-blog-card" key={post.slug}>
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
        ))}
      </div>
    </div>
  );
}
