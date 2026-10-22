# Release screenshot storyboard

Draft, October 21, 2026; capture preparation updated October 22. Nothing uploaded.
Fresh working-tree previews are in the [review gallery](screenshot-review.html);
see the [visual review](screenshot-visual-review.md) before final export.
Existing marketing captures below remain visual references, not newly verified
release screenshots. See the [asset report](../marketing-assets/asset-status.md)
and [capture map](../marketing-assets/asset-maintenance.md) before refreshing them.

## iPhone sequence

| Order | English headline | Spanish headline | Native reference | What the image must show |
| --- | --- | --- | --- | --- |
| 1 | Plan the celebration together. | Organicen la celebración juntos. | `../marketing-assets/ios-originals/home.png` | Birthday dinner event, its identity, artwork, and example attendees |
| 2 | A picture for every idea. | Una imagen para cada idea. | `../marketing-assets/ios-originals/ideas.png` | Distinct photos for different birthday dinner ideas |
| 3 | Give everyone a say. | Dale voz a cada persona. | `../marketing-assets/ios-originals/decide.png` | One complete idea and the group preference bar; no implication of automatic approval |
| 4 | Keep the whole plan in view. | Ten el plan completo a la vista. | `../marketing-assets/ios-originals/manage.png` | Budget, RSVP distribution, pictured collaborators, pending approvals, and a next task |
| 5 | Share the details that matter. | Comparte los detalles importantes. | `../marketing-assets/ios-originals/events.png` | Drinks & catch-ups invitation and native RSVP choices |

Keep the first three images focused on the host’s planning experience. Use actual
app screens and fictional example content. Do not use stock lifestyle photos in
place of app screenshots or present seed data as customer activity. Keep the
budget and native controls visible; avoid stretching the captures.

The regular originals are 1206 × 2622. That is listed in Apple’s accepted
medium Dynamic Island dimensions. Their PNG files currently contain an alpha
channel, so they must be exported without alpha before App Store upload.
Do not upload these reference files unchanged.

## iPhone Duo adaptation

Use the existing Duo Ideas, Decide, and Manage originals as separate layout
references. Ideas and Decide are 2853 × 2007; Manage is 2007 × 2853. Keep the
complete adaptive layout, preserve the native ratio, and avoid adding a centered
notch to the open screen. These dimensions are listed for the Duo inner display.
The current PNG originals also need an export without alpha.

## Remaining capture work

- Verify screens against the build chosen in App Store Connect, rather than the
  latest uncommitted native source. Recapture changed screens after that check.
- Spanish UI previews are captured alongside English. Resolve untranslated
  generated text and the clipped guest legend before final Spanish exports.
  A translated headline does not make English app UI a localized capture.
- The project currently targets device families 1 and 2. Confirm the intended
  iPad support. A fresh 13-inch iPad preview set is now in
  `screenshots/iPad13/`; it shares the working-tree and localization
  qualifications documented in the capture report.
- The live App Store Connect slots were inspected on October 22. The regular
  iPhone slot accepts 1206 × 2622; Duo accepts 2853 × 2007 / 2007 × 2853;
  the iPad 13-inch slot accepts 2064 × 2752. Match the intended device, do not
  relabel an iPhone capture as iPad, and verify final files during upload later.

Source: [Apple screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/),
reviewed October 21, 2026. These notes prepare the assets; they do not record an
upload or final screenshot acceptance.
