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

    print(f"Submitting {len(urls)} URLs to IndexNow API for instant crawling (Bing, Naver, Daum)...")

    # Process in batches of 10,000
    batch_size = 10000
    for i in range(0, len(urls), batch_size):
        batch = urls[i:i + batch_size]
        
        payload = {
            "host": "jangnalmap.com",
            "key": "jangnalmap2026indexnowkey",
            "keyLocation": "https://jangnalmap.com/jangnalmap2026indexnowkey.txt",
            "urlList": batch
        }
        
        req = urllib.request.Request(
            'https://api.indexnow.org/indexnow',
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json; charset=utf-8'}
        )
        
        try:
            with urllib.request.urlopen(req) as response:
                status = response.getcode()
                if status in [200, 202]:
                    print(f"[PASS] Successfully submitted {len(batch)} URLs to IndexNow (HTTP {status})!")
                else:
                    print(f"[WARN] IndexNow response status: HTTP {status}")
        except urllib.error.URLError as e:
            if hasattr(e, 'code'):
                print(f"[WARN] IndexNow HTTP {e.code} response (Key/Host pending verification or queued)")
            else:
                print(f"[WARN] IndexNow submission notice: {e.reason}")

if __name__ == "__main__":
    submit_indexnow()
