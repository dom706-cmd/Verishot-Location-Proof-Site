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

  // Lazy-load video source when in view to reduce initial load
  const v = document.querySelector('video[data-lazy]');
  if(v && 'IntersectionObserver' in window){
    const src = v.getAttribute('data-src');
    const obs = new IntersectionObserver((entries)=>{
      if(entries.some(e=>e.isIntersecting)){
        v.removeAttribute('data-lazy');
        const s = document.createElement('source');
        s.src = src;
        // Let the browser infer type; MOV is ok in Safari; replace with mp4 for best compatibility
        v.appendChild(s);
        v.load();
        obs.disconnect();
      }
    }, {rootMargin:'200px'});
    obs.observe(v);
  }
})();