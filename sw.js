/* Service worker de Pêche Express.
   >>> À CHAQUE MISE À JOUR : change le numéro de VERSION ci-dessous (ex. 1.0.4). <<<
   (Même si tu l'oublies, le jeu détecte tout de même les fichiers modifiés grâce à la « signature » ci-dessous.) */
const VERSION = "1.0.13";
const CACHE = "peche-express-" + VERSION;
// fichiers indispensables : si l'un manque, la nouvelle version n'est PAS installée (l'ancienne continue de marcher)
const CORE = ["./", "./index.html", "./css/style.css", "./js/config.js", "./js/sprites.js", "./js/game.js", "./js/leaderboard.js", "./js/changelog.js", "./js/pwa.js", "./manifest.webmanifest", "./changelog.json"];
// icônes : si l'une échoue, ce n'est pas grave
const EXTRA = ["./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png", "./icons/favicon.png"];
// fichiers surveillés pour détecter une mise à jour (doit être la MÊME liste que SIG_FILES dans js/pwa.js)
const SIG_FILES = ["./index.html", "./css/style.css", "./js/config.js", "./js/sprites.js", "./js/game.js", "./js/leaderboard.js", "./js/changelog.js", "./js/pwa.js"];
const sigOf = r => r.headers.get("etag") || r.headers.get("last-modified") || r.headers.get("content-length") || "";

self.addEventListener("install", e => {
  // on télécharge la nouvelle version en arrière-plan (sans passer par le cache HTTP)
  e.waitUntil((async () => {
    const c = await caches.open(CACHE), sigs = {};
    await Promise.all(CORE.map(async f => {
      const res = await fetch(new Request(f, { cache: "reload" }));
      if (!res.ok) throw new Error("Échec du cache : " + f + " (" + res.status + ")");
      await c.put(f, res.clone());
      if (SIG_FILES.includes(f)) sigs[f] = sigOf(res);
    }));
    await Promise.allSettled(EXTRA.map(async f => { const res = await fetch(new Request(f, { cache: "reload" })); if (res.ok) await c.put(f, res); }));
    await c.put("./__sig", new Response(SIG_FILES.map(f => sigs[f] || "").join("|")));   // signature de cette version
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("peche-express-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

// le joueur appuie sur « Mettre à jour » : la nouvelle version prend la main
self.addEventListener("message", e => { if (e.data === "SKIP_WAITING") self.skipWaiting(); });

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;          // scripts externes (CDN) : on ne touche pas
  if (url.pathname.endsWith("/changelog.json")) {           // notes de version : toujours la plus récente si internet
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; }).catch(() => caches.match(req)));
    return;
  }
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    }).catch(() => req.mode === "navigate" ? caches.match("./index.html") : Response.error()))
  );
});
