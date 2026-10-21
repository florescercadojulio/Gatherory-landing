# iPhone prototype screenshots

Captured October 21, 2026 from Gatherory Debug. Home, Ideas, Decide, and Events
use iOS 27.0 simulator captures; Manage was refreshed on iOS 27.1. These are
actual native app screens using the opt-in
**Maya’s Birthday Dinner** fixture. Names, plans, preferences, expenses, and
assignments are fictional demonstration data, not customer activity or endorsements.

| Asset | Depicted screen |
| --- | --- |
| `home` | Birthday event card with dinner photography and all four planners’ profile pictures |
| `ideas` | Birthday table, shared pasta dinner, chocolate cake, playlist, flowers, and group photo ideas |
| `decide` | Candlelit birthday table with 2 love / 1 maybe / 1 unanswered team preferences |
| `events` | Drinks & catch-ups child event with its own photo and a horizontal Going / Not Sure / Not Going response row |
| `manage` | Planning overview with the $395 / $600 budget, 6 going, 2 maybe, 1 declined, 2 awaiting, two pending collaborator approvals, Taylor’s pictured quick approval, and Alex’s assigned to-do |

Regular iPhone screenshots are 1206 × 2622 pixels. PNGs in `ios-originals/` are unedited
simulator captures. WebP files in `public/images/ios/` preserve their dimensions
and use Sharp quality 88. No UI was composited, generated, or replaced after
capture. The app renders bundled sample photography and portraits normally.

The homepage and iPhone-page heroes also show an open iPhone Duo beside the
regular iPhone. Its Ideas screenshot is an actual 2853 × 2007 native simulator
capture. Book-pose Decide and open-pose portrait Manage assets are available alongside it.
See [Duo capture provenance](duo-captures.md) for originals, dimensions, poses,
and the excluded older invitation captures. Device frames on the site are CSS;
the app screenshots retain their original aspect ratios and full content.

## Capture isolation and reproducibility

The native fixture is `Gatherory/App/BirthdayMarketingFixtures.swift` in the
iOS repository. It is compiled only in Debug and requires all of these switches:

```text
-DisableProductionFlowSimulation -SeedDevelopmentData -SkipAuthentication
-UseEphemeralDataStore -UseBirthdayMarketingFixture -UseProductionOnboarding
-AuthenticationBaseURL http://127.0.0.1:9
```

The Manage overview capture adds `-BirthdayMarketingManagePreview`. This
DEBUG-only option selects Manage after the birthday workspace opens, and only
when the complete isolated fixture switches above are also present. Ordinary
app launches still open Home. The fixture-scoped join-request transport returns
two pictured local requests for the stable demo event, without a server request.
The guest chart reflects all 11 enrolled guests and shows every nonzero RSVP
category.

The ordinary wedding development samples remain available without the birthday
flag. The marketing seed writes the workspace and profile image asset references
through the existing SwiftData persistence path into an isolated in-memory store.
It never enters an account’s persistent database or the synchronization outbox.
The in-memory flag disables analytics; the network base points to unused loopback.
No server seed, customer account, or production service was used for capture.
The original captures use a 9:41 status bar; the refreshed Manage images retain
their live simulator times (7:07 on regular iPhone and 7:11 on Duo).

Home, Ideas, Decide, and Events were selected through Device Hub UI. Manage was
opened with the opt-in launch argument above and shows the real dashboard; the
fixture also includes a short note in its Updates card below the visible fold.
No native screen was composited or replaced after capture.

## Temporary photo sources

The imagery is stock prototype content. People depicted are not the named
fictional planners, users, or testimonials. Replace with approved original
content before launch. Unsplash license: <https://unsplash.com/license>.

The event cover, six idea cards, and four child events use eleven distinct
photos. Their current asset names, placements, alt text, photographers, and
Unsplash source links are recorded in the shared
[image-variety manifest](./image-variety-manifest.json) and
[source notes](./image-variety-sources.md).

| Native bundled portrait | Source |
| --- | --- |
| `MarketingAlex` | [Portrait CDN](https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&h=240&fit=crop&crop=faces&auto=format) |
| `MarketingJordan` | [Portrait CDN](https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&h=240&fit=crop&crop=faces&auto=format) |
| `MarketingMaya` | [Portrait CDN](https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&h=240&fit=crop&crop=faces&auto=format) |
| `MarketingRiley` | [Portrait CDN](https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=240&h=240&fit=crop&crop=faces&auto=format) |

Portraits use the same source catalog as the web app’s local development
accounts (`src/db/seeds/development-profile-images.ts`). Native screenshots use
bundled copies so images remain visible offline without CDN requests.

Spanish pages currently show English app screenshots. Capture a localized set
before using these in a dedicated Spanish campaign. The fixed illustrative event
date is November 14, 2026; advance the fixture before future recaptures.
