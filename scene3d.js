/* =========================================================
   Família Asp · produtos em WebGL (three.js)
   Caixas com geometria real e as artes do catalog.js como textura;
   frasco das gotas como sólido de revolução com o perfil da embalagem.
   Unidade do mundo = 1 px na profundidade 0, para casar com o layout.
   ========================================================= */
import * as THREE from './assets/vendor/three.module.min.js';
import { RoomEnvironment } from './assets/vendor/RoomEnvironment.js';

const ASP = window.ASP;
const { C } = ASP;
const DEG = Math.PI / 180;

/* ---------- Fontes embutidas nas artes ----------
   SVG desenhado como imagem não enxerga as fontes da página, então as
   fontes vão dentro do próprio SVG, em base64. */
const FONT_FILES = [
  ['Barlow Condensed', 'italic', 300, 'BarlowCondensed-300i'], ['Barlow Condensed', 'italic', 500, 'BarlowCondensed-500i'],
  ['Barlow Condensed', 'italic', 800, 'BarlowCondensed-800i'], ['Barlow Condensed', 'normal', 500, 'BarlowCondensed-500'],
  ['Barlow Condensed', 'normal', 600, 'BarlowCondensed-600'], ['Barlow Condensed', 'normal', 700, 'BarlowCondensed-700'],
  ['Barlow Condensed', 'normal', 800, 'BarlowCondensed-800'], ['Jost', 'normal', 600, 'Jost-600'], ['Jost', 'normal', 700, 'Jost-700'], ['Marcellus', 'normal', 400, 'Marcellus-400']
];
let fontCSS = null;
async function loadFontCSS() {
  if (fontCSS !== null) return fontCSS;
  const toB64 = buf => {
    let s = ''; const b = new Uint8Array(buf);
    for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode.apply(null, b.subarray(i, i + 0x8000));
    return btoa(s);
  };
  const faces = await Promise.all(FONT_FILES.map(async ([fam, style, w, file]) => {
    try {
      const r = await fetch(`assets/fonts/${file}.woff2`);
      if (!r.ok) return '';
      return `@font-face{font-family:'${fam}';font-style:${style};font-weight:${w};src:url(data:font/woff2;base64,${toB64(await r.arrayBuffer())}) format('woff2');}`;
    } catch (e) { return ''; }
  }));
  // A mesma fonte também na página, para os rótulos desenhados em canvas
  FONT_FILES.forEach(([fam, style, w, file]) => {
    try { const ff = new FontFace(fam, `url(assets/fonts/${file}.woff2)`, { style, weight: String(w) }); document.fonts.add(ff); ff.load().catch(() => {}); } catch (e) {}
  });
  fontCSS = faces.join('');
  return fontCSS;
}

async function svgToCanvas(svg, w, h) {
  const css = await loadFontCSS();
  const withFonts = svg
    .replace(/<svg([^>]*?)class="art"/, `<svg$1width="${w}" height="${h}"`)
    .replace(/(<svg[^>]*>)/, `$1<defs><style>${css}</style></defs>`);
  const url = URL.createObjectURL(new Blob([withFonts], { type: 'image/svg+xml' }));
  const img = new Image();
  img.src = url;
  try { await img.decode(); } catch (e) { await new Promise(r => { img.onload = r; img.onerror = r; }); }
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  cv.getContext('2d').drawImage(img, 0, 0, w, h);
  URL.revokeObjectURL(url);
  return cv;
}

function canvasTex(cv, renderer) {
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  t.needsUpdate = true;
  return t;
}

// Lateral: as mesmas faixas da borda da frente (continuidade perfeita)
function sideCanvas(s, edge, label) {
  const H = 512, W = 128;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const x = cv.getContext('2d');
  ASP.sideStops(s, edge).forEach(([col, a, b]) => { x.fillStyle = col; x.fillRect(0, Math.floor(a * H), W, Math.ceil((b - a) * H) + 1); });
  if (label) {
    x.save();
    x.translate(W / 2, H * .82); x.rotate(-Math.PI / 2);
    x.fillStyle = '#fff'; x.font = `700 ${Math.round(W * .2)}px "Barlow Condensed", "Arial Narrow", sans-serif`;
    x.textAlign = 'left'; x.textBaseline = 'middle';
    x.fillText(label, 0, 0);
    x.restore();
  }
  return cv;
}

