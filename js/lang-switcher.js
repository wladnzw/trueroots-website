/**
 * Language Switcher Module
 * Injects EN/ES toggle into header (desktop + mobile)
 * Works with I18n module for language switching
 */

const LangSwitcher = {
  init() {
    this.injectDesktop();
    this.injectMobile();
    this.updateActiveState();

    document.addEventListener('langchange', () => this.updateActiveState());
  },

  /**
   * Inject switcher into desktop header (inside .header__right)
   */
  injectDesktop() {
    var headerRight = document.querySelector('.header__right');
    if (!headerRight) return;

    var langEl = this.createSwitcherElement('header__lang');
    headerRight.appendChild(langEl);
  },

  /**
   * Inject switcher into mobile menu overlay (after .header__mobile-hours)
   */
  injectMobile() {
    var mobileHours = document.querySelector('.header__mobile-hours');
    if (!mobileHours) return;

    var langEl = this.createSwitcherElement('header__mobile-lang');
    mobileHours.parentNode.insertBefore(langEl, mobileHours.nextSibling);
  },

  /**
   * Create a switcher element with EN | ES buttons
   */
  createSwitcherElement(className) {
    var wrapper = document.createElement('div');
    wrapper.className = className;
    wrapper.innerHTML =
      '<button class="lang-btn" data-lang="en" aria-label="English">EN</button>' +
      '<span class="lang-divider">|</span>' +
      '<button class="lang-btn" data-lang="es" aria-label="Espa\u00f1ol">ES</button>';

    wrapper.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-lang]');
      if (btn) {
        I18n.setLanguage(btn.dataset.lang);
      }
    });

    return wrapper;
  },

  /**
   * Highlight the active language button
   */
  updateActiveState() {
    var buttons = document.querySelectorAll('.lang-btn');
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].dataset.lang === I18n.currentLang) {
        buttons[i].classList.add('is-active');
      } else {
        buttons[i].classList.remove('is-active');
      }
    }
  }
};
