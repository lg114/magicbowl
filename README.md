# magicbowl

`magicbowl` is Gc's personal homepage and digital garden. The site should feel minimal, quiet, and personal: a clean white page with deliberate typography, compact navigation, and flexible content zones for projects, blogs, books, and hobbies.

For the Chinese design guide, see [README_ZH.md](C:/Users/19097/Documents/GitHub/magicbowl/README_ZH.md).

## Design Principles

- Keep the page calm, sparse, and editorial.
- Do not turn the site into a SaaS landing page or marketing homepage.
- The site background is white.
- Use layout, spacing, and typography as the primary visual language.
- Avoid gradients, decorative blobs, heavy illustration, oversized hero imagery, and loud motion.
- Emojis may add personality in the intro copy, but the interface itself should remain restrained.

## Typography

Two font families, both self-hosted via `next/font/local`:

- **Montserrat** (`--font-montserrat`): Primary UI font for body text, navigation, labels, and blog detail titles. Weights: 400, 500, 600, 700.
- **Merriweather** (`--font-merriweather`): Serif display font for intro card, page titles, card titles, book titles, and blog body text. Weights: 300, 700.

Fallback stacks:

- Montserrat: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Merriweather: `Georgia, "Times New Roman", serif`

Font sizes are fluid:

- Intro card / page titles: `clamp(28px, 2.75vw, 34px)` on desktop, `15px` on mobile
- Blog detail title: `clamp(28px, 3vw, 40px)`
- Card titles: `18px`
- Body text: `16px`
- Labels / meta: `12px` uppercase, `0.5px` letter-spacing, weight 600
- Blog body paragraphs: `16px`, weight 300, line-height 1.9

## Color Tokens

CSS variables live in [app/globals.css](C:/Users/19097/Documents/GitHub/magicbowl/app/globals.css).

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
| `--accent` / `--accent-gold` | `#b8a88a` | Primary accent |
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

### Spacing & Shadow

| Token | Value |
|---|---|
| `--canvas-max` | `1600px` |
| `--canvas-pad` | `32px` |
| `--gap-x` | `24px` |
| `--gap-y` | `24px` |
| `--shadow` | `0 4px 16px rgba(0, 0, 0, 0.12)` |

## Layout

The page uses a centered white canvas with a maximum width of `1600px`.

Desktop layout:

- Sticky header with floating pill navigation at the top.
- Main content uses a Bento-style CSS grid (5 columns).
- Row 1: Intro card (cols 1–3) + project card and mini-books (cols 4–5).
- Row 2: Mini-hobbies row (3 cards, full width).
- Row 3: Mini-blogs row (2 cards, full width).

Responsive behavior:

- Above `1024px`: full 5-column Bento layout.
- `768px` to `1024px`: simplified two-column layout.
- Below `768px`: single-column layout, canvas capped at `390px`, padding reduced to `12px`.
- Below `374px`: floating nav goes full-width.

## Navigation

The navigation is a floating pill / segmented control.

Items:

- `Home`
- `Hobbies`
- `Project`
- `Blogs`
- `Books`
- GitHub icon (external link)
- X icon (external link)
- Language toggle button (`中` / `En`)

Rules:

- The current page is highlighted with `font-weight: 600` and black text.
- Social icons open in new tabs with `rel="noreferrer"`.
- The language toggle switches content inline via cookie-persisted context.
- Hover, active, and focus-visible states should be subtle but clear.

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with BentoGrid (intro, project, books, hobbies, blogs) |
| `/hobbies` | Hobbies page with 3 cards (gym, snooker, reading) |
| `/project` | Projects page with project cards |
| `/blogs` | Blog listing with blog post cards |
| `/blogs/[slug]` | Individual blog detail view |
| `/books` | Reading list with book cards |

## Intro Area

The intro area is a clean text block, not a bordered card. Keywords are wrapped in colored hover-underlines.

Rules:

- No black outer border.
- Keep the text large on desktop.
- Keep the text readable and compact on mobile.
- Do not add CTA buttons inside the intro.
- Do not wrap it in a decorative card.

## Card Patterns

All cards (book, project, blog, hobby, placeholder) share a consistent structural pattern:

- Header row: uppercase label + optional sub-label + optional diagonal arrow.
- Body: optional cover image + title + description/note.
- Styling: `12px` border-radius, `--surface` background, hover to `--surface-hover`.
- Hover: cover images scale to `1.03`, arrows translate `2px, -2px`.

Hobby cards on the hobbies page have no arrow. Homepage mini-hobby cards have an arrow.

## Tech Stack

- Next.js (App Router)
- React 19
- TypeScript (strict mode)
- Plain CSS in `app/globals.css`
- Self-hosted `.woff2` fonts via `next/font/local`
- `sharp` for image optimization

Useful commands:

```bash
npm run dev
npm run build
```

Open the local site at:

```text
http://127.0.0.1:3000
```

## File Structure

Key files:

- [app/page.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/page.tsx): homepage composition.
- [app/globals.css](C:/Users/19097/Documents/GitHub/magicbowl/app/globals.css): design tokens, layout, responsive rules.
- [app/layout.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/layout.tsx): root metadata, font loading, global CSS import.
- [app/components/Header.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/Header.tsx): sticky header shell.
- [app/components/FloatingNav.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/FloatingNav.tsx): pill navigation, social icons, and language toggle.
- [app/components/BentoGrid.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/BentoGrid.tsx): homepage grid composition (intro, project, books, hobbies, blogs).
- [app/components/IntroCard.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/IntroCard.tsx): bilingual intro copy block with colored keyword underlines.
- [app/components/PlaceholderZone.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/PlaceholderZone.tsx): reusable content zone shell.
- [app/components/BookCard.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/BookCard.tsx): book card with cover, title, author, status badge.
- [app/components/BookList.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/BookList.tsx): grid wrapper for BookCards.
- [app/components/ProjectCard.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/ProjectCard.tsx): project card with cover, title, note, GitHub link.
- [app/components/HobbyCard.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/HobbyCard.tsx): hobby card with label, title, description, optional cover.
- [app/components/HobbyList.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/HobbyList.tsx): grid wrapper for HobbyCards.
- [app/components/BlogPost.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/BlogPost.tsx): blog listing card.
- [app/components/BlogDetail.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/BlogDetail.tsx): full blog post view.
- [app/components/PageTitle.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/PageTitle.tsx): bilingual page header.
- [app/components/Footer.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/Footer.tsx): site footer.
- [app/components/LanguageContext.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/LanguageContext.tsx): React Context + cookie-based language toggle.
- [app/lib/posts.ts](C:/Users/19097/Documents/GitHub/magicbowl/app/lib/posts.ts): blog post data.

## Content Model

- Blog posts are hardcoded in `app/lib/posts.ts` as a typed array (`BlogEntry`).
- Each entry has `slug`, bilingual `title`/`excerpt`/`date`/`content`, and content blocks supporting `p` and `blockquote` types.
- Books, projects, and hobbies are defined inline in their respective page files.

## Future Design Notes

Before expanding the site, consider:

- Whether to add a dark mode variant.
- Whether to support dynamic content via a CMS.
- Whether to add an RSS feed for the blog.
- Whether the hobbies page should include cover images.

Preserve the core feeling: minimal, personal, quiet, and flexible.
