import json
import os
import sys
import urllib.request
import csv
import io

def get_markets():
    sheets_url = os.environ.get('GOOGLE_SHEETS_URL')
    if not sheets_url:
        markets_file = 'public/data/markets.json'
        if os.path.exists(markets_file):
            with open(markets_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        return []
    
    try:
        req = urllib.request.Request(
            sheets_url, 
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        with urllib.request.urlopen(req) as response:
            csv_data = response.read().decode('utf-8')
            
        f = io.StringIO(csv_data)
        reader = csv.DictReader(f)
        markets = []
        for row in reader:
            item = {}
            for k, v in row.items():
                if not k:
                    continue
                k_clean = k.strip()
                v_clean = v.strip() if v else ""
                if k_clean in ['latitude', 'longitude']:
                    try:
                        item[k_clean] = float(v_clean)
                    except ValueError:
                        item[k_clean] = 0.0
                else:
                    item[k_clean] = v_clean
            if item.get('id') and item.get('market_name'):
                markets.append(item)
        return markets
    except Exception as e:
        print(f"Error fetching Google Sheets, falling back to local JSON: {e}")
        markets_file = 'public/data/markets.json'
        if os.path.exists(markets_file):
            with open(markets_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        return []

def generate():
    sitemap_file = 'public/sitemap.xml'
    robots_file = 'public/robots.txt'

    markets = get_markets()

    # 2. Build sitemap.xml
    xml = []
    xml.append('<?xml version="1.0" encoding="UTF-8"?>')
    xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    
    # Base and Static URLs
    base_urls = [
        {"loc": "https://jangnalmap.com/", "priority": "1.0", "changefreq": "daily"},
        {"loc": "https://jangnalmap.com/about", "priority": "0.7", "changefreq": "monthly"},
        {"loc": "https://jangnalmap.com/guide", "priority": "0.7", "changefreq": "monthly"},
        {"loc": "https://jangnalmap.com/guide/onnuri", "priority": "0.8", "changefreq": "monthly"},
        {"loc": "https://jangnalmap.com/guide/parking", "priority": "0.8", "changefreq": "monthly"},
        {"loc": "https://jangnalmap.com/guide/recommend", "priority": "0.8", "changefreq": "monthly"},
        {"loc": "https://jangnalmap.com/privacy", "priority": "0.3", "changefreq": "monthly"},
        {"loc": "https://jangnalmap.com/terms", "priority": "0.3", "changefreq": "monthly"},
        {"loc": "https://jangnalmap.com/disclaimer", "priority": "0.3", "changefreq": "monthly"},
        {"loc": "https://jangnalmap.com/contact", "priority": "0.5", "changefreq": "monthly"},
        {"loc": "https://jangnalmap.com/region/gyeonggi", "priority": "0.9", "changefreq": "weekly"},
        {"loc": "https://jangnalmap.com/region/gangwon", "priority": "0.9", "changefreq": "weekly"},
        {"loc": "https://jangnalmap.com/region/chungbuk", "priority": "0.9", "changefreq": "weekly"},
        {"loc": "https://jangnalmap.com/region/chungnam", "priority": "0.9", "changefreq": "weekly"},
        {"loc": "https://jangnalmap.com/region/jeonbuk", "priority": "0.9", "changefreq": "weekly"},
        {"loc": "https://jangnalmap.com/region/jeonnam", "priority": "0.9", "changefreq": "weekly"},
        {"loc": "https://jangnalmap.com/region/gyeongbuk", "priority": "0.9", "changefreq": "weekly"},
        {"loc": "https://jangnalmap.com/region/gyeongnam", "priority": "0.9", "changefreq": "weekly"},
        {"loc": "https://jangnalmap.com/region/jeju", "priority": "0.9", "changefreq": "weekly"}
    ]

    for item in base_urls:
        xml.append('  <url>')
        xml.append(f'    <loc>{item["loc"]}</loc>')
        xml.append(f'    <changefreq>{item["changefreq"]}</changefreq>')
        xml.append(f'    <priority>{item["priority"]}</priority>')
        xml.append('  </url>')

    # Market detail URLs
    for m in markets:
        market_id = m.get("id")
        if market_id:
            xml.append('  <url>')
            xml.append(f'    <loc>https://jangnalmap.com/market/{market_id}</loc>')
            xml.append('    <changefreq>weekly</changefreq>')
            xml.append('    <priority>0.8</priority>')
            xml.append('  </url>')

    xml.append('</urlset>')

    with open(sitemap_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(xml))

    print(f"Sitemap successfully generated at {sitemap_file} with {len(markets) + len(base_urls)} links.")

    # 3. Build robots.txt
    robots_content = [
        "User-agent: *",
        "Allow: /",
        "",
        "Sitemap: https://jangnalmap.com/sitemap.xml",
        "",
        "#DaumWebMasterTool:31e1c1e9a77ec5eaba225de70a3afe1eb1ed94099e0576c16c85bb140568ac89:JbtVqj5ycYCrCKnoguOyqw=="
    ]

    with open(robots_file, 'w', encoding='utf-8', newline='\n') as f:
        f.write('\n'.join(robots_content) + '\n')

    print(f"robots.txt successfully generated at {robots_file}")

if __name__ == '__main__':
    generate()
