// il s'agit d'une page qui ddit s'ouvrire seleument si l'utilisateur ce trouve a géolocation presise
function openSecretPage() {
    if (event.data === 'geolocation') {
        navigator.geolocation.getCurrentPosition(async function (position) {
            if (position.coords.latitude === 49.082 && position.coords.longitude === 2.006015) {
                let clients = await self.clients.matchAll();
                clients.openWindow('/secret.html').then(r => console.log('openWindow'));
            }
        });
    }
}