function flatCanvas(top, bottom) {
  const cv = document.createElement('canvas');
  cv.width = 64; cv.height = 64;
  const x = cv.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 64); g.addColorStop(0, top); g.addColorStop(1, bottom);
  x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  return cv;
}

let shadowTex = null;
function contactShadow(w, d) {
  if (!shadowTex) {
    const cv = document.createElement('canvas'); cv.width = cv.height = 128;
    const x = cv.getContext('2d');
    const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(0,36,30,.55)'); g.addColorStop(.55, 'rgba(0,36,30,.2)'); g.addColorStop(1, 'rgba(0,36,30,0)');
    x.fillStyle = g; x.fillRect(0, 0, 128, 128);
    shadowTex = new THREE.CanvasTexture(cv);
  }
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  m.renderOrder = -1;
  return m;
}

/* ---------- Caixa ---------- */
function stopsCanvas(stops) {
  const H = 512, cv = document.createElement('canvas');
  cv.width = 64; cv.height = H;
  const x = cv.getContext('2d');
  stops.forEach(([col, a, b]) => { x.fillStyle = col; x.fillRect(0, Math.floor(a * H), 64, Math.ceil((b - a) * H) + 1); });
  return cv;
}

async function buildClassicBox(s, renderer) {
  const { w, h, d } = s.box;
  const [front, back] = await Promise.all([
    svgToCanvas(s.front(), 1100, Math.round(s.vb * 1.1)),
    svgToCanvas(s.back(), 700, Math.round(s.vb * .7))
  ]);
  const mat = (cv, rough = .5) => new THREE.MeshStandardMaterial({ map: canvasTex(cv, renderer), roughness: rough, metalness: 0, envMapIntensity: .55 });
  const mats = [mat(stopsCanvas(s.sides.right)), mat(stopsCanvas(s.sides.left)), mat(flatCanvas(s.top[0], s.top[1])), mat(flatCanvas(s.bottom, s.bottom)), mat(front, .4), mat(back)];
  return { mesh: new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats), mats };
}

async function buildBox(s, renderer) {
  if (s.classic) return buildClassicBox(s, renderer);
  const { w, h, d } = s.box;
  const fw = s.drops ? 420 : 1000, fh = s.drops ? 994 : s.vb;
  const scale = s.drops ? 1.2 : 1.1;
  const [front, back] = await Promise.all([
    svgToCanvas(s.drops ? ASP.gotasBoxSVG() : ASP.frontSVG(s), Math.round(fw * scale), Math.round(fh * scale)),
    svgToCanvas(s.drops ? ASP.gotasBackSVG() : ASP.backSVG(s), Math.round(fw * scale * .7), Math.round(fh * scale * .7))
  ]);
  const f = ASP.FAMILIES[s.fam];
  const mat = (cv, rough = .55) => new THREE.MeshStandardMaterial({ map: canvasTex(cv, renderer), roughness: rough, metalness: 0, envMapIntensity: .55 });
  // ordem do BoxGeometry: +x direita, -x esquerda, +y topo, -y base, +z frente, -z verso
  const mats = [
    mat(sideCanvas(s, 'right', `ASP${f.word} ${s.doseShort}`)),
    mat(sideCanvas(s, 'left')),
    mat(flatCanvas('#FFFFFF', '#EEF1F1')),
    mat(flatCanvas(C.teal3, C.teal3)),
    mat(front, .42),
    mat(back)
  ];
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats);
  return { mesh, mats };
}

/* ---------- Frasco das gotas ----------
   Medidas tiradas da foto da embalagem (raio do corpo = 41,6):
   corpo reto com ombro arredondado, rótulo de 17 a 120 de altura,
   tampa conta-gotas com anel liso, saia estriada e bico cônico. */
const BODY_R = 41.6, LABEL_R = 41.75, LABEL_Y0 = 17.3, LABEL_H = 102.4;

