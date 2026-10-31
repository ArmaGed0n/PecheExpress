/* Data Config */
    const RANKS = [
      { name: "Pêcheur du Dimanche", minLvl: 1, color: "#8d99ae" },
      { name: "Pêcheur de Rivière", minLvl: 3, color: "#06d6a0" },
      { name: "Pêcheur Réputé", minLvl: 6, color: "#118ab2" },
      { name: "Maître des Océans", minLvl: 10, color: "#8338ec" },
      { name: "Légende Vivante", minLvl: 15, color: "#ffd166" }
    ];

    const SPOTS = [
      { id: "lac", name: "Lac Tranquille", emoji: "🏞️", desc: "Eaux calmes pour débuter.", minLvl: 1, price: 0, sky: { dayTop: "#3a86c8", dayBot: "#bfe6f5", nightTop: "#050914", nightBot: "#1d3254" }, water: ["#2fa4c9", "#0d5a73", "#04202c"] },
      { id: "riviere", name: "Rivière Ottawa", emoji: "🌲", desc: "Courant vif, saumons et esturgeons.", minLvl: 2, price: 150, sky: { dayTop: "#4a90c2", dayBot: "#d4ecd0", nightTop: "#06101a", nightBot: "#1f3a3a" }, water: ["#3a9d8f", "#1b5e56", "#06241f"] },
      { id: "recif", name: "Récif Corallien", emoji: "🐚", desc: "Eaux chaudes et poissons colorés.", minLvl: 4, price: 500, sky: { dayTop: "#1ea0e0", dayBot: "#ffe8c2", nightTop: "#0a0a24", nightBot: "#3a2a54" }, water: ["#1ec8d8", "#0d7f9a", "#053a52"] },
      { id: "glace", name: "Banquise Polaire", emoji: "🧊", desc: "Glace, froid et géants blancs.", minLvl: 6, price: 1000, sky: { dayTop: "#7aa8d8", dayBot: "#e8f4ff", nightTop: "#03081a", nightBot: "#12385a" }, water: ["#6fb7d8", "#2b6f94", "#0b2a40"] },
      { id: "mer", name: "Haute Mer", emoji: "⛵", desc: "Grand large : thons, espadons, baleines.", minLvl: 8, price: 2000, sky: { dayTop: "#2d6fb5", dayBot: "#9cc8e8", nightTop: "#030612", nightBot: "#14284a" }, water: ["#1767a0", "#0a3560", "#020f22"] },
      { id: "abysse", name: "Abysses Maudits", emoji: "🌑", desc: "Ciel sombre, créatures des profondeurs.", minLvl: 11, price: 4500, sky: { dayTop: "#2a1b44", dayBot: "#5a4a78", nightTop: "#0a0414", nightBot: "#2a1038" }, water: ["#2a3a7a", "#10143a", "#02030c"] }
    ];
    const getSpot = () => SPOTS.find(x => x.id === state.spot) || SPOTS[0];
    const spotName = id => (SPOTS.find(x => x.id === id) || SPOTS[0]).name;

    const SPECIES = [
      { id: "sardine", name: "Sardine", rarity: "commune", emoji: "🐟", minW: 8, maxW: 18, price: 10, spots: ["lac","mer"] },
      { id: "truite", name: "Truite", rarity: "commune", emoji: "🐟", minW: 15, maxW: 45, price: 20, spots: ["riviere","lac"] },
      { id: "perche", name: "Perche", rarity: "commune", emoji: "🐟", minW: 10, maxW: 38, price: 25, spots: ["lac","riviere"] },
      { id: "gardon", name: "Gardon", rarity: "commune", emoji: "🐟", minW: 8, maxW: 25, price: 12, spots: ["lac"] },
      { id: "carpe", name: "Carpe Dorée", rarity: "rare", emoji: "🐠", minW: 25, maxW: 75, price: 50, spots: ["lac"] },
      { id: "brochet", name: "Brochet Géant", rarity: "epique", emoji: "🦈", minW: 40, maxW: 110, price: 150, spots: ["riviere","lac"] },
      { id: "silure", name: "Silure Fantôme", rarity: "legendaire", emoji: "🐟", minW: 120, maxW: 260, price: 500, spots: ["lac"], only: ["Nuit"] },
      { id: "ecrevisse", name: "Écrevisse", rarity: "commune", emoji: "🦞", minW: 6, maxW: 16, price: 18, spots: ["riviere"] },
      { id: "saumon", name: "Saumon", rarity: "rare", emoji: "🐟", minW: 40, maxW: 90, price: 70, spots: ["riviere"], prefer: ["Aube"] },
      { id: "esturgeon", name: "Esturgeon", rarity: "epique", emoji: "🐟", minW: 80, maxW: 200, price: 200, spots: ["riviere"], prefer: ["Nuit"] },
      { id: "demoiselle", name: "Demoiselle", rarity: "commune", emoji: "🐠", minW: 5, maxW: 12, price: 22, spots: ["recif"] },
      { id: "clown", name: "Poisson-Clown", rarity: "rare", emoji: "🐠", minW: 6, maxW: 15, price: 65, spots: ["recif"] },
      { id: "globe", name: "Poisson-Globe", rarity: "rare", emoji: "🐡", minW: 12, maxW: 35, price: 90, spots: ["recif"] },
      { id: "pieuvre", name: "Pieuvre", rarity: "epique", emoji: "🐙", minW: 40, maxW: 120, price: 220, spots: ["recif"], prefer: ["Nuit","Crépuscule"] },
      { id: "morue", name: "Morue", rarity: "commune", emoji: "🐟", minW: 30, maxW: 80, price: 30, spots: ["glace"] },
      { id: "crabe", name: "Crabe des Neiges", rarity: "rare", emoji: "🦀", minW: 15, maxW: 40, price: 110, spots: ["glace"] },
      { id: "narval", name: "Narval", rarity: "epique", emoji: "🐋", minW: 150, maxW: 300, price: 300, spots: ["glace"], prefer: ["Aube"] },
      { id: "beluga", name: "Baleine Blanche", rarity: "legendaire", emoji: "🐳", minW: 300, maxW: 550, price: 800, spots: ["glace"], only: ["Nuit","Aube"] },
      { id: "thon", name: "Thon Rouge", rarity: "rare", emoji: "🐟", minW: 60, maxW: 200, price: 130, spots: ["mer"] },
      { id: "espadon", name: "Espadon", rarity: "epique", emoji: "🗡️", minW: 80, maxW: 220, price: 250, spots: ["mer"] },
      { id: "calmar", name: "Calmar Géant", rarity: "epique", emoji: "🦑", minW: 150, maxW: 400, price: 320, spots: ["mer"], prefer: ["Nuit"] },
      { id: "requin", name: "Requin Blanc", rarity: "legendaire", emoji: "🦈", minW: 150, maxW: 450, price: 600, spots: ["mer","abysse"] },
      { id: "baleine", name: "Baleine Bleue", rarity: "legendaire", emoji: "🐋", minW: 400, maxW: 900, price: 1500, spots: ["mer"], only: ["Jour","Aube"] },
      { id: "lanterne", name: "Poisson-Lanterne", rarity: "commune", emoji: "🐡", minW: 10, maxW: 30, price: 40, spots: ["abysse"] },
      { id: "baudroie", name: "Baudroie", rarity: "rare", emoji: "🐟", minW: 30, maxW: 90, price: 180, spots: ["abysse"] },
      { id: "dragon", name: "Dragon des Mers", rarity: "legendaire", emoji: "🐉", minW: 200, maxW: 600, price: 1200, spots: ["abysse"] },
      { id: "kraken", name: "Kraken", rarity: "legendaire", emoji: "🦑", minW: 400, maxW: 800, price: 2500, spots: ["abysse"], only: ["Nuit","Crépuscule"] },
    ];

    /* Jour / Nuit */
    const DAY_MS = 240000; // 4 min réelles = 24 h de jeu
    let dayClock = 0.3, lastTick = performance.now(), curDay = 1, chipKey = "";
    const hourNow = () => dayClock * 24;
    const getPeriod = h => h >= 5 && h < 8 ? "Aube" : h >= 8 && h < 18 ? "Jour" : h >= 18 && h < 21 ? "Crépuscule" : "Nuit";
    const PERIOD_ICON = { "Aube": "🌅", "Jour": "☀️", "Crépuscule": "🌇", "Nuit": "🌙" };
    const sunElev = () => Math.sin(2 * Math.PI * (hourNow() - 6) / 24);
    const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
    const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
    const rgb = (a, al) => `rgba(${a[0] | 0},${a[1] | 0},${a[2] | 0},${al === undefined ? 1 : al})`;
    function updateChips() {
      const h = hourNow(), per = getPeriod(h);
      const hh = String(Math.floor(h)).padStart(2, "0"), mm = String(Math.floor((h % 1) * 6) * 10).padStart(2, "0");
      const bt = state.activeBait && state.baits[state.activeBait] > 0 ? ` · ${BAITS.find(b => b.id === state.activeBait).emoji}×${state.baits[state.activeBait]}` : "";
      const k = per + hh + mm + state.spot + bt; if (k === chipKey) return; chipKey = k;
      document.getElementById("time-chip").innerText = `${PERIOD_ICON[per]} ${per} · ${hh}:${mm}`;
      document.getElementById("spot-chip").innerText = `📍 ${getSpot().name}${bt}`;
    }
    function pickFish() {
      const per = getPeriod(hourNow()), spotId = state.spot, bait = useBait();
      let pool = SPECIES.filter(f => f.spots.includes(spotId) && (!f.only || f.only.includes(per)));
      if (!pool.length) pool = SPECIES.filter(f => f.spots.includes(spotId) && !f.only);
      const base = { commune: 60, rare: 25, epique: 10, legendaire: 3 };
      const ws = pool.map(f => base[f.rarity] * (f.rarity === "commune" ? 1 : 1 + 0.25 * bait) * (f.prefer && f.prefer.includes(per) ? 2 : 1));
      let r = Math.random() * ws.reduce((a, b) => a + b, 0);
      for (let i = 0; i < pool.length; i++) { r -= ws[i]; if (r <= 0) return pool[i]; }
      return pool[pool.length - 1];
    }

    const SKINS = {
      character: [
        { id: "char_classic", name: "Pêcheur Classique", price: 0, unlocked: true },
        { id: "char_pirate", name: "Capitaine Pirate", price: 300, unlocked: false },
        { id: "char_cyber", name: "Cyber Pêcheur", price: 1000, unlocked: false }
      ],
      rod: [
        { id: "rod_wood", name: "Canne en Bois", price: 0, unlocked: true, color: "#d8e2dc" },
        { id: "rod_carbon", name: "Canne Carbone Red", price: 200, unlocked: false, color: "#ef476f" },
        { id: "rod_neon", name: "Canne Néon Cyber", price: 800, unlocked: false, color: "#06d6a0" }
      ],
      lure: [
        { id: "lure_classic", name: "Flotteur Rouge", price: 0, unlocked: true },
        { id: "lure_duck", name: "Shad Souple", price: 250, unlocked: false },
        { id: "lure_orb", name: "Jig Lourd", price: 750, unlocked: false }
      ]
    };

    const UPGRADES = [
      { id: "bait", name: "Appâts Rares", desc: "Attire des espèces plus précieuses", basePrice: 60, mult: 2.0, level: 1 }
    ];

    const SKILL_UPGRADES = [
      { id: "cast_bar", name: "Précision du Lancer", desc: "Ralentit la jauge pour faciliter le lancer parfait", basePrice: 35, mult: 1.6, level: 1 },
      { id: "fight_bar", name: "Maîtrise du Combat", desc: "Élargit la zone verte et stabilise le fil", basePrice: 45, mult: 1.7, level: 1 }
    ];

    /* Game State */
    let state = {
      gold: 0,
      level: 1,
      xp: 0,
      phase: "IDLE", // IDLE, POWER, FLYING, WAITING, HOOK, REELING, CATCH_VIEW
      power: 0,
      powerDir: 1,
      hookTimer: null,
      reelProgress: 30,
      tension: 50,
      activeFish: null,
      isPressing: false,
      equippedSkins: { character: "char_classic", rod: "rod_wood", lure: "lure_classic", boat: "boat_classic" },
      profile: { avatar: "", frame: "bois", banner: "lac", badge: -1, favFish: "" },
      stats: { bossWins: 0, questsDone: 0 },
      quests: null,
      boss: null,
      caughtFish: {},
      dexFilter: 'all',
      spot: "lac",
      unlockedSpots: { lac: true },
      // Cast Parabola Physics
      lurePos: { x: 0, y: 0 },
      lureTarget: { x: 0, y: 0 },
      castProgress: 0,
      ripples: [],
      particles: []
    };

    /* Save & Load — validation des données locales (les sauvegardes restent propres à l'appareil). */
    const SAVE_KEY = "peche_express_save_v3";
    const clampNumber = (value, fallback, min, max) => {
      const n = Number(value);
      return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
    };
    const isPlainObject = value => value !== null && typeof value === "object" && !Array.isArray(value);

    let saveLocked = false;   // verrouillé pendant un import de sauvegarde (évite d'écraser les données importées)
    function saveGame() {
      if (saveLocked) return;
      const data = {
        saveSchema: 1,
        gold: clampNumber(state.gold, 0, 0, 1000000000),
        level: clampNumber(state.level, 1, 1, 100000),
        xp: clampNumber(state.xp, 0, 0, 1000000000),
        upgrades: UPGRADES.map(u => ({ id: u.id, level: clampNumber(u.level, 0, 0, 1000) })),
        skillUpgrades: SKILL_UPGRADES.map(u => ({ id: u.id, level: clampNumber(u.level, 0, 0, 1000) })),
        skins: Object.fromEntries(Object.entries(SKINS).map(([cat, list]) => [
          cat, list.map(s => ({ id: s.id, unlocked: !!s.unlocked }))
        ])),
        equippedSkins: state.equippedSkins,
        caughtFish: state.caughtFish,
        spot: state.spot,
        unlockedSpots: state.unlockedSpots,
        dayClock,
        pseudo: typeof state.pseudo === "string" ? state.pseudo.slice(0, 16) : "",
        title: typeof state.title === "string" ? state.title.slice(0, 64) : "",
        profile: state.profile,
        stats: state.stats,
        quests: state.quests,
        baits: state.baits,
        activeBait: state.activeBait,
        pity: state.pity,
        audio: { sfx: AUD.sfx, music: AUD.music, amb: AUD.amb, vib: !!AUD.vib }
      };
      try {
        const serialized = JSON.stringify(data);
        // Évite de stocker un contenu anormalement volumineux dans le stockage local.
        if (serialized.length <= 2_000_000) localStorage.setItem(SAVE_KEY, serialized);
      } catch (e) {
        console.warn("Pêche Express : sauvegarde impossible (stockage indisponible ou plein).", e);
      }
      try { updateHUD(); } catch (e) { /* le HUD sera mis à jour au prochain rendu */ }
    }

    function loadGame() {
      let raw = null;
      try { raw = localStorage.getItem(SAVE_KEY); } catch (e) {
        console.warn("Pêche Express : stockage local indisponible.", e);
      }
      if (raw && raw.length <= 2_000_000) {
        try {
          const data = JSON.parse(raw);
          if (!isPlainObject(data)) throw new Error("Format de sauvegarde invalide");

          state.gold = clampNumber(data.gold, 0, 0, 1000000000);
          state.level = Math.floor(clampNumber(data.level, 1, 1, 100000));
          state.xp = clampNumber(data.xp, 0, 0, 1000000000);

          if (isPlainObject(data.caughtFish)) {
            // Conserve le format utilisé par le jeu : {count, maxWeight, times} par espèce.
            // Les anciennes sauvegardes contenant un simple nombre restent récupérables.
            const fish = {};
            Object.entries(data.caughtFish).slice(0, 500).forEach(([id, record]) => {
              if (!/^[a-zA-Z0-9_-]{1,80}$/.test(id) || !SPECIES.some(species => species.id === id)) return;
              if (isPlainObject(record)) {
                const times = {};
                if (isPlainObject(record.times)) {
                  ["Aube", "Jour", "Crépuscule", "Nuit"].forEach(period => {
                    times[period] = Math.floor(clampNumber(record.times[period], 0, 0, 1000000));
                  });
                }
                const lures = {};
                if (isPlainObject(record.lures)) {
                  Object.entries(record.lures).slice(0, 100).forEach(([name, count]) => {
                    if (typeof name === "string") lures[name.slice(0, 80)] = Math.floor(clampNumber(count, 0, 0, 1000000));
                  });
                }
                const safeLabel = value => typeof value === "string" ? value.slice(0, 1000) : "";
                fish[id] = {
                  count: Math.floor(clampNumber(record.count, 0, 0, 1000000)),
                  maxWeight: clampNumber(record.maxWeight, 0, 0, 1000000),
                  totalWeight: clampNumber(record.totalWeight, 0, 0, 1000000000),
                  bestDate: safeLabel(record.bestDate),
                  bestSpot: safeLabel(record.bestSpot),
                  bestLure: safeLabel(record.bestLure),
                  lures,
                  times
                };
              } else {
                fish[id] = { count: Math.floor(clampNumber(record, 0, 0, 1000000)), maxWeight: 0, totalWeight: 0, bestDate: "", bestSpot: "", bestLure: "", lures: {}, times: {} };
              }
            });
            state.caughtFish = fish;
          }

          if (Array.isArray(data.upgrades)) data.upgrades.slice(0, 200).forEach(savedU => {
            if (!isPlainObject(savedU) || typeof savedU.id !== "string") return;
            const u = UPGRADES.find(item => item.id === savedU.id);
            if (u) u.level = Math.floor(clampNumber(savedU.level, 0, 0, 1000));
          });
          if (Array.isArray(data.skillUpgrades)) data.skillUpgrades.slice(0, 200).forEach(savedU => {
            if (!isPlainObject(savedU) || typeof savedU.id !== "string") return;
            const u = SKILL_UPGRADES.find(item => item.id === savedU.id);
            if (u) u.level = Math.floor(clampNumber(savedU.level, 0, 0, 1000));
          });

          if (isPlainObject(data.skins)) Object.entries(data.skins).forEach(([cat, list]) => {
            if (!Array.isArray(list) || !Array.isArray(SKINS[cat])) return;
            list.slice(0, 200).forEach(savedS => {
              if (!isPlainObject(savedS) || typeof savedS.id !== "string") return;
              const skin = SKINS[cat].find(item => item.id === savedS.id);
              if (skin) skin.unlocked = savedS.unlocked === true || skin.unlocked;
            });
          });

          const validEquipped = {};
          if (isPlainObject(data.equippedSkins)) Object.entries(SKINS).forEach(([cat, list]) => {
            const requested = data.equippedSkins[cat];
            const skin = list.find(item => item.id === requested && item.unlocked);
            if (skin) validEquipped[cat] = skin.id;
          });
          if (Object.keys(validEquipped).length) state.equippedSkins = Object.assign({}, state.equippedSkins, validEquipped);

          if (isPlainObject(data.unlockedSpots)) {
            const spots = { lac: true };
            Object.entries(data.unlockedSpots).slice(0, 100).forEach(([id, unlocked]) => {
              if (SPOTS.some(spot => spot.id === id) && unlocked === true) spots[id] = true;
            });
            state.unlockedSpots = spots;
          }
          if (typeof data.spot === "string" && SPOTS.some(spot => spot.id === data.spot) && state.unlockedSpots[data.spot]) state.spot = data.spot;
          if (typeof data.dayClock === "number" && Number.isFinite(data.dayClock)) dayClock = ((data.dayClock % 1) + 1) % 1;
          if (typeof data.pseudo === "string") state.pseudo = data.pseudo.replace(/[<>]/g, "").slice(0, 16);
          if (typeof data.title === "string") {
            const title = typeof TITLES !== "undefined" && Array.isArray(TITLES) ? TITLES.find(t => t.id === data.title) : null;
            if (title) state.title = title.id;
          }
          if (isPlainObject(data.stats)) {
            state.stats = { bossWins: Math.floor(clampNumber(data.stats.bossWins, 0, 0, 1000000)), questsDone: Math.floor(clampNumber(data.stats.questsDone, 0, 0, 1000000)) };
          }
          if (isPlainObject(data.quests)) state.quests = sanitizeQuests(data.quests);
          if (isPlainObject(data.profile)) {
            const p = data.profile, np = Object.assign({}, state.profile);
            if (typeof p.avatar === "string") np.avatar = p.avatar.replace(/[^a-z0-9_]/gi, "").slice(0, 32);
            if (typeof p.frame === "string") np.frame = p.frame.replace(/[^a-z0-9_]/gi, "").slice(0, 16);
            if (typeof p.banner === "string") np.banner = p.banner.replace(/[^a-z0-9_]/gi, "").slice(0, 16);
            if (Number.isInteger(p.badge)) np.badge = Math.min(4, Math.max(-1, p.badge));
            if (typeof p.favFish === "string") np.favFish = p.favFish.replace(/[^a-z0-9_]/gi, "").slice(0, 24);
            state.profile = np;
          }
          if (isPlainObject(data.baits) && typeof BAITS !== "undefined" && Array.isArray(BAITS)) {
            const baits = {};
            BAITS.forEach(bait => { baits[bait.id] = Math.floor(clampNumber(data.baits[bait.id], 0, 0, 100000)); });
            state.baits = baits;
          }
          if (typeof data.activeBait === "string" && typeof BAITS !== "undefined" && Array.isArray(BAITS)
              && BAITS.some(bait => bait.id === data.activeBait) && state.baits[data.activeBait] > 0) {
            state.activeBait = data.activeBait;
          } else if (data.activeBait === null) state.activeBait = null;

          if (isPlainObject(data.pity)) {
            const pity = {};
            Object.entries(data.pity).slice(0, 100).forEach(([id, value]) => {
              if (/^[a-zA-Z0-9_-]{1,80}$/.test(id)) pity[id] = Math.floor(clampNumber(value, 0, 0, 100000));
            });
            state.pity = pity;
          }
          if (isPlainObject(data.audio)) {
            ["sfx", "music", "amb"].forEach(key => { if (Number.isFinite(data.audio[key])) AUD[key] = clampNumber(data.audio[key], AUD[key], 0, 1); });
            if (typeof data.audio.vib === "boolean") AUD.vib = data.audio.vib;
          }
        } catch (e) {
          console.warn("Pêche Express : sauvegarde invalide, chargement des valeurs par défaut.", e);
        }
      } else if (raw) {
        console.warn("Pêche Express : sauvegarde trop volumineuse, ignorée.");
      }
      updateHUD();
    }

    /* Moteur audio : effets, ambiance par spot et musique (synthèse WebAudio) */
    const AUD = { sfx: 0.8, music: 0.4, amb: 0.6, vib: true };
    let audioCtx = null, busS, busM, busA, noiseBuf, ambNodes = null, ambTimer = null, musicTimer = null, musicStep = 0, lastReelSnd = 0, lastWarnSnd = 0;
    const NOTE = n => 440 * Math.pow(2, (n - 69) / 12);

    function applyVolumes() {
      if (!audioCtx) return; const t = audioCtx.currentTime;
      busS.gain.setTargetAtTime(AUD.sfx, t, 0.05); busM.gain.setTargetAtTime(AUD.music * 0.9, t, 0.1); busA.gain.setTargetAtTime(AUD.amb, t, 0.1);
    }
    function initAudio() {
      try {
        if (!audioCtx) {
          const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
          audioCtx = new AC();
          const comp = audioCtx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4; comp.connect(audioCtx.destination);
          const master = audioCtx.createGain(); master.gain.value = 0.9; master.connect(comp);
          busS = audioCtx.createGain(); busM = audioCtx.createGain(); busA = audioCtx.createGain();
          [busS, busM, busA].forEach(x => x.connect(master));
          const len = Math.floor(audioCtx.sampleRate * 1.8), imp = audioCtx.createBuffer(2, len, audioCtx.sampleRate);
          for (let ch = 0; ch < 2; ch++) { const d = imp.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
          const conv = audioCtx.createConvolver(); conv.buffer = imp;
          const wet = audioCtx.createGain(); wet.gain.value = 0.38; conv.connect(wet); wet.connect(master);
          const sendM = audioCtx.createGain(); sendM.gain.value = 0.6; busM.connect(sendM); sendM.connect(conv);
          const sendS = audioCtx.createGain(); sendS.gain.value = 0.16; busS.connect(sendS); sendS.connect(conv);
          noiseBuf = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
          const nd = noiseBuf.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
          applyVolumes(); startAmbience(state.spot); startMusic();
        }
        if (audioCtx.state === "suspended") audioCtx.resume();
      } catch (e) {}
    }
    document.addEventListener("pointerdown", () => initAudio(), { once: true });
    document.addEventListener("visibilitychange", () => { if (!audioCtx) return; if (document.hidden) audioCtx.suspend(); else audioCtx.resume(); });

    function tone(freq, t, dur, o) {
      o = o || {}; const c = audioCtx, os = c.createOscillator(), g = c.createGain();
      os.type = o.type || "sine"; os.frequency.setValueAtTime(freq, t);
      if (o.slide) os.frequency.exponentialRampToValueAtTime(Math.max(20, o.slide), t + dur);
      if (o.detune) os.detune.value = o.detune;
      const vol = o.vol == null ? 0.2 : o.vol, a = o.attack || 0.006;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      let node = os; if (o.lp) { const f = c.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = o.lp; os.connect(f); node = f; }
      node.connect(g); g.connect(o.bus || busS); os.start(t); os.stop(t + dur + 0.05);
    }
    function noiseBurst(t, dur, o) {
      o = o || {}; const c = audioCtx, src = c.createBufferSource(); src.buffer = noiseBuf; src.loop = true;
      const f = c.createBiquadFilter(); f.type = o.type || "lowpass"; f.frequency.setValueAtTime(o.f0 || 1000, t);
      if (o.f1) f.frequency.exponentialRampToValueAtTime(o.f1, t + dur); f.Q.value = o.q || 1;
      const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(o.vol || 0.2, t + (o.attack || 0.01)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(f); f.connect(g); g.connect(o.bus || busS); src.start(t, Math.random() * 1.5); src.stop(t + dur + 0.05);
    }

    function playSound(type) {
      if (!audioCtx || AUD.sfx <= 0.01) return;
      try {
        const t = audioCtx.currentTime + 0.005;
        switch (type) {
          case "ui": tone(1300, t, 0.05, { type: "triangle", vol: 0.07, slide: 900 }); break;
          case "back": tone(800, t, 0.06, { type: "triangle", vol: 0.07, slide: 500 }); break;
          case "cast":
            noiseBurst(t, 0.45, { type: "bandpass", f0: 350, f1: 2400, q: 1.2, vol: 0.28, attack: 0.08 }); tone(420, t, 0.3, { vol: 0.1, slide: 140 }); break;
          case "splash":
            noiseBurst(t, 0.5, { f0: 3500, f1: 250, vol: 0.4 }); tone(160, t, 0.2, { vol: 0.25, slide: 60 });
            for (let i = 0; i < 3; i++) tone(500 + Math.random() * 700, t + 0.04 + i * 0.07, 0.09, { vol: 0.09, slide: 1600 }); break;
          case "bite":
            tone(NOTE(88), t, 0.22, { type: "triangle", vol: 0.2 }); tone(NOTE(91), t + 0.1, 0.3, { type: "triangle", vol: 0.22 });
            tone(330, t, 0.12, { vol: 0.2, slide: 120 }); noiseBurst(t, 0.1, { f0: 2500, f1: 500, vol: 0.18 }); break;
          case "reel":
            noiseBurst(t, 0.022, { type: "highpass", f0: 3500, vol: 0.1 }); tone(160 + Math.random() * 30, t, 0.03, { type: "square", vol: 0.025, lp: 900 }); break;
          case "warn":
            tone(740, t, 0.1, { type: "sawtooth", vol: 0.07, lp: 1500 }); tone(540, t + 0.12, 0.12, { type: "sawtooth", vol: 0.07, lp: 1500 }); break;
          case "win":
            [72, 76, 79, 84].forEach((n, i) => { tone(NOTE(n), t + i * 0.09, 0.35, { type: "triangle", vol: 0.17 }); tone(NOTE(n) * 2, t + i * 0.09, 0.2, { vol: 0.05 }); });
            noiseBurst(t + 0.3, 0.4, { type: "highpass", f0: 6000, vol: 0.05 }); break;
          case "rare":
            [72, 76, 79, 84, 88].forEach((n, i) => { tone(NOTE(n), t + i * 0.09, 0.45, { type: "triangle", vol: 0.18 }); tone(NOTE(n) * 2, t + i * 0.09, 0.3, { vol: 0.06 }); });
            for (let i = 0; i < 4; i++) tone(NOTE(96 + Math.floor(Math.random() * 6)), t + 0.5 + i * 0.07, 0.25, { vol: 0.05 });
            noiseBurst(t + 0.3, 0.6, { type: "highpass", f0: 6000, vol: 0.07 }); break;
          case "legend":
            [72, 76, 79, 84, 88, 91, 96].forEach((n, i) => { tone(NOTE(n), t + i * 0.1, 0.7, { type: "triangle", vol: 0.19 }); tone(NOTE(n) * 2.01, t + i * 0.1, 0.4, { vol: 0.06 }); });
            [48, 55, 60, 64].forEach(n => tone(NOTE(n), t, 1.5, { type: "sawtooth", vol: 0.05, lp: 900, attack: 0.15 }));
            for (let i = 0; i < 8; i++) tone(NOTE(96 + Math.floor(Math.random() * 8)), t + 0.7 + i * 0.07, 0.3, { vol: 0.05 });
            noiseBurst(t + 0.2, 1.0, { type: "highpass", f0: 5000, vol: 0.09, attack: 0.2 }); break;
          case "lose":
            tone(300, t, 0.5, { type: "sawtooth", vol: 0.14, slide: 70, lp: 900 }); noiseBurst(t, 0.08, { type: "highpass", f0: 2500, vol: 0.2 }); break;
          case "coin":
            tone(NOTE(95), t, 0.12, { type: "square", vol: 0.07, lp: 3000 }); tone(NOTE(100), t + 0.07, 0.25, { type: "square", vol: 0.07, lp: 3000 }); break;
          case "thump":
            tone(95, t, 0.2, { vol: 0.45, slide: 42 }); noiseBurst(t, 0.06, { f0: 300, vol: 0.2 }); break;
          case "chime":
            [84, 88, 91, 96].forEach((n, i) => { tone(NOTE(n), t + i * 0.06, 0.6, { vol: 0.12 }); tone(NOTE(n) * 2.01, t + i * 0.06, 0.35, { vol: 0.04 }); });
            noiseBurst(t, 0.5, { type: "highpass", f0: 5000, vol: 0.08, attack: 0.05 }); break;
          case "levelup":
            [67, 71, 74, 79, 83, 86].forEach((n, i) => { tone(NOTE(n), t + i * 0.08, 0.4, { type: "triangle", vol: 0.16 }); tone(NOTE(n) * 2, t + i * 0.08, 0.25, { vol: 0.05 }); }); break;
          case "error": tone(160, t, 0.2, { type: "square", vol: 0.1, lp: 600 }); break;
        }
      } catch (e) {}
    }
    function reelAudio() {
      if (!audioCtx || state.phase !== "REELING") return; const n = performance.now();
      if (state.isPressing && n - lastReelSnd > 105) { lastReelSnd = n; playSound("reel"); }
      if (state.surge === "warn" && n - lastWarnSnd > 420) { lastWarnSnd = n; playSound("warn"); }
    }

    function startAmbience(spot) {
      if (!audioCtx) return; const c = audioCtx, t = c.currentTime;
      if (ambNodes) { const old = ambNodes; old.g.gain.setTargetAtTime(0, t, 0.4); setTimeout(() => { try { old.stop(); } catch (e) {} }, 1800); ambNodes = null; }
      if (ambTimer) { clearInterval(ambTimer); ambTimer = null; }
      const PR = {
        lac: { f: "lowpass", fr: 520, q: 0.5, vol: 0.55, lfo: 0.11, dep: 0.45, birds: 1 },
        riviere: { f: "bandpass", fr: 1100, q: 0.4, vol: 0.5, lfo: 0.25, dep: 0.25, birds: 1 },
        recif: { f: "lowpass", fr: 700, q: 0.6, vol: 0.5, lfo: 0.13, dep: 0.4, bubbles: 1 },
        glace: { f: "bandpass", fr: 650, q: 1.6, vol: 0.35, lfo: 0.07, dep: 0.6 },
        mer: { f: "lowpass", fr: 420, q: 0.7, vol: 0.8, lfo: 0.09, dep: 0.55 },
        abysse: { f: "lowpass", fr: 180, q: 1, vol: 0.6, lfo: 0.05, dep: 0.3, drone: 1 }
      };
      const P = PR[spot] || PR.lac;
      const src = c.createBufferSource(); src.buffer = noiseBuf; src.loop = true;
      const f = c.createBiquadFilter(); f.type = P.f; f.frequency.value = P.fr; f.Q.value = P.q;
      const g = c.createGain(); g.gain.value = 0.0001; g.gain.setTargetAtTime(P.vol * (1 - P.dep / 2), t, 0.8);
      const lfo = c.createOscillator(); lfo.frequency.value = P.lfo; const lg = c.createGain(); lg.gain.value = P.vol * P.dep / 2;
      lfo.connect(lg); lg.connect(g.gain); src.connect(f); f.connect(g); g.connect(busA);
      const extra = [];
      if (P.drone) [55, 82.6].forEach((fr, i) => { const o = c.createOscillator(), og = c.createGain(); o.frequency.value = fr; o.detune.value = i * 7; og.gain.value = 0.05; o.connect(og); og.connect(g); o.start(); extra.push(o); });
      src.start(t, Math.random() * 1.5); lfo.start();
      ambNodes = { g, stop() { src.stop(); lfo.stop(); extra.forEach(o => o.stop()); } };
      if (P.bubbles) ambTimer = setInterval(() => { if (document.hidden || !audioCtx) return; if (Math.random() < 0.5) tone(500 + Math.random() * 900, audioCtx.currentTime, 0.1, { vol: 0.05, slide: 1800, bus: busA }); }, 700);
      else if (P.birds) ambTimer = setInterval(() => {
        if (document.hidden || !audioCtx || Math.random() > 0.35) return; const tt = audioCtx.currentTime, b = 2400 + Math.random() * 900;
        for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) tone(b + i * 120, tt + i * 0.11, 0.08, { type: "triangle", vol: 0.04, slide: b * 1.25, bus: busA });
      }, 5000);
    }

    const PROG = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]], PENTA = [69, 72, 74, 76, 79, 81, 84];
    function startMusic() { if (musicTimer) return; musicStep = 0; musicTick(); }
    function musicTick() {
      const fight = state.phase === "REELING", beat = fight ? 0.36 : 0.6;
      if (audioCtx && AUD.music > 0.01 && !document.hidden && audioCtx.state === "running") {
        try {
          const t = audioCtx.currentTime + 0.03, bar = Math.floor(musicStep / 4) % 4, k = musicStep % 4, ch = PROG[bar];
          if (k === 0) {
            ch.forEach((n, i) => tone(NOTE(n), t, beat * 4.4, { type: "triangle", vol: 0.05, lp: 1100, attack: 0.5, bus: busM, detune: i * 3 - 3 }));
            tone(NOTE(ch[0] - 12), t, beat * 3.6, { vol: 0.13, lp: 400, attack: 0.04, bus: busM });
          }
          if (Math.random() < (fight ? 0.85 : 0.5)) tone(NOTE(PENTA[Math.floor(Math.random() * PENTA.length)]), t + (k % 2 ? beat * 0.5 : 0), beat * 1.6, { type: "triangle", vol: 0.045, lp: 2600, bus: busM });
          if (fight) { tone(110, t, 0.14, { vol: 0.18, slide: 45, bus: busM }); if (k % 2) noiseBurst(t + beat * 0.5, 0.04, { type: "highpass", f0: 7000, vol: 0.05, bus: busM }); }
        } catch (e) {}
      }
      musicStep++; musicTimer = setTimeout(musicTick, beat * 1000);
    }

    function triggerVibration(pattern) { if (AUD.vib && navigator.vibrate) { try { navigator.vibrate(pattern); } catch(e){} } }
    document.addEventListener("click", e => {
      if (!audioCtx) return; const b = e.target.closest && e.target.closest("button, .inv-card, .dx-card, .sp"); if (!b || b.classList.contains("btn-main")) return;
      playSound(b.classList.contains("close-btn") ? "back" : "ui");
    }, true);

    /* Canvas Graphics Setup */
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    /* Visual Background Assets */
    let waveOffset = 0;
    let stars = Array.from({length: 40}, () => ({ x: Math.random() * 500, y: Math.random() * 300, size: Math.random() * 2 + 0.8, alpha: Math.random() }));
    let clouds = Array.from({length: 4}, (_, i) => ({ x: i * 150, y: 30 + Math.random() * 40, speed: 0.1 + Math.random() * 0.1, scale: 0.6 + Math.random() * 0.5 }));
    let bubbles = Array.from({length: 20}, () => ({ x: Math.random() * 500, y: Math.random() * 300 + 200, r: Math.random() * 3 + 1, speed: Math.random() * 0.6 + 0.2, alpha: Math.random() * 0.5 + 0.2 }));

    /* Main Render Loop */
    function render() {
      waveOffset += 0.025;
      const nowT = performance.now(); dayClock = (dayClock + Math.min(100, nowT - lastTick) / DAY_MS) % 1; lastTick = nowT; updateChips();
      const w = canvas.width; const h = canvas.height;
      ctx.save(); ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      const dW = w / window.devicePixelRatio; const dH = h / window.devicePixelRatio;

      const waterLineY = dH * 0.46;

      // Ciel dynamique (jour / nuit)
      const spot = getSpot(), el = sunElev();
      const day = Math.max(0, Math.min(1, (el + 0.15) / 0.5)); curDay = day;
      const dusk = Math.max(0, 1 - Math.abs(el) / 0.28);
      const skyTop = mix(mix(hex(spot.sky.nightTop), hex(spot.sky.dayTop), day), [120, 70, 120], dusk * 0.3);
      const skyBot = mix(mix(hex(spot.sky.nightBot), hex(spot.sky.dayBot), day), [255, 140, 90], dusk * 0.55);
      const skyGrad = ctx.createLinearGradient(0, 0, 0, waterLineY);
      skyGrad.addColorStop(0, rgb(skyTop)); skyGrad.addColorStop(1, rgb(skyBot));
      ctx.fillStyle = skyGrad; ctx.fillRect(0, 0, dW, waterLineY);

      // Stars
      stars.forEach(s => {
        s.alpha += (Math.random() - 0.5) * 0.04; s.alpha = Math.max(0.2, Math.min(1, s.alpha));
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * (1 - day)})`;
        ctx.beginPath(); ctx.arc(s.x % dW, s.y % (waterLineY * 0.8), s.size, 0, Math.PI * 2); ctx.fill();
      });

      // Clouds
      clouds.forEach(c => {
        c.x += c.speed; if (c.x > dW + 100) c.x = -100;
        drawCloud(ctx, c.x, c.y, c.scale);
      });

      // Soleil / Lune
      const pp = ((hourNow() - 6 + 24) % 24) / 12, isSun = pp <= 1, q = isSun ? pp : pp - 1;
      const moonX = dW * (0.08 + 0.84 * q), moonY = waterLineY - Math.sin(Math.PI * q) * waterLineY * 0.82 - 6;
      const glowC = isSun ? "255, 200, 90" : "255, 243, 176";
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 8, moonX, moonY, 70);
      moonGlow.addColorStop(0, `rgba(${glowC}, 0.8)`); moonGlow.addColorStop(1, `rgba(${glowC}, 0)`);
      ctx.fillStyle = moonGlow; ctx.beginPath(); ctx.arc(moonX, moonY, 70, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = isSun ? "#ffe29a" : "#fff8e7"; ctx.beginPath(); ctx.arc(moonX, moonY, isSun ? 26 : 22, 0, Math.PI * 2); ctx.fill();
      if (!isSun) { ctx.fillStyle = "#f3e5ab"; ctx.beginPath(); ctx.arc(moonX - 5, moonY + 4, 5, 0, Math.PI * 2); ctx.fill(); }
      drawHorizon(ctx, dW, waterLineY, day);

      // Water & Underwater
      const waterGrad = ctx.createLinearGradient(0, waterLineY, 0, dH);
      const dim = 0.3 + 0.7 * day, wc = spot.water.map(c => hex(c).map(v => v * dim));
      waterGrad.addColorStop(0, rgb(wc[0])); waterGrad.addColorStop(0.35, rgb(wc[1])); waterGrad.addColorStop(1, rgb(wc[2]));
      ctx.fillStyle = waterGrad; ctx.fillRect(0, waterLineY, dW, dH - waterLineY);
      drawUnderwater(ctx, dW, dH, waterLineY, day);

      // Rays
      ctx.save();
      ctx.globalCompositeOperation = "overlay";
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(dW * 0.2 + i * 80, waterLineY);
        ctx.lineTo(dW * 0.1 + i * 90, dH);
        ctx.lineTo(dW * 0.25 + i * 90, dH);
        ctx.lineTo(dW * 0.3 + i * 80, waterLineY);
        ctx.fill();
      }
      ctx.restore();

      // Bubbles
      bubbles.forEach(b => {
        b.y -= b.speed; if (b.y < waterLineY) { b.y = dH; b.x = Math.random() * dW; }
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha})`;
        ctx.beginPath(); ctx.arc(b.x % dW, b.y, b.r, 0, Math.PI * 2); ctx.fill();
      });

      // Animated Waves Layer 1
      ctx.fillStyle = "rgba(6, 214, 160, 0.15)";
      ctx.beginPath();
      for (let x = 0; x <= dW; x += 10) {
        let y = Math.sin(x * 0.015 + waveOffset) * 6 + waterLineY;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.lineTo(dW, dH); ctx.lineTo(0, dH); ctx.fill();

      // Animated Waves Layer 2
      ctx.fillStyle = "rgba(17, 138, 178, 0.25)";
      ctx.beginPath();
      for (let x = 0; x <= dW; x += 10) {
        let y = Math.cos(x * 0.02 + waveOffset * 1.5) * 5 + waterLineY + 2;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.lineTo(dW, dH); ctx.lineTo(0, dH); ctx.fill();

      // Moon Reflection
      const refGlow = ctx.createLinearGradient(moonX - 25, waterLineY, moonX + 25, dH);
      refGlow.addColorStop(0, `rgba(${glowC}, ${0.3 * Math.sin(Math.PI * q)})`);
      refGlow.addColorStop(1, `rgba(${glowC}, 0)`);
      ctx.fillStyle = refGlow;
      ctx.fillRect(moonX - 30, waterLineY, 60, dH - waterLineY);

      document.body.classList.toggle("fighting", state.phase === "REELING");
      reelAudio();
      // Fisherman & Boat
      drawBoatAndFisherman(ctx, dW, waterLineY);

      // Cast Line / Lure Physics
      updateCastPhysics(dW, waterLineY);
      drawFishingLineAndLure(ctx, dW, waterLineY);

      // Particles
      updateAndDrawParticles(ctx);

      // UI Overlays
      renderMinigames(ctx, dW, dH);

      ctx.restore();
      requestAnimationFrame(render);
    }

    function drawHorizon(ctx, dW, wy, day) {
      const sp = state.spot; if (sp === "mer" || sp === "abysse") return;
      const col = sp === "glace" ? [200, 225, 245] : sp === "recif" ? [40, 120, 110] : [30, 60, 50];
      ctx.fillStyle = rgb(col.map(v => v * (0.25 + 0.75 * day)), 0.95);
      ctx.beginPath(); ctx.moveTo(0, wy);
      for (let x = 0; x <= dW; x += 8) {
        const k = sp === "glace" ? Math.abs(Math.sin(x * 0.02)) * 30 : (Math.sin(x * 0.011 + 1) + Math.sin(x * 0.027)) * (sp === "recif" ? 6 : 18) + 22;
        ctx.lineTo(x, wy - Math.max(2, k));
      }
      ctx.lineTo(dW, wy); ctx.fill();
    }

    function drawUnderwater(ctx, dW, dH, wy, day) {
      const sp = state.spot;
      ctx.save();
      if (sp === "recif") {
        for (let i = 0; i < 9; i++) {
          ctx.fillStyle = ["#ef476f", "#ff9e64", "#c77dff"][i % 3]; ctx.globalAlpha = 0.55 * (0.4 + 0.6 * day);
          ctx.beginPath(); ctx.arc((i + 0.5) * dW / 9, dH - 6, 15 + (i * 37 % 20), Math.PI, 0); ctx.fill();
        }
      } else if (sp === "abysse") {
        for (let i = 0; i < 12; i++) {
          ctx.fillStyle = i % 2 ? "#06d6a0" : "#8338ec"; ctx.globalAlpha = 0.25 + 0.35 * Math.abs(Math.sin(waveOffset * 1.3 + i));
          ctx.beginPath(); ctx.arc((i * 83 + 40) % dW, wy + (dH - wy) * (0.25 + (i * 29 % 70) / 100), 2 + i % 3, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.restore();
    }

    function drawCloud(ctx, x, y, scale) {
      ctx.save();
      ctx.fillStyle = `rgba(255, 255, 255, ${0.08 + 0.35 * curDay})`;
      ctx.beginPath();
      ctx.arc(x, y, 20 * scale, 0, Math.PI * 2);
      ctx.arc(x + 15 * scale, y - 10 * scale, 25 * scale, 0, Math.PI * 2);
      ctx.arc(x + 35 * scale, y, 20 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    const BOAT_GLOW = {
      boat_classic: { x: -38, y: -18.8, c: "255, 214, 120" }, boat_viking: { x: -34, y: -20, c: "255, 140, 50" },
      boat_pirate: { x: -38, y: -18.8, c: "255, 150, 90" }, boat_neon: { x: -46, y: -10.6, c: "60, 255, 220" },
      boat_gold: { x: -38, y: -18.8, c: "255, 235, 160" }
    };
    function spriteOK(im) { return im && im.complete && im.naturalWidth > 0; }

    // Texture PNG d'un poisson (retombe sur l'emoji si absente)
    function fishIcon(f, px) {
      const im = (window.SPRITES || {})["fish_" + f.id];
      if (!im || !im.src) return f.emoji;
      return `<img class="fish-img" alt="${f.name}" src="${im.src}"` + (px ? ` style="width:${px}px"` : "") + `>`;
    }

    function drawBoatAndFisherman(ctx, dW, waterY) {
      const SP = window.SPRITES || {};
      const charSkin = state.equippedSkins.character;
      const rodId = state.equippedSkins.rod;
      const boatId = state.equippedSkins.boat || "boat_classic";
      const boatImg = SP[boatId] || SP.boat, charImg = SP[charSkin], rodImg = SP[rodId];
      if (!spriteOK(boatImg) || !spriteOK(charImg) || !spriteOK(rodImg)) {
        return drawBoatAndFishermanVector(ctx, dW, waterY);
      }

      const boatX = dW * 0.18;
      const boatY = waterY + Math.sin(waveOffset * 1.5) * 3 + 2;

      // ombre sur l'eau
      ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
      ctx.beginPath(); ctx.ellipse(boatX, boatY + 9, 46, 6, 0, 0, Math.PI * 2); ctx.fill();

      // bateau (448x200 px = 112x50 unités, origine -56,-32)
      ctx.drawImage(boatImg, boatX - 56, boatY - 32, 112, 50);

      // lueur de la lanterne / torche / néon (selon le bateau)
      {
        const BG = BOAT_GLOW[boatId];
        if (BG) {
          const gx = boatX + BG.x, gy = boatY + BG.y;
          const flick = 0.85 + Math.sin(Date.now() * 0.011) * 0.08 + Math.sin(Date.now() * 0.023) * 0.05;
          const g = ctx.createRadialGradient(gx, gy, 1, gx, gy, 20);
          g.addColorStop(0, "rgba(" + BG.c + ", " + (0.55 * flick) + ")");
          g.addColorStop(1, "rgba(" + BG.c + ", 0)");
          ctx.save(); ctx.globalCompositeOperation = "lighter";
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(gx, gy, 20, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        }
      }

      // pêcheur (176x224 px = 44x56 unités, origine -22,-62)
      ctx.drawImage(charImg, boatX - 22, boatY - 62, 44, 56);

      // canne : base dans la main, bout qui plie pendant le combat
      const baseX = boatX + 10.8, baseY = boatY - 17.2;
      let tipX = boatX + 41, tipY = boatY - 50;
      if (state.phase === "REELING") {
        const bend = (state.tension / 100) * 18;
        tipX -= bend * 0.4;
        tipY += bend;
      }
      const c1x = baseX + 19.5, c1y = baseY - 22;   // la base reste raide, le bout plie
      const bz = (t) => {
        const u = 1 - t;
        return {
          x: u * u * baseX + 2 * u * t * c1x + t * t * tipX,
          y: u * u * baseY + 2 * u * t * c1y + t * t * tipY
        };
      };
      let L = 0, prev = bz(0);
      for (let i = 1; i <= 20; i++) { const p = bz(i / 20); L += Math.hypot(p.x - prev.x, p.y - prev.y); prev = p; }

      const W = rodImg.naturalWidth, H = rodImg.naturalHeight;
      const cyPx = H * (5 / 14);               // ligne centrale de la canne dans l'image
      const gs = L / W;                         // px de jeu par px d'image
      const N = 20, sw = W / N;
      for (let i = 0; i < N; i++) {
        const tm = (i + 0.5) / N;
        const p = bz(tm), p2 = bz(Math.min(1, tm + 0.02)), p1 = bz(Math.max(0, tm - 0.02));
        const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        const dw = (L / N) * 1.15;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(ang);
        ctx.drawImage(rodImg, i * sw, 0, sw + 1, H, -dw / 2, -cyPx * gs, dw, H * gs);
        ctx.restore();
      }

      // poing sur le manche
      {
        const a0 = bz(0), a1 = bz(0.06);
        const hx = a0.x + (a1.x - a0.x) * 0.9, hy = a0.y + (a1.y - a0.y) * 0.9;
        const glove = charSkin === "char_cyber" ? "#1c2735" : "#f3d0a2";
        const edge = charSkin === "char_cyber" ? "#04080d" : "#3a2414";
        ctx.fillStyle = glove; ctx.strokeStyle = edge; ctx.lineWidth = 0.9;
        ctx.beginPath(); ctx.arc(hx, hy, 2.6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }

      state.rodTip = { x: tipX, y: tipY };
    }

    function drawBoatAndFishermanVector(ctx, dW, waterY) {
      const boatX = dW * 0.18;
      const boatY = waterY + Math.sin(waveOffset * 1.5) * 3 + 2;

      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.beginPath(); ctx.ellipse(boatX, boatY + 8, 48, 10, 0, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = "#5c3d2e";
      ctx.beginPath();
      ctx.moveTo(boatX - 45, boatY - 8);
      ctx.quadraticCurveTo(boatX, boatY + 18, boatX + 45, boatY - 8);
      ctx.quadraticCurveTo(boatX, boatY - 2, boatX - 45, boatY - 8);
      ctx.fill();
      ctx.strokeStyle = "#3d2314"; ctx.lineWidth = 2; ctx.stroke();

      ctx.fillStyle = "#ffd166";
      ctx.beginPath(); ctx.arc(boatX - 38, boatY - 12, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(255, 209, 102, 0.3)";
      ctx.beginPath(); ctx.arc(boatX - 38, boatY - 12, 12, 0, Math.PI * 2); ctx.fill();

      const charSkin = state.equippedSkins.character;
      const rodSkinObj = SKINS.rod.find(r => r.id === state.equippedSkins.rod);

      { const cs = SKINS.character.find(c => c.id === charSkin); ctx.fillStyle = (cs && cs.color) || "#06d6a0"; }
      ctx.fillRect(boatX - 8, boatY - 28, 16, 20);

      ctx.fillStyle = "#ffdbac"; ctx.beginPath(); ctx.arc(boatX, boatY - 33, 8, 0, Math.PI * 2); ctx.fill();

      if (charSkin === "char_pirate") {
        ctx.fillStyle = "#111"; ctx.fillRect(boatX - 12, boatY - 43, 24, 6); ctx.fillRect(boatX - 7, boatY - 48, 14, 6);
      } else {
        ctx.fillStyle = "#2a3d45"; ctx.beginPath(); ctx.arc(boatX, boatY - 35, 10, Math.PI, Math.PI * 2); ctx.fill();
      }

      let rodTipX = boatX + 32;
      let rodTipY = boatY - 38;

      if (state.phase === "REELING") {
        const bend = (state.tension / 100) * 18;
        rodTipX -= bend * 0.4;
        rodTipY += bend;
      }

      ctx.strokeStyle = rodSkinObj ? rodSkinObj.color : "#d8e2dc";
      ctx.lineWidth = 3.5; ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(boatX, boatY - 24);
      ctx.quadraticCurveTo(boatX + 16, boatY - 38, rodTipX, rodTipY);
      ctx.stroke();

      state.rodTip = { x: rodTipX, y: rodTipY };
    }

    function updateCastPhysics(dW, waterY) {
      if (state.phase === "FLYING") {
        state.castProgress += 0.035;
        const p = state.castProgress;
        const startX = state.rodTip.x;
        const startY = state.rodTip.y;
        const targetX = state.lureTarget.x;
        const targetY = state.lureTarget.y;

        state.lurePos.x = startX + (targetX - startX) * p;
        const arc = Math.sin(p * Math.PI) * 70;
        state.lurePos.y = startY + (targetY - startY) * p - arc;

        if (p >= 1) {
          state.phase = "WAITING";
          playSound("splash");
          triggerVibration([80]);
          state.ripples.push({ x: targetX, y: targetY, r: 2, alpha: 1 });
          const waitTime = 2000 + Math.random() * 3000;
          setTimeout(() => {
            if (state.phase === "WAITING") {
              state.phase = "HOOK";
              document.getElementById("btn-text").innerText = "FERRER !";
              playSound("bite");
              triggerVibration([120, 60, 120]);
              state.hookTimer = setTimeout(() => { if (state.phase === "HOOK") loseFish(); }, 1200);
            }
          }, waitTime);
        }
      }
    }

    function drawFishingLineAndLure(ctx, dW, waterY) {
      if (state.phase === "IDLE" || state.phase === "POWER") return;

      const origin = state.rodTip;
      let lureX = state.lurePos.x;
      let lureY = state.lurePos.y;

      if (state.phase === "WAITING" || state.phase === "HOOK" || state.phase === "REELING") {
        lureX = state.lureTarget.x;
        lureY = state.lureTarget.y + Math.sin(waveOffset * 2) * 3;
        if (state.phase === "HOOK" || (state.phase === "REELING" && state.surge === "warn")) lureY += Math.sin(Date.now() * 0.08) * 6;
      }

      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)"; ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      if (state.phase === "WAITING") {
        ctx.quadraticCurveTo((origin.x + lureX) / 2, Math.max(origin.y, lureY) + 15, lureX, lureY);
      } else {
        ctx.lineTo(lureX, lureY);
      }
      ctx.stroke();

      state.ripples.forEach((rip, idx) => {
        rip.r += 0.6; rip.alpha -= 0.02;
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, rip.alpha)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.ellipse(rip.x, rip.y, rip.r, rip.r * 0.3, 0, 0, Math.PI * 2); ctx.stroke();
        if (rip.alpha <= 0) state.ripples.splice(idx, 1);
      });

      // poisson accroché : visible sous l'eau pendant le combat
      if (state.phase === "REELING" && state.activeFish) {
        const fimg = (window.SPRITES || {})["fish_" + state.activeFish.id];
        if (spriteOK(fimg)) {
          const fw = { commune: 30, rare: 38, epique: 48, legendaire: 62 }[state.activeFish.rarity] || 30;
          const fh = fw * (fimg.naturalHeight / fimg.naturalWidth);
          const shake = state.surge === "warn" ? 0.28 : 0.1;
          ctx.save();
          ctx.translate(lureX, lureY + 2);                 // la bouche du poisson est sur l'appât
          ctx.rotate(Math.sin(Date.now() * (state.surge === "warn" ? 0.05 : 0.016)) * shake);
          ctx.globalAlpha = 0.92;
          ctx.drawImage(fimg, -fw * 0.98, -fh / 2, fw, fh);
          ctx.restore();
        }
      }

      const lureSkin = state.equippedSkins.lure;
      const lureImg = (window.SPRITES || {})[lureSkin];
      if (spriteOK(lureImg)) {
        ctx.save();
        ctx.translate(lureX, lureY);
        // léger balancement pour les appâts autres que le flotteur
        if (lureSkin !== "lure_classic" && state.phase !== "FLYING") ctx.rotate(Math.sin(Date.now() * 0.004) * 0.1);
        ctx.drawImage(lureImg, -12, -16, 24, 29);   // 192x232 px = 24x29 unités, centre = position de l'appât
        ctx.restore();
        return;
      }
      ctx.save();
      if (lureSkin === "lure_duck") {
        ctx.fillStyle = "#ffd166"; ctx.beginPath(); ctx.arc(lureX, lureY, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#f77f00"; ctx.fillRect(lureX + 3, lureY - 2, 4, 3);
      } else if (lureSkin === "lure_orb") {
        ctx.fillStyle = "#06d6a0"; ctx.beginPath(); ctx.arc(lureX, lureY, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(6, 214, 160, 0.4)"; ctx.beginPath(); ctx.arc(lureX, lureY, 12, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.fillStyle = "#ef476f"; ctx.beginPath(); ctx.arc(lureX, lureY, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.fillRect(lureX - 5, lureY - 8, 10, 4);
      }
      ctx.restore();
    }

    function spawnConfetti() {
      for (let i = 0; i < 40; i++) {
        state.particles.push({
          x: canvas.width / (2 * window.devicePixelRatio),
          y: canvas.height / (2 * window.devicePixelRatio),
          vx: (Math.random() - 0.5) * 12,
          vy: (Math.random() - 0.8) * 12,
          color: ["#ffd166", "#06d6a0", "#118ab2", "#ef476f", "#8338ec"][Math.floor(Math.random() * 5)],
          size: Math.random() * 6 + 4,
          life: 1
        });
      }
    }

    function updateAndDrawParticles(ctx) {
      state.particles.forEach((p, idx) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.life -= 0.02;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillRect(p.x, p.y, p.size, p.size);
        if (p.life <= 0) state.particles.splice(idx, 1);
      });
      ctx.globalAlpha = 1;
    }

    function renderMinigames(ctx, w, h) {
      if (state.phase === "POWER") {
        const barW = Math.min(240, w * 0.7); const barH = 20;
        const barX = (w - barW) / 2; const barY = h * 0.28;
        
        ctx.fillStyle = "rgba(8, 13, 26, 0.75)";
        ctx.beginPath(); ctx.roundRect(barX - 4, barY - 4, barW + 8, barH + 8, 12); ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"; ctx.lineWidth = 1.5; ctx.stroke();

        const fillW = (barW * state.power) / 100;
        const grad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
        grad.addColorStop(0, "#06d6a0"); grad.addColorStop(0.7, "#ffd166"); grad.addColorStop(1, "#ef476f");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.roundRect(barX, barY, fillW, barH, 8); ctx.fill();
      }

      if (state.phase === "HOOK") {
        ctx.fillStyle = "#ef476f"; ctx.font = "900 28px sans-serif";
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(239, 71, 111, 0.6)"; ctx.shadowBlur = 15;
        ctx.fillText("⚡ FERRER MAINTENANT ! ⚡", w / 2, h * 0.28);
        ctx.shadowBlur = 0;
      }

      if (state.phase === "REELING") {
        const barW = 28; const barH = 180;
        const barX = w - 48; const barY = (h - barH) / 2;

        ctx.fillStyle = "rgba(8, 13, 26, 0.8)";
        ctx.beginPath(); ctx.roundRect(barX, barY, barW, barH, 14); ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"; ctx.lineWidth = 1.5; ctx.stroke();

        const fightLevel = SKILL_UPGRADES.find(s => s.id === "fight_bar").level;
        const safeSizeRatio = 0.4 + (fightLevel - 1) * 0.05;
        const safeH = Math.min(barH * 0.85, barH * (safeSizeRatio + rodBonus())) * bossSafeMult();
        const safeY = barY + barH * (1 - (state.safeC === undefined ? 50 : state.safeC) / 100) - safeH / 2;

        ctx.fillStyle = "rgba(6, 214, 160, 0.4)";
        ctx.beginPath(); ctx.roundRect(barX + 2, safeY, barW - 4, safeH, 8); ctx.fill();
        ctx.strokeStyle = "#06d6a0"; ctx.lineWidth = 1; ctx.stroke();

        const cursorY = barY + barH - (barH * state.tension) / 100;
        const isSafe = cursorY >= safeY && cursorY <= safeY + safeH;

        ctx.fillStyle = isSafe ? "#06d6a0" : "#ef476f";
        ctx.shadowColor = isSafe ? "#06d6a0" : "#ef476f"; ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.roundRect(barX - 4, cursorY - 5, barW + 8, 10, 5); ctx.fill();
        ctx.shadowBlur = 0;

        const progW = Math.min(220, w * 0.65); const progX = (w - progW) / 2; const progY = h * 0.18;
        ctx.fillStyle = "rgba(8, 13, 26, 0.8)";
        ctx.beginPath(); ctx.roundRect(progX - 2, progY - 2, progW + 4, 14, 8); ctx.fill();
        ctx.fillStyle = state.boss ? ["#ff8c42", "#ff5a36", "#ff2e4d"][state.boss.phaseIdx] : "#118ab2";
        ctx.beginPath(); ctx.roundRect(progX, progY, (progW * state.reelProgress) / 100, 10, 6); ctx.fill();
        ctx.textAlign = "center"; ctx.font = "900 22px sans-serif";
        if (state.surge === "warn") { ctx.fillStyle = "#ffd166"; ctx.fillText("⚠️ ÇA TIRE ! RELÂCHE !", w / 2, h * 0.28); }
        else if (state.msgT > 0 && !(state.boss && state.boss.event === "tap")) { ctx.fillStyle = /^(ESQ|RÉS)/.test(state.msg) ? "#06d6a0" : state.msg.startsWith("🔥") || state.msg.startsWith("💀") ? "#ffd166" : "#ef476f"; ctx.fillText(state.msg, w / 2, h * 0.28); }
        const B = state.boss;
        if (B) {
          ctx.textAlign = "center"; ctx.font = "900 12px sans-serif"; ctx.fillStyle = "#ffd166";
          ctx.fillText(`⚔️ ${B.name.toUpperCase()} · ${BOSS_PHASES[B.phaseIdx]}`, w / 2, progY - 8);
          if (B.flash > 0) { ctx.fillStyle = `rgba(255,60,60,${(B.flash / 80) * 0.22})`; ctx.fillRect(0, 0, w, h); }
          if (B.intro > 0) {
            const a = Math.min(1, B.intro / 25, (110 - B.intro) / 12);
            ctx.fillStyle = `rgba(6,10,22,${0.62 * a})`; ctx.fillRect(0, h * 0.30, w, h * 0.26);
            ctx.globalAlpha = a; ctx.fillStyle = "#ffd166"; ctx.shadowColor = "rgba(255,120,40,.8)"; ctx.shadowBlur = 18;
            ctx.font = "900 21px sans-serif"; ctx.fillText("⚔️ COMBAT DE LÉGENDAIRE", w / 2, h * 0.40);
            ctx.shadowBlur = 0; ctx.fillStyle = "#fff"; ctx.font = "900 20px sans-serif"; ctx.fillText(B.name, w / 2, h * 0.47);
            ctx.font = "700 12px sans-serif"; ctx.fillStyle = "#c9d4e6"; ctx.fillText("Garde le curseur dans la zone verte !", w / 2, h * 0.52); ctx.globalAlpha = 1;
          }
          if (B.event === "tap") {
            const bw = Math.min(240, w * 0.7), bx = (w - bw) / 2, by = h * 0.47;
            ctx.fillStyle = "rgba(6,10,22,0.55)"; ctx.fillRect(0, h * 0.30, w, h * 0.27);
            ctx.shadowColor = "rgba(255,209,102,.8)"; ctx.shadowBlur = 14; ctx.fillStyle = "#ffd166"; ctx.font = "900 26px sans-serif";
            ctx.fillText(B.final ? "⚡ DERNIER SURSAUT !" : "⚡ MATRAQUE !", w / 2, h * 0.38); ctx.shadowBlur = 0;
            ctx.fillStyle = "#fff"; ctx.font = "900 22px sans-serif"; ctx.fillText(`${Math.min(B.tapCount, B.tapNeed)} / ${B.tapNeed}`, w / 2, h * 0.445);
            ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.beginPath(); ctx.roundRect(bx, by, bw, 10, 5); ctx.fill();
            ctx.fillStyle = B.eventT / B.eventMax < 0.3 ? "#ef476f" : "#06d6a0"; ctx.beginPath(); ctx.roundRect(bx, by, Math.max(0, bw * B.eventT / B.eventMax), 10, 5); ctx.fill();
            ctx.fillStyle = "#c9d4e6"; ctx.font = "700 12px sans-serif"; ctx.fillText("Tape vite sur le bouton !", w / 2, h * 0.53);
          }
        }
      }
    }

    /* ===== Combat de légendaire (boss) ===== */
    const BOSS_PHASES = ["PHASE 1", "FUREUR", "DERNIER SOUFFLE"];
    const bossSafeMult = () => state.boss ? [1, 0.82, 0.7][state.boss.phaseIdx] : 1;
    function newBoss(fish) {
      return { name: fish.name, intro: 110, phaseIdx: 0, maxPhase: 0, event: null, tapCount: 0, tapNeed: 0, eventT: 0, eventMax: 1, final: false, finalDone: false, nextEvent: 340, flash: 0 };
    }
    function bossStartTap(B, final) {
      B.event = "tap"; B.tapCount = 0; B.final = final;
      B.tapNeed = final ? 10 : [5, 7, 9][B.phaseIdx]; B.eventT = B.eventMax = final ? 200 : 140;
      state.surge = "none"; state.nextSurge = 140; state.isPressing = false; state.msgT = 0;
      playSound("warn"); triggerVibration([70]);
    }
    function bossTapStep(B) {
      B.eventT--;
      state.tension += (50 - state.tension) * 0.08;   // la ligne tient bon pendant le matraquage
      if (B.tapCount >= B.tapNeed) {
        B.event = null; B.nextEvent = Math.floor((330 + Math.random() * 150) * [1, 0.8, 0.65][B.phaseIdx]);
        if (B.final) { B.finalDone = true; state.reelProgress = 100; winFish(); return; }
        state.reelProgress = Math.min(99, state.reelProgress + 6); state.msg = "RÉSISTÉ ! 💪"; state.msgT = 50; playSound("win");
      } else if (B.eventT <= 0) {
        B.event = null; B.nextEvent = Math.floor((300 + Math.random() * 120) * [1, 0.8, 0.65][B.phaseIdx]);
        state.reelProgress = Math.max(6, state.reelProgress - (B.final ? 28 : 18)); state.msg = "ARRACHÉ ! 💢"; state.msgT = 60;
        playSound("thump"); triggerVibration([200]);
        if (B.final) B.nextEvent = 100;   // il retente vite son dernier sursaut
      }
    }
    function bossPhaseUpdate(B) {
      const pi = state.reelProgress >= 75 ? 2 : state.reelProgress >= 40 ? 1 : 0;
      if (pi > B.maxPhase) { B.maxPhase = pi; B.flash = 80; state.msg = pi === 1 ? "🔥 FUREUR !" : "💀 DERNIER SOUFFLE !"; state.msgT = 80; playSound("rare"); triggerVibration([80, 40, 80]); }
      B.phaseIdx = pi; if (B.flash > 0) B.flash--;
    }

    function gameLoop() {
      if (state.phase === "POWER") {
        const castLevel = SKILL_UPGRADES.find(s => s.id === "cast_bar").level;
        const speedMultiplier = Math.max(0.3, 1 - (castLevel - 1) * 0.12);
        state.power += state.powerDir * 2.4 * speedMultiplier;
        if (state.power >= 100 || state.power <= 0) state.powerDir *= -1;
      }

      if (state.phase === "REELING" && state.boss && state.boss.intro > 0) {
        state.boss.intro--; state.fT++;
      } else if (state.phase === "REELING") {
        const B = state.boss;
        if (B) bossPhaseUpdate(B);
        if (B && B.event === "tap") {
          bossTapStep(B); state.fT++; if (state.msgT > 0) state.msgT--;
        } else {
          const fightLevel = SKILL_UPGRADES.find(s => s.id === "fight_bar").level;
          if (state.isPressing) state.tension += 1.4; else state.tension -= 1.1;
          const stabilityFactor = Math.max(0.2, 1 - (fightLevel - 1) * 0.1);
          state.tension += (Math.random() - 0.5) * 1.6 * stabilityFactor;
          state.tension = Math.max(0, Math.min(100, state.tension));

          const safeSizeRatio = 0.4 + (fightLevel - 1) * 0.05;
          const d = ({ commune: 1, rare: 1.3, epique: 1.6, legendaire: 2 }[state.activeFish.rarity] || 1) * (B ? [1, 1.15, 1.3][B.phaseIdx] : 1);
          state.fT++; if (state.msgT > 0) state.msgT--;
          state.safeC += Math.sin(state.fT * 0.02 * d) * 0.35 * d;
          if (state.surge === "none") {
            if (--state.nextSurge <= 0) { state.surge = "warn"; state.surgeT = 36; playSound("bite"); triggerVibration([60]); }
          } else if (--state.surgeT <= 0) {
            if (state.isPressing) { state.tension += 38; state.msg = "TROP TENDU !"; }
            else { state.reelProgress = Math.min(100, state.reelProgress + 8); state.msg = "ESQUIVE ! 💨"; playSound("win"); }
            state.msgT = 50; state.surge = "none"; state.nextSurge = (200 + Math.random() * 180) / d;
          }
          state.tension = Math.max(0, Math.min(100, state.tension));
          const half = Math.min(42.5, (safeSizeRatio + rodBonus()) * 50) * bossSafeMult();
          state.safeC = Math.max(half, Math.min(100 - half, state.safeC));
          const minSafe = state.safeC - half;
          const maxSafe = state.safeC + half;

          if (state.tension >= minSafe && state.tension <= maxSafe) state.reelProgress += 0.42;
          else state.reelProgress -= 0.24;

          if (B && state.surge === "none" && --B.nextEvent <= 0 && state.reelProgress < 95) bossStartTap(B, false);
          if (state.reelProgress >= 100) {
            if (B && !B.finalDone) { state.reelProgress = 99; bossStartTap(B, true); }
            else winFish();
          } else if (state.reelProgress <= 0 || state.tension >= 100 || state.tension <= 0) loseFish();
        }
      }
    }
    setInterval(gameLoop, 1000 / 60);

    const actionBtn = document.getElementById("action-btn");
    const btnText = document.getElementById("btn-text");

    function handlePressStart(e) {
      if (e) e.preventDefault();
      initAudio(); actionBtn.classList.add("pressed");

      if (state.phase === "IDLE") {
        state.phase = "POWER"; state.power = 0; state.powerDir = 1; btnText.innerText = "RELÂCHER !";
      } else if (state.phase === "POWER") {
        state.phase = "FLYING"; state.castProgress = 0;
        const dW = canvas.width / window.devicePixelRatio;
        const waterY = (canvas.height / window.devicePixelRatio) * 0.46;
        const targetDist = dW * 0.45 + (dW * 0.45 * (state.power / 100));
        state.lureTarget = { x: targetDist, y: waterY };
        state.lurePos = { x: state.rodTip.x, y: state.rodTip.y };

        btnText.innerText = "ATTENTE..."; playSound("cast");
      } else if (state.phase === "HOOK") {
        if (state.hookTimer) clearTimeout(state.hookTimer);
        state.phase = "REELING"; state.reelProgress = 30; state.tension = 50; state.isPressing = true;
        state.safeC = 50; state.surge = "none"; state.nextSurge = 150; state.fT = 0; state.msg = ""; state.msgT = 0;
        state.activeFish = pickFish();
        state.boss = state.activeFish.rarity === "legendaire" ? newBoss(state.activeFish) : null;
        if (state.boss) { playSound("legend"); triggerVibration([120, 60, 120]); }
        btnText.innerText = "MAINTENIR !";
      } else if (state.phase === "REELING") {
        state.isPressing = true;
        if (state.boss && state.boss.event === "tap") { state.boss.tapCount++; playSound("ui"); triggerVibration([15]); }
      }
    }

    function handlePressEnd(e) {
      if (e) e.preventDefault();
      actionBtn.classList.remove("pressed");
      if (state.phase === "REELING") state.isPressing = false;
    }

    actionBtn.addEventListener("pointerdown", handlePressStart);
    window.addEventListener("pointerup", handlePressEnd);
    window.addEventListener("pointercancel", handlePressEnd);

    function winFish() {
      { const r = state.activeFish && state.activeFish.rarity; playSound(r === "legendaire" ? "legend" : (r === "rare" || r === "epique") ? "rare" : "win"); }
      triggerVibration([150, 50, 150]);
      spawnConfetti();
      state.phase = "CATCH_VIEW";

      const fish = state.activeFish;
      const weight = Math.floor(fish.minW + Math.random() * (fish.maxW - fish.minW));
      const boss = state.boss;
      const earnedGold = Math.floor(fish.price * (weight / fish.minW) * lureMult() * (boss ? 1.5 : 1));

      state.gold += earnedGold; state.xp += 25 + (boss ? 50 : 0);
      let bossBaitTxt = "";
      if (boss) {
        state.stats.bossWins++;
        state.baits.shine = Math.min(100000, (state.baits.shine || 0) + 2); bossBaitTxt = "+2 " + BAITS.find(b => b.id === "shine").emoji;
        if (Math.random() < 0.3) { state.baits.gold = Math.min(100000, (state.baits.gold || 0) + 1); bossBaitTxt += " +1 " + BAITS.find(b => b.id === "gold").emoji; }
      }

      const currentLure = SKINS.lure.find(l => l.id === state.equippedSkins.lure);
      const lureName = currentLure ? currentLure.name : "Flotteur Rouge";

      const timePeriods = ["Aube", "Jour", "Crépuscule", "Nuit"];
      const currentTimePeriod = getPeriod(hourNow());
      const today = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });

      if (!state.caughtFish[fish.id]) {
        state.caughtFish[fish.id] = {
          count: 1,
          maxWeight: weight,
          totalWeight: weight,
          bestDate: today,
          bestSpot: getSpot().name,
          bestLure: lureName,
          lures: { [lureName]: 1 },
          times: { [currentTimePeriod]: 1 }
        };
      } else {
        const rec = state.caughtFish[fish.id];
        rec.count += 1;
        rec.totalWeight += weight;
        if (weight > rec.maxWeight) {
          rec.maxWeight = weight;
          rec.bestDate = today;
          rec.bestSpot = getSpot().name;
          rec.bestLure = lureName;
        }
        rec.lures[lureName] = (rec.lures[lureName] || 0) + 1;
        rec.times[currentTimePeriod] = (rec.times[currentTimePeriod] || 0) + 1;
      }

      let leveled = false;
      while (state.xp >= state.level * 50) { state.xp -= state.level * 50; state.level += 1; leveled = true; }
      if (leveled) setTimeout(() => playSound("levelup"), 900);
      questEvent({ fish, weight, gold: earnedGold, period: currentTimePeriod, spot: state.spot, boss: !!boss });
      state.boss = null;

      saveGame(); updateHUD();
      // Envoie uniquement l'événement de capture ; le serveur calcule lui-même les statistiques du classement.
      window.dispatchEvent(new CustomEvent("pe:fish-caught", { detail: { fishId: fish.id, weightCm: weight, pseudo: state.pseudo || "Pêcheur", level: state.level, xp: state.xp } }));

      document.getElementById("catch-emoji").innerHTML = fishIcon(fish);
      document.getElementById("catch-name").innerText = fish.name;
      document.getElementById("catch-rarity").innerText = fish.rarity.toUpperCase() + (boss ? " · COMBAT GAGNÉ ⚔️" : "");
      document.getElementById("catch-rarity").className = `fish-rarity rarity-${fish.rarity}`;
      document.getElementById("catch-weight").innerText = `${weight} cm`;
      document.getElementById("catch-gold").innerText = `+${earnedGold} 🪙` + (boss ? ` · +50 XP ${bossBaitTxt}` : "");

      const currentMaxXP = state.level * 50;
      const xpPct = Math.min(100, Math.floor((state.xp / currentMaxXP) * 100));
      document.getElementById("xp-text").innerText = `${state.xp} / ${currentMaxXP} XP`;
      document.getElementById("xp-bar").style.width = `${xpPct}%`;

      document.getElementById("catch-modal").classList.add("active");
    }

    function loseFish() {
      playSound("lose"); triggerVibration([300]);
      toast(state.boss ? "⚔️ Le légendaire t'a échappé… Reviens plus fort !" : "🐟 Le poisson s'est échappé !");
      resetState();
    }

    function resetState() {
      state.phase = "IDLE"; state.isPressing = false; state.boss = null;
      btnText.innerText = "LANCER LA LIGNE";
    }

    let hudKey = "";
    function updateHUD() {
      document.getElementById("gold-val").innerText = state.gold;
      document.getElementById("level-val").innerText = state.level;
      let currentRank = RANKS[0];
      RANKS.forEach(r => { if (state.level >= r.minLvl) currentRank = r; });
      const rankElem = document.getElementById("rank-val");
      rankElem.innerText = currentRank.name; rankElem.style.color = currentRank.color;
      document.getElementById("hud-name").innerText = state.pseudo || "Pêcheur";
      document.getElementById("hud-xp-bar").style.width = Math.min(100, Math.floor((state.xp / (state.level * 50)) * 100)) + "%";
      document.getElementById("hud-card").style.setProperty("--rc", currentRank.color);
      try {   // avatar encadré + bannière du profil (peut échouer tant que les données du profil ne sont pas chargées)
        const rp = resolvedProfile(), key = rp.frame + "|" + rp.avatar + "|" + rp.banner;
        if (key !== hudKey) {
          document.getElementById("hud-av").innerHTML = frameHTML(rp.frame, rp.avatar, 66);
          document.getElementById("hud-ban").style.backgroundImage = `url(${spriteSrc("spot_" + rp.banner)})`;
          hudKey = key;
        }
      } catch (e) { /* réessai au prochain appel */ }
    }

    /* Modal Navigation & Rendering */
    const shopModal = document.getElementById("shop-modal");
    const levelModal = document.getElementById("level-modal");
    const dexModal = document.getElementById("dex-modal");
    const fishDetailModal = document.getElementById("fish-detail-modal");
    const skinsModal = document.getElementById("skins-modal");
    const profileModal = document.getElementById("profile-modal");

    document.getElementById("shop-btn").onclick = () => { renderShop(); shopModal.classList.add("active"); };
    document.getElementById("close-shop").onclick = () => shopModal.classList.remove("active");

    const hudCard = document.getElementById("hud-card");
    const openProfileFromHud = () => { renderProfile(); profileModal.classList.add("active"); playSound("ui"); };
    hudCard.onclick = openProfileFromHud;
    hudCard.onkeydown = e => { if ((e.key === "Enter" || e.key === " ") && e.target === hudCard) { e.preventDefault(); openProfileFromHud(); } };
    document.getElementById("close-profile").onclick = () => profileModal.classList.remove("active");

    document.getElementById("level-btn").onclick = (e) => {
      e.stopPropagation();
      document.getElementById("modal-lvl").innerText = state.level;
      const currentMaxXP = state.level * 50;
      document.getElementById("modal-xp-text").innerText = `${state.xp} / ${currentMaxXP} XP`;
      document.getElementById("modal-xp-bar").style.width = `${Math.min(100, Math.floor((state.xp / currentMaxXP) * 100))}%`;
      renderLevelUpgrades();
      levelModal.classList.add("active");
    };
    document.getElementById("close-level").onclick = () => levelModal.classList.remove("active");

    document.getElementById("dex-btn").onclick = () => { renderDex(); dexModal.classList.add("active"); };
    document.getElementById("close-dex").onclick = () => dexModal.classList.remove("active");

    document.getElementById("close-fish-detail").onclick = () => fishDetailModal.classList.remove("active");
    document.getElementById("back-to-dex").onclick = () => {
      fishDetailModal.classList.remove("active");
      dexModal.classList.add("active");
    };

    document.querySelectorAll("img[data-sprite]").forEach(i => { const s = window.SPRITES && window.SPRITES[i.dataset.sprite]; if (s) i.src = s.src; });
    document.getElementById("skins-btn").onclick = () => { renderSkins(); skinsModal.classList.add("active"); };
    document.getElementById("close-skins").onclick = () => skinsModal.classList.remove("active");

    document.getElementById("catch-ok-btn").onclick = () => {
      document.getElementById("catch-modal").classList.remove("active");
      resetState();
    };

    function renderProfileOld() {
      let currentRank = RANKS[0];
      RANKS.forEach(r => { if (state.level >= r.minLvl) currentRank = r; });

      let totalCatches = 0;
      let maxRecordOverall = 0;
      let uniqueCaught = Object.keys(state.caughtFish).length;

      Object.values(state.caughtFish).forEach(rec => {
        totalCatches += rec.count;
        if (rec.maxWeight > maxRecordOverall) maxRecordOverall = rec.maxWeight;
      });

      const container = document.getElementById("profile-content");
      container.innerHTML = `
        <div class="detail-card" style="align-items: center; text-align: center;">
          <div style="font-size: 60px; margin-bottom: 4px;">🎣</div>
          <div class="detail-fish-title">PÊCHEUR EXPERT</div>
          <div class="badge-group">
            <span class="badge" style="background: ${currentRank.color}; color: #0b131e;">${currentRank.name}</span>
            <span class="badge badge-count">NIVEAU ${state.level}</span>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-tile">
            <span class="stat-tile-lbl">ESPÈCES</span>
            <span class="stat-tile-val">${uniqueCaught} / ${SPECIES.length}</span>
          </div>
          <div class="stat-tile">
            <span class="stat-tile-lbl">TOTAL PRISES</span>
            <span class="stat-tile-val">${totalCatches}</span>
          </div>
          <div class="stat-tile">
            <span class="stat-tile-lbl">RECORD MAX</span>
            <span class="stat-tile-val">${maxRecordOverall} CM</span>
          </div>
        </div>

        <div class="shop-item">
          <div class="shop-item-info">
            <h4>Trésor Accumulé</h4>
            <p>Pièces d'or gagnées au total</p>
          </div>
          <div style="font-size: 18px; font-weight: 900; color: var(--accent-gold);">🪙 ${state.gold}</div>
        </div>
      `;
    }

    function setDexFilter(filter, evt) {
      state.dexFilter = filter;
      document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
      if (evt) evt.target.classList.add("active");
      renderDex();
    }

    let dexRarity = "all";
    const DEX_RL = { commune: "Commun", rare: "Rare", epique: "Épique", legendaire: "Légendaire" };
    window.setDexRarity = function (r) { dexRarity = r; renderDex(); };
    const silIcon = f => fishIcon(f).replace('class="fish-img"', 'class="fish-img sil"');

    function renderDex() {
      const head = document.getElementById("dex-head"), container = document.getElementById("dex-items");
      const total = SPECIES.length, found = SPECIES.filter(f => state.caughtFish[f.id]).length;
      const catches = Object.values(state.caughtFish).reduce((a, r) => a + r.count, 0);
      const chips = ["commune", "rare", "epique", "legendaire"].map(r => {
        const t = SPECIES.filter(f => f.rarity === r), n = t.filter(f => state.caughtFish[f.id]).length;
        return `<button class="dx-chip r-${r} ${dexRarity === r ? "active" : ""}" onclick="setDexRarity('${r}')">${DEX_RL[r]} <b>${n}/${t.length}</b></button>`;
      }).join("");
      head.innerHTML = `<div class="dx-sum"><div class="dx-sum-top"><span>Espèces découvertes</span><b>${found} / ${total}</b></div>
        <div class="dx-bar"><i style="width:${found / total * 100}%"></i></div><small>${catches} prise${catches > 1 ? "s" : ""} au total</small></div>
        <div class="dx-chips"><button class="dx-chip ${dexRarity === "all" ? "active" : ""}" onclick="setDexRarity('all')">Toutes</button>${chips}</div>`;
      const list = SPECIES.filter(f => {
        const got = !!state.caughtFish[f.id];
        if (state.dexFilter === "caught" && !got) return false;
        if (state.dexFilter === "missing" && got) return false;
        return dexRarity === "all" || f.rarity === dexRarity;
      });
      container.innerHTML = list.length ? "" : `<div class="inv-note" style="grid-column:1/-1;padding:24px 0">Aucun poisson dans cette catégorie.</div>`;
      list.forEach(f => {
        const rec = state.caughtFish[f.id], card = document.createElement("div");
        card.className = `dx-card r-${f.rarity} ${rec ? "" : "locked"}`;
        if (rec) {
          card.innerHTML = `<div class="dx-img">${fishIcon(f)}</div><div class="dx-name">${f.name}</div><span class="dx-rar r-${f.rarity}">${DEX_RL[f.rarity]}</span>
            <div class="dx-stats"><span>🎣 ${rec.count}</span><span>📏 ${rec.maxWeight} cm</span></div>`;
          card.onclick = () => openFishDetail(f.id);
        } else {
          card.innerHTML = `<div class="dx-img">${silIcon(f)}</div><div class="dx-name">???</div><span class="dx-rar r-${f.rarity}">${DEX_RL[f.rarity]}</span>
            <div class="dx-stats hint">📍 ${spotName(f.spots[0])}${f.only ? " · 🌙 " + f.only.join("/") : ""}</div>`;
        }
        container.appendChild(card);
      });
    }

    function openFishDetail(fishId) {
      const fish = SPECIES.find(f => f.id === fishId);
      const record = state.caughtFish[fishId];
      if (!fish || !record) return;

      const avgWeight = Math.round(record.totalWeight / record.count);

      let lureRowsHTML = "";
      const totalLureCatches = record.count;
      Object.keys(record.lures || {}).forEach(lureName => {
        const cnt = record.lures[lureName];
        const pct = Math.round((cnt / totalLureCatches) * 100);
        lureRowsHTML += `
          <div class="lure-stat-row">
            <div class="lure-stat-top">
              <span>🎣 ${esc(lureName)}</span>
              <span>${cnt} (${pct}%)</span>
            </div>
            <div class="lure-progress-bg">
              <div class="lure-progress-fill" style="width: ${pct}%"></div>
            </div>
          </div>
        `;
      });

      const timePeriods = ["Aube", "Jour", "Crépuscule", "Nuit"];
      let maxTimeVal = 1;
      timePeriods.forEach(p => {
        const val = (record.times && record.times[p]) ? record.times[p] : 0;
        if (val > maxTimeVal) maxTimeVal = val;
      });

      let timeBarsHTML = "";
      timePeriods.forEach(p => {
        const val = (record.times && record.times[p]) ? record.times[p] : 0;
        const heightPct = Math.round((val / maxTimeVal) * 100);
        timeBarsHTML += `
          <div class="time-bar-col">
            <span class="time-bar-val">${val}</span>
            <div class="time-bar-fill" style="height: ${Math.max(4, heightPct)}%;"></div>
            <span class="time-bar-lbl">${p}</span>
          </div>
        `;
      });

      const container = document.getElementById("fish-detail-content");
      container.innerHTML = `
        <div class="detail-card">
          <div class="detail-header-top">
            <div>
              <div class="detail-fish-title">${fish.name}</div>
              <div style="margin:6px 0 4px">${fishIcon(fish, 150)}</div>
              <div class="badge-group">
                <span class="badge badge-rarity">${fish.rarity}</span>
                <span class="badge badge-count">${record.count} CARTES</span>
              </div>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-tile">
              <span class="stat-tile-lbl">RECORD</span>
              <span class="stat-tile-val">${record.maxWeight} CM</span>
            </div>
            <div class="stat-tile">
              <span class="stat-tile-lbl">PRISES</span>
              <span class="stat-tile-val">${record.count}</span>
            </div>
            <div class="stat-tile">
              <span class="stat-tile-lbl">MOYENNE</span>
              <span class="stat-tile-val">${avgWeight} CM</span>
            </div>
          </div>

          <div class="best-catch-info">
            Plus belle prise : <strong>${esc(record.bestDate || 'Récemment')}</strong> • <strong>${esc(record.bestSpot || fish.spots.map(spotName).join(', '))}</strong> • <strong>${esc(record.bestLure || 'Flotteur Rouge')}</strong>
          </div>

          <div class="section-subtitle">LEURRES QUI LE PRENNENT</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${lureRowsHTML}
          </div>

          <div class="section-subtitle">QUAND</div>
          <div class="time-chart">
            ${timeBarsHTML}
          </div>
        </div>
      `;

      dexModal.classList.remove("active");
      fishDetailModal.classList.add("active");
    }

    function renderShop() {
      const container = document.getElementById("shop-items"); container.innerHTML = "";
      UPGRADES.forEach((up, idx) => {
        const cost = Math.floor(up.basePrice * Math.pow(up.mult, up.level - 1));
        const div = document.createElement("div"); div.className = "shop-item";
        div.innerHTML = `<div class="shop-item-info"><h4>${up.name} (Niv. ${up.level})</h4><p>${up.desc}</p></div><button class="buy-btn" ${state.gold < cost ? "disabled" : ""} onclick="buyUpgrade(${idx})">${cost} 🪙</button>`;
        container.appendChild(div);
      });
    }

    window.buyUpgrade = function(index) {
      const up = UPGRADES[index]; const cost = Math.floor(up.basePrice * Math.pow(up.mult, up.level - 1));
      if (state.gold >= cost) { state.gold -= cost; up.level += 1; saveGame(); updateHUD(); renderShop(); }
    };

    function renderLevelUpgrades() {
      const container = document.getElementById("level-items"); container.innerHTML = "";
      SKILL_UPGRADES.forEach((up, idx) => {
        const cost = Math.floor(up.basePrice * Math.pow(up.mult, up.level - 1));
        const div = document.createElement("div"); div.className = "shop-item";
        div.innerHTML = `<div class="shop-item-info"><h4>${up.name} (Niv. ${up.level})</h4><p>${up.desc}</p></div><button class="buy-btn" ${state.gold < cost ? "disabled" : ""} onclick="buySkillUpgrade(${idx})">${cost} 🪙</button>`;
        container.appendChild(div);
      });
    }

    window.buySkillUpgrade = function(index) {
      const up = SKILL_UPGRADES[index]; const cost = Math.floor(up.basePrice * Math.pow(up.mult, up.level - 1));
      if (state.gold >= cost) { state.gold -= cost; up.level += 1; saveGame(); updateHUD(); renderLevelUpgrades(); }
    };

    function renderSkins() {
      const container = document.getElementById("skins-items"); container.innerHTML = "";
      Object.keys(SKINS).forEach(cat => {
        SKINS[cat].forEach(s => {
          const isEquipped = state.equippedSkins[cat] === s.id;
          const div = document.createElement("div"); div.className = "shop-item";
          div.innerHTML = `<div class="shop-item-info"><h4>${s.name}</h4><p>${s.unlocked ? (isEquipped ? "Équipé" : "Débloqué") : "Verrouillé"}</p></div><button class="buy-btn ${isEquipped ? 'equipped' : ''}" onclick="selectSkin('${cat}', '${s.id}')">${isEquipped ? 'ÉQUIPÉ' : (s.unlocked ? 'ÉQUIPER' : s.price + ' 🪙')}</button>`;
          container.appendChild(div);
        });
      });
    }

    window.selectSkin = function(cat, id) {
      const skin = SKINS[cat].find(s => s.id === id);
      if (skin.unlocked) { state.equippedSkins[cat] = id; }
      else if (state.gold >= skin.price) { state.gold -= skin.price; skin.unlocked = true; state.equippedSkins[cat] = id; }
      saveGame(); updateHUD(); renderSkins();
    };

    const spotsModal = document.getElementById("spots-modal");
    document.getElementById("spots-btn").onclick = () => { renderSpots(); spotsModal.classList.add("active"); };
    document.getElementById("close-spots").onclick = () => spotsModal.classList.remove("active");

    function renderSpots(note) {
      const c = document.getElementById("spots-items");
      let html = note ? `<p class="sp-note">${note}</p>` : "";
      SPOTS.forEach(s => {
        const un = !!state.unlockedSpots[s.id], cur = state.spot === s.id, lvlLock = !un && state.level < s.minLvl;
        let label, dis = "";
        if (cur) label = "ACTUEL"; else if (un) label = "ALLER";
        else if (lvlLock) { label = "Niveau " + s.minLvl + " requis"; dis = "disabled"; }
        else { label = "Débloquer · " + s.price + " 🪙"; if (state.gold < s.price) dis = "disabled"; }
        const fishes = SPECIES.filter(f => f.spots.includes(s.id)), found = fishes.filter(f => state.caughtFish[f.id]).length;
        const thumbs = fishes.map(f => state.caughtFish[f.id] ? fishIcon(f) : silIcon(f)).join("");
        const tag = cur ? "📍 ACTUEL" : un ? "✓ Débloqué" : lvlLock ? "🔒 Niveau " + s.minLvl : "🔓 " + s.price + " 🪙";
        html += `<div class="sp ${cur ? "cur" : ""} ${lvlLock ? "locked" : ""}">
          <div class="sp-ban"><img src="${spriteSrc("spot_" + s.id)}" alt=""><span class="sp-tag">${tag}</span></div>
          <div class="sp-body"><h4>${s.name}</h4><p>${s.desc}</p>
            <div class="sp-prog"><div class="dx-bar"><i style="width:${fishes.length ? found / fishes.length * 100 : 0}%"></i></div><small>${found} / ${fishes.length} espèces découvertes</small></div>
            <div class="sp-thumbs">${thumbs}</div>
            <button class="buy-btn ${cur ? "equipped" : ""}" ${dis} onclick="selectSpot('${s.id}')">${label}</button></div></div>`;
      });
      c.innerHTML = html;
    }

    window.selectSpot = function(id) {
      const s = SPOTS.find(x => x.id === id); if (!s) return;
      if (state.phase !== "IDLE") { renderSpots("Termine ta pêche avant de changer de spot."); return; }
      if (!state.unlockedSpots[id]) {
        if (state.level < s.minLvl || state.gold < s.price) return;
        state.gold -= s.price; state.unlockedSpots[id] = true; playSound("coin");
      }
      state.spot = id; startAmbience(id); saveGame(); updateHUD(); updateChips(); renderSpots();
    };

    /* Mon compte */
    const TITLES = [
      { id: "none", name: "Aucun", hint: "", ok: s => true },
      { id: "first", name: "Première prise", hint: "Attrape un poisson", ok: s => s.catches >= 1 },
      { id: "vet", name: "Vétéran", hint: "100 prises", ok: s => s.catches >= 100 },
      { id: "collec", name: "Collectionneur", hint: "10 espèces découvertes", ok: s => s.species >= 10 },
      { id: "night", name: "Chasseur de nuit", hint: "10 prises la nuit", ok: s => s.night >= 10 },
      { id: "legend", name: "Chasseur de légendes", hint: "Attrape un légendaire", ok: s => s.legend >= 1 },
      { id: "explo", name: "Explorateur", hint: "Débloque 4 spots", ok: s => s.spots >= 4 },
      { id: "boss", name: "Dompteur de légendes", hint: "Gagne 3 combats de légendaires", ok: s => s.boss >= 3 },
      { id: "quests", name: "Chasseur de quêtes", hint: "Termine 15 quêtes", ok: s => s.quests >= 15 }
    ];
    const RANK_EMBLEMS = ["🎣", "🐟", "⚓", "🔱", "🐉"];
    const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

    /* ===== Quêtes du jour / de la semaine ===== */
    const QUEST_TIERS = lvl => lvl < 5 ? 0 : lvl < 12 ? 1 : 2;
    const QUEST_NEED = { catch: [6, 10, 15], night: [2, 3, 4], rare: [1, 2, 3], spot: [3, 5, 7], species: [3, 4, 6], gold: [200, 500, 1200], big: [1, 2, 3], boss: [1, 1, 1],
                         wcatch: [40, 60, 90], wrare: [6, 10, 15], wspecies: [6, 8, 12], wgold: [1500, 4000, 9000], wbig: [5, 8, 12] };
    const QUEST_ICON = { catch: "🎣", night: "🌙", rare: "💎", spot: "📍", species: "📖", gold: "🪙", big: "📏", boss: "⚔️" };
    const questKind = t => t.replace(/^w/, "");
    const spotNameOf = id => { const s = SPOTS.find(x => x.id === id); return s ? s.name : "ce spot"; };
    function questText(q) {
      const n = q.need, pl = n > 1 ? "s" : "";
      switch (questKind(q.t)) {
        case "catch": return `Attrape ${n} poisson${pl}`;
        case "night": return `Attrape ${n} poisson${pl} la nuit`;
        case "rare": return `Attrape ${n} poisson${pl} rare${pl} ou mieux`;
        case "spot": return `Attrape ${n} poissons à ${spotNameOf(q.spot)}`;
        case "species": return `Attrape ${n} espèces différentes`;
        case "gold": return `Gagne ${n} 🪙 en pêchant`;
        case "big": return `Attrape ${n} gros poisson${pl} (60 % de la taille max)`;
        case "boss": return `Gagne ${n} combat${pl} de légendaire${pl}`;
      }
      return "Quête";
    }
    const pad2 = n => String(n).padStart(2, "0");
    const dayKeyOf = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
    function weekKeyOf(d) { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return dayKeyOf(x); }
    function seededRng(str) {
      let h = 1779033703 ^ str.length;
      for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
      let a = h >>> 0;
      return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    }
    const shuffled = (arr, rnd) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const roundTo5 = n => Math.max(5, Math.round(n / 5) * 5);
    function availableSpeciesCount() { return SPECIES.filter(f => f.spots.some(s => state.unlockedSpots[s])).length; }
    function mkQuest(t, tier, rnd, weekly) {
      const lvl = state.level;
      const q = { t, need: QUEST_NEED[t][tier], have: 0, claimed: false, gold: 0, xp: 0, baits: {} };
      if (questKind(t) === "species") { q.need = Math.max(2, Math.min(q.need, availableSpeciesCount() - 1)); q.seen = []; }
      if (t === "spot") { const spots = Object.keys(state.unlockedSpots).filter(id => SPOTS.some(s => s.id === id)); q.spot = spots[Math.floor(rnd() * spots.length)] || "lac"; }
      if (weekly) { q.gold = roundTo5(250 + lvl * 25); q.xp = 80 + tier * 40; q.baits = tier >= 2 ? { shine: 2, gold: 1 } : { shine: 2 }; }
      else { q.gold = roundTo5(30 + lvl * 6); q.xp = 10 + tier * 5; }
      return q;
    }
    function genDaily(dk) {
      const tier = QUEST_TIERS(state.level), rnd = seededRng("d" + dk + ":" + tier);
      const pool = shuffled(["night", "rare", "spot", "species", "gold", "big"], rnd);
      return ["catch", pool[0], pool[1]].map(t => mkQuest(t, tier, rnd, false));
    }
    function genWeekly(wk) {
      const tier = QUEST_TIERS(state.level), rnd = seededRng("w" + wk + ":" + tier);
      const legendReachable = SPECIES.some(f => f.rarity === "legendaire" && f.spots.some(s => state.unlockedSpots[s]));
      const a = ["wcatch", "wgold"][Math.floor(rnd() * 2)];
      const second = shuffled(["wrare", "wspecies", "wbig"].concat(legendReachable ? ["boss", "boss"] : []), rnd)[0];
      return [mkQuest(a, tier, rnd, true), mkQuest(second, tier, rnd, true)];
    }
    function sanitizeQuests(raw) {
      const keyOk = v => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);
      if (!isPlainObject(raw) || !keyOk(raw.day) || !keyOk(raw.week)) return null;
      const cleanList = list => (Array.isArray(list) ? list : []).slice(0, 4).map(q => {
        if (!isPlainObject(q) || !QUEST_NEED[q.t]) return null;
        const out = { t: q.t, need: Math.floor(clampNumber(q.need, 1, 1, 100000)), have: 0, claimed: !!q.claimed, gold: Math.floor(clampNumber(q.gold, 0, 0, 100000)), xp: Math.floor(clampNumber(q.xp, 0, 0, 10000)), baits: {} };
        out.have = Math.floor(clampNumber(q.have, 0, 0, out.need));
        if (isPlainObject(q.baits)) BAITS.forEach(b => { const n = Math.floor(clampNumber(q.baits[b.id], 0, 0, 20)); if (n) out.baits[b.id] = n; });
        if (q.t === "spot") out.spot = SPOTS.some(s => s.id === q.spot) ? q.spot : "lac";
        if (questKind(q.t) === "species") out.seen = (Array.isArray(q.seen) ? q.seen : []).filter(id => typeof id === "string" && SPECIES.some(f => f.id === id)).slice(0, 60);
        return out;
      }).filter(Boolean);
      return { day: raw.day, week: raw.week, daily: cleanList(raw.daily), weekly: cleanList(raw.weekly), bonusClaimed: !!raw.bonusClaimed,
               streak: Math.floor(clampNumber(raw.streak, 0, 0, 10000)), lastBonus: keyOk(raw.lastBonus) ? raw.lastBonus : "" };
    }
    function ensureQuests() {
      const now = new Date(), dk = dayKeyOf(now), wk = weekKeyOf(now);
      let q = state.quests;
      if (!q) q = state.quests = { day: "", week: "", daily: [], weekly: [], bonusClaimed: false, streak: 0, lastBonus: "" };
      if (q.day !== dk || !q.daily.length) { q.day = dk; q.daily = genDaily(dk); q.bonusClaimed = false; }
      if (q.week !== wk || !q.weekly.length) { q.week = wk; q.weekly = genWeekly(wk); }
      return q;
    }
    function gainXP(n) {
      state.xp += n; let up = false;
      while (state.xp >= state.level * 50) { state.xp -= state.level * 50; state.level++; up = true; }
      if (up) setTimeout(() => playSound("levelup"), 350);
    }
    function giveReward(r) {
      if (r.gold) state.gold += r.gold;
      if (r.xp) gainXP(r.xp);
      Object.keys(r.baits || {}).forEach(id => { if (BAITS.some(b => b.id === id)) state.baits[id] = Math.min(100000, (state.baits[id] || 0) + r.baits[id]); });
    }
    const rewardText = r => [r.gold ? `+${r.gold} 🪙` : "", r.xp ? `+${r.xp} XP` : ""].concat(Object.keys(r.baits || {}).map(id => { const b = BAITS.find(x => x.id === id); return b ? `+${r.baits[id]} ${b.emoji}` : ""; })).filter(Boolean).join(" · ");
    let toastT = null;
    function toast(msg) {
      let el = document.getElementById("toast");
      if (!el) { el = document.createElement("div"); el.id = "toast"; el.setAttribute("role", "status"); document.getElementById("game-container").appendChild(el); }
      el.textContent = msg; el.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove("show"), 3200);
    }
    function questEvent(ev) {
      const q = ensureQuests(); let changed = false; const done = [];
      q.daily.concat(q.weekly).forEach(x => {
        if (x.have >= x.need) return;
        let add = 0;
        switch (questKind(x.t)) {
          case "catch": add = 1; break;
          case "night": if (ev.period === "Nuit") add = 1; break;
          case "rare": if (ev.fish.rarity !== "commune") add = 1; break;
          case "spot": if (ev.spot === x.spot) add = 1; break;
          case "species": if (x.seen && !x.seen.includes(ev.fish.id)) { x.seen.push(ev.fish.id); add = 1; } break;
          case "gold": add = ev.gold; break;
          case "big": if (ev.weight >= ev.fish.minW + 0.6 * (ev.fish.maxW - ev.fish.minW)) add = 1; break;
          case "boss": if (ev.boss) add = 1; break;
        }
        if (add > 0) { x.have = Math.min(x.need, x.have + add); changed = true; if (x.have >= x.need) done.push(x); }
      });
      if (changed) { saveGame(); refreshQuestBadge(); }
      if (done.length) setTimeout(() => toast(`🎯 Quête terminée : ${questText(done[0])}${done.length > 1 ? ` (+${done.length - 1})` : ""}`), 900);
    }
    function claimableCount() {
      const q = ensureQuests();
      const n = q.daily.concat(q.weekly).filter(x => x.have >= x.need && !x.claimed).length;
      return n + (!q.bonusClaimed && q.daily.length && q.daily.every(x => x.claimed) ? 1 : 0);
    }
    function refreshQuestBadge() {
      const btn = document.getElementById("quests-btn"); if (!btn) return;
      const n = claimableCount(); btn.classList.toggle("has-dot", n > 0); btn.dataset.n = n > 9 ? "9+" : String(n);
      if (document.getElementById("quests-modal").classList.contains("active")) renderQuests();
    }
    window.claimQuest = function (kind, i) {
      const q = ensureQuests(), x = (kind === "w" ? q.weekly : q.daily)[i];
      if (!x || x.claimed || x.have < x.need) return;
      x.claimed = true; state.stats.questsDone++; giveReward(x);
      playSound("coin"); triggerVibration([40]); saveGame(); updateHUD(); refreshQuestBadge(); renderQuests();
    };
    const streakMult = s => Math.min(1.5, 1 + 0.1 * Math.max(0, s - 1));
    function bonusReward() {
      const q = ensureQuests(), tier = QUEST_TIERS(state.level);
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      const streak = q.lastBonus === dayKeyOf(yesterday) ? q.streak + 1 : (q.lastBonus === q.day ? q.streak : 1);
      return { streak, gold: roundTo5((100 + state.level * 12) * streakMult(streak)), xp: 30, baits: tier >= 1 ? { worm: 3, shine: 1 } : { worm: 3 } };
    }
    window.claimBonus = function () {
      const q = ensureQuests();
      if (q.bonusClaimed || !q.daily.length || !q.daily.every(x => x.claimed)) return;
      const r = bonusReward(); q.bonusClaimed = true; q.streak = r.streak; q.lastBonus = q.day;
      giveReward(r); playSound("legend"); triggerVibration([60, 40, 60]); saveGame(); updateHUD(); refreshQuestBadge(); renderQuests();
      toast(`🎁 Bonus du jour récupéré ! Série : ${r.streak} jour${r.streak > 1 ? "s" : ""}`);
    };
    function untilText(target) {
      const ms = Math.max(0, target - Date.now()), m = Math.ceil(ms / 60000), d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60;
      return d > 0 ? `${d} j ${h} h` : h > 0 ? `${h} h ${pad2(mm)}` : `${mm} min`;
    }
    function questCard(x, kind, i) {
      const pct = Math.min(100, Math.floor(x.have / x.need * 100)), done = x.have >= x.need;
      const btn = x.claimed ? `<div class="qc-state ok">✓ Récupérée</div>` : done ? `<button class="qc-claim" onclick="claimQuest('${kind}',${i})">Récupérer</button>` : `<div class="qc-state">${Math.min(x.have, x.need)} / ${x.need}</div>`;
      return `<div class="qcard ${done ? "done" : ""} ${x.claimed ? "claimed" : ""}"><div class="qc-ic">${QUEST_ICON[questKind(x.t)] || "🎯"}</div>
        <div class="qc-main"><div class="qc-txt">${esc(questText(x))}</div><div class="qc-bar"><i style="width:${pct}%"></i></div><div class="qc-rw">${esc(rewardText(x))}</div></div>${btn}</div>`;
    }
    function renderQuests() {
      const box = document.getElementById("quests-content"); if (!box) return;
      const q = ensureQuests(), now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();
      const nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (8 - ((now.getDay() + 6) % 7 + 1))).getTime();
      const dailyClaimed = q.daily.filter(x => x.claimed).length, allDone = q.daily.length && dailyClaimed === q.daily.length;
      const br = bonusReward();
      const bonus = q.bonusClaimed ? `<div class="qcard claimed bonus"><div class="qc-ic">🎁</div><div class="qc-main"><div class="qc-txt">Bonus du jour</div><div class="qc-rw">Récupéré · série de ${q.streak} jour${q.streak > 1 ? "s" : ""} 🔥</div></div><div class="qc-state ok">✓</div></div>`
        : `<div class="qcard bonus ${allDone ? "done" : ""}"><div class="qc-ic">🎁</div><div class="qc-main"><div class="qc-txt">Bonus du jour : termine les ${q.daily.length} quêtes</div><div class="qc-bar"><i style="width:${Math.floor(dailyClaimed / Math.max(1, q.daily.length) * 100)}%"></i></div><div class="qc-rw">${esc(rewardText(br))} · série ${br.streak} 🔥 (×${streakMult(br.streak).toFixed(1)} or)</div></div>${allDone ? `<button class="qc-claim" onclick="claimBonus()">Récupérer</button>` : `<div class="qc-state">${dailyClaimed} / ${q.daily.length}</div>`}</div>`;
      const st = profileStats();
      box.innerHTML = `<div class="q-head"><span>Quêtes du jour</span><small>Nouvelles dans ${untilText(tomorrow)}</small></div>
        ${q.daily.map((x, i) => questCard(x, "d", i)).join("")}${bonus}
        <div class="q-head"><span>Quêtes de la semaine</span><small>Nouvelles dans ${untilText(nextWeek)}</small></div>
        ${q.weekly.map((x, i) => questCard(x, "w", i)).join("")}
        <div class="q-head"><span>Combats de légendaires</span><small>${st.boss} victoire${st.boss > 1 ? "s" : ""}</small></div>
        <div class="q-info">⚔️ Les poissons légendaires livrent un vrai combat : <b>Fureur</b> à 40 %, <b>Dernier souffle</b> à 75 %, et des <b>matraquages</b> où il faut taper vite sur le bouton.<br>Récompense : <b>or ×1,5</b>, <b>+50 XP</b> et des appâts rares. 3 victoires = titre « Dompteur de légendes » (${Math.min(3, st.boss)}/3).</div>`;
    }
    (function () {
      const m = document.getElementById("quests-modal"), b = document.getElementById("quests-btn");
      if (b) b.onclick = () => { ensureQuests(); renderQuests(); m.classList.add("active"); playSound("ui"); };
      const c = document.getElementById("close-quests"); if (c) c.onclick = () => m.classList.remove("active");
      setInterval(refreshQuestBadge, 60000);
    })();

    /* Profil de pêcheur personnalisable : cadres (découpés dans l'image fournie), bannières = spots, badges = grades */
    const PROFILE_FRAMES = [
      { id: "bois", name: "Bois", minLvl: 1, ix: 7.6, iy: 7.22, iw: 85.17, ih: 85.55 },
      { id: "acier", name: "Acier", minLvl: 3, ix: 7.25, iy: 7.25, iw: 85.5, ih: 85.88 },
      { id: "or", name: "Or", minLvl: 6, ix: 7.6, iy: 7.22, iw: 85.17, ih: 85.17 },
      { id: "bois_orne", name: "Bois sculpté", minLvl: 8, ix: 18.81, iy: 18.15, iw: 64.03, ih: 63.37 },
      { id: "acier_orne", name: "Acier ailé", minLvl: 10, ix: 20.2, iy: 21.85, iw: 61.92, ih: 59.93 },
      { id: "or_orne", name: "Or royal", minLvl: 15, ix: 20.38, iy: 23.57, iw: 61.15, ih: 59.87 }
    ];
    const rankIndexOf = lvl => { let ri = 0; RANKS.forEach((r, i) => { if (lvl >= r.minLvl) ri = i; }); return ri; };
    // Avatar encadré : l'avatar est dessiné derrière le cadre, dont l'intérieur est transparent.
    function frameHTML(frameId, avatarId, size) {
      const f = PROFILE_FRAMES.find(x => x.id === frameId) || PROFILE_FRAMES[0];
      const av = /^[a-z0-9_]+$/i.test(avatarId || "") ? spriteSrc(avatarId) : "";
      return `<div class="fa" style="--fs:${size}px"><div class="fa-in" style="left:${f.ix}%;top:${f.iy}%;width:${f.iw}%;height:${f.ih}%">${av ? `<img src="${av}" alt="">` : ""}</div><img class="fa-fr" src="${spriteSrc("frame_" + f.id)}" alt=""></div>`;
    }
    // Valeurs réellement affichées / envoyées : un choix non débloqué retombe sur la valeur par défaut.
    function resolvedProfile() {
      const p = state.profile || {}, st = profileStats(), lvl = state.level, ri = rankIndexOf(lvl);
      const chars = SKINS.character.filter(s => s.unlocked).map(s => s.id);
      const avatar = chars.includes(p.avatar) ? p.avatar : state.equippedSkins.character;
      const frame = PROFILE_FRAMES.some(f => f.id === p.frame && lvl >= f.minLvl) ? p.frame : "bois";
      const banner = SPOTS.some(s => s.id === p.banner && state.unlockedSpots[s.id]) ? p.banner : "lac";
      const badge = Number.isInteger(p.badge) && p.badge >= 0 && p.badge <= ri ? p.badge : ri;
      let fav = p.favFish && state.caughtFish[p.favFish] && SPECIES.some(x => x.id === p.favFish) ? p.favFish : "";
      if (!fav) {
        let best = 0;
        Object.keys(state.caughtFish).forEach(id => { const r = state.caughtFish[id]; if (SPECIES.some(x => x.id === id) && r.maxWeight > best) { best = r.maxWeight; fav = id; } });
      }
      const favFishCm = fav ? Math.floor(Number(state.caughtFish[fav].maxWeight) || 0) : 0;
      const title = TITLES.some(t => t.id === state.title && t.ok(st)) ? state.title : "none";
      return { avatar, frame, banner, title, badge, favFish: fav, favFishCm };
    }
    let profileEventT = null;
    function notifyProfileChanged() { clearTimeout(profileEventT); profileEventT = setTimeout(() => window.dispatchEvent(new CustomEvent("pe:profile-changed")), 900); }
    window.setProf = function (k, v) {
      if (k === "frame" && !PROFILE_FRAMES.some(f => f.id === v && state.level >= f.minLvl)) return;
      if (k === "avatar" && !SKINS.character.some(s => s.id === v && s.unlocked)) return;
      if (k === "banner" && !SPOTS.some(s => s.id === v && state.unlockedSpots[s.id])) return;
      if (k === "badge") { v = Number(v); if (!Number.isInteger(v) || v < 0 || v > rankIndexOf(state.level)) return; }
      if (k === "favFish" && v && !state.caughtFish[v]) return;
      if (!(k in state.profile)) return;
      state.profile[k] = v; saveGame(); updateHUD(); renderProfile(); notifyProfileChanged();
    };

    function profileStats() {
      let catches = 0, record = 0, night = 0, legend = 0;
      Object.keys(state.caughtFish).forEach(id => {
        const r = state.caughtFish[id], f = SPECIES.find(x => x.id === id);
        catches += r.count; record = Math.max(record, r.maxWeight); night += (r.times && r.times["Nuit"]) || 0;
        if (f && f.rarity === "legendaire") legend++;
      });
      return { catches, record, night, legend, species: Object.keys(state.caughtFish).length, spots: Object.keys(state.unlockedSpots).length, boss: state.stats.bossWins, quests: state.stats.questsDone };
    }

    const APP_VERSION = "1.0.15";   // garde le même numéro que VERSION dans sw.js
    let deferredInstall = null;
    window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredInstall = e; });
    window.addEventListener("appinstalled", () => { deferredInstall = null; });
    window.installApp = () => { if (deferredInstall) { deferredInstall.prompt(); deferredInstall = null; } };
    let pfTab = "profil", pfEdit = false, saveT = null, pfImport = false;
    /* ===== Transfert de sauvegarde (changer de téléphone ou d'adresse du jeu) ===== */
    const TRANSFER_KEYS = [SAVE_KEY, "peche_express_leaderboard_player_v1", "peche_express_leaderboard_pseudo_v1", "peche_express_leaderboard_pid_v1", "peche_express_leaderboard_queue_v1"];
    const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    function buildSaveCode() {
      saveGame();
      const keys = {};
      TRANSFER_KEYS.forEach(k => { try { const v = localStorage.getItem(k); if (v) keys[k] = v; } catch (e) {} });
      return "PE1:" + btoa(unescape(encodeURIComponent(JSON.stringify({ v: 1, t: Date.now(), keys }))));
    }
    window.exportSave = async function () {
      const code = buildSaveCode();
      try { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([code], { type: "text/plain" })); a.download = "peche-express-sauvegarde.txt"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); } catch (e) {}
      let copied = false;
      try { await navigator.clipboard.writeText(code); copied = true; } catch (e) {}
      toast(copied ? "📤 Sauvegarde exportée : fichier téléchargé et code copié." : "📤 Sauvegarde exportée : fichier téléchargé.");
    };
    window.toggleImport = function () { pfImport = !pfImport; renderProfile(); };
    function parseSaveCode(text) {
      const code = String(text || "").replace(/\s+/g, "");
      if (!code.startsWith("PE1:") || code.length > 3000000) throw new Error("Code de sauvegarde invalide.");
      let payload;
      try { payload = JSON.parse(decodeURIComponent(escape(atob(code.slice(4))))); } catch (e) { throw new Error("Code de sauvegarde illisible ou incomplet."); }
      if (!isPlainObject(payload) || payload.v !== 1 || !isPlainObject(payload.keys)) throw new Error("Format de sauvegarde inconnu.");
      const out = {};
      Object.keys(payload.keys).forEach(k => {
        if (!TRANSFER_KEYS.includes(k) || typeof payload.keys[k] !== "string") return;
        out[k] = payload.keys[k];
      });
      let save; try { save = JSON.parse(out[SAVE_KEY]); } catch (e) { save = null; }
      if (!isPlainObject(save)) throw new Error("La sauvegarde du jeu est absente ou abîmée.");
      const pk = "peche_express_leaderboard_player_v1";
      if (out[pk] && !UUID_RE.test(out[pk])) delete out[pk];
      return out;
    }
    function applySaveImport(text) {
      let out;
      try { out = parseSaveCode(text); } catch (e) { toast("⚠️ " + e.message); return; }
      const d = JSON.parse(out[SAVE_KEY]);
      if (!confirm(`Importer cette sauvegarde (niveau ${Math.floor(Number(d.level) || 1)}, ${Math.floor(Number(d.gold) || 0)} 🪙) ?\nElle remplacera la progression de cet appareil.`)) return;
      saveLocked = true;
      try {
        try { const cur = localStorage.getItem(SAVE_KEY); if (cur) localStorage.setItem("peche_express_backup_v1", cur); } catch (e) {}
        TRANSFER_KEYS.forEach(k => { if (out[k] !== undefined) localStorage.setItem(k, out[k]); else localStorage.removeItem(k); });
        localStorage.removeItem("peche_express_leaderboard_profile_v1");
      } catch (e) { saveLocked = false; toast("⚠️ Import impossible : stockage plein ou indisponible."); return; }
      location.reload();
    }
    window.importSave = function () {
      const f = document.getElementById("imp-file"), t = document.getElementById("imp-text");
      if (f && f.files && f.files[0]) { const r = new FileReader(); r.onload = () => applySaveImport(r.result); r.onerror = () => toast("⚠️ Fichier illisible."); r.readAsText(f.files[0]); }
      else applySaveImport(t ? t.value : "");
    };
    const TITLE_PROG = { first: s => [s.catches, 1], vet: s => [s.catches, 100], collec: s => [s.species, 10], night: s => [s.night, 10], legend: s => [s.legend, 1], explo: s => [s.spots, 4], boss: s => [s.boss, 3], quests: s => [s.quests, 15] };
    window.setPfTab = t => { pfTab = t; pfEdit = false; renderProfile(); };
    window.testSnd = t => { initAudio(); playSound(t); };
    window.toggleVib = () => { AUD.vib = !AUD.vib; saveGame(); renderProfile(); if (AUD.vib) triggerVibration(70); };
    window.setAudio = (k, v, el) => {
      AUD[k] = v; if (el) el.style.setProperty("--p", Math.round(v * 100) + "%");
      const lb = document.getElementById("sv-" + k); if (lb) lb.textContent = Math.round(v * 100) + "%";
      initAudio(); applyVolumes(); clearTimeout(saveT); saveT = setTimeout(saveGame, 400);
    };
    const pfImg = (id, cls) => `<img class="${cls || ""}" src="${spriteSrc(id)}" alt="">`;

    function renderProfile(mode) {
      if (mode === "pseudo") { pfTab = "profil"; pfEdit = true; } else if (mode === "title") { pfTab = "titres"; pfEdit = false; }
      const st = profileStats(), lvl = state.level;
      let ri = 0; RANKS.forEach((r, i) => { if (lvl >= r.minLvl) ri = i; });
      const rk = RANKS[ri], nx = RANKS[ri + 1], maxXP = lvl * 50, pct = Math.min(100, Math.floor(state.xp / maxXP * 100));
      const t = TITLES.find(x => x.id === state.title) || TITLES[0];
      const tabs = [["profil", "Profil", "icon_profile"], ["perso", "Perso", "lb_crown"], ["titres", "Titres", "icon_trophy"], ["reglages", "Réglages", "icon_gear"]]
        .map(x => `<button class="inv-tab ${pfTab === x[0] ? "active" : ""}" onclick="setPfTab('${x[0]}')">${pfImg(x[2])}<span>${x[1]}</span></button>`).join("");
      let body = "";
      if (pfTab === "profil") {
        const top = Object.keys(state.caughtFish).map(id => ({ f: SPECIES.find(x => x.id === id), r: state.caughtFish[id] })).filter(x => x.f).sort((a, b) => b.r.maxWeight - a.r.maxWeight).slice(0, 3);
        const eq = state.equippedSkins;
        const tile = (ic, v, l) => `<div class="pf-tile">${ic.startsWith("<") ? ic : pfImg(ic)}<b>${v}</b><span>${l}</span></div>`;
        const rp = resolvedProfile();
        const toNext = Math.max(0, maxXP - state.xp), tn = (TITLES.find(x => x.id === rp.title) || TITLES[0]).name;
        body = `<div class="pf-card" style="--rc:${rk.color}"><div class="pf-ban" style="background-image:url(${spriteSrc("spot_" + rp.banner)})"></div>
            <div class="pf-avwrap">${frameHTML(rp.frame, rp.avatar, 104)}${pfImg("rank_" + rp.badge, "pf-badge")}</div>
            <div class="pf-id">
              ${pfEdit ? `<div class="pf-edit"><input id="pseudo-input" maxlength="16" value="${esc(state.pseudo || "")}" placeholder="Ton pseudo"><button onclick="savePseudo()">OK</button></div>`
                : `<div class="pf-name-row"><div class="pf-name">${esc(state.pseudo || "Pêcheur")}</div><button class="pf-pencil" onclick="renderProfile('pseudo')" aria-label="Modifier le pseudo" title="Modifier le pseudo">✏️</button></div>`}
              <div class="pf-title">${pfImg("icon_trophy")}<span>${tn}</span></div>
              <div class="pf-gold">🪙 <b>${state.gold.toLocaleString("fr-FR")}</b></div>
            </div></div>
          <div class="pf-lvl" style="--rc:${rk.color}">
            <div class="pf-lvl-top"><span class="pf-rankname">${rk.name}</span><span class="pf-niv">NIV. ${lvl}</span></div>
            <div class="pf-xp"><i style="width:${pct}%"></i><em>${state.xp} / ${maxXP} XP</em></div>
            <div class="pf-lvl-sub"><span>Encore <b>${toNext} XP</b> pour le niveau ${lvl + 1}</span><span>${nx ? "Prochain grade : " + nx.name + " (niv. " + nx.minLvl + ")" : "🏆 Grade maximum"}</span></div>
            <button class="pf-skills" onclick="openSkills()">⚡ Compétences et améliorations</button>
          </div>
          <div class="pf-grid">
            ${tile("fish_truite", st.catches, "prises")}${tile("icon_dex", st.species + "/" + SPECIES.length, "espèces")}${tile("icon_ruler", st.record, "record (cm)")}
            ${tile("icon_spots", st.spots + "/" + SPOTS.length, "spots")}${tile("rank_4", st.legend, "légendaires")}${tile("icon_moon", st.night, "prises de nuit")}
          </div>
          <div class="pf-sec">Meilleures prises</div>
          <div class="pf-top">${top.length ? top.map((x, i) => `<div class="pf-best"><span class="pf-pos">${i + 1}</span>${fishIcon(x.f)}<b>${x.f.name}</b><small>${x.r.maxWeight} cm</small></div>`).join("") : `<div class="inv-note" style="grid-column:1/-1">Attrape ton premier poisson !</div>`}</div>
          <div class="pf-sec">Équipement</div>
          <div class="pf-equip">${["boat", "character", "rod", "lure"].map(k => `<div class="pf-eq">${pfImg(eq[k] || "boat_classic")}</div>`).join("")}</div>`;
      } else if (pfTab === "perso") {
        const rp = resolvedProfile(), tt = TITLES.find(x => x.id === rp.title) || TITLES[0];
        const sel = (on, un, inner, label, sub, js) => `<div class="pf-pick ${on ? "on" : ""} ${un ? "" : "lock"}" ${un ? `onclick="${js}"` : ""}>${inner}<b>${label}</b><small>${sub}</small></div>`;
        const frames = PROFILE_FRAMES.map(f => sel(rp.frame === f.id, lvl >= f.minLvl, frameHTML(f.id, rp.avatar, 62), f.name, lvl >= f.minLvl ? (rp.frame === f.id ? "Équipé" : "Choisir") : "🔒 Niv. " + f.minLvl, `setProf('frame','${f.id}')`)).join("");
        const avatars = SKINS.character.filter(s => s.unlocked).map(s => sel(rp.avatar === s.id, true, frameHTML(rp.frame, s.id, 62), s.name.replace(/^Pêcheur /, ""), rp.avatar === s.id ? "Équipé" : "Choisir", `setProf('avatar','${s.id}')`)).join("");
        const banners = SPOTS.map(s => { const un = !!state.unlockedSpots[s.id]; return `<div class="pf-pick ban ${rp.banner === s.id ? "on" : ""} ${un ? "" : "lock"}" ${un ? `onclick="setProf('banner','${s.id}')"` : ""}><div class="pf-ban-ph" style="background-image:url(${spriteSrc("spot_" + s.id)})"></div><b>${s.name}</b><small>${un ? (rp.banner === s.id ? "Équipée" : "Choisir") : "🔒 Spot verrouillé"}</small></div>`; }).join("");
        const badges = RANKS.map((r, i) => { const un = lvl >= r.minLvl; return `<div class="pf-pick sm ${rp.badge === i ? "on" : ""} ${un ? "" : "lock"}" ${un ? `onclick="setProf('badge',${i})"` : ""}>${pfImg("rank_" + i)}<small>${un ? (rp.badge === i ? "Équipé" : "Niv. " + r.minLvl) : "🔒 " + r.minLvl}</small></div>`; }).join("");
        const caught = SPECIES.filter(f => state.caughtFish[f.id]);
        const fishes = `<div class="pf-pick sm ${p_isAutoFish() ? "on" : ""}" onclick="setProf('favFish','')"><div class="pf-auto">Auto</div><small>Record</small></div>` + caught.map(f => `<div class="pf-pick sm ${state.profile.favFish === f.id ? "on" : ""}" onclick="setProf('favFish','${f.id}')"><div class="pf-fimg">${fishIcon(f, 44)}</div><small>${f.name}</small></div>`).join("");
        body = `<div class="pf-card" style="--rc:${rk.color}"><div class="pf-ban" style="background-image:url(${spriteSrc("spot_" + rp.banner)})"></div>
            <div class="pf-avwrap">${frameHTML(rp.frame, rp.avatar, 96)}${pfImg("rank_" + rp.badge, "pf-badge")}</div><div class="pf-id"><div class="pf-name">${esc(state.pseudo || "Pêcheur")}</div><div class="pf-title">${pfImg("icon_trophy")}<span>${tt.name}</span></div></div></div>
          <div class="inv-note">Ton profil est visible par les autres joueurs quand ils touchent ton nom dans le classement.</div>
          <div class="pf-sec">Cadre</div><div class="pf-pickgrid c3">${frames}</div>
          <div class="pf-sec">Avatar</div><div class="pf-pickgrid c3">${avatars}</div>
          <div class="pf-sec">Bannière</div><div class="pf-pickgrid c2">${banners}</div>
          <div class="pf-sec">Badge favori</div><div class="pf-pickgrid c5">${badges}</div>
          <div class="pf-sec">Poisson favori</div><div class="pf-pickgrid c4">${caught.length ? fishes : `<div class="inv-note" style="grid-column:1/-1">Attrape un poisson pour le choisir.</div>`}</div>
          <div class="pf-sec">Titre</div><button class="set-toggle" onclick="setPfTab('titres')"><span>${tt.name}</span><b style="color:#ffd166;font-size:20px">›</b></button>`;
      } else if (pfTab === "titres") {
        const got = TITLES.filter(x => x.ok(st)).length;
        body = `<div class="inv-note">${got} / ${TITLES.length} titres débloqués</div><div class="inv-grid">${TITLES.map(x => {
          const un = x.ok(st), cur = x.id === (state.title || "none"), pr = TITLE_PROG[x.id] ? TITLE_PROG[x.id](st) : null;
          return `<div class="inv-card r-${un ? "legendaire" : "commune"} ${cur ? "eq" : ""} ${un ? "" : "locked"}" ${un ? `onclick="setTitle('${x.id}')"` : ""}>
            <div class="inv-img" style="height:70px">${pfImg("icon_trophy")}</div><div class="inv-name">${x.name}</div>
            <div class="inv-info">${un ? "Débloqué" : x.hint}${pr && !un ? ` · ${Math.min(pr[0], pr[1])}/${pr[1]}` : ""}</div>
            <div class="inv-state">${cur ? "ACTUEL" : un ? "CHOISIR" : "🔒"}</div></div>`; }).join("")}</div>`;
      } else {
        const row = (k, label, test) => `<div class="set-row"><div class="set-top"><span>${label}</span><b id="sv-${k}">${Math.round(AUD[k] * 100)}%</b></div>
          <input type="range" class="set-range" min="0" max="100" value="${Math.round(AUD[k] * 100)}" style="--p:${Math.round(AUD[k] * 100)}%" oninput="setAudio('${k}', this.value / 100, this)" ${test ? `onchange="testSnd('${test}')"` : ""}></div>`;
        const standalone = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone;
        const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
        const install = standalone ? `<div class="inv-note">Application installée ✓</div>`
          : deferredInstall ? `<button class="set-toggle" onclick="installApp()"><span>Installer l'application</span><b style="color:#06d6a0;font-size:20px">＋</b></button>`
          : `<div class="inv-note">Pour installer : ${ios ? "Safari › Partager › Sur l'écran d'accueil" : "menu du navigateur › Installer l'application"}</div>`;
        body = `<div class="pf-sec">Son</div>${row("sfx", "Effets sonores", "splash")}${row("music", "Musique")}${row("amb", "Ambiance du spot")}
          <button class="set-toggle ${AUD.vib ? "on" : ""}" onclick="toggleVib()"><span>Vibrations</span><i></i></button>
          <div class="pf-sec">Écouter</div>
          <div class="set-tests">${[["cast", "Lancer"], ["bite", "Touche"], ["win", "Prise"], ["rare", "Rare"], ["legend", "Légendaire"], ["levelup", "Niveau"]].map(x => `<button onclick="testSnd('${x[0]}')">${x[1]}</button>`).join("")}</div>
          <div class="pf-sec">Sauvegarde et transfert</div>
          <button class="set-toggle" onclick="exportSave()"><span>Exporter ma sauvegarde</span><b style="font-size:18px">📤</b></button>
          <button class="set-toggle" onclick="toggleImport()"><span>Importer une sauvegarde</span><b style="font-size:18px">📥</b></button>
          ${pfImport ? `<div class="imp-box"><input type="file" id="imp-file" accept=".txt,.json,text/plain"><textarea id="imp-text" rows="3" placeholder="…ou colle ici le code de sauvegarde (PE1:…)"></textarea><button class="qc-claim" onclick="importSave()">Importer</button></div>` : ""}
          <div class="inv-note">Pour changer de téléphone ou d'adresse du jeu. L'import remplace la progression de cet appareil.</div>
          <div class="pf-sec">Application</div>${install}
          <div class="inv-note" style="margin-top:6px">Version ${APP_VERSION} · progression et réglages sauvegardés sur cet appareil ✓</div>`;
      }
      document.getElementById("profile-content").innerHTML = `<div class="inv-tabs">${tabs}</div>${body}`;
      if (pfEdit) { const i = document.getElementById("pseudo-input"); if (i) i.focus(); }
    }
    const p_isAutoFish = () => !(state.profile.favFish && state.caughtFish[state.profile.favFish]);
    window.openSkills = function () { profileModal.classList.remove("active"); document.getElementById("level-btn").click(); };
    window.renderProfile = renderProfile;
    window.savePseudo = function() {
      const v = document.getElementById("pseudo-input").value.trim().slice(0, 16);
      if (v) state.pseudo = v; pfEdit = false; saveGame(); updateHUD(); renderProfile(); notifyProfileChanged();
    };
    window.setTitle = function(id) { state.title = id; saveGame(); renderProfile(); notifyProfileChanged(); };

    const CRATE_LOTTIE = {"v":"5.7.0","fr":30,"ip":0,"op":90,"w":512,"h":512,"nm":"loot-box","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"sparks","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"sr","sy":1,"d":1,"pt":{"a":0,"k":5},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"ir":{"a":0,"k":4},"is":{"a":0,"k":0},"or":{"a":0,"k":9},"os":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,0.8196078431372549,0.4,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":1,"k":[{"t":0,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[373.60798934094896,323.84031969540735]}]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[40,40]}]},"r":{"a":0,"k":0},"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":48,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[0]}]}}]},{"ty":"gr","it":[{"ty":"sr","sy":1,"d":1,"pt":{"a":0,"k":5},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"ir":{"a":0,"k":4},"is":{"a":0,"k":0},"or":{"a":0,"k":15},"os":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,0.36470588235294116,0.5607843137254902,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":1,"k":[{"t":0,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[387.4736636971908,399.69792251615866]}]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[40,40]}]},"r":{"a":0,"k":0},"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":48,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[0]}]}}]},{"ty":"gr","it":[{"ty":"sr","sy":1,"d":1,"pt":{"a":0,"k":5},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"ir":{"a":0,"k":4},"is":{"a":0,"k":0},"or":{"a":0,"k":9},"os":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[0.023529411764705882,0.8392156862745098,0.6274509803921569,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":1,"k":[{"t":0,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[351.7044715921354,486.92419350439934]}]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[40,40]}]},"r":{"a":0,"k":0},"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":48,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[0]}]}}]},{"ty":"gr","it":[{"ty":"sr","sy":1,"d":1,"pt":{"a":0,"k":5},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"ir":{"a":0,"k":4},"is":{"a":0,"k":0},"or":{"a":0,"k":15},"os":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,1.0,1.0,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":1,"k":[{"t":0,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[258.92764652248155,419.9642817085127]}]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[40,40]}]},"r":{"a":0,"k":0},"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":48,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[0]}]}}]},{"ty":"gr","it":[{"ty":"sr","sy":1,"d":1,"pt":{"a":0,"k":5},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"ir":{"a":0,"k":4},"is":{"a":0,"k":0},"or":{"a":0,"k":9},"os":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,0.8196078431372549,0.4,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":1,"k":[{"t":0,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[188.0573549890135,450.3622192869973]}]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[40,40]}]},"r":{"a":0,"k":0},"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":48,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[0]}]}}]},{"ty":"gr","it":[{"ty":"sr","sy":1,"d":1,"pt":{"a":0,"k":5},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"ir":{"a":0,"k":4},"is":{"a":0,"k":0},"or":{"a":0,"k":15},"os":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,0.36470588235294116,0.5607843137254902,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":1,"k":[{"t":0,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[95.05863469296224,434.899506793415]}]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[40,40]}]},"r":{"a":0,"k":0},"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":48,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[0]}]}}]},{"ty":"gr","it":[{"ty":"sr","sy":1,"d":1,"pt":{"a":0,"k":5},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"ir":{"a":0,"k":4},"is":{"a":0,"k":0},"or":{"a":0,"k":9},"os":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[0.023529411764705882,0.8392156862745098,0.6274509803921569,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":1,"k":[{"t":0,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[139.6949359360041,329.54880831894593]}]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[40,40]}]},"r":{"a":0,"k":0},"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":48,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[0]}]}}]},{"ty":"gr","it":[{"ty":"sr","sy":1,"d":1,"pt":{"a":0,"k":5},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"ir":{"a":0,"k":4},"is":{"a":0,"k":0},"or":{"a":0,"k":15},"os":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,1.0,1.0,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":1,"k":[{"t":0,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[94.28901465619512,267.2195604188149]}]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[40,40]}]},"r":{"a":0,"k":0},"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":48,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[0]}]}}]},{"ty":"gr","it":[{"ty":"sr","sy":1,"d":1,"pt":{"a":0,"k":5},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"ir":{"a":0,"k":4},"is":{"a":0,"k":0},"or":{"a":0,"k":9},"os":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,0.8196078431372549,0.4,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":1,"k":[{"t":0,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[88.66988256721174,173.1117349794344]}]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[40,40]}]},"r":{"a":0,"k":0},"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":48,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[0]}]}}]},{"ty":"gr","it":[{"ty":"sr","sy":1,"d":1,"pt":{"a":0,"k":5},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"ir":{"a":0,"k":4},"is":{"a":0,"k":0},"or":{"a":0,"k":15},"os":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,0.36470588235294116,0.5607843137254902,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":1,"k":[{"t":0,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[201.31173051877977,193.1861751403432]}]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[40,40]}]},"r":{"a":0,"k":0},"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":48,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[0]}]}}]},{"ty":"gr","it":[{"ty":"sr","sy":1,"d":1,"pt":{"a":0,"k":5},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"ir":{"a":0,"k":4},"is":{"a":0,"k":0},"or":{"a":0,"k":9},"os":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[0.023529411764705882,0.8392156862745098,0.6274509803921569,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":1,"k":[{"t":0,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[251.97448603158787,135.049112650795]}]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[40,40]}]},"r":{"a":0,"k":0},"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":48,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[0]}]}}]},{"ty":"gr","it":[{"ty":"sr","sy":1,"d":1,"pt":{"a":0,"k":5},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"ir":{"a":0,"k":4},"is":{"a":0,"k":0},"or":{"a":0,"k":15},"os":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,1.0,1.0,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":1,"k":[{"t":0,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[342.47245728671,108.62990272563968]}]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[40,40]}]},"r":{"a":0,"k":0},"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":48,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[0]}]}}]},{"ty":"gr","it":[{"ty":"sr","sy":1,"d":1,"pt":{"a":0,"k":5},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"ir":{"a":0,"k":4},"is":{"a":0,"k":0},"or":{"a":0,"k":9},"os":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,0.8196078431372549,0.4,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":1,"k":[{"t":0,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[347.9664944611644,222.91456754662]}]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[40,40]}]},"r":{"a":0,"k":0},"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":48,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[0]}]}}]},{"ty":"gr","it":[{"ty":"sr","sy":1,"d":1,"pt":{"a":0,"k":5},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"ir":{"a":0,"k":4},"is":{"a":0,"k":0},"or":{"a":0,"k":15},"os":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,0.36470588235294116,0.5607843137254902,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":1,"k":[{"t":0,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[256,270],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[415.91946308799436,259.37038856144943]}]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[40,40]}]},"r":{"a":0,"k":0},"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":48,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[0]}]}}]}]},{"ddd":0,"ind":2,"ty":4,"nm":"lid","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":42,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":46,"s":[5],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":58,"s":[-108],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":64,"s":[-98],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":70,"s":[-104]}]},"p":{"a":1,"k":[{"t":0,"s":[-110,-65],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":42,"s":[-110,-65],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":58,"s":[-135,-95],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":70,"s":[-130,-90]}]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[110,-27]},"s":{"a":0,"k":[40,54]},"r":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,0.8196078431372549,0.4,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[110,-27]},"s":{"a":0,"k":[220,54]},"r":{"a":0,"k":12}},{"ty":"fl","c":{"a":0,"k":[0.41568627450980394,0.24705882352941178,0.7098039215686275,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]}],"parent":7},{"ddd":0,"ind":3,"ty":4,"nm":"glow","sr":1,"ks":{"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":44,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":52,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":70,"s":[70],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":80,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":90,"s":[70]}]},"r":{"a":0,"k":0},"p":{"a":0,"k":[0,-65]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":44,"s":[60,60],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":58,"s":[140,160],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":90,"s":[120,130]}]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"el","p":{"a":0,"k":[0,0]},"s":{"a":0,"k":[170,50]}},{"ty":"fl","c":{"a":0,"k":[1.0,0.9529411764705882,0.6901960784313725,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]}],"parent":7},{"ddd":0,"ind":4,"ty":4,"nm":"shock","sr":1,"ks":{"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":46,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":47,"s":[70],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":70,"s":[0]}]},"r":{"a":0,"k":0},"p":{"a":0,"k":[256,270]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[0,0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":46,"s":[0,0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":70,"s":[600,600]}]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"el","p":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]}},{"ty":"fl","c":{"a":0,"k":[1.0,1.0,1.0,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]}]},{"ddd":0,"ind":5,"ty":4,"nm":"body","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"el","p":{"a":0,"k":[0,-14]},"s":{"a":0,"k":[9,9]}},{"ty":"fl","c":{"a":0,"k":[0.29411764705882354,0.1803921568627451,0.5137254901960784,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[0,-8]},"s":{"a":0,"k":[30,34]},"r":{"a":0,"k":6}},{"ty":"fl","c":{"a":0,"k":[0.9607843137254902,0.6196078431372549,0.043137254901960784,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[0,-40]},"s":{"a":0,"k":[200,14]},"r":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,0.8196078431372549,0.4,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[0,0]},"s":{"a":0,"k":[36,130]},"r":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,0.8196078431372549,0.4,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[0,0]},"s":{"a":0,"k":[200,130]},"r":{"a":0,"k":14}},{"ty":"fl","c":{"a":0,"k":[0.29411764705882354,0.1803921568627451,0.5137254901960784,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]}],"parent":7},{"ddd":0,"ind":6,"ty":4,"nm":"rays","sr":1,"ks":{"o":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":44,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":56,"s":[100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":90,"s":[60]}]},"r":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":90,"s":[180]}]},"p":{"a":0,"k":[256,270]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[0,0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":44,"s":[0,0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":60,"s":[100,100]}]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"sr","sy":1,"d":1,"pt":{"a":0,"k":12},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"ir":{"a":0,"k":60},"is":{"a":0,"k":0},"or":{"a":0,"k":260},"os":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,0.8784313725490196,0.5411764705882353,1]},"o":{"a":0,"k":30},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]}]},{"ddd":0,"ind":7,"ty":3,"nm":"box","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":1,"k":[{"t":0,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":4,"s":[-7],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":8,"s":[7],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":12,"s":[-7],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":16,"s":[7],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":20,"s":[-5],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":24,"s":[5],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":28,"s":[0]}]},"p":{"a":0,"k":[256,335]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":30,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":38,"s":[108,90],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":46,"s":[94,112],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":54,"s":[100,100]}]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0},{"ddd":0,"ind":8,"ty":4,"nm":"shadow","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[256,408]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"el","p":{"a":0,"k":[0,0]},"s":{"a":0,"k":[230,30]}},{"ty":"fl","c":{"a":0,"k":[0.0,0.0,0.0,1]},"o":{"a":0,"k":25},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]}]}]};

    const FISHER_LOTTIE = {"v":"5.7.0","fr":30,"ip":0,"op":90,"w":512,"h":512,"nm":"pecheur-canne","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"bouchon","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"t":0,"s":[61,458],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":45,"s":[61,464],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":90,"s":[61,458]}]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"el","p":{"a":0,"k":[0,-6]},"s":{"a":0,"k":[10,10]}},{"ty":"fl","c":{"a":0,"k":[1.0,1.0,1.0,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"el","p":{"a":0,"k":[0,0]},"s":{"a":0,"k":[24,24]}},{"ty":"fl","c":{"a":0,"k":[0.9372549019607843,0.2784313725490196,0.43529411764705883,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]}]},{"ddd":0,"ind":2,"ty":4,"nm":"ligne","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"sh","ks":{"a":1,"k":[{"t":0,"s":[{"c":false,"v":[[61,177],[61,458]],"i":[[0,0],[0,0]],"o":[[0,0],[0,0]]}],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":45,"s":[{"c":false,"v":[[61,191],[61,464]],"i":[[0,0],[0,0]],"o":[[0,0],[0,0]]}],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":90,"s":[{"c":false,"v":[[61,177],[61,458]],"i":[[0,0],[0,0]],"o":[[0,0],[0,0]]}]}]}},{"ty":"st","c":{"a":0,"k":[1.0,1.0,1.0,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":2},"lc":2,"lj":2},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]}]},{"ddd":0,"ind":3,"ty":4,"nm":"canne","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"sh","ks":{"a":0,"k":{"c":false,"v":[[246,315],[215,291]],"i":[[0,0],[0,0]],"o":[[0,0],[0,0]]}}},{"ty":"st","c":{"a":0,"k":[0.35294117647058826,0.22745098039215686,0.10196078431372549,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":14},"lc":2,"lj":2},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"sh","ks":{"a":1,"k":[{"t":0,"s":[{"c":false,"v":[[246,315],[154,238],[61,177]],"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]]}],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":45,"s":[{"c":false,"v":[[246,315],[154,241],[61,191]],"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]]}],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":90,"s":[{"c":false,"v":[[246,315],[154,238],[61,177]],"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]]}]}]}},{"ty":"st","c":{"a":0,"k":[0.788235294117647,0.6509803921568628,0.4196078431372549,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":8},"lc":2,"lj":2},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]}]},{"ddd":0,"ind":4,"ty":4,"nm":"bras","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":70},"p":{"a":0,"k":[-28,-125]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"el","p":{"a":0,"k":[0,60]},"s":{"a":0,"k":[16,16]}},{"ty":"fl","c":{"a":0,"k":[0.9450980392156862,0.7607843137254902,0.49019607843137253,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[0,28]},"s":{"a":0,"k":[18,60]},"r":{"a":0,"k":8}},{"ty":"fl","c":{"a":0,"k":[0.01568627450980392,0.7215686274509804,0.5411764705882353,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]}],"parent":9},{"ddd":0,"ind":5,"ty":4,"nm":"tete","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"t":0,"s":[0,0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":45,"s":[0,3],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":90,"s":[0,0]}]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"el","p":{"a":0,"k":[-10,-165]},"s":{"a":0,"k":[6,6]}},{"ty":"fl","c":{"a":0,"k":[0.10588235294117647,0.10588235294117647,0.1843137254901961,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[0,-186]},"s":{"a":0,"k":[66,12]},"r":{"a":0,"k":6}},{"ty":"fl","c":{"a":0,"k":[0.9372549019607843,0.2784313725490196,0.43529411764705883,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[0,-200]},"s":{"a":0,"k":[44,26]},"r":{"a":0,"k":8}},{"ty":"fl","c":{"a":0,"k":[1.0,0.47843137254901963,0.6352941176470588,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"el","p":{"a":0,"k":[0,-165]},"s":{"a":0,"k":[52,52]}},{"ty":"fl","c":{"a":0,"k":[0.9450980392156862,0.7607843137254902,0.49019607843137253,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]}],"parent":9},{"ddd":0,"ind":6,"ty":4,"nm":"corps","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[-20,-4]},"s":{"a":0,"k":[30,12]},"r":{"a":0,"k":5}},{"ty":"fl","c":{"a":0,"k":[0.10588235294117647,0.10588235294117647,0.1843137254901961,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[12,-4]},"s":{"a":0,"k":[30,12]},"r":{"a":0,"k":5}},{"ty":"fl","c":{"a":0,"k":[0.10588235294117647,0.10588235294117647,0.1843137254901961,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[0,-66]},"s":{"a":0,"k":[64,8]},"r":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[1.0,0.8196078431372549,0.4,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[0,-100]},"s":{"a":0,"k":[64,80]},"r":{"a":0,"k":12}},{"ty":"fl","c":{"a":0,"k":[0.023529411764705882,0.8392156862745098,0.6274509803921569,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[24,-100]},"s":{"a":0,"k":[16,56]},"r":{"a":0,"k":8}},{"ty":"fl","c":{"a":0,"k":[0.01568627450980392,0.7215686274509804,0.5411764705882353,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[-14,-30]},"s":{"a":0,"k":[24,60]},"r":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[0.16862745098039217,0.22745098039215686,0.3333333333333333,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[14,-30]},"s":{"a":0,"k":[24,60]},"r":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[0.16862745098039217,0.22745098039215686,0.3333333333333333,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]}],"parent":9},{"ddd":0,"ind":7,"ty":4,"nm":"ponton","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[215,485]},"s":{"a":0,"k":[16,70]},"r":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[0.35294117647058826,0.22745098039215686,0.10196078431372549,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[480,485]},"s":{"a":0,"k":[16,70]},"r":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[0.35294117647058826,0.22745098039215686,0.10196078431372549,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[350,432]},"s":{"a":0,"k":[330,26]},"r":{"a":0,"k":4}},{"ty":"fl","c":{"a":0,"k":[0.5529411764705883,0.3333333333333333,0.1411764705882353,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]}]},{"ddd":0,"ind":8,"ty":4,"nm":"ondes","sr":1,"ks":{"o":{"a":1,"k":[{"t":0,"s":[60],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":45,"s":[0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":46,"s":[60],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":90,"s":[0]}]},"r":{"a":0,"k":0},"p":{"a":0,"k":[61,454]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[20,20],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":45,"s":[180,180],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":46,"s":[20,20],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":90,"s":[180,180]}]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"el","p":{"a":0,"k":[0,0]},"s":{"a":0,"k":[60,14]}},{"ty":"st","c":{"a":0,"k":[1.0,1.0,1.0,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":3},"lc":2,"lj":2},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]}]},{"ddd":0,"ind":10,"ty":4,"nm":"eau","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"t":0,"s":[0,0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":45,"s":[-20,0],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":90,"s":[0,0]}]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[256,457]},"s":{"a":0,"k":[600,6]},"r":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[0.3686274509803922,0.7843137254901961,0.8980392156862745,1]},"o":{"a":0,"k":100},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]},{"ty":"gr","it":[{"ty":"rc","p":{"a":0,"k":[256,484]},"s":{"a":0,"k":[600,64]},"r":{"a":0,"k":0}},{"ty":"fl","c":{"a":0,"k":[0.06666666666666667,0.5411764705882353,0.6980392156862745,1]},"o":{"a":0,"k":90},"r":1},{"ty":"tr","p":{"a":0,"k":[0,0]},"a":{"a":0,"k":[0,0]},"s":{"a":0,"k":[100,100]},"r":{"a":0,"k":0},"o":{"a":0,"k":100}}]}]},{"ddd":0,"ind":9,"ty":3,"nm":"perso","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[330,420]},"a":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":45,"s":[100,101.8],"i":{"x":[0.58],"y":[1]},"o":{"x":[0.42],"y":[0]}},{"t":90,"s":[100,100]}]}},"ao":0,"ip":0,"op":90,"st":0,"bm":0}]};
    let fisherAnim = null;
    function mountFisher() {
      const box = document.getElementById("fisher-preview"); if (!box || !window.lottie) return;
      if (fisherAnim) { fisherAnim.destroy(); fisherAnim = null; }
      const d = JSON.parse(JSON.stringify(FISHER_LOTTIE));
      const col = c => { const n = parseInt(c.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255, 1]; };
      const cs = SKINS.character.find(x => x.id === state.equippedSkins.character), rs = SKINS.rod.find(x => x.id === state.equippedSkins.rod);
      const cc = col((cs && cs.color) || "#06d6a0"), rodc = col((rs && rs.color) || "#c9a66b");
      const L = n => d.layers.find(l => l.nm === n);
      L("corps").shapes[3].it[1].c.k = cc; L("corps").shapes[4].it[1].c.k = cc;
      L("bras").shapes[1].it[1].c.k = cc; L("canne").shapes[1].it[1].c.k = rodc;
      fisherAnim = lottie.loadAnimation({ container: box, renderer: "svg", loop: true, autoplay: true, animationData: d });
    }

    /* Caisses & butin */
    state.baits = {}; state.activeBait = null; state.pity = {};
    const RL = { commune: "COMMUN", rare: "RARE", legendaire: "LÉGENDAIRE" };
    const DEFAULTS = ["char_classic", "rod_wood", "lure_classic", "boat_classic"];
    const BAITS = [
      { id: "worm", name: "Ver de terre", rarity: "commune", boost: 1, uses: 5, emoji: "🪱" },
      { id: "shine", name: "Appât Brillant", rarity: "rare", boost: 3, uses: 5, emoji: "✨" },
      { id: "gold", name: "Appât Doré", rarity: "legendaire", boost: 8, uses: 5, emoji: "🌟" }
    ];
    const CRATES = [
      { id: "bronze", name: "Caisse Bronze", emoji: "📦", price: 100, pity: 40, color: "#e08a3c", odds: { commune: 80, rare: 18, legendaire: 2 } },
      { id: "argent", name: "Caisse Argent", emoji: "🎁", price: 350, pity: 25, color: "#7ac8ff", odds: { commune: 55, rare: 38, legendaire: 7 } },
      { id: "or", name: "Caisse Or", emoji: "💎", price: 1000, pity: 10, color: "#ffd166", odds: { commune: 20, rare: 55, legendaire: 25 } }
    ];
    SKINS.boat = [
      { id: "boat_classic", name: "Barque en Bois", price: 0, unlocked: true },
      { id: "boat_pneu", name: "Canot Pneumatique", price: 0, unlocked: false },
      { id: "boat_viking", name: "Drakkar Viking", price: 0, unlocked: false },
      { id: "boat_pirate", name: "Galion Pirate", price: 0, unlocked: false },
      { id: "boat_neon", name: "Hovercraft Néon", price: 0, unlocked: false },
      { id: "boat_gold", name: "Yacht Doré", price: 0, unlocked: false }
    ];
    SKINS.character.push({ id: "char_marin", name: "Pêcheur Marin", price: 0, unlocked: false });
    SKINS.rod.push({ id: "rod_bamboo", name: "Canne Bambou", price: 0, unlocked: false, color: "#c9a66b" });
    SKINS.lure.push({ id: "lure_spoon", name: "Cuillère", price: 0, unlocked: false });
    const ITEM_META = {
      char_classic: { r: "commune", e: "🧑‍🎣", color: "#06d6a0" }, char_marin: { r: "commune", e: "⚓", color: "#118ab2" },
      char_pirate: { r: "rare", e: "🏴‍☠️", color: "#ef476f" }, char_cyber: { r: "legendaire", e: "🤖", color: "#8338ec" },
      rod_wood: { r: "commune", e: "🎣", bonus: 0 }, rod_bamboo: { r: "commune", e: "🎋", bonus: 0.02 },
      rod_carbon: { r: "rare", e: "🎣", bonus: 0.05 }, rod_neon: { r: "legendaire", e: "⚡", bonus: 0.09 },
      lure_classic: { r: "commune", e: "🔴", gold: 1 }, lure_spoon: { r: "commune", e: "🥄", gold: 1.05 },
      lure_duck: { r: "rare", e: "🦆", gold: 1.15 }, lure_orb: { r: "legendaire", e: "🔮", gold: 1.3 }
    };
    Object.assign(ITEM_META, {
      boat_classic: { r: "commune", e: "🛶" }, boat_pneu: { r: "commune", e: "🚤" }, boat_viking: { r: "rare", e: "🐉" },
      boat_pirate: { r: "rare", e: "🏴‍☠️" }, boat_neon: { r: "legendaire", e: "⚡" }, boat_gold: { r: "legendaire", e: "🛥️" }
    });
    Object.keys(SKINS).forEach(cat => SKINS[cat].forEach(s => {
      const m = ITEM_META[s.id]; if (!m) return;
      s.rarity = m.r; s.emoji = m.e; if (m.color) s.color = m.color; s.bonus = m.bonus; s.gold = m.gold;
    }));
    const rodBonus = () => { const r = SKINS.rod.find(x => x.id === state.equippedSkins.rod); return (r && r.bonus) || 0; };
    const lureMult = () => { const l = SKINS.lure.find(x => x.id === state.equippedSkins.lure); return (l && l.gold) || 1; };
    function useBait() {
      const id = state.activeBait; if (!id || !(state.baits[id] > 0)) return 0;
      const b = BAITS.find(x => x.id === id); state.baits[id]--;
      if (state.baits[id] <= 0) state.activeBait = null;
      saveGame(); chipKey = ""; return b.boost;
    }
    function lootPool(r) {
      const a = [];
      Object.keys(SKINS).forEach(c => SKINS[c].forEach(s => { if (s.rarity === r && !DEFAULTS.includes(s.id)) a.push({ kind: "skin", item: s }); }));
      BAITS.forEach(b => { if (b.rarity === r) a.push({ kind: "bait", item: b }); });
      return a;
    }
    let crateBusy = false;
    const RANK = { commune: 0, rare: 1, legendaire: 2 };
    const shopOpen = {};
    const lootImg = d => spriteSrc(d.kind === "bait" ? "bait_" + d.item.id : d.item.id);
    function rollCrate(c, forceRare) {
      state.pity = state.pity || {};
      const cnt = (state.pity[c.id] || 0) + 1, roll = Math.random() * 100;
      let rar = roll < c.odds.legendaire ? "legendaire" : roll < c.odds.legendaire + c.odds.rare ? "rare" : "commune";
      if (cnt >= c.pity) rar = "legendaire"; else if (forceRare && rar === "commune") rar = "rare";
      state.pity[c.id] = rar === "legendaire" ? 0 : cnt;
      const pool = lootPool(rar), drop = pool[Math.floor(Math.random() * pool.length)];
      let note = "", isNew = false;
      if (drop.kind === "bait") {
        state.baits[drop.item.id] = (state.baits[drop.item.id] || 0) + drop.item.uses;
        if (!state.activeBait) state.activeBait = drop.item.id;
        note = `+${drop.item.uses} utilisations`;
      } else if (drop.item.unlocked) {
        const g = { commune: 30, rare: 120, legendaire: 400 }[rar]; state.gold += g; note = `Doublon : +${g} 🪙`;
      } else { drop.item.unlocked = true; isNew = true; note = "Nouveau !"; }
      return { rar, drop, note, isNew };
    }
    window.openCrate = function (id, n) {
      n = n || 1;
      const c = CRATES.find(x => x.id === id); if (!c || crateBusy) return;
      const total = c.price * n; if (state.gold < total) return;
      crateBusy = true; initAudio(); state.gold -= total; playSound("coin");
      const res = [];
      for (let i = 0; i < n; i++) res.push(rollCrate(c, n > 1 && i === n - 1 && res.every(r => r.rar === "commune")));
      saveGame(); updateHUD(); chipKey = ""; renderShop();
      playCrateAnim(c, res);
    };
    function playCrateAnim(c, res) {
      const modal = document.getElementById("crate-modal"), card = document.getElementById("crate-card");
      const best = res.reduce((b, r) => RANK[r.rar] > RANK[b.rar] ? r : b, res[0]);
      const timers = []; let revealed = false;
      card.innerHTML = `<div class="crate-stage"><div class="crate-halo" id="crate-halo" style="--hc:${c.color}"></div><img id="crate-img" class="crate-img crate-wobble" src="${spriteSrc("crate_" + c.id)}" alt=""></div><div class="fish-name" id="crate-title">Ouverture…</div><div class="reveal-tag">Touche pour passer</div>`;
      modal.classList.add("active"); [100, 750, 1000, 1200, 1350].forEach(ms => timers.push(setTimeout(() => playSound("thump"), ms)));
      const reveal = () => {
        if (revealed) return; revealed = true; timers.forEach(clearTimeout); card.onclick = null;
        const okBtn = `<button class="btn-main" id="crate-ok" style="height:52px;font-size:16px">OK</button>`;
        if (res.length === 1) {
          const r = res[0], d = r.drop, cat = d.kind === "skin" ? Object.keys(SKINS).find(k => SKINS[k].includes(d.item)) : null;
          card.innerHTML = `<div class="fish-rarity rarity-${r.rar}">${RL[r.rar]}</div>
            <div class="reveal-art r-${r.rar}"><div class="reveal-rays"></div><img src="${lootImg(d)}" alt=""></div>
            <div class="fish-name">${d.item.name}</div>
            <div class="reveal-tag ${r.isNew ? "new" : ""}">${r.isNew ? "✨ NOUVEAU !" : r.note}</div>
            ${r.isNew && cat ? `<button class="btn-main" id="crate-eq" style="height:48px;font-size:15px">ÉQUIPER</button>` : ""}${okBtn}`;
          const eqb = document.getElementById("crate-eq");
          if (eqb) eqb.onclick = () => { state.equippedSkins[cat] = d.item.id; saveGame(); document.getElementById("crate-ok").click(); };
        } else {
          const sorted = res.slice().sort((a, b) => RANK[a.rar] - RANK[b.rar]);
          card.innerHTML = `<div class="fish-name">Butin ×${res.length}</div><div class="reveal-grid">${sorted.map(r => `<div class="mini r-${r.rar}">${r.isNew ? '<span class="mini-new">NEW</span>' : ""}<img src="${lootImg(r.drop)}" alt=""><div class="mini-name">${r.drop.item.name}</div><div class="mini-note">${r.isNew ? "Nouveau" : r.note}</div></div>`).join("")}</div>${okBtn}`;
        }
        document.getElementById("crate-ok").onclick = () => { modal.classList.remove("active"); crateBusy = false; chipKey = ""; renderShop(); updateHUD(); };
        playSound(best.rar === "legendaire" ? "legend" : best.rar === "rare" ? "rare" : "win"); triggerVibration(best.rar === "legendaire" ? [150, 50, 150, 50, 300] : [100]);
        if (best.rar !== "commune") spawnConfetti();
      };
      const open = () => {
        if (revealed) return;
        const img = document.getElementById("crate-img"), halo = document.getElementById("crate-halo"), stage = card.querySelector(".crate-stage");
        if (!img) return;
        const fl = document.createElement("div"); fl.className = "crate-flash"; stage.appendChild(fl);
        img.src = spriteSrc("crate_" + c.id + "_open"); img.className = "crate-img crate-pop";
        halo.style.setProperty("--hc", { commune: "#8d99ae", rare: "#3aa8ff", legendaire: "#ffd166" }[best.rar]); halo.classList.add("on");
        document.getElementById("crate-title").textContent = "Ouvert !";
        playSound("chime");
      };
      timers.push(setTimeout(() => { const i = document.getElementById("crate-img"); if (i) i.className = "crate-img crate-wobble-hard"; }, 1000));
      timers.push(setTimeout(open, 1500));
      timers.push(setTimeout(reveal, 2000));
      card.onclick = () => { open(); setTimeout(reveal, 250); };
    }
    function lootPreview(x) {
      return ["commune", "rare", "legendaire"].map(r => {
        const items = lootPool(r);
        return `<div class="lp-row"><div class="lp-head"><span class="fish-rarity rarity-${r}" style="padding:2px 8px;font-size:9px">${RL[r]}</span><span>${x.odds[r]}%</span></div><div class="lp-items">${items.map(d => {
          const own = d.kind === "skin" && d.item.unlocked;
          return `<div class="lp-it ${own ? "own" : ""}"><img src="${lootImg(d)}" alt=""><span>${d.item.name}</span>${own ? '<i>✓</i>' : ""}</div>`;
        }).join("")}</div></div>`;
      }).join("");
    }
    function renderShop() {
      state.pity = state.pity || {};
      document.getElementById("shop-items").innerHTML = CRATES.map(x => {
        const p = state.pity[x.id] || 0, left = Math.max(1, x.pity - p), pct = Math.min(100, p / x.pity * 100);
        const d1 = state.gold < x.price || crateBusy, d5 = state.gold < x.price * 5 || crateBusy;
        return `<div class="cs" style="--cc:${x.color}">
          <div class="cs-top"><img class="cs-img" src="${spriteSrc("crate_" + x.id)}" alt="">
            <div class="cs-info"><h4>${x.name}</h4>
              <div class="cs-odds"><span class="o c">Commun ${x.odds.commune}%</span><span class="o r">Rare ${x.odds.rare}%</span><span class="o l">Légendaire ${x.odds.legendaire}%</span></div>
              <div class="cs-pity"><div class="bar"><i style="width:${pct}%"></i></div><small>Légendaire garanti dans ${left} ouverture${left > 1 ? "s" : ""}</small></div>
            </div></div>
          <div class="cs-btns"><button class="buy-btn" ${d1 ? "disabled" : ""} onclick="openCrate('${x.id}',1)">Ouvrir · ${x.price} 🪙</button><button class="buy-btn alt" ${d5 ? "disabled" : ""} onclick="openCrate('${x.id}',5)">×5 · ${x.price * 5} 🪙</button></div>
          <details class="cs-loot" ${shopOpen[x.id] ? "open" : ""} ontoggle="shopOpen['${x.id}']=this.open"><summary>Voir le contenu</summary>${lootPreview(x)}</details></div>`;
      }).join("") + `<p class="inv-note">Pêcheurs, bateaux, cannes, leurres et appâts. Les doublons sont rachetés en pièces. ×5 : au moins un Rare garanti.</p>`;
    }
    let invTab = "character", invTries = 0;
    const INV_TABS = [
      { id: "character", label: "Pêcheurs", img: "char_classic" },
      { id: "boat", label: "Bateaux", img: "boat_viking" },
      { id: "rod", label: "Cannes", img: "rod_wood" },
      { id: "lure", label: "Leurres", img: "lure_duck" },
      { id: "bait", label: "Appâts", img: "bait_worm" }
    ];
    const spriteSrc = id => { const im = (window.SPRITES || {})[id]; return im ? im.src : ""; };
    window.setInvTab = function (t) { invTab = t; renderSkins(); };

    // aperçu : bateau + pêcheur + canne + leurre équipés
    function drawInvPreview() {
      const cv = document.getElementById("inv-preview"); if (!cv) return;
      const SP = window.SPRITES || {}, eq = state.equippedSkins;
      const boat = SP[eq.boat || "boat_classic"] || SP.boat, ch = SP[eq.character], rod = SP[eq.rod], lure = SP[eq.lure];
      if (![boat, ch, rod, lure].every(spriteOK)) { if (invTries++ < 25) setTimeout(drawInvPreview, 150); return; }
      invTries = 0;
      const dpr = window.devicePixelRatio || 1, W = 340, H = 190, S = 2.0, wl = 124;
      cv.width = W * dpr; cv.height = H * dpr;
      const g = cv.getContext("2d"); g.scale(dpr, dpr);
      const sky = g.createLinearGradient(0, 0, 0, wl); sky.addColorStop(0, "#1d3254"); sky.addColorStop(1, "#7fbfe0");
      g.fillStyle = sky; g.fillRect(0, 0, W, wl);
      const sea = g.createLinearGradient(0, wl, 0, H); sea.addColorStop(0, "#1aa0b8"); sea.addColorStop(1, "#08394f");
      g.fillStyle = sea; g.fillRect(0, wl, W, H - wl);
      const bx = 132, by = wl + 4;
      g.fillStyle = "rgba(0,0,0,0.25)"; g.beginPath(); g.ellipse(bx, by + 9 * S, 46 * S, 6 * S, 0, 0, Math.PI * 2); g.fill();
      g.drawImage(boat, bx - 56 * S, by - 32 * S, 112 * S, 50 * S);
      g.drawImage(ch, bx - 22 * S, by - 62 * S, 44 * S, 56 * S);
      const baseX = bx + 10.8 * S, baseY = by - 17.2 * S, tipX = bx + 41 * S, tipY = by - 50 * S;
      const L = Math.hypot(tipX - baseX, tipY - baseY), ang = Math.atan2(tipY - baseY, tipX - baseX);
      const gs = L / rod.naturalWidth, cyPx = rod.naturalHeight * (5 / 14);
      g.save(); g.translate(baseX, baseY); g.rotate(ang);
      g.drawImage(rod, 0, -cyPx * gs, L, rod.naturalHeight * gs); g.restore();
      const lx = tipX + 36, ly = wl + 36;
      g.strokeStyle = "rgba(255,255,255,0.85)"; g.lineWidth = 1.2;
      g.beginPath(); g.moveTo(tipX, tipY); g.quadraticCurveTo(tipX + 30, tipY + 10, lx, ly - 14); g.stroke();
      g.drawImage(lure, lx - 12 * 1.6, ly - 16 * 1.6, 24 * 1.6, 29 * 1.6);
    }

    function renderSkins() {
      const cat = invTab, eqId = state.equippedSkins[cat];
      let cards = "", note = "";
      if (cat === "bait") {
        const total = BAITS.reduce((a, b) => a + (state.baits[b.id] || 0), 0);
        note = `Utilisations en stock : ${total} · à gagner dans les caisses`;
        BAITS.forEach(b => {
          const n = state.baits[b.id] || 0, act = state.activeBait === b.id && n > 0;
          cards += `<div class="inv-card r-${b.rarity} ${act ? "eq" : ""} ${n ? "" : "locked"}" ${n ? `onclick="useBaitItem('${b.id}')"` : ""}>
            ${n ? `<span class="inv-count">×${n}</span>` : ""}
            <div class="inv-img"><img src="${spriteSrc("bait_" + b.id)}" alt="" style="height:78px"></div>
            <div class="inv-name">${b.name}</div>
            <span class="fish-rarity rarity-${b.rarity}" style="padding:2px 8px;font-size:9px">${RL[b.rarity]}</span>
            <div class="inv-info">+${b.boost * 25}% de chances rare et mieux · ${b.uses} utilisations</div>
            <div class="inv-state">${act ? "ACTIF" : n ? "UTILISER" : "Obtenu en caisse"}</div></div>`;
        });
      } else {
        const list = SKINS[cat], got = list.filter(s => s.unlocked).length;
        note = `${got} / ${list.length} débloqués`;
        list.forEach(s => {
          const eq = eqId === s.id, ok = s.unlocked;
          const info = !ok ? "Obtenu en caisse" : s.bonus !== undefined ? (s.bonus ? `Zone verte +${Math.round(s.bonus * 100)}%` : "Aucun bonus")
            : (s.gold !== undefined ? (s.gold > 1 ? `Gains +${Math.round((s.gold - 1) * 100)}%` : "Aucun bonus") : "Cosmétique");
          const st = cat === "character" ? "height:90px" : cat === "boat" ? "width:150px" : cat === "rod" ? "width:132px;transform:rotate(-14deg)" : "height:86px";
          cards += `<div class="inv-card r-${s.rarity} ${eq ? "eq" : ""} ${ok ? "" : "locked"}" ${ok ? `onclick="selectSkin('${cat}','${s.id}')"` : ""}>
            <div class="inv-img"><img src="${spriteSrc(s.id)}" alt="" style="${st}"></div>
            <div class="inv-name">${ok ? s.name : "???"}</div>
            <span class="fish-rarity rarity-${s.rarity}" style="padding:2px 8px;font-size:9px">${RL[s.rarity]}</span>
            <div class="inv-info">${info}</div>
            <div class="inv-state">${eq ? "ÉQUIPÉ" : ok ? "ÉQUIPER" : "🔒 Caisse"}</div></div>`;
        });
      }
      const tabs = INV_TABS.map(t => `<button class="inv-tab ${t.id === cat ? "active" : ""}" onclick="setInvTab('${t.id}')"><img src="${spriteSrc(t.img)}" alt=""><span>${t.label}</span></button>`).join("");
      document.getElementById("skins-items").innerHTML =
        `<canvas id="inv-preview" class="inv-preview"></canvas><div class="inv-tabs">${tabs}</div><div class="inv-note">${note}</div><div class="inv-grid">${cards}</div>`;
      drawInvPreview();
    }
    window.selectSkin = function(cat, id) {
      const s = SKINS[cat].find(x => x.id === id);
      if (s && s.unlocked) { state.equippedSkins[cat] = id; saveGame(); renderSkins(); }
    };
    window.useBaitItem = function(id) {
      if ((state.baits[id] || 0) > 0) { state.activeBait = state.activeBait === id ? null : id; saveGame(); chipKey = ""; renderSkins(); }
    };

    loadGame();

    window.PecheExpressLeaderboardBridge = {
      getPseudo: () => typeof state.pseudo === "string" ? state.pseudo : "",
      setPseudo: value => {
        const cleaned = String(value || "").replace(/[<>\u0000-\u001f\u007f]/g, "").trim().replace(/\s+/g, " ").slice(0, 16);
        if (!cleaned) return false;
        state.pseudo = cleaned;
        saveGame();
        return true;
      },
      getProfile: () => resolvedProfile(),
      openCustomize: () => { pfTab = "perso"; pfEdit = false; renderProfile(); profileModal.classList.add("active"); }
    };
    // Données et rendu partagés avec js/leaderboard.js (fiche joueur du classement)
    window.PecheExpressProfileData = {
      RANKS, TITLES: TITLES.map(t => ({ id: t.id, name: t.name })), SPECIES: SPECIES.map(f => ({ id: f.id, name: f.name, emoji: f.emoji })),
      SPOTS: SPOTS.map(s => ({ id: s.id, name: s.name })), FRAMES: PROFILE_FRAMES, frameHTML, spriteSrc, esc, rankIndexOf
    };

    if (!state.equippedSkins.boat) state.equippedSkins.boat = "boat_classic";
    render();
    refreshQuestBadge();
