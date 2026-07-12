import csv
import json
import os
import sys

def convert():
    csv_file = '전국전통시장표준데이터.csv'
    output_dir = 'public/data'
    output_file = os.path.join(output_dir, 'markets.json')

    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)

    if not os.path.exists(csv_file):
        print(f"Error: {csv_file} does not exist in the current directory.")
        sys.exit(1)

    markets = []
    
    # 5 Major Famous Markets Detailed Data Override
    special_markets = {
        "모란종합시장": {
            "market_name": "성남 모란시장 (모란5일장)",
            "opening_cycle": "4일+9일",
            "parking_tip": "모란시장 공영주차장은 장날만 되면 정말 주차 지옥이 따로 없더라고요! 인근 '성남동 대형공영주차장'이나 '중원구청 주차장'(장날 주말에는 무료 개방돼요)을 이용하시는 것이 훨씬 수월해요.",
            "transport_info": "지하철 8호선 또는 수인분당선 모란역 5번 출구로 나오시면 바로 코앞이라 도보 1분도 안 걸려요. 웬만하면 대중교통이 정답이더라고요!",
            "food_recommend": "모란시장의 소문난 가마솥 통닭과 즉석에서 짜주는 참기름은 필수 코스예요. 7월 무더위에는 장터 골목에서 먹는 얼음 둥둥 띄운 시원한 우묵가사리 콩국을 강력 추천해요!"
        },
        "정선아리랑시장": {
            "market_name": "정선 아리랑시장 (정선5일장)",
            "parking_tip": "시장 바로 옆에 있는 조양강변 하상주차장이 주차비도 무료고 공간도 아주 넓어서 초보 운전자도 주차하기 편리하더라고요. 시장까지는 도보로 5분 정도면 충분합니다.",
            "transport_info": "정선역에서 하차하신 뒤 15분 정도 슬슬 걸어가셔도 좋고, 청량리역에서 매일 출발하는 정선아리랑열차(A-Train)를 이용해 기차 여행 기분을 내며 오시는 것도 적극 권해드려요!",
            "food_recommend": "정선 아리랑시장에 오면 곤드레나물밥과 콧등치기 국수, 그리고 메밀전병은 절대 빼놓을 수 없어요. 7월에는 갓 뜯어낸 제철 산나물전과 시원하고 쫄깃한 메밀 콧등치기 국수 한 그릇이 최고예요!"
        },
        "양평물맑은시장": {
            "market_name": "양평 물맑은시장 (양평5일장)",
            "parking_tip": "양평역 공영주차장이나 시장 안의 주차타워를 이용하시면 편리해요. 만약 만차라면 장날에는 무료로 개방되는 '양평군청 주차장'에 대시는 대안이 있더라고요!",
            "transport_info": "경의중앙선 양평역 1번 출구로 나오시면 도보 2~3분 거리에 바로 시장 입구가 보여요. 전철 타고 오기 정말 좋은 시장이더라고요.",
            "food_recommend": "이 시장은 갓 구워낸 수제 핫바와 바삭한 돈까스가 맛있기로 유명해요. 7월 제철인 새콤달콤한 양평 토마토를 간식으로 사고, 점심으로 든든한 양평 개군한우 해장국 한 그릇 드셔보세요!"
        },
        "불로전통시장": {
            "market_name": "대구 불로5일장 (불로전통시장)",
            "parking_tip": "불로천 공영주차장이나 조금 더 걸어가면 나오는 불로동 고분군 주차장이 주차비도 없고 평화롭게 대기 좋더라고요. 시장 골목 안은 장날에 통제되니 절대 진입 금지예요!",
            "transport_info": "KTX 동대구역 정류장에서 팔공1번, 401번, 101-1번 버스를 타시고 '불로전통시장 앞'에서 내리시면 바로 연결되어 버스 환승 동선이 매우 깔끔하더라고요.",
            "food_recommend": "불로시장 하면 구수한 보리밥과 깊고 진한 맛의 추어탕이 대표적이에요. 7월 무더운 대구 날씨에는 시장 안에서 시원한 잔치국수에 갓 부쳐낸 노릇노릇한 부추전 한 판 곁들이면 천국이 따로 없어요!"
        }
    }

    # Custom manually added Gimpo 5-Day Market (since it's missing in the standard CSV)
    gimpo_5day = {
        "id": "gimpo_5day",
        "market_name": "김포 5일장 (북변5일장)",
        "address": "경기도 김포시 북변중로 68",
        "opening_cycle": "2일+7일",
        "latitude": 37.625345,
        "longitude": 126.715367,
        "phone": "031-980-2114",
        "parking_yn": "Y",
        "operating_hours": "09:00~18:00",
        "parking_tip": "북변공영주차장이 장날에는 장터로 쓰이기 때문에 주차가 어렵더라고요! 대신 인근 '김포시청 공영주차장'이나 '김포본동 행정복지센터 주차장'에 차를 대고 걸어오시는 것이 꿀팁입니다.",
        "transport_info": "김포골드라인 걸포북변역 1번 출구에서 나오셔서 북변중로 방향으로 도보 약 8~10분 정도 쭉 걸어오시면 장터 초입이 보여요.",
        "food_recommend": "김포 5일장 하면 기름 냄새 고소한 가마솥 통닭과 바로 구워내는 수제 핫바, 그리고 등갈비 구이가 예술이에요. 7월 더운 날에는 시원한 살얼음 식혜와 매콤한 비빔국수 조합을 강추해요!"
    }
    
    markets.append(gimpo_5day)

    auto_id = 1
    with open(csv_file, 'r', encoding='cp949', errors='ignore') as f:
        reader = csv.DictReader(f)
        for row in reader:
            raw_name = row.get('시장명', '').strip()
            if not raw_name:
                continue

            # Address mapping (Road address first, fallback to Lot address)
            address = row.get('소재지도로명주소', '').strip()
            if not address:
                address = row.get('소재지지번주소', '').strip()
            
            # Map cycle
            cycle = row.get('시장개설주기', '').strip()
            if not cycle:
                cycle = '매일'

            # Parse coordinates
            lat_str = row.get('위도', '').strip()
            lng_str = row.get('경도', '').strip()
            try:
                latitude = float(lat_str) if lat_str else 0.0
                longitude = float(lng_str) if lng_str else 0.0
            except ValueError:
                latitude = 0.0
                longitude = 0.0

            # Skip entries with no coords (or default placeholder coords)
            if latitude == 0.0 or longitude == 0.0:
                continue

            phone = row.get('전화번호', '').strip()
            parking_yn = row.get('주차장보유여부', 'N').strip()
            if parking_yn not in ['Y', 'N']:
                parking_yn = 'N'

            # Build entry
            market_data = {
                "id": str(auto_id),
                "market_name": raw_name,
                "address": address,
                "opening_cycle": cycle,
                "latitude": latitude,
                "longitude": longitude,
                "phone": phone,
                "parking_yn": parking_yn,
                "operating_hours": "09:00~18:00"
            }

            # If it's one of our special markets, apply override
            if raw_name in special_markets:
                market_data.update(special_markets[raw_name])
            else:
                # Generate dynamic blog-style contents based on regional boundaries
                # Extract first province name (e.g. 강원특별자치도, 경기도, 전라남도, 제주특별자치도)
                prov = address.split()[0] if address else ""

                if "제주" in prov:
                    market_data["parking_tip"] = (
                        "제주 지역 오일장은 시장 전용 하상주차장이나 외곽 공영주차장을 무료로 이용하기 편하더라고요! "
                        "다만 장날 메인 시간대에는 항상 만차에 가까우니, 시장 초입 골목의 임시 주차공간이나 인근 주민센터 주차장을 미리 봐두시는 것을 강력 추천해요."
                    )
                    market_data["transport_info"] = (
                        "제주 공항이나 시내 주요 정류장에서 시장으로 직접 가는 순환 버스 노선이 수시로 있더라고요. "
                        "주차 공간 찾기가 피곤하시다면 카카오맵이나 네이버 지도로 가장 빠른 연계 버스 노선을 확인하셔서 타고 가시는 편이 훨씬 수월해요!"
                    )
                    market_data["food_recommend"] = (
                        "제주 시장에 오시면 싱싱하고 달콤한 귤이나 오메기떡, 그리고 신선한 은갈치 회가 예술이더라고요! "
                        "7월 한여름에는 땀 식히기 좋은 새콤한 감귤 주스나 즉석에서 구워 바삭한 한라봉 도넛을 맛보시는 걸 강추해 드려요."
                    )
                elif any(g in prov for g in ["강원", "특별자치도"]) and "전북" not in prov and "제주" not in prov:
                    # Gangwon
                    market_data["parking_tip"] = (
                        "강원도 지역 전통 오일장은 천변 하천길 주차장이나 무료 공터 주차장 시설이 잘 구성되어 있더라고요! "
                        "장날 주말에는 인근 초등학교 운동장이나 지자체 관공서 주차장을 임시로 무료 개방해주기도 하니 내비게이션으로 미리 대안을 조회하고 가시는 걸 추천해요."
                    )
                    market_data["transport_info"] = (
                        "강원 산간 읍내 시장들은 기차역(ITX, 경의중앙선 등)이나 읍내 터미널에서 가까운 자리에 주로 열리더라고요. "
                        "대중교통 버스 간격이 길 수 있으니 기차 시간표나 터미널 시외버스 시간을 미리 확인하셔서 이동하시는 것을 적극 추천해요."
                    )
                    market_data["food_recommend"] = (
                        "강원도 재래시장에 오시면 곤드레나물밥과 감자옹심이, 그리고 메밀전병은 필수 코스더라고요! "
                        "7월 더위에는 시원하고 쫄깃한 메밀 콧등치기 국수 한 그릇에 갓 구운 감자전을 곁들이시면 여행의 피로가 싹 풀릴 거예요."
                    )
                elif any(p in prov for p in ["전라", "전북", "전남", "광주"]):
                    market_data["parking_tip"] = (
                        "전라도 지역 오일장은 주로 읍내 주민센터나 주말 공영주차장을 넓게 확보하고 있어 비교적 주차 환경이 수월하더라고요! "
                        "혹시 혼잡할 경우를 대비하여 시장에서 도보 5분 거리에 있는 읍내 하천변이나 복지센터 임시 개방 주차장에 대고 가시는 것을 권해드려요."
                    )
                    market_data["transport_info"] = (
                        "전라 권역 시장들은 지역 터미널이나 관공서 사거리 주변으로 노선버스가 수시로 정차하더라고요! "
                        "카카오맵 등으로 근처 정류장 번호를 알아두시고, 로컬 군내버스 환승 편을 조율하시면 훨씬 정겹고 여유로운 여행이 될 수 있습니다."
                    )
                    market_data["food_recommend"] = (
                        "전라도 전통시장에 가면 푹 삶아 쫄깃한 가마솥 족발과 순대국밥, 그리고 바삭한 야채 전이 참 별미더라고요! "
                        "7월 한여름 더위 속에서는 장을 둘러본 뒤 얼음 가득 넣은 진한 우무 콩물국수 한 사발 들이켜시길 강력히 추천해요."
                    )
                elif any(g in prov for g in ["경상", "경북", "경남", "대구", "부산", "울산"]):
                    market_data["parking_tip"] = (
                        "경상도 권역 재래시장은 넓은 강변 하상공원 주차장이나 시장 현대화 공영주차타워가 잘 구축되어 있더라고요! "
                        "다만 장날에는 갓길 주차 단속이 유독 심하니 귀찮으시더라도 시장 입구 공영구역에 꼭 안전하게 주차하시는 것을 잊지 마세요."
                    )
                    market_data["transport_info"] = (
                        "경상 지역 시장들은 동대구역, 부산역 등 KTX나 경전철 노선 및 읍내 순환버스가 잘 갖춰진 편이더라고요! "
                        "길찾기 지도 앱을 활용해 노선번호를 미리 조회하시고, 환승 정류장에서 도보로 가벼운 마실 가듯 찾아가시는 편을 적극 추천해요."
                    )
                    market_data["food_recommend"] = (
                        "경상도 장터 하면 노릇노릇 구워낸 부추전(정구지찌짐)과 매콤달콤한 떡볶이, 즉석 핫바가 빠질 수 없더라고요! "
                        "특히 7월 무더운 대프리카/여름 날씨에는 시장 목간에서 마시는 꽁꽁 언 얼음 식혜나 물사발 한 그릇이 기가 막힙니다."
                    )
                elif any(c in prov for c in ["충청", "충북", "충남", "대전", "세종"]):
                    market_data["parking_tip"] = (
                        "충청도 지역 오일장은 주로 읍내 로터리나 중심 상가 지대에 걸쳐서 길게 노점이 들어서 주차가 치열하더라고요! "
                        "차를 안전하게 대시려면 시장 골목을 피해서 인근 군청, 교육청 주차장이나 한적한 읍내 초등학교 운동장 대안 주차장을 확보해 이용하시는 것이 좋습니다."
                    )
                    market_data["transport_info"] = (
                        "충청 지역 재래시장은 읍내 순환버스나 시외버스 터미널에서 도보로 10분 내로 닿는 사거리에 위치해 교통 환승이 쉽더라고요! "
                        "지역 간 철도 편(무궁화호 등)과 시외버스를 활용하시면 차 밀리는 고통 없이 깔끔하게 장터에 닿으실 수 있습니다."
                    )
                    market_data["food_recommend"] = (
                        "충청도 오일장에 가시면 든든한 올갱이국밥이나 구수한 가마솥 보리밥, 즉석에서 짜주는 어묵 바가 일품이더라고요! "
                        "7월 여름철에는 고소하고 시원한 얼음 미숫가루 한 사발과 찰기가 넘치는 찐 옥수수 한 봉지 꼭 챙겨서 드셔보세요."
                    )
                else:
                    # Seoul, Gyeonggi, Incheon & Fallbacks
                    market_data["parking_tip"] = (
                        "수도권 경기 지역 시장은 유료 공영주차타워나 주민센터 주차장이 대다수 갖춰져 있지만, 주말 장날에는 대기 줄이 엄청 길더라고요! "
                        "마음 편하게 근처 전철역 환승 공영주차장에 대시거나 '모두의주차장' 앱을 사용해 인근 민간 빌딩 당일권을 예매해 오시는 것이 정신건강에 유익해요."
                    )
                    market_data["transport_info"] = (
                        "수도권 지역 시장은 경의중앙선, 수인분당선 등 전철역 출구와 도보 5분 거리 내외로 연계되어 접근성이 환상적이더라고요! "
                        "교통체증 지옥을 피하기 위해 웬만하면 승용차 대신 전철 편과 노선버스를 환승해 찾아오시기를 적극 권유해 드려요."
                    )
                    market_data["food_recommend"] = (
                        "경기 수도권 장터에 오시면 즉석에서 튀겨 아주 바삭한 야채 튀김과 쫄깃한 떡볶이, 그리고 가마솥 통닭이 최고더라고요! "
                        "7월의 무더위 속에서는 장구경을 즐긴 후 얼음 띄운 살얼음 단술(식혜) 한 컵이나 시원한 냉콩국수 한 그릇 드시고 가시길 강추해요."
                    )

            markets.append(market_data)
            auto_id += 1

    # Write out as JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(markets, f, ensure_ascii=False, indent=2)

    print(f"Successfully converted {len(markets)} markets and saved to {output_file}")

if __name__ == '__main__':
    convert()
