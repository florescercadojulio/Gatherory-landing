# Product screenshot showcase brief

## Source and limits

The regular iPhone screenshots and Duo screenshots are unedited captures of the
native Gatherory app using the isolated Maya’s Birthday Dinner marketing
fixture. The regular set was captured October 21, 2026 from the iOS 27.0
simulator, with Manage refreshed on iOS 27.1; its originals are 1206 × 2622. The Duo set was captured on the same
date in the iPhone Duo simulator; see [Duo capture provenance](./duo-captures.md)
for exact source files, poses, dimensions, and exclusions. The names, plans,
amounts, status totals, portraits, and dates are fictional demonstration data.
The people and photography are stock prototype content; see
[image source notes](./image-variety-sources.md). New guest and requestor
portrait credits are recorded in the native [fixture asset inventory](../../../ios-apps/gatherory/docs/birthday-marketing-fixture-assets.md).

These images show implemented native screens in a simulator. They do not show
customer activity, live service data, an App Store listing, or physical-device
acceptance. Treat visible numbers and statuses as examples, and describe only
what the screenshots themselves show.

## Strongest product evidence

| Theme | Best source | Visible evidence | Safe description |
| --- | --- | --- | --- |
| Collect ideas | `public/images/ios/duo/ideas.webp` | Open Duo Ideas workspace with birthday event selected, multiple idea cards, contributors, and the native side controls | Shared event ideas in an adaptive open-screen layout |
| Compare ideas | `public/images/ios/duo/decide.webp` | Book-pose Duo Decide reader with the complete candlelit-table idea card, its $45 example cost, description, author, and preference bar | Review an idea and see example team preferences |
| Quick iPhone comparison | `public/images/ios/decide.webp` | Regular portrait Decide screen with the same full idea, artwork, cost, description, preference bar, and tabs | A focused idea review on iPhone |
| Event planning overview | `public/images/ios/duo/manage.webp` | Open portrait Manage dashboard with budget, guest RSVP totals, collaborator approval count, quick approval state, next to-do, and an Updates card | See planning status, budget, guests, approvals, and next task together |
| Compact iPhone overview | `public/images/ios/manage.webp` | Regular portrait Manage screen with budget, guest totals, collaborator approval count, quick approval, and next to-do | A compact event-management overview |

The Duo Decide screen is landscape and the regular Decide screen is portrait, so
they make a clear comparison of the same decision screen in two layouts. The
Duo Manage capture gives the dashboard more room. Both captures show the budget
fully, 11 guests across all four RSVP states, two awaiting approvals, a pictured
requestor, and the next task. The Duo Updates heading is visible, but its body
is partly covered by the floating event picker; the regular capture shows less
of that card. Do not claim that either capture displays the full Updates body.

The Duo Ideas screenshot shows a broad, airy canvas: its idea cards occupy the
upper part of the screen and the event selector and side controls remain
visible. Use it to show adaptive layout and idea variety. Do not describe it as
a full dense feed or imply that all ideas are visible at once.

## Display guidance

Keep each image at its native aspect ratio. The regular phone captures are
1206 × 2622 (0.46:1); the Duo Ideas and Decide captures are 2853 × 2007
(1.42:1); Duo Manage is 2007 × 2853 (0.70:1). Keep screenshots fully visible
inside their CSS device frames with `object-fit: contain`. Cropping the Duo
canvas removes native controls and can change the layout being demonstrated.

Duo captures include the full simulator screen canvas around the app content.
They need more display width than a regular phone screenshot to keep labels
readable. Give a landscape Duo preview roughly 700 px or more on a desktop
layout where its on-screen text needs to be read; use a larger stacked or
scrollable preview on narrow screens instead of shrinking a pair of devices
into tiny side-by-side thumbnails. A regular portrait phone preview remains
readable at about 300 px wide. These are layout starting points; preserve the
intrinsic ratio at every breakpoint.

The portrait Duo Manage capture also includes a full screen canvas. At about
400 px wide it works as a dashboard overview, but the task and status text is
too small to read comfortably. Use roughly 600 px or a zoomable/stacked view
when readers need to inspect those details. At smaller widths, keep it as an
overview and let the accompanying text name the visible sections.

Use the Duo Decide and Duo Manage previews as the detailed feature panels. The
regular Decide image is the most compact way to show the same decision flow at
phone scale. Pair captions with the specific screen: idea review/preferences
for Decide, and budget/guest/approval/to-do status for Manage.

## Related records

- [Regular iPhone screenshot inventory and fixture isolation](./README.md)
- [Duo originals, WebP assets, and pose notes](./duo-captures.md)
- [Image variety manifest](./image-variety-manifest.json)
- [Photo and portrait sources](./image-variety-sources.md)
