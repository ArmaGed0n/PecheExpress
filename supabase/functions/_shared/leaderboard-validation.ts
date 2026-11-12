export const FISH_RANGES: Readonly<Record<string, readonly [number, number]>> = Object.freeze({
  sardine: [8,18], truite: [15,45], perche: [10,38], gardon: [8,25], carpe: [25,75],
  brochet: [40,110], silure: [120,260], ecrevisse: [6,16], saumon: [40,90], esturgeon: [80,200],
  demoiselle: [5,12], clown: [6,15], globe: [12,35], pieuvre: [40,120], morue: [30,80],
  crabe: [15,40], narval: [150,300], beluga: [300,550], thon: [60,200], espadon: [80,220],
  calmar: [150,400], requin: [150,450], baleine: [400,900], lanterne: [10,30], baudroie: [30,90],
  dragon: [200,600], kraken: [400,800]
});

export const PLAYER_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const PUBLIC_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function cleanPseudo(value: unknown): string {
  return String(value ?? "Pêcheur").normalize("NFKC")
    .replace(/[<>\u0000-\u001f\u007f]/g, "")
    .trim().replace(/\s+/g, " ").slice(0, 16) || "Pêcheur";
}

export type CatchInput =
  | { ok: true; playerId: string; pseudo: string; fishId: string; weightCm: number }
  | { ok: false; error: string };

export function validateCatch(body: unknown): CatchInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Corps invalide." };
  }
  const value = body as Record<string, unknown>;
  const playerId = typeof value.playerId === "string" ? value.playerId : "";
  if (!PLAYER_ID_RE.test(playerId)) return { ok: false, error: "Identifiant joueur invalide." };

  const fishId = typeof value.fishId === "string" ? value.fishId : "";
  const range = FISH_RANGES[fishId];
  const rawWeight = value.weightCm;
  const weightCm = typeof rawWeight === "number"
    ? rawWeight
    : typeof rawWeight === "string" && rawWeight.trim() !== "" ? Number(rawWeight) : Number.NaN;

  if (!range || !Number.isSafeInteger(weightCm) || weightCm < range[0] || weightCm >= range[1]) {
    return { ok: false, error: "Capture invalide." };
  }
  return { ok: true, playerId, pseudo: cleanPseudo(value.pseudo), fishId, weightCm };
}

export type LeaderboardParams =
  | { ok: true; category: "level" | "fish" | "biggest"; period: "all" | "weekly"; limit: number }
  | { ok: false; error: string };

export function parseLeaderboardParams(url: URL): LeaderboardParams {
  const category = url.searchParams.get("category") || "level";
  const period = url.searchParams.get("period") || "all";
  const rawLimit = url.searchParams.get("limit") || "100";
  if (!["level", "fish", "biggest"].includes(category)) {
    return { ok: false, error: "Catégorie inconnue." };
  }
  if (!["all", "weekly"].includes(period)) {
    return { ok: false, error: "Période inconnue." };
  }
  if (!/^\\d{1,6}$/.test(rawLimit)) {
    return { ok: false, error: "Limite invalide." };
  }
  const requested = Number(rawLimit);
  if (!Number.isSafeInteger(requested) || requested < 1) {
    return { ok: false, error: "Limite invalide." };
  }
  return {
    ok: true,
    category: category as "level" | "fish" | "biggest",
    period: period as "all" | "weekly",
    limit: Math.min(100, requested)
  };
}
