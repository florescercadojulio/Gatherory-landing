# App Store screenshot visual review

Reviewed the current Spanish phone and refreshed Spanish iPad captures at native
resolution, plus the English phone Manage capture for layout comparison. These
are local simulator previews.

## Spanish iPhone

| Capture | Review |
| --- | --- |
| [01 Home](screenshots/es-ES/01-home.jpg) | “Borrador,” “Asistirán 6 personas,” and “Faltan 23 días” render in Spanish and fit. The Draft state is intentional fixture lifecycle data and remains unchanged. Event title and location are fixture content. |
| [02 Ideas](screenshots/es-ES/02-ideas.jpg) | Category names, contributor bylines, playlist count/status, and “Todas las ideas” render in Spanish. “3 canciones · Lista compartida” wraps cleanly; visible card titles and metadata fit. Contributor names remain authored sample content. |
| [03 Decide](screenshots/es-ES/03-decide.jpg) | Category, event title, idea title and description, and price render in Spanish. The complete card, response bar, and navigation fit. Riley Kim has the standard person icon on this surface. |
| [04 Manage](screenshots/es-ES/04-manage.jpg) | RSVP legend labels are fully Spanish and untruncated. Budget, collaborator approval, guest count, quick approval, task heading, and task title fit. The floating event selector covers part of the next task’s due-date line. A 15 px scroll did not move the content; a 25 px scroll exposed the date but clipped the budget heading and ring, so the current full-dashboard framing is retained with the due-date overlap noted. |
| [05 Invitation](screenshots/es-ES/05-invitation.jpg) | The capture shows the intended “Bebidas y reencuentros” RSVP invitation. Event title, date, location, and all three RSVP choices render in Spanish and fit. No English app labels or clipping observed in the visible phone layout. |

## Spanish iPad

| Capture | Review |
| --- | --- |
| [01 Home](screenshots/iPad13/es-ES/01-home.jpg) | Event titles, attendee counts, date/location, “Planificación y visitas,” “Borrador,” and the 23-day countdown render in Spanish. Content fits. The Draft badge is intentional fixture lifecycle data. System status chrome and the product name are outside app localization. |
| [02 Ideas](screenshots/iPad13/es-ES/02-ideas.jpg) | All six visible cards show Spanish categories, playlist count/status, contributor labels, and the “Todas las ideas” scope picker. Text fits; the open space below the compact card grid is layout whitespace, not clipped content. |
| [03 Decide](screenshots/iPad13/es-ES/03-decide.jpg) | Event selector, category, title, description, price, and contributor row fit and render in Spanish where applicable. No clipping observed. |
| [04 Manage](screenshots/iPad13/es-ES/04-manage.jpg) | Dashboard headings, RSVP counts/legend, collaborator approval, task heading and due date, and update content fit. The task due date is fully visible; the phone-only selector overlap does not occur here. |
| [05 Invitation](screenshots/iPad13/es-ES/05-invitation.jpg) | The intended RSVP invitation is present. “Quién viene,” “Asistirán 6 personas,” “Otro,” and “Aprobado” now render in Spanish. Event details, RSVP choices, guest summary, and update card fit without clipping. |

The [English iPhone Manage capture](screenshots/en-US/04-manage.jpg) shows the
full due-date line above the event selector, confirming the selector obscures
part of that line only in the reviewed Spanish phone framing. The Spanish phone
Home, Ideas, Decide, and Invitation captures show no clipping in their reviewed
content; only the Manage due-date overlap remains as a framing caveat.

The Draft/Borrador badge is intentionally preserved and is not a localization
failure or a requested lifecycle change. The older Share Invitation
link-management frame is superseded and is not part of this review. System
chrome, brand names, user-authored names, and fixture-authored event/idea copy
are not treated as localization failures.