function bottleLabel() {
  const W = 2 * Math.PI * LABEL_R, H = LABEL_H, k = 6;
  const cv = document.createElement('canvas');
  cv.width = Math.round(W * k); cv.height = Math.round(H * k);
  const x = cv.getContext('2d');
  x.scale(k, k);
  const cx = W / 2;
  // arco no rótulo a partir de uma posição vista de frente (fração do raio)
  const arc = f => Math.asin(Math.max(-1, Math.min(1, f))) * LABEL_R;
  const L = cx + arc(-0.9);                         // margem esquerda do texto
  // faixas
  x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H);
  x.fillStyle = '#C9CED0'; x.fillRect(0, 29.6, W, .9);
  const lime = x.createLinearGradient(0, 30.5, 0, 54);
  lime.addColorStop(0, '#B4D334'); lime.addColorStop(1, '#9CC73A');
  x.fillStyle = lime; x.fillRect(0, 30.5, W, 23.7);
  x.fillStyle = '#C9CED0'; x.fillRect(0, 54.2, W, 1.6);
  const teal = x.createLinearGradient(0, 55.8, 0, H);
  teal.addColorStop(0, '#0B9C7D'); teal.addColorStop(1, '#078F72');
  x.fillStyle = teal; x.fillRect(0, 55.8, W, H - 55.8);
  // cruz Bayer
  const bx = cx + arc(-0.795), by = 16.6, br = 5;
  x.strokeStyle = '#1A1A1A'; x.lineWidth = .55;
  x.beginPath(); x.arc(bx, by, br, 0, Math.PI * 2); x.stroke();
  x.fillStyle = '#1A1A1A'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.font = '700 2.2px Jost, sans-serif';
  'BAYER'.split('').forEach((ch, i) => { x.fillText(ch, bx, by + (i - 2) * 1.75); if (i !== 2) x.fillText(ch, bx + (i - 2) * 1.75, by); });
  // ASPDIP ajustado à largura medida
  x.textAlign = 'left'; x.textBaseline = 'alphabetic';
  const x0 = cx + arc(-0.644), x1 = cx + arc(0.87);
  x.font = '600 20px Jost, Futura, sans-serif';
  const fs = 20 * (x1 - x0) / x.measureText('ASPDIP').width;
  x.font = `600 ${fs.toFixed(2)}px Jost, Futura, sans-serif`;
  x.fillStyle = '#1A1A1A'; x.fillText('ASP', x0, 23.6);
  const aw = x.measureText('ASP').width;
  x.fillStyle = '#1FA48B'; x.fillText('DIP', x0 + aw, 23.6);
  // dipirona 500mg/mL (sans regular, branco)
  x.fillStyle = '#FFFFFF';
  x.font = '600 11.2px Geist, "Helvetica Neue", Arial, sans-serif';
  x.fillText('dipirona', L, 40.2);
  x.fillText('500mg/mL', L, 50.6);
  // bloco verde
  x.font = 'italic 800 8.4px "Barlow Condensed", "Arial Narrow", sans-serif';
  x.fillText('DOR', L, 65.5);
  let w = x.measureText('DOR ').width;
  x.font = 'italic 300 8.4px "Barlow Condensed", "Arial Narrow", sans-serif';
  x.fillText('&', L + w, 65.5);
  w += x.measureText('& ').width;
  x.font = 'italic 800 8.4px "Barlow Condensed", "Arial Narrow", sans-serif';
  x.fillText('FEBRE', L + w, 65.5);
  x.fillStyle = '#C3DD48';
  x.font = '700 4.6px "Barlow Condensed", "Arial Narrow", sans-serif';
  x.fillText('GOTAS', L, 71.6);
  x.font = '500 3px "Barlow Condensed", "Arial Narrow", sans-serif';
  x.fillText('SABOR ABACAXI', L + 12, 71.4);
  x.fillStyle = '#FFFFFF';
  x.font = '500 3px "Barlow Condensed", "Arial Narrow", sans-serif';
  x.fillText('CONTEÚDO', L, 79.2);
  x.font = '600 7px "Barlow Condensed", "Arial Narrow", sans-serif';
  x.fillText('20mL', L + 12.5, 79.6);
  x.font = '500 5.6px "Barlow Condensed", "Arial Narrow", sans-serif';
  x.fillText('SOLUÇÃO ORAL.  USO ORAL.', L, 88);
  // gota dourada
  const gx = cx + arc(0.583), gy = 75.6, gr = 4.7;
  const gd = x.createRadialGradient(gx - 1.6, gy - 1.6, .3, gx, gy, gr + .6);
  gd.addColorStop(0, '#FBF1B8'); gd.addColorStop(.55, '#D6BC55'); gd.addColorStop(1, '#9C8530');
  x.fillStyle = gd; x.beginPath(); x.moveTo(gx, gy - gr * 2.6);
  x.bezierCurveTo(gx, gy - gr * 2.6, gx - gr, gy - gr * .6, gx - gr, gy); x.arc(gx, gy, gr, Math.PI, 0, true);
  x.bezierCurveTo(gx + gr, gy - gr * .6, gx, gy - gr * 2.6, gx, gy - gr * 2.6); x.fill();
  x.fillStyle = 'rgba(255,255,255,.55)'; x.beginPath(); x.ellipse(gx - 1.6, gy - 1, .9, 1.8, -.3, 0, Math.PI * 2); x.fill();
  // verso
  x.fillStyle = 'rgba(255,255,255,.9)';
  x.font = '500 4.4px "Barlow Condensed", "Arial Narrow", sans-serif';
  const bk = cx + Math.PI * LABEL_R - 26;
  ['Dos mesmos criadores', 'da Aspirina.', 'Leia a bula.'].forEach((t, i) => x.fillText(t, bk, 66 + i * 6));
  return cv;
}

