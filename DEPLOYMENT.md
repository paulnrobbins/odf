# Deployment — odf.church

This guide takes the project from the local folder Paul has now to a live site at `odf.church`. Total time: roughly 20 minutes, most of it waiting on DNS to propagate.

---

## Prerequisites

- A GitHub account (Paul already has one)
- A Vercel account (free Hobby plan is sufficient for ODF's traffic profile — sign up at [vercel.com](https://vercel.com) using the same GitHub account)
- Access to the registrar where `odf.church` is currently managed (probably whoever ODF originally registered the domain with — likely Nucleus, GoDaddy, Namecheap, or Cloudflare)

---

## 1. Push the project to GitHub

In a terminal, from the `odf-church` folder:

```bash
# First-time setup — initialize a git repo
git init
git add .
git commit -m "Initial commit — Phase 5 production-ready"
git branch -M main

# Create a new repo on GitHub at https://github.com/new
# Name it: odf-church (private is fine — Vercel can still read private repos)

# Then connect and push
git remote add origin git@github.com:YOUR-USERNAME/odf-church.git
git push -u origin main
```

If `git push` complains about authentication, use a [GitHub Personal Access Token](https://github.com/settings/tokens) or set up SSH keys.

---

## 2. Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Click **Import Git Repository** and pick `odf-church`.
3. Vercel auto-detects Next.js — leave all the defaults (Framework: Next.js, Build Command: `next build`, Output: `.next`, Install: `npm install`).
4. Under **Environment Variables**, add one:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.odf.church`
5. Click **Deploy**.

First build takes 2–4 minutes. Vercel gives you a `*.vercel.app` preview URL when it's done. Open it — the site should look identical to local. If it does, you're 90% there.

---

## 3. Connect the `odf.church` domain

Inside the Vercel project:

1. Go to **Settings → Domains**.
2. Add `odf.church` and `www.odf.church`. Vercel will tell you to add DNS records at the registrar.
3. Vercel will show **one of two options** depending on whether the domain's nameservers are at the registrar or already at Vercel:

   **Option A — Keep DNS at the current registrar (recommended)**
   - Add an `A` record: `@` → `76.76.21.21` (Vercel's anycast IP)
   - Add a `CNAME` record: `www` → `cname.vercel-dns.com`
   - At the registrar, **delete any old A/CNAME records pointing to Nucleus** so traffic flows to Vercel instead.

   **Option B — Move DNS to Vercel (simpler but bigger change)**
   - Change the domain's nameservers at the registrar to Vercel's NS values.
   - DNS propagation takes 0–48 hours.

4. After DNS propagates, Vercel auto-provisions a Let's Encrypt SSL cert (HTTPS). No action required.

---

## 4. Post-deploy verification

Once `https://odf.church` resolves to the new site:

| Check | What to look for |
|-------|------------------|
| Home page loads | Hero photo + 3D scene mounted |
| Mobile view | 3D quality reduced, smooth scroll |
| `/sitemap.xml` | Returns one entry, your canonical URL |
| `/robots.txt` | Allows all, points to sitemap |
| `/favicon.ico` + tab icon | Lamplight "O" on walnut |
| Social share preview | Drop the URL in [opengraph.xyz](https://www.opengraph.xyz/) and confirm the OG image renders |
| Lighthouse audit | Run from Chrome DevTools. Targets: Performance ≥ 80 mobile / ≥ 90 desktop, SEO ≥ 95, Accessibility ≥ 95 |
| Structured data | Test at [search.google.com/test/rich-results](https://search.google.com/test/rich-results) — confirm Church schema is detected |
| Tel links work | On mobile, the phone numbers in the footer should open the dialer |

---

## 5. Submit to Google

Open [Google Search Console](https://search.google.com/search-console), add `odf.church` as a property, verify ownership (usually via a DNS TXT record), and submit `https://www.odf.church/sitemap.xml`.

ODF will start appearing in Google search results within a few days. Local-pack listings (the map sidebar for "church near Spring City TN") populate over weeks, helped by the structured data already shipped.

---

## 6. Subsequent deploys

Vercel watches the GitHub `main` branch. Every push to `main` triggers a new production deploy automatically (~90 seconds). To deploy a change:

```bash
git add .
git commit -m "Update what's-to-expect copy"
git push
```

That's it. Vercel handles the rest. The previous version stays available at its preview URL — if a change ever breaks production, roll back with one click in the Vercel dashboard.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Build fails with R3F type errors | `npm install` locally, run `npm run type-check`, fix any errors, push |
| Build fails with "Module not found" | Check the import path is correct — Vercel is case-sensitive (Linux); macOS isn't |
| Site loads but 3D scene is blank | Check the browser console; most likely a Three.js peer-dep mismatch — keep the pinned versions in `package.json` |
| Photos don't load on production | Confirm the files in `public/images/photos/` were committed to git (they're not in `.gitignore` but worth checking with `git ls-files public/images`) |
| OG preview shows old image | Twitter/Facebook cache aggressively. Use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to force a re-scrape |
| Custom domain doesn't load | DNS propagation can take up to 48 hours. Check with [dnschecker.org](https://dnschecker.org). If still not working after 48h, double-check the A and CNAME records match Vercel's exact instructions |

---

## Rollback

If a deploy breaks the site:

1. Go to Vercel project → **Deployments** tab.
2. Find the last working deployment.
3. Click the three-dot menu → **Promote to Production**.

Done in ~10 seconds. The bad deploy stays in the history; you can debug and fix on a branch without affecting prod.
