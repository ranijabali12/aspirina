/* =========================================================
   Catálogo da família Asp + desenho vetorial das embalagens
   Cores e layout copiados das embalagens reais (fotos Bayer).
   ========================================================= */
window.ASP = (() => {
  const C = {
    teal1: '#00A785', teal2: '#00997B', teal3: '#007960',
    red: '#DC1F2A', red2: '#C40230', wine: '#7A2331', wine2: '#751A29',
    dipWord: '#1FA48B', lime1: '#97C93A', lime2: '#C3DD48', limeBadge: '#A9D33F',
    green1: '#2BAA47', green2: '#62BE45', greenBadge: '#36A848',
    gold: '#C9AE45', ink: '#111111'
  };

  const SKUS = [
    {
      id: 'aspdip-500', fam: 'dip', name: 'AspDip', dose: '500 mg', doseShort: '500mg',
      form: 'Comprimidos', qty: 30, qtyLabel: '30 comprimidos',
      ativo: 'Dipirona monoidratada', formula: 'C₁₃H₁₆N₃NaO₄S · H₂O',
      indic: 'Dores leves a moderadas e febre',
      idade: 'Adultos e adolescentes acima de 15 anos',
      poso: '1 a 2 comprimidos até 4 vezes ao dia',
      extra: 'Comprimido branco e oblongo',
      age: ['adulto'], need: ['leve', 'febre'],
      band: [C.lime1, C.lime2], badge: { bg: C.limeBadge, text: '500mg' },
      box: { w: 250, h: 119, d: 62 }, vb: 476,
      tagline: null, contem: 'CONTÉM: 30 COMPRIMIDOS. USO ORAL. USO ADULTO E PEDIÁTRICO ACIMA DE 15 ANOS.',
      pill: 'oblong'
    },
    {
      id: 'aspdip-1g', fam: 'dip', name: 'AspDip', dose: '1 g', doseShort: '1g',
      form: 'Comprimidos', qty: 10, qtyLabel: '10 comprimidos',
      ativo: 'Dipirona monoidratada', formula: 'C₁₃H₁₆N₃NaO₄S · H₂O',
      indic: 'Dores moderadas a intensas e febre',
      idade: 'Adultos e adolescentes acima de 15 anos',
      poso: '½ a 1 comprimido até 4 vezes ao dia',
      extra: 'Alta concentração de analgésico',
      age: ['adulto'], need: ['intensa', 'febre'],
      band: [C.green1, C.green2], badge: { bg: C.greenBadge, text: '1g', big: true },
      box: { w: 300, h: 134, d: 46 }, vb: 448,
      tagline: 'ALTA CONCENTRAÇÃO DE ANALGÉSICO', contem: 'CONTÉM: 10 COMPRIMIDOS. USO ORAL. USO ADULTO E PEDIÁTRICO ACIMA DE 15 ANOS.',
      pill: 'oblong'
    },
    {
      id: 'aspdip-gotas', fam: 'dip', name: 'AspDip Gotas', dose: '500 mg/mL', doseShort: '500mg/mL',
      form: 'Solução oral', qty: 20, qtyLabel: 'Frasco de 20 mL com caixa',
      ativo: 'Dipirona monoidratada', formula: 'C₁₃H₁₆N₃NaO₄S · H₂O',
      indic: 'Dor e febre',
      idade: 'Infantil, a partir de 3 meses',
      poso: 'Dose conforme peso e idade, segundo a bula',
      extra: 'Sabor abacaxi · 20 gotas = 1 mL · 40 gotas = 1 g',
      age: ['crianca', 'teen', 'adulto'], need: ['leve', 'febre'],
      band: [C.lime1, C.lime2], drops: true,
      box: { w: 104, h: 246, d: 70 }
    },
    {
      id: 'aspmol-500', fam: 'mol', name: 'AspMol', dose: '500 mg', doseShort: '500mg',
      form: 'Comprimidos', qty: 20, qtyLabel: '20 comprimidos',
      ativo: 'Paracetamol', formula: 'C₈H₉NO₂',
      indic: 'Dores leves a moderadas e febre',
      idade: 'Adultos e maiores de 12 anos',
      poso: 'Consulte a bula',
      extra: 'Efeito em 30 a 60 min · alívio por 4 a 6 h',
      age: ['teen', 'adulto'], need: ['leve', 'febre'],
      band: [C.red, C.red2], dots: true,
      box: { w: 306, h: 145, d: 50 }, vb: 474,
      tagline: 'ALÍVIO DAS DORES NO CORPO E FEBRE', contem: 'CONTÉM: 20 COMPRIMIDOS. USO ORAL. USO ADULTO E PEDIÁTRICO ACIMA DE 12 ANOS.',
      pill: 'round', ean: '7891106916639'
    },
    {
      id: 'aspmol-750', fam: 'mol', name: 'AspMol', dose: '750 mg', doseShort: '750mg',
      form: 'Comprimidos', qty: 20, qtyLabel: '20 comprimidos',
      ativo: 'Paracetamol', formula: 'C₈H₉NO₂',
      indic: 'Dores leves a moderadas e febre',
      idade: 'Adultos e maiores de 12 anos',
      poso: 'Consulte a bula',
      extra: 'Alívio das dores no corpo e febre',
      age: ['teen', 'adulto'], need: ['leve', 'febre'],
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
      lead: 'Dipirona da Bayer para dor e febre. Comprimidos de 500 mg e 1 g para adultos e gotas infantis com sabor abacaxi a partir de 3 meses.'
    },
    mol: {
      key: 'mol', name: 'AspMol', word: 'MOL', ativo: 'paracetamol', formula: 'C₈H₉NO₂',
      color: C.red, band: C.red,
      lead: 'Paracetamol da Bayer para o alívio das dores no corpo e da febre, em comprimidos de 500 mg e 750 mg.'
    }
  };

  // Linha completa (lançamentos + clássicos)
  const LINE = [
    ...SKUS.map(s => ({ sku: s.id, tags: ['novo', 'dor', ...(s.drops ? ['infantil'] : [])] })),
    { id: 'aspirina-500', name: 'Aspirina 500 mg', ativo: 'Ácido acetilsalicílico 500 mg', desc: 'O clássico desde 1900. Alívio de dores leves a moderadas, como dor de cabeça, de garganta e muscular.', tags: ['dor'], color: '#0E7C3A' },
    { id: 'aspirina-c', name: 'Aspirina C', ativo: 'AAS 400 mg + vitamina C 240 mg', desc: 'Comprimido efervescente para dor e febre de gripes e resfriados, dor de cabeça e dores musculares.', tags: ['gripe', 'dor'], color: '#E89B12' },
    { id: 'cafiaspirina', name: 'CafiAspirina', ativo: 'AAS 650 mg + cafeína 65 mg', desc: 'Para dores moderadas e dor de cabeça forte, incluindo enxaqueca. Uso adulto.', tags: ['enxaqueca', 'dor'], color: '#B8202E' },
    { id: 'prevent', name: 'Aspirina Prevent', ativo: 'AAS 100 mg e 300 mg', desc: 'Ação antiagregante plaquetária para prevenção cardiovascular. Uso sob orientação médica.', tags: ['coracao'], color: '#9A1B3A' }
  ];

  const FAQ = [
    ['O que são AspDip e AspMol?', 'São os lançamentos da Bayer na família Aspirina. AspDip tem dipirona e vem em comprimidos de 500 mg, 1 g e em gotas 500 mg/mL. AspMol tem paracetamol e vem em comprimidos de 500 mg e 750 mg.'],
    ['Qual a diferença para a Aspirina tradicional?', 'A Aspirina tradicional tem ácido acetilsalicílico (AAS). AspDip e AspMol usam outros princípios ativos, dipirona e paracetamol, com a mesma assinatura Bayer.'],
    ['AspDip gotas pode ser usado por crianças?', 'Sim. AspDip gotas é a versão infantil, indicada a partir de 3 meses. A dose depende do peso e da idade e está na bula. 20 gotas equivalem a 1 mL, ou 500 mg de dipirona.'],
    ['Qual o sabor do AspDip gotas?', 'Abacaxi. A solução é límpida e amarelada, em frasco gotejador de 20 mL.'],
    ['Quando usar AspDip 500 mg ou 1 g?', 'O AspDip 500 mg é indicado para dores leves a moderadas e febre. O 1 g tem alta concentração de analgésico, para dores moderadas a intensas. Os dois são para adultos e adolescentes acima de 15 anos.'],
    ['Qual a diferença entre AspMol 500 mg e 750 mg?', 'A quantidade de paracetamol por comprimido. Os dois vêm em caixas com 20 comprimidos e são de uso adulto e pediátrico acima de 12 anos.'],
    ['Quanto tempo o AspMol leva para agir?', 'Segundo a Bayer, o efeito começa em 30 a 60 minutos e o alívio dura de 4 a 6 horas.'],
    ['Preciso de receita?', 'São medicamentos isentos de prescrição. Mesmo assim, leia a bula, respeite a dose e fale com um farmacêutico ou médico em caso de dúvida.'],
    ['O que é a #ASPergunta?', 'É a campanha de 2026 com Dani Calabresa que apresenta AspDip e AspMol. A assinatura é “Dos mesmos criadores da Aspirina. É Bayer, é bom.”']
  ];

  /* ---------- EAN-13 ---------- */
  function ean13(code) {
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
    return `<svg class="ean" viewBox="-6 0 107 56" aria-label="Código de barras ${code}"><rect x="-6" y="-2" width="107" height="60" fill="#fff"/><g fill="#111">${rects}</g>` +
      `<text x="-5" y="54" font-size="8" font-family="Geist Mono, monospace" fill="#111">${code[0]}</text>` +
      `<text x="24" y="54" font-size="8" font-family="Geist Mono, monospace" fill="#111" text-anchor="middle">${code.slice(1, 7)}</text>` +
      `<text x="71" y="54" font-size="8" font-family="Geist Mono, monospace" fill="#111" text-anchor="middle">${code.slice(7)}</text></svg>`;
  }

  /* ---------- Peças gráficas comuns ---------- */
  const uid = (() => { let n = 0; return p => `${p}${++n}`; })();

  function bayerCross(cx, cy, r, color = C.ink) {
    const fs = r * 0.36;
    const letters = 'BAYER';
    const step = r * 0.36;
    let v = '', h = '';
    [...letters].forEach((ch, i) => {
      const o = (i - 2) * step;
      v += `<text x="${cx}" y="${cy + o + fs * 0.36}" text-anchor="middle">${ch}</text>`;
      if (i !== 2) h += `<text x="${cx + o}" y="${cy + fs * 0.36}" text-anchor="middle">${ch}</text>`;
    });
    return `<g class="bayer" fill="${color}" font-family="Jost, Geist, sans-serif" font-weight="700" font-size="${fs}">` +
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${r * 0.09}"/>${v}${h}</g>`;
  }

  function silverDefs(id) {
    return `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".55" stop-color="#E6E8E9"/><stop offset=".8" stop-color="#FDFDFD"/><stop offset=".92" stop-color="#A9AEB1"/><stop offset="1" stop-color="#D8DBDC"/></linearGradient>`;
  }

  function dotsRow(y, w, id) {
    // Retícula de pontos, como na embalagem
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

  /* ---------- Frente da caixa horizontal (AspDip 500/1g, AspMol 500/750) ---------- */
  function frontSVG(s) {
    const W = 1000, H = s.vb;
    const f = FAMILIES[s.fam];
    const k = H / 436;                 // escala vertical relativa ao 750 mg
    const yTop = 150 * k, yBot = 232 * k;
    const gS = uid('sv'), gT = uid('tl'), gB = uid('bd'), gD = uid('dt');
    const curveTop = `M0 ${yTop} H820 C900 ${yTop} 960 ${yTop - 22 * k} 1000 ${yTop - 46 * k}`;
    const curveBot = `M0 ${yBot} H820 C900 ${yBot} 960 ${yBot - 14 * k} 1000 ${yBot - 34 * k}`;
    const badge = s.badge
      ? `<g><rect x="800" y="0" width="${s.badge.big ? 110 : 100}" height="${108 * k}" fill="${s.badge.bg}"/>` +
        `<rect x="800" y="${102 * k}" width="${s.badge.big ? 110 : 100}" height="${7 * k}" fill="url(#${gS})"/>` +
        `<text x="${s.badge.big ? 855 : 850}" y="${(s.badge.big ? 78 : 66) * k}" text-anchor="middle" fill="#fff" font-family="Barlow Condensed, Geist, sans-serif" font-weight="700" ${s.badge.italic ? 'font-style="italic"' : ''} font-size="${(s.badge.big ? 70 : 34) * k}">${s.badge.text}</text></g>`
      : '';
    const dots = s.dots ? `<g fill="#3C4447">${[0, 1, 2, 3, 4].map(i => `<circle cx="${872 + i * 16}" cy="${34 * k}" r="4.2"/>`).join('')}</g>` : '';
    const doseTxt = `${f.ativo} ${s.doseShort}`;
    return `<svg class="art" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>${silverDefs(gS)}
        <linearGradient id="${gT}" x1="0" x2="1"><stop offset="0" stop-color="${C.teal1}"/><stop offset=".55" stop-color="${C.teal2}"/><stop offset="1" stop-color="${C.teal3}"/></linearGradient>
        <linearGradient id="${gB}" x1="0" x2="1"><stop offset="0" stop-color="${s.band[0]}"/><stop offset="1" stop-color="${s.band[1]}"/></linearGradient>
        ${dotsRow(yTop - 14 * k, W, gD)}
      </defs>
      <rect width="${W}" height="${H}" fill="#fff"/>
      <path d="${curveBot} V${H} H0 Z" fill="url(#${gT})"/>
      <path d="${curveTop} V${yBot - 34 * k} C960 ${yBot - 14 * k} 900 ${yBot} 820 ${yBot} H0 Z" fill="url(#${gB})"/>
      <rect x="0" y="${yTop - 14 * k}" width="${W}" height="12" fill="url(#${gD})" mask="url(#${gD}k)"/>
      <rect x="0" y="${yBot + 2}" width="${W}" height="12" fill="url(#${gD})" mask="url(#${gD}k)" opacity=".6"/>
      <path d="${curveTop}" transform="translate(0 -6)" fill="none" stroke="url(#${gS})" stroke-width="${9 * k}"/>
      <path d="${curveBot}" transform="translate(0 4)" fill="none" stroke="url(#${gS})" stroke-width="${10 * k}"/>
      ${bayerCross(88, 88 * k, 36 * k)}
      <text x="134" y="${120 * k}" font-family="Jost, Geist, sans-serif" font-weight="600" font-size="${104 * k}" letter-spacing="-3"><tspan fill="${C.ink}">ASP</tspan><tspan fill="${f.color}">${f.word}</tspan></text>
      ${badge}${dots}
      <text x="70" y="${(yTop + yBot) / 2 + 24 * k}" fill="#fff" font-family="Barlow Condensed, Geist, sans-serif" font-weight="500" font-size="${68 * k}">${doseTxt}</text>
      <text x="70" y="${312 * k}" fill="#fff" font-family="Barlow Condensed, Geist, sans-serif" font-style="italic" font-size="${54 * k}"><tspan font-weight="800">DOR</tspan><tspan font-weight="300"> &amp; </tspan><tspan font-weight="800">FEBRE</tspan></text>
      ${s.tagline ? `<text x="70" y="${346 * k}" fill="#fff" font-family="Barlow Condensed, Geist, sans-serif" font-style="italic" font-weight="300" font-size="${24 * k}">${s.tagline}</text>` : ''}
      <text x="70" y="${404 * k}" fill="#fff" font-family="Barlow Condensed, Geist, sans-serif" font-weight="600" font-size="${16 * k}">${s.contem}</text>
      ${pillShape(s.pill, 860, 352 * k, 0.9 * k)}
    </svg>`;
  }

  /* ---------- Caixa vertical das gotas ---------- */
  function gotasBoxSVG() {
    const W = 420, H = 994;
    const gS = uid('sv'), gT = uid('tl'), gB = uid('bd'), gG = uid('gd');
    return `<svg class="art" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>${silverDefs(gS)}
        <linearGradient id="${gT}" x1="0" x2="1"><stop offset="0" stop-color="${C.teal1}"/><stop offset="1" stop-color="${C.teal3}"/></linearGradient>
        <linearGradient id="${gB}" x1="0" x2="1"><stop offset="0" stop-color="${C.lime1}"/><stop offset="1" stop-color="${C.lime2}"/></linearGradient>
        <radialGradient id="${gG}" cx=".35" cy=".35"><stop offset="0" stop-color="#F6E7A0"/><stop offset=".6" stop-color="${C.gold}"/><stop offset="1" stop-color="#8E7A2A"/></radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="#fff"/>
      <path d="M0 360 H300 C350 360 390 350 420 330 V${H} H0 Z" fill="url(#${gT})"/>
      <path d="M0 200 H300 C350 200 390 190 420 170 V330 C390 350 350 360 300 360 H0 Z" fill="url(#${gB})"/>
      <path d="M0 192 H300 C350 192 390 182 420 162" fill="none" stroke="url(#${gS})" stroke-width="9"/>
      <path d="M0 366 H300 C350 366 390 356 420 336" fill="none" stroke="url(#${gS})" stroke-width="9"/>
      ${bayerCross(54, 110, 26)}
      <text x="88" y="132" font-family="Jost, Geist, sans-serif" font-weight="600" font-size="66" letter-spacing="-2"><tspan fill="${C.ink}">ASP</tspan><tspan fill="${C.dipWord}">DIP</tspan></text>
      <text x="32" y="262" fill="#fff" font-family="Barlow Condensed, Geist, sans-serif" font-weight="500" font-size="62">dipirona</text>
      <text x="32" y="326" fill="#fff" font-family="Barlow Condensed, Geist, sans-serif" font-weight="500" font-size="62">500mg/mL</text>
      <text x="32" y="450" fill="#fff" font-family="Barlow Condensed, Geist, sans-serif" font-style="italic" font-size="50"><tspan font-weight="800">DOR</tspan><tspan font-weight="300"> &amp; </tspan><tspan font-weight="800">FEBRE</tspan></text>
      <text x="32" y="556" fill="${C.lime2}" font-family="Barlow Condensed, Geist, sans-serif" font-style="italic" font-weight="500" font-size="34">Infantil</text>
      <text x="32" y="728" fill="${C.lime2}" font-family="Barlow Condensed, Geist, sans-serif" font-weight="700" font-size="52">GOTAS</text>
      <text x="32" y="764" fill="${C.lime2}" font-family="Barlow Condensed, Geist, sans-serif" font-weight="500" font-size="26">40 gotas = 1g</text>
      <path d="M330 640 C330 640 290 700 290 730 A40 40 0 0 0 370 730 C370 700 330 640 330 640 Z" fill="url(#${gG})"/>
      <path d="M312 722 a20 20 0 0 0 10 26" stroke="#fff" stroke-opacity=".7" stroke-width="5" fill="none"/>
      <text x="32" y="900" fill="#fff" font-family="Barlow Condensed, Geist, sans-serif" font-weight="500" font-size="24">Conteúdo: 20 mL</text>
      <text x="32" y="930" fill="#fff" fill-opacity=".8" font-family="Barlow Condensed, Geist, sans-serif" font-size="17">SOLUÇÃO ORAL. USO ADULTO E PEDIÁTRICO ACIMA DE 3 MESES.</text>
    </svg>`;
  }

  /* ---------- Frasco gotejador ---------- */
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
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<rect x="${50 + i * 8.5}" y="50" width="2" height="88" fill="#000" opacity=".06"/>`).join('')}
      <path d="M40 150 h90 l8 16 h-106 z" fill="url(#${gBd})"/>
      <rect x="12" y="166" width="146" height="276" rx="18" fill="url(#${gBd})"/>
      <clipPath id="${gB}c"><rect x="12" y="196" width="146" height="216"/></clipPath>
      <g clip-path="url(#${gB}c)">
        <rect x="12" y="196" width="146" height="216" fill="#fff"/>
        <rect x="12" y="262" width="146" height="34" fill="url(#${gB})"/>
        <rect x="12" y="300" width="146" height="112" fill="url(#${gT})"/>
      </g>
      ${bayerCross(30, 230, 11)}
      <text x="45" y="240" font-family="Jost, Geist, sans-serif" font-weight="600" font-size="27" letter-spacing="-1"><tspan fill="${C.ink}">ASP</tspan><tspan fill="${C.dipWord}">DIP</tspan></text>
      <text x="20" y="285" fill="#fff" font-family="Barlow Condensed, Geist, sans-serif" font-weight="500" font-size="19">dipirona 500mg/mL</text>
      <text x="20" y="328" fill="#fff" font-family="Barlow Condensed, Geist, sans-serif" font-style="italic" font-weight="800" font-size="20">DOR &amp; FEBRE</text>
      <text x="20" y="352" fill="#fff" fill-opacity=".85" font-family="Barlow Condensed, Geist, sans-serif" font-size="12">Conteúdo: 20 mL</text>
      <path d="M128 330 C128 330 114 352 114 362 A14 14 0 0 0 142 362 C142 352 128 330 128 330 Z" fill="url(#${gG})"/>
      <rect x="12" y="166" width="146" height="276" rx="18" fill="url(#${gSh})"/>
    </svg>`;
  }

  /* ---------- Faces laterais em CSS: branco / faixa / verde ---------- */
  function sideBg(s, vertical) {
    const b = s.band[0];
    if (s.drops) return `linear-gradient(180deg,#fff 0 19%, ${C.lime1} 19% 36%, ${C.teal2} 36% 100%)`;
    const top = (150 / 436) * 100, bot = (232 / 436) * 100;
    return `linear-gradient(180deg,#fff 0 ${top}%, ${b} ${top}% ${bot}%, ${C.teal3} ${bot}% 100%)`;
  }

  function backFace(s) {
    const f = FAMILIES[s.fam];
    return `<div class="back"><span class="back__w">ASP<b style="color:${s.drops ? C.lime2 : '#fff'}">${f.word}</b></span>` +
      `<span class="back__t">Dos mesmos criadores da Aspirina</span>` +
      `<span class="back__f">${s.ativo} · ${s.dose}</span>` +
      (s.ean ? ean13(s.ean) : '') + `</div>`;
  }

  /* ---------- Caixa 3D completa ---------- */
  function box3D(s) {
    const { w, h, d } = s.box;
    const front = s.drops ? gotasBoxSVG() : frontSVG(s);
    const side = sideBg(s);
    return `<div class="box" style="--w:${w}px;--h:${h}px;--d:${d}px">
      <div class="box__face box__front">${front}<i class="gloss"></i></div>
      <div class="box__face box__back" style="background:linear-gradient(90deg,${C.teal3},${C.teal1})">${backFace(s)}</div>
      <div class="box__face box__right" style="background:${side}"><span class="side-txt">ASP${FAMILIES[s.fam].word} ${s.doseShort}</span></div>
      <div class="box__face box__left" style="background:${side}"></div>
      <div class="box__face box__top"></div>
      <div class="box__face box__bottom" style="background:${C.teal3}"></div>
    </div>`;
  }

  // Produto completo (gotas = caixa + frasco)
  function product3D(s) {
    if (s.drops) {
      return `<div class="pkg pkg--drops" data-sku="${s.id}">${box3D(s)}<div class="bottle">${bottleSVG()}</div></div>`;
    }
    return `<div class="pkg" data-sku="${s.id}">${box3D(s)}</div>`;
  }

  // Miniatura plana (para listas e cartões)
  function flat(s) {
    if (s.drops) return `<div class="flat flat--drops"><div class="flat__box">${gotasBoxSVG()}</div><div class="flat__bottle">${bottleSVG()}</div></div>`;
    return `<div class="flat" style="aspect-ratio:${1000 / s.vb}">${frontSVG(s)}</div>`;
  }

  return { C, SKUS, FAMILIES, LINE, FAQ, product3D, flat, ean13, byId: id => SKUS.find(s => s.id === id) };
})();
