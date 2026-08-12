# Law Firm P1

## Stack
- React 19 + Vite (JavaScript, not TypeScript)
- React Router v7 for routing
- Anthropic Claude API for AI features (via `@anthropic-ai/sdk`)
- CSS custom properties for theming (no CSS framework)

## Design Direction
- **`design-dna.json`** — Complete design specification with color palette, typography, spacing, layout, motion, and visual effects. Read this before making any visual changes.
- Modeled after paulweiss.com — editorial, image-forward, cool-toned (navy/gray/white, no gold or warm accents)
- B&W photography with dark overlays, asymmetric grids, content-driven layout
- Playfair Display for headings, Inter for body text
- All design tokens defined as CSS custom properties in `src/index.css :root`

## Project Structure
```
src/
  components/   # Layout, ChatWindow
  pages/        # Home, About, Practices, Chat
  hooks/        # useClaude (AI chat), useFadeIn (scroll animations)
  services/     # claude.js (calls the /api/chat proxy, with streaming)
  utils/        # Helper functions
  styles/       # Additional stylesheets
api/            # Vercel serverless functions (chat.js — server-side Claude proxy)
design-dna.json # Design specification — colors, typography, spacing, effects
```

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build

## Conventions
- Functional components with hooks only
- One component per file, default exports
- CSS classes use BEM-lite naming (e.g., `chat-message--user`)
- Client-exposed environment variables are prefixed with `VITE_` (bundled into the browser — never put secrets here)
- The Claude API key is server-side only: `ANTHROPIC_API_KEY` in `.env`, read exclusively by the `/api/chat` function. All Claude calls go through that proxy — never call the Anthropic API directly from the client.
- No gold or warm accent colors — palette is strictly cool-toned
- Photography should be grayscale with dark overlays
- All UI text is formal, no emoji, no exclamation marks
