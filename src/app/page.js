'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { 
  isOpenToday, 
  getDaysUntilOpening, 
  getDDayText, 
  getRegionGroup 
} from '@/utils/dateUtils';
import { FAQ_DATA } from '@/components/InfoSections';

// Dynamic import for Leaflet Map to avoid SSR 'window is not defined' errors
const MarketMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#F3F4F6] flex items-center justify-center text-gray-400">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-500">지도를 로드하는 중입니다...</p>
      </div>
    </div>
  )
});

const REGIONS = [
  '전체', '수도권', '강원', '충북', '충남/대전/세종', '전북', '전남/광주', '경북/대구', '경남/부산/울산', '제주'
];

const CYCLES = [
  { label: '전체', value: '전체' },
  { label: '1·6일', value: '1,6' },
  { label: '2·7일', value: '2,7' },
  { label: '3·8일', value: '3,8' },
  { label: '4·9일', value: '4,9' },
  { label: '5·10일', value: '5,10' },
  { label: '매일장', value: '매일' }
];

export default function Home() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedCycle, setSelectedCycle] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [onlyToday, setOnlyToday] = useState(false);
  const [onlyParking, setOnlyParking] = useState(false);

  // Debounce search input to prevent main-thread block (typing Input Delay)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 180);
    return () => clearTimeout(delayDebounce);
  }, [searchInput]);

  const [activeMarket, setActiveMarket] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map' on mobile
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Performance: Lazy list rendering state (virtual scroll)
  const [visibleCount, setVisibleCount] = useState(20);

  // Retention: Favorites state
  const [favorites, setFavorites] = useState([]);

  // GPS Sorting state
  const [userLocation, setUserLocation] = useState(null);
  const [gpsSorting, setGpsSorting] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);

  // Reset visible count when search filter variables change
  useEffect(() => {
    setVisibleCount(20);
  }, [selectedRegion, selectedCycle, searchQuery, gpsSorting]);

  // Fetch market data and read favorites on mount
  useEffect(() => {
    async function loadMarkets() {
      try {
        const res = await fetch('/data/markets.json');
        if (!res.ok) throw new Error('Failed to fetch markets data');
        const data = await res.json();
        setMarkets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMarkets();

    // Read favorites from localStorage
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites from storage", e);
      }
    }
  }, []);

  // Toggle favorite market handler
  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  // GPS geolocation handler
  const handleGpsSearch = () => {
    if (!navigator.geolocation) {
      alert("이 브라우저는 위치 서비스를 지원하지 않습니다.");
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setGpsSorting(true);
        setGpsLoading(false);
      },
      (err) => {
        console.error("GPS error callback", err);
        alert("현재 내 위치 정보를 가져오는데 실패했습니다. 위치 서비스 권한을 허용했는지 확인해주세요.");
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const clearGpsSearch = () => {
    setUserLocation(null);
    setGpsSorting(false);
  };

  // Helper to calculate Haversine distance in km
  function getDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c;
  }

  // Compute D-Day information for all markets once they load
  const marketsWithDDay = useMemo(() => {
    const today = new Date();
    return markets.map(market => {
      const daysUntil = getDaysUntilOpening(market.opening_cycle, today);
      const isToday = isOpenToday(market.opening_cycle, today);
      return {
        ...market,
        daysUntil,
        isToday,
        regionGroup: getRegionGroup(market.address)
      };
    });
  }, [markets]);

  // Filter and Sort Markets
  const filteredMarkets = useMemo(() => {
    let result = [...marketsWithDDay];

    // Filter by Region
    if (selectedRegion !== '전체') {
      result = result.filter(m => m.regionGroup === selectedRegion);
    }

    // Filter by Cycle
    if (selectedCycle !== '전체') {
      if (selectedCycle === '매일') {
        result = result.filter(m => m.opening_cycle === '매일');
      } else {
        const digits = selectedCycle.split(',').map(Number);
        result = result.filter(m => {
          if (m.opening_cycle === '매일') return false;
          const cycleMatches = m.opening_cycle.match(/\d+/g);
          if (!cycleMatches) return false;
          const cycleNums = cycleMatches.map(Number);
          return cycleNums.some(num => digits.includes(num));
        });
      }
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(m => 
        m.market_name.toLowerCase().includes(query) || 
        m.address.toLowerCase().includes(query) ||
        m.food_recommend.toLowerCase().includes(query)
      );
    }

    // Filter by Quick Chips (Today only & Parking available)
    if (onlyToday) {
      result = result.filter(m => m.isToday);
    }
    if (onlyParking) {
      result = result.filter(m => m.parking_yn === 'Y');
    }

    // GPS sorting priority
    if (gpsSorting && userLocation) {
      result = result.map(m => ({
        ...m,
        distance: getDistance(userLocation.lat, userLocation.lng, m.latitude, m.longitude)
      }));
      return result.sort((a, b) => a.distance - b.distance);
    }

    // Default Sort: 
    // 1. Open today first
    // 2. Shortest daysUntil next
    // 3. Special famous markets first
    // 4. Alphabetical
    return result.sort((a, b) => {
      if (a.isToday && !b.isToday) return -1;
      if (!a.isToday && b.isToday) return 1;

      const daysA = a.daysUntil === -1 ? 999 : a.daysUntil;
      const daysB = b.daysUntil === -1 ? 999 : b.daysUntil;
      
      if (daysA !== daysB) {
        return daysA - daysB;
      }

      const isSpecialA = ['성남 모란시장 (모란5일장)', '정선 아리랑시장 (정선5일장)', '양평 물맑은시장 (양평5일장)', '대구 불로5일장 (불로전통시장)', '김포 5일장 (북변5일장)'].includes(a.market_name);
      const isSpecialB = ['성남 모란시장 (모란5일장)', '정선 아리랑시장 (정선5일장)', '양평 물맑은시장 (양평5일장)', '대구 불로5일장 (불로전통시장)', '김포 5일장 (북변5일장)'].includes(b.market_name);
      if (isSpecialA && !isSpecialB) return -1;
      if (!isSpecialA && isSpecialB) return 1;

      return a.market_name.localeCompare(b.market_name, 'ko');
    });
  }, [marketsWithDDay, selectedRegion, selectedCycle, searchQuery, gpsSorting, userLocation, onlyToday, onlyParking]);

  const handleSelectMarket = (market) => {
    setActiveMarket(market);
    if (window.innerWidth < 1024) {
      setViewMode('map');
    }
  };

  // Label for selected cycle
  const currentCycleLabel = useMemo(() => {
    if (selectedCycle === '전체') return '모든 주기';
    return CYCLES.find(c => c.value === selectedCycle)?.label || '';
  }, [selectedCycle]);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col antialiased">
      {/* Premium Glassmorphism Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#10B981] to-[#FF5A1F] bg-clip-text text-transparent">
              장날맵.com
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-[#10B981]/10 border border-[#10B981]/25 text-[#10B981] rounded-full font-bold">
              전국 5일장 지도
            </span>
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-gray-500 font-medium">
            <a href="#map-section" className="hover:text-[#10B981] transition-colors">지도 홈</a>
            <a href="#faq-section" className="hover:text-[#10B981] transition-colors">5일장 가이드 FAQ</a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        
        {/* Massive Premium Search Container */}
        <section className="w-full py-8 sm:py-12 px-4 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-orange-50 border border-gray-100 flex flex-col items-center text-center gap-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold tracking-wider text-[#10B981] uppercase">대한민국 오일장 완벽 검색 가이드</span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1A1A1A]">
              오늘 여는 오일장, <span className="text-[#FF5A1F]">여기서 바로</span> 확인해보세요!
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              초성, 지역명, 특산 먹거리 등으로 빠르게 전국의 전통시장을 검색하세요.
            </p>
          </div>

          {/* Magnificent Search Bar & GPS Button */}
          <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative shadow-md rounded-2xl overflow-hidden border border-gray-200/80 bg-white focus-within:ring-2 focus-within:ring-[#10B981]/40 focus-within:border-[#10B981] transition-all duration-300">
              <div className="flex items-center px-4 py-3 sm:py-4">
                <svg className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="시장명, 특산물, 주소 검색..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-transparent border-none text-[#1A1A1A] placeholder-gray-400 font-semibold px-3 focus:outline-none text-sm sm:text-base"
                />
                <div className="flex items-center gap-3 shrink-0">
                  {searchInput && (
                    <button 
                      onClick={() => { setSearchInput(''); setSearchQuery(''); }}
                      className="text-gray-400 hover:text-gray-600 text-xs sm:text-sm font-semibold cursor-pointer"
                    >
                      지우기
                    </button>
                  )}
                  <button 
                    title="음성 검색 준비 중"
                    onClick={() => alert("음성 검색 기능은 향후 업데이트될 예정입니다!")}
                    className="text-gray-400 hover:text-[#10B981] p-1.5 rounded-full hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                  >
                    <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleGpsSearch}
              className="bg-[#10B981] hover:bg-[#059669] text-white font-extrabold px-6 py-3.5 sm:py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all text-sm cursor-pointer whitespace-nowrap active:scale-95 shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {gpsLoading ? 'GPS 위치 수신 중...' : '📍 내 주변 오일장 찾기'}
            </button>
          </div>

          {/* 1-Touch Quick Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-gray-400 mr-1">⚡ 1초 퀵 검색:</span>
            <button
              onClick={() => setOnlyToday(!onlyToday)}
              className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1 active:scale-95 ${
                onlyToday 
                  ? 'bg-[#FF5A1F] text-white shadow-sm ring-2 ring-[#FF5A1F]/30'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50/50'
              }`}
            >
              🔥 오늘 열리는 장터만
            </button>
            <button
              onClick={() => setOnlyParking(!onlyParking)}
              className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1 active:scale-95 ${
                onlyParking 
                  ? 'bg-[#10B981] text-white shadow-sm ring-2 ring-[#10B981]/30'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50'
              }`}
            >
              🚗 무료/공영 주차장 완비
            </button>
            <button
              onClick={() => setSearchInput('모란시장')}
              className="text-xs px-3.5 py-2 rounded-xl font-bold bg-white border border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all cursor-pointer flex items-center gap-1 active:scale-95"
            >
              ⭐ 성남 모란장
            </button>
            <button
              onClick={() => setSearchInput('정선아리랑')}
              className="text-xs px-3.5 py-2 rounded-xl font-bold bg-white border border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all cursor-pointer flex items-center gap-1 active:scale-95"
            >
              ⭐ 정선 5일장
            </button>
            {(onlyToday || onlyParking || searchQuery || selectedRegion !== '전체' || selectedCycle !== '전체') && (
              <button
                onClick={() => {
                  setOnlyToday(false);
                  setOnlyParking(false);
                  setSearchInput('');
                  setSearchQuery('');
                  setSelectedRegion('전체');
                  setSelectedCycle('전체');
                  if (gpsSorting) clearGpsSearch();
                }}
                className="text-xs px-2.5 py-1.5 text-gray-400 hover:text-gray-600 underline font-semibold cursor-pointer ml-auto"
              >
                필터 초기화 ↺
              </button>
            )}
          </div>

          {gpsSorting && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs sm:text-sm text-emerald-800 font-extrabold">
              <span>📍 GPS 기준 내 주변에 가까운 순서로 정렬되었습니다.</span>
              <button 
                onClick={clearGpsSearch}
                className="underline hover:text-emerald-950 cursor-pointer ml-1 font-bold"
              >
                정렬 초기화
              </button>
            </div>
          )}
        </section>



        {/* Filter Controls (Usability Upgraded Filters) */}
        <section className="glass-effect rounded-2xl p-4 sm:p-6 flex flex-col gap-5 border border-gray-100">
          {/* Region Tabs (150% Larger Font Size + Big Padding) */}
          <div>
            <span className="text-sm font-extrabold text-[#10B981] block mb-3">지역 필터</span>
            <div className="flex flex-wrap gap-2.5">
              {REGIONS.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`text-base sm:text-lg px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    selectedRegion === region
                      ? 'bg-[#10B981] border-[#10B981] text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)] font-bold'
                      : 'bg-gray-50 border-gray-100 text-gray-600 hover:text-[#10B981] hover:bg-emerald-50 font-semibold'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Cycle Tabs (150% Larger Font Size + Big Padding) */}
          <div className="pt-4 border-t border-gray-100">
            <span className="text-sm font-extrabold text-[#10B981] block mb-3">장날 날짜 주기 필터</span>
            <div className="flex flex-wrap gap-2.5">
              {CYCLES.map((cycle) => (
                <button
                  key={cycle.value}
                  onClick={() => setSelectedCycle(cycle.value)}
                  className={`text-base sm:text-lg px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    selectedCycle === cycle.value
                      ? 'bg-[#10B981] border-[#10B981] text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)] font-bold'
                      : 'bg-gray-50 border-gray-100 text-gray-600 hover:text-[#10B981] hover:bg-emerald-50 font-semibold'
                  }`}
                >
                  {cycle.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Split View Layout */}
        <section id="map-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px] lg:h-[800px]">
          {/* Left: Market List Sidebar (lg:col-span-5) */}
          <div className={`lg:col-span-5 flex flex-col bg-gray-50/50 border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm ${
            viewMode === 'list' ? 'flex' : 'hidden lg:flex'
          }`}>
            {/* Usability Upgraded Header (text-3xl) */}
            <div className="p-4 sm:p-5 border-b border-gray-200/80 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                시장 검색 결과
                <span className="bg-[#10B981]/15 text-[#10B981] px-3 py-0.5 text-xs sm:text-sm rounded-full font-bold">
                  {filteredMarkets.length}개 발견
                </span>
              </h2>
            </div>

            {/* 내가 찜한 단골 시장 (Favorites list rendered dynamically) */}
            {favorites.length > 0 && (
              <div className="mx-4 mt-3 bg-[#FFF9E6] border border-amber-200 rounded-2xl p-4 shadow-sm">
                <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider block mb-2 flex items-center gap-1">
                  ❤️ 내가 찜한 단골 시장 ({favorites.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {marketsWithDDay.filter(m => favorites.includes(m.id)).map(m => (
                    <button
                      key={m.id}
                      onClick={() => handleSelectMarket(m)}
                      className={`text-xs px-2.5 py-1.5 rounded-xl border font-bold transition-all flex items-center gap-1 cursor-pointer bg-white border-amber-200 text-amber-850 hover:bg-amber-50 ${
                        activeMarket && activeMarket.id === m.id ? 'ring-2 ring-amber-400 border-amber-400' : ''
                      }`}
                    >
                      <span>{m.market_name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results Feedback Banner */}
            <div className="mx-4 mt-3 p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm">
              <span className="text-emerald-500">✨</span>
              <span>
                전체 {markets.length}개 중 <strong>{selectedRegion !== '전체' ? selectedRegion : '전국'}</strong> · <strong>{currentCycleLabel}</strong>{searchQuery ? ` · '${searchQuery}' 검색` : ''} 오일장 <strong>{filteredMarkets.length}개</strong>가 검색되었습니다.
              </span>
            </div>

            {/* Scrollable Market Cards List */}
            <div 
              onScroll={(e) => {
                const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                if (scrollHeight - scrollTop - clientHeight < 150) {
                  setVisibleCount((prev) => Math.min(prev + 20, filteredMarkets.length));
                }
              }}
              className="flex-1 overflow-y-auto p-4 space-y-4 lg:max-h-[720px]"
            >
              {loading ? (
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm h-32 animate-pulse"></div>
                  ))}
                </div>
              ) : filteredMarkets.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-20 text-gray-400 text-sm">
                  <p className="text-center font-bold">조건에 맞는 오일장이 없습니다.</p>
                  <p className="text-xs text-gray-500 mt-1">상단의 필터를 다시 세팅해보세요.</p>
                </div>
              ) : (
                filteredMarkets.slice(0, visibleCount).map((market) => (
                  <div
                    key={market.id}
                    className={`bg-white p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${
                      activeMarket && activeMarket.id === market.id
                        ? 'border-[#10B981] ring-2 ring-[#10B981]/15 shadow-md'
                        : 'border-gray-200/80 hover:border-gray-300'
                    }`}
                  >
                    {/* Header: Market Name with Heart Button and D-Day Badge */}
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleFavorite(market.id)}
                          className="text-rose-500 hover:scale-115 active:scale-90 transition-transform cursor-pointer p-0.5 shrink-0"
                          title={favorites.includes(market.id) ? "단골 해제" : "단골 시장 찜하기"}
                        >
                          {favorites.includes(market.id) ? (
                            <svg className="w-5.5 h-5.5 text-rose-500 fill-current" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                          ) : (
                            <svg className="w-5.5 h-5.5 text-gray-300 hover:text-rose-400 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                          )}
                        </button>
                        <h3 className="font-extrabold text-[#000000] text-lg hover:text-[#10B981] transition-colors leading-snug">
                          <Link href={`/market/${market.id}`}>
                            {market.market_name}
                          </Link>
                        </h3>
                      </div>
                      {market.isToday ? (
                        <span className="relative flex h-fit w-fit shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A1F] opacity-75"></span>
                          <span className="relative inline-flex rounded-full bg-[#FF5A1F] text-white text-xs sm:text-sm px-3.5 py-1.5 font-bold shadow-[0_4px_12px_rgba(255,90,31,0.35)]">
                            🔥 오늘 개장 🎉
                          </span>
                        </span>
                      ) : (
                        <span className="shrink-0 bg-emerald-50 border border-emerald-100 text-[#10B981] text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-bold">
                          {getDDayText(market.daysUntil)}
                        </span>
                      )}
                    </div>

                    {/* Address */}
                    <p className="text-xs sm:text-sm text-gray-500 mb-3 font-medium">{market.address}</p>

                    {/* Mid Section: Instantly Visible Metadata */}
                    <div className="bg-gray-50 rounded-xl p-3.5 mb-3 text-xs sm:text-sm space-y-2 border border-gray-150 shadow-sm">
                      <div className="flex items-center justify-between text-base sm:text-lg">
                        <span className="text-gray-900 font-extrabold">오일장일정</span>
                        <span className="font-extrabold text-gray-900">{market.opening_cycle}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 font-medium">주차 여부</span>
                        <span className={`font-extrabold ${market.parking_yn === 'Y' ? 'text-[#10B981]' : 'text-rose-500'}`}>
                          {market.parking_yn === 'Y' ? '🚗 가능 (공영주차장 이용)' : '❌ 주차 불가능'}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-gray-200/50 flex flex-col gap-0.5">
                        <span className="text-[#10B981] text-[10px] sm:text-xs font-bold uppercase">7월 추천 먹거리</span>
                        <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed font-semibold">
                          {market.food_recommend.replace(/.*별미더라고요!/, '').trim() || market.food_recommend}
                        </p>
                      </div>
                    </div>

                    {/* Highly Intuitive Brand colored buttons & actions */}
                    <div className="flex flex-col gap-2.5 border-t border-gray-100 pt-4 mt-3">
                      {/* Brand-Colored Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={`https://map.naver.com/v5/search/${encodeURIComponent(market.market_name + ' ' + market.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#03C75A] text-white font-bold py-2.5 px-3 rounded-xl hover:bg-[#02B34F] text-xs text-center flex items-center justify-center gap-1 shadow-sm transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
                        >
                          네이버지도에서 보기 ↗
                        </a>
                        <a
                          href={`https://map.kakao.com/link/search/${encodeURIComponent(market.market_name + ' ' + market.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#FEE500] text-[#191919] font-bold py-2.5 px-3 rounded-xl hover:bg-[#FDD835] text-xs text-center flex items-center justify-center gap-1 shadow-sm transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
                        >
                          카카오맵으로 가기 ↗
                        </a>
                      </div>

                      {/* Detail actions */}
                      <div className="flex justify-between items-center text-xs mt-1 font-semibold text-gray-500">
                        <span>전통 장날 정보 가이드</span>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleSelectMarket(market)}
                            className="border border-emerald-200 bg-emerald-50/30 text-[#10B981] font-extrabold hover:bg-emerald-50 hover:border-emerald-300 rounded-xl px-3 py-1.5 transition-all text-xs sm:text-sm inline-flex items-center gap-1 cursor-pointer"
                          >
                            <svg className="w-4.5 h-4.5 text-[#10B981] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            위치 찾기
                          </button>
                          <Link 
                            href={`/market/${market.id}`} 
                            className="border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 rounded-xl px-3 py-1.5 transition-all font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-sm"
                          >
                            자세히 보기 <span className="text-sm sm:text-base font-black">&rarr;</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right: Map Area (lg:col-span-7) */}
          <div className={`lg:col-span-7 h-[450px] lg:h-full flex flex-col ${
            viewMode === 'map' ? 'flex' : 'hidden lg:flex'
          }`}>
            <MarketMap 
              markets={filteredMarkets}
              activeMarket={activeMarket}
              onSelectMarket={handleSelectMarket}
            />
          </div>
        </section>

        {/* Mobile Toggle Button (Sticky Bottom) */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white border border-gray-200/80 rounded-full px-5 py-2.5 shadow-xl flex items-center gap-3 backdrop-blur-md">
          <button
            onClick={() => setViewMode('list')}
            className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${
              viewMode === 'list' ? 'bg-[#10B981] text-white' : 'text-gray-400 hover:text-[#10B981]'
            }`}
          >
            목록 보기
          </button>
          <div className="w-[1px] h-3 bg-gray-200"></div>
          <button
            onClick={() => setViewMode('map')}
            className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${
              viewMode === 'map' ? 'bg-[#10B981] text-white' : 'text-gray-400 hover:text-[#10B981]'
            }`}
          >
            지도 보기
          </button>
        </div>

        {/* FAQ Area (Moved to Bottom as per user request for final layout layout polish) */}
        <section id="faq-section" className="bg-gray-50 border border-gray-150 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm mt-12 mb-6">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1.5">💡 전통 5일장 필수 상식 가이드 Q&A</h2>
            <p className="text-xs sm:text-sm text-gray-500">오일장을 방문하기 전 꼭 알아두면 유익한 전통시장 정보와 팁을 에디터의 시선으로 정리했습니다.</p>
          </div>
          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between text-left text-sm sm:text-base font-bold text-gray-800 hover:text-[#10B981] transition-colors py-2 cursor-pointer"
                >
                  <span>📌 {faq.q}</span>
                  <span className="text-[#10B981] text-xs font-semibold">{expandedFaq === index ? '▲ 접기' : '▼ 보기'}</span>
                </button>
                {expandedFaq === index && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 pl-6 leading-relaxed whitespace-pre-line bg-white rounded-xl p-4 border border-gray-200">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Professional Footer */}
      <Footer />
    </div>
  );
}
