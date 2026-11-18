(() => {
  'use strict';
  const doc = document;
  const root = doc.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Entrance */
  requestAnimationFrame(() => requestAnimationFrame(() => doc.body.classList.add('is-ready')));

  /* Theme toggle */
  const themeBtn = doc.getElementById('themeBtn');
  const meta = doc.querySelector('meta[name="theme-color"]');
  const applyTheme = (t) => {
    root.setAttribute('data-theme', t);
    if (meta) meta.setAttribute('content', t === 'dark' ? '#060606' : '#f4ece3');
    if (themeBtn) themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  };
  applyTheme(root.getAttribute('data-theme') || 'dark');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* Header state */
  const bar = doc.getElementById('bar');
  const onScroll = () => bar.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile drawer */
  const menuBtn = doc.getElementById('menuBtn');
  const drawer = doc.getElementById('drawer');
  const setMenu = (open) => {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    drawer.hidden = !open;
  };
  menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* Active nav */
  const links = Array.from(doc.querySelectorAll('.nav a'));
  const sections = links.map((a) => doc.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => navIO.observe(s));

    const revIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); revIO.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    doc.querySelectorAll('.reveal').forEach((el) => revIO.observe(el));
  } else {
    doc.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  }

  /* Hero parallax */
  const art = doc.querySelector('.hero-art');
  if (art && !reduce && window.matchMedia('(pointer: fine)').matches) {
    const busts = art.querySelectorAll('.bust');
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const tick = () => {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      busts.forEach((b) => { b.style.transform = `translate3d(${cx}px, ${cy + window.scrollY * 0.12}px, 0) scale(1.03)`; });
      raf = Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener('mousemove', (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * -18;
      ty = (e.clientY / window.innerHeight - 0.5) * -12;
      kick();
    }, { passive: true });
    window.addEventListener('scroll', kick, { passive: true });
  }

  /* Project rail arrows */
  const rail = doc.getElementById('rail');
  const step = () => {
    const c = rail.querySelector('.card');
    return c ? c.getBoundingClientRect().width + 18 : rail.clientWidth * 0.8;
  };
  doc.getElementById('workPrev').addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
  doc.getElementById('workNext').addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));

  /* Copy email */
  const copyBtn = doc.getElementById('copyEmail');
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('adeagboademola345@gmail.com');
      copyBtn.textContent = 'Copied';
    } catch (e) {
      copyBtn.textContent = 'Press and hold to copy';
    }
    setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2200);
  });

  /* Enquiry form → email app */
  const form = doc.getElementById('enquiry');
  const hint = doc.getElementById('formHint');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.elements.name, email = form.elements.email, msg = form.elements.message;
    let ok = true;
    [name, email, msg].forEach((f) => {
      const bad = !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
      f.classList.toggle('invalid', bad);
      if (bad) ok = false;
    });
    if (!ok) { hint.textContent = 'Please fill in your name, a valid email and a message.'; return; }
    const subject = `${form.elements.type.value} — from ${name.value.trim()}`;
    const body = `${msg.value.trim()}\n\n${name.value.trim()}\n${email.value.trim()}`;
    hint.textContent = 'Opening your email app…';
    window.location.href = `mailto:adeagboademola345@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  /* Year */
  const y = doc.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
