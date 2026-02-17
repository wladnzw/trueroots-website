# TRUE ROOTS — Website

> Elegant multi-page website for TRUE ROOTS bistro & catering in Barcelona
> Built with vanilla HTML, CSS, and JavaScript

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel&logoColor=white)](https://trueroots-website.vercel.app/)

---

## Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for testing, optional)
- Text editor or IDE

### Installation

1. **Clone or download the project:**
```bash
git clone [repository-url]
cd tr-website-v0.1
```

2. **Start a local server** (required for i18n and Fillout embed):
```bash
python -m http.server 8000
```
3. **Open in browser:** Navigate to `http://localhost:8000`

> **Note:** A local HTTP server is **required** — the i18n system uses `fetch()` to load translation JSON files, which does not work via the `file://` protocol.

---

## Project Structure

```
tr-website-v0.1/
|
|-- index.html                 # Main landing page (hero slider, CTAs)
|-- catering.html              # Catering order page (Fillout form embed)
|-- privacy-policy.html        # GDPR-compliant privacy policy
|-- terms-of-service.html      # Terms of service for catering
|-- legal-notice.html          # Legal notice (Spanish requirements)
|-- cookie-policy.html         # Cookie usage policy
|
|-- css/
|   |-- 00-reset.css           # Modern CSS reset
|   |-- 01-variables.css       # CSS custom properties (colors, fonts, spacing, z-index)
|   |-- 02-global.css          # Global styles (body, typography, buttons, catering layout)
|   |-- 03-header.css          # Header, desktop nav, hamburger, mobile menu overlay
|   |-- 04-hero.css            # Hero section, background slider, pagination dots
|   |-- 05-footer.css          # Footer 4-column grid layout
|   |-- 06-responsive.css      # Media queries (768px, 1024px, 1440px)
|   |-- 07-lightbox.css        # Menu lightbox gallery
|   |-- 08-cookie-consent.css  # Cookie consent banner + Fillout placeholder
|   |-- 09-policy.css          # Shared styles for all legal/policy pages
|   |-- 10-lang-switcher.css   # Language switcher styles + FOUC prevention
|
|-- js/
|   |-- main.js                # Entry point — initializes all modules, sticky header
|   |-- i18n.js                # Internationalization engine (ES default, EN via JSON fetch)
|   |-- lang-switcher.js       # EN/ES toggle UI (desktop header + mobile menu)
|   |-- hero-slider.js         # Hero background auto-rotation (4 images, 4s interval)
|   |-- mobile-menu.js         # Hamburger menu with full-screen overlay
|   |-- menu-lightbox.js       # Menu image gallery (keyboard, swipe, preload)
|   |-- cookie-consent.js      # GDPR cookie consent, blocks Fillout until accepted
|
|-- lang/
|   |-- en/
|       |-- common.json        # Shared EN translations (nav, footer, cookie consent)
|       |-- index.json          # Homepage EN translations (hero, meta)
|       |-- catering.json       # Catering page EN translations (meta)
|       |-- privacy-policy.json # Privacy policy EN (15 sections)
|       |-- terms-of-service.json # Terms of service EN (10 sections)
|       |-- legal-notice.json   # Legal notice EN (11 sections)
|       |-- cookie-policy.json  # Cookie policy EN (6 sections)
|
|-- assets/
|   |-- images/
|   |   |-- hero-bg-1.webp     # Hero backgrounds (4 images, WebP)
|   |   |-- hero-bg-2.webp
|   |   |-- hero-bg-3.webp
|   |   |-- hero-bg-4.webp
|   |
|   |-- Menu/
|   |   |-- 1 - Food menu.png        # Food menu image
|   |   |-- 2 - Hot Drinks menu.png  # Hot drinks menu image
|   |   |-- 3 - Cold Drinks menu.png # Cold drinks menu image
|   |
|   |-- logo/
|   |   |-- tr-logo-header.svg  # Header logo (3.5 KB)
|   |   |-- tr-logo-footer.svg  # Footer logo (11 KB)
|   |
|   |-- icons/
|       |-- cookie-icon.svg     # Cookie icon for consent banner
|
|-- docs/
|   |-- BRAND_GUIDE.md          # Brand identity & voice
|
|-- PROJECT_BRIEF.md            # Project specification
|-- README.md                   # This file
```

---

## Design System

### Colors
```css
/* Primary (Earth Tones) */
--color-terracotta: #AE6C40
--color-arena: #EAE2C7
--color-olivehaze: #5D5F30
--color-olive-light: #BABD8B
--color-soil: #2F251B
--color-light-soil: #918370
--color-cream: #FFFCF1

/* Neutral */
--color-bg-dark: #1a1a1a
--color-text-muted: #a0a0a0

/* Accent (CTAs) */
--color-accent-olive: #6b7255
--color-accent-terracotta: #c97854
```

### Typography
- **Primary:** Manrope (Google Fonts) — weights: 300, 400, 500, 600
- **Secondary:** IBM Plex Mono (Google Fonts) — weights: 300, 400, 500
- **H1 Mobile:** 36px (2.25rem)
- **H1 Desktop:** 64px (4rem)

### Breakpoints (Mobile-first)
- Mobile: < 768px (base styles)
- Tablet: 768px+
- Desktop: 1024px+
- Large Desktop: 1440px+

---

## Features

### Multilingual (i18n)
- Bilingual: Spanish (default) / English
- Spanish text embedded in HTML, English loaded on demand via JSON `fetch()`
- EN/ES toggle in desktop header and mobile menu overlay
- Language choice persisted in `localStorage` (`tr_lang`)
- FOUC prevention: `html.lang-loading` class hides translatable elements during fetch
- `hreflang` SEO tags on all pages
- Split JSON files per page (common.json + page-specific) for efficient loading
- ES→EN: fetch + DOM update (no reload). EN→ES: page reload (Spanish in HTML)
- `I18n.t(key, defaultValue)` API for JS-generated content (cookie consent banner)

### Header
- Sticky navigation with blur backdrop on scroll
- Desktop layout: nav | centered logo | hours + EN/ES switcher
- Left-aligned logo on mobile
- Hamburger menu (< 1024px) with full-screen overlay, includes language switcher
- Escape key closes mobile menu, focus returns to hamburger
- `aria-expanded` toggled on hamburger button

### Hero Section (index.html)
- Auto-rotating background slider (4 WebP images, 4s interval)
- Smooth cross-fade transitions (1.5s ease-in-out)
- Pagination dots with manual navigation + `aria-current`
- Pause on hover, resume on leave
- Two CTA buttons: ORDER CATERING (olive) / VISIT OUR SPACE (terracotta)
- Address link to Google Maps (visible on tablet+)
- Full viewport height with dark gradient overlay

### Menu Lightbox
- Triggered by "Menu" nav link on any page (`data-open-menu`)
- 3 menu images: Food, Hot Drinks, Cold Drinks
- Keyboard navigation: ArrowLeft / ArrowRight / Escape
- Touch swipe support (50px threshold)
- Image preloading with fade-in transition
- Counter display (e.g. "1 / 3")
- ARIA dialog with `aria-hidden` toggling

### Catering Page (catering.html)
- Embedded Fillout.com form (full-height)
- Cookie consent banner blocks form until user accepts
- Consent stored in `localStorage` (365 days)
- Placeholder with cookie icon shown before consent
- Manages preferences panel (essential cookies only)

### Legal Pages
- Privacy Policy (GDPR, 15 sections)
- Terms of Service (catering-specific, 10 sections)
- Legal Notice (Spanish requirements, ODR link)
- Cookie Policy (with cookie detail table)
- All share `css/09-policy.css` for consistent styling
- HTML contains Spanish text; English translations in `lang/en/*.json` (full innerHTML sections via `data-i18n-html`)

### Footer
- 4-column grid on desktop (128px gap), 2x2 on tablet, stacked on mobile
- Address (Google Maps link), contact email, social links, brand logo
- Social: Instagram, TikTok (placeholder), LinkedIn
- Legal links: Privacy Policy, Terms of Service, Legal Notice, Cookie Policy
- Copyright: 2026 Bowl & Soul, S.L. (TRUE ROOTS)

---

## CSS Architecture

**11 modular files, numbered for load order:**

| File | Purpose |
|------|---------|
| `00-reset.css` | Box-sizing, margin reset, `:focus-visible`, `prefers-reduced-motion` |
| `01-variables.css` | All CSS custom properties (colors, fonts, spacing, z-index scale) |
| `02-global.css` | Body, typography, buttons (`.btn--olive`, `.btn--terracotta`), catering layout, scrollbar |
| `03-header.css` | Sticky header, desktop nav, hamburger animation, mobile menu overlay, `.header__right` container |
| `04-hero.css` | Hero section, background slider, gradient overlay, pagination dots (44px touch targets) |
| `05-footer.css` | Footer grid, columns, links, brand, bottom bar |
| `06-responsive.css` | Media queries: tablet (768px), desktop (1024px), large (1440px) |
| `07-lightbox.css` | Lightbox overlay, image, nav arrows, close button, counter |
| `08-cookie-consent.css` | Cookie banner, buttons, preferences panel, Fillout placeholder |
| `09-policy.css` | Shared legal page styles (headings, text, lists, tables, dividers) |
| `10-lang-switcher.css` | Language switcher buttons, FOUC prevention (`html.lang-loading`), desktop/mobile variants |

**Key patterns:**
- Mobile-first (base styles are mobile, `min-width` queries for larger)
- BEM naming convention (`block__element--modifier`)
- All design tokens in CSS custom properties
- Z-index scale: base(1) < hero(10/20) < header(1000) < mobile-menu(1100) < modal(2000) < cookie-banner(3000)

---

## JavaScript Modules

All modules use an object-literal pattern with `init()`. Initialized in `main.js` on `DOMContentLoaded` (async).

| Module | File | Key Config |
|--------|------|------------|
| **I18n** | `i18n.js` | `preInit()` on load, `init()` async; localStorage key: `tr_lang`; fetches `lang/{lang}/common.json` + page JSON |
| **LangSwitcher** | `lang-switcher.js` | Injects EN\|ES toggle into `.header__right` (desktop) and mobile menu; listens for `langchange` event |
| **HeroSlider** | `hero-slider.js` | `autoRotateDelay: 4000ms`, pause on hover |
| **MobileMenu** | `mobile-menu.js` | Close on: link click, Escape, resize > 1024px |
| **MenuLightbox** | `menu-lightbox.js` | Images: `assets/Menu/*.png`, swipe threshold: 50px |
| **CookieConsent** | `cookie-consent.js` | localStorage key: `tr_cookie_consent`, 365 days; uses `I18n.t(key, defaultValue)` for bilingual strings |

`main.js` initializes I18n first (async/await with try/catch), then LangSwitcher, then remaining modules. It also handles the sticky header scroll effect (class `header--scrolled` added at `scrollY > 50`, passive listener).

Modules load conditionally: `HeroSlider` and `CookieConsent` check for their DOM elements before initializing, so they only run on pages that need them.

---

## Pages Overview

All pages load `i18n.js`, `lang-switcher.js`, and `10-lang-switcher.css` for bilingual support.

| Page | CSS Files | JS Modules | Key Features |
|------|-----------|------------|--------------|
| `index.html` | 00-07, 10 | I18n, LangSwitcher, HeroSlider, MobileMenu, MenuLightbox | Hero slider, CTAs, full landing |
| `catering.html` | 00-03, 05-08, 10 | I18n, LangSwitcher, CookieConsent, MobileMenu, MenuLightbox | Fillout form, cookie consent |
| `privacy-policy.html` | 00-03, 05-07, 09-10 | I18n, LangSwitcher, MobileMenu, MenuLightbox | GDPR policy, 15 sections |
| `terms-of-service.html` | 00-03, 05-07, 09-10 | I18n, LangSwitcher, MobileMenu, MenuLightbox | Catering terms, 10 sections |
| `legal-notice.html` | 00-03, 05-07, 09-10 | I18n, LangSwitcher, MobileMenu, MenuLightbox | Spanish legal requirements |
| `cookie-policy.html` | 00-03, 05-07, 09-10 | I18n, LangSwitcher, MobileMenu, MenuLightbox | Cookie table, consent info |

---

## Development

### Adding hero backgrounds
1. Add WebP image to `assets/images/`
2. Add `<div class="hero__bg">` in `index.html` hero section
3. Add a `<button class="hero__dot">` in pagination
4. `hero-slider.js` reads `totalSlides` from DOM automatically

### Updating menu images
1. Replace files in `assets/Menu/` (keep filenames or update paths in `menu-lightbox.js`)
2. Image names array and alt text are in `menu-lightbox.js`

### Changing colors / fonts / spacing
Edit `css/01-variables.css` — all design tokens are centralized there.

### Adding or updating translations
1. **Static HTML content:** Add `data-i18n="key.name"` (for textContent) or `data-i18n-html="key.name"` (for innerHTML with HTML tags) to the element in the HTML file. The HTML should contain the Spanish text.
2. **Add the English translation** to the corresponding JSON file in `lang/en/`. Use `common.json` for shared keys (nav, footer) or the page-specific JSON for page-only keys.
3. **JS-generated content:** Use `I18n.t('key.name', 'Spanish default text')` — the second argument is the Spanish fallback for when translations are not loaded (ES is default language, no JSON is fetched).
4. **Adding a new language:** Create `lang/{code}/` directory with the same JSON file structure. Update `I18n.preInit()` in `i18n.js` to recognize the new language code.

### Modifying header scroll threshold
Edit `js/main.js` line: `if (window.scrollY > 50)`

### Changing slider speed
Edit `js/hero-slider.js`: `autoRotateDelay: 4000` (milliseconds)

---

## Deployment

### Before deploy checklist
- [ ] Test all links and CTAs
- [ ] Test menu lightbox (all 3 images load)
- [ ] Test cookie consent flow on catering page
- [ ] Test language switching: ES→EN→ES on all pages
- [ ] Verify cookie consent banner displays correctly in both languages
- [ ] Verify localStorage `tr_lang` persists across page navigation
- [ ] Validate all JSON files in `lang/en/` (`python -m json.tool`)
- [ ] Run Lighthouse audit (target: Performance 90+, Accessibility 95+)
- [ ] Validate HTML via W3C validator
- [ ] Check cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Check responsive (375px, 768px, 1024px, 1440px)

### Deployment options

**Static hosting (Netlify, Vercel):**
Drag-and-drop the project folder or connect a Git repository. No build step required.

**Traditional hosting (cPanel, FTP):**
Upload all files via FTP. Ensure directory structure is preserved. Note: file paths are **case-sensitive** on Linux servers.

**GitHub Pages:**
```bash
git add .
git commit -m "Deploy landing page"
git push origin main
# Enable GitHub Pages in repository settings
```

---

## Troubleshooting

### Menu images not loading
- Paths are case-sensitive on Linux: directory is `assets/Menu/` (capital M)
- Check browser console for 404 errors
- Verify `menu-lightbox.js` image paths match actual filenames

### Fillout form not appearing
- Cookie consent must be accepted first
- Check localStorage: key `tr_cookie_consent` should exist
- Verify Fillout script URL is accessible: `https://server.fillout.com/embed/v1/`

### Slider not working
- Only loads on `index.html` (requires `.hero__bg` elements)
- Check browser console for JS errors
- Verify all 4 hero images exist in `assets/images/`

### Language switching not working
- `fetch()` does not work via `file://` protocol — **use a local HTTP server** (`python -m http.server`)
- Check browser console for CORS or network errors
- Verify `lang/en/*.json` files exist and are valid JSON
- Check localStorage: key `tr_lang` should be `'en'` or `'es'`

### Cookie banner shows raw keys (e.g. "cookie.bannerText")
- This happens when `I18n.t()` is called without a default value and no translations are loaded
- All `I18n.t()` calls in `cookie-consent.js` should include a Spanish default as the second argument
- Example: `I18n.t('cookie.bannerText', 'Usamos cookies...')`

### Fonts not loading
- Requires internet connection (Google Fonts CDN)
- Check that `<link rel="preconnect">` tags are in `<head>`

---

## External Dependencies

| Service | Purpose | Usage |
|---------|---------|-------|
| [Google Fonts](https://fonts.google.com) | Manrope + IBM Plex Mono | CDN, all pages |
| [Fillout.com](https://fillout.com) | Catering order form | Embed, `catering.html` only |

No npm packages. No build tools. No frameworks.

---

## License

(c) 2026 Bowl & Soul, S.L. (TRUE ROOTS). All rights reserved.

---

## Contact

**Questions or issues?**
- Email: tr.bcn@trueroots.es
- Address: Carrer de Pere IV, 313, Sant Marti, 08020 Barcelona, Spain

---

**Version:** 1.4
**Last Updated:** February 2026
