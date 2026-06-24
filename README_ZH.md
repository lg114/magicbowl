# magicbowl 中文设计规范

`magicbowl` 是 Gc 的个人主页和数字花园。这个网站应该保持极简、安静、个人化：白色页面、克制排版、紧凑导航，以及可持续扩展的内容区域，用于承载 projects、blogs、books 和 hobbies。

英文版说明见 [README.md](README.md)。

## 设计原则

- 页面整体应保持安静、稀疏、有编辑感。
- 不要把网站做成 SaaS 落地页或营销主页。
- 网站页面背景是白色。
- 主要视觉语言来自布局、留白和字体，而不是装饰。
- 避免渐变、装饰光斑、复杂插画、大型 hero 图片和夸张动效。
- intro 文案里的 emoji 可以保留个人感，但界面本身要克制。

## 字体

三个字体家族，均通过 `next/font/local` 自托管：

- **SmileySans**（`--font-smiley`）：全局主字体，得意黑，笔画圆润有质感。字重：400。
- **Montserrat**（`--font-montserrat`）：拉丁 UI 字体，作为备用。字重：400、500、600、700。
- **Merriweather**（`--font-merriweather`）：衬线展示字体，作为标题和正文备用。字重：300、700。

备用字体链：

- 正文：`SmileySans, Montserrat, system-ui, sans-serif`
- 标题 / 阅读：`SmileySans, Merriweather, Georgia, "Times New Roman", serif`

### 博客详情排版规范

| 元素 | 颜色 | 字重 | 备注 |
|---|---|---|---|
| 标题 h1 | `#333333` | 500 | `letter-spacing: 0.02em` |
| 小标题 h2 | `#383838` | 500 | `margin-top: 2em` |
| 小标题 h3 | `#3a3a3a` | 500 | |
| 正文 p | `#404040` | 400 | `line-height: 2` |
| 引用 blockquote | `#555555` | 400 | `font-style: normal`，`border-left: #999` |
| 日期 | `#888888` | 400 | |

## 颜色 Token

CSS 变量位于 [app/globals.css](app/globals.css)。

### 基础

| Token | 值 | 用途 |
|---|---|---|
| `--page` | `#ffffff` | 页面背景 |
| `--text` | `#232323` | 正文文字 |
| `--text-primary` | `#171717` | 标题、强调文字 |
| `--text-secondary` | `#595959` | 副标题、摘要、日期 |
| `--text-tertiary` | `#6b7280` | hover 状态文字 |
| `--text-label` | `#5c6370` | 大写分类标签 |
| `--text-muted` | `#737373` | 非活跃导航项 |
| `--border` | `#1f1f1f` | 强边框、focus 环 |
| `--muted-border` | `#e5e5e5` | 分隔线、弱边框 |

### 表面

| Token | 值 | 用途 |
|---|---|---|
| `--surface` | `#f7f7f7` | 卡片背景 |
| `--surface-hover` | `#f0f0f0` | 卡片 hover |
| `--surface-alt` | `#f5f5f5` | 封面图区域 |
| `--surface-active` | `#ebebeb` | 按下 / 激活状态 |

### 强调色

| Token | 值 | 用途 |
|---|---|---|
| `--accent` / `--accent-gold` | `#b8a88a` | 主强调色，书卡左侧描边 |
| `--accent-green` | `#6b8f71` | intro 链接 hover（健身） |
| `--accent-blue` | `#5b7fa5` | intro 链接 hover（AI） |
| `--accent-red` | `#a05a5a` | intro 链接 hover |
| `--accent-amber` | `#b88a5a` | intro 链接 hover（哲学） |
| `--accent-teal` | `#5a8f8f` | intro 链接 hover（历史） |
| `--accent-purple` | `#8b6fa3` | intro 链接 hover（自我提升） |
| `--accent-rose` | `#b07070` | intro 链接 hover（斯诺克） |

### 状态

| Token | 值 | 用途 |
|---|---|---|
| `--status-reading` | `#8fbc8f` | 书单状态标签 |
| `--status-finished` | `#87bcde` | 书单状态标签 |
| `--status-wishlist` | `#d4a76a` | 书单状态标签 |

## 布局

页面使用居中的白色画布，最大宽度 `1600px`。

### 首页 Bento Grid

- 顶部：IntroCard（3fr）+ Project zone（2fr）并排。
- 下方：`.bento-cards` 使用 12 列 CSS Grid。
- 卡片交错排列：Book → Book → Hobby → Blog → Book → Hobby → Blog → Book → Hobby → Blog。
- 第一行：4 个（各 span 3）。第二行：3 个（各 span 4）。第三行：3 个。
- 书卡使用竖向居中布局：封面 + 标题 + 作者 + 状态徽章。
- 爱好和博客使用文字卡片布局。

