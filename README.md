# magicbowl

`magicbowl` is Gc's personal homepage and digital garden. The site should feel minimal, quiet, and personal: a clean white page with deliberate typography, compact navigation, and flexible content zones for projects, blogs, books, and hobbies.

For the Chinese design guide, see [README_ZH.md](README_ZH.md).

## Design Principles

- Keep the page calm, sparse, and editorial.
- Do not turn the site into a SaaS landing page or marketing homepage.
- The site background is white.
- Use layout, spacing, and typography as the primary visual language.
- Avoid gradients, decorative blobs, heavy illustration, oversized hero imagery, and loud motion.
- Emojis may add personality in the intro copy, but the interface itself should remain restrained.

## Typography

Three font families, all self-hosted via `next/font/local`:

- **SmileySans** (`--font-smiley`): Primary font for all content. A playful, rounded Chinese typeface with natural visual weight. Weight: 400.
- **Montserrat** (`--font-montserrat`): Latin UI font, used as fallback. Weights: 400, 500, 600, 700.
- **Merriweather** (`--font-merriweather`): Serif display font, used as fallback for headings and blog body. Weights: 300, 700.

Fallback stacks:

- Body: `SmileySans, Montserrat, system-ui, sans-serif`
- Headings / reading: `SmileySans, Merriweather, Georgia, "Times New Roman", serif`

### Blog Detail Typography (Chinese mode)

| Element | Color | Weight | Notes |
|---|---|---|---|
| Title h1 | `#333333` | 500 | `letter-spacing: 0.02em` |
| Heading h2 | `#383838` | 500 | `margin-top: 2em` |
| Heading h3 | `#3a3a3a` | 500 | |
| Body p | `#404040` | 400 | `line-height: 2` |
| Blockquote | `#555555` | 400 | `font-style: normal`, `border-left: #999` |
| Date | `#888888` | 400 | |

## Color Tokens

CSS variables live in [app/globals.css](app/globals.css).

### Base

| Token | Value | Usage |
|---|---|---|
| `--page` | `#ffffff` | Page background |
| `--text` | `#232323` | Main body text |
| `--text-primary` | `#171717` | Headings, strong text |
| `--text-secondary` | `#595959` | Subtitles, excerpts, dates |
| `--text-tertiary` | `#6b7280` | Hover state text |
| `--text-label` | `#5c6370` | Uppercase category labels |
| `--text-muted` | `#737373` | Inactive nav items |
| `--border` | `#1f1f1f` | Strong borders, focus rings |
| `--muted-border` | `#e5e5e5` | Dividers, subtle borders |

### Surfaces

| Token | Value | Usage |
|---|---|---|
| `--surface` | `#f7f7f7` | Card backgrounds |
| `--surface-hover` | `#f0f0f0` | Card hover state |
| `--surface-alt` | `#f5f5f5` | Cover image areas |
| `--surface-active` | `#ebebeb` | Active / pressed state |

### Accent

| Token | Value | Usage |
|---|---|---|
| `--accent` / `--accent-gold` | `#b8a88a` | Primary accent, book card left border |
| `--accent-green` | `#6b8f71` | Intro link hover (gym) |
| `--accent-blue` | `#5b7fa5` | Intro link hover (AI) |
| `--accent-red` | `#a05a5a` | Intro link hover |
| `--accent-amber` | `#b88a5a` | Intro link hover (philosophy) |
| `--accent-teal` | `#5a8f8f` | Intro link hover (history) |
| `--accent-purple` | `#8b6fa3` | Intro link hover (self-improvement) |
| `--accent-rose` | `#b07070` | Intro link hover (snooker) |

### Status

| Token | Value | Usage |
|---|---|---|
| `--status-reading` | `#8fbc8f` | Book status badge |
| `--status-finished` | `#87bcde` | Book status badge |
| `--status-wishlist` | `#d4a76a` | Book status badge |

## Layout

The page uses a centered white canvas with a maximum width of `1600px`.

### Homepage Bento Grid

- Top row: IntroCard (3fr) + Project zone (2fr) side by side.
- Below: `.bento-cards` uses a 12-column CSS Grid.
- Cards are interleaved: Book → Book → Hobby → Blog → Book → Hobby → Blog → Book → Hobby → Blog.
- First row: 4 items (span 3 each). Second row: 3 items (span 4 each). Third row: 3 items.
- Books use a vertical centered layout with cover, title, author, and status badge.
- Hobbies and blogs use text-based card layouts.

