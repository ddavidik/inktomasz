# AGENTS.md

Repository for **inktomasz** — a tattoo artist portfolio site.
Stack: **TanStack Start + TypeScript + Tailwind v4**, deployed to **Netlify** (static prerender).

## Required skills

When operating on this repository, AI assistants MUST load these skills via the `skill` tool before producing code, copy, or design output:

1. **`caveman`** — Ultra-compressed caveman communication. Default to `caveman-full`; use `caveman-lite` only when user explicitly asks for prose.
2. **`frontend-design`** — Distinctive, production-grade frontend design. Commit to the established **dark + nordic/viking** aesthetic (runes, weathered textures, bold display type, high contrast). No generic AI aesthetics.

## Commits

Follow **Conventional Commits** (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`). Subject ≤ 50 chars. Use `caveman-commit` style — terse, no fluff.

## Design system

See **[DESIGN.md](./DESIGN.md)** for the full design system: color tokens, typography scale, layout system, motion rules, component patterns, and applied design rationale.

## Project shape

```txt
content/        # JSON copy + image metadata (no CMS)
public/images/  # local images: portfolio, wanna-do, etc.
src/
  routes/       # file-based routes (TanStack Router)
  components/   # UI components
  styles/       # tailwind + design tokens
DESIGN.md       # design system reference
```

## General philosophy

- **Always use Context7 MCP** for library/API documentation, code generation, setup or configuration steps.
- **Language**: write code comments and developer-facing log/debug messages in **English**.
- **Instead of npx** use bunx.

## Code standards

See **[code-standards.md](./code-standards.md)** for TypeScript, React, Tailwind, and naming conventions.

## MVP+ backlog (do NOT build yet unless asked)

- Netlify Forms / Instagram DM inquiry integration
- Instagram feed + S3 image storage
- EN/PL language toggle
