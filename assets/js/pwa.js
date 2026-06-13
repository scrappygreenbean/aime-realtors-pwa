/* =====================================================================
   PWA wiring — service-worker registration + custom install button.
   Shared by index.html and ai-employees.html. No framework.
   ===================================================================== */
(function () {
  // Register the service worker (only works over https:// or localhost).
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function (err) {
        console.warn('[AIME] Service worker registration failed:', err);
      });
    });
  }

  // Custom "Install app" button driven by beforeinstallprompt.
  var deferredPrompt = null;
  var btn = document.getElementById('installBtn');

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    if (btn) btn.hidden = false;
  });

  if (btn) {
    btn.addEventListener('click', function () {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(function () {
        deferredPrompt = null;
        btn.hidden = true;
      });
    });
  }

  window.addEventListener('appinstalled', function () {
    if (btn) btn.hidden = true;
    deferredPrompt = null;
  });
})();
