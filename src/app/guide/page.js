import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: '오일장 이용 가이드 | 장날맵',
  description: '전통 5일장의 날짜 주기 계산법, 주차 요령 및 장날 쇼핑 시 필수 꿀팁을 전수하는 백서 가이드 페이지입니다.',
};

export default function GuidePage() {
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
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-12 flex flex-col gap-8">
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider block">장터 초보자를 위한 교과서</span>
          <h1 className="text-3xl font-extrabold text-gray-900 border-b border-gray-150 pb-4">전통 오일장 완벽 이용 백서</h1>
        </div>

        <section className="space-y-6 text-sm text-gray-600 leading-relaxed font-medium">
          <h2 className="text-lg font-bold text-gray-900">1. 오일장 날짜 주기(장날) 이해하기</h2>
          <p>
            우리나라의 전통 5일장은 보통 **일의 자리 날짜**를 기준으로 5일마다 열리는 주기법을 가지고 있습니다.
            예를 들어 개설 주기가 **&apos;2일, 7일&apos;**로 표기된 시장은 매달 **2일, 7일, 12일, 17일, 22일, 27일**에 어김없이 장이 열려요.
            만약 개설 주기가 **&apos;5일, 10일&apos;**인 장터는 매달 **5일, 10일, 15일, 20일, 25일, 30일(또는 31일)**에 개설된답니다.
            단, 매달 말일이 31일인 경우에는 31일에 장이 열리고 다음 달 5일에 장이 이어서 열리는 식으로 간격이 5일로 유지되니 이 점 참고하세요!
          </p>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 space-y-3 shadow-sm">
            <h3 className="font-bold text-[#10B981] text-base">💡 전통 오일장 100% 즐기는 에디터 추천 코스</h3>
            <p className="text-xs sm:text-sm text-gray-750 leading-relaxed font-semibold">
              전통시장은 오전 9시부터 오후 3시 사이가 가장 활기가 넘칩니다! 신선한 농산물과 갓 튀긴 핫바, 부꾸미, 국밥 등을 맛보기 위해 아침 일찍 빈속으로 방문해 시장 음식으로 아침 겸 점심을 해결하는 테마 투어를 추천해요.
            </p>
          </div>

          <h2 className="text-lg font-bold text-gray-900 pt-4">2. 주차 및 대중교통 이용 요령</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>무료 및 공영주차장 사전 파악:</strong> 오일장 당일에는 시장 근처 도로변이 불법 주정차와 인파로 매우 혼잡해요. 장날맵의 주차 팁에서 안내하는 주변 공영주차타워나 임시 운동장 주차장을 500m 이전에 네비게이션에 치고 방문하시는 것을 강히 권장합니다.</li>
            <li><strong>지하철 및 열차 연계 활용:</strong> 성남 모란장(모란역 8호선/수인분당선), 김포 북변5일장(걸포북변역 골드라인), 정선 오일장(정선아리랑열차) 등 기차나 전철이 연계된 장터들은 교통 체증과 주차 지옥을 피하기 위해 도보 전철 여행을 활용하시는 편이 훨씬 이득입니다.</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 pt-4">3. 소유자 필수 쇼핑 상식</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>온누리상품권 사용하기:</strong> 모바일 및 카드형 온누리상품권은 평시에도 **10% 할인 충전 혜택**을 받을 수 있고, 연말정산 시 **전통시장 소득공제 40%**가 적용되어 지출을 대폭 아낄 수 있어요.</li>
            <li><strong>현금 및 장바구니 챙기기:</strong> 최근 많은 노점에서도 카드나 계좌이체를 받지만, 빠른 잔돈 계산과 간편한 결제를 위해 소액의 현금(천원, 오천원 권)을 미리 현금인출기에서 찾아가시면 훨씬 신속하게 물건을 살 수 있어요. 또한 비닐봉지 사용을 줄이기 위해 시장 전용 에코백이나 캐리어를 챙기시면 더욱 센스 만점입니다!</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
