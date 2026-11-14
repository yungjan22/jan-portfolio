# CLAUDE.md

Jan Chang's product-design portfolio. Astro, fully static, deployed on Cloudflare Pages at **jan.bitbypixel.com**. (The apex bitbypixel.com is a separate WordPress site. Don't touch it.)

## Design system: read this first

- **Design system (source of truth):** https://claude.ai/artifact/6Y6p5gffonRbTo89pxNsQk
  Read its `project/README.md` (principles, content rules, layout, interaction, a11y) and `project/tokens.json` before any visual change.
- **Mood board:** https://claude.ai/artifact/KKrZ6NEG5Yg3GYrrxQgSxV. Boards 06–08 are the locked direction. **Board 07 (`Playground.dc.html`) is the interactive reference** for the pinned split layout, hover handles and profile lightbox.

Rules that matter most:

- **Tokens live in one file: `src/styles/tokens.css`.** It mirrors the design system's `tokens.json`. Never hard-code a colour, size or spacing value anywhere else; add or change the token there (and in the design system) first.
- Burnt Paper ground, one bright colour. `--ember` is a **fill** only; orange **text** uses `--ember-text`; text on ember uses `--on-ember` (never white).
- Newsreader 500 for what you *notice*, Figtree for what you *read or click*. Sentence case.
- Corners are 0. Borders, not shadows (the lightbox is the only shadow).
- Four architectural column lines; content sits 12px inside each line; 24px between cards.
- **If it has handles, you can click it.** The selection frame (outline, 4 handles, size badge) only goes on interactive things.
- Stage colours fill image areas only. Card text always sits on `--surface`.
- Text ≥ 4.5:1 in both themes. 44px touch targets. Respect `prefers-reduced-motion`.
- No emoji, icon fonts, scroll-jacking, custom cursors or load animations.
- **One approved motion exception:** the panel photo zooms from the thumbnail to a 3:4 portrait (name glides below it) when Experience or About becomes active (`setPortrait` in `src/scripts/home.ts`, `--dur-portrait`). It is instant with reduced motion and on phones.
- **Approved cursor exception:** a Figma-style multiplayer cursor: an ember arrow (`public/cursors/`, `--cursor-arrow` / `--cursor-hover`, ~30% larger over clickable things) plus an ember name tag that follows it and says what the click does (`src/scripts/cursor.ts`; text from `data-cursor`, else `aria-label`, else the element's text). Mouse/trackpad only.

## Content

- **Case studies are Markdown:** `src/content/work/<slug>.md`. Frontmatter = the Hinge-style profile shown in the lightbox (*The problem I fell for → My role → Green flag → What I'd do differently*). Body = the full story at `/work/<slug>/`. Schema: `src/content.config.ts`.
- `order` sets card order; the layout applies the rhythm wide → small + small → wide automatically.
- `stage`: `sage` · `ochre` · `lake` · `heather` · `peach`.
- Images go in `public/work/<slug>/` and are referenced as `/work/<slug>/file.png` in `hero`, `before`, `after`, `photo` (+ `alt`). Missing ones render as labelled placeholders.
- **Real, verified numbers only.** Unknowns stay as `[BRACKETS]` until Jan fills them. Nothing confidential.
- **Sources:** the previous jan.bitbypixel.com (WordPress) content is primary; Jan's "Product Designer" resume in Reactive Resume fills weak points. Value props, experience, About notes and skills are in `src/data/resume.ts`; contact links in `src/site.ts`.
- **Desktop first.** Most visitors are on a laptop or desktop: design and check at 1280–1440px first, then make sure phones still work.

## Commands

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

## Git

Author every commit as `Jan Chang <82128880+yungjan22@users.noreply.github.com>` so it counts on Jan's contribution graph:

```sh
git config user.name "Jan Chang"
git config user.email "82128880+yungjan22@users.noreply.github.com"
```

## Deploy

Cloudflare Pages, Git integration on `main`: framework preset Astro, build `npm run build`, output `dist`, Node 22 (`.node-version`). Custom domain `jan.bitbypixel.com` via a CNAME `jan` → `<project>.pages.dev` at Namecheap. `public/_redirects` keeps the old WordPress case-study URLs working.
