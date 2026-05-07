const CACHE_NAME = 'tripaid-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/privacy.html',
  '/terms.html',
  '/support.html',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// 설치 시 캐시 저장
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 네트워크가 안 될 때 캐시에서 꺼내오기
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
