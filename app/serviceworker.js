"use strict";
let cache = 'my_little_pwa';
let filesToCache = ['index.html'];

self.addEventListener('install', function (e) {
    console.log("install");
    e.waitUntil(caches.open(cache).then(function (cache) {
        return cache.addAll(filesToCache).then(() => console.log('assets added to cache')).catch(err => console.log("Error while fetching assets", err));
    }))
});

self.addEventListener("active", event => {
    console.log("activate!");
});

self.addEventListener("fetch", event => {
    console.log("fetch!");
});

//TODO: Push Message