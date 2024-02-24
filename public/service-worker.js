// service-worker.js

// Installation of the Service Worker
self.addEventListener('install', function(event) {
    // Cache application resources
    event.waitUntil(
        caches.open('v2').then(function(cache) { // Updated cache version to 'v2'
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/music.mp3',
                '/css/style.css',
                '/icon.png'
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

// Intercept network requests
self.addEventListener('fetch', function(event) {
    var request = event.request;
    // Create a new URL object to manipulate the request URL
    var url = new URL(request.url);
    // Strip the search part of the URL (the query string) to ignore the cache-busting parameter
    url.search = '';
    // Create a new request object with the updated URL
    var newRequest = new Request(url, {
        method: request.method,
        headers: request.headers,
        mode: 'same-origin', // need to use 'same-origin' to keep the security policy
        credentials: request.credentials,
        redirect: request.redirect
    });

    event.respondWith(
        caches.match(newRequest).then(function(response) {
            // If the resource is in the cache, return it
            if (response) {
                return response;
            }
            // Otherwise, perform a network request
            return fetch(event.request);
        })
    );
});

// In your service-worker.js, add a handler for messages from the web page
self.addEventListener('message', function(event) {
    if (event.data === 'skipWaiting') {
        self.skipWaiting().then(r => console.log('skipWaiting'));
    }
});
