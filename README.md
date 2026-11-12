# jan-portfolio

Jan Chang's product-design portfolio: **https://jan.bitbypixel.com**

Astro (static) on Cloudflare Pages. Warm like a campfire, precise like a floor plan.

## Structure

```
src/
  styles/tokens.css        all design tokens (one file)
  styles/global.css        layout + components, uses tokens only
  content/work/*.md        case studies (one Markdown file each)
  content.config.ts        case-study frontmatter schema
  data/resume.ts           experience + skills
  site.ts                  name, links, status
  pages/index.astro        pinned split home + profile lightbox
  pages/work/[slug].astro  full case study pages
public/                    favicon, _headers, _redirects, images
CLAUDE.md                  working notes + link to the design system
```

## Add a case study

1. Copy a file in `src/content/work/` and rename it (the filename is the URL slug).
2. Fill in the frontmatter (profile) and write the full story below it.
3. Put images in `public/work/<slug>/` and set `hero`, `before`, `after` and `photo`.

## Develop

```sh
npm install
npm run dev
npm run build
```

## Deploy (Cloudflare Pages)

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node | 22 (from `.node-version`) |

Custom domain: add `jan.bitbypixel.com` in the Pages project, then at Namecheap → Advanced DNS add **CNAME** `jan` → `<project>.pages.dev`. Leave the apex and `www` records (WordPress) alone.
