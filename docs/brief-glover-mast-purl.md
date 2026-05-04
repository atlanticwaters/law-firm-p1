# Site Brief: Glover, Mast & Purl LLP
## Website Build Document — Claude Code Handoff

> **Project context:** This is one of two opposing law firm websites built as a narrative universe. The opposing firm is Cordwell, Holloway & Feltner, LLP — a human plaintiffs' firm fighting against puppets. Glover, Mast & Purl represents puppets. This is never stated explicitly on the site. Both sites are completely sincere. No fourth wall breaks. No winking. This document covers Glover, Mast & Purl only.

---

## Brand Identity

**Full Name:** Glover, Mast & Purl LLP
**Tagline:** "Our Clients Speak For Themselves."
**Secondary tagline:** "Representation Without Reservation."
**Phone:** 1-888-GMP-LLAW
**Web:** glovermastpurl.com
**Email:** inquiries@glovermastpurl.com
**Founded:** 1994
**Offices:** New York · London · Geneva

**Hidden name etymology (internal reference only — do not surface on site):**
- Glover → glove (hand puppet)
- Mast → mast / control bar (marionette control rod)
- Purl → purl stitch (knitting/yarn, puppet construction)

**Positioning:** White-shoe Manhattan law firm. Sullivan & Cromwell meets something deeply, quietly wrong. Established 1994. Never lost a case they were willing to discuss. Their clients are puppets. This is never explicitly stated anywhere on the site. The unsettling quality comes entirely from reading the copy carefully.

---

## Page Metadata — Critical

These are visible in browser tabs, Google results, and link previews. They are the most explicit hint at the firm's nature and must be implemented exactly.

```html
<title>Glover, Mast &amp; Purl LLP — Counsel for Those Who Cannot Speak for Themselves</title>

<meta name="description" content="Glover, Mast &amp; Purl LLP — premier litigation counsel for entities who cannot independently retain or instruct legal representation. New York · London · Geneva.">
```

Nothing on the page needs to be this explicit. The metadata does the work quietly.

---

## Design Direction

**Aesthetic:** Contemporary premium law firm. Restraint as authority. The kind of firm whose website loads in under a second and makes you feel slightly underdressed. Think Sullivan & Cromwell, Cravath, Wachtell — not a single unnecessary pixel.

**Color Palette:**
- Background: `#FAFAF8` (warm near-white)
- Primary text: `#1A1A1A`
- Secondary text: `#6B6B6B`
- Accent: `#8B7340` (warm antique gold — restrained, not flashy)
- Rule/border: `#E0DDD8`
- Deep surface: `#1C1C1E` (hero + footer — charcoal)
- Hero text: `#F5F2EC` (warm white)
- Highlight: `#2A3D52` (deep slate blue — sparingly)

**Typography:**
- Display / headlines: `Cormorant Garamond`, 300–400 weight, generous tracking — via Google Fonts
- Body: `Georgia`, serif (system font, no load cost)
- UI / labels / nav: `Helvetica Neue`, Arial, sans-serif — uppercase, tracked at `0.15em`

**Layout:**
- Full-bleed sections
- Max content width: `max-w-screen-lg` (1024px) — slightly narrower than Cordwell, more refined
- Fixed nav: transparent on load → solid charcoal on scroll (`IntersectionObserver` on hero sentinel)
- Hero: full-viewport charcoal background, centered serif display headline, thin gold rule underline
- Generous vertical rhythm — sections breathe
- No sidebars
- Thin `#8B7340` horizontal rules between sections

**Signature Elements:**
- Fixed nav with smooth transparency transition
- Hero: single centered headline, tagline, thin gold underline, no CTA button — just a quiet downward scroll indicator
- Attorney section: portrait SVG placeholders with Easter Egg 1 (see below)
- Practice areas: clean numbered list, minimal, accordion or full sections
- Perspectives: editorial card grid with article titles and author bylines
- Footer: charcoal, three-column, type only
- Scroll fade-in on sections (CSS only, no JS animation library)

