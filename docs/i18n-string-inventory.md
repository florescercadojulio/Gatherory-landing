# English string inventory for i18n

This inventory covers the public Gatherory landing site, resource hub, SEO articles, and legal pages. It groups strings by purpose and source so they can be extracted into locale-aware content without treating every English sentence as the same kind of translation unit. It does not include the signed-in Gatherory app or the iOS app.

## 1. Shared navigation and actions

**Purpose:** Help visitors move around the site or begin using Gatherory.

**Sources:**

- `src/lib/components/landing/landing-page.svelte` — desktop navigation, hero actions, footer navigation.
- `src/lib/components/mobile-nav.svelte` — mobile menu title and description, four navigation links and their helper text, privacy/terms links, sign-up and sign-in actions.
- `src/pages/resources.astro` — resource-page header and footer.
- `src/layouts/seo-layout.astro` — article header, table-of-contents label, related-guide links, final CTA and footer.
- `src/layouts/legal-layout.astro` — legal-page header, table-of-contents label and footer.

**Examples:** “Product,” “How it works,” “People,” “Guides,” “Sign in,” “Start planning,” “Read the guide,” “On this page,” “Back to top.”

**Notes:** Keep link labels separate from their destinations. Paths such as `/resources`, `/#product`, `/privacy`, and `/terms` are routing data, not translatable copy. External auth URLs in `src/lib/site-links.ts` are integration endpoints, not locale strings.

## 2. Landing-page marketing copy

**Purpose:** Explain the product and give visitors a reason to start planning.

**Sources:**

- `src/lib/components/landing/landing-page.svelte` — hero, three planning principles, people and roles section, decision explanation, closing CTA and footer tagline.
- `src/lib/components/landing/event-canvas.svelte` — illustrative event card and its labels.
- `src/lib/components/landing/decision-deck.svelte` — interactive example ideas, notes, categories, decision states and helper labels.

**String families:**

- Hero headline, supporting paragraph and calls to action.
- Feature/principle headings and explanatory paragraphs.
- Role names and descriptions: host, collaborator and guest.
- Product illustration labels, sample event names/details and participant counts.
- Demo idea titles, notes, descriptions, categories and “saved/passed” states.
- Closing CTA and brand tagline.

**Notes:** The sample event currently includes dates and a Detroit location. Treat those as example content, with date, location and number formatting handled by locale-aware formatting where they represent structured data. Example names such as Alex, Jordan, Maya, Nia and Theo are content values, not UI labels.

## 3. Resource hub copy

**Purpose:** Introduce the guide collection and help visitors choose an article.

**Source:** `src/pages/resources.astro`.

**String families:** Page title and introduction, article-card titles and accents, card summaries, “Read the guide” action, navigation and footer labels, page title/description, and social metadata.

Article-card title and summary values come from the SEO content collection, not from this page’s component markup.

## 4. SEO article content and metadata

**Purpose:** Provide editorial guidance, product tutorials and comparisons for search visitors.

**Shared template source:** `src/layouts/seo-layout.astro`.

**Article sources:** `src/content/seo/*.md` (six current articles):

- `best-event-planning-apps.md` — app comparison.
- `best-event-planning-apps-for-iphone.md` — iPhone app comparison.
- `event-planning-app-for-couples.md` — product/use-case guide.
- `event-planning-checklist.md` — practical checklist.
- `how-to-create-an-event-in-gatherory.md` — product tutorial.
- `how-to-plan-an-event-on-iphone.md` — platform workflow guide.

**Content fields to localize:** `title`, `accent`, `seoTitle`, `description`, `intro`, `summaryHeading`, `takeaways`, Markdown headings and body, table content, related-page titles/descriptions, and any display text in lists. The shared template also contains “Updated,” “By Gatherory,” “On this page,” “Keep planning,” CTA copy and “Read the guide.”

**Metadata fields:** HTML title, meta description, Open Graph title/description, Twitter title/description, and structured-data headline/description. They should use the same locale’s article content. `html lang` must match the rendered locale. Canonical URLs, article routes, and structured-data URLs need an explicit locale-routing policy.

**Notes:** These articles contain product-specific language, competitor/product names, linked source material, and comparisons. Keep source URLs and names intact unless a localized editorial policy says otherwise. Article content should be maintained per locale so paragraphs and headings are translated as coherent editorial pieces, not as isolated UI labels.

## 5. Legal and privacy copy

**Purpose:** Set product terms and explain privacy practices and visitor rights.

**Sources:**

- `src/pages/privacy.astro` — privacy notice, table of contents, disclosures, rights and contact wording.
- `src/pages/terms.astro` — terms, table of contents, acceptable-use list and contact wording.
- `src/layouts/legal-layout.astro` — shared legal page title/description, update label, draft notice, navigation and table-of-contents label.

**Notes:** Legal copy is a separate, high-sensitivity translation category. A translation must be reviewed for each jurisdiction and should not imply that the English text governs in every locale. Preserve section anchors and links consistently with the route strategy. Operator details, email addresses and effective dates are structured legal data from `src/lib/legal-details.ts`, not ordinary copy.

## 6. Accessibility and interaction strings

**Purpose:** Make controls and non-text product examples understandable to assistive technology and after interaction.

**Sources:** Primarily `src/lib/components/mobile-nav.svelte`, `src/lib/components/landing/decision-deck.svelte`, `src/lib/components/landing/event-canvas.svelte`, and navigation/layout files.

**Examples:** `aria-label` values for the mobile menu, close control, demo decisions and reset action; the sheet’s accessible title and description; the event illustration’s accessible description; and the decision result labels “Saved” and “Passed.”

**Notes:** These strings may not be visible, so they need to be included in the extraction inventory. Accessible labels should be translated independently from decorative icon names. Keep meaningful text alternatives; purely decorative images/icons should remain hidden from assistive technology.

## 7. Locale-formatted values and runtime text

**Purpose:** Present dates, numbers, counts and document update dates in the visitor’s locale.

**Sources:** `src/layouts/seo-layout.astro` formats article update dates with `Intl.DateTimeFormat("en-US", ...)`; landing illustrations and the decision deck contain sample dates and counts; legal pages show an update date.

**Examples:** “June 13,” “Nov 14,” “5 people planning,” “1 of 3,” “Updated October 10, 2026,” and “Last updated …”.

**Notes:** Separate the value from its surrounding message. Use locale-aware date/number formatting and translatable message patterns for plural-sensitive strings such as participant counts and “{current} of {total}”; avoid concatenating translated fragments around numbers.

## 8. Brand, product names and other non-copy values

These values appear near translatable strings but should not be extracted as ordinary UI copy by default:

- Brand and product names: Gatherory, Apple Invites, Partiful, Zola, Joy, Eventbrite, Apple, Google.
- People and sample event names: Alex, Jordan, Maya, Nia and Theo.
- URLs, route slugs, fragment IDs, email addresses, metadata attribute names, CSS classes and machine-readable schema keys.
- Dates, counts, currency amounts, operator identity and country names when sourced as structured data (format or review them separately).

## Extraction checklist for the next i18n step

1. Include visible copy, SEO metadata, accessibility labels, interactive states, legal text and article body content.
2. Keep marketing/UI strings, editorial articles, and legal documents in distinct translation domains.
3. Use locale-aware message formatting for dates, numbers and plural forms.
4. Define locale-prefixed routes, localized canonical URLs and fallback behavior before translating URLs or publishing localized SEO pages.
5. Keep brand names, external source URLs and structured values out of general-purpose string bundles unless they truly vary by locale.
