/**
 * Mobile Menu Toggle
 * Handles hamburger menu open/close with full-screen overlay
 */

const MobileMenu = {
  isOpen: false,

  init() {
    this.hamburger = document.querySelector('.header__hamburger');
    this.mobileMenu = document.querySelector('.header__mobile-menu');
    this.body = document.body;

    if (!this.hamburger || !this.mobileMenu) return;

    this.bindEvents();
  },

  bindEvents() {
    this.hamburger.addEventListener('click', () => this.toggle());

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && this.isOpen) {
        this.close();
      }
    });

    const mobileLinks = this.mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => this.close());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
        this.hamburger.focus();
      }
    });
  },

  toggle() {
    this.isOpen ? this.close() : this.open();
  },

  open() {
    this.isOpen = true;
    this.mobileMenu.classList.add('is-open');
    this.hamburger.classList.add('is-active');
    this.body.classList.add('menu-open');
    this.hamburger.setAttribute('aria-expanded', 'true');
    this.hamburger.setAttribute('aria-label', 'Close menu');
  },

  close() {
    this.isOpen = false;
    this.mobileMenu.classList.remove('is-open');
    this.hamburger.classList.remove('is-active');
    this.body.classList.remove('menu-open');
    this.hamburger.setAttribute('aria-expanded', 'false');
    this.hamburger.setAttribute('aria-label', 'Open menu');
  }
};
