<div align="center">

# MagicBowl

**A growing personal blog and portfolio — code, reading, travel, and everyday life, kept in one bowl.**

[Live Site](https://www.magicbowl.tech) · [RSS Feed](https://www.magicbowl.tech/feed.xml) · [简体中文](README_zh.md)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

## About

MagicBowl is a static-first personal site. Pages are rendered with the Next.js App Router, posts are driven by Markdown, and every style is hand-written CSS — no UI framework, no backend, no database.

| | |
| --- | --- |
| **Live site** | <https://www.magicbowl.tech> |
| **Content language** | Posts are written in Chinese (zh-CN) |
| **Pages** | Home, Blog archive, post pages, Projects, Demo (experiments) |
| **License** | [MIT](LICENSE) |

**English** | [简体中文](README_zh.md)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Writing Posts](#writing-posts)
- [Configuration](#configuration)
- [Development Notes](#development-notes)
- [Deployment](#deployment)
- [License](#license)

## Features

**Content**

- Markdown posts with frontmatter (category, tags); the archive lists all posts newest-first, grouped by year — years without posts are not rendered
- RSS feed at [`/feed.xml`](https://www.magicbowl.tech/feed.xml) with the full post list
- No search, filtering, or pagination on the archive page by design: everything is on one page

**Reading**

- Auto-generated table of contents and heading anchors on post pages (sidebar on desktop, inline on mobile)
- Styled code blocks, blockquotes, and images; previous / next post navigation

**Presentation**

- Dark-only theme; responsive layout; `prefers-reduced-motion` support

**Engineering**

- Fully static prerendering — no backend, no database
- SEO: metadata, `sitemap.xml`, `robots.txt`, Web App Manifest
- Service Worker offline caching; security headers including CSP and HSTS

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Content | Markdown + `gray-matter` + `marked` (precompiled to HTML at build time) |
| Styling | Hand-written CSS (design tokens, responsive rules, motion reduction) |
| Images | Next.js Image + `sharp` |

## Quick Start

Requirements: Node.js `20.9` or later, and npm.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server (regenerates post data first) |
| `npm run generate-posts` | Regenerate `lib/posts-data.json` from `content/posts/` |
| `npm run typecheck` | Run the TypeScript type check |
| `npm run build` | Create a production build |
| `npm start` | Start the production server (run `npm run build` first) |
| `ANALYZE=true npm run build` | Build with the Bundle Analyzer enabled |

## Project Structure

```text
app/                    # Routes and Next.js special files
  layout.tsx            # Root layout: fonts, navigation, footer
  page.tsx              # Home
  posts/                # /posts archive and /posts/[slug] post pages
  projects/             # /projects page
  demo/                 # /demo experiments page
  feed.xml/             # RSS feed route
  sitemap.ts robots.ts  # SEO
  manifest.ts           # Web App Manifest
  apple-icon.png        # iOS icon
  not-found.tsx         # 404 page
components/             # Reusable React components
content/posts/          # Markdown posts (source files)
lib/                    # Site config and post data (generated at build time)
scripts/                # Build scripts (generate-posts.ts)
styles/                 # Global and per-page CSS (aggregated by globals.css)
types/                  # TypeScript type definitions
public/                 # Site icons, Service Worker
```

Types and side-effect-free helpers live in `types/`; client components import types only from there, which keeps Node APIs such as `fs` out of the browser bundle.

## Writing Posts

Create a `.md` file under `content/posts/` with YAML frontmatter:

```markdown
---
title: Post title
date: 2026-07-10
category: Essay
tags: [tag1, tag2]
excerpt: A short summary of the post
---

Post body...
```

| Field | Required | Notes |
| --- | --- | --- |
| `title` | Yes | Post title; also used as the page `title` |
| `date` | Yes | Publish date as `YYYY-MM-DD`; normalized internally to avoid timezone-related date drift |
| `category` | Yes | One of `生活` / `随笔` / `读后感`; controls the card accent color |
| `tags` | No | Tag array (metadata; the archive page offers no tag filtering) |
| `excerpt` | No | Summary used in listings and as the SEO `description` |

The `slug` comes from the file name: `coffee-and-code.md` → `/posts/coffee-and-code`.

## Configuration

Most site-level configuration lives in [`lib/site.ts`](lib/site.ts):

- `siteConfig` basics: `name`, `title`, `description`, `author`, `url` (canonical site URL used for metadata, canonical links, and the sitemap), `locale`, `startYear`
- `siteConfig.nav`: top navigation entries (Blog / Projects / Demo) — update this when adding a page
- `siteConfig.projects`: project entries (`name`, `desc`, `tech`, `status`, `repo`, `featured`)
- `siteConfig.social`: GitHub, X, and email links

Site icons live in `app/`: `favicon.ico` and `icon.png` are the browser tab icons, `apple-icon.png` is the iOS home-screen icon, and `manifest.ts` reuses `icon.png` as the PWA install icon. Theme colors, layout, and motion live in `styles/`, split into per-area CSS modules imported by `styles/globals.css` — import order is cascade order.

## Development Notes

- **Restart the dev server after editing Markdown.** Post data is generated by `scripts/generate-posts.ts` when `npm run dev` / `npm run build` starts, writing `lib/posts-data.json`, which `lib/posts.ts` imports directly. Editing Markdown while `next dev` is running does not regenerate it.
- **New posts require a rebuild.** Post pages set `dynamicParams = false`, so only slugs known at build time are generated — this also blocks path traversal.
- **Post data is generated at build time.** `npm run build` first runs `scripts/generate-posts.ts` (via `tsx`), which parses `content/posts/*.md` and precompiles the posts to HTML in `lib/posts-data.json`. The runtime never reads Markdown from disk — this is what makes filesystem-less environments such as Cloudflare Workers work.
- **Bump the Service Worker version when it changes.** Update `APP_VERSION` in `public/sw.js`, or old caches will not be invalidated.
- **Keep the navigation in sync.** The top navigation maps over the `siteConfig.nav` array; add new pages there.
- **Update `siteConfig.url` when the domain changes**, or the sitemap and canonical URLs will keep pointing at the old address.
- **LAN development:** `allowedDevOrigins` in `next.config.mjs` is read from the `ALLOWED_DEV_ORIGINS` environment variable (comma-separated); set it in `.env.local` when developing from another device on your LAN.

## Deployment

This is a standard Next.js application and can be deployed to any platform that supports Node.js:

```bash
npm ci
npm run build
npm start
```

**Cloudflare Workers**: the live site runs on Cloudflare Workers (via the OpenNext adapter). Because the Workers runtime has no filesystem, the build script inlines the Markdown posts as JSON into the bundle (see above), so the runtime never depends on `fs`.

## License

[MIT](LICENSE)
