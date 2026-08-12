import { describe, it, expect } from 'vitest'
import { buildSitemap } from './generate-sitemap.js'

describe('buildSitemap', () => {
  it('emits a urlset with absolute URLs for each path', () => {
    const xml = buildSitemap(['/', '/contact'], 'https://glovermastpurl.com')
    expect(xml).toContain('<?xml')
    expect(xml).toContain('<urlset')
    expect(xml).toContain('<loc>https://glovermastpurl.com/</loc>')
    expect(xml).toContain('<loc>https://glovermastpurl.com/contact</loc>')
  })

  it('deduplicates and sorts paths', () => {
    const xml = buildSitemap(['/b', '/a', '/a'], 'https://x.com')
    expect(xml.indexOf('/a')).toBeLessThan(xml.indexOf('/b'))
    expect(xml.match(/\/a</g).length).toBe(1)
  })
})
