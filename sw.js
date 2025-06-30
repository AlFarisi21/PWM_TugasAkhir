const cacheName = 'blog-tech-cache-v1';
const assets = [
  '/PWM_TugasAkhir/',
  '/PWM_TugasAkhir/index.html',
  '/PWM_TugasAkhir/detail.html',
  '/PWM_TugasAkhir/manifest.json',
  '/PWM_TugasAkhir/logoblog(1).png',
  '/PWM_TugasAkhir/logoblog-192.png',
  '/PWM_TugasAkhir/logoblog-512.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // langsung aktif
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request);
    })
  );
});
