"use client";

import Link from "next/link";
import { useLang } from "./LanguageContext";
import { IntroCard } from "./IntroCard";
import {
  PlaceholderZone,
  type PlaceholderZoneVariant,
} from "./PlaceholderZone";
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

const books = [
  {
    title: "Siddhartha",
    titleCn: "悉达多",
    image: "/covers/s29396368.jpg",
    slug: "siddhartha",
  },
  {
    title: "Life and Death",
    titleCn: "生死疲劳",
    image: "/covers/s35289336.jpg",
    slug: "life-and-death",
  },
];

const hobbies = [
  {
    title: "Gym",
    titleCn: "健身",
    description:
      "Training for less than a year. I love back workouts.",
    descriptionCn:
      "健身不到一年，喜欢做背部训练。",
  },
  {
    title: "Snooker",
    titleCn: "斯诺克",
    description:
      "I enjoy the feeling when the ball drops into the pocket.",
    descriptionCn:
      "我享受球进袋时的感觉，这让我十分满足。",
  },
  {
    title: "Reading",
    titleCn: "阅读",
    description:
      "Philosophy, history, and self-improvement.",
    descriptionCn:
      "主要读哲学、历史和自我提升类书籍。",
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
                    <img src={book.image} alt={book.title} />
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
