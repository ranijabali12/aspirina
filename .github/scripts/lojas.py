"""Descobre links diretos de produtos Bayer (Asp*, Aspirina, Flanax) nas farmácias."""
import json, re, urllib.request, urllib.parse, html, os, time
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36', 'Accept': 'application/json, text/html;q=0.9, */*;q=0.8', 'Accept-Language': 'pt-BR,pt;q=0.9'}
def get(u, t=30):
    try:
        r = urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=t)
        return r.status, r.read().decode('utf-8', 'ignore')
    except urllib.error.HTTPError as e: return e.code, ''
    except Exception as e: return 0, str(e)[:120]
TERMS = ['aspdip', 'aspmol', 'aspirina', 'cafiaspirina', 'flanax']
VTEX = ['www.drogariaspacheco.com.br', 'www.drogariasaopaulo.com.br', 'www.paguemenos.com.br', 'www.onofre.com.br', 'www.drogariavenancio.com.br', 'www.farmadelivery.com.br', 'www.araujo.com.br', 'www.panvel.com', 'www.drogasil.com.br', 'www.drogaraia.com.br']
out = {'vtex': {}, 'bing': {}, 'log': []}
for d in VTEX:
    for t in TERMS:
        u = f'https://{d}/api/catalog_system/pub/products/search/?ft={t}&_from=0&_to=49'
        s, b = get(u); out['log'].append(f'{s} {u}')
        try: arr = json.loads(b)
        except Exception: continue
        for p in arr:
            it = (p.get('items') or [{}])[0]; sel = (it.get('sellers') or [{}])[0].get('commertialOffer', {})
            out['vtex'].setdefault(d, []).append({'term': t, 'name': p.get('productName'), 'brand': p.get('brand'), 'link': p.get('link'), 'qty': sel.get('AvailableQuantity'), 'price': sel.get('Price')})
SITES = ['drogasil.com.br', 'drogaraia.com.br', 'araujo.com.br', 'panvel.com', 'onofre.com.br', 'farmadelivery.com.br', 'drogariavenancio.com.br', 'paguemenos.com.br', 'drogariasaopaulo.com.br', 'drogariaspacheco.com.br']
for site in SITES:
    for t in TERMS:
        q = urllib.parse.quote_plus(f'site:{site} {t}')
        for eng, u in (('bing', f'https://www.bing.com/search?format=rss&q={q}&count=30'), ('ddg', f'https://html.duckduckgo.com/html/?q={q}')):
            s, b = get(u); out['log'].append(f'{s} {eng} {site} {t}')
            links = set(re.findall(r'<link>(https?://[^<]+)</link>', b)) | {urllib.parse.unquote(m) for m in re.findall(r'uddg=([^&"]+)', b)}
            links = {html.unescape(l) for l in links if site in l}
            if links: out['bing'].setdefault(site, {}).setdefault(t, sorted(links | set(out['bing'].get(site, {}).get(t, []))))
            time.sleep(1)
# confere os links achados por busca (status e título)
chk = {}
for site, tt in out['bing'].items():
    for t, ls in tt.items():
        for l in ls[:15]:
            s, b = get(l, 25); m = re.search(r'<title[^>]*>(.*?)</title>', b, re.S)
            chk[l] = [s, html.unescape(m.group(1)).strip()[:140] if m else '']
out['check'] = chk
os.makedirs('_lojas', exist_ok=True)
json.dump(out, open('_lojas/result.json', 'w'), ensure_ascii=False, indent=1)
