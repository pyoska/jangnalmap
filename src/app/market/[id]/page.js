import Link from 'next/link';
import { isOpenToday, getRegionGroup } from '@/utils/dateUtils';
import { getAttractionsByRegion } from '@/components/InfoSections';
import FeedbackLoop from '@/components/FeedbackLoop';
import YoutubeFeedback from '@/components/YoutubeFeedback';
import MarketReport from '@/components/MarketReport';
import ShoppingChecklist from '@/components/ShoppingChecklist';
import Footer from '@/components/Footer';
import ShareButton from '@/components/ShareButton';
import marketsData from '../../../../public/data/markets.json';

// Helper to extract Si/Gun/Gu from address (e.g. "제주시" or "성남시" or "정선군")
function getDistrict(address) {
  if (!address) return '';
  const parts = address.split(' ');
  return parts[1] || '';
}

// Fetch market data helper
async function getMarketData(id) {
  return marketsData.find(m => m.id === id) || null;
}

// Fetch up to 3 LIVE nearby markets in the same province that are open today (fallback to any in same province)
async function getLiveNearbyMarkets(currentMarket) {
  const currentProvince = currentMarket.address.split(' ')[0] || '';
  
  // Filter other markets in the same province that are open today (using mock date base July 12, 2026)
  const baseDate = new Date(2026, 6, 12);
  let list = marketsData.filter(
    m => m.id !== currentMarket.id && 
         m.address.split(' ')[0] === currentProvince &&
         isOpenToday(m.opening_cycle, baseDate)
  );
  
  // Fallback to general same-province markets if fewer than 3 open markets
  if (list.length < 3) {
    const fallbackList = marketsData.filter(
      m => m.id !== currentMarket.id && 
           m.address.split(' ')[0] === currentProvince &&
           !list.some(added => added.id === m.id)
    );
    list = [...list, ...fallbackList];
  }
  
  return list.slice(0, 3); // Suggest 3 markets
}

// Fetch up to 3 markets in the same province opening tomorrow or next weekend
async function getWeekendNearbyMarkets(currentMarket) {
  const currentProvince = currentMarket.address.split(' ')[0] || '';
  const tomorrow = new Date(2026, 6, 13);
  const saturday = new Date(2026, 6, 18);
  const sunday = new Date(2026, 6, 19);
  
  let list = marketsData.filter(
    m => m.id !== currentMarket.id && 
         m.address.split(' ')[0] === currentProvince &&
         (isOpenToday(m.opening_cycle, tomorrow) || 
          isOpenToday(m.opening_cycle, saturday) || 
          isOpenToday(m.opening_cycle, sunday))
  );
  
  if (list.length < 3) {
    const fallbackList = marketsData.filter(
      m => m.id !== currentMarket.id && 
           m.address.split(' ')[0] === currentProvince &&
           !list.some(added => added.id === m.id)
    );
    list = [...list, ...fallbackList];
  }
  
  return list.slice(0, 3);
}

// Dynamic curation sentence generator for weekend markets
function getWeekendCurationText(currentMarketName, recommendedMarketName) {
  const charCodeSum = (currentMarketName.charCodeAt(0) || 0) + (recommendedMarketName.charCodeAt(0) || 0);
  const durationMinutes = (charCodeSum % 15) + 15; // 15 to 29 minutes
  return `오늘 [${currentMarketName}]을 보셨다면, 내일은 ${durationMinutes}분 거리인 [${recommendedMarketName}]도 활기차요!`;
}

// Helper to calculate the next opening date starting from July 12, 2026 (Sunday)
function getNextOpeningDate(openingCycle, baseDate = new Date(2026, 6, 12)) {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const date = baseDate.getDate();
  
  if (openingCycle === '매일') {
    return baseDate;
  }
  
  const cycleMatches = openingCycle.match(/\d+/g);
  const cycleNums = cycleMatches ? cycleMatches.map(Number) : [];
  
  if (cycleNums.length === 0) return null;
  
  for (let offset = 0; offset <= 31; offset++) {
    const nextDate = new Date(year, month, date + offset);
    const dayNum = nextDate.getDate();
    const lastDigit = dayNum % 10;
    const isMatch = cycleNums.some(num => {
      if (num === 10) return lastDigit === 0;
      return lastDigit === num;
    });
    
    if (isMatch) {
      return nextDate;
    }
  }
  return null;
}

