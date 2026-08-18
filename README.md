# 🥣 MagicBowl

一个正在生长的个人博客与作品集，用一碗装下代码、阅读、旅行与日常。

MagicBowl 是一个以静态内容为主的个人站点：使用 Next.js App Router 渲染页面，文章由 Markdown 文件驱动，样式全部手写，不依赖 UI 框架。

## 站点内容

- 首页：个人介绍、随机箴言、最近文章和精选项目
- 文章：支持分类、标签、关键词搜索、时间排序和按年份归档
- 文章详情：自动生成目录与标题锚点，提供代码块、引用样式和上一篇/下一篇导航
- 项目：独立的项目展示页，并可在首页展示精选项目
- 主题：深色模式为默认主题，支持浅色模式，首屏切换无闪烁并记住用户偏好
- 体验：萤火虫夜空背景、响应式布局、减少动效适配和离线缓存
- SEO：基础 metadata、`sitemap.xml`、`robots.txt` 和 Web App Manifest

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 框架 | Next.js 16（App Router） |
| UI | React 19 + TypeScript |
| 内容 | Markdown + `gray-matter` + `next-mdx-remote` |
| 样式 | 原生 CSS（设计令牌、双主题、响应式、动效降级） |
| 图片 | Next.js Image + `sharp` |

## 快速开始

### 环境要求

- Node.js `20.9` 或更高版本
- npm

### 安装与运行

```bash
npm install
npm run dev
```

开发服务器启动后，打开 [http://localhost:3000](http://localhost:3000)。

### 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run typecheck` | 执行 TypeScript 类型检查 |
| `npm run build` | 创建生产构建并检查构建问题 |
| `npm start` | 启动生产服务器（需先执行 `npm run build`） |
| `ANALYZE=true npm run build` | 构建并启用 Bundle Analyzer |

## 项目结构

```text
app/                  # 路由和 Next.js 特殊文件
  page.tsx             # 首页
  posts/               # 文章归档与文章详情
  projects/            # 项目展示页
  layout.tsx           # 根布局、主题初始化、导航和页脚
components/           # 可复用 React 组件
content/posts/        # Markdown 博客文章
lib/                  # 站点配置、文章读取、MDX/TOC 工具
styles/               # 全局 CSS 与各页面样式模块
types/                # TypeScript 类型定义
public/               # 头像、图标、Service Worker 等静态资源
```

## 添加文章

在 `content/posts/` 下新建一个 `.md` 文件，并填写 YAML frontmatter：

```markdown
---
title: 文章标题
date: 2026-07-10
category: 随笔
tags: [标签1, 标签2]
excerpt: 文章摘要
---

正文内容...
```

当前支持的分类为：`生活`、`随笔`、`读后感`。文章的 `slug` 默认取文件名，例如 `coffee-and-code.md` 会生成 `/posts/coffee-and-code`。

## 自定义站点

大部分站点级配置集中在 [`lib/site.ts`](lib/site.ts)：

- `siteConfig.projects`：项目名称、简介、技术栈、状态、仓库和演示地址
- `siteConfig.social`：GitHub、X 和 Email 链接
- `siteConfig.nav`：顶部导航，新增页面时同步更新这里
- `siteConfig.url`：部署后的规范站点地址，用于 metadata、canonical 和 sitemap

头像和站点图标位于 `public/`。主题颜色、布局和动效位于 `styles/`，按功能拆分为多个 CSS 模块，并由 `styles/globals.css` 统一引入。

## 部署

这是一个标准的 Next.js 应用，可以部署到支持 Node.js 的平台。生产环境的基本流程是：

```bash
npm ci
npm run build
npm start
```

部署前请确认 `lib/site.ts` 中的 `siteConfig.url` 已替换为正式域名；否则 sitemap 和 SEO 元信息可能仍指向默认地址。

## 许可

MIT
