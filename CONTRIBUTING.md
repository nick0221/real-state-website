# Contributing to Prestige Estates

Thank you for considering contributing! This project aims to showcase a high-quality luxury real estate website, and every contribution — whether a bug fix, new feature, or documentation improvement — is appreciated.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Architecture](#project-architecture)
- [Coding Guidelines](#coding-guidelines)
- [Pull Request Process](#pull-request-process)
- [Commit Conventions](#commit-conventions)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

This project follows a **no-drama, be-excellent-to-each-other** policy. By participating, you agree to maintain a respectful, inclusive, and constructive environment for everyone.

Harassment, trolling, personal attacks, and any form of discrimination will not be tolerated.

---

## Getting Started

1. **Fork** the repository.
2. **Clone** your fork:
   ```bash
   git clone https://github.com/your-username/real-state-website.git
   cd real-state-website
   ```
3. **Add the upstream remote** to stay in sync:
   ```bash
   git remote add upstream https://github.com/nick0221/real-state-website.git
   ```
4. **Create a branch** for your work:
   ```bash
   git checkout -b feat/your-feature-name
   ```

---

## Development Setup

```bash
# Install dependencies
npm install

# Start the dev server with HMR
npm run dev

# Type-check the project
npx tsc --noEmit   # TypeScript check

# Lint
npm run lint

# Build for production
npm run build
```

### Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server (port 5173) |
| `npx tsc --noEmit` | TypeScript type-check without emitting files |
| `npm run lint` | Run ESLint across the project |
| `npm run build` | Full production build (`tsc -b` + Vite build) |
| `npm run preview` | Preview the production build locally |

### Node.js Version

This project uses the Node.js version specified in `.node-version` (managed via `nodenv` or `nvm`). If you don't use a version manager, ensure you're on a recent LTS release (v20+).

---

## Project Architecture

```
src/
├── main.tsx              # Entry point
├── App.tsx               # Router, layout, providers
├── components/           # UI components (one per file)
├── context/              # React context providers
├── data/                 # Static data (properties, agents, testimonials)
├── utils/                # Pure utility/helper functions
public/                   # Static assets (images, fonts, favicons)
```

### Key conventions to follow:

- **One component per file** — named exports for utilities, default exports for components.
- **Component files** go in `src/components/` with a `.tsx` extension.
- **Utility functions** go in `src/utils/` with a `.ts` extension.
- **Data files** go in `src/data/` with a `.ts` extension.
- **Context providers** go in `src/context/` with a `.tsx` extension.
- **Static assets** (images, favicons, manifests) go in `public/`.

---

## Coding Guidelines

### General

- Write **TypeScript** — avoid `any` whenever possible. Prefer explicit types over inference for function signatures.
- Use **functional components** with hooks. No class components unless required (e.g., `ErrorBoundary`).
- **Pure functions** are preferred for utilities — no side effects, no mutation of inputs.
- **Existing patterns** should be followed for consistency. Before implementing something new, look at similar code in the project.

### Styling

- This project uses **Tailwind CSS v4** with a custom theme defined in `src/index.css` under `@theme`.
- Use Tailwind utility classes directly in JSX. Avoid custom CSS files unless absolutely necessary.
- When adding a new color, extend the theme in `index.css` rather than hardcoding values.
- The design follows a **dark luxury theme** (navy backgrounds, gold accents, cream text). Respect this palette.
- Animations and keyframes are defined in the `@theme` section of `index.css`.

### Animation

- Use the **tree-shaken motion wrapper** (`src/utils/motion.ts`) instead of importing directly from `framer-motion`.
  - `motion.*` is available as `m.*`
  - Hooks and `AnimatePresence` are available as named exports from `../utils/motion`
- Import only what you need — don't import everything from the wrapper.
- Respect `prefers-reduced-motion`. The project already handles this globally, but avoid motion that can't be suppressed.

### Imports

Order imports in this sequence (with blank lines between groups):

1. React / framework imports
2. Third-party library imports
3. Internal module imports (`../utils/`, `../components/`)
4. Asset imports (images, CSS)

```tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { m } from "../utils/motion";
import { Search, MapPin } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
```

### Performance

- **Lazy-load** heavy components with `React.lazy(() => import("./..."))` + `<Suspense>`.
- **Self-host images** as WebP with responsive sizes when practical.
- Avoid large external dependencies. If you add one, verify it tree-shakes well.
- Use `loading="lazy"` on below-fold images, `fetchpriority="high"` on LCP candidates.

### Accessibility

- Add proper ARIA labels (`aria-label`, `aria-describedby`, `role`) to interactive elements.
- Ensure all form inputs have associated `<label>` elements.
- Keyboard navigation must work — buttons and links should be focusable and operable with Enter/Space.
- Use semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`) rather than generic `<div>` wrappers where possible.

---

## Pull Request Process

1. **Ensure your branch is up to date** with `master`:
   ```bash
   git fetch upstream
   git rebase upstream/master
   ```

2. **Run the full quality check** before opening a PR:
   ```bash
npx tsc --noEmit   # No TypeScript errors
npm run lint        # No lint errors
npm run build       # Build succeeds
   ```

3. **Write a clear PR title** following the commit convention (see below).

4. **Describe your changes** — what changed, why, and how to test it. Include screenshots for UI changes.

5. **Keep PRs focused** — one feature or fix per PR. Large changes should be broken into smaller, reviewable increments.

6. **Link related issues** — if your PR addresses an issue, include `Closes #issue-number` in the description.

7. **Be responsive** — maintainers may request changes. Please address feedback promptly.

---

## Commit Conventions

This project uses **conventional commit messages** for clarity and potential automation:

```
<type>(<scope>): <short summary>

[optional body]
```

### Types

| Type | Usage |
|------|-------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `perf` | Performance improvement |
| `refactor` | Code restructuring (no behavior change) |
| `style` | Styling/formatting changes (Tailwind, CSS) |
| `a11y` | Accessibility improvements |
| `seo` | SEO/structured-data changes |
| `docs` | Documentation only (README, comments) |
| `chore` | Tooling, config, dependencies |

### Examples

```
feat(hero): add parallax scroll effect to background image
perf: tree-shake framer-motion imports, drop 45 KB from vendor chunk
fix(compare): handle empty state when no properties selected
a11y(nav): add aria-labels to mobile menu buttons
docs(readme): add performance optimization table
```

---

## Reporting Issues

### Bug Reports

When reporting a bug, include:

1. **Steps to reproduce** — minimal, clear steps.
2. **Expected behavior** — what should happen.
3. **Actual behavior** — what actually happens.
4. **Screenshots / screen recordings** — especially for layout or animation bugs.
5. **Environment** — browser, OS, screen size (if layout-related).

### Feature Requests

Feature requests are welcome! Please:

1. **Describe the problem** your feature would solve.
2. **Suggest a solution** — how you envision it working.
3. **Consider scope** — small, focused additions are more likely to be accepted quickly.

---

## Adding Properties

The property data lives in `src/data/properties.ts`. Each property follows this interface:

```ts
interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  gallery: string[];
  type: "sale" | "rent";
  status: "available" | "sold" | "pending";
  description: string;
  features: string[];
  yearBuilt: number;
  lotSize: number;
  featured?: boolean;
}
```

Images should use Unsplash URLs with `?w=800&q=80` (or similar) for optimized loading. For hero/decorative images, self-host WebP versions in `public/images/` with a build script.

---

## Questions?

Open a [discussion](https://github.com/nick0221/real-state-website/discussions) or reach out to the maintainers. We're happy to help you get started!
