const CACHE_NAME = "localizacep-v1";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./resultado.html",
    "./style.css",
    "./index.js",
    "./resultado.js",
    "./manifest.json"
];

// Instala o Service Worker
self.addEventListener("install", (event) => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ARQUIVOS);
            })
    );

    self.skipWaiting();
});


// Ativa o Service Worker
self.addEventListener("activate", (event) => {

    event.waitUntil(
        caches.keys().then((nomesCaches) => {

            return Promise.all(
                nomesCaches
                    .filter((nome) => nome !== CACHE_NAME)
                    .map((nome) => caches.delete(nome))
            );

        })
    );

    self.clients.claim();
});


// Intercepta as requisições
self.addEventListener("fetch", (event) => {

    event.respondWith(
        caches.match(event.request)
            .then((resposta) => {

                return resposta || fetch(event.request);

            })
    );

});