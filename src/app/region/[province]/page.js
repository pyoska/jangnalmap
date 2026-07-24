import Link from 'next/link';
import { isOpenToday, getDaysUntilOpening, getDDayText, getRegionGroup } from '@/utils/dateUtils';
import Footer from '@/components/Footer';
import marketsData from '../../../../public/data/markets.json';

const REGION_MAP = {
  'gyeonggi': { 
    name: '수도권 (서울/경기/인천)', 
    group: '수도권', 
    desc: '수도권 지역의 유서 깊은 오일장 가이드입니다. 성남 모란시장, 김포 북변5일장, 양평 물맑은시장 등 복잡한 도심과 교외 지역에서 시대를 이어온 전통 시장의 활기를 그대로 경험할 수 있습니다. 각 오일장마다 대중교통(지하철, 버스) 이용 팁과 무료 공영주차장 위치, 현지 여행 에디터가 수집한 7월 제철 먹거리 팁을 지도 정보와 함께 상세히 제공하여 나들이 동선을 완벽하게 설계하도록 돕습니다.' 
  },
  'gangwon': { 
    name: '강원도', 
    group: '강원', 
    desc: '청정 자연의 정취를 품은 강원도 지역의 재래시장 오일장 가이드입니다. 전국적으로 유명한 정선 아리랑시장, 삼척 장터, 횡성 오일장 등 강원 산골의 싱그러운 산나물과 건강한 약초, 제철 동해안 수산물이 쏟아지는 활기찬 장터들을 만나보세요. 7월 시원한 강원도 계곡 여행 및 동해안 해수욕장 피서 길에 부담 없이 들러 로컬 간식인 감자전과 콧등치기 국수를 즐길 수 있는 위치 일정과 상세 주차 꿀팁을 전수합니다.' 
  },
  'chungbuk': { 
    name: '충청북도', 
    group: '충북', 
    desc: '충북 내륙의 따뜻한 인심과 정겨운 사투리가 살아있는 전통 오일장 리스트입니다. 중부 지역 물류의 허브인 청주 육거리전통시장, 약초의 본고장 제천 오일장, 수려한 자연 경관을 자랑하는 단양 구경시장 등 충청북도 고유의 특산 농산물이 거래되는 장터 일정을 담았습니다. 대안 주차장 확보 팁과 온누리상품권 10% 절약 방법 등 가성비 높은 장터 나들이를 위한 팁을 수록했습니다.' 
  },
  'chungnam': { 
    name: '충청남도/대전/세종', 
    group: '충남/대전/세종', 
    desc: '충남 서해안 해산물과 금강 유역 내륙 농산물이 집결하는 충청남도, 대전광역시, 세종특별자치시 오일장 정보입니다. 오랜 역사와 백제 문화가 살아 숨 쉬는 공주 산성시장, 부여 오일장, 서해의 풍요로움을 안은 홍성 5일장 등의 상세 일정표입니다. 장날 교통 혼잡을 피해 쾌적하게 주차할 수 있는 갓길 팁과 7월 별미인 제철 먹거리를 깔끔하게 정리하여 안내합니다.' 
  },
  'jeonbuk': { 
    name: '전라북도', 
    group: '전북', 
    desc: '맛과 예술의 깊이가 남다른 전라북도 전통 오일장 지도 가이드입니다. 무주 반딧불시장, 익산 북부시장, 고창 오일장 등 비옥한 호남평야와 지리산 자락에서 재배된 풍성한 식재료가 모이는 재래시장의 개장 날짜 주기를 완벽히 구성했습니다. 전북 각지의 넉넉한 상인 인심과 풍부한 전통 먹거리 코스, 대중교통으로 가기 쉬운 철도편 연계 루트를 소상하게 제공합니다.' 
  },
  'jeonnam': { 
    name: '전라남도/광주', 
    group: '전남/광주', 
    desc: '남도의 풍부한 미식이 살아 숨 쉬는 전라남도 및 광주광역시 전통 오일장 정보입니다. 섬진강 물줄기가 흐르는 구례 5일장, 나주 목사고을시장, 해산물 천국 여수 오일장 등 비옥한 토지와 풍요로운 바다가 어우러져 만들어낸 로컬 장터들을 한눈에 살펴보세요. 장날 전용 주차장 혼잡 시 이용하기 좋은 인근 행정복지센터 및 학교 운동장 임시 주차 구역과 7월 남도 특산물 목록을 제공합니다.' 
  },
  'gyeongbuk': { 
    name: '경상북도/대구', 
    group: '경북/대구', 
    desc: '영남 문화의 중심인 경상북도 및 대구광역시 지역 오일장 일정표입니다. 역사와 전통의 고장 안동 중앙시장, 약령시로 유명한 영주 오일장, 울릉도 나리분지 산나물이 모이는 포항 오일장 등 유서 깊은 장터의 주기와 장날 위치 정보를 지도와 결합했습니다. 지역 농산물 직거래 팁과 주말 무료 주차 혜택을 꼼꼼하게 정리하여 실수 없는 오일장 구경을 설계해 드립니다.' 
  },
  'gyeongnam': { 
    name: '경상남도/부산/울산', 
    group: '경남/부산/울산', 
    desc: '남해의 푸른 바다 내음과 영남 산맥의 정취가 함께하는 경상남도, 부산광역시, 울산광역시 오일장 일정 안내입니다. 섬진강 보부상의 낭만을 품은 하동 화개장터, 창원 소답5일장, 울산 남창 옹기종기시장 등 오랜 역사적 발자취가 남은 명소들을 지도와 함께 정렬했습니다. 모바일 온누리상품권 10% 혜택 및 공영주차장 이용 팁을 수록하여 보다 알뜰한 전통시장 쇼핑을 돕습니다.' 
  },
  'jeju': { 
    name: '제주도', 
    group: '제주', 
    desc: '이국적인 풍광 속에서 제주의 삶과 맛을 날것 그대로 느낄 수 있는 제주도 오일장 가이드입니다. 제주 시내 최대 규모인 제주민속오일장, 서귀포 향토오일장, 함덕 오일장 등 한라산 고사리와 싱싱한 갈치, 7월 상큼한 하우스 귤을 만날 수 있는 제주 고유 장터들의 요일별 개장 정보를 수록했습니다. 렌터카 주차 요령과 대형 마트보다 30% 저렴한 로컬 장보기 꿀팁을 제공합니다.' 
  }
};

