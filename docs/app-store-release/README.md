# Gatherory release content draft

Prepared October 21, 2026; saved to App Store Connect on October 22, 2026.
Gatherory (Apple ID `6820635528`) remains at **1.0 — Prepare for Submission**.
English (U.S.) and Spanish (Spain) subtitles, promotional text, descriptions,
and keywords are saved as drafts. No build or screenshot was uploaded, and no
review or release was started. Nothing was pushed to Git.

## Copy prepared

- [Readable listing copy and field counts](listing-copy.md).
- [English listing](en-US.json): name, subtitle, promotional text, description,
  and search keywords.
- [Spanish listing](es-ES.json): the same fields; Spanish (Spain) was added as
  a localization. Both localized app names remain Gatherory.
- [Review notes](review-notes-draft.txt): a proposed walkthrough, separate from
  credentials and review contact information.
- [Screenshot storyboard](screenshot-storyboard.md): ordered English/Spanish
  headlines, existing native reference captures, and capture/export work.

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

Continue saving only editable draft metadata for the version in preparation.
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

## Remaining preparation

- No build is selected for version 1.0. Local release notes describe build 4;
  that historical checkpoint is not a selection or validation of a release build.
- Prepare current English and Spanish screenshots using the storyboard;
  validate them against the intended release build and export without alpha.
- The header asset slot inspected in both locales is empty. No creative assets
  were uploaded during this pass.
- Marketing URL candidate: `https://gatherory.com/`. Privacy URL candidate:
  `https://gatherory.com/privacy`. Confirm them from a signed-out browser before
  saving. This pass has not verified the live pages. Marketing URL and Copyright
  were empty in App Store Connect and were left empty.
- Support URL is empty. There is no `/support` route in the current landing
  source, and the public URL could not be verified through the web tool. Do not
  substitute an invented mailbox or an unavailable support page.
- Review sign-in is required, but the username, password, contact fields, and
  Notes were empty and remain untouched. Prepare verified review access and
  contact information separately.
- Category, content rights, and age ratings still show setup controls in App
  Information. Complete the appropriate declarations in a later release pass;
  no compliance or privacy settings were changed here.
- Review note steps and screenshots must match the intended build and actual
  App Review fixture. Never store real credentials in this folder.

Public listing copy and review notes serve different purposes. Do not paste
the draft checklist or unresolved preparation notes into the marketing fields.
