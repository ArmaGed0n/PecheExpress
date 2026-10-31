/* Installation + mises à jour (service worker) — actif seulement quand le jeu est hébergé en http(s).
   Double sécurité :
   (1) le navigateur détecte un nouveau sw.js (numéro VERSION changé) ;
   (2) la page compare la « signature » des fichiers du jeu en ligne avec celle du cache -> le bandeau apparaît
       même si le numéro de VERSION n'a pas été changé. */
if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener("load", function () {
    var banner = document.getElementById("update-banner"), pendingSig = null;
    // MÊME liste que SIG_FILES dans sw.js
    var SIG_FILES = ["index.html", "css/style.css", "js/config.js", "js/sprites.js", "js/game.js", "js/leaderboard.js", "js/changelog.js", "js/pwa.js", "js/performance.js", "js/mobile-ui.js"];
    var showBanner = function () { banner.classList.add("show"); if (window.fillUpdateNotes) fillUpdateNotes(); };
    var sigOf = function (r) { return r.headers.get("etag") || r.headers.get("last-modified") || r.headers.get("content-length") || ""; };

    function remoteSig() {
      return Promise.all(SIG_FILES.map(function (f) {
        return fetch(f, { method: "HEAD", cache: "no-store" }).then(function (r) { return r.ok ? sigOf(r) : ""; });
      })).then(function (a) { return a.join("|"); });
    }
    function checkRemote() {
      if (!window.caches || !navigator.onLine) return;
      caches.match("./__sig").then(function (hit) { return hit ? hit.text() : null; }).then(function (cached) {
        if (!cached) return;
        return remoteSig().then(function (remote) {
          if (remote.split("|").some(function (s) { return !s; }) || remote === cached) return;   // un fichier ne répond pas : on ne propose rien
          var done = null; try { done = localStorage.getItem("pe_sig_done"); } catch (e) {}
          if (done === remote) return;                      // déjà tenté pour cette version : pas de boucle
          pendingSig = remote; showBanner();
        });
      }).catch(function () {});
    }

    navigator.serviceWorker.register("sw.js").then(function (reg) {
      if (reg.waiting && navigator.serviceWorker.controller) showBanner();
      reg.addEventListener("updatefound", function () {
        var w = reg.installing; if (!w) return;
        w.addEventListener("statechange", function () { if (w.state === "installed" && navigator.serviceWorker.controller) showBanner(); });
      });
      document.addEventListener("visibilitychange", function () { if (!document.hidden) { reg.update().catch(function () {}); setTimeout(checkRemote, 1500); } });
      setTimeout(checkRemote, 3000);
    }).catch(function () {});

    document.getElementById("update-btn").onclick = function () {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        if (reg && reg.waiting) { reg.waiting.postMessage("SKIP_WAITING"); return; }   // chemin normal
        // sinon : rechargement complet (vide le cache et le service worker, puis recharge)
        if (pendingSig) { try { localStorage.setItem("pe_sig_done", pendingSig); } catch (e) {} }
        return caches.keys().then(function (ks) { return Promise.all(ks.map(function (k) { return caches.delete(k); })); })
          .then(function () { return reg ? reg.unregister() : null; }).then(function () { location.reload(); });
      });
    };
    var reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", function () { if (reloaded) return; reloaded = true; location.reload(); });
  });
}
