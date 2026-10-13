#!/usr/bin/env bash
# Rodada 2: Anvisa bloqueia IP fora do Brasil; busca a bula em espelhos públicos.
set -u
OUT=_bulas; rm -rf "$OUT"; mkdir -p "$OUT"; LOG="$OUT/log.txt"; : > "$LOG"
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'
get() { # url arquivo
  curl -sS -m 40 -A "$UA" -L --compressed "$1" -o "$2" -w "%{http_code} $1\n" >> "$LOG" 2>&1
  if file "$2" | grep -q PDF; then pdftotext -layout "$2" "${2%.*}.txt" 2>>"$LOG"
  elif [ -s "$2" ]; then lynx -dump -nolist -assume_charset=utf-8 -display_charset=utf-8 "$2" > "${2%.*}.txt" 2>>"$LOG"; fi
}
declare -A Q=( [aspdip]="AspDip dipirona Bayer bula" [aspmol]="AspMol paracetamol Bayer bula" [aspirina]="Aspirina 500 mg Bayer bula paciente" [aspirinac]="Aspirina C efervescente Bayer bula" [cafi]="CafiAspirina Bayer bula" )
declare -A D=( [aspdip]="aspdip" [aspmol]="aspmol" [aspirina]="aspirina" [aspirinac]="aspirina-c" [cafi]="cafiaspirina" )
for k in "${!Q[@]}"; do
  mkdir -p "$OUT/$k"
  get "https://consultaremedios.com.br/${D[$k]}/bula" "$OUT/$k/cr.html"
  get "https://www.aspirina.com.br/produtos" "$OUT/$k/site.html"
  q=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote_plus(sys.argv[1]))" "${Q[$k]}")
  curl -sS -m 30 -A "$UA" "https://html.duckduckgo.com/html/?q=$q" -o "$OUT/$k/ddg.html" -w "%{http_code} ddg $k\n" >> "$LOG" 2>&1
  curl -sS -m 30 -A "$UA" "https://www.bing.com/search?q=$q" -o "$OUT/$k/bing.html" -w "%{http_code} bing $k\n" >> "$LOG" 2>&1
  python3 - "$OUT/$k" > "$OUT/$k/links.txt" <<'PY'
import re,sys,urllib.parse,html
d=sys.argv[1]; seen=[]
for f in ('ddg.html','bing.html'):
  try: t=open(f'{d}/{f}',errors='ignore').read()
  except: continue
  for u in re.findall(r'href="([^"]+)"',t):
    u=html.unescape(u)
    m=re.search(r'uddg=([^&]+)',u)
    if m: u=urllib.parse.unquote(m.group(1))
    if not u.startswith('http') or any(x in u for x in ('duckduckgo','bing.com','microsoft','go.microsoft','youtube','facebook','instagram','anvisa.gov.br')): continue
    if u not in seen: seen.append(u)
for u in seen[:10]: print(u)
PY
  n=0; while read -r u; do n=$((n+1)); get "$u" "$OUT/$k/r$n.bin"; done < "$OUT/$k/links.txt"
done
find "$OUT" -name '*.txt' -size +3k | sort >> "$LOG"
