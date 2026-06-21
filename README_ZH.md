# magicbowl 中文设计规范

`magicbowl` 是 Gc 的个人主页和数字花园。这个网站应该保持极简、安静、个人化：白色页面、克制排版、紧凑导航，以及可持续扩展的内容区域，用于承载 projects、blogs、books 和 hobbies。

英文版说明见 [README.md](C:/Users/19097/Documents/GitHub/magicbowl/README.md)。

## 设计原则

- 页面整体应保持安静、稀疏、有编辑感。
- 不要把网站做成 SaaS 落地页或营销主页。
- 网站页面背景是白色。
- 主要视觉语言来自布局、留白和字体，而不是装饰。
- 避免渐变、装饰光斑、复杂插画、大型 hero 图片和夸张动效。
- intro 文案里的 emoji 可以保留个人感，但界面本身要克制。

## 字体

两个字体家族，均通过 `next/font/local` 自托管：

- **Montserrat**（`--font-montserrat`）：正文、导航、标签、博客详情标题。字重：400、500、600、700。
- **Merriweather**（`--font-merriweather`）：衬线展示字体，用于 intro 卡片、页面标题、卡片标题、书名、博客正文。字重：300、700。

备用字体：

- Montserrat：`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Merriweather：`Georgia, "Times New Roman", serif`

字号使用流式值：

- intro 卡片 / 页面标题：`clamp(28px, 2.75vw, 34px)`（桌面），`15px`（移动）
- 博客详情标题：`clamp(28px, 3vw, 40px)`
- 卡片标题：`18px`
- 正文：`16px`
- 标签 / 元信息：`12px` 大写，`0.5px` 字距，字重 600
- 博客正文段落：`16px`，字重 300，行高 1.9

## 颜色 Token

CSS 变量位于 [app/globals.css](C:/Users/19097/Documents/GitHub/magicbowl/app/globals.css)。

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
| `--accent` / `--accent-gold` | `#b8a88a` | 主强调色 |
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

### 间距与阴影

| Token | 值 |
|---|---|
| `--canvas-max` | `1600px` |
| `--canvas-pad` | `32px` |
| `--gap-x` | `24px` |
| `--gap-y` | `24px` |
| `--shadow` | `0 4px 16px rgba(0, 0, 0, 0.12)` |

## 布局

页面使用居中的白色画布，最大宽度 `1600px`。

桌面端布局：

- 顶部 sticky header，内含 floating pill 导航。
- 主内容使用 Bento 风格 CSS Grid（5 列）。
- 第 1 行：intro 卡片（1–3 列）+ 项目卡片和迷你书单（4–5 列）。
- 第 2 行：迷你爱好行（3 张卡片，满宽）。
- 第 3 行：迷你博客行（2 张卡片，满宽）。

响应式规则：

- `1024px` 以上：完整 5 列 Bento 布局。
- `768px` 到 `1024px`：简化为两列布局。
- `768px` 以下：单列布局，画布限制在 `390px`，内边距缩减到 `12px`。
- `374px` 以下：胶囊导航满宽。

## 导航

导航是 floating pill / segmented control。

导航项：

- `Home`（首页）
- `Hobbies`（爱好）
- `Project`（项目）
- `Blogs`（博客）
- `Books`（书单）
- GitHub 图标（外链）
- X 图标（外链）
- 中英切换按钮（`中` / `En`）

规则：

- 当前页面用 `font-weight: 600` 和黑色文字高亮。
- 社交图标在新标签页打开，带 `rel="noreferrer"`。
- 中英切换通过 cookie 持久化的 Context 原地切换内容。
- hover、active 和 focus-visible 状态要清楚但低调。

## 页面

| 路由 | 描述 |
|---|---|
| `/` | 首页，BentoGrid（intro、项目、书单、爱好、博客） |
| `/hobbies` | 爱好页面，3 张卡片（健身、斯诺克、阅读） |
| `/project` | 项目页面，项目卡片列表 |
| `/blogs` | 博客列表，博客卡片 |
| `/blogs/[slug]` | 博客详情页 |
| `/books` | 书单页面，书籍卡片列表 |