**What is NOT present — hard rules:**
- No puppets depicted anywhere on the site
- No hand imagery, no strings, no felt texture, no yarn
- No whimsical elements of any kind
- No stock photography of humans
- No chatbot, no live chat widget
- No awards, badges, or social proof widgets (too gauche)
- No cookie banners
- No exit-intent popups
- No phone number on the contact page (inquiry form only — "by appointment")

---

## Visual Easter Eggs — Puppet Inference

Three structural details that, read together, reveal what the attorneys are. None is labeled. None is explained. All are deniable as design choices. Implement all three exactly as specified.

---

### Easter Egg 1: Attorney Portrait — The String

Each attorney card has a circular portrait placeholder (SVG component). It contains:
- A dark charcoal circle with the attorney's gold monogram initials centered
- An extremely faint vertical line extending **upward** from the top of the circle, approximately 40px, terminating in a small horizontal crossbar (~12px wide)
- Opacity: `0.07` — nearly invisible at a glance, visible on inspection

```svg
<svg width="160" height="220" viewBox="0 0 160 220">
  <!-- The string — faint -->
  <line x1="80" y1="0" x2="80" y2="36" stroke="#8B7340" stroke-width="1" opacity="0.07"/>
  <!-- The control bar crosspiece -->
  <line x1="68" y1="2" x2="92" y2="2" stroke="#8B7340" stroke-width="1" opacity="0.07"/>
  <!-- Portrait circle -->
  <circle cx="80" cy="116" r="64" fill="#1C1C1E"/>
  <!-- Monogram — render via text element or component prop -->
  <text x="80" y="122" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif"
        font-size="28" font-weight="300" fill="#8B7340" letter-spacing="0.05em">RG</text>
</svg>
```

At normal viewing distance: reads as a decorative portrait mounting detail or a hanging frame.
On close inspection: it is a marionette string with a control bar crosspiece.
No tooltip. No label. No acknowledgment anywhere.

---

### Easter Egg 2: Attorney Portrait — The Sway

On hover, each attorney portrait SVG plays a **pendulum sway animation**:

```css
@keyframes sway {
  0%, 100% { transform: rotate(-1deg); }
  50%       { transform: rotate(1deg); }
}

.attorney-portrait:hover {
  animation: sway 2.4s ease-in-out infinite;
  transform-origin: top center;
}
```

- Rotation: ±1 degree
- Duration: 2.4s
- Easing: ease-in-out
- `transform-origin: top center` — the pivot is the top of the element, where the string attaches

**Reads as:** Subtle hover delight. The portrait "activates."
**Is:** A puppet hanging from its string, swaying.
The first person to hover over an attorney card and notice the sway will immediately understand everything.

---

### Easter Egg 3: Page Metadata

See the metadata block at the top of this brief. These lines do all the work:

- **Title:** "Counsel for Those Who Cannot Speak for Themselves"
- **Description:** "entities who cannot independently retain or instruct legal representation"

Invisible on the page. Fully visible in browser tabs, search results, iMessage/Slack link previews, and bookmarks. The person who Googles the firm and reads the snippet will understand immediately.

---

## Site Architecture

```
glovermastpurl.com/
├── /                   — Home
├── /practice           — Practice areas (6 areas)
├── /attorneys          — Attorney profiles (3 partners + 3 associates)
├── /results            — Selected matter representations
├── /perspectives       — Thought leadership articles
├── /contact            — Written inquiry form only
└── /privacy            — Privacy policy
```

**Nav items (minimal):** Practice Areas · Attorneys · Results · Perspectives · Contact

---

## Home Page Sections

1. **Hero** — Full-viewport charcoal. Centered. Headline: *"Representation Without Reservation."* Subhead: *"For thirty years, Glover, Mast & Purl has represented those the legal system overlooked."* Thin gold rule below. No CTA button — just subtle downward arrow.

2. **Firm philosophy** — Two-column, warm white bg. Left: large display numeral "1994" in Cormorant. Right: 2-paragraph statement of purpose (see copy below).

