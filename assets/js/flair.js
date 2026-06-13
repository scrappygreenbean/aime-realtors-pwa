/* =====================================================================
   Flair — gentle scroll-reveal entrances. Progressive enhancement:
   without JS (or with reduced-motion) everything shows normally.
   ===================================================================== */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  root.classList.add('flair-on');

  function reveal() {
    var targets = document.querySelectorAll(
      '.channel-tile, .emp-card, .value-cell, .section-head, .page-hero p, .detail-panel'
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      // subtle stagger, capped so later items don't lag
      el.style.transitionDelay = (Math.min(i, 7) * 55) + 'ms';
      io.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal);
  } else {
    reveal();
  }
})();
