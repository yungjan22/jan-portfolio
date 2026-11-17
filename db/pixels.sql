-- Schema for "Add a pixel" (Cloudflare D1). Run once in the D1 console.
CREATE TABLE IF NOT EXISTS pixels (
  i INTEGER PRIMARY KEY,      -- cell index, 0..1791 (64 x 28)
  added INTEGER NOT NULL      -- ms timestamp
);
CREATE TABLE IF NOT EXISTS visits (
  day TEXT NOT NULL,          -- YYYY-MM-DD (UTC)
  who TEXT NOT NULL,          -- salted daily SHA-256 of the visitor IP, never the IP itself
  PRIMARY KEY (day, who)
);
