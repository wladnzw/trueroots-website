# TRUE ROOTS - Website Project Brief

## Project Overview

**Project Name:** TRUE ROOTS Website
**Client:** TRUE ROOTS Bistro & Catering
**Location:** Barcelona, Spain
**Project Type:** Multi-page static website (6 pages)
**Tech Stack:** Vanilla HTML5, CSS3, JavaScript ES6+ (No frameworks)
**Status:** Production ready

---

## Business Context

**Brand:** TRUE ROOTS -- aesthetic gastronomic brand at the intersection of longevity, design, and conscious living.

**Business Model:**
- TRUE ROOTS Bistro (Barcelona) -- mindful dining space
- TRUE ROOTS Catering -- design-oriented gastronomic experience
- TRUE ROOTS Consulting -- strategies for food & wellness brands
- TRUE ROOTS Community -- educational formats about food culture

**Target Market:**
- B2C: Bistro guests, catering clients
- B2B: Corporate catering, consulting for hospitality & wellness brands
- Geography: Spain (Barcelona) + EU

---

## Brand Identity

### Core Values
- Balance over restriction (food freedom, not "healthy food")
- Seasonality & local sourcing
- Transparency and craftsmanship
- Cultural connection and community
- Traditions meet innovations

### Brand Archetype
The Creator x The Caregiver -- Creates beauty and meaning while nourishing body and soul

### Tone of Voice
- **Main Instagram:** Calm, mindful, poetic
- **Bistro Instagram:** Warm, friendly, authentic
- **Website:** Restrained, clear, minimal text with maximum meaning

### Key Messages
- "Rooted in balance, Driven by flavour"
- "Fresh, local ingredients. Nourishing food for longevity"
- "The art of longevity into daily life"
- "Balance over restriction"

---

## Design System

### Color Palette

**Primary Colors (Earth Tones):**
```
--color-terracotta: #AE6C40
--color-arena: #EAE2C7
--color-olivehaze: #5D5F30
--color-olive-light: #BABD8B
--color-soil: #2F251B
--color-light-soil: #918370
--color-cream: #FFFCF1
```

**Neutral Colors:**
```
--color-bg-dark: #1a1a1a
--color-text-light: #ffffff
--color-text-muted: #a0a0a0
```

**Accent Colors (CTAs):**
```
--color-accent-olive: #6b7255
--color-accent-terracotta: #c97854
```

### Typography

**Primary Font:** Manrope -- headlines, body text, emphasis
**Secondary Font:** IBM Plex Mono -- structure, captions, decoration, numbers, system text

**Font Sizes:**
```css
--font-size-small: 0.875rem;     /* 14px */
--font-size-base: 1rem;           /* 16px */
--font-size-medium: 1.125rem;     /* 18px */
--font-size-large: 1.5rem;        /* 24px */
--font-size-h2: 2.5rem;           /* 40px */
--font-size-h1: 4rem;             /* 64px - Desktop */
--font-size-h1-mobile: 2.25rem;   /* 36px - Mobile */
```

**Font Weights:**
```css
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
```

### Spacing System

```css
--spacing-xs: 0.5rem;    /* 8px  */
--spacing-sm: 1rem;      /* 16px */
--spacing-md: 2rem;      /* 32px */
--spacing-lg: 4rem;      /* 64px */
--spacing-xl: 6rem;      /* 96px */
--spacing-xxl: 8rem;     /* 128px */
```

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

### Z-Index Scale

```css
--z-base: 1;
--z-hero-content: 10;
--z-hero-pagination: 20;
--z-header: 1000;
--z-mobile-menu: 1100;
--z-modal: 2000;
--z-cookie-banner: 3000;
```

---

## Responsive Breakpoints

**Mobile First Approach**

```css
/* Mobile: < 768px (default / base styles) */

/* Tablet: 768px+ */
@media (min-width: 768px) {
  /* 2-column footer, horizontal hero bottom bar, inline CTAs */
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  /* Full navigation, 4-column footer, larger hero title */
}

/* Large Desktop: 1440px+ */
@media (min-width: 1440px) {
  /* Pagination position adjustment */
}
```

---

## Project Architecture

