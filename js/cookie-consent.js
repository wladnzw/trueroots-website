/**
 * Cookie Consent Module
 * Manages GDPR/RGPD cookie consent sitewide
 * - Shows consent banner on all pages if no consent stored
 * - Blocks Fillout iframe loading until consent is given (catering page only)
 * - Dispatches 'cookie:consent' CustomEvent so Analytics and other modules can respond
 * Uses I18n.t() for translated strings
 */

const CookieConsent = {
  STORAGE_KEY: 'tr_cookie_consent',
  EXPIRY_DAYS: 365,
  banner: null,
  preferencesPanel: null,

  init() {
    if (this.hasValidConsent()) {
      // Consent already given — load Fillout if on catering page
      this.loadFillout();
      return;
    }

    // No consent yet — block Fillout on catering page and show banner sitewide
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
          I18n.t('cookie.bannerText', 'We use cookies for site analytics and to enable our catering form.') + ' ' +
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
          '<div class="cookie-banner__preference-item">' +
            '<div class="cookie-banner__preference-info">' +
              '<span class="cookie-banner__preference-label" data-analytics-label>' + I18n.t('cookie.analyticsLabel', 'Analytics Cookies') + '</span>' +
              '<span class="cookie-banner__preference-desc" data-analytics-desc>' + I18n.t('cookie.analyticsDesc', 'Helps us understand how the site is used. All data is anonymised.') + '</span>' +
            '</div>' +
            '<label class="cookie-banner__toggle" aria-label="' + I18n.t('cookie.analyticsLabel', 'Analytics Cookies') + '">' +
              '<input type="checkbox" data-cookie-analytics checked>' +
              '<span class="cookie-banner__toggle-slider"></span>' +
            '</label>' +
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
      textEl.innerHTML = I18n.t('cookie.bannerText', 'We use cookies for site analytics and to enable our catering form.') + ' <a href="cookie-policy.html">' + I18n.t('cookie.learnMore', 'Learn more') + '</a>';
    }

    var manageBtn = this.banner.querySelector('[data-cookie-manage]');
    if (manageBtn) manageBtn.textContent = I18n.t('cookie.manage', 'Manage');

    var acceptBtn = this.banner.querySelector('[data-cookie-accept]');
    if (acceptBtn) acceptBtn.textContent = I18n.t('cookie.acceptAll', 'Accept All');

    var labelEl = this.banner.querySelector('.cookie-banner__preference-label');
    if (labelEl) labelEl.textContent = I18n.t('cookie.essentialLabel', 'Essential Cookies');

    var statusEl = this.banner.querySelector('.cookie-banner__preference-status');
    if (statusEl) statusEl.textContent = I18n.t('cookie.required', 'Required');

    var analyticsLabelEl = this.banner.querySelector('[data-analytics-label]');
    if (analyticsLabelEl) analyticsLabelEl.textContent = I18n.t('cookie.analyticsLabel', 'Analytics Cookies');

    var analyticsDescEl = this.banner.querySelector('[data-analytics-desc]');
    if (analyticsDescEl) analyticsDescEl.textContent = I18n.t('cookie.analyticsDesc', 'Helps us understand how the site is used. All data is anonymised.');

    var analyticsToggle = this.banner.querySelector('.cookie-banner__toggle');
    if (analyticsToggle) analyticsToggle.setAttribute('aria-label', I18n.t('cookie.analyticsLabel', 'Analytics Cookies'));

    var saveBtn = this.banner.querySelector('[data-cookie-save]');
    if (saveBtn) saveBtn.textContent = I18n.t('cookie.save', 'Save Preferences');

    this.banner.setAttribute('aria-label', I18n.t('cookie.ariaLabel', 'Cookie consent'));
  },

  acceptAll() {
    this.saveConsent('all');
    this.hideBanner();
    this.loadFillout();
    document.dispatchEvent(new CustomEvent('cookie:consent', { detail: { type: 'all' } }));
  },

  savePreferences() {
    const analyticsChecked = this.banner.querySelector('[data-cookie-analytics]').checked;
    const type = analyticsChecked ? 'all' : 'essential';
    this.saveConsent(type);
    this.hideBanner();
    this.loadFillout();
    document.dispatchEvent(new CustomEvent('cookie:consent', { detail: { type: type } }));
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
