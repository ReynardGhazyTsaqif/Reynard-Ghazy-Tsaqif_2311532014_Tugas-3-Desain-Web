const CACHE_NAME = 'rynnify-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  
  '/offline.html',
  '/index.css',
  '/about.css',
  '/contact.css',
  
  '/offline.css',
  '/about.js',
  '/pic/bacindex.jpg',
  '/pic/bg.avif',
  '/pic/huruf.jpg',
  '/pic/logo.png',
  '/pic/ncs.jpeg',
  '/pic/ratherbe.jpeg',
  '/pic/thefatrat.jpg'
];


// Install Service Worker dan cache aset statis
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          console.log('Caching assets');
          return Promise.all(
            ASSETS_TO_CACHE.map(asset => {
              return cache.add(asset).catch(err => {
                console.error('Failed to cache asset:', asset, err);
              });
            })
          );
        })
        .catch((error) => {
          console.error('Failed to cache assets:', error);
        })
    );
  });
  
  // Aktifkan Service Worker dan hapus cache lama
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              console.log('Deleting old cache:', cache);
              return caches.delete(cache);
            }
          })
        );
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Jika aset ditemukan di cache, kembalikan
                if (response) {
                    return response;
                }
                // Jika tidak ada di cache, coba ambil dari jaringan
                return fetch(event.request).catch(() => {
                    // Jika gagal mengambil dari jaringan, kembalikan halaman offline
                    return caches.match('/offline.html');
                });
            })
    );
});
  