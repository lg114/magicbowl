"use client";

import Link from "next/link";
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
  const items = buildBentoItems(books, hobbies, posts);

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
            return (
              <Link href="/hobbies" className={`mini-hobby-card bento-item bento-item--${size}`} key={`hobby-${item.data.title}`}>
                <div className="content-zone-header">
                  <div className="content-zone-meta">
                    <span className="content-zone-label">
                      {lang === "zh" ? "爱好" : "Hobby"}
                    </span>
                  </div>
                  <IconArrow />
                </div>
                <h3 className="mini-hobby-title">
                  {lang === "zh" ? item.data.titleCn : item.data.title}
                </h3>
                <p className="mini-hobby-description">
                  {lang === "zh" ? item.data.descriptionCn : item.data.description}
                </p>
              </Link>
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
