# 🥣 MagicBowl

一个正在生长的个人博客与作品集——用一碗装下代码、阅读、旅行与日常。

> 纯静态优先的个人站点：Next.js App Router 渲染，文章由 Markdown 文件驱动，全部样式手写、无 UI 框架。

## 技术栈

- **框架**: Next.js 16（App Router）+ React 19
- **语言**: TypeScript
- **内容**: Markdown 博客，`gray-matter` 解析 frontmatter，`next-mdx-remote` 服务端渲染
- **样式**: 纯手写 CSS（设计令牌 + 萤火虫夜空背景 + CSS 网格呼吸动效），无 CSS 框架
- **字体**: 系统字体栈（无外部字体依赖）—— 正文/标题走系统 UI 字体（PingFang SC / 微软雅黑优先），日期/标签走等宽字体
- **主题**: 深色为默认，浅色可选；首屏前注入主题脚本实现「切换无闪烁」，偏好持久化到 `localStorage`

## 特性

- **首页** — hero（头像 + 身份欢迎语 + 社交图标）+ 随机箴言区（每次刷新轮换、带滚动提示）+ 最新文章卡片 + 精选项目
- **博客系统** — 文件驱动的 Markdown 博客，支持「分类 / 标签」筛选（单选胶囊）、标题/摘要搜索、最新/最早排序、按年分组
- **项目展示** — 首页精选项目引流 + 独立的 `/projects` 作品页
- **深色 / 浅色主题** — 右上角切换，无闪烁、持久化
- **萤火虫夜空背景** — 纯 CSS 蓝色光点 + 网格呼吸动效，内容层浮于其上（`pointer-events: none`，不挡交互）
- **全局页脚** — © 年份 + 站名 + 社交图标（GitHub / X / Email）
- **SEO** — `metadata` 基础元信息 + `sitemap.ts`（覆盖全站路由：首页 / 文章 / 项目 + 全部文章 slug）+ `robots.ts`
- **离线 / 缓存** — `public/sw.js`（仅 https 且非 localhost 注册）：`/` `/posts` `/projects` + 关键静态资源预缓存，其余走 stale-while-revalidate

## 目录结构

```
app/
  layout.tsx              # 根布局：主题初始化脚本、萤火虫背景、NavBar、ThemeToggle、Footer
  page.tsx                # 首页：hero + 箴言 + 文章卡片 + 精选项目
  posts/page.tsx          # 文章列表（分类/标签筛选 + 搜索 + 排序）
  posts/[slug]/page.tsx   # 文章详情（MDX 渲染）
  projects/page.tsx       # 项目展示页
  robots.ts               # robots.txt
  sitemap.ts              # sitemap.xml
  components/
    NavBar.tsx            # 顶部导航（首页 / 文章 / 项目）
    ThemeToggle.tsx       # 主题切换按钮
    Footer.tsx            # 全局页脚
    Wisdom.tsx            # 首页随机箴言
    PostCards.tsx         # 首页文章卡片列表
    PostCard.tsx          # 单篇文章卡片
    PostsArchive.tsx      # 文章列表（筛选 / 搜索 / 排序）
    FeaturedProjects.tsx  # 首页精选项目
    ProjectCard.tsx       # 单个项目卡片
  styles/
    globals.css           # 设计令牌 + 样式聚合入口（@import 11 个模块，按层叠顺序）
    tokens.css            # 设计令牌 / :root 双主题 / 滚动条 / reset
    base.css              # body · 网格背景层 · main · screen · 网格呼吸
    chrome.css            # .toggle 主题按钮 · .nav 导航胶囊
    home.css              # hero 头像 · 萤火虫 · 欢迎语 · 箴言 · 文章时间线
    archive.css           # /posts 两栏 · 搜索 · 标签云 · 分页 · 按年分组
    post.css              # 文章详情 · 长文排版
    motion.css            # prefers-reduced-motion 降级
    responsive.css        # 680 / 900 / 480 三档响应
    notfound.css          # 404
    projects.css          # 项目页 + 首页精选项目
    footer.css            # 页脚
lib/
  site.ts                 # 站点配置（导航 = NavBar 唯一真相源、项目、社交）
  posts.ts                # 博客文章读取与解析（含模块级缓存，一次解析）
  taxonomy.ts             # 分类 / 标签聚合（从 posts 的一次解析结果派生）
  post-types.ts           # 文章类型定义
content/
  posts/                  # 博客文章（Markdown，当前 4 篇）
public/
  avatar.png              # 头像
  icon.svg                # 站点图标
  sw.js                   # Service Worker（仅 https 且非 localhost 时注册）
```

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 启动
npm start
```

## 自定义

站点的可配置项集中在 [lib/site.ts](lib/site.ts)：

- `projects` — 项目展示（首页精选 + `/projects` 页都读取它）
- `social` — 社交链接（`github` / `twitter` / `email`），用于页脚与首页 hero 图标
- `nav` — 导航唯一真相源（NavBar 直接 `map(siteConfig.nav)`，新增页面只改这里；当前为「首页 / 文章 / 项目」）

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
