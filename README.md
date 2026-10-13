# Aspirina · AspDip & AspMol

Site conceitual da linha Aspirina (Bayer) que destaca os lançamentos **AspDip** (dipirona) e **AspMol** (paracetamol).

Site estático, sem build: abra `index.html` no navegador.

## Abas
- **Início**: embalagens 3D flutuando no centro, com parallax que segue o mouse (e o giroscópio no celular), comprimidos em profundidade e a molécula do AAS desenhada ao fundo.
- **Lançamentos**: alternância AspDip/AspMol que troca a cor de toda a seção, visualizador 3D que gira ao arrastar, seletor de apresentações (incluindo o frasco de gotas), comparativo e a campanha #ASPergunta.
- **Produtos**: linha completa com filtros e cards com inclinação 3D.
- **História**: linha do tempo de 1897 a 2026, navegável arrastando.
- **Dúvidas**: FAQ e busca de farmácias por CEP (abre o Google Maps).

## Design
- Grade de 8px, escala tipográfica 1.25 (Manrope + Instrument Serif + JetBrains Mono).
- Transições entre 150 e 300ms, com curva ease-in-out.
- Respeita `prefers-reduced-motion`. No celular, as abas viram uma barra inferior.
