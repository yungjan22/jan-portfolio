import type { CollectionEntry } from 'astro:content';

/** CSS custom properties for a project's stage: colour, grading pair and optional background image. */
export function stageStyle(entry: CollectionEntry<'work'>): string {
  const { stage, stageImage, stageImageDark } = entry.data;
  const parts = [`--stage: var(--stage-${stage})`, `--stage-alt: var(--stage-${stage}-alt)`];
  if (stageImage) parts.push(`--stage-image: url('${stageImage}')`);
  if (stageImageDark) parts.push(`--stage-image-dark: url('${stageImageDark}')`);
  return parts.join('; ');
}
