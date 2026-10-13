/* Aspirina · AspDip & AspMol — interações */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const lerp = (a, b, t) => a + (b - a) * t;

  $('#year').textContent = new Date().getFullYear();

  /* ---------- Texto do hero dividido em letras ---------- */
  $$('[data-split]').forEach(line => {
    const text = line.textContent;
    line.textContent = '';
    [...text].forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'char';
      s.style.setProperty('--i', i + (line.classList.contains('hero__mega-line--serif') ? 6 : 0));
      s.textContent = ch;
      line.appendChild(s);
    });
  });

  /* ---------- Abas ---------- */
  const views = $$('.view');
  const tabBtns = $$('.tabs__btn');
  const pill = $('.tabs__pill');
  const order = ['inicio', 'lancamentos', 'produtos', 'historia', 'duvidas'];
  let current = 'inicio';

  function movePill() {
    const btn = $(`.tabs__btn[data-go="${current}"]`);
    if (!btn) return;
    pill.style.width = btn.offsetWidth + 'px';
    pill.style.transform = `translateX(${btn.offsetLeft}px)`;
    // Mantém a aba ativa visível na barra inferior (mobile)
    const nav = btn.parentElement;
    if (nav.scrollWidth > nav.clientWidth) {
      nav.scrollTo({ left: btn.offsetLeft - (nav.clientWidth - btn.offsetWidth) / 2, behavior: 'smooth' });
    }
  }

  function go(id, { push = true, scrollTo = null } = {}) {
    if (!order.includes(id)) id = 'inicio';
    const finish = () => {
      if (scrollTo) {
        const t = document.getElementById(scrollTo);
        if (t) setTimeout(() => t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' }), 120);
      }
    };
    if (id === current) {
      if (!scrollTo) window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      finish();
      return;
    }
    const from = $(`.view[data-view="${current}"]`);
    const to = $(`.view[data-view="${id}"]`);
    current = id;
    document.body.dataset.tab = id;

    tabBtns.forEach(b => {
      const on = b.dataset.go === id;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on);
    });
    movePill();
    if (push) history.pushState({ id }, '', '#' + id);

    const swap = () => {
      from.classList.remove('is-active', 'is-leaving');
      window.scrollTo(0, 0);
      to.classList.add('is-active');
      observeReveals(to);
      onEnter(id);
      finish();
    };
    if (reduced) return swap();
    from.classList.add('is-leaving');
    setTimeout(swap, 200);
  }

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-go]');
    if (!el) return;
    e.preventDefault();
    if (el.dataset.product) setProduct(el.dataset.product);
    go(el.dataset.go, { scrollTo: el.dataset.scroll || null });
  });
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.tile[data-go]')) {
      e.preventDefault();
      e.target.click();
    }
  });
  // Setas no tablist
  $('.tabs').addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    const i = order.indexOf(current) + (e.key === 'ArrowRight' ? 1 : -1);
    const id = order[(i + order.length) % order.length];
    go(id);
    $(`.tabs__btn[data-go="${id}"]`).focus();
  });
  window.addEventListener('popstate', () => go(location.hash.slice(1) || 'inicio', { push: false }));
  window.addEventListener('resize', movePill);
  document.fonts?.ready.then(movePill);

  /* ---------- Reveal ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
      if (en.target.querySelector('.counter')) runCounter(en.target.querySelector('.counter'));
    });
  }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });

  function observeReveals(scope) {
    const groups = new Map();
    $$('.reveal:not(.in)', scope).forEach(el => {
      const p = el.parentElement;
      const n = groups.get(p) || 0;
      groups.set(p, n + 1);
      el.style.setProperty('--d', Math.min(n * 60, 300) + 'ms');
      io.observe(el);
    });
  }

  function runCounter(el) {
    if (el.dataset.done) return;
    el.dataset.done = 1;
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = target + suffix; return; }
    const start = target > 1000 ? target - 120 : 0;
    const dur = 1400;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      el.textContent = Math.round(start + (target - start) * eased) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Header + progresso ---------- */
  const topbar = $('.topbar');
  const prog = $('.scroll-progress span');
  const onScroll = () => {
    const y = scrollY;
    topbar.classList.toggle('is-scrolled', y > 24);
    const max = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Hero: parallax 3D com inércia ---------- */
  const hero = $('#hero');
  const stage = $('#stageInner');
  const pills = $$('.pill', stage);
  let tx = 0, ty = 0, cx = 0, cy = 0, heroRAF = null;

  if (fine && !reduced) {
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - .5;
      ty = (e.clientY - r.top) / r.height - .5;
      hero.style.setProperty('--mx', e.clientX - r.left + 'px');
      hero.style.setProperty('--my', e.clientY - r.top + 'px');
    });
    hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; });
  }

  function heroLoop() {
    cx = lerp(cx, tx, .06);
    cy = lerp(cy, ty, .06);
    stage.style.setProperty('--ry', (cx * 22).toFixed(2) + 'deg');
    stage.style.setProperty('--rx', (-cy * 14).toFixed(2) + 'deg');
    pills.forEach(p => {
      const d = +p.dataset.depth;
      p.style.setProperty('--px', (cx * -60 * d).toFixed(1) + 'px');
      p.style.setProperty('--py', (cy * -40 * d).toFixed(1) + 'px');
    });
    heroRAF = requestAnimationFrame(heroLoop);
  }
  if (!reduced) heroLoop();

  // Giroscópio leve no mobile (quando disponível, sem pedir permissão)
  if (!fine && !reduced && 'DeviceOrientationEvent' in window && typeof DeviceOrientationEvent.requestPermission !== 'function') {
    addEventListener('deviceorientation', e => {
      if (e.gamma == null) return;
      tx = Math.max(-.5, Math.min(.5, e.gamma / 60));
      ty = Math.max(-.5, Math.min(.5, (e.beta - 45) / 90));
    });
  }

  // Botões magnéticos
  if (fine && !reduced) {
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * .18}px, ${y * .28}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Lançamentos ---------- */
  const launchView = $('#view-lancamentos');
  const viewer = $('#viewer');
  const vBox = $('#viewerBox');
  const word = $('#launchWord');
  const data = {
    dip: { name: 'Asp<b>Dip</b>', sub: 'dipirona monoidratada', side: 'AspDip', word: 'DIP' },
    mol: { name: 'Asp<b>Mol</b>', sub: 'paracetamol', side: 'AspMol', word: 'MOL' }
  };
  let product = 'dip';

  function setProduct(p) {
    if (!data[p]) return;
    const changed = p !== product;
    product = p;
    launchView.dataset.activeProduct = p;
    $$('.switch__btn').forEach(b => {
      const on = b.dataset.product === p;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on);
    });
    $$('.swap, .presets', launchView).forEach(el => { el.hidden = el.dataset.for !== p; });

    const apply = () => {
      vBox.classList.toggle('box--dip', p === 'dip');
      vBox.classList.toggle('box--mol', p === 'mol');
      $('#vName').innerHTML = data[p].name;
      $('#vSub').textContent = data[p].sub;
      $('#vSide').textContent = data[p].side;
      word.textContent = data[p].word;
      const active = $(`.presets[data-for="${p}"] .chip.is-active`);
      applyDose(active);
    };
    if (!changed || reduced) return apply();
    viewer.classList.add('is-swapping');
    word.classList.add('is-swapping');
    vy += 360; // volta completa ao trocar
    setTimeout(() => {
      apply();
      viewer.classList.remove('is-swapping');
      word.classList.remove('is-swapping');
    }, 220);
  }

  function applyDose(chip) {
    if (!chip) return;
    $('#vDose').textContent = chip.dataset.dose;
    $('#vQty').textContent = chip.dataset.qty;
    viewer.classList.toggle('is-drops', chip.dataset.form === 'drops');
  }

  $$('.switch__btn').forEach(b => b.addEventListener('click', () => setProduct(b.dataset.product)));
  $$('.presets .chip').forEach(c => c.addEventListener('click', () => {
    $$('.chip', c.parentElement).forEach(x => x.classList.toggle('is-active', x === c));
    applyDose(c);
  }));

  // Arrastar para girar + auto-rotação suave
  let vx = -8, vy = -28, rvx = vx, rvy = vy, dragging = false, lastX = 0, lastY = 0, idle = 0, viewerRAF = null;
  viewer.addEventListener('pointerdown', e => {
    dragging = true; lastX = e.clientX; lastY = e.clientY;
    viewer.setPointerCapture(e.pointerId);
  });
  viewer.addEventListener('pointermove', e => {
    if (!dragging) return;
    vy += (e.clientX - lastX) * .5;
    vx = Math.max(-40, Math.min(40, vx - (e.clientY - lastY) * .3));
    lastX = e.clientX; lastY = e.clientY;
    idle = 0;
  });
  const end = () => { dragging = false; };
  viewer.addEventListener('pointerup', end);
  viewer.addEventListener('pointercancel', end);

  function viewerLoop() {
    if (!dragging) {
      idle++;
      if (idle > 90) {
        // Oscila em torno da frente mais próxima, sem nunca mostrar só o verso
        const base = Math.round((vy + 28) / 360) * 360 - 28;
        vy = lerp(vy, base + Math.sin(performance.now() / 1600) * 26, .03);
      }
      vx = lerp(vx, -8, .02);
    }
    rvx = lerp(rvx, vx, .1);
    rvy = lerp(rvy, vy, .1);
    vBox.style.setProperty('--vx', rvx.toFixed(2) + 'deg');
    vBox.style.setProperty('--vy', rvy.toFixed(2) + 'deg');
    viewerRAF = requestAnimationFrame(viewerLoop);
  }

  // Campanha: perguntas digitadas
  const qa = [
    ['Dor de cabeça no meio da reunião. Você toma o quê?', 'Uma Asp.'],
    ['Febre chegou de surpresa. E agora?', 'AspDip.'],
    ['Aquela dor que não passa. Qual você pede?', 'AspMol. É Bayer.'],
    ['Por que confiar?', 'É Bayer, é bom.']
  ];
  let typing = null, qi = 0;
  function typeLoop() {
    clearTimeout(typing);
    const q = $('#typed'), r = $('#typedReply'), rb = r.parentElement;
    const [question, reply] = qa[qi % qa.length];
    rb.classList.remove('show');
    q.textContent = '';
    let i = 0;
    const step = () => {
      if (current !== 'lancamentos') return;
      q.textContent = question.slice(0, ++i);
      if (i < question.length) typing = setTimeout(step, reduced ? 0 : 34);
      else typing = setTimeout(() => {
        r.textContent = reply;
        rb.classList.add('show');
        typing = setTimeout(() => { qi++; typeLoop(); }, 2400);
      }, 500);
    };
    typing = setTimeout(step, 300);
  }

  /* ---------- Produtos: filtro + tilt ---------- */
  $$('.filter').forEach(f => f.addEventListener('click', () => {
    $$('.filter').forEach(x => x.classList.toggle('is-active', x === f));
    const v = f.dataset.filter;
    $$('.card').forEach((c, i) => {
      const show = v === 'all' || c.dataset.cat.split(' ').includes(v);
      c.classList.toggle('is-hidden', !show);
      if (show && !reduced) {
        c.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }],
          { duration: 300, delay: i * 40, easing: 'cubic-bezier(.45,0,.55,1)', fill: 'backwards' });
      }
    });
  }));
  if (fine && !reduced) {
    $$('.card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.setProperty('--ty', (x * 10).toFixed(2) + 'deg');
        card.style.setProperty('--tx', (-y * 10).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tx', '0deg');
        card.style.setProperty('--ty', '0deg');
      });
    });
  }

  /* ---------- Linha do tempo: arrastar + progresso ---------- */
  const track = $('#timelineTrack');
  const bar = $('#timelineBar');
  const updateBar = () => {
    const max = track.scrollWidth - track.clientWidth;
    bar.style.transform = `scaleX(${max > 0 ? Math.max(.04, track.scrollLeft / max) : 1})`;
  };
  track.addEventListener('scroll', updateBar, { passive: true });
  let down = false, sx = 0, sl = 0, moved = false;
  track.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') return;
    down = true; moved = false; sx = e.clientX; sl = track.scrollLeft;
  });
  addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 4) { moved = true; track.classList.add('is-drag'); }
    track.scrollLeft = sl - dx;
  });
  addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    track.classList.remove('is-drag');
  });
  track.addEventListener('click', e => { if (moved) e.preventDefault(); }, true);
  // Roda do mouse vertical vira horizontal enquanto houver espaço
  track.addEventListener('wheel', e => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const max = track.scrollWidth - track.clientWidth;
    const atStart = track.scrollLeft <= 0 && e.deltaY < 0;
    const atEnd = track.scrollLeft >= max - 1 && e.deltaY > 0;
    if (atStart || atEnd) return;
    e.preventDefault();
    track.scrollLeft += e.deltaY;
  }, { passive: false });

  /* ---------- Onde encontrar ---------- */
  const cep = $('#cep');
  const msg = $('#cepMsg');
  cep.addEventListener('input', () => {
    let v = cep.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
    cep.value = v;
  });
  $('.finder__form').addEventListener('submit', () => {
    const digits = cep.value.replace(/\D/g, '');
    if (digits.length !== 8) {
      msg.textContent = 'Digite um CEP com 8 números.';
      cep.focus();
      return;
    }
    msg.textContent = 'Abrindo farmácias próximas no mapa…';
    window.open(`https://www.google.com/maps/search/farm%C3%A1cia+${digits}`, '_blank', 'noopener');
  });

  // FAQ: um aberto por vez
  $$('.faq__item').forEach(d => d.addEventListener('toggle', () => {
    if (d.open) $$('.faq__item').forEach(o => { if (o !== d) o.open = false; });
  }));

  /* ---------- Entrada em cada aba ---------- */
  function onEnter(id) {
    cancelAnimationFrame(viewerRAF);
    clearTimeout(typing);
    if (heroRAF === null && !reduced && id === 'inicio') heroLoop();
    if (id !== 'inicio' && heroRAF !== null) { cancelAnimationFrame(heroRAF); heroRAF = null; }
    if (id === 'lancamentos') {
      if (!reduced) viewerLoop();
      else { vBox.style.setProperty('--vx', '-8deg'); vBox.style.setProperty('--vy', '-28deg'); }
      qi = 0;
      typeLoop();
    }
    if (id === 'historia') requestAnimationFrame(updateBar);
    onScroll();
  }

  /* ---------- Início ---------- */
  const initial = location.hash.slice(1);
  if (initial && order.includes(initial) && initial !== 'inicio') {
    $('.view.is-active').classList.remove('is-active');
    current = initial;
    document.body.dataset.tab = initial;
    $(`.view[data-view="${initial}"]`).classList.add('is-active');
    tabBtns.forEach(b => { const on = b.dataset.go === initial; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on); });
  }
  movePill();
  observeReveals($('.view.is-active'));
  onEnter(current);
})();
