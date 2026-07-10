# 🥣 MagicBowl

一个正在生长的个人博客与作品集——用一碗装下代码、阅读、旅行与日常。

## 技术栈

- **框架**: Next.js 16 (App Router) + React 19
- **语言**: TypeScript
- **内容**: Markdown 博客，gray-matter 解析 frontmatter，next-mdx-remote 服务端渲染
- **地图**: 高德地图 JS API 2.0（足迹地图）
- **评论**: Giscus（GitHub Discussions）
- **字体**: SmileySans（得意黑）自托管 woff2
- **样式**: 纯手写 CSS，无框架

## 特性

- **卡片式首页** — 个人信息、技术栈、爱好、项目、足迹地图、GitHub 贡献热力图
- **博客系统** — 文件驱动的 Markdown 博客，支持分类、标签、侧边栏
- **深色/浅色主题** — 切换时无闪烁，持久化到 localStorage
- **GitHub 热力图** — 实时抓取贡献数据，完整还原年度贡献网格
- **旅行足迹地图** — 高德地图弹窗，城市标记带光晕动画
- **Overlay 滚动条** — 自定义浮动滚动条，不占布局空间
- **启动动画** — SVG 碗形开机动画
- **站点运行时钟** — 实时显示站点运行天数与时间
- **SEO** — 完整的 OpenGraph / Twitter Card / sitemap / robots.txt / JSON-LD

## 目录结构

```
app/
  layout.tsx              # 根布局：主题初始化、导航、滚动条
  page.tsx                # 首页：卡片网格
  loading.tsx             # 全局加载动画
  about/page.tsx          # 关于页
  posts/page.tsx          # 文章列表（分类/标签筛选）
  posts/[slug]/page.tsx   # 文章详情（MDX 渲染）
  components/             # 组件
  styles/                 # 样式 + 字体
lib/
  site.ts                 # 站点配置（导航、技能、爱好、足迹、项目、社交）
  posts.ts                # 博客文章读取与解析
  github-contributions.ts # GitHub 贡献数据抓取
  amap-loader.ts          # 高德地图动态加载
content/
  about.md                # 关于页内容
  posts/                  # 博客文章（Markdown）
public/
  logos/                  # 技术栈 & 社交平台 logo
```

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 启动
npm start
```

## 环境变量

在项目根目录创建 `.env.local`，填入高德地图密钥：

```env
NEXT_PUBLIC_AMAP_KEY=你的Web JS API Key
NEXT_PUBLIC_AMAP_SECURITY=你的安全密钥
```

> 前往 [高德开放平台](https://console.amap.com) 申请。

## 自定义

所有站点配置集中在 [lib/site.ts](lib/site.ts)：

- `skills` — 技术栈列表（logo 放在 `public/logos/`）
- `hobbies` — 爱好标签
- `footprints` — 旅行足迹城市坐标
- `projects` — 项目展示
- `links` — 社交链接
- `giscus` — 评论系统配置（前往 [giscus.app](https://giscus.app) 获取）

博客文章放在 `content/posts/` 目录，使用 Markdown + YAML frontmatter：

```markdown
---
title: 文章标题
date: 2026-07-10
category: 分类
tags: [标签1, 标签2]
excerpt: 摘要
---

正文内容...
```

## 许可

MIT
