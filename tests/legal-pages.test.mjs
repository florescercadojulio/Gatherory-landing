import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { LEGAL_DETAILS } from "../src/lib/legal-details.ts";

const fromAstro = createRequire(import.meta.resolve("astro/package.json"));
const compiler = fromAstro("@astrojs/compiler-rs");
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const pages = ["privacy", "terms"];

test("legal pages and shared layout compile with the installed Astro compiler", async () => {
  for (const path of [...pages.map((page) => `src/pages/${page}.astro`), "src/layouts/legal-layout.astro"]) {
    const result = await compiler.transform(read(path), { filename: path });
    assert.ok(result.code.length > 0, `${path} produced no compiled component`);
    assert.deepEqual(result.diagnostics?.filter((item) => item.severity === 1) ?? [], [], `${path} has compilation errors`);
  }
});

test("every legal contents link resolves to exactly one section", () => {
  for (const page of pages) {
    const source = read(`src/pages/${page}.astro`);
    const ids = [...source.matchAll(/<section id="([^"]+)"/g)].map((match) => match[1]);
    const links = [...source.matchAll(/<a href="#([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${page} has duplicated sections`);
    assert.deepEqual(links, ids, `${page} contents and sections differ`);
    const headings = [...source.matchAll(/<h2>(\d+)\./g)].map((match) => Number(match[1]));
    assert.deepEqual(headings, Array.from({ length: ids.length }, (_, index) => index + 1));
  }
});

test("both legal pages use confirmed operator details and the monitored mailbox", () => {
  assert.equal(LEGAL_DETAILS.operator, "Guide Systems LLC");
  assert.equal(LEGAL_DETAILS.country, "United States");
  assert.equal(LEGAL_DETAILS.contactEmail, "legal@gatherory.com");
  for (const page of pages) {
    const source = read(`src/pages/${page}.astro`);
    assert.match(source, /LEGAL_DETAILS\.operator/);
    assert.match(source, /LEGAL_DETAILS\.contactEmail/);
    assert.doesNotMatch(source, /privacy@gatherory\.com|\[insert|\[your address/i);
  }
});

test("unresolved EU release checks keep a visible review label", () => {
  assert.equal(LEGAL_DETAILS.releaseReview, true);
  for (const page of pages) {
    assert.match(read(`src/pages/${page}.astro`), /releaseReview=\{LEGAL_DETAILS\.releaseReview\}/);
  }
  assert.match(read("src/layouts/legal-layout.astro"), /copy\.legal\.releaseReviewTitle/);
  assert.match(read("src/i18n/locales/en.ts"), /releaseReviewTitle: "Release-review draft"/);
});

test("consumer protections and privacy-request routes remain explicit", () => {
  const privacy = read("src/pages/privacy.astro");
  assert.match(privacy, /within one month/);
  assert.match(privacy, /supervisory authority/);
  assert.match(privacy, /portable, machine-readable/);
  assert.match(privacy, /prior opt-in/);
  const terms = read("src/pages/terms.astro");
  assert.match(terms, /business-user exclusions and cap below do not apply to you/);
  assert.match(terms, /habitual residence/);
  assert.doesNotMatch(terms, /Continuing to use Gatherory.*means you accept/);
});
