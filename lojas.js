/* Links diretos dos produtos nas farmácias on-line (conferidos nas lojas).
   Só entram as redes que vendem a apresentação; cada produto tem seus próprios links. */
window.LOJAS = {
 "farmacias": [
  [
   "saopaulo",
   "Drogaria São Paulo"
  ],
  [
   "pacheco",
   "Drogarias Pacheco"
  ],
  [
   "paguemenos",
   "Pague Menos"
  ],
  [
   "venancio",
   "Drogaria Venancio"
  ]
 ],
 "links": {
  "aspdip-500": {
   "pacheco": "https://www.drogariaspacheco.com.br/analgesico-aspdip-500mg-30-comprimidos/p",
   "saopaulo": "https://www.drogariasaopaulo.com.br/analgesico-aspdip-500mg-30-comprimidos/p",
   "paguemenos": "https://www.paguemenos.com.br/aspdip-500mg-30-comprimidos/p",
   "venancio": "https://www.drogariavenancio.com.br/aspdip-500mg-30-comprimidos/p"
  },
  "aspdip-1g": {
   "pacheco": "https://www.drogariaspacheco.com.br/analgesico-aspdip-1g-10-comprimidos/p",
   "saopaulo": "https://www.drogariasaopaulo.com.br/analgesico-aspdip-1g-10-comprimidos/p",
   "paguemenos": "https://www.paguemenos.com.br/aspdip-1g-10-comprimidos/p",
   "venancio": "https://www.drogariavenancio.com.br/aspdip-1g-10-comprimidos/p"
  },
  "aspdip-gotas": {
   "pacheco": "https://www.drogariaspacheco.com.br/analgesico-aspdip-500mg-20ml-gotas/p",
   "saopaulo": "https://www.drogariasaopaulo.com.br/analgesico-aspdip-500mg-20ml-gotas/p",
   "paguemenos": "https://www.paguemenos.com.br/aspdip-500mg-ml-abacaxi-gotas-20ml/p",
   "venancio": "https://www.drogariavenancio.com.br/aspdip-gotas-500mg-ml-20ml/p"
  },
  "aspmol-500": {
   "pacheco": "https://www.drogariaspacheco.com.br/analgesico-aspmol-500mg-20-comprimidos/p",
   "saopaulo": "https://www.drogariasaopaulo.com.br/analgesico-aspmol-500mg-20-comprimidos/p",
   "paguemenos": "https://www.paguemenos.com.br/aspmol-500mg-20-comprimidos/p",
   "venancio": "https://www.drogariavenancio.com.br/aspmol-500mg-20-comprimidos/p"
  },
  "aspmol-750": {
   "pacheco": "https://www.drogariaspacheco.com.br/analgesico-aspmol-750mg-20-comprimido/p",
   "saopaulo": "https://www.drogariasaopaulo.com.br/analgesico-aspmol-750mg-20-comprimido/p",
   "paguemenos": "https://www.paguemenos.com.br/aspmol-750mg-20-comprimidos/p",
   "venancio": "https://www.drogariavenancio.com.br/aspmol-750mg-20com/p"
  },
  "aspirina-500": {
   "pacheco": "https://www.drogariaspacheco.com.br/aspirina-500mg-bayer-20-comprimidos/p",
   "saopaulo": "https://www.drogariasaopaulo.com.br/aspirina-500mg-bayer-20-comprimidos/p",
   "paguemenos": "https://www.paguemenos.com.br/aspirina-500mg-com-20-comprimidos/p",
   "venancio": "https://www.drogariavenancio.com.br/aspirina-500mg-com-20-comprimidos/p"
  },
  "aspirina-c": {
   "pacheco": "https://www.drogariaspacheco.com.br/aspirina-c-400mg-bayer-10-comprimidos-efervescentes/p",
   "saopaulo": "https://www.drogariasaopaulo.com.br/aspirina-c-400mg-bayer-10-comprimidos-efervescentes/p",
   "paguemenos": "https://www.paguemenos.com.br/aspirina-c-400mg-com-10-comprimidos-efervescentes/p",
   "venancio": "https://www.drogariavenancio.com.br/aspirina-c-bayer-10-comprimidos/p"
  },
  "cafiaspirina": {
   "pacheco": "https://www.drogariaspacheco.com.br/cafiaspirina-bayer-4-capsulas/p",
   "saopaulo": "https://www.drogariasaopaulo.com.br/cafiaspirina-bayer-4-capsulas/p",
   "paguemenos": "https://www.paguemenos.com.br/cafiaspirina-envelope-com-4-comprimidos/p"
  }
 }
};
window.LOJAS.chips = (id, cls = '') => {
  const L = window.LOJAS, m = L.links[id] || {};
  const items = L.farmacias.filter(([k]) => m[k]);
  if (!items.length) return '';
  return `<div class="buy ${cls}">${items.map(([k, n]) => `<a class="buy__chip" href="${m[k]}" target="_blank" rel="noopener" data-ph="${k}">${n}<span aria-hidden="true">↗</span></a>`).join('')}</div>`;
};
