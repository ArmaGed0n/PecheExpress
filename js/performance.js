
/* Gestion des performances Pêche Express */
(function () {
  "use strict";

  const KEY = "pe_perf_mode_v1";
  const AUTO_KEY = "pe_perf_auto_v1";
  const MOTION_KEY = "pe_reduce_motion_v1";

  const valid = ["performance", "balanced", "economy"];

  let mode = "balanced";
  let auto = true;
  let reducedMotion = false;
  let lastFrame = 0;

  // Lecture sécurisée des préférences
  try {
    const savedMode = localStorage.getItem(KEY);

    if (valid.includes(savedMode)) {
      mode = savedMode;
    }

    auto = localStorage.getItem(AUTO_KEY) !== "0";
    reducedMotion = localStorage.getItem(MOTION_KEY) === "1";
  } catch (_) {}

  // Sauvegarde sécurisée
  function save(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (_) {}
  }

  // Mode réellement appliqué
  function getEffectiveMode() {
    return auto && document.hidden ? "economy" : mode;
  }

  // Application des paramètres
  function apply() {
    const body = document.body;

    if (!body) return;

    const effective = getEffectiveMode();

    body.classList.toggle(
      "pe-perf-economy",
      effective === "economy"
    );

    body.classList.toggle(
      "pe-perf-balanced",
      effective === "balanced"
    );

    body.classList.toggle(
      "pe-reduced-motion",
      reducedMotion
    );
  }

  // Mise à disposition des fonctions globales
  window.peGetPerformanceMode = () => mode;

  window.peGetEffectivePerformanceMode = getEffectiveMode;

  window.peIsAutoPerformance = () => auto;

  window.peIsReducedMotion = () => reducedMotion;

  // Limitation du nombre de FPS
  window.pePerfShouldRenderFrame = () => {
    if (document.hidden) return false;

    const effective = getEffectiveMode();

    const fps =
      effective === "performance" ? 60 :
      effective === "economy" ? 15 :
      30;

    const interval = 1000 / fps;
    const now = performance.now();

    // Première frame immédiatement autorisée
    if (lastFrame !== 0 && now - lastFrame < interval - 1) {
      return false;
    }

    lastFrame = now;
    return true;
  };

  // Changement du mode de performance
  window.setPePerformanceMode = value => {
    if (!valid.includes(value)) return;

    mode = value;
    lastFrame = 0;

    save(KEY, mode);

    apply();

    if (typeof window.renderProfile === "function") {
      window.renderProfile();
    }
  };

  // Activation / désactivation du mode automatique
  window.togglePeAutoPerformance = () => {
    auto = !auto;
    lastFrame = 0;

    save(AUTO_KEY, auto ? "1" : "0");

    apply();

    if (typeof window.renderProfile === "function") {
      window.renderProfile();
    }
  };

  // Activation / désactivation des animations réduites
  window.togglePeReducedMotion = () => {
    reducedMotion = !reducedMotion;

    save(MOTION_KEY, reducedMotion ? "1" : "0");

    apply();

    if (typeof window.renderProfile === "function") {
      window.renderProfile();
    }
  };

  // Gestion du changement de visibilité
  document.addEventListener("visibilitychange", () => {
    lastFrame = 0;
    apply();
  });

  // Initialisation sécurisée du DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, {
      once: true
    });
  } else {
    apply();
  }
})();
