import urllib.request
import urllib.error
import sys

# Ensure UTF-8 output on Windows console
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def verify_rendering():
    print("==========================================")
    print("[Proactive Live & Dynamic Route Crawler]")
    print("==========================================")

    test_urls = [
        "https://jangnalmap.com/",
        "https://jangnalmap.com/market/1",
        "https://jangnalmap.com/market/6",
        "https://jangnalmap.com/market/856",
        "https://jangnalmap.com/region/gyeonggi",
        "https://jangnalmap.com/guide/onnuri"
    ]

    errors = []

    for url in test_urls:
        print(f"Crawling and verifying {url}...")
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        try:
            with urllib.request.urlopen(req) as res:
                html = res.read().decode('utf-8')
                
                # Check 1: Fallback error screen text
                if "오일장 정보를 준비 중입니다" in html and "/market/" in url:
                    errors.append(f"[FAIL] {url} rendered fallback error screen ('오일장 정보를 준비 중입니다')!")

                # Check 2: JS ReferenceError leak
                if "is not defined" in html:
                    errors.append(f"[FAIL] {url} contains unhandled ReferenceError!")

                # Check 3: Table cell wrapping bug check
                if "w-1/3" in html and "📍 주소" in html:
                    errors.append(f"[FAIL] {url} contains un-fixed w-1/3 table column!")

                print(f"[PASS] {url} rendered cleanly without error fallback screens!")

        except urllib.error.URLError as e:
            errors.append(f"[FAIL] {url} failed with HTTP error: {e}")

    if errors:
        print("\n[FAIL] Proactive Crawler found rendering issues:")
        for err in errors:
            print(" - " + err)
        sys.exit(1)
    else:
        print("\n[PASS] ALL LIVE & DYNAMIC ROUTES RENDERED CLEANLY (100/100)!")
        sys.exit(0)

if __name__ == "__main__":
    verify_rendering()
