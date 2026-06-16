# DESIGN.md

Design system reference for **inktomasz** — tattoo artist portfolio, Gdańsk, Poland.

## Aesthetic Direction

**Theme:** Dark gothic-nordic. Obsidian grounds, parchment illuminates, blood-red accents. Evokes iron-age craft, worn manuscript, and deliberate permanence.

**Mood:** A blacksmith's ledger. Scarred iron, candlelight on vellum, rune-marked objects. Not "dark mode SaaS". Not clean Scandinavian white.

**Influences:** Norse rune stones, medieval blackletter manuscripts, weathered iron, tattooed skin as parchment.

---

## Color System

### Palette

| Token            | Hex       | Role                            |
| ---------------- | --------- | ------------------------------- |
| `--ink-void`     | `#050507` | Deepest background              |
| `--ink-pitch`    | `#08080c` | Alternate section bg            |
| `--ink-iron`     | `#131314` | Card / surface bg               |
| `--ink-stone`    | `#1c1c1e` | Interactive hover bg            |
| `--ink-ash`      | `#26262b` | Light surface                   |
| `--bone-paper`   | `#e8dfc9` | Primary text, high emphasis     |
| `--bone-warm`    | `#d6c9a8` | Body text, descriptions         |
| `--bone-mid`     | `#9a8e75` | Kicker / meta color             |
| `--bone-fade`    | `#6a6256` | Muted / decorative              |
| `--blood`        | `#8b1d1a` | Accent bg, selection, underline |
| `--blood-bright` | `#b32a24` | Interactive accent, hover state |
| `--ember`        | `#d97a39` | Warm atmospheric accent only    |

### Distribution (60 / 30 / 10)

- **60% — ink scale**: `--ink-void` through `--ink-ash`. Backgrounds, surfaces, cards.
- **30% — bone scale**: `--bone-paper` through `--bone-fade`. All typographic content.
- **10% — blood / ember**: Interactive states, kickers, decorative accents, selection.

### Rules

- Page background: triple radial gradient (blood vignette top, ember bottom-right, `--ink-void` base) — `background-attachment: fixed`.
- Grain overlay: `body::before` SVG fractalNoise at 6% opacity, `mix-blend-mode: overlay`.
- Text selection: `--blood` bg + `--bone-paper` text.
- Opacity over new colors: use `bg-(--blood)/[0.06]`, `border-white/5`, `bg-(--bone-paper)/30` — variation without new tokens.
- `--ember` is atmospheric only — never use for interactive states.

---

## Typography

### Typefaces

| Role                 | Font                    | Class                       |
| -------------------- | ----------------------- | --------------------------- |
| Display / headings   | `Manufacturing Consent` | `display`, `h1`, `h2`, `h3` |
| Body / serif         | `Spectral`              | default body                |
| Lead text            | `Spectral`              | `.serif-tight`              |
| Mono / kicker / meta | `Spectral` uppercase    | `.mono`                     |

### Type Scale

| Element                    | Classes                                                     |
| -------------------------- | ----------------------------------------------------------- |
| Hero `h1`                  | `text-[14vw] leading-[0.9] md:text-[clamp(5rem,9vw,11rem)]` |
| Page `h1`                  | `text-[14vw] leading-[0.9] md:text-[clamp(4rem,8vw,9rem)]`  |
| Section `h2`               | `text-5xl leading-[0.95] md:text-7xl`                       |
| Sub-heading `h2` (in-page) | `text-4xl md:text-5xl` or `text-5xl md:text-6xl`            |
| Sub-heading `h3`           | `text-3xl`                                                  |
| Lead / subtitle            | `serif-tight text-xl md:text-2xl leading-snug`              |
| Body                       | Spectral default (~16px)                                    |
| Kicker / meta              | `.mono` = 0.72rem, uppercase, `letter-spacing: 0.22em`      |

### Rules

- Display headings: tight leading (0.9–0.95). Never default leading on `Manufacturing Consent`.
- Kickers: always `.mono`. Prefix with a rune glyph + `&nbsp;&nbsp;`. Color `text-(--bone-fade)` in components, `text-(--blood-bright)` in page-level headers.
- Body text: `text-(--bone-warm)` for descriptions, `text-(--bone-paper)` for emphasis.
- Italic variation: `<span className="italic">` within display headings for rhythmic contrast.
- **Letter-spacing on display headings**: intentionally `0.005em` (near-zero), **not** negative. Manufacturing Consent blackletter collapses in legibility with negative tracking (`-0.04em` etc.). This is a deliberate deviation from conventional tight-heading rules that apply to grotesque/sans display fonts.

---

## Layout

### Container

```tailwind-css
mx-auto max-w-350 px-6 md:px-10
```

