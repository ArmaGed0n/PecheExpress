/* Navigation mobile Pêche Express */
(function () {
  "use strict";
  const nav = document.getElementById("mobile-nav"); if (!nav) return;
  const items = Array.from(nav.querySelectorAll("[data-nav]"));
  function active(name) { items.forEach(b => { const on = b.dataset.nav === name; b.classList.toggle("active", on); if (on) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); }); }
  nav.addEventListener("click", e => {
    const b = e.target.closest("[data-nav]"); if (!b) return;
    const key = b.dataset.nav; active(key);
    if (key === "home") { document.querySelectorAll(".modal.active").forEach(m => m.classList.remove("active")); }
    if (key === "fish") { const btn = document.getElementById("action-btn"); if (btn) btn.focus({ preventScroll: true }); }
    if (key === "ranking") { const btn = document.getElementById("leaderboard-btn"); if (btn) btn.click(); }
    if (key === "shop") { const btn = document.getElementById("shop-btn"); if (btn) btn.click(); }
    if (key === "profile") { const card = document.getElementById("hud-card"); if (card) card.click(); }
  });
  document.addEventListener("click", e => {
    if (e.target.closest(".close-btn")) active("home");
  });
})();
