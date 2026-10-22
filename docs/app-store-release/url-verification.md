# Public App Store URLs

Verified October 22, 2026 by unauthenticated HTTPS requests to the live site.
Each page returned `200` with `text/html; charset=utf-8`; no account or session
was used.

| App Store Connect field | URL | Result |
| --- | --- | --- |
| Marketing URL | <https://gatherory.com/> | Public homepage returned 200. Suitable for the listing. |
| Privacy Policy URL | <https://gatherory.com/privacy> | Public privacy policy returned 200. Suitable for the listing. |
| Current live support destination | <https://gatherory.com/terms#contact> | Public Terms of Use returned 200 and includes a `Contact` section. The live copy says questions, service complaints, privacy requests, and reports of unlawful content can be sent to the operator's listed contact. |
| Prepared dedicated support URL | <https://gatherory.com/support> | A local Astro support page is prepared with app-help and beta problem-reporting guidance. The live path still returned 404 during the check above; do not enter it in App Store Connect until it is deployed and rechecked. |

The `/support` path returned 404 on the same check, before the local support
page was prepared. The operator has confirmed `info@gatherory.com` as the
dedicated app-support address; the local page uses it through the centralized
`SUPPORT_EMAIL` constant. The separate `legal@gatherory.com` address remains
the contact in the Terms for privacy requests, legal questions, service
complaints, and reports of unlawful content. The live site uses Cloudflare
email protection in the rendered legal contact link.

The web search/open tool could not retrieve these pages, so reachability was
verified directly with `curl -L` against the public HTTPS endpoints. The
recommendation is based on the HTTP response and the live page content, not on a
local development server. Recheck before saving the URLs in App Store Connect
if the site changes.
