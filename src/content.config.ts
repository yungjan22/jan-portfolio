import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per case study in src/content/work/.
// Frontmatter = the Hinge-style profile (shown in the lightbox).
// Body = the full story (shown at /work/<slug>/).
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(), // One-line case study title, sentence case
    category: z.string(), // e.g. "AI product", "B2B SaaS · Dashboard"
    org: z.string(),
    year: z.string(),
    tag: z.string(), // Status for the "Status · Company · Year" tag line
    order: z.number(), // Card order. Rhythm: wide → small + small → wide → …
    stage: z.enum(['sage', 'ochre', 'lake', 'heather', 'peach']),
    stageImage: z.string().optional(), // background image for the hero stage, under public/ (both themes)
    short: z.string(), // One-line result for small cards
    metric: z.string(), // Longer result for wide cards
    problem: z.string(), // "The problem I fell for"
    role: z.string(), // "My role"
    stat: z.string(), // Green flag number
    statLabel: z.string(),
    lesson: z.string(), // "What I'd do differently"
    client: z.string(),
    platform: z.string(),
    led: z.string(),
    team: z.string(),
    // Optional images, as paths under public/ (e.g. /work/qin/hero.png).
    // Without them, labelled placeholders render instead.
    hero: z.string().optional(),
    heroDemo: z.string().optional(), // coded animation in src/components/demos/ (wins over hero)
    before: z.string().optional(),
    after: z.string().optional(),
    photo: z.string().optional(),
    alt: z
      .object({
        hero: z.string().optional(),
        before: z.string().optional(),
        after: z.string().optional(),
        photo: z.string().optional(),
      })
      .default({}),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work };
