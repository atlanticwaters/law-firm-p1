# Design: Contact/Careers Forms + Full SEO Pass

**Date:** 2026-08-11
**Status:** Approved (pending spec review)
**Site:** Glover, Mast & Purl LLP — React 19 + Vite 8 SPA, React Router v7, deployed on Vercel (glovermastpurl.com / byproxy.co).

## Goal

Two workstreams:

1. **Forms** — make the existing Contact form actually deliver inquiries, and add a Careers application form. Delivery via a first-party Vercel Function backed by a provisioned email service (not a hardcoded SDK).
2. **SEO** — full technical + content pass. The site is a client-rendered SPA, so crawlers and non-JS social scrapers currently receive the same generic HTML for every route. Fix this by pre-rendering every route to static HTML (SSG) with correct per-page metadata, then layer on sitemap, robots, structured data, Open Graph images, and a per-page content/keyword pass.

Both features must preserve the site's established voice: formal, no emoji, no exclamation marks, cool-toned design per `design-dna.json`.

---

## Workstream A — Forms & Delivery

### A1. Email delivery: Resend (Vercel Marketplace)

- Provision **Resend** via `vercel integration add resend/resend-email` (top result of `vercel integration discover --category messaging`). Auto-injects `RESEND_API_KEY`.
- **User step (first implementation task):** verify a sending domain in Resend (glovermastpurl.com or byproxy.co) with the SPF/DKIM records Resend provides, so inquiry emails deliver reliably. Until a domain is verified, Resend's sandbox `onboarding@resend.dev` sender can be used for local testing only.
- Recipient inbox: the firm's inquiry address (default `inquiries@glovermastpurl.com`; confirm during implementation). Configurable via an env var `INQUIRY_TO_EMAIL` so it isn't hardcoded.
- **Never** `npm install resend` and hand-wire keys from memory; use the integration's injected env vars. (The Resend Node SDK may still be added as a dependency to *call* the API, but the credential comes from the provisioned integration.)

### A2. Serverless endpoint: `api/inquiry.js`

- Node/ESM Vercel Function, mirroring the structure and conventions of `api/chat.js` (method guard, env-var guard, `readJsonBody` helper, JSON error envelope `{ error }`).
- Accepts `POST { type, ...fields }` where `type` ∈ `"contact" | "careers"`.
- Per-type required-field schemas:
  - `contact`: `name`, `email`, `nature`, `message`.
  - `careers`: `name`, `email`, `position`, `message`; optional `portfolioUrl`.
- Validation: required fields present and non-empty; `email` shape check; length caps per field (e.g. name ≤ 200, message ≤ 5000) to bound payloads; reject unknown `type` with 400.
- **Spam protection:** a honeypot field (e.g. `company`) — if non-empty, respond `200 { ok: true }` without sending (silently drop). No CAPTCHA.
- On success: send an email via Resend to `INQUIRY_TO_EMAIL` with a formatted subject (`New <type> inquiry — <name>`) and a plain, readable body containing the submitted fields; `reply-to` set to the submitter's email. Return `200 { ok: true }`.
- On failure: return the upstream/validation status with `{ error }` (mirrors `api/chat.js` error handling).
- Returns JSON only (no streaming).

### A3. Client wiring

- **Shared hook `useFormSubmit(endpoint)`** (`src/hooks/useFormSubmit.js`): manages `status` (`idle | submitting | success | error`) and `error`, exposes `submit(payload)` that POSTs JSON and parses the `{ ok }` / `{ error }` response. Both forms reuse it; each keeps its own fields/markup.
- **`Contact.jsx`:** replace the fake `handleSubmit` with `useFormSubmit("/api/inquiry")`; POST `{ type: "contact", ...form, company: honeypot }`. Disable the submit button while `submitting`, render an error message on failure, keep the existing "Inquiry received" success block. Add the hidden honeypot input (visually hidden, `tabindex="-1"`, `autocomplete="off"`, `aria-hidden`).
- **Careers form (new component `src/components/CareersForm.jsx`):** rendered on the Careers page (currently content-only). Fields: Full Name, Email, Position of Interest, Portfolio/Résumé URL (optional), Message. Uses `useFormSubmit("/api/inquiry")` with `{ type: "careers", ... }`. Same honeypot + states.
- Reuse existing form CSS classes (`.contact-form`, `.form-group`, `.form-submit`, `.form-success`); add `.form-error` and a submitting/disabled treatment. Minimal new CSS in `src/index.css`.

