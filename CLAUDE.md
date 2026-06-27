# magicbowl

Gc's personal homepage and digital garden. Minimal, quiet, editorial design with bilingual support (EN/ZH).

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript
- Plain CSS in `app/globals.css` (no Tailwind, no CSS Modules)
- Self-hosted fonts via `next/font/local`
- MDX blog content via `next-mdx-remote` + `gray-matter`

## Commands

```bash
npm run dev      # Dev server at http://127.0.0.1:3000
npm run build    # Production build
```

## Architecture

### Routing
All pages are in `app/` (App Router). Pages are server components; interactive components use `"use client"`.

| Route | File |
|---|---|
| `/` | `app/page.tsx` — BentoGrid homepage |
| `/blogs` | `app/blogs/page.tsx` — blog listing |
| `/blogs/[slug]` | `app/blogs/[slug]/page.tsx` — blog detail (MDX) |
| `/books` | `app/books/page.tsx` — reading list |
| `/hobbies` | `app/hobbies/page.tsx` — hobbies |
| `/project` | `app/project/page.tsx` — projects |

### i18n
- Language stored in cookie `lang` (`"en"` | `"zh"`), read server-side in `layout.tsx`
- Client-side toggle via `LanguageContext` (React Context + cookie write)
- All text content is bilingual: `title`/`titleCn`, `excerpt`/`excerptCn`, etc.
- Components use `useLang()` hook to pick the correct language

### Blog System (MDX)
Blog content lives in `content/blogs/{slug}/en.mdx` and `zh.mdx`. Each file has YAML frontmatter:

```yaml
---
title: "Post Title"
sub: "Category"
excerpt: "Short description..."
date: "Month Day, Year"
---
```

Data layer (`app/lib/posts.ts`):
- `getAllPosts()` — reads all blog directories, returns metadata
- `getPost(slug)` — returns metadata + raw MDX content for both languages

Rendering:
- `BlogDetail.tsx` — server component, compiles both MDX versions with `compileMDX`
- `BlogDetailClient.tsx` — client component, switches content via `useLang()`

### Shared Data Modules
- `app/lib/books.ts` — book data (exported `books: Book[]`)
- `app/lib/hobbies.ts` — hobby data (exported `hobbies: Hobby[]`)
- `app/lib/projects.ts` — project data (exported `projects: Project[]`)
- `app/lib/posts.ts` — blog data (filesystem-based, see above)
- `app/lib/bento-layout.ts` — BentoGrid layout config and interleaving logic

These are imported by both page files and `BentoGrid.tsx`.

### Type System
Types are defined in `app/types/` and imported by both `lib/` and `components/`:
- `app/types/book.ts` — `Book`, `BookStatus`
- `app/types/hobby.ts` — `Hobby`
- `app/types/project.ts` — `Project`
- `app/types/index.ts` — unified exports

### Component Organization
Components are grouped by responsibility in `app/components/`:
- `layout/` — Header, Footer, FloatingNav
- `cards/` — BookCard, BookList, HobbyCard, HobbyList, ProjectCard, BlogPost
- `blog/` — BlogDetail, BlogDetailClient, DocumentTitle
- `bento/` — BentoGrid, IntroCard, PlaceholderZone
- `ui/` — PageTitle, IconArrow
- `context/` — LanguageContext, Providers, RouteChangeAnimator

### Fonts
Three font families, all self-hosted in `fonts/`:
- **SmileySans** (`--font-smiley`) — primary font for all content
- **Montserrat** (`--font-montserrat`) — Latin fallback
- **Merriweather** (`--font-merriweather`) — serif fallback for headings/reading

Body font-family: `var(--font-smiley), var(--font-montserrat), system-ui, sans-serif`

### Book Card Design
Book cards (`BookCard.tsx`) use a vertical centered layout:
- Header: label + status badge + arrow (tooltip on hover)
- Body: cover image (90×130) + title + author
- Left border: 3px `--accent-gold`
- Used on both homepage (bento grid) and `/books` page

### Homepage BentoGrid
12-column CSS grid with interleaved content types:
- Row 1: 4 items (span 3 each) — 2 books + 1 hobby + 1 blog
- Row 2: 3 items (span 4 each) — 1 book + 1 hobby + 1 blog
- Row 3: 3 items — remaining books + hobbies + blogs
- Books passed as props from server page; hobbies/projects are static data

### CSS Organization
All styles in `app/globals.css`:
- `:root` — design tokens (colors, spacing, typography, etc.)
- Component styles grouped by section (header, bento, books, projects, hobbies, blogs)
- Responsive breakpoints: 1024px, 767px, 374px
- Page transition animations (`.page-enter`, `.page-exit`)

### Favicon
Favicon files are stored in `public/favicon/`:
- `favicon.ico` — legacy browser support
- `favicon-16x16.png`, `favicon-32x32.png` — browser tabs
- `apple-touch-icon.png` — iOS home screen
- `android-chrome-192x192.png`, `android-chrome-512x512.png` — Android/PWA

Configured in `app/layout.tsx` via `metadata.icons`.

### Key CSS Variables
```
--page: #ffffff          --surface: #f7f7f7
--text: #232323          --surface-hover: #f0f0f0
--text-primary: #171717  --accent-gold: #b8a88a
--text-secondary: #595959
--muted-border: #e5e5e5
```

### Blog Detail Typography (applies globally)
```
h1:      #333, weight 500
h2:      #383, weight 500, margin-top 2em
h3:      #3a3, weight 500
p:       #404, weight 400, line-height 2
blockquote: #555, weight 400, font-style normal
date:    #888
```

## Conventions

- No emoji as icons (use inline SVG)
- Book images use `next/image` with `fill` mode (container sized at 90×130)
- All `<img>` migrated to `next/image`
- Dependencies pinned with `^` (not `"latest"`)
- SEO: `robots.ts`, `sitemap.ts`, openGraph/twitter metadata on all pages
- Security headers configured in `next.config.mjs`

## Important Notes

- `BentoGrid.tsx` receives `posts` as a prop (server→client data flow)
- `BookCard` has no variant prop — same design for homepage and /books page
- Blog MDX supports: headings, paragraphs, bold, italic, lists, links, images, blockquotes
- Smart quotes (`"` `"`) break TypeScript string parsing — use `「」` instead
- `next/image` with `fill` mode requires `position: relative` on parent
- CSS `max-width` on next/image needs explicit `width: auto; height: auto`
