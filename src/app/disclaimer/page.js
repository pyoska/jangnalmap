import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: '면책조항 | 장날맵',
  description: '장날맵 서비스의 법적 책임 한계 및 면책 고지 안내 페이지입니다.',
  alternates: {
    canonical: 'https://jangnalmap.com/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col antialiased">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#10B981] to-[#FF5A1F] bg-clip-text text-transparent">
            장날맵.com
          </Link>
          <Link href="/" className="text-xs text-gray-500 hover:text-[#10B981] transition-colors bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-200/60 font-semibold shadow-sm">
            홈으로 가기
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-12 flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold text-gray-900 border-b border-gray-150 pb-4">법적 책임 한계 및 면책 고지</h1>
        
        <p className="text-sm text-gray-500 font-medium">작성일자: 2026년 7월 10일</p>

        <section className="space-y-5 text-sm text-gray-600 leading-relaxed">
          <p>
            장날맵 서비스는 공공데이터 및 온라인 공개 정보를 토대로 일반 대중에게 단순 여행/쇼핑 정보 가이드 목적으로 구축된 비영리/정보 공유용 사이트입니다. 서비스 이용 시 아래 명시된 법적 고지사항을 확인하시기 바랍니다.
          </p>

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-[#FF5A1F] text-base">⚠️ 꼭 확인해 주세요! (책임 한계 고지)</h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              본 웹사이트가 제공하는 지리 정보, 도로명 주소, 개장 날짜 주기(장날), 주차 가능 여부, 연락처 등의 모든 세부 데이터는 공공데이터 제공 기관의 사정 및 각 재래시장 내부 협의체 결정을 실시간으로 100% 실시간 반영하지 못할 수 있습니다.
            </p>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              폭우, 태풍, 폭설 등의 기상 악화 상황, 명절 연휴 일정 조율, 지자체 공사 등의 현지 이벤트 등으로 인해 특정 장날에 오일장이 열리지 않거나 주차장이 폐쇄될 수 있습니다.
            </p>
          </div>

          <h2 className="text-lg font-bold text-gray-900 pt-4">1. 실제 방문 시 사전 확인 권장</h2>
          <p>
            이용자는 장날맵 정보를 토대로 한 실제 먼 거리 이동 혹은 단체 방문 시, 오차가 발생할 위험을 예방하기 위해 방문 당일 또는 전일 해당 시장 상인회나 담당 지자체(시청/군청 전통시장 담당부서)에 반드시 전화를 걸어 당일 개장 상황을 유선 확인하시기를 거듭 당부드립니다.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-4">2. 책임 면제 사항</h2>
          <p>
            본 웹사이트의 정보 오류, 누락, 지연 또는 해당 정보를 신뢰함으로써 발생한 여비 낭비, 시간적 손해, 영업상의 유무형적 어떠한 피해에 대해서도 장날맵 및 개발진은 어떠한 법률적, 행정적 책임을 지지 않음을 선언합니다.
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
