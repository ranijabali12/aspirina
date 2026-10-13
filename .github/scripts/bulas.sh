#!/usr/bin/env bash
# Rodada 4: páginas de produto (VTEX) do AspMol e AspDip, que trazem o texto da bula.
set -u
OUT=_bulas/r4; rm -rf "$OUT"; mkdir -p "$OUT"; LOG="$OUT/log.txt"; : > "$LOG"
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'
n=0
while read -r u; do
  [ -z "$u" ] && continue; n=$((n+1))
  curl -sS -m 40 -A "$UA" -L --compressed "$u" -o "$OUT/$n.out" -w "%{http_code} $n $u\n" >> "$LOG" 2>&1
done <<'URLS'
https://www.drogariaspacheco.com.br/api/catalog_system/pub/products/search/aspmol
https://www.drogariaspacheco.com.br/api/catalog_system/pub/products/search/aspdip
https://www.drogariasaopaulo.com.br/api/catalog_system/pub/products/search/aspmol
https://www.drogariasaopaulo.com.br/api/catalog_system/pub/products/search/aspdip
https://www.paguemenos.com.br/api/catalog_system/pub/products/search/aspmol
https://www.paguemenos.com.br/api/catalog_system/pub/products/search/aspdip
https://www.drogariaspacheco.com.br/aspmol-750mg-20-comprimidos/p
https://www.drogariaspacheco.com.br/aspdip/500mg-caixa-com-30-comprimidos/p
https://consultaremedios.com.br/aspdip/p
URLS
