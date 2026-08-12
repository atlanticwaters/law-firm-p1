/**
 * scripts/prerender.js
 *
 * Headless prerender pipeline (Mechanism b).
 * Runs AFTER `vite build` has produced dist/.
 * Starts Vite preview, visits every route with Puppeteer,
 * captures rendered HTML, and writes dist/<route>/index.html.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';
import puppeteer from 'puppeteer';

// Resolve project root relative to this script
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

// ---------------------------------------------------------------------------
// Route enumeration
// ---------------------------------------------------------------------------

// Static routes
const STATIC_ROUTES = [
  '/',
  '/attorneys',
  '/practice',
  '/results',
  '/perspectives',
  '/clients',
  '/evaluate',
  '/community',
  '/careers',
  '/contact',
  '/privacy',
];

// Dynamic routes from data slugs
const { slugs: attorneySlugs } = await import('../src/data/attorneys.js');
const { slugs: resultSlugs } = await import('../src/data/results.js');
const { slugs: perspectiveSlugs } = await import('../src/data/perspectives.js');

const DYNAMIC_ROUTES = [
  ...attorneySlugs.map((s) => `/attorneys/${s}`),
  ...resultSlugs.map((s) => `/results/${s}`),
  ...perspectiveSlugs.map((s) => `/perspectives/${s}`),
];

const ALL_ROUTES = [...STATIC_ROUTES, ...DYNAMIC_ROUTES];

console.log(`Prerender: ${ALL_ROUTES.length} routes to process.`);

// ---------------------------------------------------------------------------
// Helper: derive dist output path from a route
// ---------------------------------------------------------------------------
function distPathForRoute(route) {
  if (route === '/') {
    return path.join(DIST, 'index.html');
  }
  // Strip leading slash, split segments
  const segments = route.replace(/^\//, '').split('/');
  return path.join(DIST, ...segments, 'index.html');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
let server;
let browser;
let failed = 0;
let written = 0;

try {
  // Start Vite preview server on a random available port
  server = await preview({
    root: ROOT,
    preview: {
      port: 0,         // 0 = OS picks a free port
      strictPort: false,
    },
  });

  // Resolve base URL
  let base;
  if (server.resolvedUrls?.local?.[0]) {
    base = server.resolvedUrls.local[0].replace(/\/$/, '');
  } else {
    const addr = server.httpServer.address();
    base = `http://localhost:${addr.port}`;
  }
  console.log(`Prerender: preview server at ${base}`);

  // Launch Puppeteer
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const route of ALL_ROUTES) {
    const url = base + route;
    const outFile = distPathForRoute(route);
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      // Wait until React has rendered something into #root
      await page.waitForSelector('#root > *', { timeout: 15000 });
      // Force all fade-in elements visible so captured HTML is not hidden for crawlers/no-JS
      await page.evaluate(() => {
        document.querySelectorAll('.fade-in').forEach((el) => el.classList.add('visible'));
      });
      const html = await page.content();

      // Write to dist
      const dir = path.dirname(outFile);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(outFile, html, 'utf-8');

      written++;
      console.log(`  ✓ ${route} → ${path.relative(ROOT, outFile)}`);
    } catch (err) {
      failed++;
      console.error(`  ✗ ${route}: ${err.message}`);
    } finally {
      await page.close();
    }
  }
} finally {
  if (browser) await browser.close();
  if (server?.httpServer) {
    // Close the HTTP server; resolve keep-alive connections so the process exits
    server.httpServer.closeAllConnections?.();
    await new Promise((resolve) => server.httpServer.close(resolve));
  }
}

console.log(`Prerender complete: ${written} written, ${failed} failed.`);

if (failed > 0 || written !== ALL_ROUTES.length) {
  process.exit(1);
}
