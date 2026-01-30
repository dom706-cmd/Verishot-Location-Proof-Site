const CACHE = 'verishot-v1';
const ASSETS = [
  './',
  'index.html',
  'pricing.html',
  'verify-workflow.html',
  'faq.html',
  'support.html',
  'privacy.html',
  'terms.html',
  'assets/css/styles.css',
  'assets/js/main.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k === CACHE ? null : caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if(req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      if(res.ok && (req.url.includes('assets/') || req.url.endsWith('.html'))){
        caches.open(CACHE).then(cache => cache.put(req, copy));
      }
      return res;
    }).catch(()=>hit))
  );
});