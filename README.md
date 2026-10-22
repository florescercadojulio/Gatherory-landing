# Gatherory Landing

The public marketing site for Gatherory, built with Astro and Svelte. This project is intentionally presentation-only.

For product context and work spanning repositories, start with the
[Gatherory AI onboarding guide](../gatherory-web-app/docs/development/ai-onboarding.md).

## Local setup

Install dependencies and start Astro in background mode:

```sh
pnpm install
pnpm astro dev --background
```

The authenticated companion and server live in the separate TanStack application
at `app.gatherory.com`. Authentication, APIs, database models, and persistence
belong in `gatherory-web-app`.

## Commands

| Command | Action |
| :-- | :-- |
| `pnpm astro dev --background` | Start the development server |
| `pnpm astro dev status` | Inspect the background server |
| `pnpm astro dev stop` | Stop the background server |
| `pnpm build` | Build the static landing site |

## Structure

- `src/pages/index.astro` — public landing page
- `src/lib/components/landing` — Gatherory product storytelling components
- `src/styles/global.css` — Raycast-inspired visual tokens and shared styles
- `DESIGN.md` — Raycast-inspired visual language used by the web experience

## Public beta invitation

The beta CTA uses `TESTFLIGHT_BETA_URL` in `src/lib/site-links.ts`. Static PNG and
SVG QR assets live in `public/images/beta/`; they encode that same Apple invite.
After changing the URL, regenerate and verify both assets on macOS:

```sh
swift scripts/generate-beta-qr.swift
```

The script uses Core Image and Vision, preserves a quiet zone, and verifies the
PNG decodes to the configured URL. See [beta implementation notes](docs/launch-prototype.md#public-beta).