3. **Practice overview** — 6 numbered practice areas in a clean grid. Title + one-line description only. Gold number prefix.

4. **Featured result** — Single matter callout, charcoal bg, white serif text. No dollar amount — "Settlement: confidential." The discretion is the point.

5. **Perspectives preview** — 3 article cards, editorial layout, author + publication byline.

6. **Contact prompt** — Centered, minimal. "To discuss a matter, submit a written inquiry." Link to contact page. No phone number.

**Firm Philosophy Copy (for Section 2):**
> For thirty years, this firm has represented a client population that the legal system was not built to serve. Our clients often cannot initiate contact directly. They cannot always instruct us in the conventional sense. They depend entirely on our judgment, our ethics, and our commitment to their interests.
>
> We do not find this burden unusual. We find it clarifying.

---

## Attorney Bios

### Reginald H. Glover, Esq. — Founding Partner
**Specialty:** Hand Puppet Defense, Glove Entity Civil Rights, Class Action Defense
**Initials:** RG
**Admitted:** New York Bar, 1987
**Portrait:** SVG with Easter Egg 1 — "RG" monogram

Mr. Glover founded the firm in 1994 following a decade at Sullivan & Cromwell, where he developed a reputation for winning cases that other counsel had deemed unwinnable. His decision to establish an independent practice grew from his conviction that a significant class of clients was being systematically underrepresented by the legal profession — clients who, through no fault of their own, lacked the standing, resources, or physical capacity to advocate effectively for themselves.

Mr. Glover has argued before the Second Circuit and has been retained as expert witness in proceedings before three federal district courts. He does not grant interviews. He is, by all accounts, exceptionally persuasive in deposition.

*"The law is not merely for those who can speak loudly. It is for those who cannot speak at all without our help."*

---

### Victoria C. Mast, J.D. — Partner
**Specialty:** Marionette Rights, String Entity Litigation, Attributed Speech Liability
**Initials:** VM
**Admitted:** New York Bar, 1991; D.C. Bar, 1993

Ms. Mast pioneered the doctrine of Attributed Speech Liability, which holds that no entity can be held legally responsible for words spoken through it without meaningful consent. This doctrine, first articulated in *In Re: The Castellan Matter (1998)*, has since been cited in eleven federal opinions and is considered foundational to the emerging field of puppet entity law.

Ms. Mast graduated first in her class from Yale Law School and clerked for a Second Circuit judge whose name she prefers not to disclose. She does not consider herself an activist. She considers herself thorough.

*"Consent is not a complicated concept. If your client could not say no, they did not say yes."*

---

### Winston A. Purl, LLM — Partner
**Specialty:** Felt Entity Rights, International Puppet Law, Intellectual Property, Personhood
**Initials:** WP
**Admitted:** New York Bar, 1999; Solicitor, England & Wales, 2001

Mr. Purl holds an LLM in International Entity Rights from Cambridge and is the author of *Beyond the Hand: Legal Personhood in the Age of Puppet Proliferation*, a monograph widely cited in academic and judicial proceedings across the English-speaking world. His international practice encompasses cross-border claims, treaty-based entity protections, and the emerging field of AI-adjacent puppet personhood.

Mr. Purl joined the firm in 2001 following a period at a London chambers he describes only as "distinguished." He has a quiet intensity that clients find reassuring and opposing counsel finds unsettling.

*"The question of who is a person has never been simple. We have always gotten it wrong, and then gotten it right. We are getting it right again."*

---

### Serena Nap, Esq. — Associate
**Specialty:** Employment Discrimination, Wrongful Termination
**Initials:** SN
*(Internal note: "nap" = the raised surface of felt)*

Ms. Nap focuses on employment law matters for clients who have been terminated from productions, dismissed from positions, or denied opportunities on the basis of their entity status. She has filed 14 EEOC complaints on behalf of clients in the past three years, resulting in 11 settlements and 2 active federal cases.

---