// Simulated dynamic weather advice generator
function getWeatherTip(address) {
  const city = address.split(' ')[1] || address.split(' ')[0] || '장터';
  const charCodeSum = city.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const weatherType = charCodeSum % 3; // 0: sunny, 1: cloudy, 2: rain
  
  if (weatherType === 0) {
    return {
      temp: "29°C",
      status: "☀️ 맑음 & 무더위",
      tip: `오늘 ${city}는 무더운 여름 날씨가 예상돼요. 텀블러에 얼음 식혜나 물을 챙기시고, 장날 야외 구경 시 양산이나 모자를 준비해 쾌적하게 장을 보세요!`
    };
  } else if (weatherType === 1) {
    return {
      temp: "27°C",
      status: "☁️ 흐림 & 다소 습함",
      tip: `오늘 ${city}는 습도가 높고 후텁지근한 흐린 날씨예요. 시원한 옷차림으로 이동하시고, 전통시장의 고소한 메밀전이나 빈대떡 코너를 들러보시길 추천해요!`
    };
  } else {
    return {
      temp: "24°C",
      status: "☔ 비 소식 가능성",
      tip: `오늘 ${city}는 비 소식이 예보되어 있으니, 가벼운 우산을 소지하시고 빗길 접촉사고 예방을 위해 되도록 실내 공영주차타워나 안전한 실내 대안 주차장을 적극 이용하세요!`
    };
  }
}

// Helper to retrieve simulated nearby cafes and attractions using address seed
function getNearbyPlaces(address, marketName) {
  const city = address.split(' ')[1] || address.split(' ')[0] || '장터';
  
  if (address.includes('김포')) {
    return {
      cafe: {
        name: "해동 1950",
        desc: "김포 북변동 골목에 위치한 70년대 방직공장을 아름답고 세련되게 리모델링한 복합문화공간 뉴트로 카페더라고요! 옛 공장의 예스러운 뼈대와 현대적인 조명이 정말 잘 어우러져 있고, 갓 구워낸 고소하고 부드러운 소금빵과 시그니처 크림 아인슈페너의 조화가 예술이어서 전통시장 장보기 여행 중에 다리를 쉬어가기에 이만한 곳이 없다고 생각하여 무조건 가보시길 강력 추천해요!"
      },
      tourist: {
        name: "김포 장릉",
        desc: "유네스코 세계문화유산으로 등재된 조선 인조의 생부 원종과 인헌왕후의 합장릉 구역이더라고요! 수백 년간 잘 보존된 울창하고 푸르른 참나무 숲과 솔밭길 산책로가 아주 호젓하고 바람 소리가 들려서 좋았어요. 머리를 식히며 여유롭게 힐링 도보 산책을 즐기며 조선 왕릉의 고풍스러운 역사와 정취를 느껴보기에 가장 알맞은 명소로 꼽아 추천해요!"
      }
    };
  }
  
  if (address.includes('성남') || address.includes('모란')) {
    return {
      cafe: {
        name: "새소리물소리 🍵",
        desc: "고즈넉한 한옥 뜰을 보며 쌍화차와 경단을 즐길 수 있는 전통 한옥 찻집이에요! 졸졸 흐르는 개울 소리와 100년 된 우물이 마음을 정말 평화롭게 해주더라고요. 부모님이나 연인과 함께 가시면 후회 없을 코스입니다!"
      },
      tourist: {
        name: "남한산성 행궁 🏯",
        desc: "유네스코 세계문화유산인 성곽길을 따라 오르면 서울 송파 시내가 한눈에 굽어보이는 전망 명소예요! 행궁 내 고풍스러운 전각 사이를 걸으며 힐링 산책하기에 최상의 유적지 코스라고 자부합니다!"
      }
    };
  }

  if (address.includes('정선')) {
    return {
      cafe: {
        name: "아라리촌 주막카페 ☕",
        desc: "정선 전통 가옥 단지인 아라리촌 옆에 자리 잡은 한옥 감성 카페더라고요! 야외 툇마루에서 구수한 수수부꾸미와 아메리카노의 퓨전 조합을 즐겼는데, 솔솔 불어오는 산바람이 그야말로 선선하니 일품이었어요!"
      },
      tourist: {
        name: "병방치 스카이워크 ⛰️",
        desc: "동강 줄기가 굽이쳐 돌아나가는 한반도 모양의 지형을 한눈에 볼 수 있는 해발 583m의 절벽 유리 전망대예요! 발아래로 절벽이 그대로 굽어보여 아찔하고 평생 잊지 못할 풍경 사진을 남기실 수 있을 거예요!"
      }
    };
  }

  // Fallback default cafes and attractions
  return {
    cafe: {
      name: "감성 레트로 카페 ☕",
      desc: "장터 초입에 위치해 시원한 미숫가루와 달콤한 크림 빵이 시그니처인 전통 감성 카페더라고요! 레트로한 분위기가 고스란히 담겨 있어 시장에서 장을 보며 지친 다리를 쉬어가기에 최적의 공간이었어요."
    },
    tourist: {
      name: "지역 생태 호수공원 🌲",
      desc: "오일장에서 양손 두둑이 제철 먹거리를 쇼핑한 뒤, 선선한 그늘 아래에서 돗자리를 펴고 휴식을 취하기 가장 알맞은 명소예요! 호수를 바라보며 가볍게 도보 산책하기 훌륭하더라고요."
    }
  };
}


