# AGENTS.md

This repository hosts **inktomasz** — a tattoo artist portfolio site.
Stack: **TanStack Start + TypeScript + Tailwind v4**, deployed to **Netlify** (static prerender).

## Required skills for any AI working in this repo

When operating on this repository, AI assistants MUST load and follow these skills:

1. **`caveman`** — Communicate in ultra-compressed caveman mode to minimize token usage. Cuts ~75% noise while keeping full technical accuracy. Default to `caveman-full`; use `caveman-lite` only when the user explicitly asks for prose.
2. **`frontend-design`** — Apply distinctive, production-grade frontend design principles. Avoid generic AI aesthetics (no Inter, no purple gradients on white, no cookie-cutter layouts). Commit to the established **dark + nordic / viking** aesthetic of this site (runes, weathered textures, bold display type, high contrast).

Invoke both via the `skill` tool before producing output that touches code, copy, or design.

For commits, follow **Conventional Commits** (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`). Subject ≤ 50 chars. Use `caveman-commit` style — terse, no fluff.

## Project shape

```
content/        # JSON copy + image metadata (no CMS)
public/images/  # local images: portfolio, wanna-do, etc.
src/
  routes/       # file-based routes (TanStack Router)
  components/   # UI components
  styles/       # tailwind + design tokens
```

## Aesthetic guardrails

- **Theme:** dark base, parchment/bone accents, blood-red highlight.
- **Type:** distinctive display (e.g. blackletter / runic-feel) paired with a refined serif or grotesque body.
- **Motion:** restrained, atmospheric. No bouncy spring nonsense.
- **No emoji** in UI copy unless explicitly requested.

## MVP+ backlog (do NOT build yet unless asked)

- Netlify Forms / Instagram DM inquiry integration
- Instagram feed + S3 image storage
- EN/PL language toggle
