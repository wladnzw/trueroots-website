/**
 * Cookie Consent Module
 * Manages GDPR cookie consent for the catering page (Fillout form)
 * Blocks Fillout iframe loading until user provides consent
 * Uses I18n.t() for translated strings
 */

const CookieConsent = {
  STORAGE_KEY: 'tr_cookie_consent',
  EXPIRY_DAYS: 365,
  banner: null,
  preferencesPanel: null,

  init() {
    // Only activate on the catering page
    if (!document.querySelector('[data-fillout-id]')) return;

    if (this.hasValidConsent()) {
      this.loadFillout();
      return;
    }

    // Block Fillout: remove the script and show placeholder
    this.blockFillout();
    this.injectBanner();
    this.bindEvents();

    // Show banner with slight delay for smooth entrance
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.banner.classList.add('is-visible');
      });
    });
  },

  hasValidConsent() {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
      if (!data || !data.timestamp) return false;
      const elapsed = Date.now() - data.timestamp;
      const maxAge = this.EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      return elapsed < maxAge;
    } catch {
      return false;
    }
  },

  saveConsent(type) {
    const data = {
      type: type,
      timestamp: Date.now()
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  },

  blockFillout() {
    // Remove the Fillout embed script to prevent loading
    const filloutScript = document.querySelector('script[src*="fillout.com"]');
    if (filloutScript) {
      filloutScript.remove();
    }

    // Replace the Fillout container with a placeholder
    const filloutDiv = document.querySelector('[data-fillout-id]');
    if (filloutDiv) {
      const placeholder = document.createElement('div');
      placeholder.className = 'fillout-placeholder';
      placeholder.innerHTML =
        '<div class="fillout-placeholder__icon"><img src="assets/icons/cookie-icon.svg" alt="Cookie" width="48" height="48"></div>' +
        '<p class="fillout-placeholder__title">' + I18n.t('cookie.placeholderTitle', 'This form requires cookies') + '</p>' +
        '<p class="fillout-placeholder__text">' + I18n.t('cookie.placeholderText', 'Please accept cookies to load the catering order form.') + '</p>';
      filloutDiv.parentNode.insertBefore(placeholder, filloutDiv);
      filloutDiv.style.display = 'none';
    }
  },

  loadFillout() {
    const filloutDiv = document.querySelector('[data-fillout-id]');
    if (!filloutDiv) return;

    // Remove placeholder if present
    const placeholder = document.querySelector('.fillout-placeholder');
    if (placeholder) {
      placeholder.remove();
    }

    // Show the Fillout container
    filloutDiv.style.display = '';

    // Load the Fillout embed script if not already loaded
    if (!document.querySelector('script[src*="fillout.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://server.fillout.com/embed/v1/';
      filloutDiv.parentNode.appendChild(script);
    }
  },

  injectBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', I18n.t('cookie.ariaLabel', 'Cookie consent'));
    banner.innerHTML =
      '<div class="cookie-banner__inner">' +
        '<p class="cookie-banner__text">' +
          I18n.t('cookie.bannerText', 'We use cookies to enable our catering form.') + ' ' +
          '<a href="cookie-policy.html">' + I18n.t('cookie.learnMore', 'Learn more') + '</a>' +
        '</p>' +
        '<div class="cookie-banner__actions">' +
          '<button class="cookie-banner__btn cookie-banner__btn--outline" data-cookie-manage>' + I18n.t('cookie.manage', 'Manage') + '</button>' +
          '<button class="cookie-banner__btn cookie-banner__btn--accept" data-cookie-accept>' + I18n.t('cookie.acceptAll', 'Accept All') + '</button>' +
        '</div>' +
        '<div class="cookie-banner__preferences">' +
          '<div class="cookie-banner__preference-item">' +
            '<span class="cookie-banner__preference-label">' + I18n.t('cookie.essentialLabel', 'Essential Cookies') + '</span>' +
            '<span class="cookie-banner__preference-status">' + I18n.t('cookie.required', 'Required') + '</span>' +
          '</div>' +
          '<button class="cookie-banner__save-btn" data-cookie-save>' + I18n.t('cookie.save', 'Save Preferences') + '</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);
    this.banner = banner;
    this.preferencesPanel = banner.querySelector('.cookie-banner__preferences');
  },

  bindEvents() {
    this.banner.addEventListener('click', (e) => {
      const target = e.target;

      if (target.closest('[data-cookie-accept]')) {
        this.acceptAll();
      } else if (target.closest('[data-cookie-manage]')) {
        this.togglePreferences();
      } else if (target.closest('[data-cookie-save]')) {
        this.savePreferences();
      }
    });

    // Update banner strings when language changes
    document.addEventListener('langchange', () => {
      if (this.banner && this.banner.parentNode) {
        this.updateBannerStrings();
      }
    });
  },

  updateBannerStrings() {
    if (!this.banner) return;

    var textEl = this.banner.querySelector('.cookie-banner__text');
    if (textEl) {
      textEl.innerHTML = I18n.t('cookie.bannerText', 'We use cookies to enable our catering form.') + ' <a href="cookie-policy.html">' + I18n.t('cookie.learnMore', 'Learn more') + '</a>';
    }

    var manageBtn = this.banner.querySelector('[data-cookie-manage]');
    if (manageBtn) manageBtn.textContent = I18n.t('cookie.manage', 'Manage');

    var acceptBtn = this.banner.querySelector('[data-cookie-accept]');
    if (acceptBtn) acceptBtn.textContent = I18n.t('cookie.acceptAll', 'Accept All');

    var labelEl = this.banner.querySelector('.cookie-banner__preference-label');
    if (labelEl) labelEl.textContent = I18n.t('cookie.essentialLabel', 'Essential Cookies');

    var statusEl = this.banner.querySelector('.cookie-banner__preference-status');
    if (statusEl) statusEl.textContent = I18n.t('cookie.required', 'Required');

    var saveBtn = this.banner.querySelector('[data-cookie-save]');
    if (saveBtn) saveBtn.textContent = I18n.t('cookie.save', 'Save Preferences');

    this.banner.setAttribute('aria-label', I18n.t('cookie.ariaLabel', 'Cookie consent'));
  },

  acceptAll() {
    this.saveConsent('all');
    this.hideBanner();
    this.loadFillout();
  },

  savePreferences() {
    // Essential cookies are always required, so saving is equivalent to accepting
    this.saveConsent('essential');
    this.hideBanner();
    this.loadFillout();
  },

  togglePreferences() {
    this.preferencesPanel.classList.toggle('is-open');
  },

  hideBanner() {
    this.banner.classList.remove('is-visible');
    // Remove from DOM after transition
    setTimeout(() => {
      if (this.banner && this.banner.parentNode) {
        this.banner.parentNode.removeChild(this.banner);
      }
    }, 400);
  }
};