## Intro 区域

intro 区域是干净的文字区域，不是带边框的卡片。关键词带彩色 hover 下划线。

设计规则：

- 不需要黑色外框。
- 桌面端保持大号文字。
- 移动端保持可读且紧凑。
- 不在 intro 内添加 CTA 按钮。
- 不把 intro 包装成装饰性卡片。

## 卡片模式

所有卡片（书籍、项目、博客、爱好、占位区）共享一致的结构：

- 头部行：大写标签 + 可选子标签 + 可选对角箭头。
- 内容：可选封面图 + 标题 + 描述 / 备注。
- 样式：`12px` 圆角，`--surface` 背景，hover 变为 `--surface-hover`。
- hover 效果：封面图 scale 到 `1.03`，箭头位移 `2px, -2px`。

爱好详情页的卡片没有箭头。首页迷你爱好卡片有箭头。

## 技术栈

- Next.js（App Router）
- React 19
- TypeScript（严格模式）
- Plain CSS（`app/globals.css`）
- 自托管 `.woff2` 字体（`next/font/local`）
- `sharp` 图片优化

常用命令：

```bash
npm run dev
npm run build
```

本地访问地址：

```text
http://127.0.0.1:3000
```

## 文件结构

关键文件：

- [app/page.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/page.tsx)：首页组合入口。
- [app/globals.css](C:/Users/19097/Documents/GitHub/magicbowl/app/globals.css)：设计 token、布局和响应式规则。
- [app/layout.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/layout.tsx)：根 metadata、字体加载、全局 CSS 引入。
- [app/components/Header.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/Header.tsx)：sticky header 外壳。
- [app/components/FloatingNav.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/FloatingNav.tsx)：胶囊导航、社交图标和中英切换。
- [app/components/BentoGrid.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/BentoGrid.tsx)：首页网格组合（intro、项目、书单、爱好、博客）。
- [app/components/IntroCard.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/IntroCard.tsx)：双语文案区域，带彩色关键词下划线。
- [app/components/PlaceholderZone.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/PlaceholderZone.tsx)：可复用内容区外壳。
- [app/components/BookCard.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/BookCard.tsx)：书籍卡片，含封面、标题、作者、状态标签。
- [app/components/BookList.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/BookList.tsx)：BookCard 网格容器。
- [app/components/ProjectCard.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/ProjectCard.tsx)：项目卡片，含封面、标题、备注、GitHub 链接。
- [app/components/HobbyCard.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/HobbyCard.tsx)：爱好卡片，含标签、标题、描述、可选封面。
- [app/components/HobbyList.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/HobbyList.tsx)：HobbyCard 网格容器。
- [app/components/BlogPost.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/BlogPost.tsx)：博客列表卡片。
- [app/components/BlogDetail.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/BlogDetail.tsx)：博客详情页。
- [app/components/PageTitle.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/PageTitle.tsx)：双语页面标题。
- [app/components/Footer.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/Footer.tsx)：站点 footer。
- [app/components/LanguageContext.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/LanguageContext.tsx)：React Context + cookie 语言切换。
- [app/lib/posts.ts](C:/Users/19097/Documents/GitHub/magicbowl/app/lib/posts.ts)：博客文章数据。

## 内容模型

- 博客文章硬编码在 `app/lib/posts.ts`，类型为 `BlogEntry`。
- 每条包含 `slug`、双语 `title` / `excerpt` / `date` / `content`，以及支持 `p` 和 `blockquote` 的内容块。
- 书籍、项目和爱好在各自的页面文件中内联定义。

## 后续设计注意事项

扩展网站前，考虑：

- 是否添加暗色模式。
- 是否接入 CMS 实现动态内容。
- 是否为博客添加 RSS 订阅。
- 爱好页面是否需要封面图。

始终保留核心气质：极简、个人、安静、灵活。
