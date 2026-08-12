# Contact/Careers Forms + Full SEO Pass — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Contact form (and a new Careers form) deliver real inquiries via a first-party Vercel Function backed by Resend, and give the SPA a full SEO pass by pre-rendering every route to static HTML with correct per-page metadata, sitemap, robots, structured data, and Open Graph cards.

**Architecture:** Two workstreams. (A) Forms: a single `api/inquiry.js` Vercel Function validates and emails submissions through the Resend Marketplace integration; both forms share a `useFormSubmit` hook. (B) SEO: introduce build-time static rendering (SSG) so crawlers/social scrapers get real per-route HTML, driven by centralized route data and a `<Seo>` head component, plus a build-time sitemap generator.

**Tech Stack:** React 19, Vite 8, React Router v7, Vercel Functions (Node/ESM), Resend, Vitest (new), react-helmet-async (new), vite-react-ssg (new, pending compatibility check).

## Global Constraints

- React 19 + Vite (JavaScript, **not** TypeScript). Functional components, hooks only, one component per file, default exports.
- CSS: custom properties only, BEM-lite class names, no CSS framework. Palette strictly cool-toned; no gold/warm accents.
- All UI copy is formal: **no emoji, no exclamation marks.**
- Environment variables exposed to the client are prefixed `VITE_`. Secrets (Resend key, recipient address) are server-side only, never `VITE_`-prefixed, never in the client bundle.
- All Claude/email credentials come from provisioned integrations, never hardcoded.
- Canonical host: `https://glovermastpurl.com` (used for canonical tags, OG URLs, sitemap).
- Commit messages end with: `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.
- Do not push to `main` (auto-deploys production) without explicit user approval; commit locally as you go.

---

## File Structure

**New files:**
- `api/inquiry.js` — Function: validate + email a contact/careers inquiry via Resend.
- `api/inquiry.test.js` — Vitest unit tests for validation/honeypot logic.
- `src/hooks/useFormSubmit.js` — shared form submission lifecycle hook.
- `src/hooks/useFormSubmit.test.jsx` — Vitest test for the hook.
- `src/components/CareersForm.jsx` — careers application form.
- `src/components/Seo.jsx` — per-route head/meta component.
- `src/data/attorneys.js`, `src/data/results.js`, `src/data/perspectives.js` — centralized route data + slug lists.
- `scripts/generate-sitemap.js` — build-time sitemap generator (pure fn + writer).
- `scripts/generate-sitemap.test.js` — Vitest test for the sitemap builder.
- `public/og-default.png` — branded default Open Graph image.
- `vitest.config.js` — test config.

**Modified:**
- `src/pages/Contact.jsx`, `src/pages/Careers.jsx`, and every page under `src/pages/` (Seo migration).
- `src/App.jsx`, `src/main.jsx` (SSG routing), `vite.config.js` (dev middleware + SSG), `package.json` (deps + scripts), `public/robots.txt`, `index.html`, `src/index.css`, `src/hooks/useFadeIn.js`.

**Removed:** `src/hooks/useDocumentTitle.js` (after Seo migration).

---

## Phase 0 — Foundations

### Task 1: Add Vitest test infrastructure

**Files:**
- Modify: `package.json`
- Create: `vitest.config.js`
- Create: `src/test-smoke.test.js` (temporary sanity test, deleted in Step 6)

**Interfaces:**
- Produces: an `npm test` script (`vitest run`) and `npm run test:watch` usable by all later tasks.

- [ ] **Step 1: Install dev dependencies**

```bash
npm install -D vitest@^3 jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 2: Create `vitest.config.js`**

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
  },
})
```

- [ ] **Step 3: Add scripts to `package.json`**

In the `"scripts"` block add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Write a smoke test** — `src/test-smoke.test.js`

```js
import { describe, it, expect } from 'vitest'

