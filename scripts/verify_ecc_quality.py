import os
import json
import sys

def verify_ecc():
    print("==========================================")
    print("🛡️ ECC AgentShield Quality & Integrity Inspector")
    print("==========================================")
    
    errors = []

    # 1. Verify robots.txt
    robots_path = os.path.join('public', 'robots.txt')
    if not os.path.exists(robots_path):
        errors.append("❌ public/robots.txt missing")
    else:
        with open(robots_path, 'r', encoding='utf-8') as f:
            content = f.read()
            for bot in ['Yeti', 'Googlebot', 'bingbot', 'Daumoa', 'GPTBot', 'PerplexityBot', 'ClaudeBot']:
                if f"User-agent: {bot}" not in content:
                    errors.append(f"❌ User-agent directive missing for {bot} in robots.txt")
            if "Sitemap: https://jangnalmap.com/sitemap.xml" not in content:
                errors.append("❌ Sitemap directive missing in robots.txt")
    
    # 2. Verify sitemap.xml
    sitemap_path = os.path.join('public', 'sitemap.xml')
    if not os.path.exists(sitemap_path):
        errors.append("❌ public/sitemap.xml missing")
    else:
        with open(sitemap_path, 'r', encoding='utf-8') as f:
            c = f.read()
            count = c.count('<url>')
            print(f"✅ sitemap.xml verified with {count} URLs")
            if count < 1300:
                errors.append(f"⚠️ sitemap.xml has low URL count: {count}")

    # 3. Verify llms.txt and llms-full.txt
    if not os.path.exists(os.path.join('public', 'llms.txt')):
        errors.append("❌ public/llms.txt missing")
    if not os.path.exists(os.path.join('public', 'llms-full.txt')):
        errors.append("❌ public/llms-full.txt missing")

    # 4. Verify markets.json local data fallback
    markets_json = os.path.join('public', 'data', 'markets.json')
    if not os.path.exists(markets_json):
        errors.append("❌ public/data/markets.json missing")
    else:
        with open(markets_json, 'r', encoding='utf-8') as f:
            markets = json.load(f)
            print(f"✅ markets.json verified with {len(markets)} entries")

    if errors:
        print("\n❌ ECC Inspector found issues:")
        for err in errors:
            print(" - " + err)
        sys.exit(1)
    else:
        print("\n🟢 ALL ECC AGENTSHIELD QUALITY & INTEGRITY CHECKS PASSED (100/100)!")
        sys.exit(0)

if __name__ == '__main__':
    verify_ecc()
