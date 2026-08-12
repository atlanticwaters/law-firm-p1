/**
 * /api/inquiry — validates a contact or careers submission and emails it to
 * the firm via Resend. Credentials come from the provisioned Resend
 * integration (RESEND_API_KEY); the recipient is INQUIRY_TO_EMAIL. Neither
 * is ever exposed to the browser.
 */
import { Resend } from 'resend'

const SCHEMAS = {
  contact: ['name', 'email', 'nature', 'message'],
  careers: ['name', 'email', 'position', 'message'],
}
const OPTIONAL = { careers: ['portfolioUrl'] }
const CAPS = { name: 200, email: 320, nature: 200, position: 200, portfolioUrl: 500, message: 5000 }
const HONEYPOT = 'company'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateInquiry(payload = {}) {
  const type = payload.type
  const errors = []
  const isSpam = typeof payload[HONEYPOT] === 'string' && payload[HONEYPOT].trim().length > 0

  if (!SCHEMAS[type]) {
    return { valid: false, errors: ['Unknown inquiry type.'], type, fields: {}, isSpam }
  }

  const fields = {}
  for (const key of SCHEMAS[type]) {
    const value = typeof payload[key] === 'string' ? payload[key].trim() : ''
    if (!value) errors.push(`${key} is required.`)
    else if (CAPS[key] && value.length > CAPS[key]) errors.push(`${key} is too long.`)
    else fields[key] = value
  }
  for (const key of OPTIONAL[type] || []) {
    const value = typeof payload[key] === 'string' ? payload[key].trim() : ''
    if (value) {
      if (CAPS[key] && value.length > CAPS[key]) errors.push(`${key} is too long.`)
      else fields[key] = value
    }
  }
  if (fields.email && !EMAIL_RE.test(fields.email)) errors.push('A valid email is required.')

  return { valid: errors.length === 0, errors, type, fields, isSpam }
}

const LABELS = {
  name: 'Name', email: 'Email', nature: 'Nature of Matter',
  position: 'Position of Interest', portfolioUrl: 'Portfolio / Résumé', message: 'Message',
}

export function buildEmail(type, fields) {
  const lines = Object.keys(fields).map((k) => `${LABELS[k] || k}: ${fields[k]}`)
  return {
    subject: `New ${type} inquiry — ${fields.name}`,
    text: lines.join('\n'),
    replyTo: fields.email,
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Allow', 'POST')
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method not allowed.' }))
    return
  }
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.INQUIRY_TO_EMAIL
  if (!apiKey || !to) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Inquiry delivery is not configured.' }))
    return
  }

  let payload
  try {
    payload = await readJsonBody(req)
  } catch {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Invalid request body.' }))
    return
  }

  const result = validateInquiry(payload)

  // Silently accept honeypot hits without sending.
  if (result.isSpam) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: true }))
    return
  }
  if (!result.valid) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: result.errors[0] }))
    return
  }

  const { subject, text, replyTo } = buildEmail(result.type, result.fields)
  try {
    const resend = new Resend(apiKey)
    const from = process.env.INQUIRY_FROM_EMAIL || 'onboarding@resend.dev'
    const { error } = await resend.emails.send({ from, to, subject, text, replyTo })
    if (error) throw new Error(error.message || 'Send failed.')
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: true }))
  } catch (err) {
    res.statusCode = 502
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: err?.message || 'Unable to deliver inquiry.' }))
  }
}

async function readJsonBody(req) {
  if (req.body != null) {
    if (typeof req.body === 'string') return JSON.parse(req.body)
    if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString('utf8'))
    return req.body
  }
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8')
  return raw ? JSON.parse(raw) : {}
}
