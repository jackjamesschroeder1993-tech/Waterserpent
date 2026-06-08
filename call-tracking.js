/* Water Serpent Plumbing — site-wide call-tap tracking
   Fires the Google Ads "Website Call Click" conversion whenever a visitor
   taps any "Call" (tel:) link, on every page that includes this file.
   Account AW-16673259231 | Conversion label bjI0COqbp7gcEN_9to4-
   Loads gtag asynchronously so it never blocks page rendering. */
(function () {
  // Async-load the Google tag (non-blocking)
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16673259231';
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'AW-16673259231');

  // Count a conversion on every tap of a tel: link
  function bindTelLinks() {
    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
      if (link.dataset.ctBound) return;        // avoid double-binding
      link.dataset.ctBound = '1';
      link.addEventListener('click', function () {
        gtag('event', 'conversion', {
          'send_to': 'AW-16673259231/bjI0COqbp7gcEN_9to4-'
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindTelLinks);
  } else {
    bindTelLinks();
  }
})();
