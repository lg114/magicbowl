# magicbowl 中文设计规范

`magicbowl` 是 Gc 的个人主页和数字花园入口。这个网站应该保持极简、安静、个人化：白色页面、克制排版、紧凑导航，以及可持续扩展的内容区域，用于未来承载 projects、blogs、books 和 experiments。

英文版说明见 [README.md](C:/Users/19097/Documents/GitHub/magicbowl/README.md)。

## 设计原则

- 页面整体应保持安静、稀疏、有编辑感。
- 不要把网站做成 SaaS 落地页或营销主页。
- Figma 中的深色工作区背景不是网站设计的一部分。
- 网站页面背景是白色。
- 灰色矩形只是占位符，用来表示未来内容区域，不是最终卡片样式。
- 主要视觉语言来自布局、留白和字体，而不是装饰。
- 避免渐变、装饰光斑、复杂插画、大型 hero 图片和夸张动效。
- intro 文案里的 emoji 可以保留个人感，但界面本身要克制。

## 字体

- 主字体：`Montserrat`。
- 备用字体：`system-ui`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `sans-serif`。
- 字距保持正常。
- 不使用负字距。
- 主要使用 Regular 和 Medium 字重。
- 除非未来某个模块明确需要强调，否则避免使用过粗字重。

当前 intro 字体规范：

- 桌面端：大号文字，约 `28px` 到 `34px`。
- 移动端：紧凑文字，约 `15px`。
- 行高保持紧凑但可读，桌面端约 `1.12`，移动端约 `1.18`。

## 颜色

当前 CSS 变量位于 [app/globals.css](C:/Users/19097/Documents/GitHub/magicbowl/app/globals.css)。

- 页面背景：`#ffffff`
- 主文字：`#232323`
- 强边框 / focus：`#1f1f1f`
- 弱边框：`#e5e5e5`
- 占位灰：`#d9d9d9`
- 占位 hover：`#d1d1d1`
- 当前导航背景：`#e9e9e9`
- 轻阴影：`0 4px 16px rgba(0, 0, 0, 0.12)`

## 布局

页面使用居中的白色画布，最大宽度约 `1160px`。

桌面端布局：

- 顶部 header 包含两组导航。
- 左侧是简单文本链接：`Github`、`X`、`CV`。
- 右侧是紧凑的 floating pill 导航。
- 主内容使用 Bento 风格 CSS Grid。
- intro 区域占据第一行左侧较大区域。
- 右侧和下方是未来内容区域。
- 当前内容区域只是占位符，不应被当作最终卡片设计。

响应式规则：

- `1024px` 以上：完整多列 Bento 布局。
- `768px` 到 `1024px`：简化为两列布局。
- `768px` 以下：单列布局。
- 移动端 intro 优先展示，内容区域向下堆叠。
- `768px` 以下隐藏左侧 `Github / X / CV` 链接，只保留居中的胶囊导航。
- 文字和导航不能溢出、遮挡或重叠。

## 导航

右侧导航是 floating pill / segmented control。

导航项：

- `Home`
- `Project`
- `Blogs`
- `Books`
- 中英切换按钮

规则：

- `Home` 默认选中。
- 最右侧圆形按钮用于中英切换。
- 当前实现显示 `中`，表示切换到中文。
- 这个按钮不是通用菜单按钮，也不是主题切换按钮。
- hover、active 和 focus-visible 状态要清楚但低调。

## Intro 区域

intro 区域是一个干净的文字区域，不是带边框的卡片。

当前文案：

```text
Hey there, I'm Gc 🧙‍♂️
Welcome to my magic bowl 🥣!

I love building things, and lately, I've been getting really into AI & LLMs.

Off the screen, I stay active by hitting the gym 💪🏻 and playing snooker 🎱.

Besides that, I spend my downtime reading up on philosophy, history, and self-improvement 📚.
```

设计规则：

- 不需要黑色外框。
- 桌面端保持大号文字。
- 移动端保持可读且紧凑。
- 不在 intro 内添加 CTA 按钮。
- 不把 intro 包装成装饰性卡片。

## 占位内容区域

灰色块只是布局占位符。

未来它们可能变成：

- Project 预览
- Blog 条目
- Book notes
- Experiments
- 个人收藏或其他内容模块

规则：

- 不要假设当前灰色样式就是最终卡片样式。
- 在真实内容模型确定前，不要添加标签或假内容。
- hover 反馈保持极简，也可以保持静态。

## 技术栈

当前实现：

- Next.js
- React
- TypeScript
- App Router
- Plain CSS in `app/globals.css`

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
- [app/layout.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/layout.tsx)：根 metadata 和全局 CSS 引入。
- [app/components/Header.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/Header.tsx)：顶部 header 外壳。
- [app/components/FloatingNav.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/FloatingNav.tsx)：胶囊导航和中英切换按钮。
- [app/components/BentoGrid.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/BentoGrid.tsx)：首页网格组合。
- [app/components/IntroCard.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/IntroCard.tsx)：intro 文案区域。
- [app/components/PlaceholderZone.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/PlaceholderZone.tsx)：临时未来内容占位区。

## 后续设计注意事项

在设计最终 Project、Blog 或 Book 卡片之前，需要先确定：

- 每个区域展示什么内容。
- 卡片是以图片为主、文字为主，还是混合结构。
- 网站是否需要支持中英双语内容路由。
- 中英切换是原地切换内容，还是跳转到本地化路由。

始终保留核心气质：极简、个人、安静、灵活。
