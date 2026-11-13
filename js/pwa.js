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



/* Mises à jour PWA : installation du service worker et activation à la demande. */
(function () {
  "use strict";
  if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;

  const banner = document.getElementById("update-banner");
  const button = document.getElementById("update-btn");
  let registration = null;
  let reloading = false;
  let hasController = !!navigator.serviceWorker.controller;

  function announceUpdate() {
    if (!banner) return;
    banner.classList.add("show");
    if (typeof window.fillUpdateNotes === "function") window.fillUpdateNotes();
  }

  function checkWaiting() {
    if (registration && registration.waiting && navigator.serviceWorker.controller) {
      announceUpdate();
    }
  }

  navigator.serviceWorker.addEventListener("controllerchange", function () {
    // Le tout premier contrôle ne nécessite pas de rechargement ; les mises à jour oui.
    if (!hasController) {
      hasController = true;
      return;
    }
    if (reloading) return;
    reloading = true;
    window.location.reload();
  });

  if (button) {
    button.addEventListener("click", function () {
      if (!registration) return;
      if (registration.waiting) {
        button.disabled = true;
        registration.waiting.postMessage("SKIP_WAITING");
        return;
      }
      registration.update().then(checkWaiting).catch(function (error) {
        console.warn("Pêche Express : vérification de mise à jour impossible.", error);
      });
    });
  }

  navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" }).then(function (reg) {
    registration = reg;

    reg.addEventListener("updatefound", function () {
      const installing = reg.installing;
      if (!installing) return;
      installing.addEventListener("statechange", function () {
        if (installing.state === "installed" && navigator.serviceWorker.controller) {
          checkWaiting();
        }
      });
    });

    checkWaiting();
    reg.update().then(checkWaiting).catch(function () {});
  }).catch(function (error) {
    console.warn("Pêche Express : service worker indisponible.", error);
  });

  function checkForUpdates() {
    if (registration && document.visibilityState === "visible") {
      registration.update().then(checkWaiting).catch(function () {});
    }
  }
  window.addEventListener("focus", checkForUpdates);
  window.addEventListener("online", checkForUpdates);
  document.addEventListener("visibilitychange", checkForUpdates);
  window.setInterval(checkForUpdates, 60 * 60 * 1000);
})();
