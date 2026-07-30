'use client';

import Link from 'next/link';

export default function MobileNav() {
  return (
    <nav 
      aria-label="모바일 하단 빠른 네비게이션"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-2 py-2 flex items-center justify-around text-center select-none"
    >
      <Link 
        href="/"
        className="flex flex-col items-center gap-1 text-gray-700 hover:text-[#10B981] active:scale-95 transition-all min-w-[56px] min-h-[48px] justify-center"
      >
        <span className="text-lg leading-none">🏠</span>
        <span className="text-[10px] font-extrabold">홈으로</span>
      </Link>

      <Link 
        href="/#map-section"
        className="flex flex-col items-center gap-1 text-orange-600 hover:text-orange-700 active:scale-95 transition-all min-w-[56px] min-h-[48px] justify-center"
      >
        <span className="text-lg leading-none animate-pulse">🔥</span>
        <span className="text-[10px] font-black">오늘 장</span>
      </Link>

      <Link 
        href="/#region-filter-section"
        className="flex flex-col items-center gap-1 text-emerald-600 hover:text-emerald-700 active:scale-95 transition-all min-w-[56px] min-h-[48px] justify-center"
      >
        <span className="text-lg leading-none">🗺️</span>
        <span className="text-[10px] font-extrabold">지역 검색</span>
      </Link>

      <Link 
        href="/guide"
        className="flex flex-col items-center gap-1 text-gray-700 hover:text-[#10B981] active:scale-95 transition-all min-w-[56px] min-h-[48px] justify-center"
      >
        <span className="text-lg leading-none">📚</span>
        <span className="text-[10px] font-extrabold">이용 꿀팁</span>
      </Link>
    </nav>
  );
}
