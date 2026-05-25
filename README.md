# inktomasz

Portfolio site for tattoo artist Tomasz. Built with TanStack Start, TypeScript, Tailwind v4. Static prerendered, deployed to Netlify.

## Dev

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

Output goes to `dist/` (Netlify static).

## Structure

- `content/` — all copy and image metadata (JSON)
- `public/images/` — portfolio + wanna-do images (drop new ones here)
- `src/routes/` — file-based routing
- `src/components/` — UI components
- `src/styles/` — tailwind + design tokens

See `AGENTS.md` for AI working agreements.
