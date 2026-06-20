"use client";

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
  link?: string;
  tooltip?: string;
  tooltipCn?: string;
};

export function PlaceholderZone({ variant, image, label, labelCn, link, tooltip, tooltipCn }: PlaceholderZoneProps) {
  const { lang } = useLang();

  return (
    <section
      className={`content-zone content-zone--${variant}`}
      aria-label="Future content area"
    >
      <div className="content-zone-header">
        <span className="content-zone-label">
          {lang === "zh"
            ? (labelCn || label || labels[variant].cn)
            : (label || labels[variant].en)}
        </span>
        {link ? (
          <a
            className="content-zone-arrow"
            href={link}
            target="_blank"
            rel="noreferrer"
            data-source={lang === "zh" ? (tooltipCn || tooltip) : tooltip}
          >
            ↗
          </a>
        ) : (
          <span className="content-zone-arrow">↗</span>
        )}
      </div>
      {image && (
        <div className="content-zone-cover">
          <img src={image} alt="" />
        </div>
      )}
    </section>
  );
}
