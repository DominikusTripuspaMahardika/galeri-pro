const CACHE_NAME = "galeri-pro-v2";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./README.md",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/logo.png",
  "https://cdn.tailwindcss.com/3.4.17"
];

// INSTALL
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
