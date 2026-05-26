# Prestige Estates — Luxury Real Estate Website

<p align="center">
  <a href="https://real-state-website-iota-tawny.vercel.app/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/%F0%9F%8C%90%20Live%20Demo-Vercel-000?logo=vercel&style=for-the-badge&labelColor=111">
      <img alt="Live Demo" src="https://img.shields.io/badge/%F0%9F%8C%90%20Live%20Demo-Vercel-000?logo=vercel&style=for-the-badge&labelColor=eee">
    </picture>
  </a>
</p>

<p align="center">
  <!-- Metadata badges -->
  <a href="https://github.com/nick0221/real-state-website/commits/master">
    <img src="https://img.shields.io/github/last-commit/nick0221/real-state-website?color=%23d4a853&label=Last%20commit&logo=git&logoColor=white&style=flat-square" alt="Last commit">
  </a>
  <a href="https://github.com/nick0221/real-state-website/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/nick0221/real-state-website?color=%23d4a853&label=License&logo=open-source-initiative&logoColor=white&style=flat-square" alt="License">
  </a>
  <a href="https://github.com/nick0221/real-state-website">
    <img src="https://img.shields.io/github/repo-size/nick0221/real-state-website?color=%23d4a853&label=Repo%20size&logo=github&logoColor=white&style=flat-square" alt="Repo size">
  </a>
  <a href="https://github.com/nick0221/real-state-website/stargazers">
    <img src="https://img.shields.io/github/stars/nick0221/real-state-website?color=%23d4a853&label=Stars&logo=github&logoColor=white&style=flat-square" alt="GitHub stars">
  </a>
  <br>
  <!-- Tech stack badges -->
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat-square" alt="Vite">
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square" alt="React">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white&style=flat-square" alt="TypeScript">
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square" alt="Tailwind CSS">
  </a>
  <a href="https://www.framer.com/motion/">
    <img src="https://img.shields.io/badge/framer--motion-12-0055FF?logo=framer&logoColor=white&style=flat-square" alt="framer-motion">
  </a>
  <a href="https://vercel.com/">
    <img src="https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=white&style=flat-square" alt="Vercel">
  </a>
  <br>
  <!-- Quality badges -->
  <a href="https://github.com/nick0221/real-state-website/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs welcome">
  </a>
  <a href="https://pagespeed.web.dev/">
    <img src="https://img.shields.io/badge/Performance-A%2B-brightgreen?style=flat-square&logo=lighthouse&logoColor=white" alt="Performance">
  </a>
</p>

> A fully responsive luxury real estate showcase built with React 19, TypeScript, Tailwind CSS v4, and framer-motion. Features property listings with filtering, detailed property pages, a side-by-side comparison tool, interactive map, mortgage calculator, and more — all optimized for performance and SEO.

---

## ✨ Features

### 🏠 Property Showcase
- **Hero section** with parallax scroll effects, animated stat counters, and a search bar with property-type filters
- **Featured Properties grid** — responsive 3-column layout with animated cards, image hover zoom, and status badges
- **Advanced filtering system** — filter by property type (sale/rent), price range, bedrooms, bathrooms, and full-text search (title, address, description)
- **Empty state** — friendly message with a "clear filters" prompt when no properties match

### 📄 Property Detail Pages (`/property/:id`)
- Full-screen image gallery with thumbnail strip and navigation arrows
- Interactive **floor plan** — dynamically generated SVG with labeled rooms, expandable/collapsible
- Key stats bar (beds, baths, sq ft, year built, lot size)
- Features & amenities checklist
- **Agent profile card** with contact buttons and schedule-a-tour CTA
- **Mortgage calculator** — interactive sliders for down payment, interest rate, loan term, and tax rate; animated number transitions
- **Property contact form** — inline inquiry form
- Similar properties sidebar
- Save (favorite) and share buttons

### 🔄 Property Comparison (`/compare`)
- Select up to 3 properties to compare side-by-side
- Desktop: full comparison table with best-value highlighting
- Mobile: stacked card layout with condensed stats
- Features & amenities comparison with check marks
- Persistent floating compare bar at the bottom of every page
- Selection persists across page loads via **localStorage**

### 👥 Agents Team
- Agent profile cards with avatar, title, stats (properties sold, experience), and call/email buttons

### 💬 Testimonials Carousel
- Auto-advancing carousel with pause-on-hover/focus
- Keyboard-navigable with previous/next buttons and dot indicators
- Star ratings and quote styling

### 📞 Contact & Map
- Contact info cards (phone, email, address, hours)
- **Interactive Leaflet map** — lazy-loaded only when the contact section scrolls into view
- Contact form with simulated submission and success feedback

### 📋 Services Section
- Six service cards with gradient icons, hover animations, and bottom accent lines

### 📬 Newsletter Subscription
- Email signup in the footer with success/error states

### 🎨 UI/UX
- **Dark luxury theme** — deep navy backgrounds with gold accents and cream text
- **Custom typography** — Cormorant Garamond (headings) + Poppins (body), self-hosted via @fontsource
- **Animated section entrances** — scroll-triggered fade-in-up animations via framer-motion `whileInView`
- **Responsive design** — fully mobile-optimized with a slide-out navigation drawer
- **Active section tracking** — navbar highlights the current section via Intersection Observer
- **Back-to-top button** — appears on scroll-down, fades on scroll-up
- **Error boundaries** — each major section is wrapped individually, preventing one failure from taking down the entire page
- **Custom scrollbar** styled to match the dark theme
- **Reduced motion support** — respects `prefers-reduced-motion`

