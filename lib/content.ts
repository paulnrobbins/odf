/**
 * Open Door Fellowship — Content Layer
 * ─────────────────────────────────────
 * Single source of truth for every piece of ODF copy + every Nucleus Launcher URL.
 * Every section component imports from this file. Edit copy here, not in components.
 *
 * Maintenance Mode: 1 (hardcoded). Per Phase 1 brief, ODF content is stable; Paul edits
 * this file when needed. The brief flagged a possible move to Sanity in v2 if a non-
 * technical editor takes over — until then, this file is the CMS.
 */

// ──────────────────────────────────────────────────────────
// Routes — internal anchors + tel: links (replaces prior Nucleus launchers)
// "Plan a Visit" → scrolls to the on-page Service Info section.
// "Call Us" → tel: link to the primary phone number.
// ──────────────────────────────────────────────────────────

export const routes = {
  visit: '#service',
  callPrimary: 'tel:+14234438707',
  callSecondary: 'tel:+19312501965',
} as const;

// ──────────────────────────────────────────────────────────
// External ministry sites — confirmed URLs from Paul
// ──────────────────────────────────────────────────────────

export const ministrySites = {
  alohaHouse:        'https://kealohaministries.org',
  songsForRecovery:  'https://www.kealohaministries.org/#songs',
  cupOfJoe:          'https://cupofjoeministries.org',
} as const;

// ──────────────────────────────────────────────────────────
// Photography — Paul's professional photos, served from /public/images/photos/.
// All photos live at /images/photos/*.jpg. Optimized to ≤2400px long edge,
// JPEG quality 85, ~3.3MB total bundle. Next.js Image (next/image) further
// generates responsive WebP/AVIF variants at request time.
// ──────────────────────────────────────────────────────────

export const photos = {
  hero:        '/images/photos/hero.jpg',         // wide service shot: pastor preaching, folding chairs visible
  gathering:   '/images/photos/gathering.jpg',    // fellowship/potluck — congregation eating + talking
  worship:     '/images/photos/worship.jpg',      // prayer moment — laying-on-of-hands healing prayer
  community:   '/images/photos/community.jpg',    // family living room — couches, kids, mandala tapestry
  people:      '/images/photos/people.jpg',       // Kahala teaching kids at the piano
  pastor:      '/images/photos/pastor.jpg',       // Pastor Justin + Kahala Jennings + their child
} as const;

// ──────────────────────────────────────────────────────────
// Site metadata
// ──────────────────────────────────────────────────────────

export const meta = {
  title: 'Open Door Fellowship | Come As You Are | Spring City, TN',
  description:
    'Open Door Fellowship in Spring City, TN — a recovery-focused, no-barrier church where Jesus meets people right where they are. Sundays 10:30 a.m.',
  canonical: 'https://www.odf.church',
  themeColor: '#1a1410',
  ogImage: '/og-image.png',
} as const;

// ──────────────────────────────────────────────────────────
// Contact + service
// ──────────────────────────────────────────────────────────

export const contact = {
  address: {
    street: '268 West Jackson Avenue',
    city: 'Spring City',
    region: 'Tennessee',
    postal: '37381',
    country: 'United States',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=268+West+Jackson+Avenue+Spring+City+TN+37381',
  },
  phones: [
    { display: '(423) 443-8707', tel: '+14234438707' },
    { display: '(931) 250-1965', tel: '+19312501965' },
  ],
  social: {
    facebook: 'https://www.facebook.com/groups/429030580466664',
  },
} as const;

export const service = {
  dayTime: 'Sundays at 10:30 a.m.',
  shortLabel: '10:30 a.m. Sundays',
} as const;

// ──────────────────────────────────────────────────────────
// Navigation
// ──────────────────────────────────────────────────────────

export const nav = {
  primary: [
    { label: 'About', href: '#two-things' },
    { label: 'Ministries', href: '#ministries' },
    { label: 'Service Info', href: '#service' },
    { label: 'Visit', href: '#at-the-cross' },
  ],
  cta: {
    label: 'Plan a Visit',
    href: routes.visit,
  },
} as const;

// ──────────────────────────────────────────────────────────
// Scene 1 — Hero (The Threshold)
// ──────────────────────────────────────────────────────────

export const hero = {
  eyebrow: 'Open Door Fellowship · Spring City, TN',
  headline: 'Come As You Are.',
  subhead: service.dayTime,
} as const;

// ──────────────────────────────────────────────────────────
// Scene 2 — Aisle Reveal (We love you as you are)
// ──────────────────────────────────────────────────────────

export const weLoveYou = {
  eyebrow: 'A place where you belong',
  headline: 'We love you as you are.',
  body: [
    "At Open Door Fellowship, we believe Jesus meets people right where they are — not where they ‘should be.’ Our heart is to create a safe, grace-filled community where lives are restored, hope is renewed, and people discover the transforming love of Christ.",
    "No matter your past, your struggles, or your story — there is a place for you here.",
    "We exist to open the door to everyone — especially those who have often felt unwelcome in traditional church settings.",
  ],
  closing: 'We believe no life is beyond redemption and no person is too far gone for God\u2019s grace.',
  ctas: [
    { label: 'Plan a Visit', href: routes.visit, primary: true },
    { label: 'Call Us', href: routes.callPrimary, primary: false },
  ],
} as const;

// ──────────────────────────────────────────────────────────
// Scene 3 — Two Things We Do
// ──────────────────────────────────────────────────────────