### A4. Local dev

- Generalize the Vite dev middleware in `vite.config.js` so it serves **any** `api/*.js` file (map `/api/<name>` → `./api/<name>.js`), instead of only `/api/chat`. This keeps `npm run dev` working for `/api/inquiry` and future endpoints. The existing key-bridging logic stays.

---

## Workstream B — SEO Pass

### B1. Rendering: pre-render every route to static HTML (SSG)

- **Mechanism (recommended):** `vite-react-ssg`. Renders each route to static HTML in Node and hydrates on the client.
  - Requires refactoring `App.jsx` from `<BrowserRouter><Routes>` JSX into the routes-array config `vite-react-ssg` consumes, and switching the entry in `main.jsx` accordingly.
  - **First SEO task is a compatibility spike:** verify `vite-react-ssg` supports Vite 8 + React 19. If it does not, fall back to mechanism (b).
- **Fallback mechanism (b):** build-time headless render — a small script runs `vite preview` and uses Puppeteer to fetch each route, writing the rendered HTML to `dist/<route>/index.html`. Version-agnostic, no routing refactor, heavier build. Chosen only if (a) is incompatible.
- Either mechanism produces the same artifact: one static HTML file per route with the correct `<head>`.
- **Dynamic routes** (`attorneys/:slug`, `results/:slug`, `perspectives/:slug`) are enumerated for pre-rendering from centralized slug/data lists.

### B2. Centralize route data

- Extract the attorney, result, and perspective slug/data lists (currently inline in `AttorneyDetail.jsx`, `ResultDetail.jsx`, `PerspectiveDetail.jsx` and their index pages) into shared modules under `src/data/` (e.g. `attorneys.js`, `results.js`, `perspectives.js`).
- One source of truth consumed by: the page components, the SSG route generator (`includedRoutes`), and the sitemap generator. This is a targeted refactor that directly serves the SSG + sitemap work — not speculative.

### B3. `<Seo>` component + per-page metadata

- New `src/components/Seo.jsx` wrapping a head manager (`react-helmet-async`, SSR-compatible). Props: `title`, `description`, `image`, `type`, `canonicalPath`. Emits `<title>`, `<meta name="description">`, canonical (absolute), and the OG/Twitter tag set, merging with sensible site-wide defaults.
- Replaces the title-only `useDocumentTitle` hook. Migrate all page components (~15) from `useDocumentTitle(...)` to `<Seo ... />`. `useDocumentTitle.js` is removed once unused.
- `index.html` keeps only site-wide defaults; per-route values come from `<Seo>` (rendered into static HTML by SSG).

### B4. sitemap.xml + robots.txt

- **`sitemap.xml`:** generated at build from the static route list + enumerated detail slugs (a Node build script run in `npm run build`, writing to the output dir / `public`). Absolute URLs on the canonical domain.
- **`robots.txt`:** update the current 72-byte file to allow indexing and reference the sitemap (`Sitemap: https://<canonical>/sitemap.xml`).
- **Canonical domain:** the site resolves on both glovermastpurl.com and byproxy.co. Pick **one** canonical host for canonical tags, OG URLs, and the sitemap (default: `glovermastpurl.com`, matching the existing `index.html` canonical), and 301 the other at the Vercel domain level. Confirm the canonical host during implementation.

### B5. Structured data (JSON-LD)

