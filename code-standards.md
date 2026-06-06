# Code Standards

## General

- Write **clean, senior-level TypeScript code** - readable and maintainable
- **Immutable code**: use `const` over `let`, never mutate arrays/objects — use `.map`, `.filter`, `.reduce`, spread instead
- Use **arrow functions** exclusively — including components; use **implicit return** where the body is a single expression (e.g. `const Foo = () => (<div />)`)
- Use **named exports** (no default exports)
- Use **return types** for all functions
- **Blank line before every `return`** — always put one empty line before a `return` statement, unless it is the first (and only) statement in the function body
- **Tailwind CSS variable shorthand**: use `utility-(--token)` syntax (e.g. `text-(--bone-fade)`, `bg-(--ink-pitch)`) — never `utility-[color:var(--token)]`
- **Tailwind canonical classes**: prefer canonical scale utilities over arbitrary values when the value maps to the spacing/sizing scale — e.g. `max-w-350` not `max-w-[1400px]` (350 × 0.25rem = 87.5rem = 1400px at 16px base)
- **Tailwind v4 canonical names**: this project uses Tailwind v4 (`@tailwindcss/vite`); use v4 names — `bg-linear-to-*` not `bg-gradient-to-*`, `min-h-svh` / `min-h-dvh` not `min-h-[100svh]`, `scale-105` not `scale-[1.05]`. VS Code extension `bradlc.vscode-tailwindcss` surfaces these via `suggestCanonicalClasses`.
- Avoid **De Morgan violations** - don't negate full boolean expressions, apply De Morgan's law instead

## Variable Naming

- **Boolean naming**: prefix boolean variables and properties with `is`, `has`, `should`, or `can` — e.g. `isVisible`, `hasFailed`, `shouldClose` not bare adjectives like `visible`, `failed`, `close`
- **Variable names**: use full descriptive names — no single-letter or heavily abbreviated identifiers (e.g. `locator` not `loc`, `value` not `v`, `element` not `el`, `product` not `p`)

## Tailwind CSS Usage

- Use canonical scale utilities (e.g. `max-w-350` not `max-w-[1400px]`)
- Use variable shorthand: `utility-(--token)` (e.g. `text-(--bone-fade)`)
- Prefer `bg-(--ink-iron)` over `#000000` for color tokens

## Component Structure

- Use descriptive prop names instead of `k`/`v` (e.g. `title`, `text`)
- Use object destructuring with meaningful names: `const { title, text } = item`
- Avoid spread operators in JSX props without clear naming