### Responsive

- Above `1024px`: 12-column bento grid.
- `768px` to `1024px`: 6-column grid, items span 3.
- Below `767px`: 2-column grid, wide items span 2.

## Navigation

The navigation is a floating pill / segmented control.

Items: `Home`, `Hobbies`, `Project`, `Blogs`, `Books`, GitHub icon, X icon, language toggle (`中` / `En`).

Rules:

- Current page highlighted with `font-weight: 600` and black text.
- Social icons open in new tabs with `rel="noreferrer"`.
- Language toggle switches content inline via cookie-persisted React Context.

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with BentoGrid (intro, project, books, hobbies, blogs) |
| `/hobbies` | Hobbies page with 3 cards (gym, snooker, reading) |
| `/project` | Projects page with project cards |
| `/blogs` | Blog listing with blog post cards |
| `/blogs/[slug]` | Individual blog detail view (MDX rendered) |
| `/books` | Reading list with book cards |

## Book Card Design

Book cards use a vertical centered layout with:

- Header: "Books" label + status badge + arrow with tooltip.
- Body: cover image (90×130, `object-fit: contain`) + title + author.
- Left border: 3px `--accent-gold`.
- Hover: cover lifts and scales, arrow translates.

## Blog System

Blog content is stored as MDX files in `content/blogs/`:

```
content/blogs/
  {slug}/
    en.mdx    ← English content
    zh.mdx    ← Chinese content
```

Each MDX file has YAML frontmatter:

```yaml
---
title: "Post Title"
sub: "Category"
excerpt: "Short description..."
date: "Month Day, Year"
---
```

The body supports full Markdown: headings, paragraphs, bold, italic, lists, links, images, blockquotes.

### Data Layer

- `app/lib/posts.ts`: Reads MDX files from filesystem using `fs` + `gray-matter`.
- `getAllPosts()`: Returns all post metadata (for listing pages).
- `getPost(slug)`: Returns post metadata + raw MDX content for both languages.

### Rendering

- `app/components/BlogDetail.tsx`: Server component that compiles both language versions using `compileMDX` from `next-mdx-remote/rsc`.
- `app/components/BlogDetailClient.tsx`: Client component that switches between compiled content using `useLang()`.
- Custom MDX components: images use `next/image`, blockquotes are styled.

## Tech Stack

- Next.js (App Router)
- React 19
- TypeScript (strict mode)
- Plain CSS in `app/globals.css`
- Self-hosted `.woff2` fonts via `next/font/local` (SmileySans, Montserrat, Merriweather)
- `sharp` for image optimization
- `next-mdx-remote` for MDX rendering
- `gray-matter` for frontmatter parsing

## File Structure

```
magicbowl/
  app/
    layout.tsx              Root layout, fonts, metadata
    page.tsx                Homepage
    globals.css             Design tokens, styles, responsive
    types/
      book.ts               Book, BookStatus types
      hobby.ts              Hobby type
      project.ts            Project type
      index.ts              Unified exports
    components/
      layout/               Header, Footer, FloatingNav
      cards/                BookCard, BookList, HobbyCard, HobbyList, ProjectCard, BlogPost
      blog/                 BlogDetail, BlogDetailClient, DocumentTitle
      bento/                BentoGrid, IntroCard, PlaceholderZone
      ui/                   PageTitle, IconArrow
      context/              LanguageContext, Providers, RouteChangeAnimator
    lib/
      posts.ts              Blog data (reads MDX from filesystem)
      books.ts              Shared book data
      hobbies.ts            Shared hobby data
      projects.ts           Shared project data
      bento-layout.ts       BentoGrid layout config and interleaving logic
    blogs/[slug]/page.tsx   Blog detail page
    books/page.tsx          Books page
    hobbies/page.tsx        Hobbies page
    project/page.tsx        Projects page
    robots.ts               SEO robots.txt
    sitemap.ts              SEO sitemap.xml
  content/
    blogs/
      {slug}/
        en.mdx              English blog content
        zh.mdx              Chinese blog content
  fonts/
    SmileySans-Oblique.otf.woff2
    montserrat-*.woff2
    merriweather-*.woff2
  public/
    covers/                 Book cover images
    projects/               Project screenshots
    favicon/                Favicon files (ico, png, apple-touch-icon)
```

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
```

Open at `http://127.0.0.1:3000`.
