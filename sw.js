const CACHE_NAME = 'edustudent-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles/main.css',
  './scripts/app.js',
  './scripts/firebase-config.js',
  './scripts/ai-assistant.js',
  './manifest.json',
  './assets/hero_banner.jpg',
  './assets/avatar.jpg',
  './assets/course_ai.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
