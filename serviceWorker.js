const cacheVersion = "v1.53";
const filesToCache = [
  '/HCM/static/js/',
  '/HCM/static/img/',
  '/HCM/static/fonta/',
  '/HCM/static/css/',
  '/HCM/index.html',
  '/HCM/manifest.json',
  '/HCM/serviceWorker.js',
  '/HCM/innolux-offical.png',
  '/HCM/personIcon.png',
  '/HCM/working.png',
  '/HCM/favicon.ico',
  '/HCM/favicon72.png',
  '/HCM/favicon96.png',
  '/HCM/favicon144.png',
  '/HCM/favicon192.png',
  '/HCM/favicon512.png'
];

self.addEventListener("install", event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheVersion).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    }),
  );
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys()
    .then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheVersion) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener("fetch", event => {  
  event.respondWith(
    caches
      .open(cacheVersion)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        console.log('[ServiceWorker] fetch', event.request);
        return response || fetch(event.request);
      }),
  );
});