- Home: keep existing `LegalService`.
- Attorney detail: `Person` / `Attorney`.
- Perspective detail: `Article`.
- Practice: `Service`.
- Contact: `ContactPage` + `ContactPoint`.
- Detail pages: `BreadcrumbList`.
- Emitted via `<Seo>` or small per-page JSON-LD blocks so they render into the static HTML.

### B6. Open Graph images

- Add a branded default `og:image` (a cool-toned graphic consistent with `design-dna.json`) referenced site-wide.
- Per-page overrides use the page's existing hero photo where one exists (absolute URL).
- Upgrade `twitter:card` from `summary` to `summary_large_image`.
- Dynamic per-page OG cards (`@vercel/og`) are **out of scope** (optional future enhancement).

### B7. Content / keyword pass

Goal per approval: technical polish **and** ranking. Target vocabulary = **the firm's own thematic terms** (default chosen at approval), e.g. "entity representation," "attributed speech doctrine," "puppet defense," "handler misconduct," and the practice-area names, plus place-based terms (litigation counsel in New York, London, Geneva).

- Rewrite each page's `title` and `meta description` with target phrasing, kept natural and in-voice.
- Review H1/H2 hierarchy per page (one H1; descriptive H2s).
- Internal-linking review: ensure practice areas, attorneys, results, and perspectives cross-link sensibly (the Evaluate→Contact link is the existing pattern).
- No new marketing pages; this is a copy/structure pass over existing content.

---

## Cross-cutting concerns

- **`useFadeIn` and SSR:** the scroll-fade hook uses `IntersectionObserver`. Under SSG it must be client-only safe — guard any `window`/`IntersectionObserver` access so server rendering doesn't crash and initial static HTML is visible (not stuck at opacity 0) before hydration. Verify fade-in still triggers post-hydration.
- **`vercel.json`:** keep the `/((?!api/).*) → /index.html` SPA fallback. With per-route static HTML, Vercel serves the real file first; the fallback only catches unknown routes (→ client-rendered NotFound). `/api/*` stays excluded.
- **Build:** `npm run build` must run SSG + sitemap generation. Verify the production build and a local preview before deploying.

## Out of scope (YAGNI — optional future adds)

- Submission database / admin dashboard for inquiries.
- Résumé **file** upload (use a URL field instead).
- CAPTCHA / Turnstile (honeypot + validation is proportionate).
- Dynamic OG image generation (`@vercel/og`).

## Risks

- `vite-react-ssg` × Vite 8 / React 19 compatibility — mitigated by the compatibility spike and fallback (b).
- SSR-safety of `useFadeIn` and any other browser-only code — mitigated by client-only guards and post-hydration verification.
- Resend domain verification depends on DNS access for the canonical domain — a user step; blocks reliable delivery but not the code.

## Files touched (summary)

- **New:** `api/inquiry.js`, `src/hooks/useFormSubmit.js`, `src/components/CareersForm.jsx`, `src/components/Seo.jsx`, `src/data/{attorneys,results,perspectives}.js`, sitemap build script, default OG image asset, spec + plan docs.
- **Modified:** `Contact.jsx`, `Careers.jsx`, all page components (Seo migration), `App.jsx`, `main.jsx`, `vite.config.js`, `robots.txt`, `index.html`, `src/index.css`, `package.json`.
- **Removed:** `src/hooks/useDocumentTitle.js` (after migration).

## Success criteria

- Submitting the Contact form and the Careers form delivers a correctly formatted email to the firm inbox; honeypot submissions are dropped; validation errors surface to the user; the client bundle contains no delivery credentials.
- `curl` of a pre-rendered route (e.g. `/attorneys/harriet-weft`) returns HTML containing that page's unique title/description/OG tags — not the generic shell.
- `sitemap.xml` lists every route; `robots.txt` references it; each page type carries valid JSON-LD; social link previews render per-page cards.
- Production build + preview succeed; deploy verified on the canonical domain.