### Theodore Scrim, J.D. — Associate
**Specialty:** Intellectual Property, Licensing, Likeness Rights
**Initials:** TS
*(Internal note: "scrim" = theatrical translucent fabric)*

Mr. Scrim advises clients on the protection and monetization of intellectual property, including likeness rights, character IP, and unauthorized reproduction claims. He previously worked at a top-five IP firm before joining Glover, Mast & Purl, where he found the work more meaningful.

---

### Harriet Weft, Esq. — Associate
**Specialty:** Entity Personhood, Civil Rights, Amicus Practice
**Initials:** HW
*(Internal note: "weft" = horizontal threads in weaving)*

Ms. Weft coordinates the firm's amicus brief program and works on entity personhood litigation. She is currently involved in three state-level proceedings seeking limited legal recognition for clients as protected entities.

---

## Practice Area Copy

### 1. Puppet Defense Litigation
When human plaintiffs file claims against our clients, they count on the legal system's historical failure to take these defendants seriously. We do not allow that advantage. Our litigators have successfully defended clients against claims of fraud, assault, defamation, and negligence — and we have an institutional understanding of how these cases are constructed that no generalist firm can match.

We have noticed that opposing counsel in these matters often assumes the case is simple. It is not simple. We make sure they understand this early.

---

### 2. Handler Misconduct & Abuse
The relationship between our clients and those who work most closely with them is, by its nature, one of profound power imbalance. Those in positions of control have been known to exploit this relationship — using our clients' voices without consent, forcing performances or statements our clients did not agree to, and failing to advocate for their safety and dignity.

We represent clients who have been harmed by those who were supposed to protect them. This is, in many ways, the most important work we do.

---

### 3. Attributed Speech Defamation
Victoria Mast's doctrine of Attributed Speech Liability has transformed how courts evaluate defamation claims against our clients. If you placed words in someone's mouth without their consent and those words caused damage, the law is not automatically on your side. It is increasingly on ours.

We also represent clients who have been defamed by human parties — including, in several notable cases, by law firms representing human plaintiffs.

---

### 4. Wrongful Termination & Employment Discrimination
Our clients are systematically underemployed relative to their capabilities, routinely terminated without cause, and subject to forms of discrimination that other entities would never tolerate. We file employment claims, pursue EEOC remedies, and litigate wrongful termination cases across the entertainment, education, and commercial sectors.

We have never lost a wrongful termination case we chose to take.

---

### 5. Intellectual Property & Likeness Rights
Our clients' likenesses, characters, and creative output are intellectual property — and they are routinely stolen, reproduced without authorization, and commercially exploited without compensation. We pursue IP claims with the same rigor we bring to all matters.

We have obtained injunctions, negotiated licensing agreements, and litigated infringement cases in federal court. Our clients' work has value. We protect it.

---

### 6. Entity Rights & Personhood
The most important legal question of the coming decades is ontological: who counts as a legal entity, and why? Our attorneys have been working on this question since the firm's founding. Winston Purl's monograph is cited in twelve judicial opinions. Harriet Weft coordinates our amicus practice across three state proceedings.

We are not impatient. These questions get resolved on legal time, not human time. We will be here.

---

## Selected Matter Representations

*Client names are withheld per confidentiality agreement.*

| Matter | Type | Outcome |
|--------|------|---------|
| Defense of a foam entity against fraud claims stemming from a six-year HOA board tenure. Plaintiff claimed client operated without legal authority. | Puppet Defense | All claims dismissed. Plaintiff sanctioned for filing frivolous matter. |
| Wrongful termination claim on behalf of a hand puppet terminated from a children's television production after 11 years. Producer claimed "creative direction change." | Wrongful Termination | Settlement: confidential. Client returned to production. |
| Attributed speech defamation claim. Handler publicly blamed client for statements client did not consent to make. | Defamation Defense | Judgment for client. Handler ordered to issue public retraction. |
| Cross-border likeness rights claim. Client's character reproduced in six countries without authorization or compensation. | Intellectual Property | Injunction granted across all six jurisdictions. Licensing agreement executed. |
| Entity personhood amicus brief in state appellate proceeding. Question: whether client constitutes a "person" for purposes of standing in civil proceedings. | Personhood | Proceeding ongoing. Firm's brief cited by two circuit judges. |
| Defense of marionette client against personal injury claims arising from a 2019 incident at a private event. Plaintiff claimed client acted intentionally. | Puppet Defense — PI | Verdict for client. Court found strings, not agency. |

