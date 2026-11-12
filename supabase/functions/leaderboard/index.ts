// Pêche Express — API du classement (Supabase Edge Function, Deno).
// Déploiement : supabase functions deploy bright-api --project-ref sczeztgjbzgefnwiysla
// Connexion à la base : variable SUPABASE_DB_URL, fournie automatiquement par Supabase aux Edge Functions.
// ALLOWED_ORIGINS limite CORS dans les navigateurs ; ce n'est ni une authentification ni une protection anti-bot.
// @ts-nocheck
import postgres from "npm:postgres@3.4.4";
import { cleanPseudo, FISH_RANGES, PLAYER_ID_RE, PUBLIC_ID_RE, parseLeaderboardParams, validateCatch } from "../_shared/leaderboard-validation.ts";

const AVATARS = ["char_classic", "char_pirate", "char_cyber", "char_marin"];
const FRAMES = ["bois", "acier", "or", "bois_orne", "acier_orne", "or_orne"];
const BANNERS = ["lac", "riviere", "recif", "glace", "mer", "abysse"];
const TITLE_IDS = ["none", "first", "vet", "collec", "night", "legend", "explo", "boss", "quests"];
function cleanProfile(input) {
  let src = input;
  if (typeof src === "string") { try { src = JSON.parse(src); } catch { src = {}; } }   // ancien profil stocké en texte JSON
  const p = src && typeof src === "object" && !Array.isArray(src) ? src : {};
  const favFish = FISH_RANGES[p.favFish] ? String(p.favFish) : "";
  const cm = Number(p.favFishCm);
  const range = favFish ? FISH_RANGES[favFish] : null;
  const cmOk = range && Number.isInteger(cm) && cm >= range[0] && cm < range[1];
  return {
    avatar: AVATARS.includes(p.avatar) ? p.avatar : "char_classic",
    frame: FRAMES.includes(p.frame) ? p.frame : "bois",
    banner: BANNERS.includes(p.banner) ? p.banner : "lac",
    title: TITLE_IDS.includes(p.title) ? p.title : "none",
    badge: Number.isInteger(p.badge) && p.badge >= 0 && p.badge <= 4 ? p.badge : 0,
    favFish: cmOk ? favFish : "",
    favFishCm: cmOk ? cm : 0
  };
}
const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    ...(status === 429 ? { "retry-after": "3" } : {})
  }
});
let _sql = null;
function sqlClient() {
  const url = Deno.env.get("SUPABASE_DB_URL");
  if (!url) throw new Error("DATABASE_URL_MISSING");
  if (!_sql) _sql = postgres(url, { max: 1, prepare: false, idle_timeout: 20, connect_timeout: 10 });
  return _sql;
}
const ALLOWED = (Deno.env.get("ALLOWED_ORIGINS") || "").split(",").map(s => s.trim().replace(/\/$/, "")).filter(Boolean);
function originAllowed(origin) { return !ALLOWED.length || !origin || ALLOWED.includes(origin); }
function corsHeaders(origin) {
  const headers = {
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "content-type, accept, authorization, apikey, x-client-info",
    "access-control-expose-headers": "retry-after",
    "access-control-max-age": "86400",
    "vary": "Origin"
  };
  if (!ALLOWED.length) headers["access-control-allow-origin"] = "*";
  else if (origin && originAllowed(origin)) headers["access-control-allow-origin"] = origin;
  return headers;
}
function mapRow(row) {
  const pr = cleanProfile(row.profile);
  return {
    pid: String(row.pid), pseudo: cleanPseudo(row.pseudo), level: Number(row.level), fishCount: Number(row.fish_count), biggestFishCm: Number(row.biggest_fish_cm),
    avatar: pr.avatar, frame: pr.frame, title: pr.title, badge: pr.badge
  };
}
async function getLeaderboard(sql, url) {
  const params = parseLeaderboardParams(url);
  if (!params.ok) return json({ error: params.error }, 400);
  const { category, period, limit } = params;
  let rows;
  if (period === "all" && category === "level") {
    rows = await sql`SELECT p.public_id AS pid, p.profile, p.pseudo, p.level, p.total_fish AS fish_count, p.biggest_fish_cm FROM leaderboard_players p ORDER BY p.level DESC, p.total_fish DESC, p.biggest_fish_cm DESC LIMIT ${limit}`;
  } else if (period === "all" && category === "fish") {
    rows = await sql`SELECT p.public_id AS pid, p.profile, p.pseudo, p.level, p.total_fish AS fish_count, p.biggest_fish_cm FROM leaderboard_players p ORDER BY p.total_fish DESC, p.level DESC LIMIT ${limit}`;
  } else if (period === "all" && category === "biggest") {
    rows = await sql`SELECT p.public_id AS pid, p.profile, p.pseudo, p.level, p.total_fish AS fish_count, p.biggest_fish_cm FROM leaderboard_players p ORDER BY p.biggest_fish_cm DESC, p.total_fish DESC LIMIT ${limit}`;
  } else if (period === "weekly" && category === "level") {
    rows = await sql`SELECT p.public_id AS pid, p.profile, w.pseudo, w.level, w.fish_count, w.biggest_fish_cm FROM leaderboard_weekly w JOIN leaderboard_players p ON p.id = w.player_id WHERE w.week_start = date_trunc('week', now() AT TIME ZONE 'UTC')::date ORDER BY w.level DESC, w.fish_count DESC, w.biggest_fish_cm DESC LIMIT ${limit}`;
  } else if (period === "weekly" && category === "fish") {
    rows = await sql`SELECT p.public_id AS pid, p.profile, w.pseudo, w.level, w.fish_count, w.biggest_fish_cm FROM leaderboard_weekly w JOIN leaderboard_players p ON p.id = w.player_id WHERE w.week_start = date_trunc('week', now() AT TIME ZONE 'UTC')::date ORDER BY w.fish_count DESC, w.level DESC LIMIT ${limit}`;
  } else {
    rows = await sql`SELECT p.public_id AS pid, p.profile, w.pseudo, w.level, w.fish_count, w.biggest_fish_cm FROM leaderboard_weekly w JOIN leaderboard_players p ON p.id = w.player_id WHERE w.week_start = date_trunc('week', now() AT TIME ZONE 'UTC')::date ORDER BY w.biggest_fish_cm DESC, w.fish_count DESC LIMIT ${limit}`;
  }
  return json({ category, period, rows: rows.map(mapRow) });
}
// Profil public d'un joueur. On n'expose JAMAIS l'identifiant privé (playerId) : seulement public_id.
async function getProfile(sql, publicId) {
  if (!PUBLIC_ID_RE.test(publicId)) return json({ error: "Profil introuvable." }, 400);
  const rows = await sql`
    SELECT p.public_id AS pid, p.pseudo, p.level, p.total_fish, p.biggest_fish_cm, p.profile, p.created_at,
      (SELECT count(*) + 1 FROM leaderboard_players x WHERE x.level > p.level OR (x.level = p.level AND x.total_fish > p.total_fish)) AS position,
      (SELECT w.fish_count FROM leaderboard_weekly w WHERE w.player_id = p.id AND w.week_start = date_trunc('week', now() AT TIME ZONE 'UTC')::date) AS weekly_fish
    FROM leaderboard_players p WHERE p.public_id = ${publicId}::uuid`;
  if (!rows.length) return json({ error: "Profil introuvable." }, 404);
  const r = rows[0];
  return json({ profile: {
    pid: String(r.pid), pseudo: cleanPseudo(r.pseudo), level: Number(r.level), fishCount: Number(r.total_fish), biggestFishCm: Number(r.biggest_fish_cm),
    position: Number(r.position), weeklyFish: Number(r.weekly_fish || 0), memberSince: new Date(r.created_at).toISOString().slice(0, 10),
    ...cleanProfile(r.profile)
  } });
}
async function updateProfile(sql, body) {
  const playerId = String(body.playerId || "");
  if (!PLAYER_ID_RE.test(playerId)) return json({ error: "Identifiant joueur invalide." }, 400);
  const pseudo = cleanPseudo(body.pseudo);
  const profile = cleanProfile(body.profile);
  const result = await sql`
    WITH upd AS (
      UPDATE leaderboard_players SET pseudo = ${pseudo}, profile = (COALESCE(leaderboard_players.profile, '{}'::jsonb) - '__catch_ids') || ${sql.json(profile)} || CASE WHEN leaderboard_players.profile ? '__catch_ids' THEN jsonb_build_object('__catch_ids', leaderboard_players.profile->'__catch_ids') ELSE '{}'::jsonb END, profile_updated_at = now(), updated_at = now()
      WHERE id = ${playerId}::uuid AND (profile_updated_at IS NULL OR profile_updated_at <= now() - interval '2 seconds')
      RETURNING id, public_id
    ), wk AS (
      UPDATE leaderboard_weekly SET pseudo = ${pseudo}
      WHERE player_id IN (SELECT id FROM upd) AND week_start = date_trunc('week', now() AT TIME ZONE 'UTC')::date
      RETURNING 1
    )
    SELECT public_id FROM upd`;
  if (result.length) return json({ ok: true, pid: String(result[0].public_id) });
  const exists = await sql`SELECT 1 FROM leaderboard_players WHERE id = ${playerId}::uuid`;
  // Pas encore de ligne : le profiasync function recordCatch(sql, body) {
  const validated = validateCatch(body);
  if (!validated.ok) return json({ error: validated.error }, 400);
  const { playerId, pseudo, weightCm, eventId } = validated;

  // La progression du classement est calculée exclusivement côté serveur.
  // Une capture validée rapporte 25 XP au classement ; level/xp envoyés par le client sont ignorés.
  // Le JSONB privé __catch_ids rend les reprises réseau idempotentes sans migration de table.
  // Limitation atomique par identifiant : une capture toutes les 3 secondes.
  // Sans compte authentifié, les identifiants d'appareil restent falsifiables : ce garde-fou ne supprime pas toute la triche.
  const result = await sql`
    WITH updated AS (
      INSERT INTO leaderboard_players
        (id, pseudo, level, xp, total_fish, biggest_fish_cm, last_catch_at, created_at, updated_at, profile)
      VALUES
        (${playerId}::uuid, ${pseudo}, 1, 25, 1, ${weightCm}, now(), now(), now(),
         jsonb_build_object('__catch_ids', jsonb_build_array(${eventId}::text)))
      ON CONFLICT (id) DO UPDATE SET
        pseudo = EXCLUDED.pseudo,
        level = CASE
          WHEN leaderboard_players.level < 100000
            AND leaderboard_players.xp + 25 >= leaderboard_players.level * 50
          THEN leaderboard_players.level + 1
          ELSE leaderboard_players.level
        END,
        xp = CASE
          WHEN leaderboard_players.level >= 100000
          THEN LEAST(4999999, leaderboard_players.xp + 25)
          WHEN leaderboard_players.xp + 25 >= leaderboard_players.level * 50
          THEN leaderboard_players.xp + 25 - leaderboard_players.level * 50
          ELSE leaderboard_players.xp + 25
        END,
        total_fish = leaderboard_players.total_fish + 1,
        biggest_fish_cm = GREATEST(leaderboard_players.biggest_fish_cm, EXCLUDED.biggest_fish_cm),
        last_catch_at = now(),
        updated_at = now(),
        profile = jsonb_set(
          COALESCE(leaderboard_players.profile, '{}'::jsonb),
          '{__catch_ids}',
          (
            SELECT COALESCE(jsonb_agg(ids.value ORDER BY ids.ordinality), '[]'::jsonb)
            FROM (
              SELECT value, ordinality
              FROM jsonb_array_elements(
                COALESCE(leaderboard_players.profile->'__catch_ids', '[]'::jsonb)
                || jsonb_build_array(${eventId}::text)
              ) WITH ORDINALITY AS recent(value, ordinality)
              ORDER BY ordinality DESC
              LIMIT 200
            ) AS ids
          ),
          true
        )
      WHERE
        (leaderboard_players.last_catch_at IS NULL
          OR leaderboard_players.last_catch_at <= now() - interval '3 seconds')
        AND NOT (
          COALESCE(leaderboard_players.profile->'__catch_ids', '[]'::jsonb)
          ? ${eventId}::text
        )
      RETURNING id, public_id, pseudo, level, xp, total_fish, biggest_fish_cm
    ), weekly AS (
      INSERT INTO leaderboard_weekly (player_id, week_start, pseudo, level, fish_count, biggest_fish_cm, updated_at)
      SELECT id, date_trunc('week', now() AT TIME ZONE 'UTC')::date, pseudo, level, 1, ${weightCm}::int, now() FROM updated
      ON CONFLICT (player_id, week_start) DO UPDATE SET
        pseudo = EXCLUDED.pseudo,
        level = EXCLUDED.level,
        fish_count = leaderboard_weekly.fish_count + 1,
        biggest_fish_cm = GREATEST(leaderboard_weekly.biggest_fish_cm, EXCLUDED.biggest_fish_cm),
        updated_at = now()
      RETURNING player_id
    )
    SELECT updated.public_id, updated.level, updated.xp, updated.total_fish, updated.biggest_fish_cm
    FROM updated JOIN weekly ON weekly.player_id = updated.id
  `;

  if (!result.length) {
    const prior = await sql`
      SELECT COALESCE(profile->'__catch_ids', '[]'::jsonb) ? ${eventId}::text AS duplicate
      FROM leaderboard_players
      WHERE id = ${playerId}::uuid
    `;
    if (prior[0]?.duplicate) return json({ ok: true, duplicate: true }, 200);
    return json({ error: "Capture trop rapprochée. Réessaie dans quelques secondes." }, 429);
  }
  return json({ ok: true, player: {
    pid: String(result[0].public_id), level: Number(result[0].level), xp: Number(result[0].xp),
    totalFish: Number(result[0].total_fish), biggestFishCm: Number(result[0].biggest_fish_cm)
  } }, 201);
}
async function handle(request) {
  if (request.method !== "GET" && request.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);
  if (!originAllowed(request.headers.get("origin"))) return json({ error: "Origine refusée." }, 403);
  try {
    const sql = sqlClient();
    if (request.method === "GET") {
      const url = new URL(request.url);
      const publicId = url.searchParams.get("profile");
      if (publicId) return await getProfile(sql, publicId);
      return await getLeaderboard(sql, url);
    }
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) return json({ error: "Le corps doit être en JSON." }, 415);
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 2048) return json({ error: "Requête trop volumineuse." }, 413);
    let body;
    try { body = JSON.parse(rawBody); } catch { return json({ error: "JSON invalide." }, 400); }
    if (!body || typeof body !== "object" || Array.isArray(body)) return json({ error: "Corps invalide." }, 400);
    if (body.action === "profile") return await updateProfile(sql, body);
    if (body.action !== undefined && body.action !== "catch") return json({ error: "Action inconnue." }, 400);
    return await recordCatch(sql, body);
  } catch (error) {
    if (error?.message === "DATABASE_URL_MISSING") return json({ error: "Le classement n'est pas configuré : SUPABASE_DB_URL est introuvable." }, 503);
    console.error("Leaderboard function error:", error);
    return json({ error: "Le service de classement est temporairement indisponible." }, 500);
  }
}
Deno.serve(async (request) => {
  const origin = request.headers.get("origin");
  if (request.method === "OPTIONS") return new Response(null, { status: originAllowed(origin) ? 204 : 403, headers: corsHeaders(origin) });
  const res = await handle(request);
  const headers = new Headers(res.headers);
  Object.entries(corsHeaders(origin)).forEach(([k, v]) => headers.set(k, v));
  return new Response(res.body, { status: res.status, headers });
});
