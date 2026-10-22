# Gatherory screenshot capture report

Captured 2026-10-22 11:32 UTC. These are local working-tree preview captures, not final App Store exports. No screenshots were uploaded, and no App Store Connect build was selected for this pass.

## Provenance

- Source checkout: `/Users/nexus/Documents/gatherory/ios-apps/gatherory`
- Native Git branch and HEAD: `feat/rc-1`, `9190bc3da97a57bcf7bc8a3794a287edbfa0e70f`
- The native checkout had 81 changed/untracked entries when inspected. The app was built from that working tree; the screenshots cannot be attributed to the commit alone. Native source was not edited for this capture task.
- Build: Xcode 27.1 (build 27A9275), `Gatherory` scheme, `Debug`, version `1.0` / build `4`, derived data at `/tmp/gatherory-screenshot-preview`.
- Built app: `/tmp/gatherory-screenshot-preview/Build/Products/Debug-iphonesimulator/Gatherory.app`, bundle ID `com.guide-systems.gatherory`.
- The selected developer directory is `/Applications/Xcode.app/Contents/Developer`. `Simulator.app` was absent from that directory, so app interaction used Apple Device Hub with the booted simulators, and image capture used `xcrun simctl io … screenshot`.
- Launch arguments: `-DisableProductionFlowSimulation -UseEphemeralDataStore -SeedDevelopmentData -SkipAuthentication -UseBirthdayMarketingFixture`, with `-AppleLanguages '(en)' -AppleLocale en_US` or `-AppleLanguages '(es)' -AppleLocale es_ES`. `-DisableProductionFlowSimulation` was required because the Debug xcconfig otherwise displayed the production-auth recovery screen.
- The marketing fixture is a fictional sample loaded into the ephemeral development store for this app process; no persistent database was reset or modified. Screenshots are direct simulator captures of the real app UI. They were converted from simulator PNG output to opaque JPEG at quality 94; no compositing or pixel edits were performed.

Relevant source fingerprints (SHA-256 of the files used from the working tree):

- `Gatherory/Features/Home/HomeView.swift`: `d898486707753eab4d1102330e469db6de44242449386431a92538a81dafe8fc`
- `Gatherory/Features/Ideas/IdeasView.swift`: `51424b9e36b4b182275921f3daa573d0cc7806da33fdad88a5941266cf0588a1`
- `Gatherory/Features/Manage/ManageView.swift`: `135635163947a4709fce3872c53831fdd616a41bb765c16b93ade5220bba5247`
- `Gatherory/Features/Events/NativeInvitationView.swift`: `534de21c0d1481ccf6d5c59802a3ac04ca65f3f582b7553b5303b8c0faddf9ac`
- `Gatherory/DesignSystem/Components/EventReadingPresentation.swift`: `1c682542104e93b462403247ae1dee9b85f7caa32be599a23c5b592fa68b81e1`
- `Gatherory/DesignSystem/Theme/AppTheme.swift`: `9334ee50a4b90f53a811060cc07085d8d7b7f9edba532c0a349399c2295736ad`
- `Gatherory/Localizable.xcstrings`: `ed7209eac91c99dc40f22d4a5449fa03c3607e67691d4981e279f2a83d204444`
- `Gatherory/App/BirthdayMarketingFixtures.swift`: `07783b9d89288c46369acc9dcb2640a6ab44237c52a9a0547ddc30951d957c26`
- `Gatherory/App/WorkspaceLibrary.swift`: `8bfc1c66484d4d8a781193e2bfeb316cf66d4ef7849f87fb3fa1c25973fcd942`
- `Gatherory/ContentView.swift`: `39b38fa23ebf47a5dedb26bc0605cd2026f4471d36341ef8f12e40b8dfbadd2d`
- `Gatherory/Features/Decisions/DecisionDeckView.swift`: `4268059debab4f0ac56adcc3053e1b136a81281d158dbbb7d4f3efe72250fc74`

## Capture manifest

Each locale has the same five storyboard positions: `01-home.jpg`, `02-ideas.jpg`, `03-decide.jpg`, `04-manage.jpg`, and `05-invitation.jpg`.

| Folder | Device / OS | Locale | Count | Dimensions | Format |
| --- | --- | --- | ---: | --- | --- |
| `en-US/` | iPhone 18 Pro, iOS 27.0 | English | 5 | 1206 × 2622 | opaque JPEG |
| `es-ES/` | iPhone 18 Pro, iOS 27.0 | Spanish UI | 5 | 1206 × 2622 | opaque JPEG |
| `iPad13/en-US/` | iPad Pro 13-inch (M5), iPadOS 27.0 | English | 5 | 2064 × 2752 | opaque JPEG |
| `iPad13/es-ES/` | iPad Pro 13-inch (M5), iPadOS 27.0 | Spanish UI | 5 | 2064 × 2752 | opaque JPEG |

All 20 image files were checked with `sips` for their listed dimensions and JPEG format. The iPhone size matches the regular Dynamic Island slot; the iPad size matches the 13-inch portrait slot. These folders contain only local preview captures.

## Visible qualifications

Spanish localization applies to much of the interface, but the fixture’s event names, idea titles, descriptions, people, and task/update text remain English. A few status and summary labels also remain English in Spanish screenshots (including “Draft,” “Approved,” “people going,” and the countdown phrasing). Treat `es-ES` as a Spanish-interface preview with English fixture content, not a fully localized store set.

The current fixture Home event carries a Draft badge. Ideas includes an empty shared-playlist row (`0 songs`). The Spanish Manage guest RSVP legend clips at the available width. The invitation includes an unset weather/location area. In Decide, the author row displays the app’s standard person icon for Riley Kim rather than a profile portrait; the source view uses `person.crop.circle.fill` for this row. These are visible properties of the captured UI and were not altered.

The capture is from a Debug working-tree build with fixture/auth launch flags, not the selected release build. Before treating any file as final store media, recapture and review from the selected release build and final localization data, and resolve or explicitly accept the visible qualifications above. No App Store Connect upload, submission, release, or tester notification occurred.