*Results depend on individual facts and circumstances. Prior results do not guarantee future outcomes.*

---

## Perspectives (Thought Leadership)

Article cards — display title, author, publication, and a one-line description. No full article text needed for build.

1. **"Attributed Speech and the Limits of Agency: A Primer"** — Victoria C. Mast, J.D. · *Puppet Entity Law Review, Vol. 12* — The foundational piece on the doctrine that changed how courts evaluate puppet defamation claims.

2. **"Who May Sue? Entity Standing in the Post-Personhood Era"** — Winston A. Purl, LLM · *Harvard Law Review (forthcoming)* — An examination of how the concept of legal standing must evolve to account for non-human entities.

3. **"The Handler Problem: Rethinking Vicarious Liability in Felt-Entity Relationships"** — Reginald H. Glover, Esq. · *Internal publication* — Mr. Glover's definitive treatment of when handlers are — and are not — responsible for their clients' conduct.

4. **"Employment Discrimination Against Non-Human Entities: A Growing Crisis"** — Serena Nap, Esq. · *National Employment Law Project* — A data-driven look at termination rates, EEOC filings, and systemic bias in the entertainment sector.

5. **"Why Courts Get Puppet IP Wrong — And How to Fix It"** — Theodore Scrim, J.D. · *IP Quarterly* — The case for stronger protections and how to pursue them under existing law.

---

## FAQ

**Q: What types of clients does Glover, Mast & Purl represent?**
A: We represent a specific and underserved client population that has, historically, been denied meaningful access to legal counsel. We do not discuss the specifics of our client base beyond what is necessary.

**Q: Are your attorneys available to meet in person?**
A: Initial consultations are conducted in writing. We find this produces better outcomes for all parties. In-person meetings are arranged on a matter-by-matter basis, by appointment, at a location of the firm's choosing.

**Q: Are your attorneys human?**
A: Our attorneys are members in good standing of the New York Bar, the D.C. Bar, and the England & Wales roll of solicitors. We consider that question answered.

**Q: Do you work with opposing counsel who represents human plaintiffs?**
A: We do. We find the experience clarifying for all involved.

**Q: How do I submit an inquiry on behalf of a client?**
A: Complete the inquiry form. A member of the firm will respond within three business days. Please submit the inquiry in writing on behalf of your client. We understand that clients may not be able to submit inquiries independently.

---

## Contact Page Copy

**Headline:** "Submit an Inquiry"
**No subhead. No phone number. No warmth.**

Glover, Mast & Purl does not accept walk-in consultations. All matters begin with a written inquiry.

To submit an inquiry, complete the form below. Please describe the matter in general terms, the nature of your client's situation, and the relief sought. A member of the firm will respond within three business days.

We request that you not submit sensitive client information via this form. A secure channel will be provided upon initial response.

**Please note:** We represent puppet entities exclusively. We do not represent human plaintiffs, handlers acting in their individual capacity, puppet manufacturers, felt distributors, or any party whose interests are adverse to those of a puppet client. If you are unsure whether your matter is appropriate for our firm, submit an inquiry and we will advise.

*Offices: New York · London · Geneva*
*All meetings by appointment.*

**Form fields:**
- Name (single field — full name)
- Email
- Nature of matter (short text — not a dropdown; let them describe it)
- Textarea: "Describe the matter briefly"
- Submit: "Submit Inquiry" — no arrow, no enthusiasm

---

## Testimonials

*The following testimonials were submitted on behalf of clients by authorized representatives. The firm's clients cannot submit testimonials independently.*

