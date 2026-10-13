/* =========================================================
   Catálogo da família Asp + desenho vetorial das embalagens
   Cores e layout copiados das embalagens reais (fotos Bayer).
   O site não traz indicação, posologia nem recomendação de uso:
   só o que identifica cada produto e a embalagem.
   ========================================================= */
window.ASP = (() => {
  const C = {
    teal1: '#00A785', teal2: '#00997B', teal3: '#007960',
    red: '#DC1F2A', red2: '#C40230', wine: '#7A2331', wine2: '#751A29',
    dipWord: '#1FA48B', lime1: '#97C93A', lime2: '#C3DD48', limeBadge: '#A9D33F',
    green1: '#2BAA47', green2: '#62BE45', greenBadge: '#36A848',
    gold: '#C9AE45', ink: '#111111', silver: '#CDD1D3'
  };

  const SKUS = [
    {
      id: 'aspdip-500', fam: 'dip', name: 'AspDip', dose: '500 mg', doseShort: '500mg',
      form: 'Comprimidos', qtyLabel: '30 comprimidos',
      ativo: 'Dipirona monoidratada', formula: 'C₁₃H₁₆N₃NaO₄S · H₂O',
      extra: 'Comprimido branco e oblongo',
      band: [C.lime1, C.lime2], badge: { bg: C.limeBadge, text: '500mg' },
      box: { w: 250, h: 119, d: 62 }, vb: 476,
      tagline: null, contem: 'CONTÉM: 30 COMPRIMIDOS. USO ORAL. USO ADULTO E PEDIÁTRICO ACIMA DE 15 ANOS.',
      pill: 'oblong'
    },
    {
      id: 'aspdip-1g', fam: 'dip', name: 'AspDip', dose: '1 g', doseShort: '1g',
      form: 'Comprimidos', qtyLabel: '10 comprimidos',
      ativo: 'Dipirona monoidratada', formula: 'C₁₃H₁₆N₃NaO₄S · H₂O',
      extra: 'Comprimido branco e oblongo',
      band: [C.green1, C.green2], badge: { bg: C.greenBadge, text: '1g', big: true },
      box: { w: 300, h: 134, d: 46 }, vb: 448,
      tagline: 'ALTA CONCENTRAÇÃO DE ANALGÉSICO', contem: 'CONTÉM: 10 COMPRIMIDOS. USO ORAL. USO ADULTO E PEDIÁTRICO ACIMA DE 15 ANOS.',
      pill: 'oblong'
    },
    {
      id: 'aspdip-gotas', fam: 'dip', name: 'AspDip Gotas', dose: '500 mg/mL', doseShort: '500mg/mL',
      form: 'Solução oral em gotas', qtyLabel: 'Frasco de 20 mL com caixa',
      ativo: 'Dipirona monoidratada', formula: 'C₁₃H₁₆N₃NaO₄S · H₂O',
      extra: 'Sabor abacaxi · 20 gotas = 1 mL',
      band: [C.lime1, C.lime2], drops: true,
      box: { w: 104, h: 246, d: 70 }
    },
    {
      id: 'aspmol-500', fam: 'mol', name: 'AspMol', dose: '500 mg', doseShort: '500mg',
      form: 'Comprimidos', qtyLabel: '20 comprimidos',
      ativo: 'Paracetamol', formula: 'C₈H₉NO₂',
      extra: 'Comprimido branco e redondo',
      band: [C.red, C.red2], dots: true,
      box: { w: 306, h: 145, d: 50 }, vb: 474,
      tagline: 'ALÍVIO DAS DORES NO CORPO E FEBRE', contem: 'CONTÉM: 20 COMPRIMIDOS. USO ORAL. USO ADULTO E PEDIÁTRICO ACIMA DE 12 ANOS.',
      pill: 'round', ean: '7891106916639'
    },
    {
      id: 'aspmol-750', fam: 'mol', name: 'AspMol', dose: '750 mg', doseShort: '750mg',
      form: 'Comprimidos', qtyLabel: '20 comprimidos',
      ativo: 'Paracetamol', formula: 'C₈H₉NO₂',
      extra: 'Comprimido branco e oblongo',
      band: [C.wine, C.wine], badge: { bg: C.wine2, text: '750mg', italic: true },
      box: { w: 306, h: 134, d: 50 }, vb: 436,
      tagline: 'ALÍVIO DAS DORES NO CORPO E FEBRE', contem: 'CONTÉM: 20 COMPRIMIDOS. USO ORAL. USO ADULTO E PEDIÁTRICO ACIMA DE 12 ANOS.',
      pill: 'oblong', ean: '7891106916738'
    }
  ];

  const FAMILIES = {
    dip: {
      key: 'dip', name: 'AspDip', word: 'DIP', ativo: 'dipirona', formula: 'C₁₃H₁₆N₃NaO₄S',
      color: C.dipWord, band: C.lime1,
      lead: 'A dipirona da Bayer, em comprimidos de 500 mg e 1 g e em gotas 500 mg/mL com sabor abacaxi.'
    },
    mol: {
      key: 'mol', name: 'AspMol', word: 'MOL', ativo: 'paracetamol', formula: 'C₈H₉NO₂',
      color: C.red, band: C.red,
      lead: 'O paracetamol da Bayer, em comprimidos de 500 mg e 750 mg.'
    }
  };

  // Linha completa (lançamentos + clássicos), filtrada por família, nunca por sintoma
  const LINE = [
    ...SKUS.map(s => ({ sku: s.id, tags: ['novo', s.fam] })),
    { id: 'aspirina-500', name: 'Aspirina 500 mg', ativo: 'Ácido acetilsalicílico 500 mg', desc: 'O clássico, em comprimidos de 500 mg desde 1900.', tags: ['classico'], color: '#0E7C3A' },
    { id: 'aspirina-c', name: 'Aspirina C', ativo: 'AAS 400 mg + vitamina C 240 mg', desc: 'Comprimido efervescente com vitamina C.', tags: ['classico'], color: '#E89B12' },
    { id: 'cafiaspirina', name: 'CafiAspirina', ativo: 'AAS 650 mg + cafeína 65 mg', desc: 'Ácido acetilsalicílico com cafeína, em comprimidos.', tags: ['classico'], color: '#B8202E' },
    { id: 'prevent', name: 'Aspirina Prevent', ativo: 'AAS 100 mg e 300 mg', desc: 'Linha de baixa dosagem. Uso sob orientação médica.', tags: ['classico'], color: '#9A1B3A' }
  ];

  const FAQ = [
    ['O que são AspDip e AspMol?', 'São os lançamentos da Bayer na família Aspirina. AspDip tem dipirona e vem em comprimidos de 500 mg, 1 g e em gotas 500 mg/mL. AspMol tem paracetamol e vem em comprimidos de 500 mg e 750 mg.'],
    ['Qual a diferença para a Aspirina tradicional?', 'O princípio ativo. A Aspirina tradicional tem ácido acetilsalicílico (AAS). AspDip tem dipirona e AspMol tem paracetamol, com a mesma assinatura Bayer.'],
    ['Qual a diferença entre AspMol 500 mg e 750 mg?', 'A quantidade de paracetamol em cada comprimido. Os dois vêm em caixas com 20 comprimidos.'],
    ['Qual o sabor do AspDip gotas?', 'Abacaxi. A solução vem em frasco gotejador de 20 mL, e 20 gotas equivalem a 1 mL.'],
    ['Preciso de receita?', 'São medicamentos isentos de prescrição. Mesmo assim, leia a bula e fale com um farmacêutico ou médico antes de usar.'],
    ['Onde encontro a bula?', 'Dentro de cada embalagem e no Bulário Eletrônico da Anvisa, no site consultas.anvisa.gov.br.'],
    ['O que é a #ASPergunta?', 'É a campanha de 2026 com Dani Calabresa que apresenta AspDip e AspMol. A assinatura é “Dos mesmos criadores da Aspirina. É Bayer, é bom.”']
  ];

  /* ---------- EAN-13 ---------- */
  function ean13(code, attrs = 'class="ean"') {
    const L = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
    const R = L.map(s => [...s].map(b => (b === '0' ? '1' : '0')).join(''));
    const G = R.map(s => [...s].reverse().join(''));
    const P = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];
    const d = [...code].map(Number);
    let bits = '101';
    for (let i = 1; i <= 6; i++) bits += (P[d[0]][i - 1] === 'L' ? L : G)[d[i]];
    bits += '01010';
    for (let i = 7; i <= 12; i++) bits += R[d[i]];
    bits += '101';
    let rects = '';
    [...bits].forEach((b, i) => { if (b === '1') rects += `<rect x="${i}" y="0" width="1" height="${(i < 3 || (i > 44 && i < 50) || i > 91) ? 46 : 40}"/>`; });
    return `<svg ${attrs} viewBox="-6 0 107 56" role="img" aria-label="Código de barras ${code}"><rect x="-6" y="-2" width="107" height="60" fill="#fff"/><g fill="#111">${rects}</g>` +
      `<text x="-5" y="54" font-size="8" font-family="Geist Mono, monospace" fill="#111">${code[0]}</text>` +
      `<text x="24" y="54" font-size="8" font-family="Geist Mono, monospace" fill="#111" text-anchor="middle">${code.slice(1, 7)}</text>` +
      `<text x="71" y="54" font-size="8" font-family="Geist Mono, monospace" fill="#111" text-anchor="middle">${code.slice(7)}</text></svg>`;
  }

  /* ---------- Peças gráficas comuns ---------- */
  const uid = (() => { let n = 0; return p => `${p}${++n}`; })();

  function bayerCross(cx, cy, r, color = C.ink) {
    const fs = r * 0.36, step = r * 0.36;
    let v = '', h = '';
    [...'BAYER'].forEach((ch, i) => {
      const o = (i - 2) * step;
      v += `<text x="${cx}" y="${cy + o + fs * 0.36}" text-anchor="middle">${ch}</text>`;
      if (i !== 2) h += `<text x="${cx + o}" y="${cy + fs * 0.36}" text-anchor="middle">${ch}</text>`;
    });
    return `<g fill="${color}" font-family="Jost, Geist, sans-serif" font-weight="700" font-size="${fs}">` +
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${r * 0.09}"/>${v}${h}</g>`;
  }

  // Prata: o gradiente termina claro na borda direita, para emendar com a lateral
  function silverDefs(id) {
    return `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".55" stop-color="#E6E8E9"/><stop offset=".8" stop-color="#FDFDFD"/><stop offset=".92" stop-color="#A9AEB1"/><stop offset="1" stop-color="${C.silver}"/></linearGradient>`;
  }

  function dotsRow(y, w, id) {
    return `<pattern id="${id}" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#B9BEC1"/><circle cx="6.5" cy="6.5" r=".9" fill="#CDD1D3"/></pattern>` +
      `<linearGradient id="${id}m" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".85" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>` +
      `<mask id="${id}k"><rect x="0" y="${y}" width="${w}" height="12" fill="url(#${id}m)"/></mask>`;
  }

  function pillShape(kind, x, y, s = 1) {
    const g = uid('pg');
    if (kind === 'round') {
      return `<g transform="translate(${x} ${y}) scale(${s})"><defs><radialGradient id="${g}" cx=".35" cy=".3"><stop offset="0" stop-color="#fff"/><stop offset=".7" stop-color="#EEF0F0"/><stop offset="1" stop-color="#C9CDCE"/></radialGradient></defs>` +
        `<ellipse cx="0" cy="8" rx="46" ry="30" fill="#000" opacity=".18"/><ellipse cx="0" cy="0" rx="46" ry="32" fill="url(#${g})"/><path d="M-30 -6 L30 6" stroke="#B8BDBF" stroke-width="2.5"/></g>`;
    }
    return `<g transform="translate(${x} ${y}) rotate(28) scale(${s})"><defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#EDEFEF"/><stop offset="1" stop-color="#BFC4C6"/></linearGradient></defs>` +
      `<rect x="-52" y="-12" width="104" height="44" rx="22" fill="#000" opacity=".18"/><rect x="-52" y="-22" width="104" height="44" rx="22" fill="url(#${g})"/><rect x="-46" y="-19" width="92" height="14" rx="7" fill="#fff" opacity=".8"/></g>`;
  }

  /* ---------- Geometria das faixas (unidades do viewBox) ----------
     Caixa horizontal: viewBox 1000 × vb; tudo escala por k = vb / 436.
     Na borda esquerda a faixa vai de 150k a 232k; na direita sobe
     46k (topo) e 34k (base). As laterais usam exatamente esses números. */
  const GEO = {
    top: 150, bot: 232, riseTop: 46, riseBot: 34,
    silverTop: { off: -6, w: 9 }, silverBot: { off: 4, w: 10 }
  };
  const GOTAS = { W: 420, H: 994, top: 200, bot: 360, riseTop: 30, riseBot: 30, silverTop: { off: -8, w: 9 }, silverBot: { off: 6, w: 9 } };

  function bands(s) {
    const H = s.vb, k = H / 436;
    const yTop = GEO.top * k, yBot = GEO.bot * k;
    const rT = GEO.riseTop * k, rB = GEO.riseBot * k;
    return {
      H, k, yTop, yBot,
      curveTop: `M0 ${yTop} H820 C900 ${yTop} 960 ${yTop - rT / 2} 1000 ${yTop - rT}`,
      curveBot: `M0 ${yBot} H820 C900 ${yBot} 960 ${yBot - rB / 2.4} 1000 ${yBot - rB}`,
      bandPath: `M0 ${yTop} H820 C900 ${yTop} 960 ${yTop - rT / 2} 1000 ${yTop - rT} V${yBot - rB} C960 ${yBot - rB / 2.4} 900 ${yBot} 820 ${yBot} H0 Z`,
      tealPath: `M0 ${yBot} H820 C900 ${yBot} 960 ${yBot - rB / 2.4} 1000 ${yBot - rB} V${H} H0 Z`
    };
  }

  // Desenho das faixas (sem textos), usado na frente e espelhado no verso
  function bandLayer(s, ids, mirror) {
    const b = bands(s);
    const k = b.k;
    const t = mirror ? 'transform="translate(1000 0) scale(-1 1)"' : '';
    return `<g ${t}>
      <path d="${b.tealPath}" fill="url(#${ids.gT})"/>
      <path d="${b.bandPath}" fill="url(#${ids.gB})"/>
      <rect x="0" y="${b.yTop - 14 * k}" width="1000" height="12" fill="url(#${ids.gD})" mask="url(#${ids.gD}k)"/>
      <path d="${b.curveTop}" transform="translate(0 ${GEO.silverTop.off * k})" fill="none" stroke="url(#${ids.gS})" stroke-width="${GEO.silverTop.w * k}"/>
      <path d="${b.curveBot}" transform="translate(0 ${GEO.silverBot.off * k})" fill="none" stroke="url(#${ids.gS})" stroke-width="${GEO.silverBot.w * k}"/>
    </g>`;
  }

  function bandDefs(s, ids) {
    const b = bands(s);
    return `${silverDefs(ids.gS)}
      <linearGradient id="${ids.gT}" x1="0" x2="1"><stop offset="0" stop-color="${C.teal1}"/><stop offset=".55" stop-color="${C.teal2}"/><stop offset="1" stop-color="${C.teal3}"/></linearGradient>
      <linearGradient id="${ids.gB}" x1="0" x2="1"><stop offset="0" stop-color="${s.band[0]}"/><stop offset="1" stop-color="${s.band[1]}"/></linearGradient>
      ${dotsRow(b.yTop - 14 * b.k, 1000, ids.gD)}`;
  }

  const newIds = () => ({ gS: uid('sv'), gT: uid('tl'), gB: uid('bd'), gD: uid('dt') });
  const FONT_C = 'Barlow Condensed, Arial Narrow, sans-serif';
  const FONT_W = 'Jost, Futura, sans-serif';

  /* ---------- Frente da caixa horizontal ---------- */
  function frontSVG(s) {
    const f = FAMILIES[s.fam];
    const b = bands(s), k = b.k, H = b.H;
    const ids = newIds();
    const bw = s.badge && s.badge.big ? 110 : 100;
    const badge = s.badge
      ? `<g><rect x="800" y="0" width="${bw}" height="${108 * k}" fill="${s.badge.bg}"/>` +
        `<rect x="800" y="${102 * k}" width="${bw}" height="${7 * k}" fill="url(#${ids.gS})"/>` +
        `<text x="${800 + bw / 2}" y="${(s.badge.big ? 78 : 66) * k}" text-anchor="middle" fill="#fff" font-family="${FONT_C}" font-weight="700" ${s.badge.italic ? 'font-style="italic"' : ''} font-size="${(s.badge.big ? 70 : 34) * k}">${s.badge.text}</text></g>`
      : '';
    const dots = s.dots ? `<g fill="#3C4447">${[0, 1, 2, 3, 4].map(i => `<circle cx="${872 + i * 16}" cy="${34 * k}" r="4.2"/>`).join('')}</g>` : '';
    return `<svg class="art" viewBox="0 0 1000 ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>${bandDefs(s, ids)}</defs>
      <rect width="1000" height="${H}" fill="#fff"/>
      ${bandLayer(s, ids, false)}
      ${bayerCross(88, 88 * k, 36 * k)}
      <text x="134" y="${120 * k}" font-family="${FONT_W}" font-weight="600" font-size="${104 * k}" letter-spacing="-3"><tspan fill="${C.ink}">ASP</tspan><tspan fill="${f.color}">${f.word}</tspan></text>
      ${badge}${dots}
      <text x="70" y="${(b.yTop + b.yBot) / 2 + 24 * k}" fill="#fff" font-family="${FONT_C}" font-weight="500" font-size="${68 * k}">${f.ativo} ${s.doseShort}</text>
      <text x="70" y="${312 * k}" fill="#fff" font-family="${FONT_C}" font-style="italic" font-size="${54 * k}"><tspan font-weight="800">DOR</tspan><tspan font-weight="300"> &amp; </tspan><tspan font-weight="800">FEBRE</tspan></text>
      ${s.tagline ? `<text x="70" y="${346 * k}" fill="#fff" font-family="${FONT_C}" font-style="italic" font-weight="300" font-size="${24 * k}">${s.tagline}</text>` : ''}
      <text x="70" y="${404 * k}" fill="#fff" font-family="${FONT_C}" font-weight="600" font-size="${16 * k}">${s.contem}</text>
      ${pillShape(s.pill, 860, 352 * k, 0.9 * k)}
    </svg>`;
  }

  /* ---------- Verso: as mesmas faixas espelhadas, para emendar com as laterais ---------- */
  function backSVG(s) {
    const f = FAMILIES[s.fam];
    const b = bands(s), k = b.k, H = b.H;
    const ids = newIds();
    return `<svg class="art" viewBox="0 0 1000 ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>${bandDefs(s, ids)}</defs>
      <rect width="1000" height="${H}" fill="#fff"/>
      ${bandLayer(s, ids, true)}
      <text x="930" y="${108 * k}" text-anchor="end" font-family="${FONT_W}" font-weight="600" font-size="${76 * k}" letter-spacing="-2"><tspan fill="${C.ink}">ASP</tspan><tspan fill="${f.color}">${f.word}</tspan></text>
      <text x="930" y="${(b.yTop + b.yBot) / 2 + 22 * k}" text-anchor="end" fill="#fff" font-family="${FONT_C}" font-weight="500" font-size="${56 * k}">${s.ativo.toLowerCase()} ${s.doseShort}</text>
      <text x="70" y="${318 * k}" fill="#fff" font-family="${FONT_C}" font-style="italic" font-weight="500" font-size="${38 * k}">Dos mesmos criadores da Aspirina.</text>
      <text x="70" y="${360 * k}" fill="#fff" fill-opacity=".85" font-family="${FONT_C}" font-weight="500" font-size="${20 * k}">LEIA A BULA. ${s.qtyLabel.toUpperCase()}.</text>
      ${s.ean ? ean13(s.ean, `x="740" y="${286 * k}" width="200" height="${112 * k}" preserveAspectRatio="xMidYMid meet"`) : ''}
    </svg>`;
  }

  /* ---------- Caixa vertical das gotas ---------- */
  function gotasLayer(ids, mirror) {
    const G = GOTAS;
    const cT = `M0 ${G.top} H300 C350 ${G.top} 390 ${G.top - 10} 420 ${G.top - G.riseTop}`;
    const cB = `M0 ${G.bot} H300 C350 ${G.bot} 390 ${G.bot - 10} 420 ${G.bot - G.riseBot}`;
    const t = mirror ? `transform="translate(${G.W} 0) scale(-1 1)"` : '';
    return `<g ${t}>
      <path d="${cB} V${G.H} H0 Z" fill="url(#${ids.gT})"/>
      <path d="${cT} V${G.bot - G.riseBot} C390 ${G.bot - 10} 350 ${G.bot} 300 ${G.bot} H0 Z" fill="url(#${ids.gB})"/>
      <path d="${cT}" transform="translate(0 ${G.silverTop.off})" fill="none" stroke="url(#${ids.gS})" stroke-width="${G.silverTop.w}"/>
      <path d="${cB}" transform="translate(0 ${G.silverBot.off})" fill="none" stroke="url(#${ids.gS})" stroke-width="${G.silverBot.w}"/>
    </g>`;
  }
  function gotasDefs(ids) {
    return `${silverDefs(ids.gS)}
      <linearGradient id="${ids.gT}" x1="0" x2="1"><stop offset="0" stop-color="${C.teal1}"/><stop offset="1" stop-color="${C.teal3}"/></linearGradient>
      <linearGradient id="${ids.gB}" x1="0" x2="1"><stop offset="0" stop-color="${C.lime1}"/><stop offset="1" stop-color="${C.lime2}"/></linearGradient>
      <radialGradient id="${ids.gD}" cx=".35" cy=".35"><stop offset="0" stop-color="#F6E7A0"/><stop offset=".6" stop-color="${C.gold}"/><stop offset="1" stop-color="#8E7A2A"/></radialGradient>`;
  }

  function gotasBoxSVG() {
    const { W, H } = GOTAS;
    const ids = newIds();
    return `<svg class="art" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>${gotasDefs(ids)}</defs>
      <rect width="${W}" height="${H}" fill="#fff"/>
      ${gotasLayer(ids, false)}
      ${bayerCross(54, 110, 26)}
      <text x="88" y="132" font-family="${FONT_W}" font-weight="600" font-size="66" letter-spacing="-2"><tspan fill="${C.ink}">ASP</tspan><tspan fill="${C.dipWord}">DIP</tspan></text>
      <text x="32" y="266" fill="#fff" font-family="${FONT_C}" font-weight="500" font-size="62">dipirona</text>
      <text x="32" y="330" fill="#fff" font-family="${FONT_C}" font-weight="500" font-size="62">500mg/mL</text>
      <text x="32" y="450" fill="#fff" font-family="${FONT_C}" font-style="italic" font-size="50"><tspan font-weight="800">DOR</tspan><tspan font-weight="300"> &amp; </tspan><tspan font-weight="800">FEBRE</tspan></text>
      <text x="32" y="556" fill="${C.lime2}" font-family="${FONT_C}" font-style="italic" font-weight="500" font-size="34">Infantil</text>
      <text x="32" y="728" fill="${C.lime2}" font-family="${FONT_C}" font-weight="700" font-size="52">GOTAS</text>
      <text x="32" y="764" fill="${C.lime2}" font-family="${FONT_C}" font-weight="500" font-size="26">40 gotas = 1g</text>
      <path d="M330 640 C330 640 290 700 290 730 A40 40 0 0 0 370 730 C370 700 330 640 330 640 Z" fill="url(#${ids.gD})"/>
      <path d="M312 722 a20 20 0 0 0 10 26" stroke="#fff" stroke-opacity=".7" stroke-width="5" fill="none"/>
      <text x="32" y="900" fill="#fff" font-family="${FONT_C}" font-weight="500" font-size="24">Conteúdo: 20 mL</text>
      <text x="32" y="930" fill="#fff" fill-opacity=".8" font-family="${FONT_C}" font-size="17">SOLUÇÃO ORAL. USO ADULTO E PEDIÁTRICO ACIMA DE 3 MESES.</text>
    </svg>`;
  }

  function gotasBackSVG() {
    const { W, H } = GOTAS;
    const ids = newIds();
    return `<svg class="art" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>${gotasDefs(ids)}</defs>
      <rect width="${W}" height="${H}" fill="#fff"/>
      ${gotasLayer(ids, true)}
      <text x="388" y="130" text-anchor="end" font-family="${FONT_W}" font-weight="600" font-size="58" letter-spacing="-2"><tspan fill="${C.ink}">ASP</tspan><tspan fill="${C.dipWord}">DIP</tspan></text>
      <text x="388" y="296" text-anchor="end" fill="#fff" font-family="${FONT_C}" font-weight="500" font-size="44">dipirona 500mg/mL</text>
      <text x="32" y="470" fill="#fff" font-family="${FONT_C}" font-style="italic" font-weight="500" font-size="38">Dos mesmos</text>
      <text x="32" y="514" fill="#fff" font-family="${FONT_C}" font-style="italic" font-weight="500" font-size="38">criadores da Aspirina.</text>
      <text x="32" y="600" fill="#fff" fill-opacity=".85" font-family="${FONT_C}" font-weight="500" font-size="26">Sabor abacaxi</text>
      <text x="32" y="636" fill="#fff" fill-opacity=".85" font-family="${FONT_C}" font-weight="500" font-size="26">20 gotas = 1 mL</text>
      <text x="32" y="900" fill="#fff" fill-opacity=".85" font-family="${FONT_C}" font-weight="500" font-size="24">LEIA A BULA.</text>
    </svg>`;
  }

  /* ---------- Frasco plano (miniaturas) ---------- */
  function bottleSVG() {
    const gC = uid('cap'), gBd = uid('bt'), gT = uid('tl'), gB = uid('bd'), gG = uid('gd'), gSh = uid('sh');
    return `<svg class="bottle-art" viewBox="0 0 170 448" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${gC}" x1="0" x2="1"><stop offset="0" stop-color="#D9DCDD"/><stop offset=".35" stop-color="#fff"/><stop offset=".7" stop-color="#F1F2F2"/><stop offset="1" stop-color="#C3C7C9"/></linearGradient>
        <linearGradient id="${gBd}" x1="0" x2="1"><stop offset="0" stop-color="#E3E6E7"/><stop offset=".3" stop-color="#fff"/><stop offset=".75" stop-color="#F4F5F5"/><stop offset="1" stop-color="#CDD1D2"/></linearGradient>
        <linearGradient id="${gT}" x1="0" x2="1"><stop offset="0" stop-color="${C.teal1}"/><stop offset="1" stop-color="${C.teal3}"/></linearGradient>
        <linearGradient id="${gB}" x1="0" x2="1"><stop offset="0" stop-color="${C.lime1}"/><stop offset="1" stop-color="${C.lime2}"/></linearGradient>
        <radialGradient id="${gG}" cx=".35" cy=".35"><stop offset="0" stop-color="#F6E7A0"/><stop offset=".6" stop-color="${C.gold}"/><stop offset="1" stop-color="#8E7A2A"/></radialGradient>
        <linearGradient id="${gSh}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".18"/><stop offset=".25" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>
      </defs>
      <path d="M70 4 h30 l6 40 h-42 z" fill="url(#${gC})"/>
      <rect x="44" y="44" width="82" height="100" rx="6" fill="url(#${gC})"/>
      <path d="M40 150 h90 l8 16 h-106 z" fill="url(#${gBd})"/>
      <rect x="12" y="166" width="146" height="276" rx="18" fill="url(#${gBd})"/>
      <clipPath id="${gB}c"><rect x="12" y="196" width="146" height="216"/></clipPath>
      <g clip-path="url(#${gB}c)">
        <rect x="12" y="196" width="146" height="216" fill="#fff"/>
        <rect x="12" y="262" width="146" height="34" fill="url(#${gB})"/>
        <rect x="12" y="300" width="146" height="112" fill="url(#${gT})"/>
      </g>
      ${bayerCross(30, 230, 11)}
      <text x="45" y="240" font-family="${FONT_W}" font-weight="600" font-size="27" letter-spacing="-1"><tspan fill="${C.ink}">ASP</tspan><tspan fill="${C.dipWord}">DIP</tspan></text>
      <text x="20" y="285" fill="#fff" font-family="${FONT_C}" font-weight="500" font-size="19">dipirona 500mg/mL</text>
      <text x="20" y="328" fill="#fff" font-family="${FONT_C}" font-style="italic" font-weight="800" font-size="20">DOR &amp; FEBRE</text>
      <path d="M128 330 C128 330 114 352 114 362 A14 14 0 0 0 142 362 C142 352 128 330 128 330 Z" fill="url(#${gG})"/>
      <rect x="12" y="166" width="146" height="276" rx="18" fill="url(#${gSh})"/>
    </svg>`;
  }

  /* ---------- Frasco 3D: cilindros de faces finas ---------- */
  const BOTTLE = { r: 42, n: 24, body: 150, shoulder: 12, capR: 23, cap: 46, tipR: 9, tip: 24 };
  const faceW = (r, n) => 2 * r * Math.tan(Math.PI / n);

  // Sombreamento fixo por face (luz vindo da frente-esquerda)
  function shade(i, n) {
    const a = (i / n) * Math.PI * 2;
    const l = Math.cos(a + 0.5);           // 1 = iluminado, -1 = sombra
    return l > 0 ? `rgba(255,255,255,${(l * 0.16).toFixed(3)})` : `rgba(0,30,25,${(-l * 0.32).toFixed(3)})`;
  }

  function cylinder(cls, r, n, h, bottom, bg, opts = {}) {
    const w = faceW(r, n), C2 = w * n;
    let faces = '';
    for (let i = 0; i < n; i++) {
      const ov = shade(i, n);
      const pos = opts.tex ? `background-image:linear-gradient(${ov},${ov}),var(--asp-label, ${bg});background-size:auto,${C2}px ${h}px;background-position:0 0,${(-(i * w) + C2 / 2 - w / 2).toFixed(2)}px 0;` : `background:linear-gradient(${ov},${ov}),${bg};`;
      faces += `<i class="cyl__f" style="--a:${(i * 360 / n).toFixed(3)}deg;${pos}"></i>`;
    }
    const top = opts.top ? `<i class="cyl__disk cyl__disk--top" style="background:${opts.top}"></i>` : '';
    return `<div class="cyl ${cls}" style="--r:${r}px;--w:${(w + 0.6).toFixed(2)}px;height:${h}px;bottom:${bottom}px">${faces}${top}</div>`;
  }

  function bottle3D() {
    const B = BOTTLE;
    let y = 0;
    const body = cylinder('cyl--body', B.r, B.n, B.body, y, 'linear-gradient(#F6F7F7,#F6F7F7)', { tex: true }); y += B.body;
    const sh = cylinder('cyl--shoulder', B.r * .72, 16, B.shoulder, y, 'linear-gradient(90deg,#E9ECEC,#fff)'); y += B.shoulder;
    const cap = cylinder('cyl--cap', B.capR, 16, B.cap, y, 'repeating-linear-gradient(90deg,#FFFFFF 0 3px,#E8EBEB 3px 5px)', { top: 'radial-gradient(circle,#fff,#DADDDE)' }); y += B.cap;
    const tip = cylinder('cyl--tip', B.tipR, 12, B.tip, y, 'linear-gradient(90deg,#EEF0F0,#fff)', { top: 'radial-gradient(circle,#fff,#D5D9DA)' }); y += B.tip;
    return `<div class="bottle3d" style="height:${y}px;width:${B.r * 2}px">${body}${sh}${cap}${tip}</div>`;
  }

  // Rótulo do frasco desenhado em canvas (usa as fontes do site)
  function makeBottleLabel() {
    const B = BOTTLE;
    const w = faceW(B.r, B.n) * B.n, h = B.body;
    const s = 3;
    const cv = document.createElement('canvas');
    cv.width = Math.round(w * s); cv.height = h * s;
    const x = cv.getContext('2d');
    x.scale(s, s);
    const cx = w / 2;
    x.fillStyle = '#F6F7F7'; x.fillRect(0, 0, w, h);
    // faixas do rótulo, em volta de todo o frasco
    x.fillStyle = '#fff'; x.fillRect(0, 18, w, 44);
    const lime = x.createLinearGradient(0, 0, w, 0); lime.addColorStop(0, C.lime1); lime.addColorStop(.5, C.lime2); lime.addColorStop(1, C.lime1);
    x.fillStyle = lime; x.fillRect(0, 62, w, 18);
    x.fillStyle = C.silver; x.fillRect(0, 80, w, 2);
    const teal = x.createLinearGradient(0, 0, w, 0); teal.addColorStop(0, C.teal3); teal.addColorStop(.5, C.teal1); teal.addColorStop(1, C.teal3);
    x.fillStyle = teal; x.fillRect(0, 82, w, 52);
    // frente
    x.strokeStyle = C.ink; x.lineWidth = 1.1;
    x.beginPath(); x.arc(cx - 34, 41, 9, 0, Math.PI * 2); x.stroke();
    x.fillStyle = C.ink; x.font = '700 4px Jost, sans-serif'; x.textAlign = 'center';
    x.fillText('BAYER', cx - 34, 42.5);
    x.font = '600 19px Jost, Futura, sans-serif'; x.textAlign = 'left';
    x.fillStyle = C.ink; x.fillText('ASP', cx - 22, 49);
    const aw = x.measureText('ASP').width;
    x.fillStyle = C.dipWord; x.fillText('DIP', cx - 22 + aw - 1, 49);
    x.fillStyle = '#fff'; x.font = '500 12px "Barlow Condensed", "Arial Narrow", sans-serif';
    x.fillText('dipirona 500mg/mL', cx - 34, 75);
    x.font = 'italic 800 13px "Barlow Condensed", "Arial Narrow", sans-serif';
    x.fillText('DOR & FEBRE', cx - 34, 100);
    x.font = '500 8px "Barlow Condensed", "Arial Narrow", sans-serif';
    x.fillText('Conteúdo: 20 mL', cx - 34, 114);
    x.fillText('SOLUÇÃO ORAL', cx - 34, 124);
    // gota dourada
    const gd = x.createRadialGradient(cx + 44, 104, 1, cx + 46, 108, 9);
    gd.addColorStop(0, '#F6E7A0'); gd.addColorStop(.6, C.gold); gd.addColorStop(1, '#8E7A2A');
    x.fillStyle = gd; x.beginPath(); x.moveTo(cx + 46, 94); x.bezierCurveTo(cx + 46, 94, cx + 38, 106, cx + 38, 110); x.arc(cx + 46, 110, 8, Math.PI, 0, true); x.bezierCurveTo(cx + 54, 106, cx + 46, 94, cx + 46, 94); x.fill();
    // verso
    x.fillStyle = 'rgba(255,255,255,.9)'; x.font = '500 8px "Barlow Condensed", "Arial Narrow", sans-serif';
    x.fillText('Dos mesmos criadores da Aspirina.', 6, 100);
    x.fillText('Leia a bula.', 6, 112);
    document.documentElement.style.setProperty('--asp-label', `url(${cv.toDataURL('image/png')})`);
  }

  /* ---------- Faces laterais: as mesmas faixas da borda vizinha ----------
     Lateral direita = borda direita da frente; esquerda = borda esquerda. */
  function sideBg(s, edge) {
    let H, top, bot, sT, sB, band, teal;
    if (s.drops) {
      const G = GOTAS;
      H = G.H;
      top = edge === 'right' ? G.top - G.riseTop : G.top;
      bot = edge === 'right' ? G.bot - G.riseBot : G.bot;
      sT = G.silverTop; sB = G.silverBot;
      band = edge === 'right' ? C.lime2 : C.lime1;
    } else {
      const k = s.vb / 436;
      H = s.vb;
      top = (edge === 'right' ? GEO.top - GEO.riseTop : GEO.top) * k;
      bot = (edge === 'right' ? GEO.bot - GEO.riseBot : GEO.bot) * k;
      sT = { off: GEO.silverTop.off * k, w: GEO.silverTop.w * k };
      sB = { off: GEO.silverBot.off * k, w: GEO.silverBot.w * k };
      band = edge === 'right' ? s.band[1] : s.band[0];
    }
    teal = edge === 'right' ? C.teal3 : C.teal1;
    const p = v => (v / H * 100).toFixed(2) + '%';
    const s1a = top + sT.off - sT.w / 2, s1b = top + sT.off + sT.w / 2;
    const s2a = bot + sB.off - sB.w / 2, s2b = bot + sB.off + sB.w / 2;
    return `linear-gradient(180deg,#fff 0 ${p(s1a)},${C.silver} ${p(s1a)} ${p(s1b)},#fff ${p(s1b)} ${p(top)},${band} ${p(top)} ${p(s2a)},${C.silver} ${p(s2a)} ${p(s2b)},${teal} ${p(s2b)} 100%)`;
  }

  /* ---------- Caixa 3D completa ---------- */
  function box3D(s) {
    const { w, h, d } = s.box;
    const f = FAMILIES[s.fam];
    const front = s.drops ? gotasBoxSVG() : frontSVG(s);
    const back = s.drops ? gotasBackSVG() : backSVG(s);
    return `<div class="box" style="--w:${w}px;--h:${h}px;--d:${d}px">
      <div class="box__face box__front">${front}<i class="gloss"></i></div>
      <div class="box__face box__back">${back}</div>
      <div class="box__face box__right" style="background:${sideBg(s, 'right')}"><span class="side-txt">ASP${f.word} ${s.doseShort}</span></div>
      <div class="box__face box__left" style="background:${sideBg(s, 'left')}"></div>
      <div class="box__face box__top"></div>
      <div class="box__face box__bottom" style="background:${C.teal3}"></div>
    </div>`;
  }

  // Produto completo (gotas = caixa + frasco 3D)
  function product3D(s) {
    if (s.drops) return `<div class="pkg pkg--drops" data-sku="${s.id}">${box3D(s)}${bottle3D()}</div>`;
    return `<div class="pkg" data-sku="${s.id}">${box3D(s)}</div>`;
  }

  // Miniatura plana (listas e cartões)
  function flat(s) {
    if (s.drops) return `<div class="flat flat--drops"><div class="flat__box">${gotasBoxSVG()}</div><div class="flat__bottle">${bottleSVG()}</div></div>`;
    return `<div class="flat" style="aspect-ratio:${1000 / s.vb}">${frontSVG(s)}</div>`;
  }

  return { C, SKUS, FAMILIES, LINE, FAQ, product3D, flat, ean13, makeBottleLabel, byId: id => SKUS.find(s => s.id === id) };
})();
