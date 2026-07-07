---
title: 用 Next.js 16 搭建一个博客
date: 2026-06-20
category: 技术
tags: [Next.js, React, 前端, 教程]
excerpt: 从零开始，用 Next.js 16 App Router + gray-matter + next-mdx-remote 搭建一个支持 Markdown 写作的博客。
---

# 用 Next.js 16 搭建一个博客

Next.js 16 的 App Router 已经非常成熟。本文记录如何用最小依赖搭建一个 Markdown 驱动的博客。

## 技术选型

- **Next.js 16** —— App Router + React Server Components
- **gray-matter** —— 解析 Markdown 的 frontmatter
- **next-mdx-remote** —— 在服务端渲染 MDX 正文

```ts
import matter from "gray-matter";
import fs from "fs";

const file = fs.readFileSync(path, "utf8");
const { data, content } = matter(file);
```

## 目录结构

```text
app/
  posts/[slug]/page.tsx   # 文章详情
  posts/page.tsx          # 列表 + 筛选
content/
  posts/*.md              # 文章源文件
lib/posts.ts              # 读取与聚合
```

## 渲染正文

在详情页用 `next-mdx-remote/rsc` 的 `MDXRemote`：

```tsx
import { MDXRemote } from "next-mdx-remote/rsc";

<MDXRemote source={post.content} />;
```

这样就拥有了一个零数据库、纯文件的博客系统。简单、可靠、易部署。