export const twoThings = {
  eyebrow: 'Our focus',
  headline: 'Two things we do.',
  items: [
    {
      id: 'recovery',
      number: '01',
      title: 'Recovery Ministry',
      body: 'Reaching those battling addiction, walking alongside them with compassion, accountability, and the healing power of Jesus.',
      photo: photos.worship,
      photoAlt: 'A gathering at Open Door Fellowship',
    },
    {
      id: 'overlooked',
      number: '02',
      title: 'Welcoming the Overlooked',
      body: 'Creating a home for people groups who are often marginalized, misunderstood, or rejected elsewhere.',
      photo: photos.community,
      photoAlt: 'Community at Open Door Fellowship',
    },
  ],
} as const;

// ──────────────────────────────────────────────────────────
// Scene 4 — The Family (Ministries)
// ──────────────────────────────────────────────────────────

export const ministries = {
  eyebrow: 'The family',
  headline: 'Ministries.',
  intro:
    'Different doors into the same room. Each ministry walks alongside a specific story, with the same posture: come as you are.',
  items: [
    {
      id: 'aloha-house',
      name: 'Aloha House',
      tag: 'Women\u2019s recovery home',
      location: 'Spring City, TN',
      body: 'A safe, structured home for women on the recovery journey, walking the path of healing together.',
      href: ministrySites.alohaHouse,
    },
    {
      id: 'songs-for-recovery',
      name: 'Songs for Recovery',
      tag: 'Music ministry',
      location: 'Spring City, TN',
      body: 'Music as language for what addiction took and what redemption gives back. Worship that meets recovery where it lives.',
      href: ministrySites.songsForRecovery,
    },
    {
      id: 'cup-of-joe',
      name: 'Cup of Joe Ministries',
      tag: 'Evangelism & outreach',
      location: 'Pastor Joe Mullins',
      body: 'Carrying the gospel into the places people gather — over coffee, on the street, at the threshold of crisis.',
      href: ministrySites.cupOfJoe,
    },
  ],
} as const;

// ──────────────────────────────────────────────────────────
// Leadership — Pastor Justin Jennings + wife Kahala Jennings
// (Phase 4 will place this as a quiet beat between the stage approach
// and the at-the-cross moment, OR fold it into the connection footer.)
// ──────────────────────────────────────────────────────────

export const leadership = {
  eyebrow: 'Meet your pastors',
  headline: 'Justin & Kahala Jennings.',
  body:
    'Pastor Justin and Kahala lead Open Door Fellowship as a family — the same way the church gathers. You\u2019ll meet them most Sundays, usually with their kids nearby.',
  photo: photos.pastor,
  photoAlt: 'Pastor Justin Jennings and his wife Kahala Jennings with their child at Open Door Fellowship',
} as const;

// ──────────────────────────────────────────────────────────
// Scene 5 — The Stage Approaches (Service info)
// ──────────────────────────────────────────────────────────

export const serviceInfo = {
  eyebrow: 'When + where',
  headline: 'We meet at 10:30 a.m. on Sundays.',
  whatToExpect: [
    {
      title: 'No dress code.',
      body: 'Jeans, hoodies, work clothes — whatever you have on is the right thing to wear. We mean it.',
    },
    {
      title: 'Recovery-friendly.',
      body: 'You\u2019ll find folding chairs, mismatched mugs, and people who know what hard mornings feel like. There is no posture you need to perform.',
    },
    {
      title: 'Come early or late.',
      body: 'Slip in when you can. There\u2019s coffee on the counter and a seat saved at the back if you want one.',
    },
  ],
  parking: 'Parking is free in the lot adjacent to the building at 268 West Jackson Avenue.',
} as const;

// ──────────────────────────────────────────────────────────
// Scene 6 — At the Cross
// ──────────────────────────────────────────────────────────

export const atTheCross = {
  pullQuote: 'We saved you a seat.',
  body:
    'Whatever brought you here — curiosity, crisis, a long road, a longer wait — we\u2019re glad you found us. There\u2019s a chair with your name on it, a coffee on the counter, and a family ready to meet you.',
  ctas: [
    { label: 'Plan a Visit', href: routes.visit, primary: true },
    { label: 'Call Us', href: routes.callPrimary, primary: false },
  ],
} as const;

// ──────────────────────────────────────────────────────────
// Scene 7 — The Connection (Footer copy)
// ──────────────────────────────────────────────────────────

export const footer = {
  greeting:
    'No matter the situation, you can always feel free to reach out, even if it\u2019s just to say hi.',
  ctas: [
    { label: 'Call Us', href: routes.callPrimary, primary: true },
    { label: 'See Where We Meet', href: '#service', primary: false },
  ],
  links: {
    columns: [
      {
        heading: 'Visit',
        items: [
          { label: 'Plan a Visit', href: '#service', external: false },
          { label: 'Get Directions', href: contact.address.mapUrl, external: true },
          { label: 'Call Us', href: routes.callPrimary, external: false },
        ],
      },
      {
        heading: 'About',
        items: [
          { label: 'Who We Are', href: '#we-love-you', external: false },
          { label: 'Our Focus', href: '#two-things', external: false },
          { label: 'Ministries', href: '#ministries', external: false },
        ],
      },
      {
        heading: 'Connect',
        items: [
          { label: 'Facebook Group', href: contact.social.facebook, external: true },
        ],
      },
    ],
  },
  legal: `Copyright ${new Date().getFullYear()} Open Door Fellowship. All Rights Reserved.`,
} as const;

// ──────────────────────────────────────────────────────────
// Aggregate export (handy for any future debug page or sitemap)
// ──────────────────────────────────────────────────────────

export const content = {
  routes,
  ministrySites,
  photos,
  meta,
  contact,
  service,
  nav,
  hero,
  weLoveYou,
  twoThings,
  ministries,
  leadership,
  serviceInfo,
  atTheCross,
  footer,
} as const;

export default content;
