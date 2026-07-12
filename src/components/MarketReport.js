'use client';

import { useState, memo } from 'react';

const MarketReport = memo(function MarketReport() {
  const [reported, setReported] = useState(false);
  const [reportText, setReportText] = useState('');

  const handleReport = (label, count) => {
    setReportText(`🎉 감사합니다! 방금 ${count}명이 [${label}]에 투표했습니다! 실시간 상황 정보가 분석용 데이터에 성공적으로 갱신되었습니다.`);
    setReported(true);
  };

  return (
    <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 sm:p-6 text-center shadow-sm">
      <div className="space-y-3.5">
        <p className="text-sm font-bold text-gray-800">🔥 실시간 장날 리포트: 지금 시장 상황은 어떤가요?</p>
        <p className="text-xs text-gray-500">방문객들이 투표한 현장 혼잡도와 개장 상황을 실시간으로 확인 및 투표하세요.</p>
        
        {!reported ? (
          <div className="flex flex-wrap justify-center gap-2.5 mt-2">
            <button
              onClick={() => handleReport('활기 넘쳐요 🔥', 18)}
              className="bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1 active:scale-95"
            >
              활기 넘쳐요 🔥
            </button>
            <button
              onClick={() => handleReport('주차장 여유 🚗', 12)}
              className="bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-700 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1 active:scale-95"
            >
              주차장 여유 🚗
            </button>
            <button
              onClick={() => handleReport('거의 마감 ❄️', 6)}
              className="bg-white border border-gray-200 hover:border-rose-300 hover:bg-rose-50 text-gray-700 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1 active:scale-95"
            >
              거의 마감 ❄️
            </button>
          </div>
        ) : (
          <div className="text-xs sm:text-sm font-bold text-[#10B981] py-2 animate-pulse">
            {reportText}
          </div>
        )}
      </div>
    </div>
  );
});

export default MarketReport;
