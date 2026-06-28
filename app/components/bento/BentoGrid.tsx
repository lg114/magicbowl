"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import { BookCard } from "../cards/BookCard";
import { IntroCard } from "./IntroCard";
import { PlaceholderZone } from "./PlaceholderZone";
import { IconArrow } from "../ui/IconArrow";
import { books } from "../../lib/books";
import { hobbies } from "../../lib/hobbies";
import { buildBentoItems, getBentoItemSize, zones } from "../../lib/bento-layout";
import type { BlogPostMeta } from "../../lib/posts";

export function BentoGrid({ posts }: { posts: BlogPostMeta[] }) {
  const { lang } = useLang();
  const items = useMemo(() => buildBentoItems(books, hobbies, posts), [posts]);

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
          const size = getBentoItemSize(i);

          if (item.type === "book") {
            return (
              <div className={`bento-item bento-item--${size}`} key={`book-${item.data.slug}`}>
                <BookCard book={item.data} />
              </div>
            );
          }

          if (item.type === "hobby") {
            const coverImage = item.data.images && item.data.images.length > 0 ? item.data.images[0] : item.data.image;
            const hobbyTitle = lang === "zh" ? (item.data.titleCn || item.data.title) : item.data.title;
            const hobbyDesc = lang === "zh" ? (item.data.descriptionCn || item.data.description) : item.data.description;
            return (
              <div className={`bento-item bento-item--${size}`} key={`hobby-${i}`}>
                <Link href="/hobbies" className="bk-link-bento">
                  <article className="hobby-bento-card">
                    {coverImage && (
                      <Image src={coverImage} alt={hobbyTitle} fill sizes="(max-width: 767px) 100vw, 33vw" className="hobby-bento-cover-img" />
                    )}
                    <div className="hobby-bento-overlay">
                      <div className="hobby-bento-header">
                        <span className="hobby-bento-label">
                          {lang === "zh" ? "爱好" : "Hobby"}
                        </span>
                        <span className="hobby-bento-arrow">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </span>
                      </div>
                      <div className="hobby-bento-info">
                        <h3 className="hobby-bento-title">{hobbyTitle}</h3>
                        <p className="hobby-bento-desc">{hobbyDesc}</p>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            );
          }

          return (
            <Link href={`/blogs/${item.data.slug}`} className={`mini-blog-card bento-item bento-item--${size}`} key={`blog-${item.data.slug}`}>
              <div className="content-zone-header">
                <div className="content-zone-meta">
                  <span className="content-zone-label">Blog</span>
                </div>
                <IconArrow />
              </div>
              <h3 className="mini-blog-title">
                {lang === "zh" ? item.data.titleCn : item.data.title}
              </h3>
              <p className="mini-blog-excerpt">
                {lang === "zh" ? item.data.excerptCn : item.data.excerpt}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
