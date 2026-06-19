# magicbowl

`magicbowl` is Gc's personal homepage and digital garden entry point. The site should feel minimal, quiet, and personal: a clean white page with deliberate typography, compact navigation, and flexible content zones for future projects, blogs, books, and experiments.

For the Chinese design guide, see [README_ZH.md](C:/Users/19097/Documents/GitHub/magicbowl/README_ZH.md).

## Design Principles

- Keep the page calm, sparse, and editorial.
- Do not turn the site into a SaaS landing page or marketing homepage.
- The Figma dark workspace background is not part of the website design.
- The site background is white.
- Gray rectangles are placeholders only. They represent future content areas, not final card styles.
- Use layout, spacing, and typography as the primary visual language.
- Avoid gradients, decorative blobs, heavy illustration, oversized hero imagery, and loud motion.
- Emojis may add personality in the intro copy, but the interface itself should remain restrained.

## Typography

- Primary font: `Montserrat`.
- Fallback stack: `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `sans-serif`.
- Use normal letter spacing.
- Do not use negative letter spacing.
- Prefer regular and medium weights.
- Avoid heavy weights unless a future section explicitly needs emphasis.

Current intro typography:

- Desktop: large, approximately `28px` to `34px`.
- Mobile: compact, approximately `15px`.
- Line height should stay tight but readable, around `1.12` on desktop and `1.18` on mobile.

## Color Tokens

Current CSS variables live in [app/globals.css](C:/Users/19097/Documents/GitHub/magicbowl/app/globals.css).

- Page background: `#ffffff`
- Main text: `#232323`
- Strong border/focus: `#1f1f1f`
- Muted border: `#e5e5e5`
- Placeholder gray: `#d9d9d9`
- Placeholder hover: `#d1d1d1`
- Active nav background: `#e9e9e9`
- Subtle shadow: `0 4px 16px rgba(0, 0, 0, 0.12)`

## Layout

The page uses a centered white canvas with a maximum width of about `1160px`.

Desktop layout:

- Top header contains two nav groups.
- Left side: simple text links for `Github`, `X`, and `CV`.
- Right side: compact floating pill navigation.
- Main content uses a Bento-style CSS grid.
- The intro area spans the larger left side of the first row.
- The right side and following rows are future content zones.
- Content zones are placeholders for now and should not be treated as final card designs.

Responsive behavior:

- Above `1024px`: use the full multi-column Bento layout.
- `768px` to `1024px`: use a simplified two-column layout.
- Below `768px`: switch to a single-column layout.
- Mobile layout should keep the intro first, then stack content zones vertically.
- Below `768px`, hide the left `Github / X / CV` links and center the floating pill navigation.
- Text and navigation must never overflow or overlap.

## Navigation

The right navigation is a floating pill / segmented control.

Items:

- `Home`
- `Project`
- `Blogs`
- `Books`
- Language toggle button

Rules:

- `Home` is selected by default.
- The last circular button is for Chinese/English switching.
- Current implementation shows `中`, meaning the button switches to Chinese.
- The language button is not a generic menu or theme icon.
- Hover, active, and focus-visible states should be subtle but clear.

## Intro Area

The intro area is a clean text block, not a bordered card.

Current copy:

```text
Hey there, I'm Gc 🧙‍♂️
Welcome to my magic bowl 🥣!

I love building things, and lately, I've been getting really into AI & LLMs.

Off the screen, I stay active by hitting the gym 💪🏻 and playing snooker 🎱.

Besides that, I spend my downtime reading up on philosophy, history, and self-improvement 📚.
```

Design rules:

- No black outer border.
- Keep the text large on desktop.
- Keep the text readable and compact on mobile.
- Do not add CTA buttons inside the intro.
- Do not wrap it in a decorative card.

## Placeholder Content Zones

The gray blocks are layout placeholders only.

They may later become:

- Project previews
- Blog entries
- Book notes
- Experiments
- Personal collections

Rules:

- Do not assume the current gray style is the final card style.
- Avoid adding labels or fake content until the actual content model is decided.
- Keep hover feedback minimal.

## Tech Stack

Current implementation:

- Next.js
- React
- TypeScript
- App Router
- Plain CSS in `app/globals.css`

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
- [app/layout.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/layout.tsx): root metadata and global CSS import.
- [app/components/Header.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/Header.tsx): top header shell.
- [app/components/FloatingNav.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/FloatingNav.tsx): pill navigation and language toggle.
- [app/components/BentoGrid.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/BentoGrid.tsx): homepage grid composition.
- [app/components/IntroCard.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/IntroCard.tsx): intro copy block.
- [app/components/PlaceholderZone.tsx](C:/Users/19097/Documents/GitHub/magicbowl/app/components/PlaceholderZone.tsx): temporary future-content placeholder.

## Future Design Notes

Before designing the final Project, Blog, or Book cards, decide:

- What content each section should show.
- Whether cards should be image-led, text-led, or mixed.
- Whether the site should support Chinese and English content routes.
- Whether the language toggle changes content inline or navigates to localized routes.

Preserve the core feeling: minimal, personal, quiet, and flexible.
