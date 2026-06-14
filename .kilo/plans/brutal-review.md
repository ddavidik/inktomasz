# Brutal Review — inktomasz

## Plan: Fix HIGH items + polish + llms.txt

---

## ✅ Items to ACTION (approved)

### 1. Netlify form: fix AJAX POST + file upload handling

**File**: `src/components/Inquiry/index.tsx`

- Current `fetch("/", { method: "POST", body: new FormData(e.currentTarget) })` sends `multipart/form-data` with files but no `Content-Type` header. Netlify docs recommend for file upload forms: **do NOT set Content-Type header** (browser auto-sets boundary). This part is fine.
- However: the fetch response success check needs `.then(() => setStatus("success"))` — already exists. BUT when files are uploaded, the `URLSearchParams` encoding is wrong (can't serialize files). Netlify docs say for file upload AJAX: omit `Content-Type` and send `FormData` directly — which is what current code does. **This is actually correct.**
- **Action**: Add `Content-Type` conditional — if no file attached use `application/x-www-form-urlencoded` + `URLSearchParams`, else use `FormData` without Content-Type. Add Netlify required hidden `<input type="hidden" name="form-name" value="inquiry" />` — already present at line 95. Verify.

### 1b. Missing `noopener` on external links

**Files**: `Footer.tsx`, `Portfolio.tsx`, `ContactLinks.tsx`

- Audit all `<a target="_blank">` and ensure `rel="noopener noreferrer"`.
- `Footer.tsx`: 3 instances (Instagram, TikTok, Facebook, Der Grimm) → lines 19-60
- `Portfolio.tsx`: 1 instance (Instagram link) → line 48
- `ContactLinks.tsx`: 1 instance (Instagram DM) → line 8

### 2. Mobile nav hamburger hit target

**File**: `src/components/Nav.tsx`

- Current: 40px × 40px (`h-10 w-10`). WCAG minimum is 44×44.
- **Action**: Increase to `h-11 w-11` (44px) or `size-11`.

### 3. Remove CustomEvent mention from DESIGN.md

**File**: `DESIGN.md`

- Line 295 mentions `CustomEvent` prefill flow but code uses `sessionStorage` only.
- **Action**: Update to reflect actual implementation: `sessionStorage` only, no `CustomEvent`.

### 4. Add `console.warn` on corrupt prefill data

**File**: `src/lib/use-prefill-idea.ts`

- `JSON.parse` catch block currently silent.
- **Action**: `catch (error) { console.warn("inktomasz: failed to parse prefill idea", error); }`

### 5. Rename `cta-styles.tsx` → `cta-styles.ts`

**File**: `src/lib/cta-styles.tsx`

- Contains only a `const string`, no JSX.
- **Action**: Rename to `.ts`, update all imports: `CtaLink.tsx`, `CtaButton.tsx`.

### 6. Instagram DM link → direct message

**File**: `src/components/Inquiry/ContactLinks.tsx`

- Line 4: `const igDM = \`${site.artist.instagram.replace(/\/$/, "")}/\`` → profile link, not DM.
- **Action**: Change to `https://instagram.com/direct/t/${site.artist.handle}` — wait, Instagram direct links don't work like that. Use `https://ig.me/m/${site.artist.handle}` which is the short-form DM deeplink.

### 7. Pricing → JSON content

**File**: `content/site.json` + `src/components/Inquiry/PricingTable.tsx`

- **Action**: Add `pricing` object to `site.json`:

```json
"pricing": {
  "fullDay": "€1,400",
  "halfDay": "€700",
  "disclaimer": "Free consultation · no deposit until confirmed"
}
```

- Update `PricingTable.tsx` to read from `site.pricing`.

### 8. Bump hero background rune opacity

**File**: `src/components/Hero.tsx`

- Line 15: `text-(--bone-paper)/[0.035]` — too faint on OLED.
- **Action**: Bump to `0.05` or `0.06`.

### 9. Accessibility sweep

- **Skip-link**: Add to `__root.tsx` — visually hidden link at top of body, scrolls to `#main-content`. Add `id="main-content"` to `<main>` in `__root.tsx`.
- **Focus indicators**: Audit interactive elements for `focus-visible:outline-2 focus-visible:outline-(--blood-bright)`. Current `Textarea.tsx` uses `outline-none` — bad for keyboard users. Add `focus-visible:outline-2 focus-visible:outline-(--blood-bright)` to all form inputs.
- **Nav aria**: Add `aria-current="page"` to active nav link.

### 10. llms.txt — propose + add

**Rationale**: Google Lighthouse now audits for llms.txt (v13.3). Cursor/Windsurf IDEs use it for context. It's a 15-minute, nearly zero-cost improvement. Not a ranking signal, but signals competence to agentic tools. Given this is a tattoo portfolio, AI agents will likely encounter it when users ask "find me a blackwork tattoo artist in Berlin" via ChatGPT/Perplexity.

**Action**: Create `/public/llms.txt` (served at root):

```markdown
# Inktomasz — Tattoo Artist Portfolio

Tomasz Górnicki (@inktomasz) — custom blackwork, nordic, and rune-inspired tattoos at Der Grimm Tattoo, Berlin. By appointment only.

## Site structure

- Home (`/`): Hero, Portfolio, Wanna-do ideas, Inquiry form
- About (`/about`): Background, artistic evolution, studio info
- Aftercare (`/aftercare`): Before/after tattoo care instructions

## Key details

- Location: Der Grimm Tattoo, Berlin (52.56°N, 13.46°E)
- Style: Blackwork, linework, nordic ornament, rune compositions
- Pricing: €700 half-day, €1,400 full day
- Booking: ~8 weeks out, free consultation, no deposit until confirmed
- Contact: Inquire form on site, Instagram @inktomasz

## Content files

- `content/site.json`: Artist info, SEO, nav, pricing
- `content/portfolio.json`: Portfolio pieces
- `content/wannado.json`: Wanna-do flash ideas
- `content/about.json`: Artist story chapters
- `content/aftercare.json`: Care instructions
```

---

## 🔴 Rejected — not changing

| Item                                | Reason                                                                                                                                                                                                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1 form method                      | Current code is already correct per Netlify AJAX docs for file uploads                                                                                                                                                                                       |
| #4 field name props                 | Verified — `...props` passes `name` through correctly                                                                                                                                                                                                        |
| #5 file upload state                | Out of scope, fine as-is                                                                                                                                                                                                                                     |
| #8 portfolio click hint             | Acceptable UX                                                                                                                                                                                                                                                |
| #9 wanna-do count badge             | Rejected                                                                                                                                                                                                                                                     |
| #10 scroll-to-hash on about         | Rejected                                                                                                                                                                                                                                                     |
| #14 button text swap                | Rejected                                                                                                                                                                                                                                                     |
| #15 testimonials                    | Fine for now                                                                                                                                                                                                                                                 |
| #16 analytics                       | Netlify Analytics handles this at platform level                                                                                                                                                                                                             |
| #20 BodyLink external prop          | Keep — `http` can be passed                                                                                                                                                                                                                                  |
| #30 prettier config                 | Fine as-is with oxfmt defaults                                                                                                                                                                                                                               |
| #31 add heavier display font weight | **Discovered**: "Manufacturing Consent" is only available in 400 weight. Google Fonts alternative: `UnifrakturMaguntia` is also 400 only. Blackletter fonts are typically single-weight. Cannot easily add heavier variant without switching font. **Skip**. |

---

## Execution order

1. Security: `noopener` on all external links (1b)
2. Form: verify form-name hidden input + conditional Content-Type (1a)
3. Content: pricing → site.json (7)
4. Content: IG DM deep link (6)
5. Refactor: cta-styles.tsx → .ts (5)
6. Polish: DESIGN.md CustomEvent removal (3)
7. Polish: use-prefill-idea warn on corrupt data (4)
8. Polish: hero rune opacity bump (8)
9. UX: nav hamburger hit target (2)
10. Accessibility: skip-link + focus-visible + aria-current (9)
11. llms.txt (10)

## Verification

After all changes:

```bash
bun run typecheck   # no TS errors
bun run lint        # no lint errors
bun run build       # builds clean
```

Open `localhost:3000` and check:

- Tab through page → all interactive elements show focus ring
- Skip-link visible on first tab press
- Mobile hamburger touch target ≥ 44px
- Form submits correctly (test with/without file)
- IG link opens DM dialog on mobile
- Pricing reads from JSON
- `/llms.txt` returns 200 with markdown
