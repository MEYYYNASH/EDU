const CACHE_NAME = 'edustudent-v2.0';

// Install event - force immediate activation
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

// Activate event - clear all old caches immediately
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First fetch strategy: always fetch latest version from server
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
