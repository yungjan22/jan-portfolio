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
    stageImage: z.string().optional(), // background image for the hero stage, under public/ (Light mode, or both if no dark one)
    stageImageDark: z.string().optional(), // optional Dark-mode background for the hero stage
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
    heroVideo: z.string().optional(), // short silent looping clip URL (wins over hero image)
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
    // ---- Optional fields for the Hinge-style lightbox (fall back to the fields above) ----
    summary: z.string().optional(), // Big one-line hook under the title (default: subtitle)
    results: z.string().optional(), // Ember result line under the hook (default: short)
    roleTitle: z.string().optional(), // Job title shown above `led` in the facts row
    timeline: z.string().optional(),
    timelineSub: z.string().optional(),
    teamSub: z.string().optional(),
    platformSub: z.string().optional(),
    platformLabel: z.string().optional(), // Facts-row label for `platform` (default "Platform")
    // Prompts in order, each optionally followed by joined images or coded demos.
    // When set, replaces the default problem → before/after → role sections.
    story: z
      .array(
        z.object({
          label: z.string(),
          answer: z.string(),
          media: z
            .array(z.object({ src: z.string().optional(), alt: z.string().optional(), demo: z.string().optional() }))
            .optional(),
        }),
      )
      .optional(),
    flagItems: z.array(z.object({ value: z.string(), label: z.string() })).optional(), // Smaller results beside the big stat
    flagNote: z.string().optional(), // How the result was measured
    flagMedia: z.array(z.object({ src: z.string(), alt: z.string().optional() })).optional(), // Images in one row under the Green flag
    lessonLabel: z.string().optional(), // Default "What I’d do differently"
    closing: z.string().optional(), // Answer for "Want the full story?" above the buttons
    draft: z.boolean().default(false),
  }),
});

export const collections = { work };