// Estrias verticais da saia da tampa (relevo)
function ribCanvas() {
  const cv = document.createElement('canvas'); cv.width = 512; cv.height = 4;
  const x = cv.getContext('2d');
  const n = 56, wd = 512 / n;
  for (let i = 0; i < n; i++) {
    const g = x.createLinearGradient(i * wd, 0, (i + 1) * wd, 0);
    g.addColorStop(0, '#606060'); g.addColorStop(.5, '#FFFFFF'); g.addColorStop(1, '#606060');
    x.fillStyle = g; x.fillRect(i * wd, 0, wd, 4);
  }
  return cv;
}

function lathe(points, seg = 72) {
  return new THREE.LatheGeometry(points.map(([r, y]) => new THREE.Vector2(r, y)), seg);
}

function buildBottle(renderer) {
  const g = new THREE.Group();
  // Mesmo material para frasco e rótulo: o branco do rótulo bate com o do plástico
  const props = { roughness: .3, metalness: 0, clearcoat: .55, clearcoatRoughness: .22, envMapIntensity: .75 };
  const plastic = new THREE.MeshPhysicalMaterial({ color: 0xFFFFFF, ...props });
  const body = new THREE.Mesh(lathe([
    [0, 0], [36, 0], [39.6, .8], [41.2, 3], [BODY_R, 6.3], [BODY_R, 128], [41.2, 133], [39.6, 138],
    [36.6, 142.5], [32.8, 146.4], [29.6, 149.2], [28.3, 150.8]
  ]), plastic);
  g.add(body);
  const labelMat = new THREE.MeshPhysicalMaterial({ map: canvasTex(bottleLabel(), renderer), ...props });
  const label = new THREE.Mesh(new THREE.CylinderGeometry(LABEL_R, LABEL_R, LABEL_H, 96, 1, true, -Math.PI, Math.PI * 2), labelMat);
  label.position.y = LABEL_Y0 + LABEL_H / 2;
  g.add(label);
  // tampa: anel liso com friso, saia estriada, transição e bico cônico
  const capMat = new THREE.MeshPhysicalMaterial({ color: 0xFFFFFF, ...props, roughness: .38 });
  const band = new THREE.Mesh(lathe([
    [28.3, 150.4], [30.9, 150.6], [30.9, 154.3], [30.1, 154.8], [30.9, 155.3], [30.9, 159.2], [30.2, 159.4]
  ], 64), capMat);
  g.add(band);
  const rib = new THREE.CanvasTexture(ribCanvas());
  rib.wrapS = THREE.RepeatWrapping;
  const skirtMat = new THREE.MeshPhysicalMaterial({ color: 0xFFFFFF, ...props, roughness: .42, bumpMap: rib, bumpScale: 2.2 });
  const skirt = new THREE.Mesh(new THREE.CylinderGeometry(30.2, 30.2, 33.6, 96, 1, true), skirtMat);
  skirt.position.y = 159.2 + 16.8;
  g.add(skirt);
  const nozzle = new THREE.Mesh(lathe([
    [30.2, 192.8], [29.4, 194.6], [26.5, 196.8], [22, 198.6], [19.6, 200], [18.6, 202.5],
    [16.2, 210], [14, 216.5], [12.6, 219.3], [10, 220.9], [5, 221.5], [0, 221.6]
  ], 64), capMat);
  g.add(nozzle);
  g.userData.mats = [plastic, labelMat, capMat, skirtMat];
  return g;
}

