import json
import os
import sys

def generate():
    markets_file = 'public/data/markets.json'
    sitemap_file = 'public/sitemap.xml'
    robots_file = 'public/robots.txt'

    if not os.path.exists(markets_file):
        print(f"Error: {markets_file} does not exist. Run convert_data.py first.")
        sys.exit(1)

    # 1. Load markets data
    with open(markets_file, 'r', encoding='utf-8') as f:
        markets = json.load(f)

    # 2. Build sitemap.xml
    xml = []
    xml.append('<?xml version="1.0" encoding="UTF-8"?>')
    xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    
    # Base and Static URLs
    base_urls = [
        {"loc": "https://jangnalmap.com/", "priority": "1.0", "changefreq": "daily"},
        {"loc": "https://jangnalmap.com/about", "priority": "0.7", "changefreq": "monthly"},
        {"loc": "https://jangnalmap.com/guide", "priority": "0.7", "changefreq": "monthly"},
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
        "Sitemap: https://jangnalmap.com/sitemap.xml"
    ]

    with open(robots_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(robots_content))

    print(f"robots.txt successfully generated at {robots_file}")

if __name__ == '__main__':
    generate()
