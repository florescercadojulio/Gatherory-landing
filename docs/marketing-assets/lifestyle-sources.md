# Prototype lifestyle imagery

Recorded October 21, 2026. This describes the initial two-photo pass. The
[current image-variety manifest](image-variety-manifest.json) and
[source notes](image-variety-sources.md) supersede those original placements.
The dinner photo now belongs to the decor idea only; the picnic photo is no
longer used by the current native fixture or site.

Initial pass: These temporary images illustrate the birthday-dinner
use case. They are stock photography, not customers or testimonials. Replace
them with approved original content as launch assets become available.

## Dinner gathering

- Photographer: Andrii Solok.
- [Source photo: friends around a table with food and candles](https://unsplash.com/photos/friends-gathered-around-a-table-with-food-and-candles-YfidYnwtXok).
- CDN image: `https://images.unsplash.com/photo-1771837602933-c1cc6293702b`.
- Used behind the homepage and iPhone hero screenshots and bundled in the
  isolated native birthday fixture for coherent event artwork.

## Birthday gathering

- Photographer: Vitaly Gariev.
- [Source photo: friends celebrating a birthday with cake in a park](https://unsplash.com/photos/friends-celebrating-a-birthday-with-cake-in-park-49AakhDzpoQ).
- CDN image: `https://images.unsplash.com/photo-1758275557508-5caf0d3e89c0`.
- Used in the editorial lifestyle section on the homepage and iPhone page.

Both source pages were checked during implementation and marked free under the
[Unsplash License](https://unsplash.com/license). Website URLs request responsive
image sizes and automatic formats directly from the CDN. The native image is
bundled so simulator captures do not depend on a network request.

## Fictional participant portraits

The illustrative homepage plan and birthday simulator fixture use the same
Alex, Jordan, Maya, and Riley sample portraits as the local database catalog.
The people pictured are not the fictional identities assigned to the fixtures.

The full eight-account URL catalog is maintained in the web/server repository at
`src/db/seeds/development-profile-images.ts`; local application and replacement
instructions are in [development seed documentation](../../../gatherory-web-app/docs/development/development-seed.md).
The database update fills missing fixture pictures and preserves custom photos.

English and Spanish marketing pages share these images. Screenshot content is
currently in English; this is a prototype rather than a finished localized
campaign asset set.
