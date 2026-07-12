import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: '서비스 소개 | 장날맵',
  description: '대한민국 1,300여 개 전통 오일장 지도를 발로 뛰며 검증하는 전문 아카이브 포털, 장날맵의 이야기입니다.',
};

export default function AboutPage() {
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
          <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider block">우리의 역사와 가치</span>
          <h1 className="text-3xl font-extrabold text-gray-900 border-b border-gray-150 pb-4">장날맵.com 소개</h1>
        </div>

        <section className="space-y-6 text-sm text-gray-600 leading-relaxed font-medium">
          <p className="text-base text-gray-900 font-extrabold leading-relaxed">
            안녕하세요! 전국의 구석구석 정겨운 냄새가 물씬 풍기는 오일장을 찾아다니는 장터 전문 에디터들로 구성된 장날맵 제작진입니다. 
          </p>
          
          <p>
            우리가 어릴 적 부모님 손을 잡고 걷던 오일장은 단순한 물건 교환의 장소를 넘어 이웃의 따스한 정과 맛있는 핫바, 부쳐내는 전 냄새가 가득한 삶의 축제 공간이었어요. 하지만 바쁜 현대 생활 속에서 “오늘이 무슨 장날이지?”, “주차는 어디에 해야 하지?”라는 궁금증을 한 번에 해소해 줄 통합 정보 채널이 턱없이 부족하다는 사실을 깨달았답니다.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 space-y-3 shadow-sm">
            <h3 className="font-bold text-[#10B981] text-base">📊 대한민국 최대 수준의 1,300+ 전통 오일장 데이터베이스</h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
              장날맵은 공공데이터포털(data.go.kr)의 전국전통시장표준데이터를 원천 소스로 확보하고, 여기에 현지 에디터들이 직접 밟아 수집한 지역 주차 팁과 대중교통 이용법, 주변 뉴트로 카페 및 세계문화유산 등 연계 관광 코스 정보까지 하나하나 검수하여 매핑한 전통시장 전문 아카이브 포털입니다.
            </p>
          </div>

          <h2 className="text-lg font-bold text-gray-900 pt-4">우리가 추구하는 가치</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>정보의 정확성:</strong> 전국 1,300여 개 시장의 5일 주기를 연동해 오늘 방문할 수 있는 시장인지 실시간으로 판별해 드립니다.</li>
            <li><strong>지역 소상공인과의 상생:</strong> 대형 마트와 쇼핑몰에 밀려 잊혀가는 동네 재래시장과 인근의 아기자기한 카페들을 유저에게 소개하여 풀뿌리 지역 경제 활성화에 기여합니다.</li>
            <li><strong>문화 보존 및 큐레이션:</strong> 제철 맞은 여름 특산물(초당옥수수, 수박, 자두 등)과 오일장에서 즐길 수 있는 특산 먹거리를 큐레이션하여 젊은 세대에게 전통시장의 낭만을 전합니다.</li>
          </ul>

          <p className="pt-4 border-t border-gray-150">
            앞으로도 장날맵은 전국의 장터 여행자분들에게 가장 믿을 수 있고 풍성한 5일장 꿀팁을 전하기 위해 쉼 없이 전국의 국도를 달리겠습니다. 발걸음마다 옛 장터의 따스한 정취가 묻어나는 장보기 여행을 장날맵과 함께 즐겨보세요!
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
