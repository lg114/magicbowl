"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useLang } from "./LanguageContext";

export type PlaceholderZoneVariant =
  | "side"
  | "wide-left"
  | "wide-right";

const labels: Record<PlaceholderZoneVariant, { en: string; cn: string }> = {
  side: { en: "Projects", cn: "项目" },
  "wide-left": { en: "Blog", cn: "博客" },
  "wide-right": { en: "Books", cn: "书单" },
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
          <Image src={image} alt="" width={2034} height={1150} sizes="(max-width: 767px) 100vw, 600px" loading="eager" className="content-zone-cover-img" />
        </div>
      )}
      {children}
    </section>
  );
}
