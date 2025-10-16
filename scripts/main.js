// Maison EVART — Coming Soon interactions
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Grain noise canvas
  const grainCanvas = document.getElementById('grainCanvas');
  const ctx = grainCanvas?.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    if (!grainCanvas || !ctx) return;
    const { innerWidth: w, innerHeight: h } = window;
    grainCanvas.width = Math.floor(w * DPR);
    grainCanvas.height = Math.floor(h * DPR);
    grainCanvas.style.width = w + 'px';
    grainCanvas.style.height = h + 'px';
  }

  function makeGrain() {
    if (!grainCanvas || !ctx) return;
    const { width: w, height: h } = grainCanvas;
    const imageData = ctx.createImageData(w, h);
    const buffer32 = new Uint32Array(imageData.data.buffer);
    for (let i = 0; i < buffer32.length; i++) {
      // random grayscale with subtle alpha
      const val = Math.random() * 255 | 0;
      buffer32[i] = (255 << 24) | (val << 16) | (val << 8) | val;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  let rafId, lastTime = 0;
  function animateGrain(ts = 0) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (ts - lastTime > 120) { // refresh ~8fps for subtle movement
      makeGrain();
      lastTime = ts;
    }
    rafId = requestAnimationFrame(animateGrain);
  }

  resizeCanvas();
  makeGrain();
  animateGrain();
  window.addEventListener('resize', () => { resizeCanvas(); makeGrain(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else rafId = requestAnimationFrame(animateGrain);
  });

  // Parallax spotlight following the cursor
  const root = document.documentElement;
  let pointerX = 50, pointerY = 40;
  function setSpotlight(xPct, yPct) {
    root.style.setProperty('--spot-x', xPct + '%');
    root.style.setProperty('--spot-y', yPct + '%');
  }
  setSpotlight(pointerX, pointerY);

  window.addEventListener('pointermove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    pointerX = x; pointerY = y;
    setSpotlight(x, y);
  }, { passive: true });

  // Form handling (client-side only for now)
  const form = document.getElementById('notifyForm');
  const email = document.getElementById('email');
  const message = document.getElementById('formMessage');

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const value = email?.value.trim();
    if (!value || !isValidEmail(value)) {
      message.textContent = 'Please enter a valid email address.';
      message.style.color = '#e8b4b4';
      return;
    }

    message.textContent = 'Adding you to the list…';
    message.style.color = '';

    // Placeholder: Replace with real API endpoint or service (e.g., Mailchimp/Resend/SupaBase)
    await new Promise((r) => setTimeout(r, 900));

    message.textContent = 'You are on the list. Merci.';
    email.value = '';
  });
})();
