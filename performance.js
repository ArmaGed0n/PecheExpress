/* Gestion des performances Pêche Express */
(function () {
  "use strict";
  const KEY = "pe_perf_mode_v1", AUTO_KEY = "pe_perf_auto_v1", MOTION_KEY = "pe_reduce_motion_v1";
  const valid = ["performance", "balanced", "economy"];
  let mode = "balanced", auto = true, reducedMotion = false, lastFrame = 0;
  try { const m = localStorage.getItem(KEY); if (valid.includes(m)) mode = m; auto = localStorage.getItem(AUTO_KEY) !== "0"; reducedMotion = localStorage.getItem(MOTION_KEY) === "1"; } catch (_) {}
  const apply = () => {
    const effective = auto && document.hidden ? "economy" : mode;
    document.body.classList.toggle("pe-perf-economy", effective === "economy");
    document.body.classList.toggle("pe-perf-balanced", effective === "balanced");
    document.body.classList.toggle("pe-reduced-motion", reducedMotion);
  };
  window.peGetPerformanceMode = () => mode;
  window.peIsAutoPerformance = () => auto;
  window.peIsReducedMotion = () => reducedMotion;
  window.pePerfShouldRenderFrame = () => {
    if (document.hidden) return false;
    const fps = mode === "performance" ? 60 : mode === "economy" ? 15 : 30;
    const now = performance.now(), interval = 1000 / fps;
    if (now - lastFrame < interval - 1) return false;
    lastFrame = now; return true;
  };
  window.setPePerformanceMode = value => {
    if (!valid.includes(value)) return;
    mode = value; try { localStorage.setItem(KEY, mode); } catch (_) {}
    apply(); if (typeof window.renderProfile === "function") window.renderProfile();
  };
  window.togglePeAutoPerformance = () => {
    auto = !auto; try { localStorage.setItem(AUTO_KEY, auto ? "1" : "0"); } catch (_) {}
    apply(); if (typeof window.renderProfile === "function") window.renderProfile();
  };
  window.togglePeReducedMotion = () => {
    reducedMotion = !reducedMotion; try { localStorage.setItem(MOTION_KEY, reducedMotion ? "1" : "0"); } catch (_) {}
    apply(); if (typeof window.renderProfile === "function") window.renderProfile();
  };
  document.addEventListener("visibilitychange", apply);
  apply();
})();
