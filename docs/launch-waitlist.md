# Launch-update waitlist

October 23, 2026. Local implementation; not deployed.

The homepage and iPhone product page now include a separate launch-update
form below the existing TestFlight panel, in both English and Spanish. The
beta remains available. People joining the waitlist need no account and must
explicitly agree to email updates; the checkbox is never preselected.

The form posts to the web app's `/api/waitlist` endpoint with cookies omitted
and no referrer URL. It retains inputs on a failed or rate-limited request,
uses a fifteen-second timeout, and announces success only after the API returns
its explicit acceptance. A normal HTML POST method prevents an email appearing
in a URL if JavaScript is unavailable. JSON submission requires JavaScript.

`PUBLIC_WAITLIST_API_URL` may override the endpoint at build/dev-server start.
Defaults are `https://app.gatherory.com/api/waitlist` for production and
`http://localhost:3003/api/waitlist` for development. Configure an alternate
local server URL explicitly when testing against a disposable database.

The backend, schema, migration, private tracker, access policy, test results,
and activation order are documented in
[the web-app handoff](../../gatherory-web-app/docs/development/launch-waitlist.md).
The requested tracker owner email is kept only in ignored local server
configuration. Never put it or a secret into this public application.

The privacy policy now describes the launch-update fields and purpose. The
form provides `info@gatherory.com` for withdrawing a request. The tracker can
record an opt-out; this implementation sends no confirmation or marketing
email. Email delivery and production activation are separate release work.

Focused regression tests run with `pnpm test:waitlist`; existing content and
legal checks and the static build remain applicable. Browser review verified
required consent, English and Spanish success, duplicate handling, rate-limit
copy, input preservation/recovery, correct page/language attribution, and a
320px layout, using only fictional addresses in an isolated local database.

The temporary app preview server and disposable database were stopped, and the
landing server was restarted with normal development configuration. The default
local endpoint needs the additive migration before it can store sign-ups.
Neither repository was pushed or deployed as part of the work.

Previews: [public form](marketing-assets/previews/waitlist-home-form.png),
[Spanish mobile recovery](marketing-assets/previews/waitlist-spanish-mobile-retry.png),
and [private tracker with fictional data](marketing-assets/previews/waitlist-tracker-fixture.png).