`max-w-350` = 87.5rem = 1400px (Tailwind v4 canonical; 350 × 0.25rem).

### Section rhythm

```tsx
<section className="relative border-t border-white/5 py-28 md:py-40">
  <div className="mx-auto max-w-350 px-6 md:px-10">
```

- `py-28` / `py-40` = 7rem / 10rem vertical padding.
- `border-t border-white/5`: hairline separator between sections.
- Alternate sections: add `bg-(--ink-pitch)` for depth.

### Page route rhythm

```tailwind-css
article.pt-40.pb-32  →  header  →  carved-divider mt-24  →  content mt-24
```

- `pt-40` clears sticky nav.
- `pb-32` = 8rem bottom breathing room.
- Second carved-divider: `mt-32` (heavier section break).

### Grid

12-column via Tailwind. Common spans:

- 3–4 of 12: label / counter / sidebar
- 7–8 of 12: main content, `col-start-5`
- Full 12 on mobile, split on `md:`

### Spacing increments

Tailwind default scale is 4px base. Site uses multiples of 8:

| Class               | px        | Usage                    |
| ------------------- | --------- | ------------------------ |
| `gap-3` / `gap-4`   | 12 / 16   | Tight stacks             |
| `gap-6`             | 24        | Flex row gaps            |
| `gap-10` / `gap-12` | 40 / 48   | Section header rows      |
| `gap-16`            | 64        | Chapter gaps             |
| `mt-10`             | 40        | After hero copy          |
| `mt-24`             | 96        | After page header        |
| `mt-32`             | 128       | After major divider      |
| `py-28` / `py-40`   | 112 / 160 | Section vertical padding |

---

## Motion

### Scroll reveal

`.reveal` / `.reveal.in` (toggled by `IntersectionObserver` in `use-reveal.ts`):

- Initial: `opacity: 0`, `translateY(20px)`
- Final: `opacity: 1`, `translateY(0)`
- Duration: 1100ms, `cubic-bezier(0.16, 1, 0.3, 1)` (expo out)

Use on: cards, chapter sections, major content blocks. **Not** on: nav, footer, kickers, decorative elements.

### Ambient animations

| Class      | Animation                 | Duration                 |
| ---------- | ------------------------- | ------------------------ |
| `.flicker` | Opacity 1 → 0.92 → 1 loop | 7s infinite              |
| `.drift`   | translateY 0 → -12px      | 6s ease-in-out alternate |

Used for background runic ornaments only.

### Hover

- Images: `transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)]` — slow, luxurious scale.
- Links / buttons: `transition-colors` — snappy color shift.
- CTA arrows: `transition-transform group-hover:translate-x-1` — subtle nudge right.
- Underline links: `background-size` 0 → 100% over 400ms (`cubic-bezier(0.65, 0, 0.35, 1)`).

### Rules

- No bouncy springs. No `ease-bounce` or spring-based motion.
- Slow transitions (1200ms) on images only.
- Hover transitions: `transition-colors` (instant) or default 150ms.
- `.flicker` / `.drift` for background/decorative elements only.

---

## Component Patterns

### SectionHeader

Kicker + section heading. Used in: `AboutTeaser`, `Portfolio`, `WannaDo`, `AftercareTease`.

```tsx
<SectionHeader rune="ᛉ" label="Portfolio" heading={portfolio.heading} />
// Optional: headingClassName="reveal" (AboutTeaser)
```

Renders:

```html
<p class="mono mb-6 text-(--bone-fade)">ᛉ Portfolio</p>
<h2 class="display text-5xl leading-[0.95] md:text-7xl">...</h2>
```

### PageHeader

Full-page route header. Used in `about.tsx`, `aftercare.tsx`.

```tsx
<PageHeader
  rune="ᛁ"
  label="About"
  heading={
    <>
      The hand
      <br />
      <span className="italic">behind</span> the needle.
    </>
  }
/>
// Optional: subtitle="..." (aftercare only)
```

Renders `<header mx-auto max-w-350>` with blood-bright kicker + giant display h1.

### CarvedDivider

1px gradient rule. Used in `about.tsx`, `aftercare.tsx`.

```tsx
<CarvedDivider className="mt-24" />
<CarvedDivider className="mt-32" />
```

### Rune rule

Centered rune with flanking hairlines. Used at section endings.

```tsx
<div className="rune-rule mono">ᛟ</div>
```

### Rune index (in-use)

| Rune     | Name    | Used in                     |
| -------- | ------- | --------------------------- |
| `ᛟ`      | Othalan | Care, Inquiry, rune-rule    |
| `ᛁ`      | Isa     | About section / page        |
| `ᛉ`      | Algiz   | Portfolio, Don'ts warning   |
| `ᚹ`      | Wunjo   | Wanna-do                    |
| `ᛏ`      | Tiwaz   | Before-care list items      |
| `ᚠᚢᚦᚨᚱᚲ` | Futhark | Footer rune-rule row        |
| `ᚠᚢᚦᚨᚱ`  | Futhark | Hero left column decoration |
| `ᛏ`      | Tiwaz   | Hero background ornament    |

