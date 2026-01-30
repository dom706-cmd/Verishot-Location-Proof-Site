(function(){
  // Set current year
  const y = document.querySelectorAll('[data-year]');
  y.forEach(el => el.textContent = new Date().getFullYear());

  // Smooth hash focus for accessibility
  window.addEventListener('hashchange', () => {
    const id = location.hash.replace('#','');
    const el = document.getElementById(id);
    if(el){ el.setAttribute('tabindex','-1'); el.focus({preventScroll:true}); }
  });

  // Register service worker (optional, safe for SEO)
  if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(()=>{});
    });
  }
})();