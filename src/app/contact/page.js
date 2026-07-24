'use client';

import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#060913] text-[#F3F4F6] flex flex-col antialiased">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#060913]/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#10B981] to-[#FF5A1F] bg-clip-text text-transparent">
            장날맵.com
          </Link>
          <Link href="/" className="text-xs text-gray-400 hover:text-[#10B981] transition-colors bg-gray-950 px-3.5 py-2 rounded-xl border border-gray-800 font-semibold shadow-sm">
            홈으로 가기
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-16 flex flex-col gap-8 justify-center">
        <div className="space-y-3.5 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">문의 및 정보 제보</h1>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-md mx-auto">
            장날맵은 전통 오일장 방문자분들의 정확한 정보 공유를 지향합니다. 장날 변경 제보, 주차 정보 보완 등 모든 문의 사항은 공식 메일로 상시 접수하고 있습니다.
          </p>
        </div>

        {/* Support Card */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-8 flex flex-col items-center gap-6 text-center shadow-lg backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl">
            📧
          </div>
          
          <div className="space-y-1.5">
            <span className="block font-black text-white text-lg">공식 이메일 접수처</span>
            <span className="text-gray-400 text-sm font-medium">support@jangnalmap.com</span>
          </div>

          <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
            문의 및 제보해 주신 내용은 에디터가 현장 확인 및 지자체 조회를 거쳐 영업일 기준 1~2일 내로 지도상에 정확하게 반영해 드립니다.
          </p>

          <a 
            href="mailto:support@jangnalmap.com?subject=%5B%EC%9E%A5%EB%82%A0%EB%A7%B5%20%EC%A0%9C%EB%B3%B4%2F%EB%AC%B8%EC%9D%98%5D" 
            className="w-full sm:w-auto bg-[#10B981] hover:bg-[#059669] text-white font-extrabold px-8 py-3.5 rounded-2xl transition-all shadow-[0_8px_24px_rgba(16,185,129,0.2)] text-sm cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            이메일 작성하기 &rarr;
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-850 bg-gray-950 py-8 text-center text-xs text-gray-500">
        <p className="font-bold text-gray-400 mb-2">장날맵.com — 전국 전통 오일장 지도</p>
        <p>© 2026 jangnalmap.com. All rights reserved.</p>
      </footer>
    </div>
  );
}
