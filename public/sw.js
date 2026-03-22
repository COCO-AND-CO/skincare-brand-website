// Basic Service Worker to satisfy PWA install requirements
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Empty fetch listener is enough to satisfy the PWA requirement for Android/Chrome.
  // Real offline caching can be added later if needed.
});
