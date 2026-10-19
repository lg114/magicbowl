"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "../lib/site";

// 右上角固定导航：站内项为文字（窄屏下换成图标）、社交外链为图标，无胶囊底。
// 站内项 map siteConfig.nav（导航显示项的唯一来源）；
// 当前页不做颜色区分，只有 hover 变白；点击当前页不重复跳转。
function SocialIcon({ kind }: { kind: "github" | "x" }) {
  if (kind === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.21 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// 站内项图标：仅在窄屏（≤680px）替代文字显示，故用通用图形而非品牌标。
// 普通渲染函数（非组件），返回 JSX 或 null，便于按 href 直接判空。
function renderNavGlyph(href: string) {
  if (href === "/posts") {
    // 文章 → 文档
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    );
  }
  if (href === "/projects") {
    // 项目 → 文件夹
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z" />
      </svg>
    );
  }
  return null;
}

export default function NavBar() {
  const pathname = usePathname();
  // 只按「完全等于当前路径」判断：文章页 /posts/xxx 下，Blog 项不算当前页
  const isCurrent = (href: string) => pathname === href;

  const socialLinks = [
    { kind: "github" as const, label: "GitHub", href: siteConfig.social.github },
    { kind: "x" as const, label: "X", href: siteConfig.social.twitter },
  ];

  return (
    <nav className="nav" aria-label="Main navigation">
      {siteConfig.nav.map((l) => {
        const current = isCurrent(l.href);
        const glyph = renderNavGlyph(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className="nav__link"
            aria-current={current ? "page" : undefined}
            aria-label={l.label}
            // 已经在这一页时不再重复跳转（否则会多推一条历史记录）
            onClick={(e) => {
              if (current) e.preventDefault();
            }}
          >
            <span className="nav__label">{l.label}</span>
            {glyph && <span className="nav__glyph">{glyph}</span>}
          </Link>
        );
      })}
      {socialLinks.map((s) => (
        <a
          key={s.href}
          className="nav__icon"
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
        >
          <SocialIcon kind={s.kind} />
        </a>
      ))}
    </nav>
  );
}
