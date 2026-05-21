# Open Door Fellowship — Project Brief

*Phase 1 Foundation document. Every later phase references this file.*

---

## Mode & Deployment

- **Mode**: New-Build / Fresh Concept (replaces prior Threshold concept entirely)
- **Deployment**: Self-Deploy (Paul owns the site; pushes to Vercel under odf.church)
- **Maintenance Mode**: Mode 1 (hardcoded content in `lib/content.ts`) for static copy; **Nucleus Launcher** retained for live flows (Plan-a-Visit, Say Hello, Prayer Hub). No CMS in v1
- **Editor audience**: Paul (technical, concise docs OK)

---

## Audit

**Site**: odf.church, currently powered by Nucleus.

**Headline**: "Come As You Are." Two focal points: **Recovery Ministry** + **Welcoming the Overlooked**.

**Direction shift (mid-Phase 2)**: Paul has decided to drop Nucleus integrations entirely and use his own professional photography. The site is now fully self-contained — no third-party launchers, no Prayer Hub, no Nucleus CDN dependency.

**CTAs (replacing Nucleus launchers)**:
- **Plan a Visit** → internal anchor scroll to `#service` (the on-page Service Info section)
- **Call Us** → `tel:+14234438707` (primary phone)
- **Get Directions** → Google Maps deep link
- No contact form in v1; phone-only per Paul's preference

**Ministry external sites** (Paul provides):
- **Aloha House** → `https://kealoha-ministries.com` (confirm exact URL)
- **Songs for Recovery** → pending URL from Paul
- **Cup of Joe Ministries** → pending URL from Paul

**Photography**: Paul uploads professional photos. Local-hosted under `/public/images/photos/` with canonical filenames (hero.jpg, gathering.jpg, worship.jpg, community.jpg, people.jpg, pastor.jpg). These names are the contract — Paul renames his files to match, or updates `lib/content.ts` photo paths if his filenames differ.

**Contact**: 268 West Jackson Avenue, Spring City, TN 37381 · (423) 443-8707 · (931) 250-1965 · Sundays 10:30 a.m. · Facebook group present.

**Subpages**: `/about-us`, `/ministries`, `/calendar` exist on prior site. New site is single-page (one route, seven scroll scenes).

---

## Concept

### Anchor Object — *The Upper Room*

A 3D worship room: rows of mismatched folding chairs (cream, sage, rust, navy) leading toward an unfussy front. The stage is small and low: a handmade wooden cross, an acoustic guitar on a stand, a stool with a coffee mug, a worn Bible on a music stand. String lights overhead, exposed beams, wood floor.

**Why it carries the brand**: The Upper Room is where Jesus shared the Last Supper *and* where the first church gathered at Pentecost — both in a borrowed upstairs room with regular chairs. ODF as continuation of that original plain, gathered, family-style worship. The cross at the front anchors it as a church; the folding chairs, mugs, and guitar make it *this* church.

### Aesthetic Direction — *Warm Lived-In Cinema*

Closer to an A24 indie film than a megachurch promo. Late-afternoon sunlight through dusty air, warm tungsten lamp interior, gentle film grain. Honest, unpolished, intimate. "Soft tactile" pillar with cinematic moodiness.

### Color Lock

| Role | Name | Hex |
|------|------|------|
| Dominant | Walnut Dark | `#1A1410` |
| Accent | Lamplight Amber | `#D9A368` |
| Neutral | Bone Parchment | `#F3EBDE` |
| Restricted tertiary (≤5%) | Dusty Sage | `#6B7B5E` |

### Type Pair

- **Display**: **Fraunces** (300–700, italic; humanist serif w/ optical sizing)
- **Body**: **Instrument Sans** (400, 500, 600)
- **Italic accent**: **Instrument Serif** (italic)

All Google Fonts, self-hosted via `next/font`.

---

## Scroll Score (7 scenes)

1. **The Threshold (0–8%)** — Camera at back, single shaft of side-light, one chair foreground. Hero text "Come As You Are." Dust motes drift in light shaft. *Goal*: land the visitor.

2. **The Aisle Reveal (8–25%)** — Camera pulls back; one chair becomes many. "We love you as you are" + ODF mission. Slow forward advance. *Goal*: first emotional handhold.

