const CACHE_VERSION = "wavey-audio-navigator-1.1.0";
const APP_CACHE = `${CACHE_VERSION}-app-shell`;
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app/config.js",
  "./app/media.js",
  "./app/waveform-analysis.js",
  "./app/playback.js",
  "./app/settings-i18n.js",
  "./app/pwa-updates.js",
  "./app/advanced-sound.js",
  "./app/events.js",
  "./vendor/soundtouchjs-audio-worklet/soundtouch-processor.js",
  "./vendor/soundtouchjs-audio-worklet/LICENSE",
  "./pwa.webmanifest",
  "./favicon.ico",
  "./favicon.png",
  "./privacy-policy.html",
  "./assets/fonts/material-symbols/MaterialSymbolsSharp-Filled.ttf",
  "./assets/icons/icon-16.png",
  "./assets/icons/icon-32.png",
  "./assets/icons/icon-48.png",
  "./assets/icons/icon-128.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/soundfindericon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then((cache) => cache.addAll(APP_SHELL.map((url) => new Request(url, { cache: "reload" })))),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => (
            key.startsWith("audionavigator-") || key.startsWith("wavey-audio-navigator-")
          ) && key !== APP_CACHE)
          .map((key) => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, "./index.html"));
    return;
  }

  event.respondWith(cacheFirst(request));
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    event.waitUntil(self.skipWaiting());
  }
});

async function cacheFirst(request) {
  if (isFreshnessCriticalRequest(request)) {
    return networkFirst(request, request.url);
  }

  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(APP_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request, fallbackUrl) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(APP_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request, { ignoreSearch: true });
    return cached || caches.match(fallbackUrl);
  }
}

function isFreshnessCriticalRequest(request) {
  const { pathname } = new URL(request.url);
  return pathname.includes("/app/")
    || pathname.includes("/vendor/")
    || pathname.endsWith("/styles.css")
    || pathname.endsWith("/pwa.webmanifest")
    || pathname.endsWith("/service-worker.js");
}
