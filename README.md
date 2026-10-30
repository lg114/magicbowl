# MagicBowl

一个正在生长的个人博客与作品集，用一碗装下代码、阅读、旅行与日常。

静态优先的个人站点：Next.js App Router 渲染页面，文章由 Markdown 驱动，样式全部手写，不依赖任何 UI 框架。

- 站点 · <https://www.magicbowl.tech>
- 许可 · MIT

## 目录

- [特性](#特性)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [写文章](#写文章)
- [自定义站点](#自定义站点)
- [开发注意事项](#开发注意事项)
- [部署](#部署)
- [许可](#许可)

## 特性

**内容**

- Markdown 文章，frontmatter 支持分类、标签；文章按时间倒序、按年份归档展示
- 归档页目前不提供关键词搜索、分类/标签筛选与分页，全部文章一次列出

**阅读**

- 文章详情自动生成目录与标题锚点（桌面侧栏 / 移动内置）
- 代码块、引用、图片的排版样式，以及上一篇 / 下一篇导航

**外观**

- 深色主题；响应式布局、`prefers-reduced-motion` 动效降级

**工程**

- 全量静态预渲染，无后端、无数据库
- SEO：`metadata`、`sitemap.xml`、`robots.txt`、Web App Manifest
- Service Worker 离线缓存；CSP、HSTS 等安全响应头

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 框架 | Next.js 16（App Router） |
| UI | React 19 + TypeScript |
| 内容 | Markdown + `gray-matter` + `marked`（构建时预编译为 HTML） |
| 样式 | 原生 CSS（设计令牌、响应式、动效降级） |
| 图片 | Next.js Image + `sharp` |

## 快速开始

环境要求：Node.js `20.9` 或更高版本、npm。

```bash
npm install
npm run dev
```

开发服务器启动后，打开 <http://localhost:3000>。

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run typecheck` | 执行 TypeScript 类型检查 |
| `npm run build` | 创建生产构建并检查构建问题 |
| `npm start` | 启动生产服务器（需先执行 `npm run build`） |
| `ANALYZE=true npm run build` | 构建并启用 Bundle Analyzer |

## 项目结构

```text
app/                    # 路由与 Next.js 特殊文件
  layout.tsx             # 根布局：主题初始化、导航、页脚
  page.tsx               # 首页
  posts/                 # /posts 归档 与 /posts/[slug] 详情
  projects/page.tsx      # 项目展示页
  sitemap.ts robots.ts   # SEO
  manifest.ts            # Web App Manifest
  apple-icon.png         # iOS 图标
  not-found.tsx          # 404
components/             # 可复用 React 组件
content/posts/          # Markdown 文章（源文件）
lib/                    # 站点配置、文章数据（构建时生成）
scripts/                # 构建脚本（generate-posts.ts）
styles/                 # 全局 CSS 与各页面样式（globals.css 聚合）
types/                  # TypeScript 类型定义
public/                 # 站点图标、Service Worker
```

类型与无副作用的工具放在 `types/`，客户端组件只从这里取类型，避免把 `fs` 等 Node API 打进浏览器包。

## 写文章

在 `content/posts/` 下新建 `.md` 文件，填写 YAML frontmatter：

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

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 文章标题，同时用于页面 `title` |
| `date` | 是 | 发布日，写 `YYYY-MM-DD`；内部会统一归一化，避免时区导致的脏日期 |
| `category` | 是 | `生活` / `随笔` / `读后感` 之一，决定卡片配色 |
| `tags` | 否 | 标签数组，用于归档页筛选 |
| `excerpt` | 否 | 摘要，用于列表展示与 SEO `description` |

文章的 `slug` 取文件名，例如 `coffee-and-code.md` → `/posts/coffee-and-code`。

## 自定义站点

大部分站点级配置集中在 [`lib/site.ts`](lib/site.ts)：

- `siteConfig.projects`：项目名称、简介、技术栈、状态、仓库和演示地址
- `siteConfig.social`：GitHub、X 和 Email 链接
- `siteConfig.nav`：顶部导航，新增页面时同步更新这里
- `siteConfig.url`：规范站点地址，用于 metadata、canonical 和 sitemap

站点图标位于 `app/`：`favicon.ico` 与 `icon.png` 是浏览器标签页图标，`apple-icon.png` 是 iOS 主屏图标（`manifest.ts` 复用 `icon.png` 作为 PWA 安装图标）。主题颜色、布局和动效位于 `styles/`，按功能拆分为多个 CSS 模块，由 `styles/globals.css` 统一引入（导入顺序即层叠顺序）。

## 开发注意事项

- **改了 Markdown 要重启 dev server**：文章数据由 `scripts/generate-posts.ts` 在 `npm run dev` / `npm run build` 开始时生成 `lib/posts-data.json`，`lib/posts.ts` 直接 import 该文件；`next dev` 运行中改 Markdown 不会重新生成。
- **新增文章需要重新构建**：详情页设了 `dynamicParams = false`，只在构建期生成已知 slug，顺带阻断路径穿越。
- **文章数据在构建时生成**：`npm run build` 会先执行 `scripts/generate-posts.ts`（通过 `tsx`），把 `content/posts/*.md` 解析、预编译为 HTML 后写入 `lib/posts-data.json`，`lib/posts.ts` 直接 import 该文件，因此运行时不依赖 `fs` 读盘。Cloudflare Workers 等无文件系统环境依赖此机制。
- **更新 Service Worker 要改版本号**：改 `public/sw.js` 里的 `APP_VERSION`，旧缓存才会整体失效。
- **新增页面记得同步导航**：顶部导航直接 `map` `siteConfig.nav` 数组。
- **更换域名要改 `siteConfig.url`**：否则 sitemap 和 canonical 仍指向旧地址。

## 部署

这是标准的 Next.js 应用，可部署到任意支持 Node.js 的平台：

```bash
npm ci
npm run build
npm start
```

**Cloudflare Workers**：本站部署在 Cloudflare Workers（通过 OpenNext 适配器）。由于 Workers 运行时没有文件系统，构建脚本会在 `npm run build` 时自动将 Markdown 文章解析为 JSON 并内联到 bundle，确保运行时不依赖 `fs`。

## 许可

[MIT](https://opensource.org/licenses/MIT)
