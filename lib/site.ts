import type { Project } from "../types/project";

export const siteConfig = {
  name: "MagicBowl",
  title: "MagicBowl",
  description: "MagicBowl 的个人博客，记录技术、设计与日常思考。",
  author: "gc",
  // 部署后的站点地址，用于 SEO / sitemap / canonical
  url: "https://www.magicbowl.tech",
  locale: "zh-CN",
  // 页脚「2020–Present」的起始年份，只此一处消费。Blog 时间线不用它：
  // buildTimeline 只列有文章的年份（见 components/PostsArchive.tsx）。
  startYear: 2020,
  // 导航显示项：NavBar 直接 map 本数组，渲染成右上角的纯文字链接（社交图标另走 social）。
  // 新增页面若要出现在导航，改这里；首页不在此列表，但始终进 sitemap（见 app/sitemap.ts）。
  nav: [
    { href: "/posts", label: "Blog" },
    { href: "/projects", label: "Projects" },
    { href: "/demo", label: "Demo" },
  ],
  projects: [
    {
      name: "RagMate",
      desc: "Self-hosted RAG system with hybrid retrieval, reranking and cited Q&A",
      repo: "https://github.com/lg114/RagMate",
      // 关联 lib/case-studies.ts 的案例条目（案例页自己用它反查仓库地址）。
      // 卡片仍然外链 repo，不跳案例页。
      slug: "ragmate",
    },
    {
      name: "MagicBowl",
      desc: "This site — built with Next.js + TypeScript",
      repo: "https://github.com/lg114/magicbowl",
    },
    {
      name: "bagger",
      desc: "AI coding history collector — auto-syncs Claude Code conversations",
      repo: "https://github.com/lg114/bagger",
    },
    {
      name: "dsh-md-live",
      desc: "Native Markdown editor & preview tab for DSH Web right sidebar",
      repo: "https://github.com/lg114/dsh-md-live",
    },
  ] satisfies Project[],
  // Demo 合集列表，与 projects 一样在此集中维护，页面只做渲染。
  // href 是站内路径，页面须用 <Link> 而非原生 <a>，否则点击会整页刷新。
  demos: [
    {
      name: "RagMate",
      desc: "RAG Q&A over your own documents, with cited answers.",
      href: "/demo/ragmate",
    },
  ],
  social: {
    github: "https://github.com/lg114",
    email: "mailto:charlesgan2001@qq.com",
    twitter: "https://x.com/imtherealgc",
  },
};

export type SiteConfig = typeof siteConfig;
