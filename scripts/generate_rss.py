import json
import os
import sys
import datetime
import urllib.request
import csv
import io
from xml.sax.saxutils import escape

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
    rss_file = 'public/rss.xml'
    markets = get_markets()

    def format_rfc822(dt):
        days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        day_name = days[dt.weekday()]
        month_name = months[dt.month - 1]
        return f"{day_name}, {dt.day:02d} {month_name} {dt.year} {dt.hour:02d}:{dt.minute:02d}:{dt.second:02d} +0900"

    pub_date = format_rfc822(datetime.datetime(2026, 7, 24, 9, 0))
    
    xml = []
    xml.append('<?xml version="1.0" encoding="UTF-8"?>')
    xml.append('<rss version="2.0">')
    xml.append('  <channel>')
    xml.append('    <title>장날맵 - 대한민국 전국 오일장 지도</title>')
    xml.append('    <link>https://jangnalmap.com/</link>')
    xml.append('    <description>대한민국 전국 1,300여 개 전통 오일장(5일장)의 날짜 주기, 오늘 개장 여부, 위치 지도, 주차 정보 및 여행 블로거가 추천하는 먹거리 정보를 확인하세요.</description>')
    xml.append(f'    <pubDate>{pub_date}</pubDate>')
    xml.append('    <lastBuildDate>{0}</lastBuildDate>'.format(format_rfc822(datetime.datetime.now())))

    for m in markets:
        market_id = m.get("id")
        market_name = m.get("market_name", "")
        address = m.get("address", "")
        opening_cycle = m.get("opening_cycle", "")
        parking_yn = m.get("parking_yn", "N")
        parking_tip = m.get("parking_tip", "")
        transport_info = m.get("transport_info", "")
        food_recommend = m.get("food_recommend", "")

        if not market_id:
            continue

        title = f"{market_name} ({opening_cycle}) 오일장 날짜표·일정표·주차 정보"
        link = f"https://jangnalmap.com/market/{market_id}"
        
        description_html = (
            f"<p>대한민국 1등 오일장지도 - 장날맵에서 제공하는 {market_name}의 상세 개장 정보 및 이용 안내 가이드입니다.</p>"
            f"<ul>"
            f"  <li><strong>시장 주소:</strong> {address}</li>"
            f"  <li><strong>개설 주기:</strong> {opening_cycle}</li>"
            f"  <li><strong>주차 여부:</strong> {parking_yn}</li>"
            f"  <li><strong>주차 이용 팁:</strong> {parking_tip}</li>"
            f"  <li><strong>대중교통 이동 방법:</strong> {transport_info}</li>"
            f"  <li><strong>현지 추천 먹거리:</strong> {food_recommend}</li>"
            f"</ul>"
        )

        xml.append('    <item>')
        xml.append(f'      <title>{escape(title)}</title>')
        xml.append(f'      <link>{link}</link>')
        xml.append(f'      <guid isPermaLink="true">{link}</guid>')
        xml.append(f'      <pubDate>{pub_date}</pubDate>')
        xml.append(f'      <description><![CDATA[{description_html}]]></description>')
        xml.append('    </item>')

    xml.append('  </channel>')
    xml.append('</rss>')

    with open(rss_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(xml))

    print(f"RSS Feed successfully generated at {rss_file} with {len(markets)} items.")

if __name__ == '__main__':
    generate()
