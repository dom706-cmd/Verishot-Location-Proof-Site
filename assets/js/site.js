(() => {
  const btn = document.querySelector('.nav__toggle');
  const nav = document.querySelector('.nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('nav--open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Service worker (skip if not supported)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }
})();