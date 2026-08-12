import { writeFileSync } from 'node:fs'
import { slugs as attorneySlugs } from '../src/data/attorneys.js'
import { slugs as resultSlugs } from '../src/data/results.js'
import { slugs as perspectiveSlugs } from '../src/data/perspectives.js'

const HOST = 'https://glovermastpurl.com'
const STATIC = ['/', '/attorneys', '/practice', '/results', '/perspectives', '/clients', '/evaluate', '/community', '/careers', '/contact', '/privacy']

export function buildSitemap(paths, host) {
  const unique = [...new Set(paths)].sort()
  const urls = unique.map((p) => `  <url><loc>${host}${p}</loc></url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function allPaths() {
  return [
    ...STATIC,
    ...attorneySlugs.map((s) => `/attorneys/${s}`),
    ...resultSlugs.map((s) => `/results/${s}`),
    ...perspectiveSlugs.map((s) => `/perspectives/${s}`),
  ]
}

// Direct-run writer
if (import.meta.url === `file://${process.argv[1]}`) {
  const xml = buildSitemap(allPaths(), HOST)
  writeFileSync('dist/sitemap.xml', xml)
  writeFileSync('public/sitemap.xml', xml)
  console.log('sitemap.xml written')
}
