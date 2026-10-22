# Gatherory screenshot capture report

Updated 2026-10-22 13:24 UTC. This folder contains local simulator preview captures for release preparation. They are Debug working-tree previews, not final App Store exports. No screenshot was uploaded, and no build was selected in App Store Connect for this capture pass.

## Provenance

- Source checkout: `/Users/nexus/Documents/gatherory/ios-apps/gatherory`, branch `feat/rc-1`, HEAD `9190bc3da97a57bcf7bc8a3794a287edbfa0e70f` when inspected. The checkout had 99 changed or untracked entries at that check. The Spanish UI and fixture updates were made by the parent release-preparation work; this screenshot task did not edit native source.
- The app was built from an isolated copy of the native working tree at `/tmp/gatherory-spanish-capture-source` with derived data at `/tmp/gatherory-spanish-capture-build`. The snapshot has no Git metadata, so the listed SHA-256 values identify the source files directly. The app bundle uses bundle ID `com.guide-systems.gatherory`, version `1.0` / build `4`.
- The first 16 images (the Home, Ideas, Decide, and Manage frames for both devices and locales) came from the initial isolated Debug build. All four `05-invitation.jpg` files were recaptured from the RSVP Spanish localization follow-up build. The follow-up build’s `Gatherory.debug.dylib` SHA-256 is `4ac5a5f6ccc66a66b7888d86eaf3f3fa9cf814739a1a1d0a5a5e5021b5b8fa54`; its stable app executable hash is `79970b53fd36ad00569d65183a1abc334f19e023c5b81361f90c6904b7aadf5a`.
- The focused suites `SpanishGeneratedCopyTests`, `BirthdayMarketingFixturesTests`, and `LayoutDimensionTests` passed on the follow-up build: 13 passed, 0 failed, 0 skipped. Localization verification passed for 1,577 English and Spanish strings. Detailed commands, result bundles, snapshot-only project wiring, and temporary compile fixes are in [capture-build-notes.txt](../capture-build-notes.txt).
- The app was installed on an iPhone 18 Pro simulator (iOS 27.0, `3A4621C1-A19F-4EDD-A25F-6A1AB7663D6F`) and iPad Pro 13-inch (M5) simulator (iPadOS 27.0, `5CD62559-8A7B-4D65-AC35-000814B15C94`). Navigation used Apple Device Hub; capture used `xcrun simctl io <device> screenshot`. Each simulator PNG was converted to opaque JPEG at quality 94. No compositing, retouching, or pixel edits were applied.
- Launch arguments were `-DisableProductionFlowSimulation -UseEphemeralDataStore -SeedDevelopmentData -SkipAuthentication -UseBirthdayMarketingFixture`, with `-AppleLanguages '(en)' -AppleLocale en_US` or `-AppleLanguages '(es)' -AppleLocale es_ES`. The fictional marketing fixture used the ephemeral development store; no persistent database was reset or modified. For `05-invitation`, navigation opened the existing child-event RSVP view (`Drinks & catch-ups` / `Bebidas y reencuentros`); no RSVP choice was changed and no invite link was created.

Relevant UI/source fingerprints (SHA-256 from the isolated snapshot used for these captures):

