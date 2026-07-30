'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function RegionMarketList({ markets = [], regionName }) {
  const [selectedSubRegion, setSelectedSubRegion] = useState('전체');
  const [onlyToday, setOnlyToday] = useState(false);

  // Extract unique Si/Gun/Gu sub-regions
  const subRegions = useMemo(() => {
    const set = new Set();
    markets.forEach(m => {
      const parts = (m.address || '').split(' ');
      const district = parts[1] || parts[0];
      if (district && district.length <= 6) {
        set.add(district);
      }
    });
    return ['전체', ...Array.from(set).sort()];
  }, [markets]);

  // Filter markets by sub-region and today-only status
  const filtered = useMemo(() => {
    return markets.filter(m => {
      if (onlyToday && !m.isToday) return false;
      if (selectedSubRegion !== '전체') {
        const parts = (m.address || '').split(' ');
        const district = parts[1] || parts[0];
        if (district !== selectedSubRegion) return false;
      }
      return true;
    });
  }, [markets, selectedSubRegion, onlyToday]);

  return (
    <div className="space-y-6">
      {/* Sub-Region Quick Filter Chips */}
      <div className="bg-gray-50/80 border border-gray-200/60 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-extrabold text-gray-800 flex items-center gap-1.5">
            📍 시/군/구 별 1초 세부 필터링:
          </span>
          <button
            onClick={() => setOnlyToday(!onlyToday)}
            className={`text-xs px-3 py-1.5 rounded-xl font-extrabold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
              onlyToday 
                ? 'bg-[#FF5A1F] text-white shadow-sm ring-2 ring-[#FF5A1F]/30' 
                : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-300'
            }`}
          >
            🔥 오늘 개장만 보기
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {subRegions.map(sub => (
            <button
              key={sub}
              onClick={() => setSelectedSubRegion(sub)}
              className={`text-xs px-3 py-2 min-h-[44px] rounded-xl font-extrabold transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
                selectedSubRegion === sub
                  ? 'bg-[#10B981] text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)] font-black'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Markets Count Overview */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs sm:text-sm text-gray-500 font-bold">
        <span>
          {selectedSubRegion === '전체' ? `${regionName} 오일장 목록` : `${selectedSubRegion} 오일장 목록`}
        </span>
        <span className="text-[#10B981] font-extrabold">총 {filtered.length}개 발견</span>
      </div>

      {/* Markets Grid List */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((market) => (
          <div
            key={market.id}
            className="bg-white p-5 rounded-2xl border border-gray-200/80 hover:border-[#10B981]/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4 shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-black text-gray-900 text-base sm:text-lg hover:text-[#10B981] transition-colors">
                  <Link href={`/market/${market.id}`}>
                    {market.market_name}
                  </Link>
                </h3>
                {market.isToday ? (
                  <span className="bg-[#FF5A1F] text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-extrabold shadow-sm animate-pulse whitespace-nowrap">
                    🔥 오늘 개장!
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-600 text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-bold whitespace-nowrap">
                    {market.daysUntil === -1 ? '일정 확인' : `앞으로 ${market.daysUntil}일 남음`}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                📍 {market.address}
              </p>

              <div className="flex items-center gap-3 pt-1 text-xs">
                <span className="bg-emerald-50 text-[#10B981] border border-emerald-100 px-2.5 py-1 rounded-lg font-extrabold">
                  🗓️ 매월 {market.opening_cycle}
                </span>
                {market.parking_yn === 'Y' && (
                  <span className="text-gray-500 font-bold">
                    🚗 주차장 보유
                  </span>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">
                {market.food_recommend ? `🍲 ${market.food_recommend.slice(0, 16)}...` : '전통시장 현지 맛집'}
              </span>
              <Link
                href={`/market/${market.id}`}
                className="bg-emerald-50 hover:bg-[#10B981] text-[#10B981] hover:text-white font-extrabold text-xs px-3.5 py-2 rounded-xl border border-emerald-200/80 hover:border-[#10B981] transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
              >
                자세히 보기 &rarr;
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
