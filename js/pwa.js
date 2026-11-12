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

