# TRUE ROOTS — bistro-website / Claude Code Context

> Tech context for Claude Code. Brand & business context → see `../brand/BRAND_GUIDE.md` and `../docs/BUSINESS_CONTEXT.md`

---

## Project Overview

**Site:** [bistro.trueroots.es](https://bistro.trueroots.es)
**GitHub:** [wladnzw/trueroots-website](https://github.com/wladnzw/trueroots-website) (public)
**Hosting:** Vercel — auto-deploy on push to `main`
**DNS:** GoDaddy

---

## Tech Stack

- **HTML5** — semantic, vanilla, no templating engine
- **CSS3** — custom properties, no framework, no preprocessor
- **JavaScript ES6+** — vanilla modules, no framework, no bundler
- **No npm, no build step** — files served as-is

---

## File Structure

```
bistro-website/
├── index.html              ← Main landing page (bistro)
├── catering.html           ← Catering page
├── cookie-policy.html      ← Legal
├── privacy-policy.html     ← Legal
├── legal-notice.html       ← Legal
├── terms-of-service.html   ← Legal
├── css/
│   ├── 00-reset.css        ← CSS reset
│   ├── 01-variables.css    ← Design tokens (CSS custom properties) ← START HERE
│   ├── 02-global.css       ← Base styles, typography
│   ├── 03-header.css       ← Navigation, header
│   ├── 04-hero.css         ← Hero section / slider
│   ├── 05-footer.css       ← Footer
│   ├── 06-responsive.css   ← Media queries
│   ├── 07-lightbox.css     ← Menu lightbox
│   ├── 08-cookie-consent.css
│   ├── 09-policy.css       ← Legal pages styling
│   └── 10-lang-switcher.css
├── js/
│   ├── main.js             ← Entry point, init
│   ├── mobile-menu.js      ← Mobile nav
│   ├── hero-slider.js      ← Hero image carousel
│   ├── menu-lightbox.js    ← Menu popup/lightbox
│   ├── cookie-consent.js   ← Cookie banner & consent (sitewide), dispatches cookie:consent events
│   ├── analytics.js        ← Google Analytics 4 (G-5E39PEVN3Z), loads only on consent type 'all'
│   ├── i18n.js             ← Internationalization engine
│   └── lang-switcher.js    ← ES/EN language toggle
├── lang/
│   └── es/
│       ├── common.json     ← Shared strings (nav, footer, etc.)
│       ├── index.json      ← Home page strings
│       ├── catering.json   ← Catering page strings
│       ├── cookie-policy.json
│       ├── privacy-policy.json
│       ├── legal-notice.json
│       └── terms-of-service.json
├── assets/                 ← Images, icons, fonts
├── docs/
│   └── BRAND_GUIDE.md      ← Brand reference (sync with ../brand/BRAND_GUIDE.md)
└── .claude/
    └── settings.local.json ← Claude Code permissions
```

---

## Design Tokens (from `css/01-variables.css`)

### Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-terracotta` | `#AE6C40` | Primary brand color, CTAs |
| `--color-arena` | `#EAE2C7` | Backgrounds, soft accents |
| `--color-olivehaze` | `#5D5F30` | Secondary accents, nature |
| `--color-olive-light` | `#BABD8B` | Supporting, organic feel |
| `--color-soil` | `#2F251B` | Dark backgrounds, text |
| `--color-light-soil` | `#918370` | Muted text, captions |
| `--color-cream` | `#FFFCF1` | Light backgrounds, negative space |
| `--color-bg-dark` | `#1a1a1a` | Neutral dark |
| `--color-accent-terracotta` | `#c97854` | Hover states |
| `--color-accent-olive` | `#6b7255` | Hover states |

### Typography

| Variable | Value |
|----------|-------|
| `--font-primary` | `'Manrope', sans-serif` — headlines, body, emphasis |
| `--font-secondary` | `'IBM Plex Mono', monospace` — captions, labels, numbers |
| `--font-size-small` | `0.875rem` (14px) |
| `--font-size-base` | `1rem` (16px) |
| `--font-size-medium` | `1.125rem` (18px) |
| `--font-size-large` | `1.5rem` (24px) |
| `--font-size-h2` | `2.5rem` (40px) |
| `--font-size-h1` | `4rem` (64px) |

### Spacing

| Variable | Value |
|----------|-------|
| `--spacing-xs` | `0.5rem` (8px) |
| `--spacing-sm` | `1rem` (16px) |
| `--spacing-md` | `2rem` (32px) |
| `--spacing-lg` | `4rem` (64px) |
| `--spacing-xl` | `6rem` (96px) |
| `--spacing-xxl` | `8rem` (128px) |

### Layout

```css
--container-max-width: 1440px;
--container-padding: 2rem;
--header-height: 80px;
--header-height-mobile: 60px;
```

### Transitions

```css
--transition-fast: 0.2s ease;
--transition-medium: 0.4s ease;
--transition-slow: 0.6s ease;
--transition-hero-fade: 1.5s ease-in-out;
```

---

## i18n / Localization

- Language: **Spanish (es)** is the primary language
- All UI strings stored in `lang/es/*.json`
- Engine: `js/i18n.js` — reads JSON, swaps `data-i18n` attributes on DOM elements
- Language switcher: `js/lang-switcher.js` — toggles ES/EN (EN strings currently embedded in HTML)

---

## Deployment Workflow

```
Local edit → git commit → git push origin main → Vercel auto-deploy → bistro.trueroots.es
```

**Deploy time:** ~30–60 seconds after push
**Branch:** `main` is production

---

## Coding Conventions

- Always use CSS custom properties from `01-variables.css` — never hardcode colors or sizes
- Add new CSS to the appropriate numbered file (or create a new numbered file if needed)
- Keep JS modular — one responsibility per file
- Use `data-i18n` attributes for any user-facing text that needs localization
- No `console.log` in production code
- Semantic HTML: use `<section>`, `<article>`, `<nav>`, `<main>`, `<header>`, `<footer>` appropriately

---

## Brand Reference

For brand guidelines, tone, colors context, and copy direction → `../brand/BRAND_GUIDE.md`
For business context, priorities, revenue model → `../docs/BUSINESS_CONTEXT.md`

---

## Documentation Update Policy

Before committing any change to `main`, check if documentation needs updating:

| What changed | Update these files |
|---|---|
| New JS module or CSS file added | `CLAUDE.md` (File Structure), `README.md`, `PROJECT_BRIEF.md` |
| Existing module behavior changed | `README.md` (JS Modules table), `PROJECT_BRIEF.md` |
| Design tokens changed (`01-variables.css`) | `CLAUDE.md` (Design Tokens), `README.md`, `PROJECT_BRIEF.md` |
| Live URL or deployment config changed | `README.md`, `PROJECT_BRIEF.md` |
| Brand, copy, or tone changed | `docs/BRAND_GUIDE.md` |
| Small internal change (logic tweak, bug fix) | No doc update needed — update comment in source file only |

**Rule:** Update docs in the same commit as the code change — never in a separate commit.
