/* Infyniq Solutions — interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ */
  /* Preloader                                                           */
  /* ------------------------------------------------------------------ */
  const preloader = $('#preloader');
  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch {} }
  };
  const seen = store.get('infyniq-loaded');
  function finishPreloader() {
    if (!preloader) return;
    preloader.classList.add('is-done');
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.add('is-loaded');
    setTimeout(() => preloader.remove(), 1000);
  }
  if (preloader) {
    if (reduceMotion || seen) {
      preloader.remove();
      document.body.classList.add('is-loaded');
    } else {
      document.documentElement.classList.add('no-scroll');
      const count = $('#preloader-count');
      const bar = $('#preloader-bar');
      const start = performance.now();
      const duration = 1500;
      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = Math.round(eased * 100);
        if (count) count.textContent = String(v).padStart(3, '0');
        if (bar) bar.style.transform = `scaleX(${eased})`;
        if (t < 1) requestAnimationFrame(tick);
        else {
          store.set('infyniq-loaded', '1');
          setTimeout(finishPreloader, 180);
        }
      }
      requestAnimationFrame(tick);
      // Safety: never leave the page blocked.
      setTimeout(finishPreloader, 4000);
    }
  } else {
    document.body.classList.add('is-loaded');
  }

  /* ------------------------------------------------------------------ */
  /* Header / mobile menu                                                */
  /* ------------------------------------------------------------------ */
  const header = $('.site-header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggle = $('.menu-toggle');
  const mobileMenu = $('#mobile-menu');
  function setMenu(open) {
    if (!toggle || !mobileMenu) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.documentElement.classList.toggle('no-scroll', open);
    if (open) { const first = $('a', mobileMenu); first && first.focus(); }
  }
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    $$('a', mobileMenu).forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') setMenu(false);
      if (e.key === 'Tab' && mobileMenu.classList.contains('is-open')) {
        const focusables = [toggle, ...$$('a', mobileMenu)];
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  // Mark current page in nav
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('.nav a, .mobile-menu a, .footer-grid a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href && href === path && !a.classList.contains('script-link')) a.setAttribute('aria-current', 'page');
  });

  /* ------------------------------------------------------------------ */
  /* Duplicate marquee groups for seamless loop                          */
  /* ------------------------------------------------------------------ */
  $$('.marquee, .reel__track').forEach(track => {
    const group = track.firstElementChild;
    if (!group) return;
    const clone = group.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    $$('a', clone).forEach(a => a.setAttribute('tabindex', '-1'));
    track.appendChild(clone);
  });

  /* ------------------------------------------------------------------ */
  /* Scroll reveal                                                       */
  /* ------------------------------------------------------------------ */
  const revealEls = $$('.reveal, .line-reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* Counters */
  const counters = $$('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        if (reduceMotion) { el.textContent = target + suffix; cio.unobserve(el); return; }
        const t0 = performance.now();
        const dur = 1400;
        const step = now => {
          const p = Math.min(1, (now - t0) / dur);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * e) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(c => cio.observe(c));
  }

  /* ------------------------------------------------------------------ */
  /* Testimonial stack                                                   */
  /* ------------------------------------------------------------------ */
  const stack = $('#testimonial-stack');
  if (stack) {
    const cards = $$('.stack__card', stack);
    const count = $('#stack-count');
    let idx = 0;
    let busy = false;
    const render = () => {
      cards.forEach((c, i) => c.dataset.pos = String((i - idx + cards.length) % cards.length));
      if (count) count.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    };
    const next = () => {
      if (busy) return; busy = true;
      const top = cards[idx];
      top.classList.add('is-leaving');
      setTimeout(() => {
        top.classList.remove('is-leaving');
        idx = (idx + 1) % cards.length;
        render();
        busy = false;
      }, reduceMotion ? 0 : 450);
    };
    const prev = () => { if (busy) return; idx = (idx - 1 + cards.length) % cards.length; render(); };
    render();
    $('#stack-next')?.addEventListener('click', next);
    $('#stack-prev')?.addEventListener('click', prev);
    stack.addEventListener('click', e => { if (e.target.closest('.stack__card[data-pos="0"]')) next(); });
    let auto = !reduceMotion ? setInterval(next, 7000) : null;
    stack.addEventListener('mouseenter', () => { clearInterval(auto); auto = null; });
    stack.addEventListener('mouseleave', () => { if (!reduceMotion && !auto) auto = setInterval(next, 7000); });
  }

  /* ------------------------------------------------------------------ */
  /* Portfolio filters                                                   */
  /* ------------------------------------------------------------------ */
  const filters = $$('.filter');
  if (filters.length) {
    const cards = $$('.work-grid .project-card');
    const empty = $('#work-empty');
    filters.forEach(btn => btn.addEventListener('click', () => {
      filters.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('is-active'); btn.setAttribute('aria-pressed', 'true');
      const f = btn.dataset.filter;
      let shown = 0;
      cards.forEach(c => {
        const match = f === 'all' || (c.dataset.tags || '').split(' ').includes(f);
        c.classList.toggle('is-hidden', !match);
        if (match) { shown++; c.classList.add('is-visible'); }
      });
      if (empty) empty.hidden = shown > 0;
    }));
  }

  /* ------------------------------------------------------------------ */
  /* Service accordion                                                   */
  /* ------------------------------------------------------------------ */
  $$('.service').forEach((service, i) => {
    const head = $('.service__head', service);
    const body = $('.service__body', service);
    if (!head || !body) return;
    const id = `service-body-${i + 1}`;
    body.id = id;
    head.setAttribute('aria-controls', id);
    const setOpen = open => {
      service.classList.toggle('is-open', open);
      head.setAttribute('aria-expanded', String(open));
      body.setAttribute('aria-hidden', String(!open));
    };
    setOpen(i === 0);
    head.addEventListener('click', () => {
      const open = !service.classList.contains('is-open');
      $$('.service').forEach(s => {
        if (s !== service) {
          s.classList.remove('is-open');
          $('.service__head', s)?.setAttribute('aria-expanded', 'false');
          $('.service__body', s)?.setAttribute('aria-hidden', 'true');
        }
      });
      setOpen(open);
    });
  });

  /* ------------------------------------------------------------------ */
  /* Toast + copy                                                        */
  /* ------------------------------------------------------------------ */
  const toast = $('#toast');
  let toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
  }
  $$('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); showToast('Copied to clipboard'); } catch { showToast(text); }
      ta.remove();
    }
  }));

  /* ------------------------------------------------------------------ */
  /* Contact form → opens a pre-filled email (no backend required)       */
  /* ------------------------------------------------------------------ */
  const form = $('#contact-form');
  if (form) {
    const fields = {
      name: { el: $('#f-name'), test: v => v.trim().length >= 2, msg: 'Please enter your name.' },
      email: { el: $('#f-email'), test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email address.' },
      phone: { el: $('#f-phone'), test: v => /^[+\d][\d\s\-()]{6,}$/.test(v.trim()), msg: 'Please enter a valid contact number.' },
      service: { el: $('#f-service'), test: v => v !== '', msg: 'Please choose a service.' },
      message: { el: $('#f-message'), test: v => v.trim().length >= 10, msg: 'Tell us a little more (at least 10 characters).' }
    };
    const setError = (f, msg) => {
      const wrap = f.el.closest('.field');
      wrap.classList.toggle('is-invalid', !!msg);
      const err = $('.error', wrap);
      if (err) err.textContent = msg || '';
      f.el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    };
    Object.values(fields).forEach(f => f.el.addEventListener('input', () => { if (f.test(f.el.value)) setError(f, ''); }));
    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true, first = null;
      Object.values(fields).forEach(f => {
        const valid = f.test(f.el.value);
        setError(f, valid ? '' : f.msg);
        if (!valid) { ok = false; first = first || f.el; }
      });
      if (!ok) { first.focus(); return; }
      const v = Object.fromEntries(Object.entries(fields).map(([k, f]) => [k, f.el.value.trim()]));
      const subject = `New project enquiry — ${v.service} — ${v.name}`;
      const body = [
        `Name: ${v.name}`, `Email: ${v.email}`, `Phone: ${v.phone}`, `Service: ${v.service}`, '',
        'Project details:', v.message, '', '— Sent from infyniq portfolio website'
      ].join('\n');
      const mailto = `mailto:info@infyniq.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const link = $('#mailto-link');
      if (link) link.href = mailto;
      const success = $('#form-success');
      if (success) { success.classList.add('is-visible'); success.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' }); }
      // Try to open the user's mail client automatically.
      window.location.href = mailto;
      showToast('Opening your email app…');
    });
  }

  /* ------------------------------------------------------------------ */
  /* Local time (Ahmedabad)                                              */
  /* ------------------------------------------------------------------ */
  const timeEl = $('#local-time');
  if (timeEl) {
    const fmt = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true });
    const update = () => { timeEl.textContent = `Ahmedabad, IN — ${fmt.format(new Date())} IST`; };
    update(); setInterval(update, 30000);
  }
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Back to top */
  $$('.to-top').forEach(b => b.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); }));

  /* ------------------------------------------------------------------ */
  /* Custom cursor (desktop only)                                        */
  /* ------------------------------------------------------------------ */
  const cursor = $('#cursor');
  if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
    let x = 0, y = 0, tx = 0, ty = 0, raf;
    const loop = () => {
      x += (tx - x) * 0.22; y += (ty - y) * 0.22;
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; cursor.classList.add('is-active'); if (!raf) loop(); }, { passive: true });
    document.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
    $$('a, button, summary, .stack__card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  }

  /* Smooth anchor offset for sticky header */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
      try { history.replaceState(null, '', id); } catch {}
    });
  });
})();
