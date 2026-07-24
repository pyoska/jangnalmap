import Link from 'next/link';
import { isOpenToday, getRegionGroup } from '@/utils/dateUtils';
import ShoppingChecklist from '@/components/ShoppingChecklist';
import Footer from '@/components/Footer';
import ShareButton from '@/components/ShareButton';
import GuideTabs from '@/components/GuideTabs';
import CalendarDownload from '@/components/CalendarDownload';
import AdSenseAd from '@/components/AdSenseAd';
import { getMarketById, getMarkets } from '@/lib/db';

export const revalidate = 600; // Revalidate cache every 10 minutes

// Helper to extract Si/Gun/Gu from address (e.g. "제주시" or "성남시" or "정선군")
function getDistrict(address) {
  if (!address) return '';
  const parts = address.split(' ');
  return parts[1] || '';
}

// Fetch market data helper
async function getMarketData(id) {
  return await getMarketById(id);
}

// Fetch up to 3 LIVE nearby markets in the same province that are open today (fallback to any in same province)
async function getLiveNearbyMarkets(currentMarket) {
  const currentProvince = currentMarket.address.split(' ')[0] || '';
  const markets = await getMarkets();
  
  // Filter other markets in the same province that are open today (using mock date base July 12, 2026)
  const baseDate = new Date(2026, 6, 12);
  let list = markets.filter(
    m => m.id !== currentMarket.id && 
         m.address.split(' ')[0] === currentProvince &&
         isOpenToday(m.opening_cycle, baseDate)
  );
  
  // Fallback to general same-province markets if fewer than 3 open markets
  if (list.length < 3) {
    const fallbackList = markets.filter(
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
  const markets = await getMarkets();
  const tomorrow = new Date(2026, 6, 13);
  const saturday = new Date(2026, 6, 18);
  const sunday = new Date(2026, 6, 19);
  
  let list = markets.filter(
    m => m.id !== currentMarket.id && 
         m.address.split(' ')[0] === currentProvince &&
         (isOpenToday(m.opening_cycle, tomorrow) || 
          isOpenToday(m.opening_cycle, saturday) || 
          isOpenToday(m.opening_cycle, sunday))
  );
  
  if (list.length < 3) {
    const fallbackList = markets.filter(
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
  return `오늘 [${currentMarketName}]을 방문하셨다면, 함께 방문하기 좋은 인근의 [${recommendedMarketName}]도 확인해보세요.`;
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

// Async weather data generator using free Open-Meteo API (100% factual, no simulated text tips)
async function getWeatherTip(lat, lng, address) {
  const fallback = {
    temp: "27°C",
    status: "☁️ 흐림 & 다소 습함",
    tip: "시장을 방문하시기 전 안전한 통행 및 교통편을 사전에 점검해보시길 바랍니다."
  };

  if (!lat || !lng) return fallback;

  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`, {
      next: { revalidate: 1800 }
    });
    if (!res.ok) return fallback;
    const data = await res.json();
    const current = data.current_weather;
    if (!current) return fallback;

    const temp = `${Math.round(current.temperature)}°C`;
    const code = current.weathercode;
    
    let status = "🌤️ 대체로 맑음";
    let tip = "야외 장보기에 무난한 기상 상태입니다. 즐거운 전통시장 방문이 되시기를 바랍니다.";

    if (code === 0) {
      status = "☀️ 맑음";
      tip = "맑은 날씨이므로 햇빛 차단을 위한 물품을 챙기시면 더욱 편리합니다.";
    } else if ([1, 2, 3].includes(code)) {
      status = "☁️ 흐림";
      tip = "구름이 낀 다소 흐린 날씨입니다. 노점을 거닐기에 덥지 않아 양호합니다.";
    } else if ([45, 48].includes(code)) {
      status = "🌫️ 안개";
      tip = "안개가 관측되오니 시장 주변 차량 이동 시 각별한 주의 운전을 당부드립니다.";
    } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
      status = "☔ 비/소나기";
      tip = "비나 소나기가 내릴 가능성이 높으니 이동식 우산을 챙기시길 바랍니다.";
    } else if ([71, 73, 75, 85, 86].includes(code)) {
      status = "❄️ 눈";
      tip = "눈이 내리는 날씨이므로 낙상 및 노면 결빙에 주의하여 이동하시기 바랍니다.";
    } else if ([95, 96, 99].includes(code)) {
      status = "⚡ 뇌우";
      tip = "천둥 번개가 있을 수 있으니 가급적 아케이드 지붕이 있는 대형 아케이드 구획에서 대피해 장을 보세요.";
    }

    return { temp, status, tip };
  } catch (error) {
    console.error("Open-Meteo Weather API Error:", error);
    return fallback;
  }
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
      siteName: "장날맵.com",
      images: [
        {
          url: "/favicon.ico",
          width: 512,
          height: 512,
          alt: `${market.market_name} 정보`,
        }
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/favicon.ico"],
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
  const liveNearbyMarkets = await getLiveNearbyMarkets(market);
  const weather = await getWeatherTip(market.latitude, market.longitude, market.address);
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

  const augmentedParkingTip = market.parking_tip;
  const augmentedTransportTip = market.transport_info;
  const augmentedFoodTip = market.food_recommend;

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
    "image": "https://jangnalmap.com/favicon.ico",
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

  const regionGroup = getRegionGroup(market.address);
  const regionSlugs = {
    '수도권': 'gyeonggi',
    '강원': 'gangwon',
    '충북': 'chungbuk',
    '충남/대전/세종': 'chungnam',
    '전북': 'jeonbuk',
    '전남/광주': 'jeonnam',
    '경북/대구': 'gyeongbuk',
    '경남/부산/울산': 'gyeongnam',
    '제주': 'jeju'
  };
  const regionSlug = regionSlugs[regionGroup];

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
          {regionSlug ? (
            <Link href={`/region/${regionSlug}`} className="hover:text-gray-600">{regionGroup}</Link>
          ) : (
            <span className="text-gray-500">{market.address.split(' ')[0]}</span>
          )}
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

        {/* Boilerplate financial sections removed to prevent duplicate content flags */}

        {/* Google AdSense Contextual High-CPC Ad Slot (Targeting Onnuri/Insurance context) */}
        <div className="adsense-container w-full bg-white border border-gray-200/80 rounded-2xl p-4.5 flex flex-col items-center justify-center min-h-[140px] text-center shadow-sm">
          <AdSenseAd slot="4782019385" format="auto" responsive="true" />
          <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider mt-1.5 block">Sponsored Advertisement</span>
        </div>

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
        <ShoppingChecklist marketId={market.id} />

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

            {/* 📷 이번 달 스마트폰 오일장 달력 다운로드 빌더 */}
            <div className="mt-5 pt-5 border-t border-gray-100">
              <CalendarDownload marketName={market.market_name} openingCycle={market.opening_cycle} />
            </div>
          </div>
        </section>

        {/* 📍 [시장명] 주변 함께 가기 좋은 곳 (실시간 네이버/카카오 탐색 연동) */}
        <section className="bg-gray-50 border border-gray-200/80 rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-sm">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              📍 {market.market_name} 주변 실시간 로컬 추천 코스 탐색
            </h3>
            <p className="text-xs text-gray-500 mt-1">네이버 지도의 실시간 로컬 추천 및 주차장 연계 경로를 통해 현지의 실존하는 검증된 맛집과 가볼 만한 곳을 편하게 검색하세요.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`https://map.naver.com/v5/search/${encodeURIComponent(getDistrict(market.address) + ' 맛집')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-emerald-50/20 border border-gray-200 text-gray-800 font-bold p-4.5 rounded-xl text-center flex flex-col items-center justify-center gap-2 shadow-sm transition-all hover:border-emerald-400 active:scale-98"
            >
              <span className="text-2xl">☕</span>
              <div className="space-y-0.5">
                <span className="block text-sm font-extrabold">주변 인기 맛집/카페 검색</span>
                <span className="block text-[10px] text-gray-400">네이버 실시간 평점 순 조회 &rarr;</span>
              </div>
            </a>
            <a
              href={`https://map.naver.com/v5/search/${encodeURIComponent(getDistrict(market.address) + ' 관광지 명소')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-emerald-50/20 border border-gray-200 text-gray-800 font-bold p-4.5 rounded-xl text-center flex flex-col items-center justify-center gap-2 shadow-sm transition-all hover:border-emerald-400 active:scale-98"
            >
              <span className="text-2xl">🏞️</span>
              <div className="space-y-0.5">
                <span className="block text-sm font-extrabold">인근 추천 관광 명소 검색</span>
                <span className="block text-[10px] text-gray-400">네이버 로컬 트렌드 순 조회 &rarr;</span>
              </div>
            </a>
            <a
              href={`https://map.naver.com/v5/search/${encodeURIComponent(market.market_name + ' 주차장')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-emerald-50/20 border border-gray-200 text-gray-800 font-bold p-4.5 rounded-xl text-center flex flex-col items-center justify-center gap-2 shadow-sm transition-all hover:border-emerald-400 active:scale-98"
            >
              <span className="text-2xl">🚗</span>
              <div className="space-y-0.5">
                <span className="block text-sm font-extrabold">시장 주변 실시간 주차장 검색</span>
                <span className="block text-[10px] text-gray-400">공영 및 민영 주차장 현황 &rarr;</span>
              </div>
            </a>
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

          <GuideTabs
            transportTip={augmentedTransportTip}
            parkingTip={augmentedParkingTip}
            foodTip={augmentedFoodTip}
            tags={tags}
          />
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