- `Gatherory/Features/Home/HomeView.swift`: `0708a2e1484b45365ec2eab74fb115c6b7faa7fe2273280462018cdd27655931`
- `Gatherory/Features/Ideas/IdeasView.swift`: `8a93e23650f77501bc264e0a9480bf6f9d4e582e9bf96b67a5971ee31f101f08`
- `Gatherory/Features/Manage/ManageView.swift`: `135635163947a4709fce3872c53831fdd616a41bb765c16b93ade5220bba5247`
- `Gatherory/Features/Manage/ManagePeoplePill.swift`: `a9530af6e7547b0f6cf4fc913dcee749829ef4e5b5a831c0f19f3190295eb725`
- `Gatherory/Features/Events/EventInvitationScreen.swift`: `a5e76e06f59d29152ba6c73e62fe0158678710b959d3c0ff0507f02e6081e584`
- `Gatherory/Features/Events/NativeInvitationView.swift`: `534de21c0d1481ccf6d5c59802a3ac04ca65f3f582b7553b5303b8c0faddf9ac`
- `Gatherory/Models/PlanningModels.swift`: `07ef365af54a34bc8d1142a1ed6177ff1c96c89d3f94161a51018a18635245f1`
- `Gatherory/DesignSystem/Components/EventReadingPresentation.swift`: `1c682542104e93b462403247ae1dee9b85f7caa32be599a23c5b592fa68b81e1`
- `Gatherory/DesignSystem/Theme/AppTheme.swift`: `9334ee50a4b90f53a811060cc07085d8d7b7f9edba532c0a349399c2295736ad`
- `Gatherory/Localizable.xcstrings`: `2b41e14cc0bff48ca3b5f9400bdb306c4448eb25933ef7bfa4d92aa7928d5797`
- `Gatherory/Localization/AppCopy.swift`: `2e53c57550e9a693c47c1765babc2663e1e785f274f13b9a726d89ecebe61b30`
- `Gatherory/App/BirthdayMarketingFixtures.swift`: `5f600ace96a3120c62c8ba1c9424a353234de95fac3464a00893ae4d0269830c`
- `Gatherory/App/WorkspaceLibrary.swift`: `8bfc1c66484d4d8a781193e2bfeb316cf66d4ef7849f87fb3fa1c25973fcd942`
- `Gatherory/ContentView.swift`: `39b38fa23ebf47a5dedb26bc0605cd2026f4471d36341ef8f12e40b8dfbadd2d`
- `Gatherory/Features/Decisions/DecisionDeckView.swift`: `4268059debab4f0ac56adcc3053e1b136a81281d158dbbb7d4f3efe72250fc74`

## Capture manifest

Each device and locale contains the five storyboard positions: `01-home.jpg`, `02-ideas.jpg`, `03-decide.jpg`, `04-manage.jpg`, and `05-invitation.jpg`.

| Folder | Device / OS | Locale | Count | Dimensions | Format |
| --- | --- | --- | ---: | --- | --- |
| `en-US/` | iPhone 18 Pro, iOS 27.0 | English | 5 | 1206 × 2622 | opaque JPEG |
| `es-ES/` | iPhone 18 Pro, iOS 27.0 | Spanish UI and fixture titles | 5 | 1206 × 2622 | opaque JPEG |
| `iPad13/en-US/` | iPad Pro 13-inch (M5), iPadOS 27.0 | English | 5 | 2064 × 2752 | opaque JPEG |
| `iPad13/es-ES/` | iPad Pro 13-inch (M5), iPadOS 27.0 | Spanish UI and fixture titles | 5 | 2064 × 2752 | opaque JPEG |

All 20 files were checked with `sips`; dimensions and JPEG format match the listed slots. The iPhone images match the regular Dynamic Island slot, and the iPad images match the 13-inch portrait slot. The native RSVP frames show the three RSVP choices for the existing child event in each language.

## Visible qualifications

These are local Debug previews rather than release-build exports. The Spanish fixture uses localized event, idea, task, and update content. This pass reviews the captured frames, not every screen in the app; the invitation’s unmapped-location weather prompt below the captured RSVP content still uses English (“Add a mapped location to see weather here.”). The main Home event intentionally carries a `Borrador` / `Draft` badge. On the iPhone Spanish Manage frame, the floating event selector overlaps the task due-date caption. A small swipe that reveals the full due date also moves the Budget heading/ring partly offscreen, so the original framing was kept. The Decide author row uses the standard person icon by design.

Review these previews before promotion. For final store media, recapture and review from the selected release build and final localization data, and resolve or explicitly accept the visible qualifications. No App Store Connect upload, submission, release, or tester notification occurred.
