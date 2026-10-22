# App Store screenshot visual review

Visual review of twenty JPEG previews in `screenshots/`: ten iPhone captures at
1206 × 2622 and ten 13-inch iPad captures at 2064 × 2752, inspected at native
resolution on October 22, 2026. These are local working-tree captures. This
review does not establish that they came from the build selected for App Store
review, or that Apple has accepted them.

## Changes before final marketing export

These are visual and messaging recommendations for this launch, not findings
that Apple rejected the assets or that a draft event cannot contain attendees.
Interface localization and clipping issues need source fixes before recapture;
changing only the screenshot would hide the underlying behavior.

| Priority | Capture | Finding | Next capture should show |
| --- | --- | --- | --- |
| Must recapture | en-US and es-ES `01-home` | The event carries a visible **Draft** badge, despite showing six people going and a populated event. This makes the lead image look unfinished. The countdown also becomes stale as the event date approaches or passes. | A published, upcoming sample event with coherent attendance. Prefer a stable date display or sample date that will remain current for the listing's use. |
| Must recapture | es-ES `01-home` | **Draft** and **23 days away** are English interface strings in the Spanish capture. The date and navigation labels are localized; “Maya’s Birthday Dinner” and “Alex’s place” appear to be sample event content. | After the interface strings are localized, capture Spanish again and confirm all generated status/date text is Spanish. User-authored sample names may remain in their authored language, but a localized fixture would read more cohesively. |
| Must recapture | es-ES `02-ideas` | The playlist card reads **0 songs · Shared...** in English and presents an empty playlist. Most category labels and navigation are Spanish; the playlist name appears to be sample content. | Use a populated playlist or remove it from the visible set; localize the generated song-count/sharing status and recapture. |
| Must recapture | es-ES `04-manage` | The guest legend truncates **No puede asistir** to “No puede asis…”. Other labels fit, but this visible truncation looks broken. | Shorten or reflow the localized legend, then recapture and check the complete label at native size. |
| Must recapture | iPad13 en-US and es-ES `01-home` | A second event card shows **Draft** alongside populated attendance. The Spanish capture also shows the app-provided label **Planning & Scouting** in English. | Use a coherent upcoming sample event for the second card. Localize the generated planning-purpose label before recapturing Spanish. |
| Must recapture | iPad13 en-US and es-ES `02-ideas` | Both captures show an empty **0 songs** playlist. The generated **0 songs · Shared playlist** line remains English in Spanish. The grid occupies only the upper half of the capture, leaving a large blank field below it. | Use a populated playlist, localize its generated status, and add enough varied sample ideas to make the iPad grid feel purposeful across the larger screen. |

The Riley Kim person icon in both `03-decide` captures is the native author icon
shown by `DecisionDeckView`, not a failed portrait fetch. The fixture has a
profile image elsewhere, but this surface intentionally uses its person icon;
this does not require a recapture.

## Capture-by-capture notes

- **01 Home:** The event card and attendees are prominent, all key text fits,
  and the bottom navigation is visible. The draft state is the main issue. The
  Spanish date itself is localized; the relative countdown and draft badge are
  not. The English capture also contains a visible draft badge.
- **02 Ideas:** The masonry cards are readable, varied, and show distinct
  imagery. Neither language has a clipped idea title. The zero-song playlist
  exposes an empty state; Spanish also leaves its generated status line in
  English. English’s “0 songs · Shared…” is likewise visibly incomplete.
- **03 Decide:** Both captures show one complete idea, its description, cost,
  category, and the three-part preference bar without clipping. Spanish UI
  category and tab labels are translated. The English idea title and description
  are sample content, not evidence of untranslated controls. The author row
  uses the native person icon described above.
- **04 Manage:** The budget, guest distribution, pending collaborators, quick
  approval, next task, event selector, and navigation are visible. English copy
  fits. Spanish copy is localized except the sample event and task names; the
  guest legend has the one visible truncation listed above. The bottom event
  selector overlays content behind it, but no key task text is obscured.
- **05 Invitation:** Both versions have clear contrast and complete RSVP
  choices. The invitation title, date, location, tab labels, and response
  controls are localized in Spanish. “Drinks & catch-ups” and “Alex’s place”
  appear to be sample event content. No visible clipping or empty state.

## 13-inch iPad captures

The iPad set has its own wide portrait layout: the tab bar moves to the top and
the Home screen uses a broad event card. These captures are not stretched to fit
the iPhone layout.

- **01 Home:** The hero and date are readable. A second event card displays
  **Draft** and the relative countdown, so it repeats the iPhone sample-state
  concern. Spanish also shows the generated event-purpose label **Planning &
  Scouting** in English. The event title and location are sample content.
- **02 Ideas:** Card titles and images are legible, with no clipped text. The
  empty playlist appears in both locales and its generated count/sharing status
  is not localized in Spanish. The grid sits high on the screen with substantial
  empty white space below; more varied sample cards would use the iPad layout
  better.
- **03 Decide:** The complete idea and group preference bar fit cleanly in both
  locales. The centered card leaves a large white area below, but the feature
  story remains clear and nothing is clipped. The Riley Kim person icon is the
  intentional native author icon, not a missing portrait.
- **04 Manage:** Budget, RSVP distribution, collaborators, quick approval,
  to-dos, and Updates are all visible. The Spanish guest legend fits fully at
  this width. No clipping or empty state stands out.
- **05 Invitation:** Both versions show RSVP choices, attendee summary, event
  schedule, and the calendar action in readable layouts. Spanish interface copy
  is localized; event and announcement text remain sample content. No obvious
  clipping or empty state.

## File and presentation check

The ten iPhone files are 1206 × 2622 JPEGs and the ten iPad files are 2064 ×
2752 JPEGs, all with three color components and no PNG alpha channel. At full
size, the main text is readable and the screenshots have no obvious stretching
or cropping at the screen edges. These checks do not verify App Store Connect's
current display-slot requirements or the source build used for capture.

The companion [local gallery](screenshot-review.html) places the draft
storyboard headline above each English and Spanish iPhone and iPad capture. It
is a review aid, not a public site route or a submission-ready composite
screenshot.
