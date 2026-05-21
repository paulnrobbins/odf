# Maintenance — odf.church

Every common edit takes one file: **`lib/content.ts`**. Open it, change the text, push to GitHub, Vercel auto-deploys in ~90 seconds. No CMS, no admin panel, no separate tools.

This doc is a recipe book. Find the change you want to make, follow the recipe, push.

---

## The one file you'll usually edit

```
odf-church/
└── lib/
    └── content.ts          ← edit this
```

Every word on the site lives here. Every URL too. Open it in VS Code (or any editor); the structure mirrors the page top-to-bottom.

---

## Recipe: change the headline

**Want to change "Come As You Are." to something else?**

Find this block in `lib/content.ts`:

```ts
export const hero = {
  eyebrow: 'Open Door Fellowship · Spring City, TN',
  headline: 'Come As You Are.',
  subhead: service.dayTime,
} as const;
```

Change `headline:`, save, commit:

```bash
git add lib/content.ts
git commit -m "Update hero headline"
git push
```

Done. Live in ~90 seconds.

---

## Recipe: swap a photo

**Want to replace `hero.jpg` with a newer shot?**

1. Get the new photo. Recommend ≤2400px on the long edge, JPEG quality 85, under 1MB. (If you don't have an image editor handy, use [squoosh.app](https://squoosh.app) — drag in, resize, export.)
2. Rename it to `hero.jpg` (or whatever slot you're replacing — see the table below).
3. Drop it into `public/images/photos/`, overwriting the old file.
4. Commit:

```bash
git add public/images/photos/hero.jpg
git commit -m "Replace hero photo"
git push
```

### Photo slots

| File | Where it shows up |
|------|-------------------|
| `hero.jpg` | The hero photo backdrop (SSR fallback for the 3D scene) |
| `worship.jpg` | The Recovery Ministry block in "Two Things We Do" |
| `community.jpg` | The Welcoming the Overlooked block in "Two Things We Do" |
| `gathering.jpg` | Reserved for future use (Phase 6 sections) |
| `people.jpg` | Reserved for future use |
| `pastor.jpg` | The Justin + Kahala leadership beat |

If you want to use a different filename, also update the path in `lib/content.ts`:

```ts
export const photos = {
  hero: '/images/photos/your-new-name.jpg',
  ...
};
```

---

## Recipe: update phone or address

Find the `contact` block:

```ts
export const contact = {
  address: {
    street: '268 West Jackson Avenue',
    city: 'Spring City',
    region: 'Tennessee',
    postal: '37381',
    ...
  },
  phones: [
    { display: '(423) 443-8707', tel: '+14234438707' },
    { display: '(931) 250-1965', tel: '+19312501965' },
  ],
  ...
};
```

Edit the values. The `tel:` form has no spaces or punctuation — it must start with `+` then the country code (`1` for US) then the 10 digits, no breaks. The `display` form is what people see.

Commit and push.

---

## Recipe: change a ministry URL

```ts
export const ministrySites = {
  alohaHouse:        'https://kealohaministries.org',
  songsForRecovery:  'https://www.kealohaministries.org/#songs',
  cupOfJoe:          'https://cupofjoeministries.org',
} as const;
```

Replace the URL. The ministry cards in Scene 4 will link to the new value.

---

## Recipe: edit ministry copy

```ts
export const ministries = {
  eyebrow: 'The family',
  headline: 'Ministries.',
  intro: 'Different doors into the same room. ...',
  items: [
    {
      id: 'aloha-house',
      name: 'Aloha House',
      tag: 'Women\u2019s recovery home',
      location: 'Spring City, TN',
      body: 'A safe, structured home for women on the recovery journey, ...',
      href: ministrySites.alohaHouse,
    },
    ...
  ],
};
```

Edit the `body` field for the ministry you want to change. Watch the apostrophes — the file uses `\u2019` (the smart curly apostrophe). Easiest: copy an existing apostrophe and use that.

---

## Recipe: change service time

Edit one place, it updates everywhere it's referenced (hero subhead, footer, structured data, sticky nav pill):

```ts
export const service = {
  dayTime: 'Sundays at 10:30 a.m.',
  shortLabel: '10:30 a.m. Sundays',
} as const;
```

If the new time is, say, Wednesday 7pm, change both fields. They show in slightly different places (full vs short).

---

## Recipe: update Pastor info

```ts
export const leadership = {
  eyebrow: 'Meet your pastors',
  headline: 'Justin & Kahala Jennings.',
  body: 'Pastor Justin and Kahala lead Open Door Fellowship ...',
  photo: photos.pastor,
  photoAlt: 'Pastor Justin Jennings and his wife Kahala Jennings ...',
} as const;
```

Change the names, the body, or the photo. If you change the photo to a different file, update `photo: photos.pastor` to point to whichever photo slot you're using.

---

## Recipe: change the OG image (social share preview)

Replace `public/og-image.png` with a new 1200×630 PNG. That's it. Twitter/Facebook may cache the old one for a few hours — use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to force a re-scrape.

---

## Recipe: change the favicon

The favicon is a clean lamplight "O" on walnut, defined as an SVG at `public/favicon.svg` and rasterized into the PNG variants at the various sizes Apple, Android, and Windows want.

To change it, you have two paths:

**Easy path:** replace the visible files in `public/`:
- `favicon.svg` (vector — what modern browsers use)
- `favicon.ico` (legacy multi-resolution)
- `icon-16.png`, `icon-32.png`, `icon-180.png`, `icon-192.png`, `icon-512.png`
- `apple-touch-icon.png`

**Easier path:** use [realfavicongenerator.net](https://realfavicongenerator.net) — drag in a single source image, download the kit, drop all files into `public/` overwriting what's there.

---

## Adding a new section

This is heavier. The site is a single-page scroll experience whose camera path is tuned to the existing seven scenes. Adding a section means updating:

1. `lib/content.ts` — add the copy
2. `components/sections/YourNewSection.tsx` — build the component (copy an existing section as a template)
3. `app/page.tsx` — insert `<YourNewSection />` in the right order
4. `components/three/UpperRoomScene.tsx` — adjust the camera path waypoints if the new section disrupts the scroll-time-to-scene mapping

If you're not sure how to tune the camera path, leave it and the camera will simply ease through the existing keyframes — usually fine, but worth eyeballing.

---

## What you should NOT edit (without knowing why)

| File | Why hands-off |
|------|---------------|
| `package.json` | Adding/removing deps without testing breaks the build. If you need a new library, ask Claude to add it. |
| `next.config.js` | Build config. Wrong values = silent breakage in production. |
| `tailwind.config.ts` / `styles/tokens.css` | Color and type tokens. Change here and the design system changes site-wide — usually not what you want. |
| `components/three/*` | The 3D scene. Tuning chair counts or camera waypoints is fine if you know what you're doing; structural changes are not. |
| `app/layout.tsx` | Root-level metadata + fonts + JSON-LD. Wrong edits hurt SEO. |

For changes in those areas, branch off `main`, test locally with `npm run dev`, then push.

---

## Routine health check (do this monthly)

```bash
# 1. Make sure your local copy is current
git pull

# 2. Run the production build to catch issues early
npm install   # only if it's been a while
npm run build

# 3. If the build succeeds, the site is in good shape
```

Failures here mean a dependency drifted. The pinned versions in `package.json` should keep things stable, but `npm audit` will sometimes nag about old transitive deps. Usually safe to ignore unless it's flagging high-severity issues.

---

## When to call Claude back

- Adding a new scene or section
- Changing the camera path
- Adding a contact form (needs backend integration)
- Adding a sermon archive
- Adding events / calendar feature
- Adding a CMS (move content out of `lib/content.ts` into Sanity / Payload / etc.)
- Any change involving the 3D scene
- Any change involving GSAP/ScrollTrigger
- Anything else where you'd be guessing

For everything else in this doc — go ahead. The site is designed to be edited.
