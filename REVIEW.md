# Code Review Checklist

Reference: [code-standards.md](code-standards.md)

## Variable Naming

- [ ] No abbreviated variables (`it`, `p`, `t`, `c`)
- [ ] All variables use full descriptive names
- [ ] Consistency with `.code-standards.md` naming rules

## Tailwind CSS Compliance

- [ ] Canonical scale utilities (e.g. `max-w-350` not `max-w-[1400px]`)
- [ ] Color tokens use `--` shorthand (e.g. `text-(--bone-fade)`)
- [ ] No raw hex values in styles

## Component Structure

- [ ] No use of `k`/`v` in component props
- [ ] Object destructuring uses meaningful names
- [ ] JSX props reference descriptive names

## Automated Checks (Kilocode Bot)

- [ ] No TypeScript errors (rename of properties matched component destructuring)
- [ ] No ESLint warnings (Tailwind conventions)
- [ ] JSON schema validation passes (correct key names)