describe('vitest', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 5: Run it**

Run: `npm test`
Expected: PASS (1 test).

- [ ] **Step 6: Delete the smoke test and commit**

```bash
rm src/test-smoke.test.js
git add package.json package-lock.json vitest.config.js
git commit -m "test: add Vitest infrastructure

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Provision Resend + configure env

**Files:** none (infra + local `.env`)

**Interfaces:**
- Produces: `RESEND_API_KEY` and `INQUIRY_TO_EMAIL` available to functions (Vercel prod/preview + local `.env`).

- [ ] **Step 1: Provision the integration** (project already linked via `vercel link`)

```bash
npx vercel integration add resend/resend-email --yes
```

If the CLI hands off to a dashboard/browser step (Resend is connectable), STOP and ask the user to finish the connect + **verify a sending domain** (`glovermastpurl.com`) in the Resend dashboard, then continue. Confirm the injected key:

```bash
npx vercel integration list
npx vercel env ls   # names only — RESEND_API_KEY should appear
```

- [ ] **Step 2: Add the recipient address env var** (all environments)

```bash
npx vercel env add INQUIRY_TO_EMAIL production   # value: inquiries@glovermastpurl.com (confirm with user)
npx vercel env add INQUIRY_TO_EMAIL preview
npx vercel env add INQUIRY_TO_EMAIL development
```

- [ ] **Step 3: Pull env for local dev**

```bash
npx vercel env pull --yes   # writes .env.local (gitignored)
```

Add `RESEND_API_KEY` and `INQUIRY_TO_EMAIL` to local `.env` as well (gitignored) so the Vite dev middleware picks them up. For local testing before domain verification, sending uses Resend's `onboarding@resend.dev` sender.

- [ ] **Step 4: Update `.env.example`** (documentation only — no secrets)

Append:

```
# Server-side only — used by /api/inquiry (never VITE_-prefixed)
RESEND_API_KEY=your-resend-key
INQUIRY_TO_EMAIL=inquiries@glovermastpurl.com
```

```bash
git add .env.example
git commit -m "chore: document Resend env vars for inquiry delivery

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Phase A — Forms

### Task 3: `api/inquiry.js` — validation + email

**Files:**
- Create: `api/inquiry.js`
- Test: `api/inquiry.test.js`
- Modify: `package.json` (add `resend` dependency)

**Interfaces:**
- Produces:
  - `validateInquiry(payload) -> { valid: boolean, errors: string[], type: string, fields: object, isSpam: boolean }` (pure, exported).
  - `buildEmail(type, fields) -> { subject: string, text: string, replyTo: string }` (pure, exported).
  - `default async function handler(req, res)` — Vercel Function.
- Consumes: `RESEND_API_KEY`, `INQUIRY_TO_EMAIL` from `process.env`; the honeypot field name is `company`.

- [ ] **Step 1: Install the Resend SDK**

```bash
npm install resend
```

- [ ] **Step 2: Write the failing test** — `api/inquiry.test.js`

```js
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
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- api/inquiry.test.js`
Expected: FAIL (module/exports not found).

- [ ] **Step 4: Implement `api/inquiry.js`**

```js
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
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- api/inquiry.test.js`
Expected: PASS (all cases).

- [ ] **Step 6: Add Node globals for `api/**` in ESLint** (already configured in `eslint.config.js` — confirm `api/**/*.js` block exists; the test file uses vitest globals, add `**/*.test.{js,jsx}` to that node block's files or a new block with `globals.node` + vitest globals). Then lint:

Run: `npx eslint api/inquiry.js api/inquiry.test.js`
Expected: clean.

- [ ] **Step 7: Commit**

```bash
git add api/inquiry.js api/inquiry.test.js package.json package-lock.json eslint.config.js
git commit -m "feat: add /api/inquiry endpoint for contact and careers submissions

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Generalize the Vite dev middleware for any `/api/*`

**Files:**
- Modify: `vite.config.js`

**Interfaces:**
- Consumes: any `api/<name>.js` default-export handler.
- Produces: `/api/<name>` served in `vite dev`.

- [ ] **Step 1: Replace the single-route middleware** with a generic one. In `vite.config.js`, change the `apiDevServer` middleware registration from `'/api/chat'` to a generic `/api` handler that resolves the file:

```js
server.middlewares.use('/api', async (req, res, next) => {
  const name = req.url.split('?')[0].replace(/^\/+/, '').replace(/\/+$/, '')
  const file = `./api/${name}.js`
  try {
    const mod = await import(new URL(file, import.meta.url).pathname)
    await mod.default(req, res)
  } catch (err) {
    if (err && err.code === 'ERR_MODULE_NOT_FOUND') { next(); return }
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: err?.message || 'Dev handler error.' }))
  }
})
```

Keep the existing env-bridging block (extend it so both `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, and `INQUIRY_TO_EMAIL` are copied from `env` into `process.env` when unset).

- [ ] **Step 2: Verify both endpoints resolve in dev**

```bash
env -u ANTHROPIC_API_KEY -u RESEND_API_KEY npx vite --port 5199 &
sleep 3
curl -s -X POST http://localhost:5199/api/chat -d '{}' -H 'Content-Type: application/json' -w '\n%{http_code}\n'
curl -s -X POST http://localhost:5199/api/inquiry -d '{"type":"contact"}' -H 'Content-Type: application/json' -w '\n%{http_code}\n'
kill %1
```

Expected: both return JSON errors (not HTML), 500/400 respectively.

- [ ] **Step 3: Commit**

```bash
git add vite.config.js
git commit -m "chore: generalize Vite dev middleware to serve any /api endpoint

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: `useFormSubmit` hook

**Files:**
- Create: `src/hooks/useFormSubmit.js`
- Test: `src/hooks/useFormSubmit.test.jsx`

**Interfaces:**
- Produces: `useFormSubmit(endpoint) -> { status: 'idle'|'submitting'|'success'|'error', error: string|null, submit(payload): Promise<boolean>, reset() }`.

- [ ] **Step 1: Write the failing test** — `src/hooks/useFormSubmit.test.jsx`

```jsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useFormSubmit } from './useFormSubmit.js'

beforeEach(() => { vi.restoreAllMocks() })

describe('useFormSubmit', () => {
  it('starts idle', () => {
    const { result } = renderHook(() => useFormSubmit('/api/inquiry'))
    expect(result.current.status).toBe('idle')
    expect(result.current.error).toBe(null)
  })

  it('transitions to success on ok response', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ ok: true }) })))
    const { result } = renderHook(() => useFormSubmit('/api/inquiry'))
    let returned
    await act(async () => { returned = await result.current.submit({ type: 'contact' }) })
    expect(returned).toBe(true)
    await waitFor(() => expect(result.current.status).toBe('success'))
  })

  it('surfaces an error message on failure', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, json: async () => ({ error: 'Nope.' }) })))
    const { result } = renderHook(() => useFormSubmit('/api/inquiry'))
    let returned
    await act(async () => { returned = await result.current.submit({ type: 'contact' }) })
    expect(returned).toBe(false)
    await waitFor(() => expect(result.current.status).toBe('error'))
    expect(result.current.error).toBe('Nope.')
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- src/hooks/useFormSubmit.test.jsx`
Expected: FAIL (hook not defined).

- [ ] **Step 3: Implement `src/hooks/useFormSubmit.js`**

```js
import { useCallback, useState } from 'react'

export function useFormSubmit(endpoint) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const submit = useCallback(async (payload) => {
    setStatus('submitting')
    setError(null)
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.ok) {
        throw new Error(data.error || `Request failed: ${response.status}`)
      }
      setStatus('success')
      return true
    } catch (err) {
      setError(err.message)
      setStatus('error')
      return false
    }
  }, [endpoint])

  const reset = useCallback(() => { setStatus('idle'); setError(null) }, [])

  return { status, error, submit, reset }
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- src/hooks/useFormSubmit.test.jsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useFormSubmit.js src/hooks/useFormSubmit.test.jsx
git commit -m "feat: add useFormSubmit hook for form submission lifecycle

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Wire Contact.jsx to real submission

**Files:**
- Modify: `src/pages/Contact.jsx`

**Interfaces:**
- Consumes: `useFormSubmit('/api/inquiry')`; honeypot field `company`.

- [ ] **Step 1: Replace form state + submit.** Import `useFormSubmit`. Keep the `form` state for fields, add a `company` honeypot field to `form`. Replace `handleSubmit`:

```js
const { status, error, submit } = useFormSubmit('/api/inquiry')
const submitted = status === 'success'

const handleSubmit = async (e) => {
  e.preventDefault()
  await submit({ type: 'contact', ...form })
}
```

- [ ] **Step 2: Add the hidden honeypot input** inside the form (before the submit button):

```jsx
<input
  type="text" name="company" value={form.company} onChange={handleChange}
  tabIndex={-1} autoComplete="off" aria-hidden="true"
  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
/>
```

Initialize `company: ''` in the `form` useState.

- [ ] **Step 3: Reflect submitting/error state.** Set the submit button:

```jsx
<button type="submit" className="form-submit" disabled={status === 'submitting'}>
  {status === 'submitting' ? 'Submitting' : 'Submit Inquiry'}
</button>
{status === 'error' && <p className="form-error">{error}</p>}
```

Keep the existing `submitted` success block exactly as-is.

- [ ] **Step 4: Manual verify in dev** (Resend key present in `.env`):

```bash
npm run dev
# Visit http://localhost:5173/contact, submit the form, confirm success UI;
# submit again with a value typed into the honeypot via devtools → still success, no email.
```

- [ ] **Step 5: Lint + commit**

```bash
npx eslint src/pages/Contact.jsx
git add src/pages/Contact.jsx
git commit -m "feat: wire Contact form to /api/inquiry with honeypot and states

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Careers application form

**Files:**
- Create: `src/components/CareersForm.jsx`
- Modify: `src/pages/Careers.jsx`

**Interfaces:**
- Consumes: `useFormSubmit('/api/inquiry')`.
- Produces: `<CareersForm />` default export.

- [ ] **Step 1: Create `src/components/CareersForm.jsx`**

```jsx
import { useState } from 'react'
import { useFormSubmit } from '../hooks/useFormSubmit'

const EMPTY = { name: '', email: '', position: '', portfolioUrl: '', message: '', company: '' }

export default function CareersForm() {
  const [form, setForm] = useState(EMPTY)
  const { status, error, submit } = useFormSubmit('/api/inquiry')
  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = async (e) => { e.preventDefault(); await submit({ type: 'careers', ...form }) }

  if (status === 'success') {
    return (
      <div className="form-success">
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: 'var(--space-sm)' }}>
          Application received.
        </p>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-light)' }}>
          A member of the firm will respond in due course.
        </p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="c-name">Full Name</label>
        <input id="c-name" name="name" type="text" value={form.name} onChange={handleChange} required autoComplete="name" />
      </div>
      <div className="form-group">
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" />
      </div>
      <div className="form-group">
        <label htmlFor="c-position">Position of Interest</label>
        <input id="c-position" name="position" type="text" value={form.position} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="c-portfolio">Portfolio or Résumé URL</label>
        <input id="c-portfolio" name="portfolioUrl" type="url" value={form.portfolioUrl} onChange={handleChange} placeholder="https://" />
      </div>
      <div className="form-group">
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" value={form.message} onChange={handleChange} required />
      </div>
      <input type="text" name="company" value={form.company} onChange={handleChange}
        tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }} />
      <button type="submit" className="form-submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting' : 'Submit Application'}
      </button>
      {status === 'error' && <p className="form-error">{error}</p>}
    </form>
  )
}
```

- [ ] **Step 2: Render it on the Careers page.** In `src/pages/Careers.jsx`, import `CareersForm` and place `<CareersForm />` in an appropriate section near the end of the page content (follow the page's existing section markup; wrap in the page's container class). Keep copy formal.

- [ ] **Step 3: Manual verify in dev** — visit `/careers`, submit, confirm success UI.

- [ ] **Step 4: Lint + commit**

```bash
npx eslint src/components/CareersForm.jsx src/pages/Careers.jsx
git add src/components/CareersForm.jsx src/pages/Careers.jsx
git commit -m "feat: add Careers application form

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Form error/submitting styles

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add styles** near the existing `.contact-form` / `.form-success` rules:

```css
.form-error {
  margin-top: var(--space-sm);
  color: #8a1c1c; /* cool-compatible deep red for validation errors */
  font-size: 0.9375rem;
}
.form-submit:disabled { opacity: 0.6; cursor: default; }
```

- [ ] **Step 2: Verify** the error text renders in the correct place (force an error by stopping the dev API). Commit:

```bash
git add src/index.css
git commit -m "style: add form error and disabled submit states

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Phase B — SEO

### Task 9: Centralize route data

**Files:**
- Create: `src/data/attorneys.js`, `src/data/results.js`, `src/data/perspectives.js`
- Modify: `src/pages/AttorneyDetail.jsx`, `src/pages/Attorneys.jsx`, `src/pages/ResultDetail.jsx`, `src/pages/Results.jsx`, `src/pages/PerspectiveDetail.jsx`, `src/pages/Perspectives.jsx`

**Interfaces:**
- Produces (each module): a default-exported array of items where every item has at minimum `{ slug, title }` plus the fields the pages already use; and a named `slugs` export (`export const slugs = items.map(i => i.slug)`).

- [ ] **Step 1: Extract attorney data.** Move the attorney records currently inline in `AttorneyDetail.jsx` / `Attorneys.jsx` into `src/data/attorneys.js`. Preserve every field. Add `export const slugs`.

- [ ] **Step 2: Repeat for results** (`ResultDetail.jsx` / `Results.jsx` → `src/data/results.js`) and **perspectives** (`PerspectiveDetail.jsx` / `Perspectives.jsx` → `src/data/perspectives.js`). Each detail item retains `slug`, `title`/matter name, and `heroImage` where present.

- [ ] **Step 3: Update the six pages to import from `src/data/*`** instead of local literals. No behavior change.

- [ ] **Step 4: Verify parity** — `npm run build && npm run preview`, click through several attorney/result/perspective detail pages; confirm identical content.

- [ ] **Step 5: Commit**

```bash
git add src/data src/pages
git commit -m "refactor: centralize attorney/result/perspective data into src/data

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: SSG compatibility spike + install

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: a decision (mechanism a = `vite-react-ssg`, or fallback b = headless prerender) recorded at the top of Task 11, and the corresponding dependency installed.

- [ ] **Step 1: Attempt `vite-react-ssg` install**

```bash
npm install -D vite-react-ssg react-helmet-async
```

- [ ] **Step 2: Check peer compatibility** with Vite 8 / React 19: read `node_modules/vite-react-ssg/package.json` peerDependencies; run a minimal build spike (Task 11 Step 1). If it builds and hydrates without peer errors, mechanism (a) is confirmed.

- [ ] **Step 3: If incompatible**, uninstall `vite-react-ssg`, keep `react-helmet-async`, and install the fallback toolchain:

```bash
npm uninstall vite-react-ssg
npm install -D puppeteer
```

Record "Mechanism: (b) headless prerender" and implement Task 11 via the fallback variant (a `scripts/prerender.js` that launches `vite preview`, visits each route from the route list, and writes `dist/<route>/index.html`). All later SEO tasks are mechanism-agnostic.

- [ ] **Step 4: Commit the dependency choice**

```bash
git add package.json package-lock.json
git commit -m "build: add SSG toolchain (mechanism recorded in plan Task 11)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 11: Convert to SSG rendering

**Files:**
- Modify: `src/main.jsx`, `src/App.jsx`, `package.json` (build script)
- Create (fallback only): `scripts/prerender.js`

**Interfaces:**
- Consumes: `slugs` from `src/data/*` for `includedRoutes`.
- Produces: `npm run build` emits one static HTML file per route under `dist/`.

**Mechanism (a) — vite-react-ssg:**

- [ ] **Step 1: Convert routing to a routes array.** Replace the JSX `<BrowserRouter><Routes>` in `App.jsx` with an exported `routes` array (React Router object format) that mirrors the current nesting under `Layout`. Include the dynamic detail routes.

- [ ] **Step 2: Switch the entry** in `src/main.jsx` to `vite-react-ssg`'s `ViteReactSSG`:

```jsx
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App'
import './index.css'

export const createRoot = ViteReactSSG(
  { routes },
  ({ router, isClient }) => { /* wrap providers here (HelmetProvider added in Task 13) */ },
)
```

- [ ] **Step 3: Enumerate dynamic routes** via `includedRoutes` in `vite.config.js` SSG options:

```js
ssgOptions: {
  includedRoutes(paths) {
    const staticPaths = paths.filter((p) => !p.includes(':'))
    // add detail routes from centralized data
    return staticPaths
  },
}
```

Import `slugs` from `src/data/*` and expand `attorneys/:slug`, `results/:slug`, `perspectives/:slug` into concrete paths.

- [ ] **Step 4: Set the build script** in `package.json`: `"build": "vite-react-ssg build"`.

**Mechanism (b) — headless prerender (only if Task 10 chose it):**

- [ ] **Step 1b: Keep `App.jsx`/`main.jsx` as-is** (BrowserRouter SPA).
- [ ] **Step 2b: Create `scripts/prerender.js`** that: builds the SPA (`vite build`), starts `vite preview`, uses Puppeteer to visit every route (static list + expanded slugs from `src/data/*`), waits for network idle, and writes `page.content()` to `dist/<route>/index.html`. Close the browser + preview server.
- [ ] **Step 3b: Set** `"build": "vite build && node scripts/prerender.js"`.

**Both mechanisms:**

- [ ] **Step 5: Build and verify static output**

```bash
npm run build
ls dist/attorneys        # expect harriet-weft/index.html etc. (or attorneys/harriet-weft.html)
grep -l "Harriet" dist/attorneys/harriet-weft/index.html
```

Expected: per-route HTML files exist and contain that page's content.

- [ ] **Step 6: Preview + smoke test hydration**

```bash
npm run preview
# Load /, navigate client-side, confirm no hydration errors in console.
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "build: pre-render all routes to static HTML (SSG)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 12: Make `useFadeIn` SSR-safe

**Files:**
- Modify: `src/hooks/useFadeIn.js`

**Interfaces:** unchanged signature.

- [ ] **Step 1: Guard browser-only APIs.** Ensure the hook does not touch `window`/`IntersectionObserver` during server render, and that elements are visible in the static HTML (not stuck at opacity 0) before JS runs. Concretely: the effect that creates the `IntersectionObserver` already runs only in `useEffect` (client-only) — verify. Add a fallback so that if `IntersectionObserver` is undefined (older/SSR), the element is set visible immediately:

```js
useEffect(() => {
  const node = ref.current
  if (!node) return
  if (typeof IntersectionObserver === 'undefined') { node.classList.add('is-visible'); return }
  // ... existing observer logic ...
}, [])
```

- [ ] **Step 2: Ensure initial CSS state degrades gracefully.** Confirm `.fade-in` without `is-visible` is not `display:none`; it should be visible-but-pre-animation for no-JS/crawler reads. If `.fade-in` starts at `opacity: 0`, add a `<noscript>`-equivalent safeguard: keep opacity transition but ensure hydration adds `is-visible` on mount for elements already in view.

- [ ] **Step 3: Verify** — disable JS in the browser and load a pre-rendered page; content must be readable. Re-enable JS; fade-ins still animate on scroll.

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useFadeIn.js src/index.css
git commit -m "fix: make scroll-fade SSR-safe so pre-rendered content is visible

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 13: `<Seo>` component + HelmetProvider

**Files:**
- Create: `src/components/Seo.jsx`
- Modify: `src/main.jsx` (wrap app in `HelmetProvider`), `index.html` (reduce to defaults)

**Interfaces:**
- Produces: `<Seo title description image type canonicalPath jsonLd />` default export.

- [ ] **Step 1: Implement `src/components/Seo.jsx`**

```jsx
import { Helmet } from 'react-helmet-async'

const SITE = 'Glover, Mast & Purl LLP'
const HOST = 'https://glovermastpurl.com'
const DEFAULT_DESC = 'Premier litigation counsel for entities who cannot independently retain or instruct legal representation. New York, London, Geneva.'
const DEFAULT_IMAGE = `${HOST}/og-default.png`

export default function Seo({ title, description, image, type = 'website', canonicalPath = '/', jsonLd }) {
  const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Counsel for Those Who Cannot Speak for Themselves`
  const desc = description || DEFAULT_DESC
  const url = `${HOST}${canonicalPath}`
  const img = image ? (image.startsWith('http') ? image : `${HOST}${image}`) : DEFAULT_IMAGE
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content={SITE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
```

- [ ] **Step 2: Wrap the app in `HelmetProvider`** in `src/main.jsx` (inside the ViteReactSSG factory or SPA root as applicable).

- [ ] **Step 3: Trim `index.html`** to site-wide defaults only (keep charset, viewport, favicon, fonts, the base `LegalService` JSON-LD, and a default title/description/OG as fallback for any non-prerendered response). Per-route values now come from `<Seo>`.

- [ ] **Step 4: Build + verify** a route's head is unique:

```bash
npm run build
grep -o '<title>[^<]*</title>' dist/contact/index.html
```

Expected: the Contact-specific title.

- [ ] **Step 5: Commit**

```bash
git add src/components/Seo.jsx src/main.jsx index.html
git commit -m "feat: add Seo head component with per-route meta and OG tags

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 14: Migrate all pages to `<Seo>` (with per-page copy)

**Files:**
- Modify: every file in `src/pages/`
- Remove: `src/hooks/useDocumentTitle.js`

**Interfaces:** Consumes `<Seo>`. Replaces `useDocumentTitle(...)` calls.

Per-page metadata (title | description) — **use these exact values** (formal, in-voice, keyword-tuned to the firm's thematic vocabulary):

| Route | `title` | `description` |
|---|---|---|
| `/` (Home) | *(omit — uses default site title)* | *(default)* |
| `/attorneys` | `Attorneys` | `The litigators of Glover, Mast & Purl — counsel experienced in entity representation, attributed speech, and handler misconduct across New York, London, and Geneva.` |
| `/attorneys/:slug` | `${attorney.name}` | `${attorney.name}, ${attorney.title} at Glover, Mast & Purl — representing entities in ${attorney.focus || 'complex litigation'}.` |
| `/practice` | `Practice Areas` | `Puppet defense, handler misconduct, attributed speech claims, wrongful termination, intellectual property, and entity standing — the firm's core litigation practice.` |
| `/results` | `Representative Matters` | `Selected outcomes in entity representation — dismissals, precedential rulings, and recoveries obtained for clients who cannot speak for themselves.` |
| `/results/:slug` | `${matter.title}` | `${matter.summary || 'A representative matter handled by Glover, Mast & Purl.'}` |
| `/perspectives` | `Perspectives` | `Writing from the firm on entity rights, the attributed speech doctrine, and the evolving law of representation for non-speaking clients.` |
| `/perspectives/:slug` | `${article.title}` | `${article.excerpt || article.title}` |
| `/clients` | `Our Clients` | `Glover, Mast & Purl represents puppet entities exclusively — the standard of representation for clients who act only through authorized representatives.` |
| `/evaluate` | `Case Evaluation` | `Determine whether your client's situation warrants legal action — indicators, supporting evidence, and possible outcomes across the firm's practice areas.` |
| `/community` | `Community` | `The firm's pro bono and advocacy work advancing recognition and standing for entity clients.` |
| `/careers` | `Careers` | `Join Glover, Mast & Purl — litigation careers in the emerging field of entity representation. Submit an application.` |
| `/contact` | `Submit an Inquiry` | `Contact Glover, Mast & Purl. All matters begin with a written inquiry; a member of the firm responds within three business days.` |
| `/privacy` | `Privacy Policy` | `How Glover, Mast & Purl handles information submitted through this site.` |
| `*` (NotFound) | `Page Not Found` | *(default)* |

- [ ] **Step 1: For each page**, remove `useDocumentTitle(...)` and its import; add `import Seo from '../components/Seo'` and render `<Seo title="..." description="..." canonicalPath="/route" />` as the first child. For detail pages, build title/description/`canonicalPath` from the item (e.g. `canonicalPath={` `/attorneys/${slug}` `}`), and pass `type="article"` on perspective detail pages.

- [ ] **Step 2: Delete `src/hooks/useDocumentTitle.js`** once no page imports it.

```bash
grep -rl useDocumentTitle src   # expect no results
rm src/hooks/useDocumentTitle.js
```

- [ ] **Step 3: Review H1/H2 hierarchy** on each page — exactly one `<h1>` (the page hero title), descriptive `<h2>`s for sections. Fix any page with multiple/zero H1s.

- [ ] **Step 4: Build + spot-check** three routes' titles/descriptions via `grep` on `dist/**/index.html`.

- [ ] **Step 5: Commit**

```bash
git add src/pages src/hooks
git commit -m "feat: per-page SEO metadata via Seo; remove useDocumentTitle

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 15: Build-time sitemap generator

**Files:**
- Create: `scripts/generate-sitemap.js`, `scripts/generate-sitemap.test.js`
- Modify: `package.json` (build script), import route data from `src/data/*`

**Interfaces:**
- Produces: `buildSitemap(paths, host) -> string` (pure, exported) and a writer that outputs `dist/sitemap.xml` (and `public/sitemap.xml` for dev parity).

- [ ] **Step 1: Write the failing test** — `scripts/generate-sitemap.test.js`

```js
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
```

- [ ] **Step 2: Run to verify fail**

Run: `npm test -- scripts/generate-sitemap.test.js`
Expected: FAIL.

- [ ] **Step 3: Implement `scripts/generate-sitemap.js`**

```js
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
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- scripts/generate-sitemap.test.js`
Expected: PASS.

- [ ] **Step 5: Wire into build.** Set `"build"` to run the SSG build then the sitemap: e.g. `"build": "vite-react-ssg build && node scripts/generate-sitemap.js"` (mechanism a) or append to the prerender pipeline (mechanism b). Run `npm run build` and confirm `dist/sitemap.xml` exists and lists all routes.

- [ ] **Step 6: Commit**

```bash
git add scripts/generate-sitemap.js scripts/generate-sitemap.test.js package.json public/sitemap.xml
git commit -m "feat: generate sitemap.xml at build from centralized route data

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 16: robots.txt

**Files:**
- Modify: `public/robots.txt`

- [ ] **Step 1: Replace contents**

```
User-agent: *
Allow: /

Sitemap: https://glovermastpurl.com/sitemap.xml
```

- [ ] **Step 2: Build + confirm** `dist/robots.txt` is present and references the sitemap. Commit:

```bash
git add public/robots.txt
git commit -m "chore: allow indexing and reference sitemap in robots.txt

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 17: Per-page structured data (JSON-LD)

**Files:**
- Modify: `src/pages/AttorneyDetail.jsx`, `src/pages/PerspectiveDetail.jsx`, `src/pages/Practice.jsx`, `src/pages/Contact.jsx`, and the three detail pages (breadcrumbs)

**Interfaces:** passes a `jsonLd` object to `<Seo>`.

- [ ] **Step 1: Attorney detail** — pass `jsonLd={{ '@context':'https://schema.org', '@type':'Person', name: attorney.name, jobTitle: attorney.title, worksFor: { '@type':'LegalService', name:'Glover, Mast & Purl LLP' }, url: canonicalUrl }}`.

- [ ] **Step 2: Perspective detail** — `@type: 'Article'` with `headline`, `datePublished` (if available in data; else omit), `author`/`publisher` as the firm.

- [ ] **Step 3: Practice** — `@type: 'Service'` (or an `ItemList` of the practice areas).

- [ ] **Step 4: Contact** — `@type: 'ContactPage'` plus a `ContactPoint` with the firm's email/phone from `index.html`'s existing LegalService block.

- [ ] **Step 5: Breadcrumbs** on the three detail pages — `BreadcrumbList` (Home → index → item). May be a second JSON-LD block; render an additional `<script type="application/ld+json">` via Helmet or a small inline component.

- [ ] **Step 6: Validate** each JSON-LD blob parses (build, then `node -e` parse the extracted script, or paste into a schema validator). Build + commit:

```bash
git add src/pages
git commit -m "feat: add per-page JSON-LD structured data

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 18: Open Graph image

**Files:**
- Create: `public/og-default.png`
- Modify: attorney/result/perspective detail pages (pass `image` to `<Seo>`)

- [ ] **Step 1: Add a branded default OG image** `public/og-default.png` (1200×630, cool-toned, firm wordmark on a dark navy field consistent with `design-dna.json`). If asset creation is out of band, use a placeholder generated from the existing hero imagery at 1200×630 and note it for design review.

- [ ] **Step 2: Per-page hero overrides.** On detail pages that have a `heroImage`, pass `image={item.heroImage.src}` to `<Seo>` (absolute-ized inside `Seo`). Public `/images/*` heroes are already absolute-able via `HOST`.

- [ ] **Step 3: Build + verify** `og:image` is present and absolute on a detail page:

```bash
grep -o 'og:image[^>]*content="[^"]*"' dist/attorneys/harriet-weft/index.html
```

- [ ] **Step 4: Commit**

```bash
git add public/og-default.png src/pages
git commit -m "feat: add Open Graph images (default + per-page hero overrides)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 19: Content / keyword + internal-linking pass

**Files:**
- Modify: page components as needed (copy + links only)

- [ ] **Step 1: Headings** — confirm each page's H1 states the page topic in target vocabulary (per Task 14 titles); adjust section H2s to be descriptive, not decorative.

- [ ] **Step 2: Internal links** — ensure: Practice area names link to `/practice`; attorney mentions link to their detail; Results/Perspectives index items link to detail; Home links into Practice, Attorneys, Results; Evaluate → Contact (already present). Add missing cross-links using existing `<Link>` patterns. No new pages.

- [ ] **Step 3: Verify** with a link crawl of the preview build (e.g. click-through, or a quick script) that there are no broken internal links.

- [ ] **Step 4: Commit**

```bash
git add src
git commit -m "content: keyword-tuned headings and internal linking pass

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 20: Full verification + deploy

**Files:** none (verification)

- [ ] **Step 1: Run the whole test suite + lint + build**

```bash
npm test
npm run lint          # expect no NEW errors beyond the known pre-existing ones
npm run build
```

Expected: tests pass; build emits per-route HTML, `sitemap.xml`, `robots.txt`.

- [ ] **Step 2: Verify SSG meta on multiple routes**

```bash
for r in contact attorneys practice results/... perspectives/...; do
  echo "== $r =="; grep -o '<title>[^<]*</title>' "dist/$r/index.html"
  grep -o 'meta name="description" content="[^"]*"' "dist/$r/index.html"
done
```

Expected: unique title + description per route.

- [ ] **Step 3: Verify forms locally against real Resend** (domain verified): submit Contact and Careers; confirm the firm inbox receives both emails; confirm honeypot submissions send nothing; confirm the client bundle has no `RESEND_API_KEY` (`grep -r RESEND dist || echo clean`).

- [ ] **Step 4: Preview + no-JS check** — `npm run preview`; load a route with JS disabled and confirm content is visible (SSR-safe fade-in).

- [ ] **Step 5: Deploy (with user approval).** Confirm `RESEND_API_KEY` + `INQUIRY_TO_EMAIL` exist in Vercel prod/preview. Then push to `main` (auto-deploys) or `vercel --prod`. After deploy, verify live: submit a contact inquiry, `curl -s https://glovermastpurl.com/sitemap.xml`, and check a route's live `<title>` via `curl`.

- [ ] **Step 6: Final commit / tag** if needed.

---

## Self-Review

**Spec coverage:**
- A1 Resend → Task 2, 3. A2 endpoint → Task 3. A3 client (hook/Contact/Careers) → Tasks 5, 6, 7. A4 dev middleware → Task 4. A form styles → Task 8.
- B1 SSG → Tasks 10, 11. B2 centralize data → Task 9. B3 Seo + migrate → Tasks 13, 14. B4 sitemap/robots → Tasks 15, 16. B5 JSON-LD → Task 17. B6 OG images → Task 18. B7 content/keyword → Tasks 14 (copy) + 19.
- Cross-cutting: `useFadeIn` SSR → Task 12; `vercel.json` fallback unchanged (noted, no task needed); build wiring → Tasks 11, 15. Verification → Task 20. All spec sections mapped.

**Placeholder scan:** per-page copy is specified verbatim in Task 14's table; detail-page descriptions use templated item fields (concrete, not TBD). The only deliberately deferred item is the exact `og-default.png` artwork (Task 18 Step 1) and the recipient address / canonical host confirmations (flagged as user confirmations, not code gaps).

**Type consistency:** `validateInquiry`/`buildEmail` signatures used consistently (Task 3). `useFormSubmit` returns `{ status, error, submit, reset }` — consumed identically in Tasks 6, 7. `buildSitemap(paths, host)` consistent (Task 15). `Seo` props consistent across Tasks 13, 14, 17, 18. Route data modules export default array + named `slugs` — consumed by Tasks 11, 15.