```
tr-website-v0.1/
|
|-- index.html                 # Main landing page
|-- catering.html              # Catering order page (Fillout embed)
|-- privacy-policy.html        # GDPR privacy policy
|-- terms-of-service.html      # Catering terms of service
|-- legal-notice.html          # Legal notice (Spanish law)
|-- cookie-policy.html         # Cookie usage policy
|
|-- css/
|   |-- 00-reset.css           # Modern CSS reset (box-sizing, focus-visible, reduced-motion)
|   |-- 01-variables.css       # All CSS custom properties
|   |-- 02-global.css          # Global styles (body, typography, buttons, catering layout)
|   |-- 03-header.css          # Header + sticky nav + hamburger + mobile menu
|   |-- 04-hero.css            # Hero section + background slider + pagination
|   |-- 05-footer.css          # Footer grid layout
|   |-- 06-responsive.css      # Media queries for all breakpoints
|   |-- 07-lightbox.css        # Menu lightbox gallery
|   |-- 08-cookie-consent.css  # Cookie consent banner + Fillout placeholder
|   |-- 09-policy.css          # Shared legal/policy page styles
|
|-- js/
|   |-- main.js                # Entry point, module init, sticky header
|   |-- hero-slider.js         # Auto-rotating background slider
|   |-- mobile-menu.js         # Hamburger menu functionality
|   |-- menu-lightbox.js       # Menu image gallery (keyboard, swipe, preload)
|   |-- cookie-consent.js      # GDPR cookie consent logic
|
|-- assets/
|   |-- images/
|   |   |-- hero-bg-1.webp     # Hero backgrounds (4 WebP images)
|   |   |-- hero-bg-2.webp
|   |   |-- hero-bg-3.webp
|   |   |-- hero-bg-4.webp
|   |
|   |-- Menu/                  # Note: capital M (case-sensitive on Linux)
|   |   |-- 1 - Food menu.png
|   |   |-- 2 - Hot Drinks menu.png
|   |   |-- 3 - Cold Drinks menu.png
|   |
|   |-- logo/
|   |   |-- tr-logo-header.svg
|   |   |-- tr-logo-footer.svg
|   |
|   |-- icons/
|       |-- cookie-icon.svg
|
|-- docs/
|   |-- BRAND_GUIDE.md         # Brand identity guide
|
|-- PROJECT_BRIEF.md           # This file
|-- README.md                  # Project documentation
```

---

## Page Sections & Components

### 1. HEADER (Sticky Navigation)

**Desktop Layout (1024px+):**
```
[Home] [Menu] [Catering]  |  [TRUE ROOTS LOGO]  |  [Monday - Friday, 9:00 AM - 5:00 PM]
```

**Mobile Layout (< 1024px):**
```
[TRUE ROOTS LOGO]                                                    [Hamburger]
```

**Implemented HTML Structure:**
```html
<header class="header" id="header">
  <div class="header__container">
    <nav class="header__nav-left" aria-label="Main navigation">
      <a href="index.html" class="header__link">Home</a>
      <a href="#" class="header__link" data-open-menu>Menu</a>
      <a href="catering.html" class="header__link">Catering</a>
    </nav>
    <a href="index.html" class="header__logo" aria-label="TRUE ROOTS - Home">
      <img src="assets/logo/tr-logo-header.svg" alt="TRUE ROOTS" width="214" height="24">
    </a>
    <div class="header__hours">
      <span>Monday - Friday, 9:00 AM - 5:00 PM</span>
    </div>
    <button class="header__hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
      <span class="header__hamburger-line"></span>
      <span class="header__hamburger-line"></span>
      <span class="header__hamburger-line"></span>
    </button>
  </div>
  <div class="header__mobile-menu" id="mobile-menu" role="dialog" aria-label="Mobile navigation">
    <!-- Mobile nav links + hours -->
  </div>
</header>
```

**Functionality:**
- Sticky positioning (position: sticky; top: 0)
- `header--scrolled` class added on scroll > 50px (blur backdrop + subtle box-shadow)
- Hamburger: animated line-to-X transformation
- Mobile menu: full-screen overlay, closes on link click, Escape key, or window resize > 1024px
- Focus returns to hamburger on Escape close
- ARIA: `aria-expanded`, `aria-controls`, `role="dialog"`

---

### 2. HERO SECTION (index.html)

**Layout:**
- Full viewport height (100dvh)
- Dynamic background (4 rotating images, 4s interval, 1.5s fade)
- Dark gradient overlay for text readability
- Pagination dots (right side, visible on tablet+)

**Content:**
- EST. 2025 (top left, mono font)
- Headline: "Rooted in balance / Driven by flavour" (large, light weight)
- Subtitle: "Fresh, local ingredients. / Nourishing food for longevity"
- CTAs: ORDER CATERING (olive) / VISIT OUR SPACE (terracotta)
- Address with Google Maps link (bottom right, visible on tablet+)

**JS Module: HeroSlider**
- `autoRotateDelay: 4000` (4 seconds)
- Reads slide count from DOM (`.hero__bg` elements)
- Pause on hover, resume on leave
- Manual navigation via pagination dots with `aria-current`
- Resets auto-rotate timer on manual navigation

---

### 3. MENU LIGHTBOX

**Triggered by:** Any element with `data-open-menu` attribute (nav links on all pages)

**Content:** 3 menu images from `assets/Menu/`
- Food Menu
- Hot Drinks Menu
- Cold Drinks Menu

