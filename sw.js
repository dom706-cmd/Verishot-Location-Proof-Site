const CACHE = 'verishot-v4';
const ASSETS = [
  'index.html',
  'verify-workflow.html',
  'pricing.html',
  'faq.html',
  'support.html',
  'privacy.html',
  'terms.html',
  'assets/css/styles.css',
  'assets/js/site.js',
  'assets/img/logo.png',
  'assets/img/app-icon.png',
  'assets/img/s1.webp',
  'assets/img/s2.webp',
  'assets/img/s3.webp',
  'assets/img/s4.webp',
  'assets/img/s5.webp',
  'assets/img/s6.webp',
  'assets/img/s7.webp',
  'assets/img/s8.webp',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => (k === CACHE ? null : caches.delete(k)))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Bypass: non-GET, range requests, and video files
  if (req.method !== 'GET') return;
  if (req.headers.has('range')) return;
  const url = new URL(req.url);
  if (url.pathname.endsWith('.mp4') || url.pathname.endsWith('.mov')) return;

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        // Cache successful basic responses
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      });
    })
  );
});