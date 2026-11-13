import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const game = read("../js/game.js");
const sprites = read("../js/sprites.js");
const html = read("../index.html");
const sw = read("../sw.js");
const manifest = JSON.parse(read("../manifest.webmanifest"));
const pkg = JSON.parse(read("../package.json"));
const pwa = read("../js/pwa.js");

const dataBlock = sprites.match(/const DATA = \{([\s\S]*?)\n\s*\};/);
assert.ok(dataBlock, "Le catalogue PNG embarqué doit être présent");
const assets = new Map(
  [...dataBlock[1].matchAll(/"([^"]+)"\s*:\s*"data:image\/png;base64,([^"]+)"/g)]
    .map((match) => [match[1], Buffer.from(match[2], "base64")])
);

const skinIds = [...new Set(
  [...game.matchAll(/\{\s*id:\s*"((?:char|boat|rod|lure)_[a-z0-9_]+)"\s*,\s*name:/g)]
    .map((match) => match[1])
)];
const groups = Object.fromEntries(
  ["char", "boat", "rod", "lure"].map((prefix) => [
    prefix,
    skinIds.filter((id) => id.startsWith(prefix + "_"))
  ])
);
const svgSkins = new Set(["char_duck", "boat_duck", "rod_duck"]);

function hasRenderer(id) {
  return assets.has(id)
    || (id === "boat_classic" && assets.has("boat"))
    || svgSkins.has(id);
}

function pngSize(buffer) {
  assert.deepEqual(
    [...buffer.subarray(0, 8)],
    [137, 80, 78, 71, 13, 10, 26, 10],
    "Signature PNG invalide"
  );
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

test("le catalogue embarqué contient 100 PNG valides", () => {
  assert.equal(assets.size, 100);
  for (const [key, buffer] of assets) {
    assert.ok(buffer.length > 24, key + " est vide ou tronqué");
    const { width, height } = pngSize(buffer);
    assert.ok(width > 0 && height > 0, key + " a des dimensions invalides");
  }
});

test("tous les skins ont un rendu et les catégories restent complètes", () => {
  assert.deepEqual(
    Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, v.length])),
    { char: 5, boat: 11, rod: 9, lure: 7 }
  );
  for (const id of skinIds) assert.ok(hasRenderer(id), "Aucun sprite ou SVG pour " + id);
  assert.ok(sprites.includes("window.SPRITES.boat_classic = window.SPRITES.boat"));
  const duckRenderer = game.match(/const duckSkinSvg = id => \{([\s\S]*?)\n\s*\};/);
  assert.ok(duckRenderer, "Le rendu SVG Canard doit exister");
  assert.ok(duckRenderer[1].includes('id === "char_duck"'));
  assert.ok(duckRenderer[1].includes('id === "boat_duck"'));
  assert.ok(game.includes('["char_duck", "boat_duck", "rod_duck"]'));
  assert.ok(duckRenderer[1].includes("[176, 224]"));
  assert.ok(duckRenderer[1].includes("[448, 200]"));
  assert.ok(duckRenderer[1].includes("[512, 112]"));
});

test("les dimensions des textures correspondent au moteur Canvas", () => {
  for (const [key, buffer] of assets) {
    const size = pngSize(buffer);
    if (key.startsWith("char_")) assert.deepEqual(size, { width: 176, height: 224 }, key);
    if (key.startsWith("boat_")) assert.deepEqual(size, { width: 448, height: 200 }, key);
    if (key.startsWith("rod_")) assert.deepEqual(size, { width: 512, height: 112 }, key);
  }
});

test("les 3 465 combinaisons personnage × bateau × canne × leurre sont résolubles", () => {
  let combinations = 0;
  for (const character of groups.char) {
    for (const boat of groups.boat) {
      for (const rod of groups.rod) {
        for (const lure of groups.lure) {
          assert.ok(hasRenderer(character), character);
          assert.ok(hasRenderer(boat), boat);
          assert.ok(hasRenderer(rod), rod);
          assert.ok(hasRenderer(lure), lure);
          combinations++;
        }
      }
    }
  }
  assert.equal(combinations, 3465);
});

test("les numéros de version de l'application sont synchronisés", () => {
  const htmlVersion = html.match(/name="app-version" content="([^"]+)"/)?.[1];
  const gameVersion = game.match(/const APP_VERSION = "([^"]+)"/)?.[1];
  const swVersion = sw.match(/const VERSION = "([^"]+)"/)?.[1];
  assert.ok(htmlVersion && gameVersion && swVersion);
  assert.deepEqual(
    [htmlVersion, gameVersion, swVersion, manifest.version, pkg.version],
    ["1.0.27", "1.0.27", "1.0.27", "1.0.27", "1.0.27"]
  );
});

test("le service worker est enregistré et le bouton active une version en attente", () => {
  assert.ok(html.includes('src="js/pwa.js"'));
  assert.ok(pwa.includes('navigator.serviceWorker.register("./sw.js"'));
  assert.ok(pwa.includes('postMessage("SKIP_WAITING")'));
  assert.ok(sw.includes('e.data === "SKIP_WAITING"'));
});