**JS Module: MenuLightbox**
- Image preloading with fade-in on load
- Keyboard: ArrowLeft, ArrowRight, Escape
- Touch swipe: 50px threshold
- Counter: "1 / 3" format
- ARIA: `role="dialog"`, `aria-hidden` toggled, `aria-label` on all controls

---

### 4. CATERING PAGE (catering.html)

**Fillout.com Embed:**
- Form ID: `kxYjRc6WyGus`
- Full-height container (100vh - header)
- Responsive: adjusts for desktop header height via CSS classes `.catering-embed` / `.catering-embed__form`

**Cookie Consent (JS Module: CookieConsent):**
- Only activates on pages with `[data-fillout-id]`
- Blocks Fillout script from loading until consent
- Shows placeholder with cookie icon explaining why form is hidden
- Banner: "Accept all" / "Manage preferences" / "Save preferences"
- Consent stored in localStorage (`tr_cookie_consent`, 365 days)
- On accept: removes placeholder, dynamically loads Fillout script

---

### 5. LEGAL PAGES

All 4 legal pages share identical structure:
- Header + mobile menu + lightbox
- `<main class="policy">` with policy content
- Styled by `css/09-policy.css` (shared external stylesheet)
- Footer with legal links

**Pages:**
| Page | Sections | Key Content |
|------|----------|-------------|
| Privacy Policy | 15 sections | GDPR compliance, data controller, rights, AEPD reference |
| Terms of Service | 10 sections | Catering terms, cancellation, liability, IP, dispute resolution |
| Legal Notice | 10 sections | Company details, NIF, ODR platform, accessibility |
| Cookie Policy | 6 sections | Cookie table, Fillout cookies, consent management |

---

### 6. FOOTER

**Desktop Layout (4 columns, 128px gap):**
```
| WHERE TO FIND US    | SAY HELLO          | FOLLOW US    | [LOGO]                    |
| Carrer de Pere IV,  | tr.bcn@trueroots   | Instagram    | FOOD FOR LONGEVITY        |
| 313, Sant Marti     | Mon - Fri, 9-5 PM  | TikTok       | 41.2409 N 02.1157 W       |
| Barcelona, Spain    |                    | LinkedIn     |                           |
```

**Responsive:**
- Desktop (1024px+): 4 columns, brand column right-aligned
- Tablet (768px+): 2x2 grid
- Mobile (< 768px): single column stack

**Bottom bar:** Copyright + legal links (Privacy, Terms, Legal Notice, Cookie Policy)

---

## External Services

| Service | Purpose | Integration |
|---------|---------|-------------|
| Google Fonts | Manrope + IBM Plex Mono | `<link>` in `<head>` with `preconnect` |
| Fillout.com | Catering order form | Embed script, blocked until cookie consent |
| Google Maps | Address link | External link (`maps.app.goo.gl`) |

**No npm packages. No build tools. No frameworks.**

---

## Accessibility

### Implemented
- Semantic HTML5 (`<header>`, `<main>`, `<footer>`, `<nav>`, `<address>`, `<section>`)
- ARIA labels on all interactive elements
- `aria-expanded` on hamburger, `aria-hidden` on lightbox, `aria-current` on slider dots
- `:focus-visible` outlines (terracotta, 2px solid, 3px offset)
- `prefers-reduced-motion` media query reduces all animations
- 44px minimum touch targets on buttons and pagination dots
- Keyboard navigation: Escape closes menus/lightbox, arrow keys navigate lightbox
- `role="dialog"` on mobile menu and lightbox

---

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android)

---

## Content & Copy

### Navigation
- Home | Menu | Catering

### Hero Section
- EST. 2025
- Headline: "Rooted in balance / Driven by flavour"
- Subtitle: "Fresh, local ingredients. / Nourishing food for longevity"
- CTA 1: "ORDER CATERING" -> catering.html
- CTA 2: "VISIT OUR SPACE" -> Instagram (@trueroots.bcn)

### Footer
- Address: Carrer de Pere IV, 313, Sant Marti, 08020 Barcelona, Spain
- Email: tr.bcn@trueroots.es
- Hours: Monday - Friday, 9:00 AM - 5:00 PM
- Social: Instagram, TikTok, LinkedIn
- Coordinates: 41.2409 N 02.1157 W
- Copyright: 2026 Bowl & Soul, S.L. (TRUE ROOTS)

---

## Resources

### Documentation
- [README.md](README.md) -- Project documentation and quick start
- [BRAND_GUIDE.md](docs/BRAND_GUIDE.md) -- Brand identity & voice

### External Links
- [TRUE ROOTS Website](https://trueroots.es)
- [Instagram - Brand](https://instagram.com/trueroots.tr)
- [Instagram - Bistro](https://instagram.com/trueroots.bcn)
- [LinkedIn](https://linkedin.com/company/true-rootsbcn)

---

**Document Version:** 2.0
**Last Updated:** February 2026
**Status:** Production Ready
