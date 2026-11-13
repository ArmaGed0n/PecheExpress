import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [pkgText, html, game, sw, changelog] = await Promise.all([
  read("package.json"), read("index.html"), read("js/game.js"), read("sw.js"), read("changelog.json"),
]);
const pkg = JSON.parse(pkgText);
const notes = JSON.parse(changelog);
const htmlVersion = html.match(/<meta name="app-version" content="([^"]+)"/)?.[1];
const gameVersion = game.match(/const APP_VERSION = "([^"]+)"/)?.[1];
const swVersion = sw.match(/const VERSION = "([^"]+)"/)?.[1];

test("les cinq références de version sont identiques", () => {
  assert.ok(pkg.version);
  assert.equal(htmlVersion, pkg.version, "index.html doit suivre package.json");
  assert.equal(gameVersion, pkg.version, "APP_VERSION doit suivre package.json");
  assert.equal(swVersion, pkg.version, "VERSION du service worker doit suivre package.json");
  assert.equal(notes[0]?.version, pkg.version, "la première entrée du changelog doit suivre package.json");
});

test("les notes de version lisent la version HTML et non une variable privée", async () => {
  const changelogJs = await read("js/changelog.js");
  assert.match(changelogJs, /function currentVersion\(\)/);
  assert.match(changelogJs, /meta\[name="app-version"\]/);
  assert.doesNotMatch(changelogJs, /APP_VERSION/);
});
