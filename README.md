# Stakey's Cycles — Website

A modern recreation of the Stakey's Cycles marketing site
([stakeyscycles.square.site](https://stakeyscycles.square.site/)) as a fast, static
React single-page app.

Stakey's Cycles is a **call-out-only mobile bike and e-scooter repair service** based
in Salford, Greater Manchester.

## Pages

| Route            | Page                                                       |
| ---------------- | ---------------------------------------------------------- |
| `/`              | Home — hero, services, how it works, offers, reviews       |
| `/price-list`    | Full labour-only price list (bicycles + e-scooters)        |
| `/shop`          | Second-hand parts & bikes, with category filter            |
| `/gallery`       | Photo gallery with a lightbox                              |
| `/faqs`          | FAQs, riding-hazard guidance and a bike-buying guide       |
| `/location`      | Contact details, opening hours and service area            |
| `/join-the-team` | Recruitment page for independent mobile mechanics          |

## Tech stack

- **React 19** + **TypeScript**
- **Vite 7** for dev server and production build
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React Router 7** for client-side routing

## Getting started

```bash
npm install
npm run dev      # dev server on http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build
npm run typecheck
```

## Project structure

```
src/
  components/   Shared UI: Layout, Header, Footer, CallBar, Icons, ui primitives
  data/         Content: site details, price list, FAQs, products, gallery
  pages/        One component per route
  App.tsx       Route table
  main.tsx      Entry point (BrowserRouter)
public/images/  Logo, gallery, offer and product images
```

All business content lives in `src/data/` so copy, prices and links can be edited
without touching components.

## Deployment

The site is a static SPA. `npm run build` outputs to `dist/`. `vercel.json` includes
a catch-all rewrite to `index.html` so client-side routes resolve on refresh.

## Content sources

Copy, prices, FAQs and imagery were transcribed from the original Square site.
The logo is a green shield (`#00aa21`) on black, which drives the brand palette in
`src/index.css`.

> The legal/insurance details, opening hours and prices should be confirmed by the
> shop before publishing — they are reproduced here as-is from the public site.
