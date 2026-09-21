// Network-first service worker. Always fetches the latest app from the server
// (revalidating), and falls back to the last cached copy only when offline.
// This makes updates reach everyone with the link automatically.
const CACHE = 'preflop-trainer-v2';

self.addEventListener('install', e => self.skipWaiting());

self.addEventListener('activate', e => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
  await self.clients.claim();
})()));

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // let fonts/CDN use normal caching
  e.respondWith((async () => {
    try {
      const fresh = await fetch(e.request, { cache: 'no-cache' }); // revalidate with server
      const cache = await caches.open(CACHE);
      cache.put(e.request, fresh.clone());
      return fresh;
    } catch (err) {
      const cached = await caches.match(e.request);
      return cached || Response.error();
    }
  })());
});
