export const siteConfig = {
  name: "MagicBowl",
  title: "MagicBowl · 一个正在生长的地方",
  description: "MagicBowl 的个人博客，记录技术、设计与日常思考。",
  author: "MagicBowl",
  // 部署后的站点地址，用于 SEO / sitemap / canonical
  url: "https://magicbowl.example.com",
  locale: "zh-CN",
  avatar: "/avatar.jpg", // 头像路径，可替换为真实图片
  nav: [
    { href: "/", label: "首页" },
    { href: "/posts", label: "文章" },
    { href: "/about", label: "关于" },
  ],
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "CSS",
    "Git",
    "Docker",
  ],
  hobbies: ["阅读", "咖啡", "音乐", "摄影", "游戏", "旅行"],
  footprints: [
    "北京",
    "上海",
    "杭州",
    "深圳",
    "成都",
    "东京",
    "新加坡",
  ],
  social: {
    github: "https://github.com/your-name",
    email: "mailto:you@example.com",
    twitter: "https://twitter.com/your-name",
  },
  // Giscus 评论配置：前往 https://giscus.app 完成设置后填入下方字段。
  // 留空时，评论区会渲染一个优雅的占位提示，不会报错。
  giscus: {
    repo: "", // 形如 "owner/repo"
    repoId: "",
    category: "Announcements",
    categoryId: "",
    mapping: "pathname",
    reactionsEnabled: true,
    theme: "preferred_color_scheme",
  },
} as const;

export type SiteConfig = typeof siteConfig;
