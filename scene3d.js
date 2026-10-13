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
  ['Barlow Condensed', 'normal', 800, 'BarlowCondensed-800'], ['Jost', 'normal', 600, 'Jost-600'], ['Jost', 'normal', 700, 'Jost-700']
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
async function buildBox(s, renderer) {
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
   Perfil (raio, altura) em px, medido da foto: corpo com ombro arredondado,
   colar, tampa alta afunilada com estrias. */
function bottleLabel() {
  const R = 41.8, H = 116, k = 4;
  const W = Math.round(2 * Math.PI * R);
  const cv = document.createElement('canvas');
  cv.width = W * k; cv.height = H * k;
  const x = cv.getContext('2d');
  x.scale(k, k);
  const cx = W / 2;
  const band0 = H * .36, band1 = H * .55;
  x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, band0);
  const lime = x.createLinearGradient(0, 0, W, 0);
  lime.addColorStop(0, C.lime1); lime.addColorStop(.5, C.lime2); lime.addColorStop(1, C.lime1);
  x.fillStyle = lime; x.fillRect(0, band0, W, band1 - band0);
  x.fillStyle = C.silver; x.fillRect(0, band1, W, 1.4);
  x.fillStyle = C.teal2; x.fillRect(0, band1 + 1.4, W, H - band1);
  // cruz Bayer + ASPDIP
  const by = band0 * .55;
  x.strokeStyle = C.ink; x.lineWidth = .9;
  x.beginPath(); x.arc(cx - 35, by, 7, 0, Math.PI * 2); x.stroke();
  x.fillStyle = C.ink; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.font = '700 3.2px Jost, sans-serif';
  'BAYER'.split('').forEach((ch, i) => { x.fillText(ch, cx - 35, by + (i - 2) * 2.6); if (i !== 2) x.fillText(ch, cx - 35 + (i - 2) * 2.6, by); });
  x.textAlign = 'left'; x.textBaseline = 'alphabetic';
  x.font = '600 21px Jost, Futura, sans-serif';
  x.fillText('ASP', cx - 25, by + 7.5);
  const aw = x.measureText('ASP').width;
  x.fillStyle = C.dipWord; x.fillText('DIP', cx - 25 + aw - .5, by + 7.5);
  x.fillStyle = '#FFFFFF';
  x.font = '500 12.5px "Barlow Condensed", "Arial Narrow", sans-serif';
  x.fillText('dipirona', cx - 35, band0 + 10.5);
  x.fillText('500mg/mL', cx - 35, band0 + 20.5);
  x.font = 'italic 800 11px "Barlow Condensed", "Arial Narrow", sans-serif';
  x.fillText('DOR', cx - 35, band1 + 13);
  x.font = 'italic 300 11px "Barlow Condensed", "Arial Narrow", sans-serif';
  x.fillText('&', cx - 35 + 19, band1 + 13);
  x.font = 'italic 800 11px "Barlow Condensed", "Arial Narrow", sans-serif';
  x.fillText('FEBRE', cx - 35 + 26, band1 + 13);
  x.fillStyle = C.lime2; x.font = '700 9px "Barlow Condensed", "Arial Narrow", sans-serif';
  x.fillText('GOTAS', cx - 35, band1 + 24);
  x.fillStyle = 'rgba(255,255,255,.9)'; x.font = '500 6px "Barlow Condensed", "Arial Narrow", sans-serif';
  x.fillText('Conteúdo 20 mL', cx - 35, band1 + 33);
  x.fillText('SOLUÇÃO ORAL. USO ORAL.', cx - 35, band1 + 40);
  // gota dourada
  const gx = cx + 22, gy = band1 + 30, gr = 5.5;
  const gd = x.createRadialGradient(gx - 2, gy - 2, .5, gx, gy, gr + 1);
  gd.addColorStop(0, '#F8EBA8'); gd.addColorStop(.6, C.gold); gd.addColorStop(1, '#8E7A2A');
  x.fillStyle = gd; x.beginPath(); x.moveTo(gx, gy - gr * 2.1);
  x.bezierCurveTo(gx, gy - gr * 2.1, gx - gr, gy - gr * .5, gx - gr, gy); x.arc(gx, gy, gr, Math.PI, 0, true);
  x.bezierCurveTo(gx + gr, gy - gr * .5, gx, gy - gr * 2.1, gx, gy - gr * 2.1); x.fill();
  // verso
  x.fillStyle = 'rgba(255,255,255,.88)'; x.font = '500 6.5px "Barlow Condensed", "Arial Narrow", sans-serif';
  x.fillText('Dos mesmos criadores da Aspirina.', 10, band1 + 14);
  x.fillText('Leia a bula. Sabor abacaxi.', 10, band1 + 22);
  return cv;
}

