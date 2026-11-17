// Cloudflare Pages Function for "Add a pixel".
// GET  /api/pixels      → { filled: number[] }
// POST /api/pixels {i}  → adds one pixel; one per visitor per day.
// Storage: D1 bound as DB (schema in db/pixels.sql). Without the binding it answers 503,
// and the page falls back to preview mode (this browser only).
// Privacy: only a salted, daily SHA-256 hash of the visitor's IP is stored, never the IP.

interface Env {
  DB?: D1Database;
}

const TOTAL = 64 * 28; // keep in sync with src/lib/wave.ts
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

async function visitorHash(request: Request, day: string): Promise<string> {
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const data = new TextEncoder().encode(`jan-pixels:${day}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.DB) return json({ error: 'storage not set up' }, 503);
  const { results } = await env.DB.prepare('SELECT i FROM pixels').all<{ i: number }>();
  return json({ filled: results.map((r) => r.i) });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) return json({ error: 'storage not set up' }, 503);
  let i: unknown;
  try {
    ({ i } = (await request.json()) as { i: unknown });
  } catch {
    return json({ error: 'bad request' }, 400);
  }
  if (!Number.isInteger(i) || (i as number) < 0 || (i as number) >= TOTAL) return json({ error: 'bad cell' }, 400);

  const day = new Date().toISOString().slice(0, 10);
  const who = await visitorHash(request, day);

  const visit = await env.DB.prepare('INSERT OR IGNORE INTO visits (day, who) VALUES (?, ?)').bind(day, who).run();
  if (!visit.meta.changes) return json({ error: 'one pixel a day' }, 429);

  const px = await env.DB.prepare('INSERT OR IGNORE INTO pixels (i, added) VALUES (?, ?)').bind(i, Date.now()).run();
  if (!px.meta.changes) {
    await env.DB.prepare('DELETE FROM visits WHERE day = ? AND who = ?').bind(day, who).run();
    return json({ error: 'taken' }, 409);
  }
  return json({ ok: true });
};
