import {
  cleanPseudo,
  parseLeaderboardParams,
  PLAYER_ID_RE,
  validateCatch,
  EVENT_ID_RE
} from "../_shared/leaderboard-validation.ts";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const validPlayerId = "123e4567-e89b-42d3-a456-426614174000";

Deno.test("accepts UUID v4 player identifiers only", () => {
  assert(PLAYER_ID_RE.test(validPlayerId), "valid UUID v4 should pass");
  assert(EVENT_ID_RE.test(validPlayerId), "valid event UUID should pass");
  assert(!PLAYER_ID_RE.test("123e4567-e89b-12d3-a456-426614174000"), "UUID v1 should fail");
  assert(!PLAYER_ID_RE.test("not-a-uuid"), "malformed UUID should fail");
});

Deno.test("validates fish and inclusive/exclusive size boundaries", () => {
  const low = validateCatch({ playerId: validPlayerId, eventId: validPlayerId, fishId: "sardine", weightCm: 8 });
  const highInside = validateCatch({ playerId: validPlayerId, eventId: validPlayerId, fishId: "sardine", weightCm: 17 });
  const upperBoundary = validateCatch({ playerId: validPlayerId, eventId: validPlayerId, fishId: "sardine", weightCm: 18 });
  assert(low.ok, "lower boundary should pass");
  assert(highInside.ok, "last valid integer should pass");
  assert(!upperBoundary.ok, "upper boundary should fail");
  assert(!validateCatch({ playerId: validPlayerId, eventId: validPlayerId, fishId: "unknown", weightCm: 10 }).ok, "unknown fish should fail");
  assert(!validateCatch({ playerId: validPlayerId, eventId: validPlayerId, fishId: "sardine", weightCm: 8.5 }).ok, "fractional size should fail");
  assert(!validateCatch({ playerId: validPlayerId, eventId: "bad-event", fishId: "sardine", weightCm: 10 }).ok, "malformed event ID should fail");
});

Deno.test("rejects malformed player IDs and non-object request bodies", () => {
  assert(!validateCatch(null).ok, "null body should fail");
  assert(!validateCatch([]).ok, "array body should fail");
  assert(!validateCatch({ playerId: "bad", eventId: validPlayerId, fishId: "sardine", weightCm: 10 }).ok, "bad player ID should fail");
});

Deno.test("cleans pseudo safely and caps its length", () => {
  assert(cleanPseudo("  <Pêcheur>\n  test  ") === "Pêcheur test", "markup/control characters should be removed");
  assert(cleanPseudo("abcdefghijklmnopqr").length === 16, "pseudo should be capped at 16 characters");
});

Deno.test("validates leaderboard filters and clamps the requested limit", () => {
  const valid = parseLeaderboardParams(new URL("https://example.test/?category=fish&period=weekly&limit=500"));
  assert(valid.ok && valid.category === "fish" && valid.period === "weekly" && valid.limit === 100, "valid filters should pass and limit should cap at 100");
  assert(!parseLeaderboardParams(new URL("https://example.test/?category=unknown")).ok, "unknown category should fail");
  assert(!parseLeaderboardParams(new URL("https://example.test/?period=year")).ok, "unknown period should fail");
  assert(!parseLeaderboardParams(new URL("https://example.test/?limit=10oops")).ok, "partially numeric limit should fail");
  assert(!parseLeaderboardParams(new URL("https://example.test/?limit=0")).ok, "zero limit should fail");
});
