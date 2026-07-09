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
  // 技术栈：以品牌 logo 形式展示，logo 文件放在 public/logos/ 下
  skills: [
    { name: "Node.js", logo: "/logos/node.svg" },
    { name: "Ollama", logo: "/logos/ollama.webp" },
    { name: "Python", logo: "/logos/python.svg" },
    { name: "React", logo: "/logos/react.svg" },
    { name: "TypeScript", logo: "/logos/ts.svg" },
    { name: "Vue", logo: "/logos/vue.svg" },
    { name: "LangChain", logo: "/logos/langchain-color.svg" },
    { name: "Claude Code", logo: "/logos/claudecode-color.svg" },
    { name: "Docker", logo: "/logos/docker.svg" },
    { name: "Hugging Face", logo: "/logos/huggingface.webp" },
    { name: "JavaScript", logo: "/logos/js.svg" },
    { name: "Figma", logo: "/logos/figma.webp" },
    { name: "OpenClaw", logo: "/logos/openclaw-color.svg" },
    { name: "HermesAgent", logo: "/logos/hermesagent.webp" },
  ],
  hobbies: ["阅读", "咖啡", "音乐", "摄影", "游戏", "旅行", "电影", "赛车", "健身", "斯诺克"],
  footprints: [
    "北京",
    "上海",
    "杭州",
    "深圳",
    "成都",
    "东京",
    "新加坡",
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
  // 首页「链接」卡片内容：替换为你的真实链接即可
  links: [
    { label: "GitHub", href: "https://github.com/lg114", logo: "/logos/github.png" },
    { label: "Bilibili", href: "https://space.bilibili.com/your-id", logo: "/logos/bilibili.webp" },
  ],
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
