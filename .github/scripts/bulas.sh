#!/usr/bin/env bash
# Baixa as bulas do paciente no Bulário Eletrônico da Anvisa (e espelhos de reserva)
set -u
OUT=_bulas; mkdir -p "$OUT"; LOG="$OUT/log.txt"; : > "$LOG"
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'
API=https://consultas.anvisa.gov.br/api/consulta
for nome in ASPDIP ASPMOL ASPIRINA "ASPIRINA C" CAFIASPIRINA; do
  slug=$(echo "$nome" | tr 'A-Z ' 'a-z-')
  q=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$nome")
  curl -sS -m 60 -A "$UA" -H 'Authorization: Guest' -H 'Accept: application/json' \
    "$API/bulario?count=50&filter%5BnomeProduto%5D=$q&page=1" -o "$OUT/$slug.json" -w "$nome busca %{http_code}\n" >> "$LOG" 2>&1
  python3 - "$OUT/$slug.json" "$nome" > "$OUT/$slug.ids" 2>>"$LOG" <<'PY'
import json,sys
try: d=json.load(open(sys.argv[1]))
except Exception as e: print('#erro',e); sys.exit()
for c in d.get('content',[]):
  print(c.get('nomeProduto'),'|',c.get('razaoSocial'),'|',c.get('idBulaPacienteProtegido'),'|',c.get('numeroRegistro'),file=sys.stderr)
  if 'BAYER' in (c.get('razaoSocial') or '').upper() and c.get('nomeProduto','').upper()==sys.argv[2]:
    print(c.get('idBulaPacienteProtegido'))
PY
  n=0
  for id in $(grep -v '^#' "$OUT/$slug.ids"); do
    n=$((n+1))
    curl -sS -m 90 -A "$UA" -L "$API/medicamentos/arquivo/bula/parecer/$id/?Authorization=Guest" -o "$OUT/$slug-$n.pdf" -w "$nome pdf $n %{http_code}\n" >> "$LOG" 2>&1
    pdftotext -layout "$OUT/$slug-$n.pdf" "$OUT/$slug-$n.txt" 2>>"$LOG" || true
  done
done
# reserva: bulário da Bayer
for p in aspdip-comp aspdip-gotas aspmol aspirina aspirina-c cafiaspirina; do
  curl -sS -m 60 -A "$UA" -L "https://bulario.bayer.com.br/bulas/$p" -o "$OUT/bayer-$p.html" -w "bayer $p %{http_code}\n" >> "$LOG" 2>&1
done
ls -la "$OUT" >> "$LOG"
