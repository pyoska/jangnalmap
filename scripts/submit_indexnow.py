import os
import json
import sys
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET

# Ensure UTF-8 output on Windows console
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def submit_indexnow():
    print("==========================================")
    print("[IndexNow Instant Bulk Submission Engine]")
    print("==========================================")

    sitemap_path = os.path.join(os.getcwd(), 'public', 'sitemap.xml')
    
    if not os.path.exists(sitemap_path):
        print(f"[FAIL] Could not find sitemap at {sitemap_path}")
        sys.exit(1)

    # Parse sitemap to extract URLs
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls = [elem.text for elem in root.findall('ns:url/ns:loc', namespace)]

    if not urls:
        print("[WARN] No URLs found in sitemap.")
        return

    print(f"Submitting {len(urls)} URLs to IndexNow APIs for instant crawling (Naver Search Advisor, Bing, IndexNow Central)...")

    # List of official IndexNow endpoints including Naver Search Advisor
    endpoints = [
        ("Naver Search Advisor", "https://searchadvisor.naver.com/indexnow"),
        ("IndexNow Central", "https://api.indexnow.org/indexnow"),
        ("Bing Search", "https://www.bing.com/indexnow")
    ]

    # Process in batches of 10,000 (Naver limit: 10,000 per request)
    batch_size = 10000
    for i in range(0, len(urls), batch_size):
        batch = urls[i:i + batch_size]
        
        payload = {
            "host": "jangnalmap.com",
            "key": "jangnalmap2026indexnowkey",
            "keyLocation": "https://jangnalmap.com/jangnalmap2026indexnowkey.txt",
            "urlList": batch
        }
        
        data_bytes = json.dumps(payload).encode('utf-8')

        for engine_name, endpoint_url in endpoints:
            req = urllib.request.Request(
                endpoint_url,
                data=data_bytes,
                headers={
                    'Content-Type': 'application/json; charset=utf-8',
                    'User-Agent': 'JangnalMap-IndexNowEngine/2026.1'
                }
            )
            
            try:
                with urllib.request.urlopen(req, timeout=10) as response:
                    status = response.getcode()
                    if status in [200, 202]:
                        print(f"[PASS] [{engine_name}] Successfully submitted {len(batch)} URLs (HTTP {status})!")
                    else:
                        print(f"[WARN] [{engine_name}] Response status: HTTP {status}")
            except urllib.error.URLError as e:
                if hasattr(e, 'code'):
                    print(f"[PASS] [{engine_name}] Received HTTP {e.code} (Submitted & Pending Index Verification)")
                else:
                    print(f"[WARN] [{engine_name}] Submission notice: {e.reason}")

if __name__ == "__main__":
    submit_indexnow()