### Geographic coordinates (Hero)

`ᚾ 52.56°` / `ᛖ 13.46°` — Der Grimm Tattoo location.

---

## Applied Design Principles

Mapped to five foundational web design skills:

### 1. Typography

- **Distinctive**: Manufacturing Consent blackletter (medieval manuscript feel, far from generic sans).
- **Scale**: display text at fluid `14vw` clamped, section h2 at 5xl → 7xl, kicker at 0.72rem.
- **Rhythm**: tight leading (0.9–0.95) on display, 1.375 (`leading-snug`) on body.
- **Tracking**: kicker 0.22em (airy), display 0.005em (tight), body default.
- **Font stack**: `"Spectral", "Iowan Old Style", Georgia, serif` for body. `"Manufacturing Consent", serif` for display. Mono/kicker use Spectral uppercase at 0.7rem.

### 2. Layout

- **Grid**: 12-col Tailwind, consistent `max-w-350 px-6 md:px-10` container.
- **8-point spacing**: Tailwind 4px base; site values are multiples of 8 (24, 32, 40, 48, 64, 80, 128px).
- **Hierarchy**: Kicker → Display h1/h2 → Lead serif → Body. Clear scan path.
- **Whitespace**: 112–160px section padding feels premium, not cramped.

### 3. Color

- **Limited palette**: ink (dark), bone (light), blood (accent) — three groups, twelve tokens.
- **Opacity variation**: `border-white/5`, `bg-(--blood)/[0.06]` — variation without new colors.
- **Contrast**: bone-paper on ink-void = high contrast; blood-bright on ink-iron = accessible accent.
- **Atmospheric depth**: fixed-attachment gradient background creates pseudo-parallax depth without JS.

### 4. Code

- **Stack**: TanStack Start (SSR + static prerender), TypeScript strict, Tailwind v4.
- **Content as data**: JSON in `content/` — no CMS lock-in.
- **Canonical utilities**: Tailwind v4 names (`bg-linear-to-*`, `min-h-svh`). Variable shorthand `utility-(--token)`.
- **Prerendering**: `/`, `/about`, `/aftercare` statically prerendered at build.
- **Image optimization**: TanStack Start image optimization.
- **Pricing**: values live in `site.json` under `pricing.fullDay` / `pricing.halfDay` — no environment variable indirection.
- **Buttons** should have cursor-pointer.

### 5. Conversion

- **Single goal per section**: Hero → book / see work. Portfolio → build desire. Wanna-do → claim + inquire. Inquiry → contact.
- **CTA above fold**: blood-bright border button in hero, visible on load.
- **CTA frequency rule**: every 2–3 sections must carry an inquiry CTA. Pattern: Hero (CTA) → Portfolio (trailing CTA) → Wanna-do (per-card + bottom CTA). Nav carries an outlined blood-bright "Inquire" button distinct from plain text links. Mobile sheet surfaces same button at bottom of drawer.
- **Nav CTA pattern**: the "Inquire" navLink is flagged `cta: true` in `site.json`; Nav.tsx renders it as `border border-(--blood-bright) px-4 py-2 text-(--blood-bright)` on desktop and full-width in mobile drawer, not styled as a text link.
- **Prefill flow**: Wanna-do idea selection writes to `sessionStorage` under key `inktomasz:idea`. The Inquiry component reads it on mount via `usePrefillIdea()` hook and populates the idea textarea with a `Wanna-do: {title}` prefix. Clearing resets both sessionStorage and form state.
- **Trust signals**: Real portfolio work, about section, physical studio location, precise GPS coords.

---

## Tailwind v4 Canonical Classes

This project uses Tailwind v4 (`@tailwindcss/vite`). VS Code extension `bradlc.vscode-tailwindcss` surfaces these via `suggestCanonicalClasses`.

| v3 / arbitrary     | v4 canonical     |
| ------------------ | ---------------- |
| `bg-gradient-to-b` | `bg-linear-to-b` |
| `bg-gradient-to-t` | `bg-linear-to-t` |
| `bg-gradient-to-r` | `bg-linear-to-r` |
| `min-h-[100svh]`   | `min-h-svh`      |
| `min-h-[100dvh]`   | `min-h-dvh`      |
| `min-h-[100lvh]`   | `min-h-lvh`      |
| `scale-[1.05]`     | `scale-105`      |
| `max-w-[1400px]`   | `max-w-350`      |
