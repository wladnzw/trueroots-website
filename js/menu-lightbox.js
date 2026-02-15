/**
 * Menu Lightbox
 * Fullscreen image gallery for menu pages
 * Supports keyboard navigation, swipe, and smooth transitions
 */

const MenuLightbox = {
  currentIndex: 0,
  images: [
    'assets/Menu/1 - Food menu.png',
    'assets/Menu/2 - Hot Drinks menu.png',
    'assets/Menu/3 - Cold Drinks menu.png'
  ],
  isOpen: false,
  touchStartX: 0,
  touchEndX: 0,

  init() {
    this.lightbox = document.getElementById('menu-lightbox');
    if (!this.lightbox) return;

    this.overlay = this.lightbox.querySelector('.lightbox__overlay');
    this.closeBtn = this.lightbox.querySelector('.lightbox__close');
    this.prevBtn = this.lightbox.querySelector('.lightbox__prev');
    this.nextBtn = this.lightbox.querySelector('.lightbox__next');
    this.image = this.lightbox.querySelector('.lightbox__image');
    this.counter = this.lightbox.querySelector('.lightbox__counter');

    this.bindEvents();
  },

  bindEvents() {
    // Open triggers
    document.querySelectorAll('[data-open-menu]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Close
    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());

    // Navigation
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Touch swipe
    this.lightbox.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.lightbox.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  },

  open(index = 0) {
    this.currentIndex = index;
    this.isOpen = true;
    this.lightbox.classList.add('is-open');
    this.lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    this.showImage();
  },

  close() {
    this.isOpen = false;
    this.lightbox.classList.remove('is-open');
    this.lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  },

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.showImage();
  },

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.showImage();
  },

  showImage() {
    this.image.classList.remove('is-loaded');

    const img = new Image();
    img.onload = () => {
      this.image.src = this.images[this.currentIndex];
      this.image.alt = this.getImageName(this.currentIndex);
      requestAnimationFrame(() => {
        this.image.classList.add('is-loaded');
      });
    };
    img.src = this.images[this.currentIndex];

    this.counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
  },

  getImageName(index) {
    const names = ['Food Menu', 'Hot Drinks Menu', 'Cold Drinks Menu'];
    return names[index] || 'Menu';
  },

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    const threshold = 50;
    if (diff > threshold) this.next();
    if (diff < -threshold) this.prev();
  }
};
