# Launch marketing prototype

October 21, 2026. Local implementation; not deployed.

## Implemented

- Homepage hero: “Plan the celebration together,” leading with the photo-filled
  Ideas screen from the native app on regular iPhone and open iPhone Duo.
- Primary CTAs open the iPhone preview instead of web account creation. Guide
  CTAs and mobile navigation use the same destination; sign-in remains secondary.
- Birthday/dinner examples, shared-planning benefits, and shorter role messaging.
- Large native Decide and Manage sections directly after the hero: iPhone Decide
  and the Duo Manage overview, each linked to its full-size image.
  The hero’s secondary CTA leads to this product walkthrough. Product imagery
  replaces the rendered illustrative event poster and abstract decision demo;
  their source components remain available.
  [Screenshot content and provenance](marketing-assets/product-showcase.md).
- `/iphone`: screenshot selector for Events, Ideas, Decide, and the Manage overview, offline
  explanation, availability/platform FAQs, and a clear pre-release status.
- `/es/` and `/es/iphone`: Spanish marketing copy, language links, localized
  mobile navigation, and canonical/alternate metadata. Guides and legal pages
  remain English and Spanish links disclose that.
- Decorative pre-title labels are removed from the English and Spanish homepage
  and iPhone page; section headings lead directly into their content.
- Five compressed real simulator captures with fictional fixture content.
  [Asset provenance and originals](marketing-assets/README.md).
- Paired regular-iPhone and iPhone-Duo mockups on both marketing heroes, with
  English/Spanish device captions and alt text. The shared `device-pair.svelte`
  component preserves each screenshot's full aspect ratio at narrow widths.
  [Duo capture details](marketing-assets/duo-captures.md) cover three additional
  native assets; the wide Ideas capture is used in the heroes. The interactive
  gallery retains its current regular-iPhone screens.

The five screenshots show **Maya’s Birthday Dinner**, a photographed related
event, six distinct idea photos, pictured collaborators, and a $600 budget.
The opt-in native fixture uses eleven unique photos: one main-event cover,
six idea images, and four child-event images. A regression verifies all eleven
remain present and distinct through archive save/restore.

The homepage leads with the photo-filled Ideas grid on iPhone and Duo, then
shows the native Decide preference card and the Manage dashboard at a larger
scale. The refreshed Manage fixture includes its $395 / $600 budget, 11 people
(6 going, 2 maybe, 1 declined, and 2 awaiting), two pictured pending requests,
an assigned to-do, and an Updates section whose body is partly covered by the
native floating event picker. The budget card has more vertical room to keep
the remaining amount clear of the chart. Both walkthrough images preserve their full content
and can open at full size; compact mobile layouts put the copy before the image.
The walkthrough previews use dark phone outlines with metal rims, side buttons,
and subtle desktop tilt. A shared decorative camera cutout also appears in the
hero pairs and iPhone gallery. Duo frames reserve headroom for it above the app. Mobile previews stay upright, and the frame treatment
does not alter the native image files or their aspect ratios.
The iPhone page retains its Home hero and the “Drinks & catch-ups” invitation
as the Events preview, with RSVP choices in one horizontal row. Shared planning
remains the core message, with photo personalization as a supporting benefit.
The homepage lifestyle section uses a group-photo scene. All copy is available
in English and Spanish; app screenshots currently show English UI.

Current image mapping and provenance:

- [Eleven-image manifest](marketing-assets/image-variety-manifest.json).
- [Source credits](marketing-assets/image-variety-sources.md).
- [Capture details and originals](marketing-assets/README.md).

The web/server local development database was also updated incrementally:
all eight demo accounts and all nine event people now have portraits, including
the three contact-only guests. Both pending requestors are pictured. Native
bootstrap and sync payloads match; the final dry run found zero changes.
Existing custom pictures, RSVP states, and pending requests were preserved.
No database reset was run. See
[development seed instructions](../../gatherory-web-app/docs/development/development-seed.md)
for the reusable updater and its localhost/fixture restrictions.

