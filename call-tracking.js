/* Water Serpent Plumbing — site-wide call-tap tracking (performance-friendly)
   Fires the Google Ads "Website Call Click" conversion when a visitor taps any
   "Call" (tel:) link. The Google tag is loaded only on the visitor's FIRST
   interaction (scroll / tap / move / key), so it stays out of the page-load
   critical path and does not affect Core Web Vitals (LCP/TBT).
   Account AW-16673259231 | Conversion label bjI0COqbp7gcEN_9to4- */
(function () {
  var loaded = false;

  function loadGtag() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { dataLayer.push(arguments); };
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16673259231';
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', 'AW-16673259231');
  }

  // Load the Google tag on the first real user interaction (keeps it off the
  // initial render path; bots/Lighthouse never interact, so it never loads for them)
  var firstEvents = ['scroll', 'pointerdown', 'touchstart', 'keydown', 'mousemove'];
  function onFirstInteraction() {
    loadGtag();
    firstEvents.forEach(function (e) {
      window.removeEventListener(e, onFirstInteraction, { passive: true });
    });
  }
  firstEvents.forEach(function (e) {
    window.addEventListener(e, onFirstInteraction, { passive: true });
  });

  // Bind every tel: link so a tap records the conversion (loads the tag first if
  // it somehow hasn't been; gtag() queues the event in dataLayer until ready)
  function bindTelLinks() {
    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
      if (link.dataset.ctBound) return;
      link.dataset.ctBound = '1';
      link.addEventListener('click', function () {
        loadGtag();
        window.gtag('event', 'conversion', {
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
