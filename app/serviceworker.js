"use strict";
let cache = 'my_little_pwa';
let filesToCache = ['index.html'];

self.addEventListener('install', function (e) {
    console.log("install");
    e.waitUntil(caches.open(cache).then(function (cache) {
        return cache.addAll(filesToCache).then(() => console.log('assets added to cache')).catch(err => console.log("Error while fetching assets", err));
    }))
});

self.addEventListener("activate", event => {
   // console.log("activate!");
});

self.addEventListener("fetch", function(event){
   // console.log("Fetch", event.request);
});

self.addEventListener("push", event => {
    const title = 'KWM-Push Nachricht';
    const options = {
        body: event.data.text()
    };
    event.waitUntil(self.registration.showNotification(title,options));
});