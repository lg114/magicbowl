import type { Project } from "../types/project";

export const siteConfig = {
  name: "MagicBowl",
  title: "MagicBowl",
  description: "MagicBowl 的个人博客，记录技术、设计与日常思考。",
  author: "gc",
  // 部署后的站点地址，用于 SEO / sitemap / canonical
  url: "https://www.magicbowl.tech",
  locale: "zh-CN",
  // 站点起始年份：Blog 的时间线从这里逐年排到今年（没有文章的年份也保留），
  // 页脚的「2020–Present」也取自这里，避免两处各写一个年份。
  startYear: 2020,
  // 导航显示项：NavBar 直接 map 本数组（右上角纯文字导航，仅 Blog / Projects）。
  // 新增页面若要出现在导航，改这里；首页不在此列表，但始终进 sitemap（见 app/sitemap.ts）。
  nav: [
    { href: "/posts", label: "Blog" },
    { href: "/projects", label: "Projects" },
  ],
  projects: [
    {
      name: "RagMate",
      desc: "Enterprise RAG knowledge management system with hybrid retrieval",
      tech: ["Python", "RAG", "Vector Search"],
      status: "active",
      repo: "https://github.com/lg114/RagMate",
      featured: true,
    },
    {
      name: "MagicBowl",
      desc: "This site — built with Next.js + TypeScript",
      tech: ["Next.js", "TypeScript", "React", "Markdown"],
      status: "active",
      repo: "https://github.com/lg114/magicbowl",
      featured: true,
    },
    {
      name: "bagger",
      desc: "AI coding history collector — auto-syncs Claude Code conversations",
      tech: ["AI", "CLI", "Local Search"],
      status: "working on",
      repo: "https://github.com/lg114/bagger",
      featured: true,
    },
    {
      name: "dsh-md-live",
      desc: "Native Markdown editor & preview tab for DSH Web right sidebar",
      tech: ["React", "TypeScript", "DSH Plugin", "KaTeX"],
      status: "active",
      repo: "https://github.com/lg114/dsh-md-live",
      featured: true,
    },
  ] satisfies Project[],
  social: {
    github: "https://github.com/lg114",
    email: "mailto:charlesgan2001@qq.com",
    twitter: "https://x.com/imtherealgc",
  },
};

export type SiteConfig = typeof siteConfig;
