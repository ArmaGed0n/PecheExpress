/* Classement en ligne — Netlify Functions. Les scores sont calculés côté serveur à partir des événements de capture. */
(() => {
  "use strict";
  const API = String(window.PECHE_EXPRESS_API || "").trim().replace(/\/+$/, "");
  const API_OK = "https://sczeztgjbzgefnwiysla.supabase.co/functions/v1/bright-api";   // adresse de la fonction Supabase (voir js/config.js)
  const NOT_CONFIGURED = "Le classement en ligne n'est pas encore configuré (adresse Supabase manquante dans js/config.js).";
  const PLAYER_KEY = "peche_express_leaderboard_player_v1";
  const PSEUDO_KEY = "peche_express_leaderboard_pseudo_v1";
  const QUEUE_KEY = "peche_express_leaderboard_queue_v1";
  const PID_KEY = "peche_express_leaderboard_pid_v1";        // identifiant PUBLIC du joueur (jamais l'identifiant privé)
  const SYNC_KEY = "peche_express_leaderboard_profile_v1";   // dernier profil synchronisé avec le serveur
  const PUBLIC_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const SAFE_ID = /^[a-z0-9_]{1,32}$/i;
  const modal = document.getElementById("leaderboard-modal");
  if (!modal) return;
  const list = document.getElementById("leaderboard-list");
  const status = document.getElementById("leaderboard-status");
  const pseudoInput = document.getElementById("leaderboard-pseudo");
  const savePseudoButton = document.getElementById("leaderboard-save-pseudo");
  const state = { category: "level", period: "all", loading: false, queue: [], flushTimer: null };

  function getPlayerId() {
    try {
      let id = localStorage.getItem(PLAYER_KEY);
      if (id && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) return id;
      id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : makeUuidFallback();
      localStorage.setItem(PLAYER_KEY, id);
      return id;
    } catch (_) { return makeUuidFallback(); }
  }
  function makeUuidFallback() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === "x" ? r : (r & 3 | 8)).toString(16);
    });
  }
  const playerId = getPlayerId();
  function cleanPseudo(value) {
    return String(value || "").normalize("NFKC").replace(/[<>\u0000-\u001f\u007f]/g, "").trim().replace(/\s+/g, " ").slice(0, 16) || "Pêcheur";
  }
  function getPseudo() {
    const bridge = window.PecheExpressLeaderboardBridge;
    if (bridge && bridge.getPseudo()) return cleanPseudo(bridge.getPseudo());
    try { return cleanPseudo(localStorage.getItem(PSEUDO_KEY) || "Pêcheur"); } catch (_) { return "Pêcheur"; }
  }
  function setStatus(message, error = false) {
    status.textContent = message;
    status.classList.toggle("error", error);
  }
  function formatScore(row) {
    if (state.category === "level") return `Niv. ${Number(row.level) || 1}`;
    if (state.category === "fish") return `${Number(row.fishCount) || 0} poissons`;
    return `${Number(row.biggestFishCm) || 0} cm`;
  }
  function spriteSrc(key) { const s = window.SPRITES && window.SPRITES[key]; return s && s.src ? s.src : ""; }
  const PD = () => window.PecheExpressProfileData || null;
  const safe = v => SAFE_ID.test(String(v || "")) ? String(v) : "";
  const titleName = id => { const pd = PD(); const t = pd && pd.TITLES.find(x => x.id === id); return t && t.id !== "none" ? t.name : ""; };
  const myPid = () => { try { return localStorage.getItem(PID_KEY) || ""; } catch (_) { return ""; } };
  function avatarHTML(frame, avatar, size) {
    const pd = PD();
    return pd ? pd.frameHTML(safe(frame) || "bois", safe(avatar) || "char_classic", size) : "";
  }
  function addRow(row, index) {
    const li = document.createElement("li");
    li.className = "leaderboard-row" + (index < 3 ? " is-top-" + (index + 1) : "");
    const pid = PUBLIC_ID_RE.test(String(row.pid || "")) ? String(row.pid) : "";
    if (pid) { li.dataset.pid = pid; li.tabIndex = 0; li.setAttribute("role", "button"); li.classList.add("is-link"); if (pid === myPid()) li.classList.add("is-me"); }
    const rank = document.createElement("div"); rank.className = "leaderboard-rank";
    const medal = index < 3 ? spriteSrc("lb_medal_" + (index + 1)) : "";
    if (medal) { const img = document.createElement("img"); img.src = medal; img.alt = "#" + (index + 1); rank.appendChild(img); }
    else { rank.classList.add("is-plain"); rank.textContent = `#${index + 1}`; }
    const av = document.createElement("div"); av.className = "leaderboard-av"; av.innerHTML = avatarHTML(row.frame, row.avatar, 50);
    const player = document.createElement("div"); player.className = "leaderboard-player";
    const name = document.createElement("div"); name.className = "leaderboard-name"; name.textContent = cleanPseudo(row.pseudo);
    if (pid && pid === myPid()) { const me = document.createElement("span"); me.className = "leaderboard-me"; me.textContent = "Toi"; name.appendChild(me); }
    const meta = document.createElement("div"); meta.className = "leaderboard-meta"; meta.textContent = titleName(row.title) || `Niveau ${Number(row.level) || 1}`;
    const score = document.createElement("div"); score.className = "leaderboard-score"; score.textContent = formatScore(row);
    player.append(name, meta); li.append(rank, av, player, score); list.appendChild(li);
  }
  /* ---- Fiche joueur ---- */
  const pModal = document.getElementById("player-profile-modal");
  const pBody = document.getElementById("player-profile-body");
  function statTile(icon, value, label) {
    const d = document.createElement("div"); d.className = "pf-tile";
    const img = document.createElement("img"); img.src = spriteSrc(icon); img.alt = "";
    const b = document.createElement("b"); b.textContent = value; const s = document.createElement("span"); s.textContent = label;
    d.append(img, b, s); return d;
  }
  function renderPlayerProfile(p) {
    const pd = PD(); if (!pd) return;
    const ri = pd.rankIndexOf(Number(p.level) || 1), rank = pd.RANKS[ri];
    const frame = safe(p.frame) || "bois", avatar = safe(p.avatar) || "char_classic", banner = safe(p.banner) || "lac";
    const badge = Math.min(4, Math.max(0, Number.isInteger(p.badge) ? p.badge : ri));
    pBody.replaceChildren();
    const card = document.createElement("div"); card.className = "pf-card"; card.style.setProperty("--rc", rank.color);
    const ban = document.createElement("div"); ban.className = "pf-ban"; ban.style.backgroundImage = `url(${spriteSrc("spot_" + banner)})`;
    const fa = document.createElement("div"); fa.innerHTML = avatarHTML(frame, avatar, 108);
    const id = document.createElement("div"); id.className = "pf-id";
    const nm = document.createElement("div"); nm.className = "pf-name"; nm.textContent = cleanPseudo(p.pseudo);
    id.appendChild(nm);
    const tn = titleName(p.title);
    if (tn) { const t = document.createElement("div"); t.className = "pf-title"; const ic = document.createElement("img"); ic.src = spriteSrc("icon_trophy"); ic.alt = ""; const sp = document.createElement("span"); sp.textContent = tn; t.append(ic, sp); id.appendChild(t); }
    const bd = document.createElement("img"); bd.className = "pf-badge"; bd.src = spriteSrc("rank_" + badge); bd.alt = "";
    const wrap = document.createElement("div"); wrap.className = "pf-avwrap"; wrap.append(fa.firstElementChild || fa, bd);
    card.append(ban, wrap, id); pBody.appendChild(card);
    const lv = document.createElement("div"); lv.className = "pf-lvl"; lv.style.setProperty("--rc", rank.color);
    const top = document.createElement("div"); top.className = "pf-lvl-top";
    const rn = document.createElement("span"); rn.className = "pf-rankname"; rn.textContent = rank.name;
    const nv = document.createElement("span"); nv.className = "pf-niv"; nv.textContent = "NIV. " + (Number(p.level) || 1);
    top.append(rn, nv); lv.appendChild(top); pBody.appendChild(lv);
    const grid = document.createElement("div"); grid.className = "pf-grid";
    grid.append(statTile("lb_crown", "#" + (Number(p.position) || "–"), "au classement"), statTile("fish_truite", Number(p.fishCount) || 0, "prises"), statTile("icon_ruler", Number(p.biggestFishCm) || 0, "record (cm)"));
    pBody.appendChild(grid);
    const fish = pd.SPECIES.find(f => f.id === p.favFish);
    const sec = document.createElement("div"); sec.className = "pf-sec"; sec.textContent = "Poisson favori"; pBody.appendChild(sec);
    const fav = document.createElement("div"); fav.className = "pf-fav";
    if (fish) {
      const im = spriteSrc("fish_" + fish.id);
      const box = document.createElement("div"); box.className = "pf-fimg";
      if (im) { const i = document.createElement("img"); i.src = im; i.alt = fish.name; box.appendChild(i); } else box.textContent = fish.emoji || "🐟";
      const tx = document.createElement("div"); const b = document.createElement("b"); b.textContent = fish.name;
      const sm = document.createElement("small"); sm.textContent = (Number(p.favFishCm) ? "Record : " + Number(p.favFishCm) + " cm" : "Poisson préféré");
      tx.append(b, sm); fav.append(box, tx);
    } else { fav.classList.add("empty"); fav.textContent = "Pas encore de poisson favori."; }
    pBody.appendChild(fav);
    const foot = document.createElement("div"); foot.className = "inv-note";
    foot.textContent = `Cette semaine : ${Number(p.weeklyFish) || 0} prise${(Number(p.weeklyFish) || 0) > 1 ? "s" : ""}` + (p.memberSince ? ` · Classé depuis le ${String(p.memberSince).slice(0, 10).split("-").reverse().join("/")}` : "");
    pBody.appendChild(foot);
  }
  async function openPlayerProfile(pid) {
    if (!pModal || !API_OK || !PUBLIC_ID_RE.test(pid)) return;
    pBody.replaceChildren(); const loading = document.createElement("div"); loading.className = "leaderboard-status"; loading.textContent = "Chargement du profil…"; pBody.appendChild(loading);
    pModal.classList.add("active");
    try {
      const response = await fetch(`${API}?profile=${encodeURIComponent(pid)}`, { method: "GET", headers: { "Accept": "application/json" }, cache: "no-store", credentials: "same-origin" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.profile) throw new Error(data.error || "Profil indisponible.");
      renderPlayerProfile(data.profile);
    } catch (error) { loading.textContent = error.message || "Profil indisponible."; loading.classList.add("error"); }
  }
  list.addEventListener("click", event => { const li = event.target.closest(".leaderboard-row[data-pid]"); if (li) openPlayerProfile(li.dataset.pid); });
  list.addEventListener("keydown", event => { if (event.key !== "Enter" && event.key !== " ") return; const li = event.target.closest(".leaderboard-row[data-pid]"); if (li) { event.preventDefault(); openPlayerProfile(li.dataset.pid); } });
  if (pModal) {
    document.getElementById("close-player-profile").addEventListener("click", () => pModal.classList.remove("active"));
    pModal.addEventListener("click", event => { if (event.target === pModal) pModal.classList.remove("active"); });
  }
  /* ---- Synchronisation du profil (cadre, avatar, bannière, titre, badge, poisson favori, pseudo) ---- */
  let syncTimer = null, syncing = false;
  async function syncProfile() {
    const bridge = window.PecheExpressLeaderboardBridge;
    if (!API_OK || syncing || !bridge || !bridge.getProfile || !navigator.onLine) return;
    const profile = bridge.getProfile(), pseudo = getPseudo();
    const signature = JSON.stringify([pseudo, profile]);
    let last = ""; try { last = localStorage.getItem(SYNC_KEY) || ""; } catch (_) {}
    if (signature === last) return;
    syncing = true;
    try {
      const response = await fetch(API, { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ action: "profile", playerId, pseudo, profile }) });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.pid && PUBLIC_ID_RE.test(data.pid)) {
        try { localStorage.setItem(SYNC_KEY, signature); localStorage.setItem(PID_KEY, data.pid); } catch (_) {}
        if (modal.classList.contains("active")) loadLeaderboard();
      } else if (response.status === 429) {
        clearTimeout(syncTimer); syncTimer = setTimeout(syncProfile, 2600);
      } // 404 : pas encore classé, on réessaiera après la première prise synchronisée
    } catch (_) { /* hors ligne : réessai au retour du réseau */ }
    finally { syncing = false; }
  }
  function scheduleSync(delay) { clearTimeout(syncTimer); syncTimer = setTimeout(syncProfile, delay || 600); }
  window.addEventListener("pe:profile-changed", () => scheduleSync(300));
  window.addEventListener("online", () => scheduleSync(800));
  setTimeout(syncProfile, 2500);
  async function loadLeaderboard() {
    if (state.loading) return;
    if (!API_OK) { list.replaceChildren(); setStatus(NOT_CONFIGURED, true); return; }
    state.loading = true;
    list.replaceChildren();
    setStatus("Chargement du classement…");
    try {
      const url = `${API}?category=${encodeURIComponent(state.category)}&period=${encodeURIComponent(state.period)}&limit=100`;
      const response = await fetch(url, { method: "GET", headers: { "Accept": "application/json" }, cache: "no-store", credentials: "same-origin" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || (response.status === 503 ? "Le classement n'est pas encore configuré sur Netlify." : response.status === 404 ? "Le classement n'est pas installé sur ce site (fonction serveur absente)." : "Impossible de charger le classement."));
      const rows = Array.isArray(data.rows) ? data.rows : [];
      if (!rows.length) setStatus("Pas encore de score. Fais une prise avec une connexion Internet pour apparaître ici.");
      else { setStatus(`${rows.length} joueur${rows.length > 1 ? "s" : ""} classé${rows.length > 1 ? "s" : ""}`); rows.forEach(addRow); }
    } catch (error) {
      setStatus(error.message || "Connexion au classement impossible. Le jeu reste jouable hors ligne.", true);
    } finally { state.loading = false; }
  }
  async function postCatch(item) {
    const response = await fetch(API, {
      method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ playerId, pseudo: item.pseudo, fishId: item.fishId, weightCm: item.weightCm, level: item.level, xp: item.xp })
    });
    const data = await response.json().catch(() => ({}));
    if (response.status === 429) { const error = new Error("rate_limited"); error.retryAfter = 3200; throw error; }
    if (!response.ok) {
      const error = new Error(data.error || "Envoi du score impossible.");
      // refus définitif du serveur (ex. 400 capture invalide) : on abandonne cette prise au lieu de bloquer la file
      error.permanent = response.status >= 400 && response.status < 500 && ![404, 408, 429].includes(response.status);
      throw error;
    }
    if (data && data.player && PUBLIC_ID_RE.test(String(data.player.pid || ""))) { try { localStorage.setItem(PID_KEY, data.player.pid); } catch (_) {} }
    return data;
  }
  function readQueue() {
    try { const parsed = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]"); return Array.isArray(parsed) ? parsed.slice(-100) : []; } catch (_) { return []; }
  }
  function writeQueue() { try { localStorage.setItem(QUEUE_KEY, JSON.stringify(state.queue.slice(-100))); } catch (_) {} }
  async function flushQueue() {
    if (!API_OK) return;
    if (state.flushTimer || !navigator.onLine || !state.queue.length) return;
    const item = state.queue[0];
    try {
      await postCatch(item);
      state.queue.shift(); writeQueue();
      scheduleSync(1500);
      if (modal.classList.contains("active")) loadLeaderboard();
      if (state.queue.length) state.flushTimer = setTimeout(() => { state.flushTimer = null; flushQueue(); }, 3200);
    } catch (error) {
      // Les prises hors connexion sont mises en attente. Les événements trop rapprochés sont réessayés après le délai serveur.
      if (error.retryAfter) {
        state.flushTimer = setTimeout(() => { state.flushTimer = null; flushQueue(); }, error.retryAfter);
      } else if (error.permanent) {
        state.queue.shift(); writeQueue();
        if (state.queue.length) state.flushTimer = setTimeout(() => { state.flushTimer = null; flushQueue(); }, 3200);
      } else {
        if (navigator.onLine) console.warn("Pêche Express : envoi du classement différé.", error);
      }
    }
  }
  state.queue = readQueue();
  window.addEventListener("online", flushQueue);
  window.addEventListener("pe:fish-caught", event => {
    const d = event.detail || {};
    if (typeof d.fishId !== "string" || !Number.isFinite(Number(d.weightCm))) return;
    state.queue.push({
      pseudo: cleanPseudo(d.pseudo || getPseudo()),
      fishId: d.fishId,
      weightCm: Math.floor(Number(d.weightCm)),
      ...(Number.isInteger(Number(d.level)) && Number.isInteger(Number(d.xp))
        ? { level: Number(d.level), xp: Number(d.xp) } : {})
    });
    state.queue = state.queue.slice(-100); writeQueue(); flushQueue();
  });
  document.getElementById("leaderboard-btn").addEventListener("click", () => {
    pseudoInput.value = getPseudo(); modal.classList.add("active"); loadLeaderboard(); flushQueue();
  });
  document.getElementById("close-leaderboard").addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", event => { if (event.target === modal) modal.classList.remove("active"); });
  savePseudoButton.addEventListener("click", () => {
    const pseudo = cleanPseudo(pseudoInput.value);
    pseudoInput.value = pseudo;
    try { localStorage.setItem(PSEUDO_KEY, pseudo); } catch (_) {}
    const bridge = window.PecheExpressLeaderboardBridge;
    if (bridge) bridge.setPseudo(pseudo);
    setStatus("Pseudo enregistré. Il sera utilisé lors de tes prochaines prises.");
    scheduleSync(300);
  });
  modal.querySelectorAll("[data-lb-category]").forEach(button => button.addEventListener("click", () => {
    state.category = button.dataset.lbCategory;
    modal.querySelectorAll("[data-lb-category]").forEach(b => b.classList.toggle("active", b === button));
    loadLeaderboard();
  }));
  modal.querySelectorAll("[data-lb-period]").forEach(button => button.addEventListener("click", () => {
    state.period = button.dataset.lbPeriod;
    modal.querySelectorAll("[data-lb-period]").forEach(b => b.classList.toggle("active", b === button));
    loadLeaderboard();
  }));
  // Keep an offline game playable; queued catches sync when the connection returns.
  if (navigator.onLine) flushQueue();
  const customizeBtn = document.getElementById("leaderboard-customize");
  if (customizeBtn) customizeBtn.addEventListener("click", () => {
    const bridge = window.PecheExpressLeaderboardBridge;
    if (bridge && bridge.openCustomize) { modal.classList.remove("active"); bridge.openCustomize(); }
  });
})();