/* ---------- Palco WebGL ---------- */
class Stage {
  constructor(host, { perspective = 1800, lite = false } = {}) {
    this.host = host;
    this.perspective = perspective;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'gl';
    this.canvas.setAttribute('aria-hidden', 'true');
    host.prepend(this.canvas);
    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.NoToneMapping;
    this.maxDpr = lite ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, this.maxDpr));
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), .04).texture;
    pmrem.dispose();
    // Luz calibrada para a frente da caixa sair com a cor impressa (sem estourar)
    const key = new THREE.DirectionalLight(0xFFFFFF, .75);
    key.position.set(-400, 700, 900);
    this.scene.add(key);
    this.scene.add(new THREE.AmbientLight(0xFFFFFF, .12));
    this.camera = new THREE.PerspectiveCamera(30, 1, 10, 6000);
    this.raycaster = new THREE.Raycaster();
    this.resize();
    new ResizeObserver(() => this.resize()).observe(host);
  }
  resize() {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    if (!w || !h) return;
    this.w = w; this.h = h;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.fov = 2 * Math.atan(h / 2 / this.perspective) / DEG;
    this.camera.position.set(0, 0, this.perspective);
    this.camera.updateProjectionMatrix();
    this.dirty = true;
  }
  render() { this.renderer.render(this.scene, this.camera); }
  pick(clientX, clientY, roots) {
    const r = this.canvas.getBoundingClientRect();
    const v = new THREE.Vector2(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
    this.raycaster.setFromCamera(v, this.camera);
    const hit = this.raycaster.intersectObjects(roots, true)[0];
    let o = hit && hit.object;
    while (o && o.userData.idx === undefined) o = o.parent;
    return o ? o.userData.idx : -1;
  }
}

// Produto completo: grupo externo (posição/escala) > pose (inclinação) > malhas
async function buildProduct(s, renderer, idx) {
  const outer = new THREE.Group();
  const pose = new THREE.Group();
  outer.add(pose);
  outer.userData.idx = idx;
  const { mesh, mats } = await buildBox(s, renderer);
  const allMats = [...mats];
  if (s.drops) {
    mesh.position.set(-58, 0, 0);
    pose.add(mesh);
    const b = buildBottle(renderer);
    // altura do frasco = 77% da caixa, como na foto
    const sc = (s.box.h * .77) / 221.6;
    b.scale.setScalar(sc);
    b.position.set(56, -s.box.h / 2, 26);
    b.rotation.y = 24 * DEG; // rótulo de frente para quem olha, como na foto
    pose.add(b);
    allMats.push(...b.userData.mats);
  } else {
    pose.add(mesh);
  }
  const sh = contactShadow((s.drops ? 260 : s.box.w) * 1.15, Math.max(s.box.d, 70) * 2.4);
  sh.position.y = -s.box.h / 2 - 22;
  outer.add(sh);
  outer.userData.mats = allMats;
  outer.userData.w = s.drops ? 260 : s.box.w;
  outer.userData.h = s.box.h;
  outer.userData.shadow = sh;
  return outer;
}

function setFog(group, fog) {
  if (group.userData.fog === fog) return;
  group.userData.fog = fog;
  const v = 1 - fog;
  group.userData.mats.forEach(m => m.color.setScalar(m.map ? v : v * .99 + .01));
}

