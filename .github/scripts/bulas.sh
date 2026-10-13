#!/usr/bin/env bash
# Rodada 3: AspMol e contraindicações do AspDip em outros endereços públicos.
set -u
OUT=_bulas/r3; rm -rf "$OUT"; mkdir -p "$OUT"; LOG="$OUT/log.txt"; : > "$LOG"
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'
n=0
while read -r u; do
  [ -z "$u" ] && continue; n=$((n+1)); f="$OUT/$n.bin"
  curl -sS -m 40 -A "$UA" -L --compressed "$u" -o "$f" -w "%{http_code} $n $u\n" >> "$LOG" 2>&1
  if file "$f" | grep -q PDF; then pdftotext -layout "$f" "$OUT/$n.txt"; elif [ -s "$f" ]; then lynx -dump -assume_charset=utf-8 -display_charset=utf-8 "$f" > "$OUT/$n.txt"; fi
  rm -f "$f"
done <<'URLS'
https://consultaremedios.com.br/aspmol-500mg/bula
https://consultaremedios.com.br/aspmol-750mg/bula
https://consultaremedios.com.br/aspmol/p
https://consultaremedios.com.br/busca?termo=aspmol
https://consultaremedios.com.br/aspdip/p
https://consultaremedios.com.br/aspdip-gotas/bula
https://consultaremedios.com.br/busca?termo=aspdip
https://consultaremedios.com.br/aspdip/bula/contraindicacao
https://www.bulas.med.br/busca?termo=aspmol
https://www.bulas.med.br/busca?termo=aspdip
https://www.minhavida.com.br/saude/bulas/busca?q=aspmol
https://www.drogasil.com.br/search?w=aspmol
https://www.drogaraia.com.br/search?w=aspmol
https://www.drogasil.com.br/search?w=aspdip
https://www.precopopular.com.br/busca?q=aspmol
https://www.precopopular.com.br/busca?q=aspdip
https://www.paguemenos.com.br/aspmol
https://www.drogariasaopaulo.com.br/aspmol
https://www.drogariaspacheco.com.br/aspmol
https://www.drogariaspacheco.com.br/aspdip
https://www.araujo.com.br/busca?q=aspmol
https://www.panvel.com/panvel/buscarProduto.do?termoPesquisa=aspmol
https://www.bulario.com/busca?q=aspmol
https://www.medicinanet.com.br/busca?q=aspmol
https://duckduckgo.com/html/?q=aspmol+bula+paracetamol+bayer
https://www.google.com/search?q=aspmol+bula+pdf
https://search.yahoo.com/search?p=aspmol+bula+paracetamol+bayer
https://search.yahoo.com/search?p=aspdip+bula+contraindica%C3%A7%C3%A3o
URLS
