import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { compile } from "svelte/compiler";
import { joinWaitlist, waitlistCampaign, WaitlistRequestError } from "../src/lib/waitlist-client.ts";

const input = { email: " Visitor@Example.COM ", consent: true, locale: "es", source: "landing_home", website: "" };
test("submits normalized email and explicit consent without cookies or URL identifiers", async () => {
  let observed;
  await joinWaitlist("https://app.gatherory.test/api/waitlist", input, { fetcher: async (url, options) => {
    observed = { url, options };
    return Response.json({ ok: true, data: { accepted: true } });
  } });
  assert.equal(observed.url, "https://app.gatherory.test/api/waitlist");
  assert.equal(observed.options.credentials, "omit");
  assert.equal(observed.options.referrerPolicy, "no-referrer");
  assert.equal(observed.options.headers["Accept-Language"], "es");
  assert.deepEqual(JSON.parse(observed.options.body), { ...input, email: "visitor@example.com" });
  assert.equal(input.email, " Visitor@Example.COM ");
});
test("does not claim success on failure, malformed responses, or a missing acceptance", async () => {
  for (const [status, kind] of [[400, "invalid"], [429, "rate"], [500, "unavailable"], [503, "unavailable"]]) {
    await assert.rejects(joinWaitlist("/api/waitlist", input, { fetcher: async () => new Response("private-provider-detail", { status }) }), error => error instanceof WaitlistRequestError && error.kind === kind && !error.message.includes("private-provider-detail"));
  }
  for (const value of [{}, { ok: false }, { ok: true }, { ok: true, data: { accepted: false } }]) {
    await assert.rejects(joinWaitlist("/api/waitlist", input, { fetcher: async () => Response.json(value) }), WaitlistRequestError);
  }
  await assert.rejects(joinWaitlist("/api/waitlist", input, { fetcher: async () => new Response("not-json") }), WaitlistRequestError);
});
test("network failures propagate for a retry and requests can be aborted", async () => {
  const controller = new AbortController();
  await assert.rejects(joinWaitlist("/api/waitlist", input, { signal: controller.signal, fetcher: async (_url, options) => {
    assert.equal(options.signal, controller.signal);
    throw new TypeError("Network error");
  } }), TypeError);
});
test("only a short campaign label is retained from URL attribution", () => {
  assert.equal(waitlistCampaign("https://gatherory.test/?utm_campaign=launch-2026&utm_source=private-value"), "launch-2026");
  assert.equal(waitlistCampaign("https://gatherory.test/?utm_campaign=person%40example.com"), undefined);
  assert.equal(waitlistCampaign("https://gatherory.test/?utm_campaign=" + "a".repeat(81)), undefined);
});
test("form compiles accessibly for SSR/client and avoids a no-JS email query string", () => {
  const filename = new URL("../src/lib/components/landing/waitlist-form.svelte", import.meta.url);
  const source = readFileSync(filename, "utf8");
  for (const generate of ["client", "server"]) {
    const result = compile(source, { filename: filename.pathname, generate });
    assert.deepEqual(result.warnings.filter(w => w.code.startsWith("a11y_")), []);
  }
  assert.match(source, /<form method="post"/);
  assert.match(source, /type="checkbox" required/);
  assert.match(source, /role="status"/);
  assert.match(source, /role="alert"/);
});