### 响应式

- `1024px` 以上：12 列 bento grid。
- `768px` 到 `1024px`：6 列，items span 3。
- `767px` 以下：2 列，wide items span 2。

## 导航

导航是 floating pill / segmented control。

导航项：`Home`（首页）、`Hobbies`（爱好）、`Project`（项目）、`Blogs`（博客）、`Books`（书单）、GitHub 图标、X 图标、中英切换按钮（`中` / `En`）。

规则：

- 当前页面用 `font-weight: 600` 和黑色文字高亮。
- 社交图标在新标签页打开，带 `rel="noreferrer"`。
- 中英切换通过 cookie 持久化的 React Context 原地切换内容。

## 页面

| 路由 | 描述 |
|---|---|
| `/` | 首页，BentoGrid（intro、项目、书单、爱好、博客） |
| `/hobbies` | 爱好页面，3 张卡片（健身、斯诺克、阅读） |
| `/project` | 项目页面，项目卡片列表 |
| `/blogs` | 博客列表，博客卡片 |
| `/blogs/[slug]` | 博客详情页（MDX 渲染） |
| `/books` | 书单页面，书籍卡片列表 |

## 书卡设计

书卡使用竖向居中布局：

- 头部："Books" 标签 + 状态徽章 + 箭头（hover 显示 tooltip）。
- 内容：封面图（90×130，`object-fit: contain`）+ 标题 + 作者。
- 左侧描边：3px `--accent-gold`。
- hover：封面上浮缩放，箭头位移。

## 博客系统

博客内容以 MDX 文件存储在 `content/blogs/`：

```
content/blogs/
  {slug}/
    en.mdx    ← 英文内容
    zh.mdx    ← 中文内容
```

每个 MDX 文件包含 YAML frontmatter：

```yaml
---
title: "文章标题"
sub: "分类"
excerpt: "简短描述..."
date: "2026年6月24日 记"
---
```

正文支持完整 Markdown：标题、段落、粗体、斜体、列表、链接、图片、引用块。

### 数据层

- `app/lib/posts.ts`：通过 `fs` + `gray-matter` 从文件系统读取 MDX。
- `getAllPosts()`：返回所有文章元数据（用于列表页）。
- `getPost(slug)`：返回文章元数据 + 两个语言的原始 MDX 内容。

### 渲染

- `app/components/BlogDetail.tsx`：服务端组件，用 `compileMDX` 编译两个语言版本。
- `app/components/BlogDetailClient.tsx`：客户端组件，用 `useLang()` 切换显示。
- 自定义 MDX 组件：图片用 `next/image`，引用块使用项目样式。

## 技术栈

- Next.js（App Router）
- React 19
- TypeScript（严格模式）
- Plain CSS（`app/globals.css`）
- 自托管 `.woff2` 字体（`next/font/local`：SmileySans、Montserrat、Merriweather）
- `sharp` 图片优化
- `next-mdx-remote` MDX 渲染
- `gray-matter` frontmatter 解析

## 文件结构

```
magicbowl/
  app/
    layout.tsx              根布局，字体，metadata
    page.tsx                首页
    globals.css             设计 token，样式，响应式
    components/
      BentoGrid.tsx         首页网格组合
      BlogDetail.tsx        服务端：编译双语 MDX
      BlogDetailClient.tsx  客户端：按语言切换内容
      BookCard.tsx          书卡（竖向布局）
      BlogPost.tsx          博客列表卡片
      ...
    lib/
      posts.ts              博客数据（从文件系统读取 MDX）
      books.ts              共享书单数据
      hobbies.ts            共享爱好数据
      projects.ts           共享项目数据
    blogs/[slug]/page.tsx   博客详情页
    books/page.tsx          书单页
    hobbies/page.tsx        爱好页
    project/page.tsx        项目页
    robots.ts               SEO robots.txt
    sitemap.ts              SEO sitemap.xml
  content/
    blogs/
      {slug}/
        en.mdx              英文博客内容
        zh.mdx              中文博客内容
  fonts/
    SmileySans-Oblique.otf.woff2
    montserrat-*.woff2
    merriweather-*.woff2
  public/
    covers/                 书本封面图
    projects/               项目截图
```

## 常用命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 生产构建
```

本地访问地址：`http://127.0.0.1:3000`
