// Version du cache
var cacheVersion = 'v2';

// Installation du Service Worker
self.addEventListener('install', function(event) {
    // Mise en cache des ressources de l'application
    event.waitUntil(
        caches.open(cacheVersion).then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/manifest.json',
                '/music.mp3',
                '/icon.png'
                // Ajoutez d'autres ressources à mettre en cache ici
            ]);
        })
    );
});

// Activation du Service Worker
self.addEventListener('activate', function(event) {
    // Suppression des anciens caches
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName !== cacheVersion;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );

    // Forcer le service worker à s'activer dès qu'il est mis à jour
    self.clients.claim().then(() => console.log('Service Worker activé'));
});

// Gestion des messages depuis la page web
self.addEventListener('message', function(event) {
    if (event.data === 'skipWaiting') {
        self.skipWaiting().then(function() {
            console.log('Le Service Worker est maintenant actif');
            // Recharger la page après la mise à jour du cache
            self.clients.matchAll().then(function(clients) {
                clients.forEach(function(client) {
                    client.postMessage('reloadPage');
                });
            });
        });
    }
});

// Gestion des requêtes
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request).then(function(response) {
                if (response) {
                    return response;
                } else if (event.request.mode === 'navigate') {
                    alert('Vous n\'êtes pas connecté à internet');
                    return caches.match('/index.html');
                }
            });
        })
    );
});
