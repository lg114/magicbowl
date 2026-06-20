"use client";

import type { ReactNode } from "react";
import { useLang } from "./LanguageContext";

export type PlaceholderZoneVariant =
  | "side"
  | "wide-left"
  | "wide-right"
  | "tall-left"
  | "tall-right"
  | "full";

const labels: Record<PlaceholderZoneVariant, { en: string; cn: string }> = {
  side: { en: "Projects", cn: "项目" },
  "wide-left": { en: "Blog", cn: "博客" },
  "wide-right": { en: "Books", cn: "书单" },
  "tall-left": { en: "Experiments", cn: "实验" },
  "tall-right": { en: "Notes", cn: "笔记" },
  full: { en: "More", cn: "更多" },
};

type PlaceholderZoneProps = {
  variant: PlaceholderZoneVariant;
  image?: string;
  label?: string;
  labelCn?: string;
  sub?: string;
  subCn?: string;
  link?: string;
  tooltip?: string;
  tooltipCn?: string;
  children?: ReactNode;
};

export function PlaceholderZone({ variant, image, label, labelCn, sub, subCn, link, tooltip, tooltipCn, children }: PlaceholderZoneProps) {
  const { lang } = useLang();

  return (
    <section
      className={`content-zone content-zone--${variant}`}
      aria-label="Future content area"
    >
      <div className="content-zone-header">
        <div className="content-zone-meta">
          <span className="content-zone-label">
            {lang === "zh"
              ? (labelCn || label || labels[variant].cn)
              : (label || labels[variant].en)}
          </span>
          {(sub || subCn) && (
            <>
              <span className="content-zone-dot">·</span>
              <span className="content-zone-sub">
                {lang === "zh" ? (subCn || sub) : sub}
              </span>
            </>
          )}
        </div>
        {link ? (
          <a
            className="content-zone-arrow"
            href={link}
            target="_blank"
            rel="noreferrer"
            data-source={lang === "zh" ? (tooltipCn || tooltip) : tooltip}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        ) : (
          <span className="content-zone-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </span>
        )}
      </div>
      {image && (
        <div className="content-zone-cover">
          <img src={image} alt="" />
        </div>
      )}
      {children}
    </section>
  );
}
