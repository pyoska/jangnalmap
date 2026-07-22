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

        <section className="space-y-8 text-sm text-gray-600 leading-relaxed font-medium">
          {/* Article 1 */}
          <div className="space-y-3.5">
            <h2 className="text-xl font-extrabold text-gray-900">1. 온누리상품권 10% 선할인 충전 및 소득공제 40% 활용 가이드</h2>
            <p>
              전통시장에서 알뜰하고 똑똑하게 지출을 절약하는 가장 강력한 무기는 바로 **모바일 및 카드형 온누리상품권**입니다. 
              온누리상품권은 중소벤처기업부와 소상공인시장진흥공단에서 발행하는 전통시장 전용 상품권으로, 소비자는 평상시에도 **10% 할인된 가격**으로 상품권을 충전할 수 있는 상시 혜택을 제공받습니다. 
              즉, 10만 원어치의 상품권을 단돈 9만 원에 구매하여 전국 오일장 가맹 노점과 점포에서 현금과 동일한 가치로 즉시 결제할 수 있는 강력한 재테크 도구입니다.
            </p>
            <p>
              특히 직장인 신용카드 소득공제 혜택 면에서도 대단히 유리합니다. 신용카드나 체크카드를 모바일 온누리상품권 앱에 연동하여 전통시장에서 결제할 경우, 일반 신용카드 소득공제율(15%)의 2배가 훨씬 넘는 **40%의 소득공제율**이 그대로 적용됩니다. 
              여기에 연말정산 시 전통시장 추가 공제 한도 100만 원 혜택이 별도로 추가 계산되므로, 7월 여름철 휴가철을 맞이하여 부모님과 함께 전국의 전통시장을 방문해 지출하는 생활비와 찬거리 쇼핑 비용을 대폭 환급금으로 돌려받을 수 있는 비결입니다. 
              지류(종이) 상품권과 달리 분실 우려가 없고, 카드 등록 한 번으로 평소 쓰던 신용카드로 결제하면서도 전통시장 특별 실적 혜택까지 중복 수령할 수 있으니 장터 방문 전 앱 마켓에서 반드시 충전하시는 것을 강력히 권장합니다.
            </p>
          </div>

          {/* Article 2 */}
          <div className="space-y-3.5 pt-6 border-t border-gray-150">
            <h2 className="text-xl font-extrabold text-gray-900">2. 초보자를 위한 전통 5일장 주차 안심 이용법 및 접촉사고 대처 요령</h2>
            <p>
              많은 초보 운전자들이 오일장 나들이를 망설이는 가장 큰 이유는 바로 극심한 주차 혼잡과 좁은 골목길에서의 접촉사고 리스크 때문입니다. 
              5일장이 서는 날에는 전국 각지에서 모여든 보부상들의 노점 차량과 장보기 차량이 시장 중심가 도로변을 빽빽하게 메워 옴짝달싹하기 어려운 혼잡이 연출됩니다. 
              이를 예방하는 첫 번째 룰은 **'시장 중심가 진입 금지'**입니다. 차량 네비게이션에 시장 이름 자체를 목적지로 설정하고 진입하면 혼잡 구간에 갇히게 되므로, 시장에서 약 300~500m 이격된 인근 공영주차장이나 임시 개방 관공서 운동장, 천변 공영주차장을 목적지로 설정해 우회 접근해야 안전합니다.
            </p>
            <p>
              만약 시장 주변 갓길이나 공영주차장 진·출입로에서 예기치 못한 경미한 접촉사고가 발생했다면 당황하지 말고 즉시 비상등을 켜고 블랙박스 메모리 영상을 확보하는 것이 우선입니다. 
              일반 도로와 달리 노점 주변은 통행 차량과 보행자가 얽혀 있어 과실 비율 산정이 복잡하므로 현장 사진을 다각도로 촬영한 후 차량을 안전 구역으로 이동시켜야 2차 체증 및 보행자 추가 사고를 방지할 수 있습니다. 
              사고 대처 요령으로 의무 가입된 **자동차 보험**사의 긴급출동 서비스를 호출해 즉시 정합성 대처를 받고 과실 상계 비율 합의를 위임하는 것이 불필요한 현장 실랑이와 보험 할증 비용을 막는 가장 정석적인 방법입니다.
            </p>
          </div>

          {/* Article 3 */}
          <div className="space-y-3.5 pt-6 border-t border-gray-150">
            <h2 className="text-xl font-extrabold text-gray-900">3. 에디터 추천! 이번 여름 꼭 가봐야 할 전국 3대 전통 오일장 힐링 코스</h2>
            <p>
              단순히 장을 보는 것을 넘어 지역 고유의 문화와 먹거리, 주변 힐링 풍경을 동시에 즐길 수 있는 대한민국 대표 오일장 코스 3곳을 소개합니다. 
              첫째는 경기도 성남의 **모란 5일장 (4일, 9일 주기)**입니다. 도심 속 대규모 전통 재래시장의 원형을 그대로 간직한 곳으로, 지하철 수인분당선과 8호선 모란역 역세권에 자리 잡아 대중교통 접근성이 타의 추종을 불허합니다. 
              고소하게 직접 짜내어 연신 김을 뿜는 가마솥 참기름 골목과 즉석에서 반죽을 빚어 구워내는 핫바, 푸짐한 칼국수 먹거리 골목은 도심 당일치기 여행 코스로 제격입니다.
            </p>
            <p>
              둘째는 강원도 정선의 **정선 아리랑시장 (2일, 7일 주기)**입니다. 맑은 동강 물줄기가 흐르는 정선 산골짜기에서 상인들이 정성껏 채취한 곤드레나물, 황기, 더덕 등 영양가 높은 약초와 나물류가 가득합니다. 
              서울 청량리역에서 출발하는 정선아리랑열차(A-train)를 타고 차 밀림 없이 철도 도보 여행으로 닿을 수 있어 힐링 친화적인 매력을 선사하며, 메밀전병과 수수부꾸미, 콧등치기 국수로 대표되는 정선 고유의 향토 식단을 정갈하게 만날 수 있습니다. 
              셋째는 경기도 양평의 **양평 물맑은시장 (3일, 8일 주기)**으로, 경의중앙선 양평역 바로 앞에 서는 강변 장터입니다. 남한강 자전거 길과 연계되어 주말 나들이 라이더들과 가족 단위 피서객이 7월 제철 옥수수와 수제 도넛을 사 먹으며 강바람을 쐬기 좋은 수도권 최고의 주말 오일장 코스로 추천합니다.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
