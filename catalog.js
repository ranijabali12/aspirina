/* =========================================================
   Catálogo da família Asp + desenho vetorial das embalagens
   Cores e layout copiados das embalagens reais (fotos Bayer).
   O site não traz posologia nem recomendação de uso (bula resumida em bula.js):
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
      box: { w: 104, h: 248, d: 104 }
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
    { cls: 'aspirina-500', tags: ['classico'] },
    { cls: 'aspirina-c', tags: ['classico'] },
    { cls: 'cafiaspirina', tags: ['classico'] }
  ];

  const FAQ = [
    ['O que são AspDip e AspMol?', 'São os lançamentos da Bayer na família Aspirina. AspDip tem dipirona e vem em comprimidos de 500 mg, 1 g e em gotas 500 mg/mL. AspMol tem paracetamol e vem em comprimidos de 500 mg e 750 mg.'],
    ['Qual a diferença para a Aspirina tradicional?', 'O princípio ativo. A Aspirina tradicional tem ácido acetilsalicílico (AAS). AspDip tem dipirona e AspMol tem paracetamol, com a mesma assinatura Bayer.'],
    ['Qual a diferença entre AspMol 500 mg e 750 mg?', 'A quantidade de paracetamol em cada comprimido. Os dois vêm em caixas com 20 comprimidos.'],
    ['Qual o sabor do AspDip gotas?', 'Abacaxi. A solução vem em frasco gotejador de 20 mL, e 20 gotas equivalem a 1 mL.'],
    ['O que tem em cada clássico?', 'Aspirina 500 mg tem ácido acetilsalicílico 500 mg, em caixa com 20 comprimidos. Aspirina C tem ácido acetilsalicílico 400 mg e ácido ascórbico (vitamina C) 240 mg, em 10 comprimidos efervescentes sabor limão. CafiAspirina tem ácido acetilsalicílico 650 mg e cafeína 65 mg, em comprimidos.'],
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
  const GOTAS = { W: 420, H: 1000, top: 262, bot: 440, riseTop: 34, riseBot: 12, silverTop: { off: -8, w: 9 }, silverBot: { off: 6, w: 9 } };

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

  // Frente da caixa das gotas, medida na foto (frente 458 px -> 420 unidades)
  function gotasBoxSVG() {
    const { W, H } = GOTAS;
    const ids = newIds(), Y = '#E4E24C';
    return `<svg class="art" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>${gotasDefs(ids)}</defs>
      <rect width="${W}" height="${H}" fill="#fff"/>
      ${gotasLayer(ids, false)}
      ${bayerCross(52, 116, 34)}
      <text x="96" y="148" font-family="${FONT_W}" font-weight="600" font-size="100" textLength="306" lengthAdjust="spacingAndGlyphs"><tspan fill="${C.ink}">ASP</tspan><tspan fill="${C.dipWord}">DIP</tspan></text>
      <text x="24" y="326" fill="#fff" font-family="${FONT_W}" font-weight="600" font-size="78" textLength="262" lengthAdjust="spacingAndGlyphs">dipirona</text>
      <text x="24" y="402" fill="#fff" font-family="${FONT_W}" font-weight="600" font-size="78" textLength="366" lengthAdjust="spacingAndGlyphs">500mg/mL</text>
      <text x="24" y="526" fill="#fff" font-family="${FONT_C}" font-style="italic" font-size="62" textLength="232" lengthAdjust="spacingAndGlyphs"><tspan font-weight="800">DOR</tspan><tspan font-weight="300"> &amp; </tspan><tspan font-weight="800">FEBRE</tspan></text>
      <text x="24" y="650" fill="${Y}" font-family="${FONT_C}" font-style="italic" font-weight="600" font-size="40">Infantil</text>
      <text x="24" y="800" fill="${Y}" font-family="${FONT_C}" font-weight="700" font-size="72">GOTAS</text>
      <text x="24" y="840" fill="${Y}" font-family="${FONT_C}" font-weight="600" font-size="36">40 gotas = 1g</text>
      <text x="24" y="880" fill="${Y}" font-family="${FONT_C}" font-weight="500" font-size="22">SABOR ABACAXI</text>
      <path d="M302 700 C302 700 256 770 256 806 A46 46 0 0 0 348 806 C348 770 302 700 302 700 Z" fill="url(#${ids.gD})"/>
      <path d="M280 798 a24 24 0 0 0 12 32" stroke="#fff" stroke-opacity=".75" stroke-width="5" fill="none"/>
      <text x="24" y="948" fill="#fff" font-family="${FONT_C}" font-weight="700" font-size="32"><tspan font-size="24">CONTEÚDO</tspan> 20 mL</text>
      <text x="24" y="984" fill="#fff" font-family="${FONT_C}" font-weight="500" font-size="17" textLength="382" lengthAdjust="spacingAndGlyphs">SOLUÇÃO ORAL. USO ORAL. USO ADULTO E PEDIÁTRICO ACIMA DE 3 MESES.</text>
    </svg>`;
  }

  // Lateral da caixa das gotas: fundo branco com logo, como na foto
  function gotasSideSVG() {
    const { W, H } = GOTAS;
    return `<svg class="art" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${H}" fill="#F7F8F8"/>
      ${bayerCross(48, 132, 30)}
      <text x="88" y="160" font-family="${FONT_W}" font-weight="600" font-size="84" textLength="296" lengthAdjust="spacingAndGlyphs"><tspan fill="${C.ink}">ASP</tspan><tspan fill="${C.dipWord}">DIP</tspan></text>
      <text x="20" y="236" fill="${C.ink}" font-family="${FONT_C}" font-weight="600" font-size="46" textLength="370" lengthAdjust="spacingAndGlyphs">dipirona 500mg/mL</text>
      <rect x="20" y="300" width="380" height="380" rx="6" fill="${C.lime2}" fill-opacity=".28" stroke="${C.lime1}" stroke-width="3"/>
      <text x="210" y="482" text-anchor="middle" fill="${C.ink}" fill-opacity=".7" font-family="${FONT_C}" font-weight="600" font-size="30">LEIA A BULA</text>
      <text x="210" y="520" text-anchor="middle" fill="${C.ink}" fill-opacity=".55" font-family="${FONT_C}" font-weight="500" font-size="22">Solução oral · Sabor abacaxi</text>
      <text x="20" y="760" fill="${C.ink}" fill-opacity=".7" font-family="${FONT_C}" font-weight="600" font-size="20">Registrado por: Bayer S.A.</text>
      <text x="20" y="790" fill="${C.ink}" fill-opacity=".6" font-family="${FONT_C}" font-weight="500" font-size="18">Indústria Brasileira</text>
      <text x="20" y="880" fill="${C.ink}" font-family="${FONT_C}" font-weight="700" font-size="40">SAC</text>
      <text x="92" y="878" fill="${C.ink}" fill-opacity=".75" font-family="${FONT_C}" font-weight="600" font-size="22">0800 723 1010</text>
      <text x="20" y="912" fill="${C.ink}" fill-opacity=".6" font-family="${FONT_C}" font-weight="500" font-size="18">www.bayer.com.br</text>
      <text x="398" y="960" text-anchor="end" fill="${C.ink}" font-family="Jost, sans-serif" font-weight="600" font-size="34">Bayer</text>
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

  /* ---------- Frasco 3D renderizado em canvas ----------
     Cilindro de verdade: cada coluna de pixels do corpo lê o rótulo no
     ângulo certo (θ = asin(x/r)), com sombreamento de luz. Sem frestas. */
  const BOTTLE = { W: 96, H: 236, r: 44, body: 146, shoulder: 14, capR: 24, cap: 48, tipR: 9, tip: 24 };
  let LABEL = null;

  function bottle3D() {
    const B = BOTTLE;
    return `<div class="bottle3d" style="width:${B.W}px;height:${B.H}px"><canvas class="bottle3d__c" width="${B.W * 2}" height="${B.H * 2}" aria-hidden="true"></canvas></div>`;
  }

  // Rótulo plano (volta inteira do frasco), desenhado com as fontes do site
  function makeBottleLabel() {
    const B = BOTTLE;
    const w = Math.round(2 * Math.PI * B.r), h = B.body;
    const s = 3;
    const cv = document.createElement('canvas');
    cv.width = w * s; cv.height = h * s;
    const x = cv.getContext('2d');
    x.scale(s, s);
    const cx = w / 2;
    x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, w, h);
    const lime = x.createLinearGradient(0, 0, w, 0); lime.addColorStop(0, C.lime1); lime.addColorStop(.5, C.lime2); lime.addColorStop(1, C.lime1);
    x.fillStyle = lime; x.fillRect(0, 60, w, 20);
    x.fillStyle = C.silver; x.fillRect(0, 80, w, 2);
    x.fillStyle = C.teal2; x.fillRect(0, 82, w, h - 82);
    // frente
    x.strokeStyle = C.ink; x.lineWidth = 1;
    x.beginPath(); x.arc(cx - 32, 38, 8, 0, Math.PI * 2); x.stroke();
    x.fillStyle = C.ink; x.font = '700 3.6px Jost, sans-serif'; x.textAlign = 'center';
    x.fillText('BAYER', cx - 32, 39.4);
    x.textAlign = 'left'; x.font = '600 19px Jost, Futura, sans-serif';
    x.fillText('ASP', cx - 21, 45);
    const aw = x.measureText('ASP').width;
    x.fillStyle = C.dipWord; x.fillText('DIP', cx - 21 + aw - 1, 45);
    x.fillStyle = '#fff'; x.font = '500 12px "Barlow Condensed", "Arial Narrow", sans-serif';
    x.fillText('dipirona 500mg/mL', cx - 32, 75);
    x.font = 'italic 800 14px "Barlow Condensed", "Arial Narrow", sans-serif';
    x.fillText('DOR & FEBRE', cx - 32, 102);
    x.font = '500 8px "Barlow Condensed", "Arial Narrow", sans-serif';
    x.fillText('Conteúdo: 20 mL', cx - 32, 118);
    x.fillText('SOLUÇÃO ORAL', cx - 32, 128);
    const gx = cx + 36, gy = 124, gr = 6;
    const gd = x.createRadialGradient(gx - 2, gy - 2, 1, gx, gy, gr + 1);
    gd.addColorStop(0, '#F6E7A0'); gd.addColorStop(.6, C.gold); gd.addColorStop(1, '#8E7A2A');
    x.fillStyle = gd; x.beginPath(); x.moveTo(gx, gy - gr * 2); x.bezierCurveTo(gx, gy - gr * 2, gx - gr, gy - gr * .5, gx - gr, gy); x.arc(gx, gy, gr, Math.PI, 0, true); x.bezierCurveTo(gx + gr, gy - gr * .5, gx, gy - gr * 2, gx, gy - gr * 2); x.fill();
    // verso (lado oposto do rótulo)
    x.fillStyle = 'rgba(255,255,255,.92)'; x.font = '500 8px "Barlow Condensed", "Arial Narrow", sans-serif';
    x.fillText('Dos mesmos criadores', 8, 100);
    x.fillText('da Aspirina. Leia a bula.', 8, 110);
    LABEL = cv;
  }

  // Desenha o frasco visto num ângulo (graus); 0 = rótulo de frente
  function drawBottle(canvas, angleDeg = 0) {
    const B = BOTTLE, k = 2;
    const x = canvas.getContext('2d');
    x.setTransform(k, 0, 0, k, 0, 0);
    x.clearRect(0, 0, B.W, B.H);
    const cx = B.W / 2;
    const yBody = B.H - B.body;          // topo do corpo
    const ell = .18;                      // achatamento das elipses (vista levemente de cima)
    const lightGrad = (r, y0, y1) => {
      const g = x.createLinearGradient(cx - r, 0, cx + r, 0);
      g.addColorStop(0, 'rgba(0,30,25,.42)'); g.addColorStop(.18, 'rgba(0,30,25,.12)');
      g.addColorStop(.34, 'rgba(255,255,255,.38)'); g.addColorStop(.46, 'rgba(255,255,255,.05)');
      g.addColorStop(.8, 'rgba(0,30,25,.16)'); g.addColorStop(1, 'rgba(0,30,25,.5)');
      return g;
    };
    const cyl = (r, top, bottom, fill) => {
      x.save();
      x.beginPath();
      x.moveTo(cx - r, top); x.lineTo(cx - r, bottom);
      x.ellipse(cx, bottom, r, r * ell, 0, Math.PI, 0, true);
      x.lineTo(cx + r, top);
      x.ellipse(cx, top, r, r * ell, 0, 0, Math.PI, false);
      x.closePath(); x.clip();
      fill();
      x.fillStyle = lightGrad(r); x.fillRect(cx - r, top - r, r * 2, bottom - top + r * 2);
      x.restore();
    };
    const lid = (r, y, c1, c2) => {
      const g = x.createLinearGradient(cx - r, y, cx + r, y);
      g.addColorStop(0, c2); g.addColorStop(.4, c1); g.addColorStop(1, c2);
      x.fillStyle = g; x.beginPath(); x.ellipse(cx, y, r, r * ell, 0, 0, Math.PI * 2); x.fill();
    };
    // sombra de contato
    x.save();
    x.translate(cx, B.H - 5); x.scale(1, .16);
    const sh = x.createRadialGradient(0, 0, 0, 0, 0, B.r);
    sh.addColorStop(0, 'rgba(0,30,25,.4)'); sh.addColorStop(1, 'rgba(0,30,25,0)');
    x.fillStyle = sh; x.beginPath(); x.arc(0, 0, B.r, 0, Math.PI * 2); x.fill();
    x.restore();
    // corpo com o rótulo enrolado
    const bottom = B.H - B.r * ell - 2;
    cyl(B.r, yBody, bottom, () => {
      x.fillStyle = '#F4F6F6'; x.fillRect(cx - B.r, yBody - 10, B.r * 2, B.body + 20);
      if (!LABEL) return;
      const lw = LABEL.width, lh = LABEL.height;
      const a = angleDeg * Math.PI / 180;
      const lt = yBody + 6, lhD = B.body - 22;
      for (let px = -B.r; px < B.r; px += 1) {
        const th = Math.asin(Math.max(-1, Math.min(1, (px + .5) / B.r)));
        let u = .5 + (th - a) / (2 * Math.PI);
        u -= Math.floor(u);
        // a borda do rótulo acompanha a curva da base
        const sag = Math.sqrt(Math.max(0, 1 - (px / B.r) ** 2)) * B.r * ell;
        x.drawImage(LABEL, Math.floor(u * lw), 0, 3, lh, cx + px, lt + sag, 1.1, lhD);
      }
    });
    // ombro
    const yS = yBody - B.shoulder;
    cyl(B.r * .62, yS, yBody, () => { x.fillStyle = '#F2F4F4'; x.fillRect(0, 0, B.W, B.H); });
    lid(B.r, yBody, '#FFFFFF', '#DDE1E2');
    lid(B.r * .62, yS, '#FFFFFF', '#E3E6E7');
    // tampa com estrias
    const yC = yS - B.cap;
    cyl(B.capR, yC, yS, () => {
      x.fillStyle = '#FAFBFB'; x.fillRect(0, 0, B.W, B.H);
      x.fillStyle = 'rgba(0,30,25,.10)';
      const a = angleDeg * Math.PI / 180;
      for (let i = 0; i < 28; i++) {
        const t = (i / 28) * Math.PI * 2 + a;
        if (Math.cos(t) < 0) continue;
        const px = Math.sin(t) * B.capR;
        x.fillRect(cx + px - .5, yC, 1, B.cap);
      }
    });
    lid(B.capR, yC, '#FFFFFF', '#D9DDDE');
    // bico
    const yT = yC - B.tip;
    cyl(B.tipR, yT, yC, () => { x.fillStyle = '#F7F8F8'; x.fillRect(0, 0, B.W, B.H); });
    lid(B.tipR, yT, '#FFFFFF', '#DADEDF');
  }

  /* ---------- Faces laterais: as mesmas faixas da borda vizinha ----------
     Lateral direita = borda direita da frente; esquerda = borda esquerda. */
  function sideStops(s, edge) {
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
    const f = v => v / H;
    const s1a = top + sT.off - sT.w / 2, s1b = top + sT.off + sT.w / 2;
    const s2a = bot + sB.off - sB.w / 2, s2b = bot + sB.off + sB.w / 2;
    return [['#FFFFFF', 0, f(s1a)], [C.silver, f(s1a), f(s1b)], ['#FFFFFF', f(s1b), f(top)], [band, f(top), f(s2a)], [C.silver, f(s2a), f(s2b)], [teal, f(s2b), 1]];
  }

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

  /* =========================================================
     Clássicos: Aspirina 500 mg, Aspirina C e CafiAspirina
     Medidas tiradas das fotos das embalagens (frente = 1000 de largura).
     ========================================================= */
  const SERIF = 'Marcellus, Optima, Candara, serif';
  // texto com largura exata (não depende da fonte carregada) e peso simulado por contorno
  const T = (txt, x, y, size, len, fill, opts = {}) =>
    `<text x="${x}" y="${y}" font-family="${opts.font || SERIF}" font-size="${size}" ${len ? `textLength="${len}" lengthAdjust="spacingAndGlyphs"` : ''} fill="${fill}"` +
    `${opts.bold ? ` stroke="${opts.stroke || fill}" stroke-width="${opts.bold}" paint-order="stroke" stroke-linejoin="round"` : ''}` +
    `${opts.italic ? ' font-style="italic"' : ''}${opts.anchor ? ` text-anchor="${opts.anchor}"` : ''}${opts.rotate ? ` transform="rotate(${opts.rotate} ${x} ${y})"` : ''}>${txt}</text>`;

  function discPill(cx, cy, r, id) {
    return `<g><defs><radialGradient id="${id}" cx=".4" cy=".35"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".75" stop-color="#F1F3F3"/><stop offset="1" stop-color="#C9CED0"/></radialGradient></defs>` +
      `<ellipse cx="${cx + 4}" cy="${cy + r * .55}" rx="${r}" ry="${r * .62}" fill="#000" opacity=".22"/>` +
      `<ellipse cx="${cx}" cy="${cy + r * .22}" rx="${r}" ry="${r * .62}" fill="#D3D8DA"/>` +
      `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * .62}" fill="url(#${id})"/>` +
      `<path d="M${cx - r * .5} ${cy} h${r}" stroke="#C4C9CB" stroke-width="2"/><path d="M${cx} ${cy - r * .32} v${r * .64}" stroke="#C4C9CB" stroke-width="2"/></g>`;
  }

  function aspirinaFrontSVG() {
    const H = 450, id = uid('a5');
    return `<svg class="art" viewBox="0 0 1000 ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${id}t" x1="0" x2="1"><stop offset="0" stop-color="#11937A"/><stop offset="1" stop-color="#0B7D67"/></linearGradient>
        <linearGradient id="${id}g" x1="0" x2="1"><stop offset="0" stop-color="#C8CDCF"/><stop offset=".5" stop-color="#7E878A"/><stop offset="1" stop-color="#5C6467"/></linearGradient>
      </defs>
      <rect width="1000" height="${H}" fill="#FFFFFF"/>
      <rect width="1000" height="34" fill="url(#${id}t)"/>
      <path d="M0 150 C40 172 90 196 180 202 L1000 210" fill="none" stroke="url(#${id}g)" stroke-width="5"/>
      <path d="M0 150 C40 172 90 196 180 202 L1000 210" transform="translate(0 9)" fill="none" stroke="#D5D9DB" stroke-width="3"/>
      <path d="M0 290 C30 304 70 316 140 318 L1000 312 V${H} H0 Z" fill="url(#${id}t)"/>
      <path d="M0 278 C30 292 70 304 140 306 L1000 300" fill="none" stroke="#A7AEB1" stroke-width="4"/>
      <path d="M30 150 C48 190 58 230 60 268" fill="none" stroke="#9AA2A5" stroke-width="2" stroke-dasharray="6 5"/>
      ${T('ABRIR AQUI', 22, 262, 17, 100, '#7C8588', { rotate: -90 })}
      ${bayerCross(100, 100, 54, '#0E8C72')}
      ${T('ASPIRINA', 171, 186, 132, 482, '#111111', { bold: 3 })}
      ${T('®', 660, 104, 34, 0, '#111111')}
      ${T('500 mg', 693, 190, 74, 231, '#111111', { bold: 1.2 })}
      ${T('ácido acetilsalicílico', 175, 280, 96, 745, '#1B1B1B', { bold: 1.2 })}
      ${T('Dor de cabeça, Dor nas costas e Febre', 96, 346, 33, 516, '#FFFFFF', { bold: .8 })}
      ${T('USO ADULTO E PEDIÁTRICO ACIMA DE 12 ANOS', 96, 382, 22, 426, '#FFFFFF')}
      ${T('CONTÉM 20 COMPRIMIDOS', 96, 414, 26, 296, '#FFFFFF')}
      ${T('Uso oral', 622, 426, 24, 88, '#FFFFFF')}
      ${discPill(800, 392, 44, id + 'p1')}${discPill(878, 372, 41, id + 'p2')}
    </svg>`;
  }

  function aspirinaCFrontSVG() {
    const H = 667, id = uid('ac');
    let bubbles = '';
    for (let i = 0; i < 70; i++) {
      const bx = 700 + ((i * 53) % 290), by = 270 + ((i * 97) % 250), br = 1.5 + (i % 5) * .9;
      bubbles += `<circle cx="${bx}" cy="${by}" r="${br}" fill="none" stroke="#B9C3C5" stroke-width="1"/>`;
    }
    return `<svg class="art" viewBox="0 0 1000 ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${id}t" x1="0" x2="1"><stop offset="0" stop-color="#13957B"/><stop offset="1" stop-color="#0A7C66"/></linearGradient>
        <linearGradient id="${id}y" x1="0" x2="1"><stop offset="0" stop-color="#F0CF1E"/><stop offset=".45" stop-color="#F6E06A"/><stop offset=".8" stop-color="#FBF3C4"/><stop offset="1" stop-color="#F6E06A"/></linearGradient>
        <linearGradient id="${id}g" x1="0" x2="1"><stop offset="0" stop-color="#D0D4D6"/><stop offset=".4" stop-color="#9EA6A9"/><stop offset="1" stop-color="#4E5659"/></linearGradient>
      </defs>
      <rect width="1000" height="${H}" fill="#FFFFFF"/>
      <rect width="1000" height="25" fill="url(#${id}t)"/>
      <path d="M0 40 C30 120 80 200 220 214 L1000 226" fill="none" stroke="#D9DDDF" stroke-width="5"/>
      <path d="M440 222 L1000 230" fill="none" stroke="url(#${id}g)" stroke-width="7"/>
      <path d="M0 360 C40 372 120 378 260 378 L1000 366 L1000 486 C700 488 300 498 0 502 Z" fill="url(#${id}y)"/>
      <path d="M0 360 C40 372 120 378 260 378 L1000 366" fill="none" stroke="url(#${id}g)" stroke-width="7"/>
      <path d="M0 502 C300 498 700 488 1000 486 V${H} H0 Z" fill="url(#${id}t)"/>
      <path d="M0 502 C300 498 700 488 1000 486" fill="none" stroke="#FFFFFF" stroke-width="5"/>
      ${bubbles}
      ${bayerCross(61, 80, 45, '#0E8C72')}
      ${T('ASPIRINA', 104, 188, 156, 448, '#121212', { bold: 3 })}
      ${T('®', 556, 92, 30, 0, '#121212')}
      ${T('C', 631, 188, 156, 74, '#121212', { bold: 2.5 })}
      <rect x="761" y="44" width="239" height="34" fill="url(#${id}t)"/>
      ${T('Efervescente', 880, 71, 30, 190, '#FFFFFF', { italic: true, anchor: 'middle', font: 'Barlow Condensed, Arial Narrow, sans-serif', bold: .6 })}
      ${T('ácido acetilsalicílico 400 mg', 73, 274, 80, 892, '#1B1B1B', { bold: 1.2 })}
      ${T('ácido ascórbico 240 mg', 73, 352, 80, 731, '#1B1B1B', { bold: 1.2 })}
      ${T('Uso oral', 121, 412, 31, 112, '#1F5A3C')}
      ${T('USO ADULTO E PEDIÁTRICO', 121, 448, 30, 386, '#1F5A3C', { bold: .5 })}
      ${T('ACIMA DE 10 ANOS', 121, 478, 30, 234, '#1F5A3C', { bold: .5 })}
      ${T('Dor e Febre causadas por', 112, 545, 31, 324, '#FFFFFF')}
      ${T('Gripes e Resfriados', 112, 577, 31, 242, '#FFFFFF')}
      ${T('CONTÉM 10', 505, 612, 38, 232, '#FFFFFF', { bold: .6 })}
      ${T('COMPRIMIDOS EFERVESCENTES', 133, 652, 38, 604, '#FFFFFF', { bold: .6 })}
      <path d="M760 ${H} L1000 515 V${H} Z" fill="#FFFFFF"/>
      <path d="M778 ${H} L1000 528 V${H} Z" fill="#F3D21F"/>
      ${T('Sabor Limão', 905, 622, 30, 150, '#1F5A3C', { italic: true, anchor: 'middle', rotate: -31, font: 'Barlow Condensed, Arial Narrow, sans-serif', bold: .5 })}
      ${discPill(880, 455, 66, id + 'p1')}${discPill(790, 505, 70, id + 'p2')}
    </svg>`;
  }

  function cafiFrontSVG() {
    const H = 400, id = uid('cf');
    return `<svg class="art" viewBox="0 0 1000 ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${id}r" x1="0" x2="1"><stop offset="0" stop-color="#E5232F"/><stop offset="1" stop-color="#D21E2A"/></linearGradient>
        <linearGradient id="${id}g" x1="0" x2="1"><stop offset="0" stop-color="#C9CED0"/><stop offset=".5" stop-color="#8B9396"/><stop offset="1" stop-color="#5E666A"/></linearGradient>
      </defs>
      <rect width="1000" height="${H}" fill="#FFFFFF"/>
      <path d="M0 150 C20 178 60 190 140 190 L1000 178 V${H} H0 Z" fill="url(#${id}r)"/>
      <path d="M0 140 C20 168 60 180 140 180 L1000 168" fill="none" stroke="url(#${id}g)" stroke-width="7"/>
      <path d="M0 252 C30 254 90 254 160 252 L1000 238" fill="none" stroke="#FFFFFF" stroke-width="4"/>
      <path d="M0 262 C30 264 90 264 160 262 L1000 248" fill="none" stroke="#B0161F" stroke-width="2"/>
      <circle cx="104" cy="74" r="62" fill="#FFFFFF"/>
      ${bayerCross(104, 74, 53, '#14A04B')}
      ${T('CAFI', 251, 147, 96, 238, '#C9CED0', { bold: 3 })}
      ${T('CAFI', 245, 143, 96, 238, '#E2222D', { bold: 3 })}
      ${T('ASPIRINA', 488, 140, 96, 405, '#2B2B2B', { bold: 2.4 })}
      ${T('®', 900, 84, 28, 0, '#2B2B2B')}
      ${T('comprimidos', 245, 222, 38, 222, '#FFFFFF', { bold: 1.2 })}
      ${T('Ácido acetilsalicílico', 248, 290, 27, 274, '#FFFFFF')}
      ${T('Cafeína', 248, 322, 27, 85, '#FFFFFF')}
      ${T('20 comprimidos', 248, 376, 40, 261, '#FFFFFF', { bold: 1.2 })}
      ${discPill(888, 182, 50, id + 'p')}
    </svg>`;
  }

  // Verso simples: marca sobre a cor principal
  function classicBackSVG(c) {
    const H = c.vb;
    return `<svg class="art" viewBox="0 0 1000 ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1000" height="${H}" fill="${c.main}"/>
      <rect y="${H * .18}" width="1000" height="${H * .46}" fill="#FFFFFF"/>
      ${T(c.word, 500, H * .5, H * .22, 0, '#1A1A1A', { anchor: 'middle', bold: 2 })}
      ${T('Leia a bula. Bayer S.A.', 500, H * .82, H * .07, 0, '#FFFFFF', { anchor: 'middle' })}
    </svg>`;
  }

  const CLASSICS = [
    { id: 'aspirina-500', name: 'Aspirina 500 mg', word: 'ASPIRINA', ativo: 'Ácido acetilsalicílico 500 mg', qtyLabel: '20 comprimidos', main: '#0E8C72', principio: 'Ácido acetilsalicílico (AAS)', dose: '500 mg', form: 'Comprimidos', extra: 'Comprimido branco e redondo, com a cruz Bayer gravada', since: 'Em comprimido desde 1900', formula: 'C₉H₈O₄',
      desc: 'O clássico, em comprimidos de 500 mg desde 1900.', box: { w: 300, h: 135, d: 68 }, vb: 450, front: aspirinaFrontSVG,
      sides: { right: [['#0E8C72', 0, 1]], left: [['#11937A', 0, .08], ['#FFFFFF', .08, .7], ['#11937A', .7, 1]] }, top: ['#0F8F76', '#0B7D67'], bottom: '#0B7D67' },
    { id: 'aspirina-c', name: 'Aspirina C', word: 'ASPIRINA C', ativo: 'AAS 400 mg + ácido ascórbico 240 mg', qtyLabel: '10 comprimidos efervescentes', main: '#0E8C72', principio: 'Ácido acetilsalicílico + ácido ascórbico (vitamina C)', dose: '400 mg + 240 mg', form: 'Comprimidos efervescentes', extra: 'Sabor limão. Dissolve em água', formula: 'C₉H₈O₄ + C₆H₈O₆',
      desc: 'Comprimido efervescente sabor limão.', box: { w: 270, h: 180, d: 78 }, vb: 667, front: aspirinaCFrontSVG,
      sides: { right: [['#0C8069', 0, 1]], left: [['#13957B', 0, .05], ['#FFFFFF', .05, .55], ['#F0CF1E', .55, .75], ['#13957B', .75, 1]] }, top: ['#0F8F76', '#0A7C66'], bottom: '#0A7C66' },
    { id: 'cafiaspirina', name: 'CafiAspirina', word: 'CAFIASPIRINA', ativo: 'AAS 650 mg + cafeína 65 mg', qtyLabel: '20 comprimidos', main: '#DC2130', principio: 'Ácido acetilsalicílico + cafeína', dose: '650 mg + 65 mg', form: 'Comprimidos', extra: 'Uso adulto. Também em envelope com 4 comprimidos', formula: 'C₉H₈O₄ + C₈H₁₀N₄O₂',
      desc: 'Ácido acetilsalicílico com cafeína, em comprimidos de 650 mg + 65 mg.', box: { w: 320, h: 128, d: 62 }, vb: 400, front: cafiFrontSVG,
      sides: { right: [['#FFFFFF', 0, .42], ['#8B9396', .42, .45], ['#DC2130', .45, 1]], left: [['#FFFFFF', 0, .4], ['#8B9396', .4, .43], ['#E2232F', .43, 1]] }, top: ['#F4F5F5', '#DADDDE'], bottom: '#C81C28' }
  ];
  CLASSICS.forEach(c => { c.classic = true; c.back = () => classicBackSVG(c); });
  const classicFlat = c => `<div class="flat" style="aspect-ratio:${1000 / c.vb}">${c.front()}</div>`;

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

  return { C, SKUS, FAMILIES, LINE, FAQ, product3D, flat, ean13, makeBottleLabel, drawBottle, frontSVG, backSVG, gotasBoxSVG, gotasSideSVG, gotasBackSVG, sideStops, CLASSICS, classicFlat, byId: id => SKUS.find(s => s.id === id) };
})();
