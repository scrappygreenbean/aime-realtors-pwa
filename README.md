# The Realtor's AIME — Community OS (Installable PWA)

A designed community where **every channel opens to its own real page** — not an
endless feed. Refined from the `aime-community` proof-of-concept and branded from
the Realtors brand kit. Installable as an app, works offline, no build step.

## Brand (pulled from the kit — not invented)
Source: `AIME/BRAND_PARENT_AIME/THE_REALTORS_AIME/THE_REALTORS_AIME_BRAND_KIT/`

- **Palette — classic gold on midnight black** (the Realtors sub-brand):
  - `--gold #D4AF37`, `--champagne #F1D18A`, `--glow #FFD76A`, base `--black #050505`
- **Logo:** `96CB4410-…E.PNG` (the gold **AIME** wordmark) → `assets/img/aime-wordmark.png`,
  shown in the hero and used as the home-screen app icon.
- **Fonts:** Playfair Display (headers) + Montserrat (body) — the parent AIME type system.

## What's inside
- `index.html` — home hub: channel tiles (**AI Employees** live, **AI Headshots** live,
  Start Here, Resources, Wins, Office Hours) + value strip.
- `ai-employees.html` — gallery of 8 realtor AI Employees; each opens a detail page with a
  real, ready-to-paste prompt and a one-click **Copy** button. Hash-routed, no framework.
- `assets/js/employees.js` — the roster + prompts (edit here to change content).
- `manifest.webmanifest`, `sw.js`, `assets/js/pwa.js` — PWA: installable, offline app-shell
  cache, custom **Install app** button.
- `assets/img/` — brand wordmark + generated icons (192, 512, maskable-512, apple-touch, favicon).
- **AI Headshots** → https://headshots.gotaime.com (tile on home + nav link on the team page).

## View it locally
From this folder:
```
python -m http.server 8077
```
Then open **http://localhost:8077/**. (Use `localhost`/HTTPS — the service worker and
"Install" prompt require a secure context; they won't run from a raw `file://` open.)

To install: open in Chrome/Edge → address-bar install icon, or the **Install app** button.

## Deploy (later)
Any static host (Render/Netlify/Vercel/GHL static). Serve the folder as-is at the domain
root. Bump `CACHE` in `sw.js` on each release so clients pick up changes.
