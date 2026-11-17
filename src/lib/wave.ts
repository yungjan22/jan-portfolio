// The picture behind "Drop a pixel": an original Vancouver scene in pixels,
// with North Shore mountains, an evergreen forest, and rows of curling waves.
// 64 x 28 cells, so each of the four architectural columns holds 16.
// Every cell maps to one palette key; colours come from the --wave-* tokens.

export const COLS = 64;
export const ROWS = 28;
export const TOTAL = COLS * ROWS;

export type Tone =
  | 'sky' | 'haze' | 'sun'
  | 'rock' | 'snow'
  | 'pineDark' | 'pine' | 'pineLight'
  | 'foam' | 'light' | 'mid' | 'deep';

const FOREST_BASE = 15; // last forest row; water starts below
const HORIZON = 16;

// Seeded noise so the picture is the same for everyone.
const rand = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function mountainTop(x: number): number {
  // North Shore ridges: two peaks around x≈15 and x≈46, low saddles between.
  const a = 9 - 6 * Math.exp(-(((x - 15) / 8) ** 2));
  const b = 9 - 6.6 * Math.exp(-(((x - 46) / 10) ** 2));
  return Math.min(a, b) + 0.35 * Math.sin(x * 0.9);
}

// Conifers: a row of triangles of different heights.
const TREES = Array.from({ length: 23 }, (_, k) => {
  const cx = k * 2.95 + rand(k) * 1.2;
  const h = 6 + Math.floor(rand(k + 40) * 5); // 6..10 cells tall
  return { cx, top: FOREST_BASE - h, back: rand(k + 80) > 0.5 };
});

function treeTone(x: number, y: number): Tone | null {
  let hit: Tone | null = null;
  for (const t of TREES) {
    if (y < t.top || y > FOREST_BASE) continue;
    const half = (y - t.top) * 0.2 + 0.3 + ((y - t.top) % 2 === 1 ? 0.3 : 0); // tiered branches
    const dx = x + 0.5 - t.cx;
    if (Math.abs(dx) <= half) {
      // Front trees are darker; a lit edge on the right of each tree.
      const tone: Tone = dx > half - 0.9 ? 'pineLight' : t.back ? 'pine' : 'pineDark';
      if (!hit || !t.back) hit = tone;
    }
  }
  return hit;
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
];

function waterTone(x: number, y: number): Tone {
  if (y === HORIZON) return 'light';
  for (const r of WAVE_ROWS) {
    const ty = y - r.top;
    if (ty >= 0 && ty < WAVE_TILE.length) return TILE_TONE[WAVE_TILE[ty][(x + r.offset) % 16]];
  }
  // The last row: tips of the next waves coming in.
  if (y === HORIZON + 11) return TILE_TONE[WAVE_TILE[0][(x + 8) % 16]];
  return 'deep';
}

export function toneAt(x: number, y: number): Tone {
  if (y > FOREST_BASE) return waterTone(x, y);
  const tree = treeTone(x, y);
  if (tree) return tree;
  if (y >= FOREST_BASE) return 'pineDark'; // forest floor
  const m = mountainTop(x);
  if (y >= m) return y < m + 1.4 && m < 4.6 ? 'snow' : 'rock';
  if ((x - 31) ** 2 + ((y - 2.6) * 1.1) ** 2 <= 4.2) return 'sun';
  return y > 5 ? 'haze' : 'sky';
}

/** Tone for every cell, row by row. */
export const PICTURE: Tone[] = Array.from({ length: TOTAL }, (_, i) => toneAt(i % COLS, Math.floor(i / COLS)));
