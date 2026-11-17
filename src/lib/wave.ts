// The picture behind "Drop a pixel": an original Vancouver scene in pixels,
// evergreens against a light orange sky, above curling ocean waves.
// 64 x 28 cells, so each of the four architectural columns holds 16.
// Every cell maps to one palette key; colours come from the --wave-* tokens.

export const COLS = 64;
export const ROWS = 28;
export const TOTAL = COLS * ROWS;

export type Tone =
  | 'sky' | 'pineDeep' | 'pineDark' | 'pine' | 'pineLight'
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
const BACK = Array.from({ length: 13 }, (_, k) => ({
  cx: k * 5.2 + 0.5 + rand(k) * 1.4,
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
  for (const t of BACK) if (inTree(t, x, y, 0.3)) return 'pineDark';
  return y >= 10 ? 'pineDeep' : 'sky'; // light orange sky above, shade low between the trees
}

// Waves: hand-drawn curls in three sizes (F foam, L light, M mid, . open water),
// scattered at seeded-random sizes, gaps and heights so no pattern repeats.
// D is the hollow under a curling lip.
const CURLS = [
  ['..FFF...', '.FLLDF..', 'FLMMD...'],
  ['....FFF.....', '..FFLLLF....', '.FLMMDDLF...', 'FLMMMDDDF...', 'LMMMMMD.....'],
  ['......FFFF......', '....FFLLLLFF....', '...FLLMMMDLLF...', '..FLMMMDDDDFL...', '.FLMMMMDDDDDF...', 'FLMMMMMMDD......'],
];
const TILE_TONE: Record<string, Tone> = { F: 'foam', L: 'light', M: 'mid', D: 'deep' };

const SEA: Tone[][] = Array.from({ length: ROWS }, (_, y) =>
  Array.from({ length: COLS }, () => (y === HORIZON ? 'light' : 'deep') as Tone),
);
{
  let seed = 500;
  const r = () => rand(seed++);
  // Back to front, so nearer waves overlap the ones behind them.
  for (let y = HORIZON - 1; y < ROWS; y += 3 + Math.floor(r() * 3)) {
    const near = (y - HORIZON) / (ROWS - HORIZON); // bigger waves closer to the viewer
    for (let x = -Math.floor(r() * 10); x < COLS; ) {
      const size = Math.min(2, Math.floor(r() * 2 + near * 1.6));
      const curl = CURLS[size];
      const top = y + Math.floor(r() * 4) - 1;
      curl.forEach((row, dy) => {
        for (let dx = 0; dx < row.length; dx++) {
          const tone = TILE_TONE[row[dx]];
          const cy = top + dy, cx = x + dx;
          if (tone && cy > HORIZON && cy < ROWS && cx >= 0 && cx < COLS) SEA[cy][cx] = tone;
        }
      });
      x += curl[0].length + Math.floor(r() * 9);
    }
  }
}

const waterTone = (x: number, y: number): Tone => SEA[y][x];

export const toneAt = (x: number, y: number): Tone => (y > SHORE ? waterTone(x, y) : forestTone(x, y));

/** Tone for every cell, row by row. */
export const PICTURE: Tone[] = Array.from({ length: TOTAL }, (_, i) => toneAt(i % COLS, Math.floor(i / COLS)));
