# First occasion-focused content batch

October 21, 2026. Local implementation; not deployed.

## Audience and scope

These guides support Gatherory’s first audience: people planning a birthday,
dinner, or informal celebration with a few friends or co-hosts. The topics come
from the [launch strategy](../../gatherory-web-app/docs/marketing/launch-strategy.md),
not keyword-volume research. No traffic or ranking forecast is implied.

The articles should be useful before someone chooses an app. Each includes
concrete planning steps, an example, or a message readers can adapt. Product
references explain a relevant part of Gatherory and link to the iPhone page;
the shared article CTA leads to the public TestFlight invitation.

## Pages added

| URL | Reader’s task | Distinct practical material |
| --- | --- | --- |
| `/birthday-dinner-planning-checklist` | Organize a birthday meal | Cost categories, host jobs, and a sample evening timeline |
| `/surprise-birthday-party-checklist` | Coordinate a welcome surprise | Arrival instructions, a guest message, and fallback plans |
| `/dinner-party-planning-checklist` | Host friends at home | An eight-person menu example and preparation sequence |
| `/potluck-planning-checklist` | Coordinate contributions | A dish-and-serving-gear table and copyable guest note |
| `/friendsgiving-planning-checklist` | Fit a shared meal around friends’ schedules | A twelve-guest example, contribution choices, and cleanup planning |
| `/how-to-split-party-planning-tasks` | Divide co-host responsibilities | A three-person ownership table, handoffs, and check-in script |

## Discovery and implementation

- `/resources` groups all fourteen guides into occasions, shared planning,
  getting started, and choosing tools. Every article must declare a category in
  the content schema. The birthday dinner checklist is the first featured guide.
- The existing general event checklist links to all six new pages. Related
  article links connect the guides to each other and to product instructions.
- Each article uses the existing static content route, unique title and
  description, canonical URL, Article metadata, table of contents, and beta CTA.
  The sitemap integration includes the six new URLs at build time.
- Existing product articles now use Manage and Event Settings where applicable.
  Comparison articles describe TestFlight availability separately from an App
  Store release; their competitor sections were not researched again in this batch.
- The new articles are English. The resource introduction and Spanish navigation
  disclose that guides are currently in English; no Spanish article URLs or
  translation alternates are invented.

## Guide imagery and maintenance

All fourteen guides now have a lead image and an image within the article.
Birthday dinners, surprise birthdays, dinner parties, potlucks, Friendsgiving,
and shared hosting each have two distinct stock photos. The product guides use
the existing native captures, with captions identifying fictional example data.
The Guides page includes matching thumbnails. Phone captures keep their full
aspect ratio and device outline; a regular iPhone has the shared camera cutout,
while an open Duo has no invented centered notch.

`heroAsset` is validated against the central guide registry. Article metadata
uses that same image for social previews. CDN photo sources, crops, and credits
are recorded in [the photo source map](marketing-assets/seo-photo-sources.md).
These are replaceable prototype photos rather than customer photographs.

[The UI asset map](marketing-assets/asset-maintenance.md) connects screenshot
uses to native screen code, shared UI, and fixture inputs. `pnpm assets:report`
marks affected assets and lists their routes. The static build refreshes this
report; it does not recapture or acknowledge images automatically.

The image pass passed the content, legal, and asset-checker tests. All twenty-two
routes build. Browser checks covered photo and product heroes, the image-led hub,
and 320px/390px layouts without page overflow. The co-host hero was visually
reviewed after replacing the earlier office photo with people preparing a meal.
The eight existing native captures retain an unreviewed initial dependency
baseline; matching file hashes alone do not verify current UI fidelity.

Image-pass review captures:

- [Birthday dinner](marketing-assets/previews/seo-birthday-illustrated-desktop.jpg)
- [Dinner party](marketing-assets/previews/seo-dinner-illustrated-desktop.jpg)
- [Shared hosting](marketing-assets/previews/seo-cohost-illustrated-desktop.jpg)
- [Guide hub](marketing-assets/previews/seo-illustrated-hub-desktop.jpg)
- [Distinct occasion photos](marketing-assets/previews/seo-occasion-image-variety-desktop.jpg)
- [Framed product guide](marketing-assets/previews/seo-product-illustrated-desktop.jpg)
- [Mobile potluck guide](marketing-assets/previews/seo-potluck-illustrated-mobile.jpg)

The guidance follows [Google’s helpful content documentation](https://developers.google.com/search/docs/fundamentals/creating-helpful-content):
serve an identifiable audience with useful original material. Content is stored
in the existing [Astro content collection](https://docs.astro.build/en/guides/content-collections/).

## Verification and release follow-up

Content checks validate unique slugs, related articles, and local links. The
production build validates the schema and renders all routes. Review the hub,
an article, and an article table on desktop and mobile before deployment.

This batch passed the content and legal checks and built all twenty-two site
routes. Generated-page checks verified all fourteen guides' canonical URLs,
descriptions, single main headings, Article metadata, unique IDs, local links,
beta CTAs, hub links, and sitemap inclusion. The hub and a birthday article were
reviewed in the browser; at 320px, tables scroll within the article and the page
has no horizontal overflow.

Saved review images:

- [Occasion guide hub](marketing-assets/previews/seo-guides-desktop.jpg)
- [Birthday article](marketing-assets/previews/seo-birthday-guide-desktop.jpg)
- [Small-screen checklist table](marketing-assets/previews/seo-birthday-checklist-mobile.jpg)

After deployment, submit or inspect the sitemap in Search Console and check
that the six URLs can be indexed. Review actual search queries, impressions,
clicks, and beta referrals before choosing the next batch. Those account and
analytics actions have not been performed here. Do not infer indexation from a
successful local build.

Possible later work: Spanish versions of the strongest guides, small birthday
activity ideas, and a gathering schedule example. Choose the next topic based
on reader questions and observed demand rather than publishing near-duplicates.