export async function generateStaticParams() {
  return Object.keys(REGION_MAP).map((province) => ({
    province,
  }));
}

export async function generateMetadata({ params }) {
  const { province } = await params;
  const region = REGION_MAP[province];
  if (!region) return {};

  return {
    title: `${region.name} 오일장 날짜표·일정표·주차 정보 | 오일장지도 : 장날맵`,
    description: `${region.name} 지역 오일장 개설 주기, 오늘 개장 여부, 상세 위치 및 주차 꿀팁 모음. ${region.desc.slice(0, 80)}...`,
    alternates: {
      canonical: `https://jangnalmap.com/region/${province}`,
    }
  };
}

export default async function RegionPage({ params }) {
  const { province } = await params;
  const region = REGION_MAP[province];

  if (!region) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        <p className="font-bold text-lg">존재하지 않는 지역 카테고리입니다.</p>
      </div>
    );
  }

  // Filter and decorate markets belonging to this region
  const regionMarkets = marketsData
    .filter(m => getRegionGroup(m.address) === region.group)
    .map(market => {
      const isToday = isOpenToday(market.opening_cycle);
      const daysUntil = getDaysUntilOpening(market.opening_cycle);
      return {
        ...market,
        isToday,
        daysUntil,
      };
    })
    .sort((a, b) => {
      if (a.isToday && !b.isToday) return -1;
      if (!a.isToday && b.isToday) return 1;
      const daysA = a.daysUntil === -1 ? 999 : a.daysUntil;
      const daysB = b.daysUntil === -1 ? 999 : b.daysUntil;
      return daysA - daysB;
    });

  // JSON-LD ItemList Schema for structured search listings
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${region.name} 전통 오일장 추천 리스트`,
    "description": region.desc,
    "itemListElement": regionMarkets.slice(0, 30).map((m, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://jangnalmap.com/market/${m.id}`,
      "name": `${m.market_name} 오일장`
    }))
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col antialiased">
      {/* JSON-LD Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#10B981] to-[#FF5A1F] bg-clip-text text-transparent">
            장날맵.com
          </Link>
          <Link href="/" className="text-xs text-gray-500 hover:text-[#10B981] transition-colors bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-200/60 font-semibold shadow-sm">
            &larr; 전체 지도로 가기
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Breadcrumbs */}
        <div className="text-xs text-gray-400 flex gap-2 font-medium">
          <Link href="/" className="hover:text-gray-600">홈</Link>
          <span>&gt;</span>
          <span className="text-gray-500">{region.name}</span>
        </div>

        {/* SEO Header */}
        <section className="space-y-3.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
            {region.name} 전통 오일장 추천 지도 & 개장일 일정표
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold bg-emerald-50/40 border border-emerald-100/50 p-5 rounded-2xl shadow-sm">
            {region.desc}
          </p>
        </section>

        {/* Markets Count Overview */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs sm:text-sm text-gray-500 font-bold">
          <span>등록된 오일장 목록</span>
          <span className="text-[#10B981]">총 {regionMarkets.length}개 검색됨</span>
        </div>

        {/* Markets Grid List */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {regionMarkets.map((market) => (
            <div
              key={market.id}
              className="bg-white p-5 rounded-2xl border border-gray-200/80 hover:border-[#10B981]/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-extrabold text-gray-900 text-base sm:text-lg hover:text-[#10B981] transition-colors">
                    <Link href={`/market/${market.id}`}>
                      {market.market_name}
                    </Link>
                  </h3>
                  {market.isToday ? (
                    <span className="bg-[#FF5A1F] text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-bold shadow-sm animate-pulse whitespace-nowrap">
                      🔥 오늘 개장!
                    </span>
                  ) : (
                    <span className="bg-emerald-50 border border-emerald-100 text-[#10B981] text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-bold whitespace-nowrap">
                      {getDDayText(market.daysUntil)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{market.address}</p>
                
                {/* Meta details */}
                <div className="bg-gray-50 rounded-xl p-3 text-xs space-y-1.5 border border-gray-150 shadow-sm font-semibold text-gray-700">
                  <div className="flex justify-between">
                    <span>개설 주기</span>
                    <span className="text-gray-900 font-bold">{market.opening_cycle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>주차장 보유</span>
                    <span className="text-gray-900 font-bold">{market.parking_yn === 'Y' ? 'Y (공영주차장 있음)' : 'N (주변 골목 협소)'}</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <Link
                href={`/market/${market.id}`}
                className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-extrabold py-2.5 rounded-xl text-xs sm:text-sm text-center flex items-center justify-center gap-1 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                상세 일정 및 주차 꿀팁 보기 &rarr;
              </Link>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
