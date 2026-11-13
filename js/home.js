/* Pêche Express — écran d'accueil + barre de navigation fixe (Accueil · Pêche · Classement · Boutique · Profil) */
(function () {
  "use strict";
  const home = document.getElementById("home-screen"), nav = document.getElementById("nav-bar");
  if (!home || !nav || typeof state === "undefined") return;
  document.body.classList.add("has-nav");
  const PD = () => window.PecheExpressProfileData || null;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const num = n => Math.floor(Number(n) || 0).toLocaleString("fr-FR");
  const safeId = v => /^[a-z0-9_]{1,32}$/i.test(String(v || "")) ? String(v) : "";
  const sprite = k => { const pd = PD(); return pd ? pd.spriteSrc(k) : ""; };
  const sfx = n => { try { if (typeof playSound === "function") playSound(n); } catch (e) {} };
  const RAR = { commune: ["COMMUNE", "r-commune"], rare: ["RARE", "r-rare"], epique: ["ÉPIQUE", "r-epique"], legendaire: ["LÉGENDAIRE", "r-legendaire"] };

  let screen = "home", lastHtml = "", fetching = false, lastFetch = 0, top3 = null, top3State = "loading";
  const API = String(window.PECHE_EXPRESS_API || "").trim().replace(/\/+$/, "");
  const API_OK = /^https:\/\/[a-z0-9.-]+\/functions\/v1\/leaderboard$/i.test(API);
  const CACHE_KEY = "peche_express_home_top3_v1";
  if (!API_OK) top3State = "off";
  try { const c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null"); if (c && Array.isArray(c.rows)) { top3 = c.rows.slice(0, 3); if (API_OK) top3State = "ok"; } } catch (e) {}

  const cleanRow = r => ({
    pseudo: String((r && r.pseudo) || "Pêcheur").replace(/[<>]/g, "").slice(0, 16) || "Pêcheur",
    level: Math.max(1, Math.floor(Number(r && r.level) || 1)), fishCount: Math.max(0, Math.floor(Number(r && r.fishCount) || 0)),
    avatar: safeId(r && r.avatar) || "char_classic", frame: safeId(r && r.frame) || "bois"
  });
  async function fetchTop3(force) {
    if (!API_OK || fetching || !navigator.onLine || (!force && Date.now() - lastFetch < 45000)) return;
    fetching = true; lastFetch = Date.now();
    try {
      const res = await fetch(`${API}?category=fish&period=all&limit=3`, { headers: { Accept: "application/json" }, cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !Array.isArray(data.rows)) throw new Error("x");
      top3 = data.rows.slice(0, 3).map(cleanRow); top3State = "ok";
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), rows: top3 })); } catch (e) {}
    } catch (e) { if (!top3) top3State = "error"; }
    finally { fetching = false; renderHome(); }
  }

  const logoSvg = `<svg class="hm-logo" viewBox="0 0 176 86" aria-label="Pêche Express" role="img">
    <defs><linearGradient id="hl-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff59a"/><stop offset=".55" stop-color="#ffc21a"/><stop offset="1" stop-color="#ff8a00"/></linearGradient></defs>
    <g transform="rotate(-6 88 43)" font-family="'Arial Black',Impact,'Helvetica Neue',sans-serif" font-style="italic" font-weight="900" stroke-linejoin="round">
      <text x="8" y="40" font-size="38" fill="#fff" stroke="#0b3a82" stroke-width="9" paint-order="stroke">PÊCHE</text>
      <text x="14" y="74" font-size="31" fill="url(#hl-g)" stroke="#4a2200" stroke-width="8" paint-order="stroke">EXPRESS</text>
    </g></svg>`;

  function buildHtml() {
    const pd = PD(); if (!pd) return "";
    const rp = typeof resolvedProfile === "function" ? resolvedProfile() : { avatar: "char_classic", frame: "bois", banner: "lac", badge: 0 };
    const lvl = state.level, maxXP = lvl * 50, pct = Math.max(0, Math.min(100, Math.floor(state.xp / maxXP * 100)));
    const rk = pd.RANKS[pd.rankIndexOf(lvl)];
    const spot = (pd.SPOTS.find(s => s.id === state.spot) || pd.SPOTS[0]);
    const timeTxt = (document.getElementById("time-chip") || {}).innerText || "";
    let found = 0, total = 0;
    if (typeof SPECIES !== "undefined") SPECIES.forEach(f => { if (f.spots.includes(spot.id)) { total++; if (state.caughtFish[f.id]) found++; } });
    // quêtes
    let qDone = 0, qTotal = 0, qClaim = 0;
    try { const q = ensureQuests(); qTotal = q.daily.length; qDone = q.daily.filter(x => x.claimed).length; qClaim = claimableCount(); } catch (e) {}
    const spotsOpen = Object.keys(state.unlockedSpots || {}).length;
    // dernière prise
    let last = "";
    const lc = state.lastCatch, lf = lc && pd.SPECIES.find(f => f.id === lc.id), lfull = lc && typeof SPECIES !== "undefined" && SPECIES.find(f => f.id === lc.id);
    if (lc && lf && lfull) {
      const r = RAR[lfull.rarity] || RAR.commune, img = sprite("fish_" + lf.id);
      last = `<button class="hm-last" data-go="dex" type="button"><div class="hm-last-img">${img ? `<img src="${img}" alt="">` : `<span>${esc(lf.emoji || "🐟")}</span>`}</div>
        <div class="hm-last-main"><div class="hm-last-name">${esc(lf.name)} <span class="hm-rar ${r[1]}">${r[0]}</span></div>
        <div class="hm-last-meta"><span>📏 ${num(lc.w)} cm</span><span>⭐ +${num(lc.xp)} XP</span><span>🪙 +${num(lc.gold)}</span></div></div><span class="hm-chev">›</span></button>`;
    } else last = `<button class="hm-last empty" data-go="fish" type="button"><span>🎣 Pas encore de prise : lance ta ligne !</span><span class="hm-chev">›</span></button>`;
    // top 3
    let rows = "";
    if (top3 && top3.length) {
      rows = top3.map((r, i) => `<li class="hm-rank-row"><img class="hm-medal" src="${sprite("lb_medal_" + (i + 1))}" alt="#${i + 1}">
        <div class="hm-rank-av">${pd.frameHTML(r.frame, r.avatar, 46)}</div>
        <div class="hm-rank-name"><b>${esc(r.pseudo)}</b><small>Niveau ${num(r.level)}</small></div>
        <div class="hm-rank-sc"><b>⭐ ${num(r.fishCount)}</b><small>prises</small></div></li>`).join("");
    } else {
      const msg = top3State === "off" ? "Le classement en ligne n'est pas encore configuré." : top3State === "error" ? "Classement indisponible pour le moment." : "Chargement du classement…";
      rows = `<li class="hm-rank-empty">${msg}</li>`;
    }
    return `
    <div class="hm-hero" style="background-image:url(${sprite("spot_" + spot.id)})">
      <div class="hm-top">
        ${logoSvg}
        <button class="hm-player" data-go="profile" type="button" aria-label="Ouvrir mon profil">
          <div class="hm-av">${pd.frameHTML(rp.frame, rp.avatar, 52)}</div>
          <div class="hm-pinfo"><b>${esc(state.pseudo || "Pêcheur")}</b><small>Niveau ${lvl}</small>
            <div class="hm-xp"><i style="width:${pct}%"></i><em>${num(state.xp)} / ${num(maxXP)}</em></div></div>
        </button>
        <button class="hm-gear" data-go="settings" type="button" aria-label="Réglages"><img src="${sprite("icon_gear")}" alt=""></button>
      </div>
      <button class="hm-spot" data-go="spots" type="button" aria-label="Changer de spot">
        <span>📍 ${esc(spot.name)}</span><span>${esc(timeTxt)}</span><span>📖 ${found} / ${total} espèces</span>
      </button>
      <div class="hm-cta-row">
        <button class="hm-go" data-go="fish" type="button"><img src="${sprite("icon_hook")}" alt=""><span>ALLER PÊCHER</span><i>›</i></button>
        <div class="hm-gold" title="Argent">🪙 <b>${num(state.gold)}</b></div>
      </div>
    </div>
    <div class="hm-tiles">
      <button class="hm-tile t-blue" data-go="dex" type="button"><img src="${sprite("icon_dex")}" alt=""><span>Mes prises</span><i>›</i></button>
      <button class="hm-tile t-green" data-go="bag" type="button"><img src="${sprite("bag")}" alt=""><span>Mon équipement</span><i>›</i></button>
      <button class="hm-tile t-purple" data-go="rank" type="button"><img src="${sprite("icon_trophy")}" alt=""><span>Classement</span><i>›</i></button>
      <button class="hm-tile t-orange" data-go="shop" type="button"><img src="${sprite("icon_shop")}" alt=""><span>Boutique</span><i>›</i></button>
    </div>
    <div class="hm-duo">
      <button class="hm-card ${qClaim ? "alert" : ""}" data-go="quests" type="button"><img src="${sprite("icon_quest")}" alt="">
        <div><b>Quêtes du jour</b><small>${qDone} / ${qTotal} terminées${qClaim ? ` · <em>${qClaim} à récupérer</em>` : ""}</small>
        <div class="hm-mini"><i style="width:${qTotal ? Math.floor(qDone / qTotal * 100) : 0}%"></i></div></div></button>
      <button class="hm-card" data-go="spots" type="button"><img src="${sprite("icon_spots")}" alt="">
        <div><b>Spots de pêche</b><small>${spotsOpen} débloqué${spotsOpen > 1 ? "s" : ""}</small></div></button>
    </div>
    <div class="hm-sec"><h3>Ma dernière prise</h3><button data-go="dex" type="button">Voir tout ›</button></div>
    ${last}
    <div class="hm-sec"><h3>Top 3 du classement</h3><button data-go="rank" type="button">Voir le classement ›</button></div>
    <ul class="hm-rank">${rows}</ul>`;
  }
  function renderHome() {
    if (!home.classList.contains("show")) return;
    let html = ""; try { html = buildHtml(); } catch (e) { return; }
    if (html === lastHtml) return;
    const st = home.scrollTop; lastHtml = html; home.innerHTML = html; home.scrollTop = st;
  }

  /* ---- navigation ---- */
  const modals = () => [...document.querySelectorAll(".modal.active")];
  function closeModals() {
    modals().forEach(m => { if (m.id === "catch-modal") return; const c = m.querySelector(".close-btn"); if (c) c.click(); else m.classList.remove("active"); });
    modals().forEach(m => { if (m.id !== "catch-modal") m.classList.remove("active"); });
  }
  const click = id => { const b = document.getElementById(id); if (b) b.click(); };
  function showHome(on) {
    screen = on ? "home" : "fish";
    home.classList.toggle("show", on); document.body.classList.toggle("home-on", on);
    if (on) { lastHtml = ""; renderHome(); fetchTop3(); }
    syncNav();
  }
  function activeTab() {
    const act = id => { const el = document.getElementById(id); return !!el && el.classList.contains("active"); };
    if (act("profile-modal")) return "profile";
    if (act("leaderboard-modal") || act("player-profile-modal")) return "rank";
    if (act("shop-modal")) return "shop";
    return screen === "home" ? "home" : "fish";
  }
  function syncNav() {
    const t = activeTab();
    nav.querySelectorAll(".nav-item").forEach(b => { const on = b.dataset.nav === t; b.classList.toggle("active", on); b.setAttribute("aria-current", on ? "page" : "false"); });
    const act = id => { const el = document.getElementById(id); return !!el && el.classList.contains("active"); };
    const busy = ["HOOK", "REELING", "CATCH_VIEW"].includes(state.phase);
    if (busy && screen === "home") { screen = "fish"; home.classList.remove("show"); document.body.classList.remove("home-on"); }
    document.body.classList.toggle("nav-off", busy || act("catch-modal") || act("crate-modal"));
  }
  function go(tab) {
    if (tab === "home") { closeModals(); showHome(true); }
    else if (tab === "fish") { closeModals(); showHome(false); }
    else if (tab === "rank") { if (activeTab() !== "rank") { closeModals(); click("leaderboard-btn"); } }
    else if (tab === "shop") { if (activeTab() !== "shop") { closeModals(); click("shop-btn"); } }
    else if (tab === "profile") { if (activeTab() !== "profile") { closeModals(); click("hud-card"); if (typeof setPfTab === "function") setPfTab("profil"); } }
    syncNav();
  }
  nav.addEventListener("click", e => { const b = e.target.closest(".nav-item"); if (!b) return; sfx("ui"); go(b.dataset.nav); });
  home.addEventListener("click", e => {
    const t = e.target.closest("[data-go]"); if (!t) return; const k = t.dataset.go; sfx("ui");
    if (k === "fish") go("fish");
    else if (k === "dex") click("dex-btn");
    else if (k === "bag") click("skins-btn");
    else if (k === "rank") go("rank");
    else if (k === "shop") go("shop");
    else if (k === "quests") click("quests-btn");
    else if (k === "spots") click("spots-btn");
    else if (k === "profile") go("profile");
    else if (k === "settings") { go("profile"); if (typeof setPfTab === "function") setPfTab("reglages"); }
  });

  const mo = new MutationObserver(() => { syncNav(); if (screen === "home" && !modals().length) { lastHtml = ""; renderHome(); } });
  document.querySelectorAll(".modal").forEach(m => mo.observe(m, { attributes: true, attributeFilter: ["class"] }));
  setInterval(() => { syncNav(); if (screen === "home" && !modals().length) renderHome(); }, 1500);
  window.addEventListener("online", () => fetchTop3(true));
  window.PecheExpressHome = { show: () => go("home"), refresh: () => { lastHtml = ""; renderHome(); } };
  showHome(true);
})();
