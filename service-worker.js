// service-worker.js

const CACHE_NAME = 'mh-qadri-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html', // मान लें कि आपकी मुख्य फ़ाइल का नाम index.html है
];

// इंस्टॉल इवेंट: ऐप शेल को कैश करें
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// फ़ेच इवेंट: कैश से जवाब दें
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // कैश में है, तो उसे लौटाएं
        if (response) {
          return response;
        }
        // नहीं तो, नेटवर्क से फ़ेच करें
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});