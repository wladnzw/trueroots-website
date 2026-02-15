/**
 * Main Entry Point
 * Initialize all modules on DOM ready
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize modules
  if (typeof HeroSlider !== 'undefined') HeroSlider.init();
  if (typeof CookieConsent !== 'undefined') CookieConsent.init();
  MobileMenu.init();
  MenuLightbox.init();

  // Sticky header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }, { passive: true });
  }
});
