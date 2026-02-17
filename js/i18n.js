/**
 * I18n Module
 * Client-side internationalization for TRUE ROOTS website
 * Default language: ES (embedded in HTML). EN loaded via JSON.
 */

const I18n = {
  STORAGE_KEY: 'tr_lang',
  DEFAULT_LANG: 'es',
  currentLang: 'es',
  translations: {},

  /**
   * Run immediately on script load (before DOMContentLoaded)
   * Sets <html lang> and adds loading class if non-default language
   */
  preInit() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.currentLang = (stored === 'en' || stored === 'es') ? stored : this.DEFAULT_LANG;
    document.documentElement.lang = this.currentLang;

    if (this.currentLang !== this.DEFAULT_LANG) {
      document.documentElement.classList.add('lang-loading');
      // Safety: remove loading class after 500ms even if fetch fails
      setTimeout(() => {
        document.documentElement.classList.remove('lang-loading');
      }, 500);
    }
  },

  /**
   * Async init called from main.js on DOMContentLoaded
   * Fetches translations if non-default language, then applies them
   */
  async init() {
    if (this.currentLang === this.DEFAULT_LANG) {
      // ES text is already in HTML, nothing to load
      return;
    }

    const page = this.detectPage();
    await this.loadTranslations(this.currentLang, page);
    this.applyTranslations();
    document.documentElement.classList.remove('lang-loading');
  },

  /**
   * Map current URL pathname to JSON filename
   */
  detectPage() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('privacy-policy')) return 'privacy-policy';
    if (path.includes('terms-of-service')) return 'terms-of-service';
    if (path.includes('legal-notice')) return 'legal-notice';
    if (path.includes('cookie-policy')) return 'cookie-policy';
    if (path.includes('catering')) return 'catering';
    return 'index';
  },

  /**
   * Fetch common.json + page-specific JSON, merge into translations
   */
  async loadTranslations(lang, page) {
    try {
      const [common, pageData] = await Promise.all([
        fetch('lang/' + lang + '/common.json').then(function(r) { return r.json(); }),
        fetch('lang/' + lang + '/' + page + '.json').then(function(r) { return r.json(); })
      ]);
      this.translations = Object.assign({}, common, pageData);
    } catch (err) {
      console.warn('I18n: Translation load failed:', err);
      document.documentElement.classList.remove('lang-loading');
    }
  },

  /**
   * Dot-notation key lookup: t('nav.home') → translations.nav.home
   * Returns the key itself if not found (fallback)
   */
  t(key, defaultValue) {
    var result = this.translations;
    var parts = key.split('.');
    for (var i = 0; i < parts.length; i++) {
      if (result == null) return (defaultValue != null) ? defaultValue : key;
      result = result[parts[i]];
    }
    return (result != null) ? result : (defaultValue != null) ? defaultValue : key;
  },

  /**
   * Walk the DOM and apply translations based on data-i18n attributes
   */
  applyTranslations() {
    // textContent replacements
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      var val = this.t(key);
      if (val !== key) els[i].textContent = val;
    }

    // innerHTML replacements (legal sections, elements with <br>, <a>, etc.)
    var htmlEls = document.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < htmlEls.length; j++) {
      var htmlKey = htmlEls[j].getAttribute('data-i18n-html');
      var htmlVal = this.t(htmlKey);
      if (htmlVal !== htmlKey) htmlEls[j].innerHTML = htmlVal;
    }

    // Attribute replacements (aria-label, alt, etc.)
    var attrEls = document.querySelectorAll('[data-i18n-attr]');
    for (var k = 0; k < attrEls.length; k++) {
      var pairs = attrEls[k].getAttribute('data-i18n-attr').split(';');
      for (var p = 0; p < pairs.length; p++) {
        var parts = pairs[p].split(':');
        if (parts.length === 2) {
          var attr = parts[0].trim();
          var attrKey = parts[1].trim();
          var attrVal = this.t(attrKey);
          if (attrVal !== attrKey) attrEls[k].setAttribute(attr, attrVal);
        }
      }
    }

    // Meta: title and description
    var titleVal = this.t('meta.title');
    if (titleVal !== 'meta.title') document.title = titleVal;

    var descVal = this.t('meta.description');
    if (descVal !== 'meta.description') {
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', descVal);
    }
  },

  /**
   * Switch language: save to localStorage, apply or reload
   */
  async setLanguage(lang) {
    if (lang === this.currentLang) return;

    localStorage.setItem(this.STORAGE_KEY, lang);
    this.currentLang = lang;
    document.documentElement.lang = lang;

    if (lang === this.DEFAULT_LANG) {
      // ES is embedded in HTML — reload to restore original text
      window.location.reload();
      return;
    }

    // Switching to EN: fetch and apply
    var page = this.detectPage();
    await this.loadTranslations(lang, page);
    this.applyTranslations();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }
};

// Pre-init runs immediately when script loads
I18n.preInit();
