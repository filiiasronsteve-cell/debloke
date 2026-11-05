// DEBLOKE Ajan : app la louvri menm san entènèt.
// Paj yo : entènèt an premye, sinon kopi ki sou telefòn nan. Demann Supabase yo PA janm kache isit la.
// Kare kat OpenStreetMap yo : kopi sou telefòn nan an premye (zòn ajan an deja gade yo parèt san entènèt).
var CACHE = "debloke-ajan-v16";
var FONTS = "debloke-font-v1";
var TILES = "debloke-kat-v1";
var FILES = ["./", "index.html", "i18n.js", "manifest.json", "../icon-192.png", "../icon-512.png",
  "vendor/leaflet/leaflet.js", "vendor/leaflet/leaflet.css", "vendor/leaflet/images/layers.png", "vendor/leaflet/images/layers-2x.png"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }));
  self.skipWaiting();
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k.indexOf("debloke-ajan-") === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});
var nTiles = 0;
function trimTiles() {
  caches.open(TILES).then(function (c) { c.keys().then(function (ks) { if (ks.length > 3000) for (var i = 0; i < ks.length - 3000; i++) c.delete(ks[i]); }); });
}
self.addEventListener("fetch", function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (u.hostname === "tile.openstreetmap.org") {
    e.respondWith(caches.open(TILES).then(function (c) {
      return c.match(e.request).then(function (m) {
        return m || fetch(e.request).then(function (r) { if (r.ok || r.type === "opaque") { c.put(e.request, r.clone()); if (++nTiles % 200 === 0) trimTiles(); } return r; });
      });
    }));
    return;
  }
  if (u.hostname === "fonts.googleapis.com" || u.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(FONTS).then(function (c) {
      return c.match(e.request).then(function (m) {
        return m || fetch(e.request).then(function (r) { if (r.ok || r.type === "opaque") c.put(e.request, r.clone()); return r; });
      });
    }));
    return;
  }
  if (u.origin !== location.origin) return;
  e.respondWith(fetch(e.request, { cache: "no-cache" }).then(function (r) {
    if (r.ok) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
    return r;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true }).then(function (m) { return m || caches.match("index.html"); });
  }));
});
