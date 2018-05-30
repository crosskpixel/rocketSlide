let cacheName = "v1.0_prod";

let filesToCache = [
    "./",
    "./js/jquery-3.3.1.js",
    "./js/socket.io.slim.js",
    "./js/FileSaver.min.js",
    "./js/lz-string.min.js",
    "./js/qrcode.min.js",
    "./js/bootstrap.min.js",
    "./js/pptx2html.js",
    "./js/chart/d3.min.js",
    "./js/chart/nv.d3.min.js",
    "./css/bootstrap.min.css",
    "./css/font-awesome.min.css",
    "./css/pptx2html.css",
    "./css/custom.css",
    "./css/nv.d3.min.css",
    "./fonts/fontawesome-webfont.woff2?v=4.4.0",
    "./fonts/glyphicons-halflings-regular.woff2"
];

self.addEventListener("install", function (e) {
    console.log(e);
    console.log("Service Worker] installer");
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[ServiceWorker] Caching app shell");
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("activate", function (e) {
    console.log("[ServiceWorker] Activate");
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key != cacheName) {
                    console.log("[ServiceWorker] Removing old cache");
                    return caches.delete(key);
                }
            }))
        })
    )
});

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});

