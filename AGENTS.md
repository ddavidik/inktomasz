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

```txt
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

## 📝 Plan Mode

- Make plans extremely concise. Sacrifice grammar for concision.
- List unresolved questions at the end of each plan.

## 🎯 General Philosophy

- Write **clean, senior-level TypeScript code** - readable and maintainable
- **Immutable code**: use `const` over `let`, never mutate arrays/objects — use `.map`, `.filter`, `.reduce`, spread instead
- Use **arrow functions** exclusively — including components; use **implicit return** where the body is a single expression (e.g. `const Foo = () => (<div />)`)
- Use **named exports** (no default exports)
- Use **return types** for all functions
- **Blank line before every `return`** — always put one empty line before a `return` statement, unless it is the first (and only) statement in the function body
- **Tailwind CSS variable shorthand**: use `utility-(--token)` syntax (e.g. `text-(--bone-fade)`, `bg-(--ink-pitch)`) — never `utility-[color:var(--token)]`
- **Tailwind canonical classes**: prefer canonical scale utilities over arbitrary values when the value maps to the spacing/sizing scale — e.g. `max-w-350` not `max-w-[1400px]` (350 × 0.25rem = 87.5rem = 1400px at 16px base)
- Avoid **De Morgan violations** - don't negate full boolean expressions, apply De Morgan's law instead
- **Always use Context7 MCP** when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask

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

## 📐 Naming & Language Standards

- **Boolean naming**: prefix boolean variables and properties with `is`, `has`, `should`, or `can` — e.g. `isVisible`, `hasFailed`, `shouldClose` not bare adjectives like `visible`, `failed`, `close`
- **Variable names**: use full descriptive names — no single-letter or heavily abbreviated identifiers (e.g. `locator` not `loc`, `value` not `v`, `element` not `el`, `product` not `p`)
- **Language**: write code comments and developer-facing log/debug messages (for example `console.log`/`console.error`) in **English**;

## MVP+ backlog (do NOT build yet unless asked)

- Netlify Forms / Instagram DM inquiry integration
- Instagram feed + S3 image storage
- EN/PL language toggle