/* ---------- API para o app.js ---------- */
export async function create({ lite }) {
  // Fontes usadas nos rótulos desenhados em canvas precisam estar prontas antes
  await loadFontCSS();
  await Promise.all(['600 12px Geist', '600 20px Jost', 'italic 800 10px "Barlow Condensed"', 'italic 300 10px "Barlow Condensed"',
    '500 10px "Barlow Condensed"', '600 10px "Barlow Condensed"', '700 10px "Barlow Condensed"'].map(f => document.fonts.load(f).catch(() => {})));
  // Hero: órbita
  const orbitHost = document.getElementById('orbit');
  const orbit = new Stage(orbitHost, { perspective: 1800, lite });
  const items = await Promise.all(ASP.SKUS.map((s, i) => buildProduct(s, orbit.renderer, i)));
  items.forEach(g => orbit.scene.add(g));

  const orbitApi = {
    items,
    set(i, st) {
      const g = items[i];
      const yOff = orbit.h * .04;
      g.position.set(st.x, -st.y + yOff, st.z);
      g.rotation.set(0, st.ry * DEG, 0);
      g.scale.setScalar(st.scale);
      g.children[0].rotation.set(st.tilt * DEG, st.yaw * DEG, 0, 'XYZ');
      setFog(g, st.fog);
    },
    render() { orbit.render(); },
    pick(x, y) { return orbit.pick(x, y, items); }
  };

  // Visualizadores (Lançamentos e Linha clássica): mesma lógica, palcos separados
  function makeViewer(hostId) {
    const host = document.getElementById(hostId);
    if (!host) return null;
    const viewer = new Stage(host, { perspective: 1400, lite });
    const cache = new Map();
    let current = null, next = null, swapT0 = 0;
    const holder = new THREE.Group();
    viewer.scene.add(holder);
    return {
      async setProduct(s, instant) {
        let g = cache.get(s.id);
        if (!g) { g = await buildProduct(s, viewer.renderer, 0); g.userData.shadow.visible = false; cache.set(s.id, g); }
        if (g === current) return;
        if (instant || !current) { if (current) holder.remove(current); current = g; holder.add(g); swapT0 = 0; return; }
        next = g; swapT0 = performance.now();
      },
      frame(now, rx, ry, bob, baseScale) {
        // troca: encolhe a atual e cresce a nova (300 ms, ease-in-out)
        let k = 1;
        if (swapT0) {
          const p = Math.min((now - swapT0) / 300, 1);
          if (p < .5) k = 1 - .6 * easeIO(p * 2);
          else { if (next) { holder.remove(current); current = next; next = null; holder.add(current); } k = .4 + .6 * easeIO((p - .5) * 2); }
          if (p >= 1) swapT0 = 0;
        }
        holder.position.set(0, bob + viewer.h * .03, 0);
        holder.scale.setScalar(baseScale * k);
        holder.rotation.set(-rx * DEG, ry * DEG, 0, 'XYZ');
        viewer.render();
      }
    };
  }
  const viewerApi = makeViewer('viewer');
  const classicViewerApi = makeViewer('viewer2');
  // Clássicos do início: uma cena por cartão, renderizada só quando visível
  const classics = [];
  for (const host of document.querySelectorAll('.classic-item__stage[data-cls]')) {
    const c = ASP.CLASSICS.find(k => k.id === host.dataset.cls);
    if (!c) continue;
    const st = new Stage(host, { perspective: 900, lite });
    const g = await buildProduct(c, st.renderer, 0);
    st.scene.add(g);
    const item = { st, g, visible: false, i: classics.length };
    new IntersectionObserver(([en]) => { item.visible = en.isIntersecting; }).observe(host);
    host.classList.add('is-gl');
    classics.push(item);
  }
  const classicsApi = {
    frame(now, hover) {
      classics.forEach(({ st, g, visible, i }) => {
        if (!visible || !st.w) return;
        const k = Math.min(st.w / (g.userData.w * 1.12), st.h / (g.userData.h * 1.7));
        g.scale.setScalar(k * (hover === i ? 1.05 : 1));
        g.position.set(0, Math.sin(now / 1100 + i * 2) * 6 + st.h * .04, 0);
        g.children[0].rotation.set(12 * DEG, (-26 + Math.sin(now / 1500 + i * 1.6) * 9) * DEG, 0, 'XYZ');
        st.render();
      });
    }
  };
  return { orbit: orbitApi, viewer: viewerApi, viewer2: classicViewerApi, classics: classicsApi };
}

const easeIO = t => (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
