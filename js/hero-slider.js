/**
 * Hero Background Slider
 * Auto-rotates 4 background images every 3 seconds
 * Supports manual navigation via pagination dots
 */

const HeroSlider = {
  currentSlide: 0,
  totalSlides: 4,
  autoRotateInterval: null,
  transitionDuration: 800,
  autoRotateDelay: 4000,

  init() {
    this.backgrounds = document.querySelectorAll('.hero__bg');
    this.dots = document.querySelectorAll('.hero__dot');

    if (!this.backgrounds.length || !this.dots.length) return;

    this.totalSlides = this.backgrounds.length;
    this.bindEvents();
    this.startAutoRotate();
  },

  bindEvents() {
    this.dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.currentTarget.dataset.slide);
        this.goToSlide(slideIndex);
        this.resetAutoRotate();
      });
    });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => this.pauseAutoRotate());
      heroSection.addEventListener('mouseleave', () => this.startAutoRotate());
    }
  },

  goToSlide(index) {
    if (index === this.currentSlide) return;

    this.backgrounds[this.currentSlide].classList.remove('hero__bg--active');
    this.dots[this.currentSlide].classList.remove('hero__dot--active');
    this.dots[this.currentSlide].removeAttribute('aria-current');

    this.currentSlide = index;

    this.backgrounds[this.currentSlide].classList.add('hero__bg--active');
    this.dots[this.currentSlide].classList.add('hero__dot--active');
    this.dots[this.currentSlide].setAttribute('aria-current', 'true');
  },

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  },

  startAutoRotate() {
    if (this.autoRotateInterval) return;
    this.autoRotateInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoRotateDelay);
  },

  pauseAutoRotate() {
    clearInterval(this.autoRotateInterval);
    this.autoRotateInterval = null;
  },

  resetAutoRotate() {
    this.pauseAutoRotate();
    this.startAutoRotate();
  }
};