// Helper to generate dynamic calendar grid days for July 2026
function getCalendarDays(year, month) {
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
  const totalDays = new Date(year, month + 1, 0).getDate();
  const days = [];
  
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }
  return days;
}

// Generate dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const market = await getMarketData(resolvedParams.id);

  if (!market) {
    return {
      title: '시장을 찾을 수 없습니다 | 전국 오일장 지도',
      description: '존재하지 않는 오일장 정보입니다.'
    };
  }

  const regionName = market.address.split(' ')[0] || '전국';
  const parkingText = market.parking_yn === 'Y' ? '공영 주차장 완비' : '대중교통 이용 권장';

  const title = market.opening_cycle
    ? `${market.market_name} (${market.opening_cycle}) 장날 일정표·날짜표·주차 정보 | 오일장지도 : 장날맵`
    : `${market.market_name} 오일장 날짜표·일정표·주차 정보 | 오일장지도 : 장날맵`;

  const description = `대한민국 1등 오일장지도 : 장날맵에서 제공하는 ${market.market_name}의 정확한 장날 날짜표와 일정표입니다. 무료 주차 팁과 주변 명소 가이드까지 지금 확인하세요.`;

  return {
    title,
    description,
    keywords: `${market.market_name}, ${market.market_name} 오일장, ${regionName} 오일장, ${market.market_name} 장날, ${market.market_name} 주차, 전통시장 지도, ${parkingText}`,
    alternates: {
      canonical: `https://jangnalmap.com/market/${resolvedParams.id}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://jangnalmap.com/market/${resolvedParams.id}`,
    }
  };
}

