"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useLang } from "./LanguageContext";
import { DocumentTitle } from "./DocumentTitle";

type BlogDetailClientProps = {
  meta: {
    title: string;
    titleCn: string;
    date: string;
    dateCn: string;
  };
  contentEn: ReactNode;
  contentZh: ReactNode;
  initialLang: "en" | "zh";
};

export function BlogDetailClient({ meta, contentEn, contentZh }: BlogDetailClientProps) {
  const { lang } = useLang();
  const title = lang === "zh" ? meta.titleCn : meta.title;
  const date = lang === "zh" ? meta.dateCn : meta.date;

  return (
    <article className="blog-detail">
      <DocumentTitle title={meta.title} titleCn={meta.titleCn} />
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
        {lang === "zh" ? contentZh : contentEn}
      </div>
    </article>
  );
}
