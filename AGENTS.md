# AGENTS.md

This repository hosts **inktomasz** — a tattoo artist portfolio site.
Stack: **TanStack Start + TypeScript + Tailwind v4**, deployed to **Netlify** (static prerender).

## Required skills for any AI working in this repo

When operating on this repository, AI assistants MUST load and follow these skills:

1. **`caveman`** — Communicate in ultra-compressed caveman mode to minimize token usage. Cuts ~75% noise while keeping full technical accuracy. Default to `caveman-full`; use `caveman-lite` only when the user explicitly asks for prose.
2. **`frontend-design`** — Apply distinctive, production-grade frontend design principles. Avoid generic AI aesthetics (no Inter, no purple gradients on white, no cookie-cutter layouts). Commit to the established **dark + nordic / viking** aesthetic of this site (runes, weathered textures, bold display type, high contrast).

Invoke both via the `skill` tool before producing output that touches code, copy, or design.

For commits, follow **Conventional Commits** (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`). Subject ≤ 50 chars. Use `caveman-commit` style — terse, no fluff.

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

## Aesthetic guardrails

- **Theme:** dark base, parchment/bone accents, blood-red highlight.
- **Type:** distinctive display (e.g. blackletter / runic-feel) paired with a refined serif or grotesque body.
- **Motion:** restrained, atmospheric. No bouncy spring nonsense.
- **No emoji** in UI copy unless explicitly requested.

## 📝 Plan Mode

- Make plans extremely concise. Sacrifice grammar for concision.
- List unresolved questions at the end of each plan.

## 🎯 General Philosophy

- **Always use Context7 MCP** when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask
- **Language**: write code comments and developer-facing log/debug messages (for example `console.log`/`console.error`) in **English**;
- **Instead of npx** use bunx.

## Coding Behavior

**Think before coding:**

- state assumptions explicitly; if uncertain, ask before implementing
- if multiple interpretations exist, present them - don't pick silently
- name what is confusing and ask rather than guessing

**Simplicity first:**

- minimum code that solves the problem; nothing speculative
- no features, abstractions, or configurability beyond what was asked
- if a solution is 200 lines and could be 50, rewrite it

**Surgical changes:**

- touch only what the task requires; do not improve adjacent code or formatting
- match existing style even if you would do it differently
- remove imports/variables YOUR changes made unused; leave pre-existing dead code unless asked

**Goal-driven execution:**

- transform tasks into verifiable goals before starting (e.g. "write a failing test, then make it pass")
- for multi-step tasks, state a brief plan with a verification step per stage

## Code standards

Reference ./code-standards.md for code standards.

## MVP+ backlog (do NOT build yet unless asked)

- Netlify Forms / Instagram DM inquiry integration
- Instagram feed + S3 image storage
- EN/PL language toggle
