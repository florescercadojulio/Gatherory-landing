# Gatherory Landing

The public marketing site for Gatherory, built with Astro and Svelte. This project is intentionally presentation-only.

## Local setup

Install dependencies and start Astro in background mode:

```sh
pnpm install
pnpm astro dev --background
```

The future authenticated product will live in a separate TanStack application on the `app` subdomain. Authentication, APIs, database models, and persistence belong there rather than in this landing repository.

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
