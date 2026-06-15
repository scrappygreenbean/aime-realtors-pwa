/* =====================================================================
   Flip cards — tap to flip on touch, click to navigate on desktop.
   (Hover-flip is pure CSS; this handles touch + keyboard + click-through.)
   ===================================================================== */
(function () {
  var noHover = !(window.matchMedia && window.matchMedia('(hover: hover)').matches);

  function go(card) {
    var href = card.getAttribute('data-href');
    if (!href || href === '#') return;
    if (card.getAttribute('data-target') === '_blank') {
      window.open(href, '_blank', 'noopener');
    } else {
      window.location.href = href;
    }
  }

  function bind() {
    document.querySelectorAll('.flip-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;        // real links navigate themselves
        if (noHover) { card.classList.toggle('flipped'); return; }
        go(card);                                  // desktop: click anywhere navigates
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (noHover) card.classList.toggle('flipped'); else go(card);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();

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