function ridgeCanvas() {
  const cv = document.createElement('canvas'); cv.width = 256; cv.height = 8;
  const x = cv.getContext('2d');
  for (let i = 0; i < 256; i += 8) { x.fillStyle = '#FFFFFF'; x.fillRect(i, 0, 5, 8); x.fillStyle = '#9AA0A2'; x.fillRect(i + 5, 0, 3, 8); }
  return cv;
}

function buildBottle(renderer) {
  const g = new THREE.Group();
  const plastic = new THREE.MeshPhysicalMaterial({ color: 0xFBFCFC, roughness: .32, metalness: 0, clearcoat: .6, clearcoatRoughness: .25 });
  const pts = [[0, 0], [37, 0], [40.8, 2.5], [41.6, 7], [41.6, 126], [41, 131], [38.5, 136], [33, 140.5], [26, 143.5], [22.5, 145], [22.5, 151]]
    .map(([r, y]) => new THREE.Vector2(r, y));
  const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 64), plastic);
  g.add(body);
  // rótulo enrolado (cilindro aberto um pouco maior que o corpo)
  const lt = canvasTex(bottleLabel(), renderer);
  const labelMat = new THREE.MeshStandardMaterial({ map: lt, roughness: .38, metalness: 0, envMapIntensity: .6 });
  const label = new THREE.Mesh(new THREE.CylinderGeometry(41.9, 41.9, 116, 64, 1, true, -Math.PI, Math.PI * 2), labelMat);
  label.position.y = 8 + 58;
  g.add(label);
  // colar estriado e tampa alta afunilada
  const ridge = new THREE.CanvasTexture(ridgeCanvas());
  ridge.wrapS = THREE.RepeatWrapping; ridge.repeat.set(6, 1);
  const capMat = new THREE.MeshPhysicalMaterial({ color: 0xFFFFFF, roughness: .45, clearcoat: .4, bumpMap: ridge, bumpScale: 1.2 });
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(25.5, 25.5, 9, 48), capMat);
  collar.position.y = 151 + 4.5;
  g.add(collar);
  const capPts = [[25, 0], [24.5, 30], [22.5, 46], [20.5, 54], [17, 59], [9, 61], [0, 61.5]].map(([r, y]) => new THREE.Vector2(r, y));
  const cap = new THREE.Mesh(new THREE.LatheGeometry(capPts, 48), new THREE.MeshPhysicalMaterial({ color: 0xFFFFFF, roughness: .4, clearcoat: .5 }));
  cap.position.y = 160;
  g.add(cap);
  g.userData.mats = [plastic, labelMat, capMat, cap.material];
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
    const sc = s.box.h / 246;
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

  // Lançamentos: visualizador
  const viewerHost = document.getElementById('viewer');
  const viewer = new Stage(viewerHost, { perspective: 1400, lite });
  const cache = new Map();
  let current = null, next = null, swapT0 = 0;
  const holder = new THREE.Group();
  viewer.scene.add(holder);
  const viewerApi = {
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
  return { orbit: orbitApi, viewer: viewerApi };
}

const easeIO = t => (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