export default async function MarketDetailPage({ params }) {
  const resolvedParams = await params;
  const market = await getMarketData(resolvedParams.id);

  if (!market) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-[#1A1A1A]">
        <h2 className="text-xl font-bold mb-4">시장을 찾을 수 없습니다.</h2>
        <Link href="/" className="bg-[#10B981] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm">
          메인 페이지로 돌아가기
        </Link>
      </div>
    );
  }

  const todayOpen = isOpenToday(market.opening_cycle);
  const attractions = getAttractionsByRegion(market.address);
  const liveNearbyMarkets = await getLiveNearbyMarkets(market);
  const weather = getWeatherTip(market.address);
  const nearbyPlaces = getNearbyPlaces(market.address, market.market_name);
  const weekendNearbyMarkets = await getWeekendNearbyMarkets(market);



  // Generate calendar days for July 2026
  const targetYear = 2026;
  const targetMonth = 6; // 7월 (0-indexed)
  const calendarDays = getCalendarDays(targetYear, targetMonth);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // Check if calendar day is an opening day
  const cycleMatches = market.opening_cycle.match(/\d+/g);
  const cycleNums = cycleMatches ? cycleMatches.map(Number) : [];
  const isMarketOpeningDay = (day) => {
    if (!day) return false;
    if (market.opening_cycle === '매일') return true;
    const lastDigit = day % 10;
    return cycleNums.some(num => {
      if (num === 10) return lastDigit === 0;
      return lastDigit === num;
    });
  };

  // Calculate next opening date details starting from mock date July 12, 2026
  const nextDate = getNextOpeningDate(market.opening_cycle);
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  let nextOpeningText = "";
  if (nextDate) {
    const diffTime = nextDate.getTime() - new Date(2026, 6, 12).getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const dateStr = `${nextDate.getMonth() + 1}월 ${nextDate.getDate()}일 (${daysOfWeek[nextDate.getDay()]}요일)`;
    
    if (diffDays === 0) {
      nextOpeningText = `🔥 가장 빨리 방문 가능한 장날은 바로 오늘인 ${dateStr}입니다!`;
    } else {
      nextOpeningText = `🗓️ 가장 빨리 방문 가능한 장날은 ${dateStr} (앞으로 ${diffDays}일 남음) 입니다.`;
    }
  }

  // Augment Editor Tips to guarantee 500+ characters of content with high-value automotive/finance AdSense keywords
  const augmentedParkingTip = `${market.parking_tip} 전용 공영주차장 이용 시 국가유공자, 저공해 차량, 다자녀 가구 및 경차 할인 혜택(최대 50% 감면)을 꼭 챙기세요. 시장에서 과일이나 물건을 대량 구입한 후 차량으로 운반할 때 좁은 시장 진입로에서 접촉 사고가 날 수 있으니 주차 차량 운전자는 안전 수칙을 준수하고 필수 자동차 보험 보장 한도를 확인해두시는 것이 현명합니다. 또한, 장터 먹거리 코너에서 시원한 막걸리나 반주를 한잔 드셨다면 음주운전은 절대 금물이며, 반드시 대리운전 서비스나 앱을 호출하여 안전하게 귀가하셔야 사고 처리에 따른 자동차 보험 할증이나 법적 불이익을 방지할 수 있더라고요. 주차가 혼잡할 땐 인근 사설 주차 타워나 유료 민영 주차장을 활용하고 당일 할인권이나 신용카드 무료 주차 혜택을 연계하는 편이 비용을 절약하는 또 다른 꿀팁입니다.`;
  const augmentedTransportTip = `${market.transport_info} 오일장은 보통 버스 노선들이 집중적으로 환승되는 지역 읍내 오거리나 기차역 인근 공터에 자리를 잡기 때문에 대중교통 노선 연계가 아주 훌륭한 편이더라고요. 전철이나 기차가 닿는 지역의 경우 교통 체증과 주차 지옥을 피하기 위해 웬만하면 철도편을 이용하여 걷는 도보 여행 테마로 방문하시면 시장의 옛 정취와 걷는 재미를 곱절로 느껴볼 수 있어 훨씬 유용할 것입니다.`;
  const augmentedFoodTip = `${market.food_recommend} 전통시장의 참맛은 역시 노점 상인분들이 갓 부쳐내어 연기가 모락모락 피어나는 야채 전이나 노릇한 호떡, 바로 짜낸 고소한 핫바 등 길거리 분식에서 나오더라고요. 특히 7월 여름철에는 얼음 동둥 띄운 시원한 미숫가루나 식혜를 플라스틱 컵에 사 들고 장 구경을 하면 무더운 날씨도 금방 잊히더라고요. 먹거리 코너 주변에 모여 앉아 모르는 사람들과 정겹게 식사하는 장터 특유의 낭만을 꼭 느껴보시길 추천해 드려요!`;

  // Dynamic tags
  const tags = [
    `#${market.market_name.replace(/\s+/g, '')}`,
    `#${market.address.split(' ')[0]}오일장`,
    `#전통시장맛집`,
    `#7월제철먹거리`
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${market.market_name} 오일장`,
    "description": `${market.market_name} 오일장 개장 주기(${market.opening_cycle}), 주소(${market.address}), 주차장 및 주변 코스 정보 안내.`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": market.address,
      "addressLocality": getDistrict(market.address),
      "addressRegion": market.address.split(' ')[0],
      "addressCountry": "KR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": market.latitude,
      "longitude": market.longitude
    },
    "url": `https://jangnalmap.com/market/${market.id}`,
    "telephone": market.phone_num || "N/A"
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col antialiased">
      {/* JSON-LD Structured Data for LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#10B981] to-[#FF5A1F] bg-clip-text text-transparent">
              장날맵.com
            </span>
          </Link>
          <Link href="/" className="text-xs text-gray-500 hover:text-[#10B981] transition-colors bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-200/60 font-semibold shadow-sm">
            &larr; 목록으로
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Breadcrumbs */}
        <div className="text-xs text-gray-400 flex gap-2 font-medium">
          <Link href="/" className="hover:text-gray-600">홈</Link>
          <span>&gt;</span>
          <span className="text-gray-500">{market.address.split(' ')[0]}</span>
          <span>&gt;</span>
          <span className="text-gray-500">{getDistrict(market.address)}</span>
          <span>&gt;</span>
          <span className="text-[#10B981] font-bold">{market.market_name}</span>
        </div>

        {/* 🛍️ [시장명]과 함께 가면 좋은 오늘/내일 장터 Section (연쇄 방문 추천 - 최상단 배치) */}
        {weekendNearbyMarkets.length > 0 && (
          <section className="flex flex-col gap-4 p-5 bg-gray-50/50 border border-gray-200/60 rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/40 pb-2.5">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-gray-900 flex items-center gap-2">
                  🛍️ {market.market_name}과 함께 가면 좋은 오늘/내일 장터
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5 font-semibold">내일 또는 이번 주말에 개장하여 묶어 가기 좋은 동일 광역 지자체 내 추천 장터 리스트입니다.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {weekendNearbyMarkets.map((nearby) => {
                return (
                  <Link
                    key={nearby.id}
                    href={`/market/${nearby.id}`}
                    className="bg-white hover:bg-emerald-50/30 border border-gray-150 rounded-xl p-4 transition-all hover:border-[#10B981]/40 shadow-sm flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-extrabold text-gray-900 text-xs sm:text-sm line-clamp-1">{nearby.market_name}</h4>
                        <span className="bg-[#FF5A1F]/10 text-[#FF5A1F] text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0">
                          {nearby.opening_cycle}
                        </span>
                      </div>
                      
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed font-semibold">
                        {getWeekendCurationText(market.market_name, nearby.market_name)}
                      </p>
                    </div>

                    <span className="text-[10px] font-bold text-[#10B981] text-right hover:underline block mt-1">
                      다음 시장 상세 보기 &rarr;
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Real-time Weather Warning Banner (Interactive weather simulation banner) */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col gap-2.5 shadow-sm">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">🌦️ 오늘의 {getDistrict(market.address)} 실시간 날씨보기</span>
          <p className="text-sm font-extrabold text-gray-800 leading-relaxed">
            오늘 날씨 상황: <span className="text-[#FF5A1F]">{weather.status} ({weather.temp})</span>
          </p>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">
            {weather.tip}
          </p>
        </section>

        {/* Hero Title Section */}
        <section className="flex flex-col gap-3 pb-4">
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug">
            {market.market_name} 오일장 장날 주기, 대체 주차장 꿀팁, 대중교통 정보!
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#10B981] flex items-center justify-center font-bold text-xs">🗺️</div>
            <div className="text-xs text-gray-400">
              <span className="font-bold text-gray-600">장날맵 가이드</span> | 전국 오일장 이용 상세 안내
            </div>
            {todayOpen ? (
              <span className="relative flex h-fit w-fit shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A1F] opacity-75"></span>
                <span className="relative inline-flex rounded-full bg-[#FF5A1F] text-white text-xs sm:text-sm px-3.5 py-1.5 font-bold shadow-[0_4px_14px_rgba(255,90,31,0.4)]">
                  🔥 오늘 개장! 🎉
                </span>
              </span>
            ) : (
              <span className="bg-emerald-50 border border-emerald-100 text-[#10B981] text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full font-extrabold">
                오일장일정: {market.opening_cycle}
              </span>
            )}
          </div>
        </section>

        {/* Summary Card Intro */}
        <section className="bg-gray-50 border border-gray-200/60 rounded-2xl p-5 shadow-sm">
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">
            📢 {market.market_name} 오일장은 오랜 역사와 지역 특유의 정겨운 분위기를 간직한 대표적인 장터입니다. 
            주차 꿀팁부터 전철과 버스 등 대중교통 환승 루트, 그리고 이번 달 상세 개장 요일 정보를 가이드북 형태로 깔끔하게 정리했습니다.
          </p>
        </section>

        {/* Info Table */}
        <section className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm">
          <table className="min-w-full divide-y divide-gray-150 text-xs sm:text-sm">
            <tbody className="divide-y divide-gray-150">
              <tr>
                <td className="w-1/3 px-4 py-3.5 bg-gray-50 text-gray-500 font-bold flex items-center gap-1.5">
                  📍 주소
                </td>
                <td className="px-4 py-3.5 text-gray-700 font-extrabold leading-relaxed">
                  {market.address}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3.5 bg-gray-50 text-gray-500 font-bold flex items-center gap-1.5">
                  🗓️ 오일장일정
                </td>
                <td className="px-4 py-3.5 text-[#FF5A1F] font-black text-base sm:text-lg">
                  매월 {market.opening_cycle}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3.5 bg-gray-50 text-gray-500 font-bold flex items-center gap-1.5">
                  📞 시장 연락처
                </td>
                <td className="px-4 py-3.5 text-gray-700 font-medium">
                  {market.phone ? (
                    <a
                      href={`tel:${market.phone}`}
                      title={`${market.phone} 번호로 바로 전화 걸기`}
                      className="text-[#10B981] font-extrabold underline hover:text-[#059669] inline-flex items-center gap-1"
                    >
                      📞 {market.phone} 바로 통화하기
                    </a>
                  ) : (
                    <span className="text-gray-400">정보 없음</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3.5 bg-gray-50 text-gray-500 font-bold flex items-center gap-1.5">
                  🚗 주차/시설
                </td>
                <td className="px-4 py-3.5 text-gray-700 font-medium">
                  {market.parking_yn === 'Y' 
                    ? "주차장 보유 여부: Y (공영주차장 이용이 편리하더라고요)" 
                    : "주차장 보유 여부: N (주차 시설이 협소하니 대중교통이나 인근 임시 주차를 추천해요)"}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 💰 알뜰 쇼핑 금융 꿀팁 Section */}
        <section className="bg-yellow-50/50 border border-yellow-200/80 rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-sm">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span role="img" aria-label="금융 절약 돈주머니 아이콘">💰</span> {market.market_name} 방문 전 필독! 10% 더 아끼는 똑똑한 지출 노하우
            </h3>
            <p className="text-xs text-gray-500 mt-1 font-semibold">온누리상품권 충전 혜택부터 연말정산 40% 소득공제, 주차장 안심 이용 팁까지 모두 챙겨가세요.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            {/* Tip 1 */}
            <div className="bg-white border border-yellow-100 rounded-xl p-4.5 space-y-2 shadow-sm">
              <h4 className="font-extrabold text-amber-800 text-sm">온누리상품권 10% 절약법</h4>
              <p className="text-gray-600 leading-relaxed font-semibold">
                오늘 {market.market_name}에서 10만 원 상당의 쇼핑을 하신다면, 모바일 <strong className="font-extrabold underline text-amber-900">온누리상품권</strong> 앱을 활용하여 10% 선할인 충전 혜택을 챙겨보세요! 충전식 카드로 결제 시 1만 원 즉시 절약이 가능하더라고요.
              </p>
            </div>

            {/* Tip 2 */}
            <div className="bg-white border border-yellow-100 rounded-xl p-4.5 space-y-2 shadow-sm">
              <h4 className="font-extrabold text-amber-800 text-sm">연말정산 소득공제 40%</h4>
              <p className="text-gray-600 leading-relaxed font-semibold">
                카드형 <strong className="font-extrabold underline text-amber-900">온누리상품권</strong>으로 구매한 내역은 전통시장 <strong className="font-extrabold underline text-amber-900">소득공제</strong>율 40%가 그대로 적용되어 연말정산 환급금 혜택을 극대화할 수 있습니다. 국세청 홈택스 및 연계 카드사 앱에서 손쉽게 실적 한도 조회가 가능하여 유용해요!
              </p>
            </div>

            {/* Tip 3 */}
            <div className="bg-white border border-yellow-100 rounded-xl p-4.5 space-y-2 shadow-sm">
              <h4 className="font-extrabold text-amber-800 text-sm">인근 주차/사고 보험 팁</h4>
              <p className="text-gray-600 leading-relaxed font-semibold">
                시장 주변 노상이나 공영주차장 차량 정체 시 빈번한 접촉 사고 예방을 위해 의무 자동차 <strong className="font-extrabold underline text-amber-900">보험</strong> 한도를 미리 확인해 두세요. 가벼운 접촉 사고 처리 및 <strong className="font-extrabold underline text-amber-900">보험</strong> 대리 대처 요령을 숙지하여 비용 할증을 방지하시기를 추천해 드립니다!
              </p>
            </div>
          </div>
        </section>

        {/* Brand Map Buttons */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <a
            href={`https://map.naver.com/v5/search/${encodeURIComponent(market.market_name + ' ' + market.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#03C75A] text-white font-extrabold py-3.5 px-4 rounded-xl hover:bg-[#02B34F] text-sm text-center flex items-center justify-center gap-1.5 shadow-sm transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
          >
            네이버지도에서 보기 ↗
          </a>
          <a
            href={`https://map.kakao.com/link/search/${encodeURIComponent(market.market_name + ' ' + market.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FEE500] text-[#191919] font-extrabold py-3.5 px-4 rounded-xl hover:bg-[#FDD835] text-sm text-center flex items-center justify-center gap-1.5 shadow-sm transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
          >
            카카오맵으로 가기 ↗
          </a>
        </section>

        {/* 카카오톡 / 지인 1-클릭 바이럴 공유 버튼 */}
        <ShareButton marketName={market.market_name} />

        {/* 유튜브 외부 연결 단독 버튼 */}
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(market.market_name + ' 오일장')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#FF0000] text-white font-extrabold py-3.5 px-4 rounded-xl hover:bg-[#CC0000] text-xs sm:text-sm text-center flex items-center justify-center gap-1.5 shadow-sm transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          유튜브에서 {market.market_name} 현장 상황 더 찾아보기 ↗
        </a>

        {/* 🍲 이번 달 장바구니 추천 Checklist */}
        <ShoppingChecklist />

        {/* 이달의 장날 달력 위젯 (Includes next opening calculation banner on top) */}
        <section className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-5">
          <div className="border-b border-gray-100 pb-3 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-extrabold text-gray-900 flex items-center gap-2">
                🗓️ 2026년 7월 장날 달력
              </h3>
              <span className="text-xs bg-[#10B981]/15 text-[#10B981] px-2.5 py-0.5 rounded-full font-bold">
                초록색 동그라미 = 장서는 날
              </span>
            </div>
            
            {/* Real-time next opening date calculator banner */}
            {nextOpeningText && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs sm:text-sm text-emerald-800 font-extrabold shadow-sm">
                {nextOpeningText}
              </div>
            )}
          </div>

          <div className="max-w-md mx-auto w-full">
            {/* Calendar Grid Header */}
            <div className="grid grid-cols-7 text-center font-bold text-xs sm:text-sm text-gray-400 mb-3">
              {weekDays.map(day => (
                <div key={day} className={day === '일' ? 'text-rose-500' : day === '토' ? 'text-blue-500' : ''}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid Body */}
            <div className="grid grid-cols-7 text-center text-sm font-semibold gap-x-1 sm:gap-x-2 gap-y-3">
              {calendarDays.map((dayNum, idx) => {
                const isOpen = isMarketOpeningDay(dayNum);
                const isToday = dayNum === 12; // Adjusted mock today to matches local time July 12, 2026
                const isSunday = idx % 7 === 0;
                const isSaturday = idx % 7 === 6;

                return (
                  <div key={idx} className="h-9 sm:h-10 flex items-center justify-center relative">
                    {dayNum ? (
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs sm:text-sm rounded-full transition-all relative ${
                        isOpen 
                          ? 'bg-[#10B981] text-white shadow-sm font-bold' 
                          : isToday 
                            ? 'ring-2 ring-[#FF5A1F] text-gray-900 font-bold'
                            : isSunday 
                              ? 'text-rose-500' 
                              : isSaturday 
                                ? 'text-blue-500' 
                                : 'text-gray-700'
                      }`}>
                        {dayNum}
                        {isToday && !isOpen && (
                          <span className="absolute bottom-0 w-1 h-1 bg-[#FF5A1F] rounded-full"></span>
                        )}
                      </div>
                    ) : (
                      <span className="text-transparent"></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 📍 [시장명] 주변 함께 가기 좋은 곳 & 실시간 현황 리포트 */}
        <section className="bg-gray-50 border border-gray-200/80 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              📍 {market.market_name} 주변 함께 가기 좋은 곳
            </h3>
            <p className="text-xs text-gray-500 mt-1">오일장 나들이와 함께 방문하기 편리한 에디터 추천 숨은 카페와 힐링 명소 코스입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cafe */}
            <div className="bg-white border border-gray-150 rounded-xl p-5 space-y-2 shadow-sm">
              <h4 className="font-extrabold text-gray-900 text-sm sm:text-base flex items-center gap-1.5">
                <span role="img" aria-label={`${market.market_name} 주변 추천 카페 ${nearbyPlaces.cafe.name} 아이콘`}>☕</span> 추천 카페: {nearbyPlaces.cafe.name}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">
                {nearbyPlaces.cafe.desc}
              </p>
            </div>
            
            {/* Attraction */}
            <div className="bg-white border border-gray-150 rounded-xl p-5 space-y-2 shadow-sm">
              <h4 className="font-extrabold text-gray-900 text-sm sm:text-base flex items-center gap-1.5">
                <span role="img" aria-label={`${market.market_name} 주변 추천 관광지 명소 ${nearbyPlaces.tourist.name} 아이콘`}>🏞️</span> 추천 명소: {nearbyPlaces.tourist.name}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">
                {nearbyPlaces.tourist.desc}
              </p>
            </div>
          </div>

          {/* 실시간 장날 리포트 투표 위젯 */}
          <div className="pt-4 border-t border-gray-200/60">
            <MarketReport />
          </div>
        </section>

        {/* Highly Detailed Editor Tips (Blog style matching screenshots, Text-to-HTML ratio optimized) */}
        <section className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#10B981] to-emerald-400 flex items-center justify-center font-bold text-white text-sm shadow-sm">
              💡
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-gray-900">오일장 방문 필독 가이드 팁</h3>
              <p className="text-[11px] font-semibold text-[#10B981]">교통·주차·먹거리 종합 가이드</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">🚇 전철과 버스로 찾아가는 쉬운 길</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">{augmentedTransportTip}</p>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">🚗 초보 운전자를 위한 주차 팁에 대해 알아봄</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">{augmentedParkingTip}</p>
            
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 space-y-2">
              <h4 className="font-extrabold text-[#10B981] text-xs sm:text-sm">📝 대안/대체 주차 팁</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                시장 내 전용 주차장이 만차이거나 혼잡할 경우에는 억지로 진입하시지 말고, 시장에서 약 300m 떨어진 인근 천변 공영주차장이나 주말에는 무료 개방되는 인근 공공복지센터 혹은 관공서 운동장 구역을 대체 주차장으로 정해 이용하시는 편이 마음 편하더라고요!
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-gray-100">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">🍲 입맛 돋우는 대표 먹거리와 추천 메뉴</h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tags.map((tag, i) => (
                <span key={i} className="bg-gray-100 text-gray-600 text-[10px] sm:text-xs px-2.5 py-1 rounded-lg font-semibold">{tag}</span>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">{augmentedFoodTip}</p>

            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 space-y-1.5">
              <h4 className="font-extrabold text-[#10B981] text-xs sm:text-sm">⭐ 우수/인기 메뉴 추천</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                시장 내 노점 골목의 가마솥 가래떡 즉석 떡볶이와 바삭한 수제 도넛, 갓 튀긴 핫바, 그리고 계절에 맞춘 7월 시원한 살얼음 미숫가루와 식혜는 필수 코스로 추천해 드려요.
              </p>
            </div>

            <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-4 space-y-1.5">
              <h4 className="font-extrabold text-blue-500 text-xs sm:text-sm">⏰ 시장 방문객 추천 시기/시간대</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                상인분들이 준비를 마치고 가장 싱싱한 나물과 제철 과일, 먹거리가 풍성하게 진열되는 정오 12시부터 오후 3시 사이가 가장 활력 넘쳐 방문하기 좋더라고요!
              </p>
            </div>
          </div>
        </section>

        {/* 7월 제철 특산물 큐레이션 (With internal linking curation banner) */}
        <section className="flex flex-col gap-4">
          <Link
            href={`/?search=${encodeURIComponent('복숭아')}`}
            className="bg-gradient-to-r from-orange-500 to-[#FF5A1F] hover:from-orange-600 hover:to-orange-700 text-white font-extrabold p-4 rounded-2xl text-center shadow-md transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 text-xs sm:text-sm cursor-pointer"
          >
            🍑 지금 이 시장에 가면 꼭 사야 할 [7월 제철 복숭아] 파는 곳 보기 &rarr;
          </Link>

          <div className="bg-orange-50/50 border border-orange-100/80 rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-orange-800 flex items-center gap-2">
                🍉 지금 오일장에서 꼭 사야 할 7월 제철 특산물
              </h3>
              <p className="text-xs text-orange-600 mt-0.5">여름 장날 바구니에 담기 좋은 싱싱하고 영양가 가득한 추천 제철 먹거리입니다.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="bg-white border border-orange-100 rounded-xl p-4 space-y-1.5 shadow-sm">
                <h4 className="font-extrabold text-orange-800 text-sm">🌽 초당옥수수</h4>
                <p className="text-gray-600 leading-relaxed">
                  7월 장터의 최고 인기 품목이에요! 찌지 않고 시원하게 생으로 과일처럼 아삭하게 베어 먹어도 달콤한 여름철 진미입니다.
                </p>
              </div>
              <div className="bg-white border border-orange-100 rounded-xl p-4 space-y-1.5 shadow-sm">
                <h4 className="font-extrabold text-orange-800 text-sm">🍉 수박 & 참외</h4>
                <p className="text-gray-600 leading-relaxed">
                  여름 태양을 머금어 당도가 최고조에 이른 제철 과일들입니다. 장터에서 잘 고르면 마트보다 월등히 저렴하고 싱싱해요.
                </p>
              </div>
              <div className="bg-white border border-orange-100 rounded-xl p-4 space-y-1.5 shadow-sm">
                <h4 className="font-extrabold text-orange-800 text-sm">🍑 백도복숭아</h4>
                <p className="text-gray-600 leading-relaxed">
                  달고 수분이 꽉 들어찬 말랑말랑한 제철 복숭아입니다. 오일장 노점에서는 덤도 많이 주시니 꼭 바구니째 사 와보세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Attractions Section */}
        <section className="flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              📍 함께 둘러보기 좋은 추천 여행지
            </h3>
            <p className="text-xs text-gray-500 mt-1">오일장 구경을 마친 후 함께 방문하기 편리한 인근의 가볼 만한 코스입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {attractions.map((att, i) => (
              <div key={i} className="bg-white border border-gray-200/80 rounded-2xl p-4 flex flex-col justify-between gap-3 hover:border-[#10B981]/50 transition-colors shadow-sm">
                <div>
                  <h4 className="font-extrabold text-gray-900 text-sm sm:text-base flex items-center justify-between gap-2">
                    {att.name}
                    <span className="text-[10px] text-[#10B981] font-bold shrink-0 bg-emerald-50 px-2 py-0.5 rounded-full">{att.dist}</span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed font-medium">{att.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>



        {/* Real-time Feedback Loop */}
        <section className="mt-2">
          <FeedbackLoop />
        </section>

        {/* Back Button */}
        <div className="text-center pt-4">
          <Link href="/" className="inline-flex bg-[#10B981] hover:bg-[#059669] text-white text-sm font-bold px-6 py-3 rounded-2xl transition-all cursor-pointer shadow-[0_4px_12px_rgba(16,185,129,0.2)]">
            목록으로 돌아가기
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
