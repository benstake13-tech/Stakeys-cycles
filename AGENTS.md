# AGENTS.md

Guidance for agents working in this repository.

## What this is

A static marketing website for **Stakey's Cycles** (mobile bike/e-scooter repair,
Salford). React 19 + Vite 7 + TypeScript + Tailwind CSS v4 + React Router 7.

## Commands

- `npm install` — install dependencies
- `npm run dev` — dev server (Vite; set `--port` and `--host` when needed)
- `npm run build` — `tsc -b` then `vite build` into `dist/`
- `npm run preview` — serve the production build
- `npm run typecheck` — `tsc --noEmit`

There is no test suite. Verify changes with `npm run typecheck`, `npm run build`, and
by loading the affected route in a browser.

## Conventions

- **All content lives in `src/data/`.** Edit copy, prices, FAQs, products and links
  there, not inline in components.
- `src/components/ui.tsx` holds the shared primitives (`Container`, `Button`,
  `SectionHeading`, `Card`, `PageHero`). Reuse them for consistency.
- Icons are hand-written SVGs in `src/components/Icons.tsx` (no icon dependency).
- Tailwind v4 is configured entirely in `src/index.css` via `@theme` — there is no
  `tailwind.config.js`. Brand colours are `brand-50…900` (green, keyed to the logo
  `#00aa21`) and `ink-700…950` (near-black).
- Keep the design dark, high-contrast and mobile-first. The header and footer are
  shared via `Layout`; a sticky call-to-action bar shows on small screens.

## Deployment

Static SPA. `vercel.json` rewrites all paths to `index.html`. On other hosts, add an
equivalent SPA fallback so deep links do not 404.
