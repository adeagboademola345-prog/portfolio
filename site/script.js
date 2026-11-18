(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- header + progress ---------- */
  const bar = $('#bar');
  const progress = $('#progress');

  const onScroll = () => {
    if (bar) bar.classList.toggle('is-stuck', window.scrollY > 8);
    if (progress) {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = Math.min(100, Math.max(0, pct)) + '%';
    }
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }, { passive: true });
  onScroll();

  /* ---------- drawer ---------- */
  const menuBtn = $('#menuBtn');
  const drawer = $('#drawer');
  let lastFocus = null;

  const openDrawer = () => {
    if (!drawer || !menuBtn) return;
    lastFocus = document.activeElement;
    drawer.hidden = false;
    document.body.classList.add('no-scroll');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Close menu');
    requestAnimationFrame(() => drawer.classList.add('is-open'));
    const first = drawer.querySelector('a');
    if (first) first.focus({ preventScroll: true });
  };

  const closeDrawer = () => {
    if (!drawer || !menuBtn) return;
    drawer.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
    const hide = () => { drawer.hidden = true; };
    reduce.matches ? hide() : setTimeout(hide, 320);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  };

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      menuBtn.getAttribute('aria-expanded') === 'true' ? closeDrawer() : openDrawer();
    });
    $$('a', drawer).forEach((a) => a.addEventListener('click', closeDrawer));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !drawer.hidden) closeDrawer();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && !drawer.hidden) closeDrawer();
    });
  }

  /* ---------- active nav ---------- */
  const navLinks = $$('.bar-nav a').filter((a) => (a.getAttribute('href') || '').startsWith('#'));
  const sections = navLinks
    .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- reveals ---------- */
  const revealTargets = $$(
    '.sec-head, .group-head, .card, .role, .about-foot, .cv, .svc li, .process, .steps li, .contact-grid > *, .portrait'
  );

  if (revealTargets.length) {
    if (reduce.matches || !('IntersectionObserver' in window)) {
      revealTargets.forEach((el) => el.classList.add('reveal', 'in'));
    } else {
      revealTargets.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = Math.min(i * 30, 180) + 'ms';
      });
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      revealTargets.forEach((el) => io.observe(el));
      // safety: anything still hidden after load + 2s
      setTimeout(() => revealTargets.forEach((el) => el.classList.add('in')), 2000);
    }
  }

  /* ---------- contact title underline ---------- */
  const contactTitle = $('.contact-title');
  if (contactTitle) {
    if (!('IntersectionObserver' in window)) contactTitle.classList.add('in');
    else {
      const tio = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { contactTitle.classList.add('in'); obs.disconnect(); }
        });
      }, { threshold: 0.4 });
      tio.observe(contactTitle);
    }
  }

  /* ---------- copy email ---------- */
  const copyBtn = $('#copyEmail');
  const email = 'adeagboademola345@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      copyBtn.textContent = 'Copied';
      copyBtn.classList.add('is-done');
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('is-done');
      }, 1800);
    });
  }

  /* ---------- welcome video ---------- */
  const playBtn = $('#playBtn');
  const video = $('#welcome');
  const portrait = $('.portrait');

  if (playBtn && video && portrait) {
    const label = $('.play-label', playBtn);

    playBtn.addEventListener('click', () => {
      if (video.paused) {
        portrait.classList.add('is-playing');
        video.play().catch(() => portrait.classList.remove('is-playing'));
        if (label) label.textContent = 'Pause';
      } else {
        video.pause();
        if (label) label.textContent = 'Get to know me';
      }
    });

    video.addEventListener('pause', () => {
      if (label) label.textContent = 'Get to know me';
    });
    video.addEventListener('play', () => {
      if (label) label.textContent = 'Pause';
    });
    video.addEventListener('ended', () => {
      portrait.classList.remove('is-playing');
      if (label) label.textContent = 'Get to know me';
    });
  }

  /* ---------- motion extras ---------- */
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (fine.matches && !reduce.matches) {
    const tilt = (el, max, lift, guard) => {
      let raf = 0;
      let px = 0;
      let py = 0;

      const apply = () => {
        raf = 0;
        el.style.transform =
          `perspective(1100px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(${lift}px)`;
      };

      const leave = () => {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        el.classList.remove('is-tilting');
        el.style.transform = '';
      };

      const move = (e) => {
        if (reduce.matches) return;
        if (guard && guard()) { leave(); return; }
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        px = (e.clientX - r.left) / r.width - .5;
        py = (e.clientY - r.top) / r.height - .5;
        if (!raf) raf = requestAnimationFrame(apply);
      };

      el.addEventListener('pointerenter', () => {
        if (!reduce.matches && !(guard && guard())) el.classList.add('is-tilting');
      });
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      el.addEventListener('pointercancel', leave);
      el.addEventListener('blur', leave);
      reduce.addEventListener('change', () => { if (reduce.matches) leave(); });
    };

    const portraitFrame = $('.portrait-frame');
    if (portraitFrame) tilt(portraitFrame, 3.4, 0);

    $$('.folder-cover').forEach((el) =>
      tilt(el, 2.2, -3, () => el.closest('.folder').getAttribute('data-open') === 'true')
    );

    $$('.proto-card').forEach((el) => tilt(el, 3.6, -3));
  }

  /* ---------- enquiry form ---------- */
  const form = $('#enquiry');
  const hint = $('#formHint');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#f-name');
      const mail = $('#f-email');
      const msg = $('#f-msg');
      const type = $('#f-type');

      const fail = (field, text) => {
        if (hint) { hint.textContent = text; hint.classList.add('is-error'); }
        if (field) field.focus();
      };

      if (!name || !name.value.trim()) return fail(name, 'Please add your name.');
      if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value.trim())) {
        return fail(mail, 'Please add a valid email.');
      }
      if (!msg || !msg.value.trim()) return fail(msg, 'Please add a short message.');

      const subject = `Portfolio enquiry — ${type ? type.value : 'Project'}`;
      const body = `Name: ${name.value.trim()}\nEmail: ${mail.value.trim()}\nAbout: ${type ? type.value : ''}\n\n${msg.value.trim()}`;

      if (hint) {
        hint.textContent = 'Opening your email app…';
        hint.classList.remove('is-error');
      }
      window.location.href =
        `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });

    $$('input, textarea, select', form).forEach((field) => {
      field.addEventListener('input', () => {
        if (hint) { hint.textContent = 'Opens in your email app.'; hint.classList.remove('is-error'); }
      });
    });
  }

  /* ---------- year ---------- */
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- image fallback ---------- */
  $$('img[data-cover]').forEach((img) => {
    img.addEventListener('error', () => {
      const parent = img.parentElement;
      if (!parent) return;
      parent.classList.add('is-cover');
      parent.dataset.cover = img.dataset.cover;
      img.remove();
    });
  });
})();
