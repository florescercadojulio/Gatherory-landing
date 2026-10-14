import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { compile } from "svelte/compiler";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const articles = readdirSync(new URL("src/content/seo/", root))
  .filter((name) => name.endsWith(".md"))
  .map((name) => {
    const source = read(`src/content/seo/${name}`);
    const metadata = source.split("---")[1];
    return { name, source, metadata, slug: metadata.match(/^slug: "([^"]+)"/m)?.[1] };
  });

test("every guide has a unique URL and valid related articles", () => {
  const slugs = new Set(articles.map((article) => article.slug));
  assert.equal(slugs.size, articles.length);
  for (const article of articles) {
    assert.ok(article.slug, `${article.name} needs a slug`);
    const related = article.metadata.match(/^related:\n((?:[ \t]+[^\n]*\n)*)/m)?.[1] ?? "";
    assert.ok(related, `${article.name} needs related guides`);
    for (const [, slug] of related.matchAll(/- "([^"]+)"/g)) {
      assert.ok(slugs.has(slug), `${article.name} links to missing guide ${slug}`);
      assert.notEqual(slug, article.slug, `${article.name} links to itself`);
    }
  }
});

test("local article links resolve to guides or site pages", () => {
  const paths = new Set(articles.map((article) => `/${article.slug}`));
  for (const file of readdirSync(new URL("src/pages/", root))) {
    if (file.endsWith(".astro") && !file.includes("[")) {
      paths.add(file === "index.astro" ? "/" : `/${file.slice(0, -6)}`);
    }
  }
  for (const article of articles) {
    for (const [, path] of article.source.matchAll(/\]\((\/[^)#?]*)(?:[?#][^)]*)?\)/g)) {
      assert.ok(paths.has(path.replace(/\/$/, "") || "/"), `${article.name}: missing ${path}`);
    }
  }
});

test("homepage and three-response demo compile for client and server", () => {
  for (const name of ["landing-page", "decision-deck"]) {
    const filename = `src/lib/components/landing/${name}.svelte`;
    for (const generate of ["client", "server"]) {
      const result = compile(read(filename), { filename, generate });
      assert.ok(result.js.code.length > 0);
      assert.deepEqual(result.warnings.filter((warning) => warning.code.startsWith("a11y_")), []);
    }
  }
  const demo = read("src/lib/components/landing/decision-deck.svelte");
  for (const response of ["pass", "maybe", "love"]) {
    assert.ok(demo.includes(`decide("${response}")`), `Missing ${response} control`);
  }
});
