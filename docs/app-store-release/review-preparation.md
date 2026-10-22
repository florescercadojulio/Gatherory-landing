# App Review preparation

This record supports the reviewer notes in `review-notes-draft.txt`. It is a
local preparation record. App Store metadata and TestFlight build status were
inspected separately; this is not confirmation that review credentials,
production flows, or a physical device have been checked.

## Release checkpoint

- The native release handoff records TestFlight build **1.0 (4)** as archived
  from source commit `c766f14c` plus a build-number increment on October 21,
  2026. It records successful upload and processing and testing for the existing
  Friends & Family groups. This establishes a TestFlight checkpoint, not public
  App Store approval or current production readiness.
- The October 21 mobile V1 audit identifies a later native and web/server source
  checkpoint, plus local audit fixes. It explicitly records that it is not
  evidence of a deployed backend or a release build. Physical guest/account
  recovery, invitation handoff, production sync/media, and related device checks
  remain release gates in that audit.
- The build 4 checkpoint's `ContentView.swift` provides Home, Ideas, Decide, and
  Manage planning tabs. Its archived source does not include the later
  `BirthdayMarketingFixtures.swift` found in the current native working tree.
  Do not promise that build 4 opens a preloaded wedding or birthday fixture.
- The October 21 release handoff documents app invitation and RSVP behavior,
  but requires current account, service, and physical-device verification. Keep
  the walkthrough's account and event references generic until the actual
  App Review account has been checked against the intended build and backend.

## Checks to resolve outside the reviewer notes

- Confirm that the App Review account is active, can sign in without staff
  intervention, and has a usable event in the workspace with the build intended
  for submission. Enter credentials only in App Store Connect and the team's
  approved credential store.
- Confirm the intended production backend revision and required migrations,
  then exercise planning sync and guest invitation/RSVP from the candidate on
  physical devices. The source audit and TestFlight build record do not establish
  that the current production backend supports these paths.
- Confirm the role used for review can inspect the Manage sections named in the
  walkthrough and sees **Share Invitation** on Home. Remove any unavailable path
  from the notes if the actual account does not expose it.
- If reviewers should test guest RSVP as well as invitation options, provide a
  usable invitation URL in App Review Notes and verify it on the candidate
  build. The current notes explain the guest boundary but do not include a URL.
- Verify current support contact, privacy disclosures, and all App Store
  Connect metadata against the submission version.

## Listing claims to revalidate

The current en-US and es-ES listing drafts say that local offline edits sync
after reconnecting, and describe shared planning, guest responses, and event
collaboration. These behaviors are represented in source, but the October 21
release audit still requires production rollout and physical-device checks for
sync, account isolation, guest RSVP, and collaboration. The listing JSON files
were not changed as part of this review-note pass. Do not treat source code,
automated tests, or a TestFlight upload as proof that those production flows
work for App Review.

## Source references

- Native release handoff: `../../../ios-apps/gatherory/docs/app-store-release.md`,
  **TestFlight build 4 — October 21, 2026** and **Current mobile V1 checkpoint —
  October 21, 2026**.
- Mobile audit: `../../../gatherory-web-app/docs/release/mobile-v1-guest-invitation-audit.md`,
  **V1 behavior** and **Remaining V1 release blockers**.
- Build 4 source checkpoint: native commit `c766f14c`, particularly
  `Gatherory/ContentView.swift` and `Gatherory/App/WorkspaceLibrary.swift`.
- Listing copy: `en-US.json` and `es-ES.json` in this directory.