3. **Two Things We Do (25–42%)** — Camera advances down aisle. Recovery Ministry + Welcoming the Overlooked as Billboard photos in 3D space. *Goal*: make the two-focal promise tangible.

4. **The Family (42–60%)** — Mid-room, string lights overhead. Three ministry cards (Aloha House, Songs for Recovery, Cup of Joe) using Frame pattern, each links out to that ministry's own website. *Goal*: show breadth without overwhelm.

5. **The Stage Approaches (60–75%)** — Front third of room; guitar, cross, stool, music stand resolve. Service info, address, phones, "what to expect." *Goal*: convert curious to committed.

6. **At the Cross (75–92%)** — Camera at front, cross catches warmest light, single amber bloom. *"We saved you a seat."* Primary Plan-a-Visit CTA (→ `#service`) + Call Us secondary (→ `tel:`). *Goal*: the conversion moment.

7. **The Connection (92–100%)** — Camera angled from stage looking back: empty seats waiting. Footer with every off-ramp. Ambient string-light flicker continues. *Goal*: every off-ramp present.

---

## Photo Integration Strategy

- **Pattern A (Billboard)** for Scene 3 focal-point reveals: photo as tilted plane inside the 3D scene with 10% warm-tone overlay and matching grain
- **Pattern B (Frame)** for ministry cards in Scene 4: sharp typography frames the photo, photo treated as editorial
- 10% warm amber overlay on all photos · subtle film grain · no drop shadows · tight crops on faces

---

## Better-Solution Audit (UX upgrades baked into the build)

1. **Sticky service-time pill** — "10:30 a.m. Sundays · Plan a Visit" always visible in nav
2. **Two focal points get their own scroll moments** (Scene 3), not buried bullets
3. **"What to expect on your first visit"** copy added (currently absent on live site) — Scene 5
4. **Recovery-friendly operational language** woven through service info
5. **Sermons placeholder hook** — design doesn't paint into a corner if/when ODF starts publishing
6. **Say Hello flow promoted** from footer to secondary CTA throughout
7. **404 = folding-chair scene**: "We saved you a seat. This page just isn't ready yet."

---

## Tech Stack (canonical)

- **Framework**: Next.js 14.2 (App Router)
- **3D**: React Three Fiber 8.17 + drei (procedural geometry only, no GLB files in v1)
- **Scroll**: Lenis 1.1
- **Animation**: GSAP 3.12 + ScrollTrigger (registered in `useEffect`, not module-level)
- **Styling**: Tailwind 3.4 + CSS variables for color/type tokens
- **Fonts**: `next/font/google` (Fraunces + Instrument Sans + Instrument Serif)
- **TypeScript**: 5.6, strict
- **Performance**: Suspense + dynamic import `ssr: false` for the R3F Canvas; lazy-load below-the-fold sections; mobile-reduced 3D quality variant

---

## Mobile Plan (locked from Phase 1)

- 3D Canvas at lower resolution + reduced light count below 768px
- Dust motes disabled on mobile
- Camera path compressed — same 7 scenes, tighter scroll distances
- `prefers-reduced-motion` → static-image fallback, no Canvas mounted
- Target: Lighthouse ≥ 80 mobile, ≥ 90 desktop

---

## Open Questions (Paul's call before Phase 2 — defaults applied if no answer)

1. **Newsletter signup** — add in Scene 7? *Default: no in v1*
2. **Sermons** — placeholder hook only, or full archive section now? *Default: hook only*
3. **Photography** — hot-link Nucleus CDN, or mirror locally? *Default: hot-link*
4. **Custom domain** — is `odf.church` in your name or ODF's? *Affects DEPLOYMENT.md DNS step*

---

## Resume Block

To resume in a fresh chat, upload `immersive-3d-system.md` + this file + the latest code, then paste:

> *"Resuming odf-church build at Phase [N]. Anchor object: The Upper Room. Color lock #1A1410 / #D9A368 / #F3EBDE. Type pair Fraunces + Instrument Sans + Instrument Serif. Run the Confirmation Recital, then proceed with Phase [N]."*

---

*End of brief. Phase 2 is Scaffolding (now complete). Phase 3 builds the R3F Canvas + Hero + scroll-scrubbed camera through Scenes 1 & 2.*
