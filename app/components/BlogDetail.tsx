"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "./LanguageContext";
import type { BlogEntry } from "../lib/posts";

type BlogDetailProps = {
  post: BlogEntry;
};

export function BlogDetail({ post }: BlogDetailProps) {
  const { lang } = useLang();
  const title = lang === "zh" ? post.titleCn : post.title;
  const date = lang === "zh" ? post.dateCn : post.date;
  const paragraphs = lang === "zh" ? post.contentCn : post.content;

  return (
    <article className="blog-detail">
      <Link href="/blogs" className="blog-detail-back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>{lang === "zh" ? "返回" : "Back"}</span>
      </Link>

      <header className="blog-detail-header">
        <h1 className="blog-detail-title">{title}</h1>
        <time className="blog-detail-date">{date}</time>
      </header>

      <div className="blog-detail-body">
        {paragraphs.map((block, i) =>
          block.type === "blockquote" ? (
            <blockquote key={i}>
              <p>{block.text}</p>
            </blockquote>
          ) : block.type === "image" ? (
            <figure key={i} className="blog-detail-figure">
              <Image src={block.text} alt={block.alt || ""} width={800} height={450} sizes="(max-width: 767px) 100vw, 700px" className="blog-detail-figure-img" />
            </figure>
          ) : (
            <p key={i}>{block.text}</p>
          )
        )}
      </div>
    </article>
  );
}
