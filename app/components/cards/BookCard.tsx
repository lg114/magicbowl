"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import type { Book, BookStatus } from "../../types/book";

type BookCardProps = {
  book: Book;
  href?: string;
};

const statusLabel: Record<BookStatus, { en: string; zh: string }> = {
  Reading: { en: "Reading", zh: "在读" },
  Finished: { en: "Finished", zh: "已读" },
  Wishlist: { en: "Wishlist", zh: "想读" },
};

export const BookCard = memo(function BookCard({ book, href }: BookCardProps) {
  const { lang } = useLang();
  const linkHref = href ?? (lang === "zh" ? book.linkCn : book.link);
  const title = lang === "zh" && book.titleCn ? book.titleCn : book.title;
  const author = lang === "zh" && book.authorCn ? book.authorCn : book.author;
  const status = book.status.toLowerCase();
  const tooltip = lang === "zh" ? "去豆瓣读书看看" : "View on Goodreads";

  const card = (
    <article className="bk-card-bento">
      <div className="content-zone-header">
        <div className="content-zone-meta">
          <span className="content-zone-label">{lang === "zh" ? "书单" : "Books"}</span>
          <span className="content-zone-dot">·</span>
          <span className={`bk-badge bk-badge--${status}`}>
            {lang === "zh" ? statusLabel[book.status].zh : statusLabel[book.status].en}
          </span>
        </div>
        <span className="content-zone-arrow" data-source={linkHref ? tooltip : undefined}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </span>
      </div>
      <div className="bk-card-bento-body">
        {book.image && (
          <div className="bk-card-bento-cover">
            <Image src={book.image} alt={title} width={90} height={130} sizes="90px" className="bk-card-bento-cover-img" />
          </div>
        )}
        <h3 className="bk-card-bento-title">{title}</h3>
        <p className="bk-card-bento-author">{author}</p>
      </div>
    </article>
  );

  if (linkHref) {
    return (
      <Link href={linkHref} target="_blank" rel="noreferrer" className="bk-link-bento">
        {card}
      </Link>
    );
  }
  return card;
});
