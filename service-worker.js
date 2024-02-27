// service-worker.js

// Installation of the Service Worker
self.addEventListener('install', function(event) {
    // Cache application resources
    event.waitUntil(
        caches.open('v2').then(function(cache) { // Updated cache version to 'v2'
            return cache.addAll([
                '/',
                '/public/index.html',
                '/public/manifest.json',
                '/public/music.mp3',
                '/public/icon.png'
                // Add other resources to cache here
            ]);
        })
    );
});

// Activation of the Service Worker
self.addEventListener('activate', function(event) {
    // Clean up old caches
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName !== 'v2'; // Updated cache version to 'v2'
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// In your service-worker.js, add a handler for messages from the web page
self.addEventListener('message', function(event) {
    if (event.data === 'skipWaiting') {
        self.skipWaiting().then(r => console.log('skipWaiting'));
    }
});

// si il n'y a pas de connexion internet, on affiche une page index.html
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match('/public/index.html');
        })
    );
});
