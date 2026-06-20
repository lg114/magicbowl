"use client";

import Link from "next/link";
import { useLang } from "./LanguageContext";
import type { BlogEntry } from "../lib/posts";

type BlogPostProps = {
  post: BlogEntry;
};

export function BlogPost({ post }: BlogPostProps) {
  const { lang } = useLang();
  const title = lang === "zh" ? post.titleCn : post.title;
  const sub = lang === "zh" ? (post.subCn || post.sub) : post.sub;
  const excerpt = lang === "zh" ? post.excerptCn : post.excerpt;
  const date = lang === "zh" ? post.dateCn : post.date;

  return (
    <Link href={`/blogs/${post.slug}`} className="blog-card">
      <div className="blog-card-header">
        <div className="blog-card-meta">
          <span className="blog-card-label">{lang === "zh" ? "博客" : "Blog"}</span>
          {sub && (
            <>
              <span className="blog-card-dot">·</span>
              <span className="blog-card-sub">{sub}</span>
            </>
          )}
        </div>
        <span className="blog-card-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </span>
      </div>

      <h3 className="blog-card-title">{title}</h3>
      <p className="blog-card-excerpt">{excerpt}</p>

      <div className="blog-card-footer">
        <time className="blog-card-date">{date}</time>
      </div>
    </Link>
  );
}
