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
          console.log('Service Worker: Caching Files');
            return cache.addAll(cache_assets);
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
    console.log('Service Worker: Fetching');
    event.respondWith(
        caches.match(event.request).then(
            (response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(
                    () => caches.match('offline.html')
                );
            }
        )
    );
});
  