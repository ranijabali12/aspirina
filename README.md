# Família Asp · Bayer

Site conceitual dos lançamentos da família Aspirina: **AspDip** (dipirona) e **AspMol** (paracetamol).

São 5 produtos:

| Produto | Apresentação |
| --- | --- |
| AspDip 500 mg | 30 comprimidos |
| AspDip 1 g | 10 comprimidos |
| AspDip Gotas 500 mg/mL | frasco de 20 mL com caixa (infantil, a partir de 3 meses) |
| AspMol 500 mg | 20 comprimidos |
| AspMol 750 mg | 20 comprimidos |

Site estático, sem build: abra `index.html` ou sirva a pasta (`python3 -m http.server`).

## Publicar no GitHub Pages
O repositório já vem pronto (`.nojekyll` e o fluxo `.github/workflows/pages.yml`). Falta um ajuste único no GitHub:

1. Abra **Settings → Pages** no repositório.
2. Em **Build and deployment → Source**, escolha **GitHub Actions**.
3. Abra **Actions → Publicar no GitHub Pages → Run workflow** (ou faça qualquer push na branch).

O site fica em `https://ranijabali12.github.io/aspirina/`. Cada push nesta branch ou na `main` publica de novo.

## Arquivos
- `index.html`: estrutura e abas.
- `catalog.js`: dados dos produtos e o desenho vetorial (SVG) das embalagens, copiado das embalagens reais: topo branco com a cruz Bayer, faixa da família, base verde-azulada "Dor & Febre" e arco prateado. As cores ficam no objeto `C`.
- `app.js`: interações.
- `styles.css`: sistema visual (tokens no `:root`, tema claro e escuro).
- `assets/produtos/`: fotos reais de referência.

## Abas
- **Início**: os 5 lançamentos em caixas 3D girando em órbita no centro da tela (arraste, setas ou clique), com painel do produto em destaque.
- **Lançamentos**: troca entre AspDip e AspMol, escolha da apresentação, caixa 3D que gira ao arrastar (frente, lateral e verso, com código de barras EAN real no AspMol), ficha do produto, comparativo dos 5 e a campanha #ASPergunta.

O site não traz indicação, posologia nem recomendação de uso por idade ou sintoma: só identifica os produtos e remete à bula.
- **Linha**: portfólio completo, filtrado por família.
- **História**: linha do tempo de 1897 a 2026 e as três moléculas desenhadas.
- **Dúvidas**: perguntas frequentes e busca de farmácias por CEP.

Extras: busca com `Ctrl K` ou `/`, tema claro e escuro, cursor com rótulo, links diretos para cada produto (ex.: `#aspdip-gotas`).

## Design
- Grade de 8px. Fontes: Barlow Condensed (títulos no estilo "DOR & FEBRE" das caixas), Jost (logotipo ASP), Geist (texto) e Geist Mono (dados).
- Transições entre 150 e 300ms com ease-in-out. Respeita `prefers-reduced-motion`.
- No celular, as abas viram uma barra inferior.
