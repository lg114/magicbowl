export const siteConfig = {
  name: "MagicBowl",
  title: "MagicBowl",
  description: "MagicBowl 的个人博客，记录技术、设计与日常思考。",
  author: "MagicBowl",
  // 部署后的站点地址，用于 SEO / sitemap / canonical
  url: "https://magicbowl.example.com",
  locale: "zh-CN",
  avatar: "/avatar.png", // 头像路径，可替换为真实图片
  nav: [
    { href: "/", label: "首页" },
    { href: "/posts", label: "文章" },
    { href: "/about", label: "关于" },
  ],
  hobbies: ["阅读", "咖啡", "音乐", "摄影", "游戏", "旅行", "电影", "赛车", "健身", "斯诺克"],
  footprints: [
    { name: "上海", country: "China", lat: 31.2304, lng: 121.4737 },
    { name: "深圳", country: "China", lat: 22.5431, lng: 114.0579 },
    { name: "成都", country: "China", lat: 30.5728, lng: 104.0668 },
    { name: "广州", country: "China", lat: 23.1291, lng: 113.2644 },
    { name: "香港", country: "China", lat: 22.3193, lng: 114.1694 },
    { name: "乌鲁木齐", country: "China", lat: 43.8256, lng: 87.6168 },
    { name: "重庆", country: "China", lat: 29.5630, lng: 106.5516 },
    { name: "三亚", country: "China", lat: 18.2528, lng: 109.5119 },
    { name: "中山", country: "China", lat: 22.5178, lng: 113.3928 },
    { name: "厦门", country: "China", lat: 24.4798, lng: 118.0894 },
    { name: "汶川", country: "China", lat: 31.4800, lng: 103.5900 },
    { name: "吉隆坡", country: "Malaysia", lat: 3.1390, lng: 101.6869 },
    { name: "槟城", country: "Malaysia", lat: 5.4164, lng: 100.3327 },
    { name: "兰卡威", country: "Malaysia", lat: 6.3500, lng: 99.8000 },
    { name: "巴厘岛", country: "Indonesia", lat: -8.4095, lng: 115.1889 },
    { name: "悉尼", country: "Australia", lat: -33.8688, lng: 151.2093 },
    { name: "墨尔本", country: "Australia", lat: -37.8136, lng: 144.9631 },
    { name: "伍伦贡", country: "Australia", lat: -34.4278, lng: 150.8931 },
  ],
  projects: [
    {
      name: "RagMate",
      desc: "企业级 RAG 知识管理系统 · 混合检索",
      href: "https://github.com/lg114/RagMate",
    },
    {
      name: "MagicBowl",
      desc: "你正在看的这个站点 · Next.js + TypeScript",
      href: "https://github.com/lg114/magicbowl",
    },
    {
      name: "bagger",
      desc: "AI 编程对话收集器 · Claude Code 记录本地检索",
      href: "https://github.com/lg114/bagger",
    },
  ],
  social: {
    github: "https://github.com/lg114",
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
