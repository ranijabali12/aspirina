/* Família Asp · interações */
(() => {
  const { SKUS, FAMILIES, LINE, FAQ, product3D, flat, ean13, makeBottleLabel, drawBottle, CLASSICS, classicFlat, byId } = window.ASP;
  const clsById = id => CLASSICS.find(c => c.id === id);
  const $ = (s, el = document) => el.querySelector(s);
  const escHTML = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const lerp = (a, b, t) => a + (b - a) * t;
  // Aparelhos de toque e modestos (tablets, celulares) recebem um modo mais leve
  const lite = !fine || (navigator.hardwareConcurrency || 8) <= 4 || !!navigator.connection?.saveData;
  if (lite) document.documentElement.classList.add('lite');
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const pad = n => String(n).padStart(2, '0');
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const fullName = s => s.drops ? `AspDip Gotas ${s.dose}` : `${s.name} ${s.dose}`;

  $('#year').textContent = new Date().getFullYear();
  // Rótulo do frasco 3D: desenhado depois que as fontes carregam
  // Frasco: redesenha só quando o ângulo muda
  const paintBottle = (cv, yaw) => {
    if (!cv) return;
    const a = Math.round(yaw);
    if (cv._a === a) return;
    cv._a = a;
    cv.style.setProperty('--bb', (-a).toFixed(1) + 'deg');
    drawBottle(cv, a);
  };
  const repaintBottles = () => $$('.bottle3d__c').forEach(cv => { cv._a = null; paintBottle(cv, cv._yaw || 0); });
  try { makeBottleLabel(); } catch (e) {}
  (document.fonts?.ready || Promise.resolve()).then(() => { try { makeBottleLabel(); repaintBottles(); } catch (e) {} });

  /* ---------- Toast ---------- */
  let toastT;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* ---------- Tema ---------- */
  const themeBtn = $('#themeBtn');
  const isDark = () => {
    const t = document.documentElement.dataset.theme;
    return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  };
  themeBtn.addEventListener('click', e => {
    const next = isDark() ? 'light' : 'dark';
    const apply = () => { document.documentElement.dataset.theme = next; store.set('asp-theme', next); };
    if (document.startViewTransition && !reduced) {
      const r = e.currentTarget.getBoundingClientRect(), s = document.documentElement.style;
      s.setProperty('--vt-x', r.left + r.width / 2 + 'px'); s.setProperty('--vt-y', r.top + r.height / 2 + 'px');
      document.startViewTransition(apply);
    } else apply();
    toast(next === 'dark' ? 'Tema escuro ativado' : 'Tema claro ativado');
  });

  /* ---------- Abas ---------- */
  const tabBtns = $$('.tabs__btn');
  const pill = $('.tabs__pill');
  const order = ['inicio', 'lancamentos', 'produtos', 'historia', 'duvidas'];
  let current = 'inicio';

  function movePill() {
    const btn = $(`.tabs__btn[data-go="${current}"]`);
    if (!btn) return;
    pill.style.width = btn.offsetWidth + 'px';
    pill.style.transform = `translateX(${btn.offsetLeft}px)`;
    const nav = btn.parentElement;
    if (nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: btn.offsetLeft - (nav.clientWidth - btn.offsetWidth) / 2, behavior: 'smooth' });
  }

  function go(id, { push = true, scrollTo = null, hash = null } = {}) {
    if (!order.includes(id)) id = 'inicio';
    const finish = () => {
      if (!scrollTo) return;
      const t = typeof scrollTo === 'string' ? document.getElementById(scrollTo) : scrollTo;
      if (t) setTimeout(() => t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' }), 140);
    };
    if (push) history.pushState({ id }, '', '#' + (hash || id));
    if (id === current) {
      if (!scrollTo) window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      finish();
      return;
    }
    const from = $(`.view[data-view="${current}"]`);
    const to = $(`.view[data-view="${id}"]`);
    current = id;
    tabBtns.forEach(b => { const on = b.dataset.go === id; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on); });
    movePill();
    const swap = () => {
      from.classList.remove('is-active', 'is-leaving', 'is-settled');
      window.scrollTo(0, 0);
      to.classList.add('is-active');
      // Encerra a animação de entrada: opacidade animada achata o 3D no Chrome
      to.addEventListener('animationend', function done(ev) { if (ev.target !== to) return; to.classList.add('is-settled'); to.removeEventListener('animationend', done); });
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
    if (el.dataset.sku) selectSku(el.dataset.sku);
    if (el.dataset.cls) selectClassic(el.dataset.cls);
    go(el.dataset.go, { scrollTo: el.dataset.scroll || null, hash: el.dataset.sku || null });
  });
  $('.tabs').addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    const i = order.indexOf(current) + (e.key === 'ArrowRight' ? 1 : -1);
    const id = order[(i + order.length) % order.length];
    go(id);
    $(`.tabs__btn[data-go="${id}"]`).focus();
  });
  window.addEventListener('popstate', () => routeFromHash(false));
  addEventListener('resize', movePill);
  document.fonts?.ready.then(movePill);

  function routeFromHash(push) {
    const h = location.hash.slice(1);
    if (byId(h)) { selectSku(h, true); go('lancamentos', { push }); }
    else if (clsById(h)) { selectClassic(h, true); go('produtos', { push, hash: h, scrollTo: 'classica' }); }
    else go(h || 'inicio', { push });
  }

  /* ---------- Reveal + contadores ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
      $$('.counter', en.target).forEach(runCounter);
      if (en.target.matches('.mol')) drawMol(en.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });

  function observeReveals(scope) {
    const groups = new Map();
    $$('.reveal:not(.in)', scope).forEach(el => {
      const n = groups.get(el.parentElement) || 0;
      groups.set(el.parentElement, n + 1);
      el.style.setProperty('--d', Math.min(n * 60, 300) + 'ms');
      io.observe(el);
    });
  }

  function runCounter(el) {
    if (el.dataset.done) return;
    el.dataset.done = 1;
    const target = +el.dataset.count;
    if (reduced || target > 1000) { el.textContent = target; return; }
    const start = target > 1000 ? target - 100 : 0;
    const t0 = performance.now(), dur = 800;
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = Math.round(start + (target - start) * e);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Header + progresso ---------- */
  const topbar = $('.topbar');
  const prog = $('.scroll-progress span');
  const onScroll = () => {
    topbar.classList.toggle('is-scrolled', scrollY > 24);
    const max = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Cursor ---------- */
  const cursor = $('#cursor');
  if (fine && !reduced) {
    let mx = -100, my = -100, cx = -100, cy = -100;
    addEventListener('pointermove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.classList.add('is-on');
      const t = e.target.closest('[data-cursor]');
      cursor.classList.toggle('is-label', !!t);
      if (t) $('.cursor__label', cursor).textContent = t.dataset.cursor;
    });
    document.documentElement.addEventListener('mouseleave', () => cursor.classList.remove('is-on'));
    addEventListener('blur', () => cursor.classList.remove('is-on'));
    (function loop() {
      cx = lerp(cx, mx, .22); cy = lerp(cy, my, .22);
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Partículas do hero (moléculas ligadas) ---------- */
  const canvas = $('#particles');
  const ctx = canvas.getContext('2d');
  let parts = [], pRAF = null, pmx = -999, pmy = -999;
  function sizeCanvas() {
    const r = canvas.getBoundingClientRect();
    const dpr = lite ? 1 : Math.min(devicePixelRatio || 1, 2);
    canvas.width = r.width * dpr; canvas.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(clamp(r.width / (lite ? 60 : 28), lite ? 10 : 18, lite ? 22 : 52));
    parts = Array.from({ length: n }, () => ({
      x: Math.random() * r.width, y: Math.random() * r.height * .6,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: 1 + Math.random() * 2
    }));
  }
  let pSkip = false;
  function particles() {
    pRAF = requestAnimationFrame(particles);
    // No modo leve as partículas andam a 30 quadros por segundo
    if (lite && (pSkip = !pSkip)) return;
    if (!heroVisible) return;
    const w = canvas.clientWidth, h = canvas.clientHeight * .62;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const col = isDark() ? '0,167,133' : '0,121,96';
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      const dx = p.x - pmx, dy = p.y - pmy, d = Math.hypot(dx, dy);
      if (d < 120) { p.x += dx / d * .6; p.y += dy / d * .6; }
    }
    for (let i = 0; i < parts.length; i++) {
      const a = parts[i];
      for (let j = i + 1; j < parts.length; j++) {
        const b = parts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 110) { ctx.strokeStyle = `rgba(${col},${(1 - d / 110) * .22})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      ctx.fillStyle = `rgba(${col},.45)`;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    }
  }
  // Pausa o hero quando ele sai da tela
  let heroVisible = true;
  new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; }).observe($('#hero'));
  if (!reduced) {
    sizeCanvas();
    addEventListener('resize', sizeCanvas);
    $('#hero').addEventListener('pointermove', e => { const r = canvas.getBoundingClientRect(); pmx = e.clientX - r.left; pmy = e.clientY - r.top; });
  }

  /* ---------- Mostrador do chão da órbita ---------- */
  (function dial() {
    const svg = $('#dial');
    let g = '';
    for (let i = 0; i < 120; i++) {
      const a = (i / 120) * Math.PI * 2, major = i % 10 === 0;
      const r1 = 180, r2 = major ? 166 : 173;
      g += `<line class="dial-tick${major ? ' dial-tick--major' : ''}" x1="${Math.cos(a) * r1}" y1="${Math.sin(a) * r1}" x2="${Math.cos(a) * r2}" y2="${Math.sin(a) * r2}" stroke-width="${major ? 1.2 : .6}"/>`;
    }
    const labels = ['500 MG', '1 G', '500 MG/ML', '500 MG', '750 MG'];
    labels.forEach((t, i) => {
      const a = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
      g += `<text class="dial-label" x="${Math.cos(a) * 150}" y="${Math.sin(a) * 150}" text-anchor="middle">${t}</text>`;
    });
    g += `<circle r="186" fill="none" stroke="rgba(255,255,255,.35)" stroke-width=".6"/><circle r="120" fill="none" stroke="rgba(255,255,255,.18)" stroke-width=".6" stroke-dasharray="2 4"/>`;
    svg.innerHTML = g;
  })();
  const dialRot = $('#dial');

  /* ---------- Órbita dos 5 lançamentos ---------- */
  const stage = $('#orbitStage');
  const orbitEl = $('#orbit');
  const N = SKUS.length, step = (Math.PI * 2) / N;
  // Produtos 3D: WebGL quando disponível (fluido em tablets e celulares); CSS como reserva
  let GL = null, items = [];
  function buildCssOrbit() {
    stage.innerHTML = SKUS.map((s, i) => `
    <div class="orbit__item" data-i="${i}" role="group" aria-label="${fullName(s)}">
      <div class="orbit__shadow" style="--delay:${-i * .8}s"></div>
      <div class="float" style="--delay:${-i * .8}s"><div class="pose" style="--sway:${-i * 1.3}s">${product3D(s)}</div></div>
    </div>`).join('');
    items = $$('.orbit__item', stage);
  }
  (window.ASP3D || Promise.resolve(null)).then(api => {
    if (api) {
      GL = api;
      document.documentElement.classList.add('gl-on');
      GL.viewer.setProduct(sku, true);
      if (GL.viewer2) GL.viewer2.setProduct(cls, true);
    } else {
      buildCssOrbit();
      if (sku) { viewerObj.innerHTML = product3D(sku); }
    }
    introT0 = performance.now();
    orbitEl.classList.add('is-ready');
  });
  let angle = -1.2, targetIdx = 0, introT0 = performance.now(), hoverIdx = -1, oDrag = false, oLastX = 0, oMoved = 0, hoverPause = false, autoT0 = performance.now(), oRAF = null, frontIdx = -1;
  const AUTO = 3800;
  const geo = () => {
    const w = orbitEl.clientWidth;
    return { rx: w < 640 ? w * .56 : clamp(w * .36, 240, 540), rz: clamp(w * .18, 120, 260), k: w < 640 ? .7 : w < 1000 ? .95 : 1.15 };
  };
  let G = geo();
  addEventListener('resize', () => { G = geo(); });

  function setFront(i) {
    if (i === frontIdx) return;
    frontIdx = i;
    const s = SKUS[i], f = FAMILIES[s.fam];
    const hud = $('#hud');
    hud.classList.add('is-swap');
    setTimeout(() => {
      $('#hudIdx').textContent = pad(i + 1);
      $('#hudFam').textContent = `${f.name} · ${f.ativo}`;
      $('#hudName').textContent = fullName(s);
      $('#hudMeta').textContent = `${s.form} · ${s.qtyLabel}`;
      hud.classList.remove('is-swap');
    }, reduced ? 0 : 160);
  }
  $('#hudTotal').textContent = pad(N);

  function orbitFrame(now) {
    oRAF = requestAnimationFrame(orbitFrame);
    if (!heroVisible) { autoT0 = now - Math.min(now - autoT0, AUTO); if (GL) GL.classics.frame(now, clsHover); return; }
    if (!oDrag) {
      if (!hoverPause && !reduced && now - autoT0 > AUTO) { targetIdx++; autoT0 = now; }
      angle = lerp(angle, -targetIdx * step, reduced ? 1 : .07);
    }
    const p = hoverPause || oDrag ? 0 : clamp((now - autoT0) / AUTO, 0, 1);
    $('#hudBar').style.transform = `scaleX(${p})`;
    // Entrada: os produtos sobem e se abrem em leque no primeiro segundo e meio
    const ip = reduced ? 1 : clamp((now - introT0) / 1500, 0, 1);
    const ie = 1 - Math.pow(1 - ip, 3);
    if (GL) {
      for (let i = 0; i < N; i++) {
        const th = angle + i * step;
        const c = Math.cos(th), sn = Math.sin(th);
        const depth = (c + 1) / 2;
        const lift = i === hoverIdx ? 1.06 : 1;
        GL.orbit.set(i, {
          x: sn * G.rx * ie,
          y: -c * 10 - (1 - depth) * 40 + (1 - ie) * 180 + Math.sin(now / 900 + i * 1.7) * 7,
          z: c * G.rz,
          ry: -sn * 20,
          scale: (.5 + .5 * depth) * G.k * (.7 + .3 * ie) * lift,
          tilt: 14,
          yaw: -28 + Math.sin(now / 1300 + i * 1.3) * 7,
          fog: Math.round((1 - depth) * 8) / 25
        });
      }
      GL.orbit.render();
      GL.classics.frame(now, clsHover);
    }
    items.forEach((el, i) => {
      const th = angle + i * step;
      const c = Math.cos(th), sn = Math.sin(th);
      const depth = (c + 1) / 2;
      const x = sn * G.rx * ie, z = c * G.rz, y = -c * 10 - (1 - depth) * 40 + (1 - ie) * 180;
      const lift = i === hoverIdx ? 1.06 : 1;
      const sc = (.5 + .5 * depth) * G.k * (.7 + .3 * ie) * lift;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${(sn * 28).toFixed(2)}deg) scale(${sc.toFixed(3)})`;
      // A névoa muda em degraus: trocar variável CSS todo quadro força recálculo de estilo em todo o SVG
      const fog = Math.round((1 - depth) * 8) / 25;
      if (el._fog !== fog) { el._fog = fog; el.style.setProperty('--fog', fog); }
      const cv = el._cv || (el._cv = el.querySelector('.bottle3d__c'));
      if (cv) { cv._yaw = Math.round(sn * 28 - 27); paintBottle(cv, cv._yaw); }
    });
    dialRot.style.transform = `rotate(${(-angle * 180 / Math.PI).toFixed(2)}deg)`;
    const fi = ((Math.round(-angle / step) % N) + N) % N;
    setFront(fi);
  }
  const nudge = d => { targetIdx = Math.round(-angle / step) + d; autoT0 = performance.now(); };
  $('#orbitPrev').addEventListener('click', () => nudge(-1));
  $('#orbitNext').addEventListener('click', () => nudge(1));
  $('#hudOpen').addEventListener('click', () => { selectSku(SKUS[frontIdx].id, true); go('lancamentos', { hash: SKUS[frontIdx].id }); });
  orbitEl.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hoverPause = true; });
  orbitEl.addEventListener('pointerleave', () => { hoverPause = false; hoverIdx = -1; autoT0 = performance.now(); });
  orbitEl.addEventListener('pointerdown', e => { oDrag = true; oLastX = e.clientX; oMoved = 0; orbitEl.setPointerCapture(e.pointerId); });
  orbitEl.addEventListener('pointermove', e => {
    if (!oDrag) {
      if (e.pointerType !== 'mouse') return;
      if (GL) hoverIdx = GL.orbit.pick(e.clientX, e.clientY);
      else { const hit = e.target.closest && e.target.closest('.orbit__item'); hoverIdx = hit ? +hit.dataset.i : -1; }
      return;
    }
    const dx = e.clientX - oLastX;
    oMoved += Math.abs(dx);
    angle += dx * .006;
    oLastX = e.clientX;
  });
  const oEnd = e => {
    if (!oDrag) return;
    oDrag = false;
    targetIdx = Math.round(-angle / step);
    autoT0 = performance.now();
    if (oMoved < 6) {
      // Clique: abre o da frente ou gira até o clicado
      let i = -1;
      if (GL) i = GL.orbit.pick(e.clientX, e.clientY);
      else { const hit = document.elementsFromPoint(e.clientX, e.clientY).map(n => n.closest && n.closest('.orbit__item')).find(Boolean); if (hit) i = +hit.dataset.i; }
      if (i >= 0) {
        if (i === frontIdx) { selectSku(SKUS[i].id, true); go('lancamentos', { hash: SKUS[i].id }); }
        else {
          let d = (i - frontIdx + N) % N; if (d > N / 2) d -= N;
          nudge(d);
        }
      }
    }
  };
  orbitEl.addEventListener('pointerup', oEnd);
  orbitEl.addEventListener('pointercancel', () => { oDrag = false; targetIdx = Math.round(-angle / step); });
  document.addEventListener('keydown', e => {
    if (current !== 'inicio' || e.target.closest('input, textarea, dialog')) return;
    if (e.key === 'ArrowRight' && !e.target.closest('.tabs')) nudge(1);
    if (e.key === 'ArrowLeft' && !e.target.closest('.tabs')) nudge(-1);
  });

  /* ---------- Ticker ---------- */
  const tick = ['AspDip 500 mg', 'AspDip 1 g', 'AspDip gotas 500 mg/mL', 'AspMol 500 mg', 'AspMol 750 mg', 'Dor & Febre', 'É Bayer, é bom'];
  $('#tickerTrack').innerHTML = [...tick, ...tick].map(t => `<span>${t}</span><b>✚</b>`).join('');

  /* ---------- Famílias ---------- */
  $('#families').innerHTML = ['dip', 'mol'].map(k => {
    const f = FAMILIES[k];
    const list = SKUS.filter(s => s.fam === k).map(s => `
      <button class="family__sku" data-go="lancamentos" data-sku="${s.id}" data-cursor="abrir">
        ${flat(s)}
        <div><b>${fullName(s)}</b><span>${s.qtyLabel}</span></div>
        <i aria-hidden="true">→</i>
      </button>`).join('');
    return `<article class="family family--${k} reveal">
      <span class="family__band" aria-hidden="true"></span>
      <div class="family__head"><h3 class="family__word">ASP<b>${f.word}</b></h3><span class="family__formula">${f.ativo}<br>${f.formula}</span></div>
      <p class="family__lead">${f.lead}</p>
      <div class="family__list">${list}</div>
    </article>`;
  }).join('');

  /* ---------- Lançamentos ---------- */
  const launchView = $('#view-lancamentos');
  const viewerObj = $('#viewerObj');
  let sku = SKUS[0];
  let fam = 'dip';

  function setFamily(k, keepSku) {
    fam = k;
    launchView.dataset.family = k;
    const f = FAMILIES[k];
    $$('.switch__btn').forEach(b => { const on = b.dataset.family === k; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on); });
    $('#famTitle').innerHTML = `ASP<b>${f.word}</b>`;
    $('#famLead').textContent = f.lead;
    const fl = $('#launchFormula');
    fl.classList.add('is-swap');
    setTimeout(() => { fl.textContent = f.formula; fl.classList.remove('is-swap'); }, reduced ? 0 : 200);
    const list = SKUS.filter(s => s.fam === k);
    $('#skuList').innerHTML = list.map((s, i) => `
      <button class="sku" role="option" data-id="${s.id}" style="--i:${i}" aria-selected="false">
        ${flat(s)}<div><b>${s.drops ? 'Gotas ' + s.dose : s.dose}</b><span>${s.qtyLabel}</span></div>
      </button>`).join('');
    $$('#skuList .sku').forEach(b => b.addEventListener('click', () => { selectSku(b.dataset.id); history.replaceState(null, '', '#' + b.dataset.id); }));
    if (!keepSku) selectSku(list[0].id);
  }

  function selectSku(id, instant) {
    const s = byId(id);
    if (!s) return;
    if (s.fam !== fam) setFamily(s.fam, true);
    const changed = s !== sku || (!GL && !viewerObj.firstElementChild);
    sku = s;
    $$('#skuList .sku').forEach(b => { const on = b.dataset.id === id; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on); });
    renderSheet(s);
    renderBula('', s.fam === 'mol' ? 'aspmol' : 'aspdip', s.fam === 'mol' ? 'AspMol · paracetamol' : 'AspDip · dipirona');
    if (!changed) return;
    if (GL) {
      GL.viewer.setProduct(s, instant || reduced);
      vy = -24 + Math.round((vy + 24) / 360) * 360 + (instant || reduced ? 0 : 360);
      return;
    }
    if (!items.length && !viewerObj.firstElementChild && window.ASP3D) return; // aguardando o WebGL
    const put = () => {
      viewerObj.innerHTML = product3D(s);
      vy = -24 + Math.round((vy + 24) / 360) * 360 + (instant || reduced ? 0 : 360);
      viewerObj.classList.remove('is-swap');
    };
    if (instant || reduced || !viewerObj.firstElementChild) return put();
    viewerObj.classList.add('is-swap');
    setTimeout(put, 200);
    viewerObj.firstElementChild && viewerObj.firstElementChild.style.setProperty('--vy', (rvy + 120).toFixed(1) + 'deg');
  }


  /* ---------- Bula: indicação, contraindicações, advertências e reações ---------- */
  const BULA_T = [['indicacao', 'Indicação'], ['contra', 'Contraindicações'], ['adv', 'Advertências'], ['reacoes', 'Reações adversas']];
  const bulaTab = { '': 'indicacao', '2': 'indicacao' }, bulaCur = {};
  const escB = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  function renderBula(n, key, title, color) {
    const root = $('#bula' + n), B = (window.ASP_BULA || {})[key];
    if (!root || !B) { root && (root.parentElement.hidden = true); return; }
    root.parentElement.hidden = false;
    bulaCur[n] = { key, title, color };
    if (color) root.style.setProperty('--fam', color), root.style.setProperty('--fam-band', color);
    root.querySelector('.bula__title').textContent = title;
    const t = bulaTab[n];
    root.querySelector('.bula__tabs').innerHTML = BULA_T.map(([k, l]) => `<button class="bula__tab${k === t ? ' is-on' : ''}" role="tab" aria-selected="${k === t}" data-k="${k}">${l}</button>`).join('');
    const nota = B.notas && B.notas[t] ? `<p class="bula__lead">${escB(B.notas[t])}</p>` : '';
    const li = (B[t] || []).map((x, i) => x.startsWith('## ') ? `<li class="bula__sub" style="--i:${i}">${escB(x.slice(3))}</li>` : `<li style="--i:${i}">${escB(x)}</li>`).join('');
    root.querySelector('.bula__body').innerHTML = nota + `<ul class="bula__list">${li}</ul>`;
    root.querySelector('.bula__note').innerHTML = `${escB(B.origem || '')}${B.fonte ? ` <a href="${escB(B.fonte)}" target="_blank" rel="noopener">Ver página</a>.` : ''} Notifique suspeita de reação adversa ao SAC Bayer 0800 723 1010.`;
  }
  document.addEventListener('click', e => { const a = e.target.closest('[data-bula]'); if (!a) return; e.preventDefault(); $('#bula' + a.dataset.bula).scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); });
  ['', '2'].forEach(n => { const r = $('#bula' + n); r && r.addEventListener('click', e => {
    const b = e.target.closest('.bula__tab'); if (!b) return; bulaTab[n] = b.dataset.k; const c = bulaCur[n]; renderBula(n, c.key, c.title, c.color);
  }); });

  function renderSheet(s) {
    const f = FAMILIES[s.fam];
    const rows = [
      ['Princípio ativo', s.ativo],
      ['Concentração', s.dose],
      ['Apresentação', `${s.form} · ${s.qtyLabel}`],
      ['Detalhe', s.extra],
      ['Bula', '<a class="sheet__bula" href="#bula" data-bula="">Ver resumo da bula ↓</a>'],
      ...(window.LOJAS && LOJAS.chips(s.id) ? [['Comprar', LOJAS.chips(s.id)]] : [])
    ];
    $('#sheet').innerHTML = `
      <div class="sheet__head">
        <span class="eyebrow">Ficha do produto</span>
        <h3 class="sheet__name">${s.drops ? 'AspDip Gotas' : s.name} <b>${s.dose}</b></h3>
        <span class="sheet__formula">${s.formula}</span>
      </div>
      <dl>${rows.map(([k, v], i) => `<div class="sheet__row" style="--i:${i}"><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
      ${s.ean ? `<div class="sheet__row" style="--i:5"><dt>EAN</dt><dd>${ean13(s.ean)}</dd></div>` : ''}</dl>`;
  }

  $$('.switch__btn').forEach(b => b.addEventListener('click', () => {
    setFamily(b.dataset.family);
    history.replaceState(null, '', '#' + sku.id);
  }));

  // Visualizador: arrastar, ângulos prontos e oscilação suave
  const viewer = $('#viewer');
  let vx = -10, vy = -24, rvx = vx, rvy = vy, vDrag = false, vlx = 0, vly = 0, idle = 0, vRAF = null, lockAngle = 0;
  viewer.addEventListener('pointerdown', e => {
    if (e.target.closest('button')) return;
    vDrag = true; vlx = e.clientX; vly = e.clientY; viewer.setPointerCapture(e.pointerId);
  });
  viewer.addEventListener('pointermove', e => {
    if (!vDrag) return;
    vy += (e.clientX - vlx) * .5;
    vx = clamp(vx - (e.clientY - vly) * .3, -45, 45);
    vlx = e.clientX; vly = e.clientY; idle = 0; lockAngle = 0;
  });
  ['pointerup', 'pointercancel'].forEach(t => viewer.addEventListener(t, () => { vDrag = false; }));
  $$('[data-view-angle]').forEach(b => b.addEventListener('click', () => {
    const base = Math.round((vy + 24) / 360) * 360;
    const map = { front: -24, side: -90, back: 180 };
    vy = base + map[b.dataset.viewAngle];
    vx = -8; idle = 0; lockAngle = 240;
  }));
  function viewerLoop(now = performance.now()) {
    if (!vDrag) {
      idle++;
      if (lockAngle > 0) lockAngle--;
      else if (idle > 90) {
        const base = Math.round((vy + 24) / 360) * 360 - 24;
        vy = lerp(vy, base + Math.sin(performance.now() / 1700) * 24, .03);
      }
      vx = lerp(vx, -10, .02);
    }
    rvx = lerp(rvx, vx, .1); rvy = lerp(rvy, vy, .1);
    if (GL) {
      const w = viewer.clientWidth;
      GL.viewer.frame(now, rvx, rvy, Math.sin(now / 800) * 7, w < 420 ? .95 : w < 640 ? 1.05 : 1.35);
      vRAF = requestAnimationFrame(viewerLoop);
      return;
    }
    const pk = viewerObj.firstElementChild;
    if (pk) {
      pk.style.setProperty('--vx', rvx.toFixed(2) + 'deg'); pk.style.setProperty('--vy', rvy.toFixed(2) + 'deg');
      const cv = pk.querySelector('.bottle3d__c');
      if (cv) { cv._yaw = rvy; paintBottle(cv, rvy); }
    }
    vRAF = requestAnimationFrame(viewerLoop);
  }

  /* ---------- Matriz ---------- */
  (function matrix() {
    const rows = [
      ['Princípio ativo', s => s.ativo],
      ['Concentração', s => s.dose],
      ['Forma', s => s.form],
      ['Embalagem', s => s.qtyLabel],
      ['Detalhe', s => s.extra]
    ];
    const head = `<thead><tr><th scope="col"><span class="sr-only">Atributo</span></th>${SKUS.map((s, i) => `<th scope="col" data-col="${i}">${flat(s)}<b>${fullName(s)}</b></th>`).join('')}</tr></thead>`;
    const body = `<tbody>${rows.map(([k, fn]) => `<tr><th scope="row">${k}</th>${SKUS.map((s, i) => `<td data-col="${i}">${fn(s)}</td>`).join('')}</tr>`).join('')}</tbody>`;
    const t = $('#matrix');
    t.innerHTML = head + body;
    t.addEventListener('pointerover', e => {
      const c = e.target.closest('[data-col]');
      $$('.is-col', t).forEach(x => x.classList.remove('is-col'));
      if (c) $$(`[data-col="${c.dataset.col}"]`, t).forEach(x => x.classList.add('is-col'));
    });
    t.addEventListener('pointerleave', () => $$('.is-col', t).forEach(x => x.classList.remove('is-col')));
  })();

  /* ---------- Campanha ---------- */
  const qa = [
    ['Como você pede dipirona na farmácia?', 'AspDip.'],
    ['E paracetamol?', 'AspMol.'],
    ['Quem criou os dois?', 'Os criadores da Aspirina.'],
    ['Resumindo?', 'É Bayer, é bom.']
  ];
  let typing = null, qi = 0, recT = null, recS = 0;
  function typeLoop() {
    clearTimeout(typing);
    const q = $('#typed'), r = $('#typedReply'), rb = $('#replyBubble');
    const [question, reply] = qa[qi % qa.length];
    rb.classList.remove('show');
    q.textContent = '';
    let i = 0;
    const stepT = () => {
      if (current !== 'lancamentos') return;
      q.textContent = question.slice(0, ++i);
      if (i < question.length) typing = setTimeout(stepT, reduced ? 0 : 32);
      else typing = setTimeout(() => { r.textContent = reply; rb.classList.add('show'); typing = setTimeout(() => { qi++; typeLoop(); }, 2400); }, 450);
    };
    typing = setTimeout(stepT, 300);
  }
  function recClock() {
    clearInterval(recT);
    recS = 0;
    recT = setInterval(() => { recS++; $('#recTime').textContent = `${pad(Math.floor(recS / 60))}:${pad(recS % 60)}`; }, 1000);
  }

  /* ---------- Clássicos no início ---------- */
  $('#classics').innerHTML = CLASSICS.map((p, i) => `
    <button class="classic-item reveal" data-go="produtos" data-cls="${p.id}" data-scroll="classica" data-cursor="ver" style="--c:${p.main};--i:${i}" data-ci="${i}">
      <span class="classic-item__stage" data-cls="${p.id}">${classicFlat(p)}</span>
      <span class="classic-item__name">${p.name}</span>
      <span class="classic-item__ativo">${p.ativo}</span>
    </button>`).join('');

  /* ---------- Linha clássica: lista, ficha e visualizador ---------- */
  let cls = CLASSICS[0];
  $('#skuList2').innerHTML = CLASSICS.map((c, i) => `
    <button class="sku" role="option" data-cid="${c.id}" style="--i:${i}" aria-selected="false">
      ${classicFlat(c)}<div><b>${c.name}</b><span>${c.qtyLabel}</span></div>
    </button>`).join('');
  $$('#skuList2 .sku').forEach(b => b.addEventListener('click', () => { selectClassic(b.dataset.cid); history.replaceState(null, '', '#' + b.dataset.cid); }));
  function selectClassic(id, instant) {
    const c = clsById(id);
    if (!c) return;
    const changed = c !== cls;
    cls = c;
    $$('#skuList2 .sku').forEach(b => { const on = b.dataset.cid === id; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on); });
    $('#classica').style.setProperty('--fam', c.main);
    renderBula('2', { 'aspirina-500': 'aspirina', 'aspirina-c': 'aspirinac', cafiaspirina: 'cafi' }[c.id], c.name, c.main);
    const rows = [['Princípio ativo', c.principio], ['Concentração', c.dose], ['Apresentação', `${c.form} · ${c.qtyLabel}`], ['Detalhe', c.extra], ...(c.since ? [['História', c.since]] : []), ['Bula', '<a class="sheet__bula" href="#bula2" data-bula="2">Ver resumo da bula ↓</a>'], ...(window.LOJAS && LOJAS.chips(c.id) ? [['Comprar', LOJAS.chips(c.id)]] : [])];
    $('#sheet2').innerHTML = `
      <div class="sheet__head">
        <span class="eyebrow">Ficha do produto</span>
        <h3 class="sheet__name">${c.name}</h3>
        <span class="sheet__formula">${c.formula}</span>
      </div>
      <dl>${rows.map(([k, v], i) => `<div class="sheet__row" style="--i:${i}"><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
    if (GL && GL.viewer2 && (changed || instant)) { GL.viewer2.setProduct(c, instant || reduced); if (changed && !instant && !reduced) cy += 360; }
  }
  // giro do visualizador clássico
  const viewer2 = $('#viewer2');
  let cx = -10, cy = -24, rcx = cx, rcy = cy, cDrag = false, clx = 0, cly = 0, cIdle = 0, cLock = 0, cRAF = null;
  viewer2.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; cDrag = true; clx = e.clientX; cly = e.clientY; viewer2.setPointerCapture(e.pointerId); });
  viewer2.addEventListener('pointermove', e => {
    if (!cDrag) return;
    cy += (e.clientX - clx) * .5; cx = clamp(cx - (e.clientY - cly) * .3, -45, 45);
    clx = e.clientX; cly = e.clientY; cIdle = 0; cLock = 0;
  });
  ['pointerup', 'pointercancel'].forEach(t => viewer2.addEventListener(t, () => { cDrag = false; }));
  $$('[data-view-angle2]').forEach(b => b.addEventListener('click', () => {
    const base = Math.round((cy + 24) / 360) * 360;
    cy = base + { front: -24, side: -90, back: 180 }[b.dataset.viewAngle2]; cx = -8; cIdle = 0; cLock = 240;
  }));
  let v2Visible = false;
  new IntersectionObserver(([en]) => { v2Visible = en.isIntersecting; }).observe(viewer2);
  function classicLoop(now = performance.now()) {
    cRAF = requestAnimationFrame(classicLoop);
    if (!GL || !GL.viewer2 || !v2Visible) return;
    if (!cDrag) {
      cIdle++;
      if (cLock > 0) cLock--;
      else if (cIdle > 90) { const base = Math.round((cy + 24) / 360) * 360 - 24; cy = lerp(cy, base + Math.sin(now / 1700) * 24, .03); }
      cx = lerp(cx, -10, .02);
    }
    rcx = lerp(rcx, cx, .1); rcy = lerp(rcy, cy, .1);
    const w = viewer2.clientWidth;
    GL.viewer2.frame(now, rcx, rcy, Math.sin(now / 800) * 7, w < 420 ? .95 : w < 640 ? 1.05 : 1.3);
  }
  selectClassic(cls.id, true);

  let clsHover = -1;
  $('#classics').addEventListener('pointerover', e => { const b = e.target.closest('.classic-item'); clsHover = b ? +b.dataset.ci : -1; });
  $('#classics').addEventListener('pointerleave', () => { clsHover = -1; });

  /* ---------- Linha completa ---------- */
  $('#cards').innerHTML = LINE.map(p => {
    if (p.sku) {
      const s = byId(p.sku);
      return `<button class="card" data-tags="${p.tags.join(' ')}" data-go="lancamentos" data-sku="${s.id}" style="--c:${FAMILIES[s.fam].band}" data-cursor="abrir">
        <span class="card__badge">Novo</span>
        <div class="card__art">${flat(s)}</div>
        <div class="card__body"><h3>${fullName(s)}</h3><p class="card__ing">${s.ativo} · ${s.qtyLabel}</p><p>${s.extra}.</p></div>
      </button>`;
    }
    const c = clsById(p.cls);
    return `<button class="card" data-tags="${p.tags.join(' ')}" style="--c:${c.main}" data-go="produtos" data-cls="${c.id}" data-scroll="classica" data-cursor="abrir">
      <div class="card__art">${classicFlat(c)}</div>
      <div class="card__body"><h3>${c.name}</h3><p class="card__ing">${c.ativo} · ${c.qtyLabel}</p><p>${c.desc}</p></div>
    </button>`;
  }).join('');
  const cards = $$('.card');
  $$('.filters .chip').forEach(f => {
    const v = f.dataset.filter;
    $('.chip__n', f).textContent = v === 'all' ? cards.length : cards.filter(c => c.dataset.tags.split(' ').includes(v)).length;
    f.addEventListener('click', () => {
      $$('.filters .chip').forEach(x => x.classList.toggle('is-active', x === f));
      let k = 0;
      cards.forEach(c => {
        const show = v === 'all' || c.dataset.tags.split(' ').includes(v);
        c.classList.toggle('is-hidden', !show);
        if (show && !reduced) c.animate([{ opacity: 0, translate: '0 16px' }, { opacity: 1, translate: '0 0' }], { duration: 420, delay: k++ * 40, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
      });
    });
  });
  if (fine && !reduced) {
    cards.forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--ty', (((e.clientX - r.left) / r.width - .5) * 8).toFixed(2) + 'deg');
        card.style.setProperty('--tx', ((-(e.clientY - r.top) / r.height + .5) * 8).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', () => { card.style.setProperty('--tx', '0deg'); card.style.setProperty('--ty', '0deg'); });
    });
  }

  /* ---------- Linha do tempo ---------- */
  const track = $('#timelineTrack');
  const bar = $('#timelineBar');
  const eras = $$('.era', track);
  const updateBar = () => {
    const max = track.scrollWidth - track.clientWidth;
    bar.style.transform = `scaleX(${max > 0 ? Math.max(.04, track.scrollLeft / max) : 1})`;
    const left = track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).paddingLeft);
    const cur = eras.reduce((best, el) => Math.abs(el.getBoundingClientRect().left - left) < Math.abs(best.getBoundingClientRect().left - left) ? el : best, eras[0]);
    $('#timelineYear').textContent = cur.dataset.year;
  };
  track.addEventListener('scroll', updateBar, { passive: true });
  const eraStep = () => eras[0].offsetWidth + 16;
  $('#tlPrev').addEventListener('click', () => track.scrollBy({ left: -eraStep(), behavior: reduced ? 'auto' : 'smooth' }));
  $('#tlNext').addEventListener('click', () => track.scrollBy({ left: eraStep(), behavior: reduced ? 'auto' : 'smooth' }));
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollBy({ left: eraStep(), behavior: 'smooth' }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); track.scrollBy({ left: -eraStep(), behavior: 'smooth' }); }
  });
  let tDown = false, tsx = 0, tsl = 0;
  track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; tDown = true; tsx = e.clientX; tsl = track.scrollLeft; });
  addEventListener('pointermove', e => {
    if (!tDown) return;
    const dx = e.clientX - tsx;
    if (Math.abs(dx) > 4) track.classList.add('is-drag');
    track.scrollLeft = tsl - dx;
  });
  addEventListener('pointerup', () => { if (!tDown) return; tDown = false; track.classList.remove('is-drag'); });
  track.addEventListener('wheel', e => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const max = track.scrollWidth - track.clientWidth;
    if ((track.scrollLeft <= 0 && e.deltaY < 0) || (track.scrollLeft >= max - 1 && e.deltaY > 0)) return;
    e.preventDefault();
    track.scrollLeft += e.deltaY;
  }, { passive: false });

  /* ---------- Moléculas (fórmula estrutural desenhada) ---------- */
  const MOLS = (() => {
    const hex = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
    const ringBonds = (p, dbl) => p.map((a, i) => [a, p[(i + 1) % 6], dbl.includes(i)]);
    // AAS
    const A = hex(120, 100, 34);
    const aas = {
      bonds: [...ringBonds(A, [0, 2, 4]),
        [A[5], [A[5][0] + 30, A[5][1] - 17]], [[A[5][0] + 30, A[5][1] - 17], [A[5][0] + 30, A[5][1] - 51], true], [[A[5][0] + 30, A[5][1] - 17], [A[5][0] + 60, A[5][1]]],
        [A[0], [A[0][0] + 30, A[0][1] + 17]], [[A[0][0] + 30, A[0][1] + 17], [A[0][0] + 60, A[0][1]]], [[A[0][0] + 60, A[0][1]], [A[0][0] + 60, A[0][1] - 34], true], [[A[0][0] + 60, A[0][1]], [A[0][0] + 90, A[0][1] + 17]]],
      atoms: [[[A[5][0] + 30, A[5][1] - 51], 'O'], [[A[5][0] + 60, A[5][1]], 'OH'], [[A[0][0] + 30, A[0][1] + 17], 'O'], [[A[0][0] + 60, A[0][1] - 34], 'O'], [[A[0][0] + 90, A[0][1] + 17], 'CH₃']]
    };
    // Paracetamol
    const P = hex(140, 100, 34);
    const par = {
      bonds: [...ringBonds(P, [0, 2, 4]),
        [P[4], [P[4][0], P[4][1] - 30]],
        [P[1], [P[1][0], P[1][1] + 30]], [[P[1][0], P[1][1] + 30], [P[1][0] + 30, P[1][1] + 47]], [[P[1][0] + 30, P[1][1] + 47], [P[1][0] + 30, P[1][1] + 81], true], [[P[1][0] + 30, P[1][1] + 47], [P[1][0] + 60, P[1][1] + 30]]],
      atoms: [[[P[4][0], P[4][1] - 30], 'HO'], [[P[1][0], P[1][1] + 30], 'NH'], [[P[1][0] + 30, P[1][1] + 81], 'O'], [[P[1][0] + 60, P[1][1] + 30], 'CH₃']]
    };
    // Dipirona (anel pirazolona + fenil)
    const pen = Array.from({ length: 5 }, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return [190 + 30 * Math.cos(a), 96 + 30 * Math.sin(a)]; });
    const F = hex(96, 140, 26);
    const dip = {
      bonds: [[pen[0], pen[1]], [pen[1], pen[2]], [pen[2], pen[3]], [pen[3], pen[4], true], [pen[4], pen[0]],
        [pen[4], [pen[4][0] - 22, pen[4][1] - 22], true], [pen[3], F[5]], ...ringBonds(F, [0, 2, 4]),
        [pen[2], [pen[2][0] + 10, pen[2][1] + 30]], [pen[1], [pen[1][0] + 30, pen[1][1] - 8]],
        [pen[0], [pen[0][0], pen[0][1] - 28]], [[pen[0][0], pen[0][1] - 28], [pen[0][0] - 26, pen[0][1] - 42]], [[pen[0][0], pen[0][1] - 28], [pen[0][0] + 26, pen[0][1] - 42]], [[pen[0][0] + 26, pen[0][1] - 42], [pen[0][0] + 52, pen[0][1] - 28]]],
      atoms: [[pen[2], 'N'], [pen[3], 'N'], [[pen[4][0] - 22, pen[4][1] - 22], 'O'], [[pen[2][0] + 10, pen[2][1] + 30], 'CH₃'], [[pen[1][0] + 30, pen[1][1] - 8], 'CH₃'], [[pen[0][0], pen[0][1] - 28], 'N'], [[pen[0][0] - 26, pen[0][1] - 42], 'CH₃'], [[pen[0][0] + 52, pen[0][1] - 28], 'SO₃Na']]
    };
    return { aas, dip, mol: par };
  })();

  function drawMol(fig) {
    const c = $('canvas', fig), m = MOLS[fig.dataset.mol];
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = c.clientWidth, h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    const x = c.getContext('2d');
    const sc = Math.min(w / 300, h / 200);
    const ox = (w - 300 * sc) / 2, oy = (h - 200 * sc) / 2;
    const P = ([a, b]) => [ox + a * sc, oy + b * sc];
    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue('--ink').trim(), accent = css.getPropertyValue(fig.dataset.mol === 'mol' ? '--red' : fig.dataset.mol === 'dip' ? '--dip' : '--teal').trim();
    const t0 = performance.now(), dur = reduced ? 1 : 1400;
    const frame = now => {
      const p = Math.min((now - t0) / dur, 1);
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      x.clearRect(0, 0, w, h);
      x.lineCap = 'round'; x.lineWidth = 1.6; x.strokeStyle = ink;
      const shown = m.bonds.length * p;
      m.bonds.forEach(([a, b, dbl], i) => {
        const f = clamp(shown - i, 0, 1);
        if (!f) return;
        const A = P(a), B0 = P(b), B = [A[0] + (B0[0] - A[0]) * f, A[1] + (B0[1] - A[1]) * f];
        x.beginPath(); x.moveTo(...A); x.lineTo(...B); x.stroke();
        if (dbl) {
          const dx = B0[0] - A[0], dy = B0[1] - A[1], L = Math.hypot(dx, dy), nx = -dy / L * 4, ny = dx / L * 4;
          x.beginPath(); x.moveTo(A[0] + nx, A[1] + ny); x.lineTo(B[0] + nx, B[1] + ny); x.stroke();
        }
      });
      if (p > .6) {
        x.globalAlpha = (p - .6) / .4;
        x.font = `600 ${Math.round(13 * sc)}px "Geist Mono", monospace`;
        x.textAlign = 'center'; x.textBaseline = 'middle';
        const bg = css.getPropertyValue('--surface').trim();
        m.atoms.forEach(([pt, label]) => {
          const [ax, ay] = P(pt);
          const tw = x.measureText(label).width + 6;
          x.fillStyle = bg; x.fillRect(ax - tw / 2, ay - 9 * sc, tw, 18 * sc);
          x.fillStyle = accent; x.fillText(label, ax, ay);
        });
        x.globalAlpha = 1;
      }
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
  // Redesenha ao trocar de tema
  new MutationObserver(() => $$('.mol.in').forEach(drawMol)).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => $$('.mol.in').forEach(drawMol));

  /* ---------- FAQ ---------- */
  $('#faq').innerHTML = FAQ.map(([q, a], i) => `
    <details class="faq__item reveal" id="faq-${i}"${i === 0 ? ' open' : ''}>
      <summary>${q}<i aria-hidden="true"></i></summary>
      <div class="faq__a"><p>${a}</p></div>
    </details>`).join('');
  $$('.faq__item').forEach(d => d.addEventListener('toggle', () => { if (d.open) $$('.faq__item').forEach(o => { if (o !== d) o.open = false; }); }));

  /* ---------- Onde comprar ---------- */
  const cep = $('#cep'), msg = $('#cepMsg');
  cep.addEventListener('input', () => {
    let v = cep.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
    cep.value = v;
    msg.textContent = '';
  });
  $('#finderForm').addEventListener('submit', e => {
    e.preventDefault();
    const d = cep.value.replace(/\D/g, '');
    if (d.length !== 8) { msg.textContent = 'Digite o CEP com 8 números, por exemplo 01310-100.'; cep.focus(); return; }
    const url = `https://www.google.com/maps/search/farm%C3%A1cia+${d}`;
    msg.innerHTML = `Farmácias perto de ${d.slice(0, 5)}-${d.slice(5)}: <a href="${url}" target="_blank" rel="noopener">abrir no mapa ↗</a>`;
    window.open(url, '_blank', 'noopener');
  });

  /* ---------- Farmácias perto de mim e compra on-line ---------- */
  $('#buyBtn').addEventListener('click', e => { e.preventDefault(); $('#buyList').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); });
  $('#geoBtn').addEventListener('click', () => {
    const open = url => { msg.innerHTML = `Farmácias perto de você: <a href="${url}" target="_blank" rel="noopener">abrir no mapa ↗</a>`; window.open(url, '_blank', 'noopener'); };
    if (!navigator.geolocation) return open('https://www.google.com/maps/search/farm%C3%A1cia');
    msg.textContent = 'Procurando sua localização…';
    navigator.geolocation.getCurrentPosition(
      p => open(`https://www.google.com/maps/search/farm%C3%A1cia/@${p.coords.latitude.toFixed(5)},${p.coords.longitude.toFixed(5)},15z`),
      () => { msg.textContent = 'Não foi possível usar sua localização. Digite seu CEP acima.'; cep.focus(); },
      { timeout: 8000, maximumAge: 300000 });
  });
  const BUY_ITEMS = [...SKUS.map(s => [s.id, fullName(s), s.qtyLabel]), ...CLASSICS.map(c => [c.id, c.name, c.qtyLabel])];
  if (window.LOJAS) $('#buyRows').innerHTML = BUY_ITEMS.map(([id, nome, sub], i) => {
    const c = LOJAS.chips(id); if (!c) return '';
    return `<div class="buylist__row" style="--i:${i}"><div class="buylist__name"><b>${nome}</b><span>${sub}</span></div>${c}</div>`;
  }).join('');

  /* ---------- Busca (Ctrl K) ---------- */
  const pal = $('#palette'), pin = $('#paletteInput'), plist = $('#paletteList');
  const tabNames = { inicio: 'Início', lancamentos: 'Lançamentos', produtos: 'Linha completa', historia: 'História', duvidas: 'Dúvidas e onde comprar' };
  const index = [
    ...SKUS.map(s => ({ kind: 'sku', title: fullName(s), sub: `${s.ativo} · ${s.qtyLabel}`, text: `${fullName(s)} ${s.ativo} ${s.dose} ${s.form} ${s.extra} ${s.fam === 'dip' ? 'dipirona' : 'paracetamol'}`, run: () => { selectSku(s.id, true); go('lancamentos', { hash: s.id }); }, s })),
    ...order.map(id => ({ kind: 'tab', title: tabNames[id], sub: 'Ir para a aba', text: tabNames[id], run: () => go(id) })),
    ...CLASSICS.map(c => ({ kind: 'line', title: c.name, sub: c.ativo, text: `${c.name} ${c.ativo} ${c.desc} ${c.form}`, cls: c, run: () => { selectClassic(c.id); go('produtos', { scrollTo: 'classica', hash: c.id }); } })),
    ...FAQ.map(([q, a], i) => ({ kind: 'faq', title: q, sub: 'Dúvida frequente', text: `${q} ${a}`, run: () => openFaq(i) }))
  ];
  let results = [], sel = 0;
  function openFaq(i) {
    const d = $(`#faq-${i}`);
    go('duvidas', { scrollTo: d });
    setTimeout(() => { d.open = true; d.classList.add('in', 'is-flash'); setTimeout(() => d.classList.remove('is-flash'), 1200); }, 260);
  }
  function renderPal() {
    const q = norm(pin.value.trim());
    results = q ? index.filter(it => q.split(/\s+/).every(w => norm(it.text).includes(w))) : index.slice(0, 9);
    sel = 0;
    plist.innerHTML = results.length ? results.slice(0, 12).map((it, i) => `
      <li class="palette__item${i === 0 ? ' is-sel' : ''}" role="option" data-i="${i}" aria-selected="${i === 0}">
        ${it.s ? flat(it.s) : it.cls ? classicFlat(it.cls) : `<span class="palette__ic">${{ tab: 'aba', line: 'AAS', faq: '?' }[it.kind]}</span>`}
        <div><b>${it.title}</b><span>${it.sub}</span></div><kbd>Enter</kbd>
      </li>`).join('') : `<li class="palette__empty">Nada encontrado para “${escHTML(pin.value)}”. Tente “gotas”, “750” ou “febre”.</li>`;
  }
  function moveSel(d) {
    const els = $$('.palette__item', plist);
    if (!els.length) return;
    sel = (sel + d + els.length) % els.length;
    els.forEach((el, i) => { el.classList.toggle('is-sel', i === sel); el.setAttribute('aria-selected', i === sel); });
    els[sel].scrollIntoView({ block: 'nearest' });
  }
  function openPal() { if (pal.open) return; pin.value = ''; renderPal(); pal.showModal(); pin.focus(); }
  function runSel(i = sel) { const it = results[i]; if (!it) return; pal.close(); it.run(); }
  $('#openPalette').addEventListener('click', openPal);
  pin.addEventListener('input', renderPal);
  pin.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); moveSel(1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); moveSel(-1); }
    if (e.key === 'Enter') { e.preventDefault(); runSel(); }
  });
  plist.addEventListener('click', e => { const li = e.target.closest('.palette__item'); if (li) runSel(+li.dataset.i); });
  pal.addEventListener('click', e => { if (e.target === pal) pal.close(); });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.open ? pal.close() : openPal(); }
    else if (e.key === '/' && !e.target.closest('input, textarea')) { e.preventDefault(); openPal(); }
  });

  /* ---------- Ciclo de vida por aba ---------- */
  function onEnter(id) {
    cancelAnimationFrame(vRAF); vRAF = null;
    clearTimeout(typing); clearInterval(recT);
    if (id === 'inicio') {
      if (!oRAF) oRAF = requestAnimationFrame(orbitFrame);
      if (!reduced && !pRAF) { sizeCanvas(); pRAF = requestAnimationFrame(particles); }
      autoT0 = performance.now();
    } else {
      cancelAnimationFrame(oRAF); oRAF = null;
      cancelAnimationFrame(pRAF); pRAF = null;
    }
    if (id === 'lancamentos') {
      vRAF = requestAnimationFrame(viewerLoop);
      qi = 0; typeLoop(); recClock();
    }
    if (id === 'historia') requestAnimationFrame(updateBar);
    cancelAnimationFrame(cRAF); cRAF = null;
    if (id === 'produtos') cRAF = requestAnimationFrame(classicLoop);
    onScroll();
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) autoT0 = performance.now(); });

  /* ---------- Início ---------- */
  setFamily('dip');
  const h = location.hash.slice(1);
  const startTab = byId(h) ? 'lancamentos' : clsById(h) ? 'produtos' : (order.includes(h) ? h : 'inicio');
  if (byId(h)) selectSku(h, true);
  if (clsById(h)) { selectClassic(h, true); setTimeout(() => $('#classica').scrollIntoView({ block: 'start' }), 60); }
  if (startTab !== 'inicio') {
    $('.view.is-active').classList.remove('is-active');
    current = startTab;
    $(`.view[data-view="${startTab}"]`).classList.add('is-active');
    tabBtns.forEach(b => { const on = b.dataset.go === startTab; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on); });
  }
  $('.view.is-active').classList.add('is-settled');
  movePill();
  observeReveals($('.view.is-active'));
  onEnter(current);
})();