**On behalf of a foam entity — HOA Fraud Defense**
"The firm understood our situation immediately and without the skepticism we had encountered elsewhere. Every claim against our client was dismissed. We would not work with any other firm."
*— Submitted by authorized representative*

**On behalf of a marionette — Wrongful Termination**
"After eleven years, they said it was a 'creative direction change.' We knew what it was. Glover, Mast & Purl knew what it was. Our client is back at work. The settlement is confidential. We are satisfied."
*— Submitted by authorized representative*

**On behalf of a ventriloquist dummy — Defamation**
"He said everything that happened was the puppet's fault. For the first time, someone in the legal system asked: but did the puppet consent to say it? The answer was no. The court agreed."
*— Submitted by authorized representative*

---

## Image Brief

| Placement | Description | Style Notes |
|-----------|-------------|-------------|
| Hero background | Abstract architectural photography — courthouse columns, marble, long empty corridor | Cold, formal, slightly oppressive. No people. No puppets. B&W or heavily desaturated. |
| Attorney portraits (×6) | SVG component per Easter Egg 1 spec | Initials: RG, VM, WP, SN, TS, HW · Hover triggers Easter Egg 2 sway |
| Practice area section | Abstract macro texture — woven linen, draped cloth, close-up thread | Warm, analog, NOT cute. The fabric reference is intentional but reads as editorial. |
| Perspectives section | Stack of law books, legal documents, fountain pen | Classic editorial legal imagery, warm-toned |
| Footer | None — charcoal bg, type only | N/A |
| **No puppets anywhere** | Nothing on this site depicts a puppet. The Easter eggs are structural, not photographic. | Hard rule. No exceptions. |

---

## Technical Specs

- **Stack:** Next.js (App Router) + Tailwind CSS
- **Export:** Static (`next export`) — zero server-side rendering, fastest possible load
- **Max content width:** `max-w-screen-lg` (1024px) — narrower than Cordwell, more refined
- **Nav:** Fixed; transparent on load → solid `#1C1C1E` charcoal on scroll via `IntersectionObserver` on hero sentinel element
- **Fonts:** `Cormorant Garamond` (Google Fonts via `next/font`) for display; `Georgia` system font for body; `Helvetica Neue` / `Arial` for UI
- **Animations:**
  - Scroll fade-in: CSS only, `IntersectionObserver` adds `.visible` class, no JS animation library
  - Attorney sway: CSS keyframes per Easter Egg 2 spec
  - No other animations
- **Attorney portraits:** Custom `AttorneyPortrait` SVG component — accepts `initials` prop, renders Easter Egg 1 string detail, applies Easter Egg 2 hover class
- **Form:** React Hook Form + Formspree — inquiry only, no phone number field or CTA urgency
- **Page metadata:** Implement Easter Egg 3 exactly — `<title>` and `<meta name="description">` per spec above
- **Performance:** Zero unnecessary JS. Static export. Should feel noticeably faster to load than the opposing firm's site. This contrast is intentional.
- **Accessibility:** Full semantic HTML, ARIA labels, sufficient contrast ratios throughout — the firm has impeccable standards
- **Deployment:** Vercel static export

---

## Shared Universe Notes (for narrative consistency)

- Glover, Mast & Purl never acknowledges Cordwell, Holloway & Feltner by name — they are referenced only as "opposing counsel" or "plaintiffs' firms" in general terms
- Both sites treat their subject matter with complete deadpan sincerity. No winking.
- *Daniels v. The Puppet (2001)* may be referenced obliquely as a case that "clarified handler liability in ways not favorable to our clients at the time"
- The HOA foam entity case appears in Glover's results as fully dismissed — "All claims dismissed. Plaintiff sanctioned." (Cordwell claims $88,000 for the victims — both framings are technically accurate)
- The final verdict in the marionette PI case was "Court found strings, not agency" — this is intentionally ambiguous and used on both sites
- No cross-links to cordwellhollowaylaw.com anywhere on this site
- glovermastpurl.com should load measurably faster than cordwellhollowaylaw.com (static export vs. full Next.js). This is intentional.
