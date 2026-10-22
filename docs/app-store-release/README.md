# Gatherory release content draft

Prepared October 21, 2026; saved to App Store Connect on October 22, 2026.
Gatherory (Apple ID `6820635528`) remains at **1.0 — Prepare for Submission**.
English (U.S.) and Spanish (Spain) subtitles, promotional text, descriptions,
and keywords are saved as drafts. Marketing, support, and privacy policy URLs,
copyright, and reviewer walkthrough notes were added in the next preparation
pass. No build or screenshot was uploaded, and no review or release was
started. Nothing was pushed to Git.

## Copy prepared

- [Readable listing copy and field counts](listing-copy.md).
- [English listing](en-US.json): name, subtitle, promotional text, description,
  and search keywords.
- [Spanish listing](es-ES.json): the same fields; Spanish (Spain) was added as
  a localization. Both localized app names remain Gatherory.
- [Review notes](review-notes-draft.txt): a proposed walkthrough, separate from
  credentials and review contact information; saved in the draft Notes field.
- [Review preparation](review-preparation.md): release build, account, role,
  backend, and physical-device checks required before using the walkthrough.
- [Public URL verification](url-verification.md): reachable listing destinations
  and the unpublished support page.
- [Screenshot storyboard](screenshot-storyboard.md): ordered English/Spanish
  headlines, existing native reference captures, and capture/export work.
- [Screenshot review gallery](screenshot-review.html): twenty iPhone and
  13-inch iPad previews in English and Spanish, recaptured after the Spanish
  copy and layout fixes using an isolated local build with fictional data.
  These are preparation assets, not release-build proof.
- [Capture report](screenshots/screenshot-capture-report.md): build provenance,
  launch flags, device sizes, source fingerprints, and visible qualifications.
- [Screenshot visual review](screenshot-visual-review.md): checks of the
  localized text, playlist content, guest legend, and remaining framing limits.
- [Isolated build notes](capture-build-notes.txt): temporary build-only changes,
  exact source fingerprints, and the simulator binary used for these captures.

The positioning follows the launch strategy: people co-hosting birthdays,
dinners, and celebrations. Copy describes shared ideas, personal preferences,
tasks, costs, invitations, and offline work. It does not promise Android,
browser RSVP, automatic decisions, reliable push delivery, payment processing,
or a permanent free collaboration offer.

## Draft field limits

The JSON strings are checked for Apple’s documented limits: name and subtitle
30 characters, promotional text 170 characters, description 4,000 characters,
keywords 100 UTF-8 bytes. Keywords omit the app/company names and other brands.
There is no What’s New text: Apple does not offer that field for a first version.

References: [app information](https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/),
[version information](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/),
and [screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/).

## App Store Connect editing boundary

The October 22 Spanish polish and recapture pass is entirely local. It makes
no further App Store Connect edits, uploads, build selections, or submissions.
For any separately authorized metadata preparation, save only editable draft
metadata for the version in preparation.
Preserve review credentials, review contacts, and any existing approved
material. Do not change promotional text on an already released version, since
a saved change can affect its live listing.

No build selection, new version, category change, pricing/availability change,
privacy declaration, age rating, encryption answer, tester notification, review
submission, agreement acceptance, or release action is part of this content pass.
Keep the user’s no-push instruction in effect. The existing automatic-release
selection was left unchanged; this version must not be submitted as part of
this preparation pass.

## Saved draft verification

- App Information showed **Saved** for both subtitle edits: English,
  “Plan celebrations together”; Spanish, “Planea celebraciones en grupo”.
- After navigating away and returning to version 1.0, both languages retained
  their promotional text, full description, and keywords. Save was disabled
  with no pending edits.
- English remains the primary language. Only Spanish (Spain) was added.
- [Saved Spanish subtitle](asc-spanish-subtitle-draft.png) and
  [persisted Spanish listing](asc-spanish-listing-draft.png) document the state.
- Both locales have Marketing URL `https://gatherory.com/`, Support URL
  `https://gatherory.com/terms#contact`, and Privacy Policy URL
  `https://gatherory.com/privacy`. The public pages were verified without a
  session. The privacy policy link was saved for the next version; no privacy
  questionnaire answers were entered and Publish was not used.
- Copyright is `2026 Guide Systems LLC`. The reviewer walkthrough is saved;
  credentials and review contact fields remain empty. The walkthrough remains
  subject to actual account, candidate-build, and production verification.
- [Release details screenshot](asc-release-details-draft.png) shows the saved
  URLs, copyright, and version status.

## Remaining preparation

- No build is selected for version 1.0. On October 22, a read-only TestFlight
  inspection confirmed build 1.0 (4) is listed as Testing. That status is not
  selection for submission or validation of the production guest/sync flows.
- The ten recaptured iPhone previews are opaque JPEGs at 1206 × 2622, matching the
  medium Dynamic Island slot inspected in App Store Connect. They came from a
  isolated simulator build, not TestFlight build 4. Generated Spanish labels,
  fictional event/idea/task copy, playlist metadata, and the guest legend have
  been corrected. The isolated build passed 13 focused tests and verification
  of 1,577 English/Spanish catalog strings. See the visual review for framing
  qualifications, then validate against the intended release build before upload.
- Ten additional iPad previews use the accepted 13-inch portrait dimensions,
  2064 × 2752. These use the same isolated build and localized example content.
  The existing Duo originals remain references; no fresh Duo set was captured
  in this preparation pass.
- The header asset slot inspected in both locales is empty. No creative assets
  were uploaded during this pass.
- A dedicated `/support` page is prepared locally. The user confirmed
  `info@gatherory.com` for app help; `legal@gatherory.com` remains the legal and
  privacy contact. Publish the support page in a separately authorized release,
  verify it publicly, then replace both locales' temporary Terms contact URL
  with `https://gatherory.com/support`. The live `/support` path returned 404
  during verification; it is not the saved App Store Support URL.
- Review sign-in is required, but username, password, and contact fields remain
  empty. Prepare verified review access and contact information separately.
- Category, content rights, and age ratings still show setup controls in App
  Information. Complete the appropriate declarations in a later release pass;
  no compliance or privacy settings were changed here.
- Review note steps and screenshots must match the intended build and actual
  App Review fixture. Never store real credentials in this folder.

Public listing copy and review notes serve different purposes. Do not paste
the draft checklist or unresolved preparation notes into the marketing fields.
