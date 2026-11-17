// The hidden picture behind "Add a pixel": an original breaking ocean wave with an
// ember sun, on a grid that sits on the four architectural columns (12 cells each).
// Every cell maps to one palette key; colours come from the --wave-* tokens.

export const COLS = 48;
export const ROWS = 20;
export const TOTAL = COLS * ROWS;

export type Tone = 'sky' | 'haze' | 'sun' | 'foam' | 'light' | 'mid' | 'deep';

// Geometry, in cell units (x right, y down).
const PEAK_X = 25; // where the long back of the wave tops out
const PEAK_Y = 3.2;
const SEA_Y = 15.2; // flat sea level
const CURL = { x: 30.5, y: 8.6, inner: 3.6, outer: 6.6 }; // the lip curling over the hollow

const backSurface = (x: number) => SEA_Y - (SEA_Y - PEAK_Y) * Math.pow(Math.min(x, PEAK_X) / PEAK_X, 1.7);
const seaSurface = (x: number) => SEA_Y + 0.45 * Math.sin(x * 0.9);

function depthTone(depth: number): Tone {
  if (depth < 0.9) return 'foam';
  if (depth < 2.4) return 'light';
  if (depth < 5.5) return 'mid';
  return 'deep';
}

export function toneAt(cx: number, cy: number): Tone {
  const x = cx + 0.5;
  const y = cy + 0.5;

  // 1. The curling lip: a ring around the hollow, from the top round to the right and down.
  const dx = x - CURL.x;
  const dy = y - CURL.y;
  const d = Math.hypot(dx, dy);
  const angle = (Math.atan2(dx, -dy) * 180) / Math.PI; // 0 = up, 90 = right
  if (d >= CURL.inner && d <= CURL.outer && angle >= -75 && angle <= 140) {
    if (d > CURL.outer - 1.1) return 'foam';
    return d > CURL.outer - 2.4 ? 'light' : 'mid';
  }
  // Spray where the lip breaks.
  if ((cx === 35 && cy === 13) || (cx === 37 && cy === 12) || (cx === 36 && cy === 14)) return 'foam';

  // 2. The hollow (barrel) under the lip: air you can see through.
  if (d < CURL.inner && angle >= -75) return 'haze';

  // 3. The long back of the wave, up to the peak, and the face down to the lip.
  if (x <= PEAK_X && y >= backSurface(x)) return depthTone(y - backSurface(x));
  if (x > PEAK_X && x < CURL.x && y >= PEAK_Y + (x - PEAK_X) * 0.15 && d >= CURL.inner) {
    return depthTone(y - (PEAK_Y + (x - PEAK_X) * 0.15));
  }

  // 4. Flat sea in front.
  if (y >= seaSurface(x)) return depthTone(y - seaSurface(x) + (x > CURL.x ? 0.4 : 0));

  // 5. Sky with an ember sun, upper right.
  if ((cx - 41) ** 2 + (cy - 3.5) ** 2 <= 7.5) return 'sun';
  return y > SEA_Y - 3 ? 'haze' : 'sky';
}

/** Tone for every cell, row by row. */
export const PICTURE: Tone[] = Array.from({ length: TOTAL }, (_, i) => toneAt(i % COLS, Math.floor(i / COLS)));
