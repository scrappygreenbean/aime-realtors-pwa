/* =====================================================================
   The Realtor's AIME — service worker
   App-shell precache + cache-first for local assets, network-first
   for navigations (so updates show up). Bump CACHE on every release.
   ===================================================================== */
const CACHE = 'realtors-aime-v6';

const APP_SHELL = [
  'index.html',
  'ai-employees.html',
  'assets/css/styles.css',
  'assets/js/app.js',
  'assets/js/employees.js',
  'assets/js/pwa.js',
  'assets/js/flair.js',
  'assets/img/aime-wordmark.png',
  'assets/img/logo-aime.png',
  'assets/img/hero-bg.jpg',
  'assets/img/gold-streams.jpg',
  'assets/img/hero-realtor.jpg',
  'assets/img/team.jpg',
  'assets/img/headshot.jpg',
  'assets/img/title-card.jpg',
  'assets/img/feature-portrait.jpg',
  'assets/img/wins-results.jpg',
  'assets/img/wordmark-wide.png',
  'assets/img/icon-192.png',
  'assets/img/icon-512.png',
  'assets/img/apple-touch-icon.png',
  'assets/img/favicon-48.png',
  'manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Don't intercept cross-origin (fonts, the headshot booth, etc.).
  if (url.origin !== self.location.origin) return;

  // Network-first for page navigations; fall back to cached shell offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then((m) => m || caches.match('index.html')))
    );
    return;
  }

  // Cache-first for same-origin static assets.
  event.respondWith(
    caches.match(req).then((cached) =>
      cached ||
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => cached)
    )
  );
});
