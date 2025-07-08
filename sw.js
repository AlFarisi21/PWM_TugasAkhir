// Nama cache untuk versi ini
const cacheName = 'blog-tech-cache-v1';

// Daftar file yang akan disimpan di cache (untuk offline)
const assets = [
  './',
  './index.html',
  './detail.html',
  './manifest.json',
  './logoblog(1).png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
];

// Event saat service worker di-install
self.addEventListener('install', event => {
  self.skipWaiting(); // Langsung aktif tanpa menunggu halaman reload
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets); // Simpan semua file ke dalam cache
    })
  );
});

// Event saat service worker diaktifkan
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== cacheName) // Cari cache lama
          .map(key => caches.delete(key))   // Hapus cache lama
      );
    })
  );
});

// Event untuk menangani permintaan fetch (akses file dari web)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      // Gunakan file dari cache jika ada, jika tidak ambil dari internet
      return cacheRes || fetch(event.request);
    })
  );
});
