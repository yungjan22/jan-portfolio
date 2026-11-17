// The picture behind "Drop a pixel": an original Vancouver scene in pixels,
// a dense evergreen forest above rows of curling ocean waves. No sky.
// 64 x 28 cells, so each of the four architectural columns holds 16.
// Every cell maps to one palette key; colours come from the --wave-* tokens.

export const COLS = 64;
export const ROWS = 28;
export const TOTAL = COLS * ROWS;

export type Tone =
  | 'pineDeep' | 'pineDark' | 'pine' | 'pineLight'
  | 'foam' | 'light' | 'mid' | 'deep';

const SHORE = 13; // last forest row; water starts below
const HORIZON = SHORE + 1;

// Seeded noise so the picture is the same for everyone.
const rand = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// Two layers of conifers. The back layer reaches the top edge so the forest
// fills the frame; the front layer is shorter and darker.
const BACK = Array.from({ length: 17 }, (_, k) => ({
  cx: k * 4 + 1 + rand(k) * 1.2,
  top: Math.floor(rand(k + 20) * 5) - 2, // -2..2, some run off the top
}));
const FRONT = Array.from({ length: 12 }, (_, k) => ({
  cx: k * 5.4 + 3 + rand(k + 60) * 1.6,
  top: 3 + Math.floor(rand(k + 90) * 4), // 3..6
}));

function inTree(t: { cx: number; top: number }, x: number, y: number, slope = 0.55) {
  if (y < t.top) return null;
  const d = y - t.top;
  const half = Math.floor(d / 2) * slope + (d % 2) * 0.9 + 0.5; // tiered branches
  const dx = x + 0.5 - t.cx;
  return Math.abs(dx) <= half ? { lit: dx > half - 0.9 } : null;
}

function forestTone(x: number, y: number): Tone {
  if (y === SHORE) return 'pineDeep'; // forest floor
  for (const t of FRONT) {
    const hit = inTree(t, x, y);
    if (hit) return hit.lit ? 'pineLight' : 'pine';
  }
  for (const t of BACK) if (inTree(t, x, y, 0.32)) return 'pineDark';
  return 'pineDeep'; // shade between the trees
}

// Waves: one hand-drawn 16 x 5 curl (F foam, L light, M mid, . deep water),
// repeated four times across and stacked in staggered rows.
const WAVE_TILE = [
  '.......FFF......',
  '.....FFLLLFF....',
  '...FFLLMMLLLF...',
  '.FFLLMMMMMMLFF..',
  'FLLMMMMMMMMMMLF.',
];
const TILE_TONE: Record<string, Tone> = { F: 'foam', L: 'light', M: 'mid', '.': 'deep' };
const WAVE_ROWS = [
  { top: HORIZON + 1, offset: 4 },
  { top: HORIZON + 6, offset: 12 },
  { top: HORIZON + 11, offset: 4 }, // runs off the bottom edge
];

function waterTone(x: number, y: number): Tone {
  if (y === HORIZON) return 'light';
  for (const r of WAVE_ROWS) {
    const ty = y - r.top;
    if (ty >= 0 && ty < WAVE_TILE.length) return TILE_TONE[WAVE_TILE[ty][(x + r.offset) % 16]];
  }
  return 'deep';
}

export const toneAt = (x: number, y: number): Tone => (y > SHORE ? waterTone(x, y) : forestTone(x, y));

/** Tone for every cell, row by row. */
export const PICTURE: Tone[] = Array.from({ length: TOTAL }, (_, i) => toneAt(i % COLS, Math.floor(i / COLS)));