### ♿ Accessibility
- Skip-to-content link (first focusable element)
- Keyboard-navigable carousel, cards, and comparison tools
- ARIA roles and labels throughout (carousel, testimonials, buttons)
- Proper form labels and `role="alert"` for error messages
- Semantic HTML structure (`<nav>`, `<main>`, `<section>`, `<footer>`)

---

## ⚡ Performance Optimizations

| Technique | Details |
|-----------|---------|
| **Code splitting** | Route-level lazy loading (`PropertyDetail`, `ComparePage`) via `React.lazy` + `Suspense` |
| **Lazy-loaded Leaflet** | Map component (163 KB vendor chunk) loaded only when Contact section scrolls into view |
| **Tree-shaken framer-motion** | Imports only 10 of 165+ element types from `framer-motion/m` — vendor chunk drops **45 KB (32%)** |
| **Self-hosted hero images** | Local WebP at 3 responsive sizes (640w/1200w/1920w) with JPEG fallbacks — zero external DNS/TLS |
| **Fetchpriority hints** | `fetchpriority="high"` on the LCP hero image, `loading="eager"` on above-the-fold assets |
| **Deferred parallax** | Scroll-bindings initialized via `requestIdleCallback` — kept off the critical rendering path |
| **Font preloading** | Critical font variants (heading + body) preloaded with WOFF2 |
| **Responsive images** | `<picture>` elements with WebP sources and `srcSet` at breakpoints |
| **Self-hosted fonts** | Cormorant Garamond + Poppins via @fontsource — no Google Fonts DNS/TLS |
| **Bundle analysis** | framer-motion vendor chunk: 142 KB → 96.9 KB raw, 47 KB → 34 KB gzip |

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 |
| **Language** | TypeScript 6.0 |
| **Build tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 |
| **Animation** | framer-motion 12 |
| **Routing** | react-router-dom 7 |
| **Icons** | lucide-react |
| **Map** | Leaflet + react-leaflet (lazy-loaded) |
| **Fonts** | @fontsource/cormorant-garamond, @fontsource/poppins |
| **Image processing** | sharp (build-time WebP conversion) |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/real-state-website.git
cd real-state-website

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

### Building Hero Images (Optional)

The hero background images are pre-built and committed. To regenerate them from the original Unsplash sources:

```bash
npm install sharp  # already a devDependency
node scripts/generate-hero-images.mjs
```

---

## 📁 Project Structure

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Router, layout, LazyMotion wrapper
├── index.css                   # Tailwind v4 theme, custom utilities, animations
├── fonts.css                   # @fontsource imports
├── components/
│   ├── Navbar.tsx              # Sticky nav with active section tracking
│   ├── Hero.tsx                # Hero with parallax, search, stats
│   ├── FeaturedProperties.tsx  # Property grid + filters
│   ├── PropertyCard.tsx        # Individual property card
│   ├── PropertyDetail.tsx      # Full property detail page
│   ├── PropertyContactForm.tsx # Inline inquiry form
│   ├── MortgageCalculator.tsx  # Interactive mortgage calculator
│   ├── ComparePage.tsx         # Side-by-side comparison page
│   ├── CompareBar.tsx          # Floating comparison bar
│   ├── CompareContext.tsx       # Reducer + localStorage persistence
│   ├── Services.tsx            # Services cards
│   ├── Agents.tsx              # Agent team profiles
│   ├── Testimonials.tsx        # Auto-advancing carousel
│   ├── Contact.tsx             # Contact form + lazy map
│   ├── MapView.tsx             # Leaflet map (lazy-loaded)
│   ├── Footer.tsx              # Footer with newsletter
│   ├── DemoBanner.tsx          # Dismissible demo banner
│   ├── AnimatedSection.tsx     # Reusable scroll-triggered animation
│   ├── ErrorBoundary.tsx       # Per-section error boundary
│   ├── LoadingSpinner.tsx      # Full-page loading state
│   ├── BackToTop.tsx           # Scroll-to-top button
│   └── OptimizedImage.tsx      # Responsive <picture> component
├── data/
│   └── properties.ts           # 12 property listings + agents + testimonials
├── context/
│   └── CompareContext.tsx       # Compare state with localStorage
├── utils/
│   ├── motion.ts               # Tree-shakeable framer-motion wrapper
│   ├── format.ts               # Price formatting helpers
│   ├── images.ts               # Unsplash URL optimization
│   └── api.ts                  # Simulated API calls
public/
├── images/                     # Self-hosted WebP hero images
├── favicon.svg                 # SVG favicon
├── site.webmanifest            # PWA manifest
├── sitemap.xml                 # SEO sitemap
└── robots.txt                  # Crawler rules
```

---

## 🔍 SEO

- **Structured data** — JSON-LD for `RealEstateAgent`, `WebSite`, and `ItemList` (with individual property listings)
- **Open Graph / Twitter Card** — rich social sharing previews with `webpage.png`
- **Canonical URL** — prevents duplicate content issues
- **Semantic HTML** — proper heading hierarchy, landmark elements
- **Sitemap** — `sitemap.xml` for search engine crawling
- **Robots.txt** — allows all crawlers

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get started, coding conventions, commit messages, and the pull request process.

## 📄 License

MIT
