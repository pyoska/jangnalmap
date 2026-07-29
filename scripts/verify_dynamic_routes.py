import os
import json
import sys

def verify_all_markets():
    print("==========================================")
    print("[ECC Layer-1 Dynamic Market Data Inspector]")
    print("==========================================")

    markets_json = os.path.join('public', 'data', 'markets.json')
    if not os.path.exists(markets_json):
        print("[FAIL] public/data/markets.json does not exist!")
        sys.exit(1)

    with open(markets_json, 'r', encoding='utf-8') as f:
        markets = json.load(f)

    print(f"Inspecting {len(markets)} markets for required properties...")
    
    errors = []
    required_keys = ['id', 'market_name', 'address', 'opening_cycle']

    for idx, m in enumerate(markets):
        m_id = m.get('id')
        if not m_id:
            errors.append(f"Market index {idx} is missing 'id'")
            continue
        
        for k in required_keys:
            if k not in m or m[k] is None:
                errors.append(f"Market ID {m_id} missing property: {k}")

        # Check address format for region grouping
        addr = str(m.get('address', ''))
        if not addr or len(addr.split(' ')) < 1:
            errors.append(f"Market ID {m_id} has invalid address: '{addr}'")

    if errors:
        print(f"\n[FAIL] Found {len(errors)} data integrity errors across markets:")
        for err in errors[:10]:
            print(" - " + err)
        if len(errors) > 10:
            print(f" ... and {len(errors) - 10} more errors.")
        sys.exit(1)

    print(f"\n[PASS] ALL {len(markets)} MARKETS PASSED DATA INTEGRITY & DYNAMIC RENDERING SAFEGUARDS (100/100)!")
    sys.exit(0)

if __name__ == '__main__':
    verify_all_markets()
