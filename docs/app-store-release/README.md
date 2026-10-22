# Gatherory release content draft

Prepared October 21, 2026. Local draft only. No App Store Connect fields have
been saved, no build or screenshot has been uploaded, and no review or release
has been started. The existing Safari session is unavailable while the Mac is
locked; an unlock was requested in the chat.

## Copy prepared

- [Readable listing copy and field counts](listing-copy.md).
- [English listing](en-US.json): name, subtitle, promotional text, description,
  and search keywords.
- [Spanish listing](es-ES.json): the same fields. The Spanish wording is a draft;
  confirm the existing App Store Connect locale before adding a localization.
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

After access is restored, inspect Gatherory’s existing version, languages,
content, and screenshots before making changes. Preserve review credentials,
review contacts, and any existing approved material. Save only editable draft
metadata for a version in preparation. Do not change promotional text on an
already released version, since a saved change can affect its live listing.

No build selection, new version, category change, pricing/availability change,
privacy declaration, age rating, encryption answer, tester notification, review
submission, agreement acceptance, or release action is part of this content pass.
Keep the user’s no-push instruction in effect.

## Fields to inspect before saving

- Existing App Store Connect app identity and version. Local release notes
  describe version 1.0 build 4; that is not a live account inspection.
- Existing locales. File names propose en-US and es-ES; use the existing locale
  if the account’s Spanish variant differs.
- Marketing URL candidate: `https://gatherory.com/`. Privacy URL candidate:
  `https://gatherory.com/privacy`. Confirm them from a signed-out browser before
  saving. This pass has not verified the live pages.
- Preserve the existing Support URL until verified. There is no `/support`
  route in the current landing source, and the public URL could not be verified
  through the web tool. Do not substitute an invented mailbox or an unavailable
  support page.
- Review note steps and screenshots must match the intended build and actual
  App Review fixture. Never store real credentials in this folder.

Public listing copy and review notes serve different purposes. Do not paste
the draft checklist or unresolved preparation notes into the marketing fields.
