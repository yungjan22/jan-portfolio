// @ts-check
import { defineConfig } from 'astro/config';

// Static site, deployed to Cloudflare Pages at jan.bitbypixel.com.
export default defineConfig({
  site: 'https://jan.bitbypixel.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