## Preview

Run `pnpm astro dev --background` from the landing repository, following AGENTS.md.
The current local preview is `http://localhost:4321/`, with `/iphone`, `/es/`, and
`/es/iphone` available. Manage it with `pnpm astro dev status`, `logs`, and `stop`.

Saved review images:

- [Decide product section, desktop](marketing-assets/previews/homepage-decide-product-desktop.jpg)
- [Manage product section, desktop](marketing-assets/previews/homepage-manage-product-desktop.jpg)
- [Spanish product walkthrough, mobile](marketing-assets/previews/homepage-product-spanish-mobile.jpg)

- [iPhone and Duo homepage, desktop](marketing-assets/previews/homepage-duo-desktop.jpg)
- [iPhone and Duo app page, desktop](marketing-assets/previews/iphone-duo-desktop.jpg)
- [Paired devices on Spanish mobile homepage](marketing-assets/previews/homepage-duo-spanish-mobile.jpg)
- [Paired devices on Spanish 320px app page](marketing-assets/previews/iphone-duo-spanish-320.jpg)
- [Homepage without pre-titles, desktop](marketing-assets/previews/homepage-no-pretitles-desktop.jpg)
- [Manage overview, desktop](marketing-assets/previews/iphone-manage-desktop.jpg)
- [Ideas photo demo, desktop](marketing-assets/previews/iphone-image-variety-desktop.jpg)
- [Related-event photo demo, desktop](marketing-assets/previews/iphone-events-desktop.jpg)
- [Spanish homepage, mobile](marketing-assets/previews/homepage-spanish-mobile.jpg)

## Validation

- `pnpm test:content`: passed, 3 checks.
- `pnpm test:legal`: passed, 5 checks.
- `pnpm build`: successful static output for all four marketing routes and the
  existing site pages.
- English/Spanish locale keys match; new iPhone page and mobile navigation
  compile for client/server without accessibility warnings.
- Browser verification: homepage CTA navigation, interactive screenshot
  selection, Spanish mobile menu and CTA, 390px Spanish homepage, and 320px
  Spanish iPhone page. The new homepage walkthrough also fits English and
  Spanish at 320px, with the refreshed Manage image checked at 390px. No
  horizontal overflow at the checked mobile widths.
- Native verification: Debug build, five dashboard tests, and ten birthday
  fixture / join-request-store tests passed on the isolated Duo (15 total).
  The isolated screenshot fixture now returns two pictured requests through
  a stateful in-memory transport. Approval actions remove the reviewed request
  without changing real account access. The manager-only server response now
  includes a nullable profile image URL, with legacy JSON still supported.
- Native RSVP: Going → Not Sure → Going selection verified in the horizontal row.
- Profile-photo and event-image update: four focused suites / 23 tests passed;
  web/server typecheck passed. Contact portrait checks cover both null and
  omitted optional account IDs, exact fixture identity, and repeat-run safety.
- Final image-loading checks: no broken loaded images on desktop or 390px Spanish
  homepage; 320px Spanish iPhone page fits without horizontal overflow.
- `git diff --check`: passed.
- Duo mockup review: both heroes show both devices with visible labels; no
  broken loaded images or horizontal overflow at 390px Spanish homepage and
  320px Spanish iPhone-page widths. The Duo images are native simulator captures,
  not crops or enlarged versions of the regular-phone screen.

## Next work

Replace the pre-release preview CTA with the verified App Store or beta
destination when available. Replace temporary stock photography with approved original content and capture
Spanish app screenshots for final launch assets. Confirm the features and
platform statements against the actual release build before publication.
Acquisition tracking, a waitlist, campaign outreach, paid media, and deployment
were not added in this pass.

Strategy: [launch marketing plan](../../gatherory-web-app/docs/marketing/launch-strategy.md).
