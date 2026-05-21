# Open Door Fellowship — odf.church

*An immersive 3D web experience for [Open Door Fellowship](https://odf.church) — a recovery-focused church in Spring City, Tennessee. Anchor object: **The Upper Room** — rows of mismatched folding chairs leading to an unfussy stage with a wooden cross, an acoustic guitar, a stool with a coffee mug, and a worn Bible on a music stand.*

Built with the [Immersive 3D System](../immersive-3d-system.md) framework.

---

## Quick start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Scripts

```bash
npm run dev          # development server (http://localhost:3000)
npm run build        # production build (run before pushing to verify nothing's broken)
npm run start        # serve the production build locally
npm run lint         # ESLint
npm run type-check   # TypeScript --noEmit
```

---

## How the site is organized

```
odf-church/
├── README.md                       ← you are here
├── DEPLOYMENT.md                   ← step-by-step Vercel + DNS setup
├── MAINTENANCE.md                  ← recipes for every common edit
├── odf-church-brief.md             ← Phase 1 design brief (the source of truth)
│
├── app/
│   ├── layout.tsx                  ← root layout, fonts, metadata, JSON-LD, Cursor mount
│   ├── page.tsx                    ← home page (assembles all scroll-score sections)
│   ├── not-found.tsx               ← 404 page ("we saved you a seat")
│   ├── sitemap.ts                  ← sitemap.xml generator
│   └── globals.css                 ← tokens import, base type, section veil utilities
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx                 ← sticky top nav + service-time pill
│   │   ├── LenisProvider.tsx       ← smooth-scroll provider (mounted by layout)
│   │   └── Cursor.tsx              ← custom magnetic cursor (desktop only)
│   ├── sections/
│   │   ├── Hero.tsx                ← Scene 1 + 2 — Threshold + Aisle Reveal
│   │   ├── TwoThings.tsx           ← Scene 3 — Recovery + Welcoming, Pattern A Billboards
│   │   ├── Ministries.tsx          ← Scene 4 — three cards, magnetic hover
│   │   ├── ServiceInfo.tsx         ← Scene 5 — when/where + what to expect
│   │   ├── Leadership.tsx          ← Justin + Kahala beat
│   │   ├── AtTheCross.tsx          ← Scene 6 — the conversion peak
│   │   └── Connection.tsx          ← Scene 7 — footer, every off-ramp
│   ├── three/
│   │   ├── BackgroundCanvas.tsx    ← client wrapper, dynamic-imports the Canvas
│   │   ├── UpperRoomCanvas.tsx     ← R3F Canvas wrapper (DPR, tone mapping, shadows)
│   │   ├── UpperRoomScene.tsx      ← chair grid, room shell, 7-waypoint camera path
│   │   ├── UpperRoomFallback.tsx   ← SSR photo backdrop (renders without JS)
│   │   ├── FoldingChair.tsx        ← procedural chair (seat + back + 4 legs)
│   │   ├── Stage.tsx               ← platform + wooden cross + StageDetail
│   │   ├── StageDetail.tsx         ← guitar + stool with mug + music stand with Bible
│   │   ├── Lights.tsx              ← window shaft + overhead string lights + scroll-scrubbed cross uplight
│   │   └── DustMotes.tsx           ← ambient particles in the light shaft (desktop only)
│   └── ui/
│       ├── Button.tsx              ← primary/secondary/ghost variants × sm/md/lg
│       └── PillNav.tsx             ← service-time pill (scrolls to #service)
│
├── lib/
│   ├── content.ts                  ← every word + every URL (the "CMS")
│   ├── gsap.ts                     ← GSAP + ScrollTrigger registration helper
│   ├── lenis.ts                    ← Lenis smooth-scroll factory
│   └── utils.ts                    ← cn(), clamp, lerp, mapRange
│
├── hooks/
│   ├── useReducedMotion.ts         ← honors prefers-reduced-motion
│   ├── useResponsive.ts            ← breakpoint detection
│   ├── useScrollProgress.ts        ← global scroll 0–1
│   └── useScrollReveal.ts          ← GSAP ScrollTrigger fade-up helper
│
├── styles/
│   └── tokens.css                  ← CSS variables: colors, type, motion, z-index
│
├── public/
│   ├── images/photos/              ← real ODF photos (hero, gathering, worship, …)
│   ├── favicon.svg + .ico + icon-*.png + apple-touch-icon.png
│   ├── og-image.png                ← 1200×630 social share card
│   ├── manifest.webmanifest        ← PWA manifest (home-screen pinning)
│   └── robots.txt
│
├── types/index.ts
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── .env.example
```

---

## Tech stack

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | **Next.js** (App Router) | 14.2.20 |
| Language | **TypeScript** (strict) | 5.6.3 |
| 3D | **React Three Fiber** + drei | 8.17.10 / 9.114.3 |
| Three.js | | 0.169.0 |
| Scroll | **Lenis** | 1.1.20 |
| Animation | **GSAP + ScrollTrigger** | 3.12.5 |
| Styling | **Tailwind CSS** + CSS variable tokens | 3.4.15 |
| Fonts | **Fraunces** + **Instrument Sans** + **Instrument Serif** | via `next/font/google` |

All geometry is procedural — no GLB hosting needed.

---

## Design tokens

| Token | Value | Use |
|-------|-------|-----|
| `--color-walnut` | `#1A1410` | Dominant background — the dark wood interior |
| `--color-lamplight` | `#D9A368` | Accent — the warm reading-lamp glow |
| `--color-bone` | `#F3EBDE` | Neutral — parchment, type |
| `--color-sage` | `#6B7B5E` | Restricted tertiary (≤5% of page) |
| Display font | **Fraunces** | Humanist serif w/ optical sizing |
| Body font | **Instrument Sans** | Technical body |
| Italic accent | **Instrument Serif** | Pull-quotes, emphasis |

All tokens live in `styles/tokens.css`. Tailwind reads them through CSS variables; never hardcode hex in components.

---

## Editing content

All ODF copy and all URLs live in **`lib/content.ts`**. See `MAINTENANCE.md` for recipes covering every common edit (headline, photo, phone, ministry URL, service time, etc.).

After editing, push to GitHub; Vercel auto-deploys in ~90 seconds.

---

## Accessibility + performance

- **prefers-reduced-motion**: skips the 3D Canvas entirely (photo backdrop remains), disables GSAP scroll choreography, kills ambient drift
- **Touch devices**: skip the magnetic cursor and magnetic-hover ministry cards
- **Mobile**: lower DPR cap, fewer chairs (5×6 vs 6×8), fewer dust motes, no shadow casting
- **SSR-safe**: every page renders meaningfully without JavaScript via the photo backdrop
- **Lighthouse targets**: ≥80 mobile / ≥90 desktop performance, ≥95 SEO, ≥95 accessibility
- **Structured data**: Church schema (JSON-LD) shipped in the root layout for local-SEO eligibility

---

## Deployment

See **`DEPLOYMENT.md`** for the full step-by-step. Short version: push to GitHub, import into Vercel, point DNS at Vercel's anycast IP, done.

---

## License + ownership

This codebase belongs to Paul / ODF. Built by Claude (Anthropic) following Paul's Immersive 3D System framework.

External dependencies retain their own licenses (mostly MIT). Fonts via Google Fonts (OFL). Three.js (MIT). React + Next.js (MIT). GSAP (free for non-commercial use OR commercial-no-paid-features; check [greensock.com/licensing](https://greensock.com/licensing) — for a non-profit church site, the standard license applies and is free).
