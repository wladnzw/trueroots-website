/**
 * Analytics Module
 * Manages Google Analytics 4 loading with GDPR/RGPD consent
 * Only loads GA4 when user has accepted analytics cookies (type === 'all')
 * Listens for cookie:consent events dispatched by CookieConsent module
 */

const Analytics = {
  MEASUREMENT_ID: 'G-5E39PEVN3Z',
  loaded: false,

  init() {
    // If consent was already given in a previous visit, load immediately
    const consent = this.getConsent();
    if (consent && consent.type === 'all') {
      this.load();
      return;
    }

    // Otherwise wait for user to accept analytics cookies
    document.addEventListener('cookie:consent', (e) => {
      if (e.detail && e.detail.type === 'all') {
        this.load();
      }
    });
  },

  getConsent() {
    try {
      return JSON.parse(localStorage.getItem('tr_cookie_consent'));
    } catch {
      return null;
    }
  },

  load() {
    if (this.loaded) return;
    this.loaded = true;

    // Inject gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.MEASUREMENT_ID;
    document.head.appendChild(script);

    // Initialise dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', this.MEASUREMENT_ID);
  }
};
