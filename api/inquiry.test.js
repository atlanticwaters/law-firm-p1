import { describe, it, expect } from 'vitest'
import { validateInquiry, buildEmail } from './inquiry.js'

describe('validateInquiry', () => {
  it('accepts a valid contact inquiry', () => {
    const r = validateInquiry({
      type: 'contact', name: 'A. Handler', email: 'a@example.com',
      nature: 'Puppet defense', message: 'Details here.',
    })
    expect(r.valid).toBe(true)
    expect(r.isSpam).toBe(false)
    expect(r.errors).toEqual([])
  })

  it('accepts a valid careers inquiry with optional portfolioUrl omitted', () => {
    const r = validateInquiry({
      type: 'careers', name: 'B. Weft', email: 'b@example.com',
      position: 'Associate', message: 'Interested.',
    })
    expect(r.valid).toBe(true)
  })

  it('rejects unknown type', () => {
    const r = validateInquiry({ type: 'spam', name: 'x', email: 'a@b.co' })
    expect(r.valid).toBe(false)
    expect(r.errors).toContain('Unknown inquiry type.')
  })

  it('rejects missing required fields', () => {
    const r = validateInquiry({ type: 'contact', name: '', email: 'a@b.co' })
    expect(r.valid).toBe(false)
    expect(r.errors.length).toBeGreaterThan(0)
  })

  it('rejects malformed email', () => {
    const r = validateInquiry({
      type: 'contact', name: 'A', email: 'not-an-email',
      nature: 'x', message: 'y',
    })
    expect(r.valid).toBe(false)
    expect(r.errors).toContain('A valid email is required.')
  })

  it('flags honeypot as spam', () => {
    const r = validateInquiry({
      type: 'contact', name: 'A', email: 'a@b.co',
      nature: 'x', message: 'y', company: 'bot inc',
    })
    expect(r.isSpam).toBe(true)
  })

  it('enforces length caps', () => {
    const r = validateInquiry({
      type: 'contact', name: 'A'.repeat(201), email: 'a@b.co',
      nature: 'x', message: 'y',
    })
    expect(r.valid).toBe(false)
  })
})

describe('buildEmail', () => {
  it('builds a contact email with reply-to and all fields', () => {
    const e = buildEmail('contact', { name: 'A. Handler', email: 'a@b.co', nature: 'Defense', message: 'Hi' })
    expect(e.subject).toBe('New contact inquiry — A. Handler')
    expect(e.replyTo).toBe('a@b.co')
    expect(e.text).toContain('Defense')
    expect(e.text).toContain('Hi')
  })
})
