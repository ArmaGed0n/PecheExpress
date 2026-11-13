/* Plein écran adaptatif : détection par capacités plutôt que par modèle d'appareil.
   iOS Safari ne permet pas requestFullscreen sur une page web ; une PWA iOS
   installée utilise le mode standalone déclaré par les métadonnées Apple.
   Android et les navigateurs compatibles peuvent entrer en fullscreen après
   le premier geste utilisateur (obligation des navigateurs). */
(function () {
  var root = document.documentElement;
  var ua = navigator.userAgent || "";
  var isIOS = /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);
  var standalone = !!(navigator.standalone) ||
    (window.matchMedia && (
      matchMedia("(display-mode: standalone)").matches ||
      matchMedia("(display-mode: fullscreen)").matches
    ));
  var coarsePointer = !!(window.matchMedia && matchMedia("(pointer: coarse)").matches);

  root.classList.toggle("device-ios", isIOS);
  root.classList.toggle("device-android", isAndroid);
  root.classList.toggle("app-installed", standalone);
  root.classList.toggle("touch-device", coarsePointer);

  function isFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
  }
  function syncFullscreenState() {
    root.classList.toggle("is-fullscreen", isFullscreen() || standalone);
  }
  document.addEventListener("fullscreenchange", syncFullscreenState);
  document.addEventListener("webkitfullscreenchange", syncFullscreenState);
  syncFullscreenState();

  // L'API n'est pas disponible sur iOS Safari : ne pas tenter de la simuler.
  var request = root.requestFullscreen || root.webkitRequestFullscreen;
  if (!request || isIOS || standalone || !coarsePointer) return;

  var attempted = false;
  function enterOnFirstGesture() {
    if (attempted || isFullscreen()) return;
    attempted = true;
    try {
      var result = request.call(root, { navigationUI: "hide" });
      if (result && typeof result.catch === "function") {
        result.catch(function () {
          // Le navigateur peut refuser : le jeu reste utilisable en plein cadre.
        });
      }
    } catch (e) {
      // Repli sans fullscreen natif.
    }
  }
  document.addEventListener("pointerup", enterOnFirstGesture, {
    capture: true,
    passive: true,
    once: true
  });
})();

/* Mises à jour PWA : détecte les nouvelles versions et propose de les appliquer. */
(function () {
  if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;

  var reloading = false;
  var scriptUrl = document.currentScript && document.currentScript.src;
  var workerUrl = scriptUrl ? new URL("../sw.js", scriptUrl).href : new URL("./sw.js", location.href).href;
  var workerScope = new URL("./", workerUrl).pathname;

  function reloadOnce() {
    if (reloading) return;
    reloading = true;
    window.location.reload();
  }

  function offerUpdate(worker, firstInstall) {
    var banner = document.getElementById("update-banner");
    var button = document.getElementById("update-btn");
    var title = document.getElementById("ub-title");
    if (!banner || !button) return;

    banner.classList.add("show");
    if (title) title.textContent = firstInstall
      ? "🎣 Préparation des mises à jour terminée !"
      : "🎣 Mise à jour prête à installer !";
    button.textContent = firstInstall ? "Actualiser" : "Mettre à jour";
    button.disabled = false;
    button.onclick = function () {
      button.disabled = true;
      button.textContent = firstInstall ? "Actualisation…" : "Mise à jour…";
      if (worker && worker.state !== "activated") {
        // Écouter avant SKIP_WAITING pour ne pas manquer controllerchange.
        navigator.serviceWorker.addEventListener("controllerchange", reloadOnce, { once: true });
        worker.postMessage("SKIP_WAITING");
      } else {
        reloadOnce();
      }
    };
  }

  navigator.serviceWorker.addEventListener("controllerchange", function () {
    // Une mise à jour d'une application déjà contrôlée peut recharger automatiquement.
    if (reloading) return;
    reloading = true;
    window.location.reload();
  });

  navigator.serviceWorker.register(workerUrl, {
    scope: workerScope,
    updateViaCache: "none"
  }).then(function (registration) {
    function watchInstalling(worker) {
      if (!worker) return;
      worker.addEventListener("statechange", function () {
        if (worker.state !== "installed") return;
        if (registration.waiting) {
          offerUpdate(registration.waiting, false);
        } else if (!navigator.serviceWorker.controller) {
          // Première installation : pas de worker en attente, mais il faut proposer
          // un rechargement pour que la page soit servie depuis le cache préparé.
          offerUpdate(worker, true);
        }
      });
    }

    if (registration.waiting) {
      offerUpdate(registration.waiting, !navigator.serviceWorker.controller);
    }
    if (registration.installing) watchInstalling(registration.installing);

    registration.addEventListener("updatefound", function () {
      watchInstalling(registration.installing);
    });

    // Vérification au démarrage, au retour au premier plan et au focus.
    registration.update().catch(function () {});
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") registration.update().catch(function () {});
    });
    window.addEventListener("focus", function () {
      registration.update().catch(function () {});
    });
  }).catch(function (error) {
    console.warn("Pêche Express : impossible d'enregistrer les mises à jour hors ligne.", error);
  });
})();
