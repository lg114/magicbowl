export interface Project {
  name: string;
  desc: string;
  tech: string[];
  status: "活跃" | "进行中" | "归档";
  repo?: string;
  demo?: string;
  featured?: boolean;
}

export const siteConfig = {
  name: "MagicBowl",
  title: "MagicBowl",
  description: "MagicBowl 的个人博客，记录技术、设计与日常思考。",
  author: "MagicBowl",
  // 部署后的站点地址，用于 SEO / sitemap / canonical
  url: "https://www.magicbowl.tech",
  locale: "zh-CN",
  // 导航显示项：NavBar 直接 map 本数组（右上角纯文字导航，仅 Blog / Projects）。
  // 新增页面若要出现在导航，改这里；首页不在此列表，但始终进 sitemap（见 app/sitemap.ts）。
  nav: [
    { href: "/posts", label: "Blog" },
    { href: "/projects", label: "Projects" },
  ],
  projects: [
    {
      name: "RagMate",
      desc: "企业级 RAG 知识管理系统 · 混合检索",
      tech: ["Python", "RAG", "向量检索"],
      status: "活跃",
      repo: "https://github.com/lg114/RagMate",
      featured: true,
    },
    {
      name: "MagicBowl",
      desc: "你正在看的这个站点 · Next.js + TypeScript",
      tech: ["Next.js", "TypeScript", "React", "MDX"],
      status: "活跃",
      repo: "https://github.com/lg114/magicbowl",
      featured: true,
    },
    {
      name: "bagger",
      desc: "AI 编码历史收集器 · 自动同步 Claude Code 对话记录",
      tech: ["AI", "CLI", "本地检索"],
      status: "进行中",
      repo: "https://github.com/lg114/bagger",
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
