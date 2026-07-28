import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: '서비스 소개 및 운영 정책 | 장날맵',
  description: '대한민국 1,300여 개 전통 오일장 지도를 발로 뛰며 검증하는 전문 아카이브 포털, 장날맵의 운영진 및 편집 데이터 검증 정책입니다.',
  alternates: {
    canonical: 'https://jangnalmap.com/about',
  },
  openGraph: {
    title: '서비스 소개 및 운영 정책 | 장날맵',
    description: '대한민국 1,300여 개 전통 오일장 지도를 발로 뛰며 검증하는 전문 아카이브 포털, 장날맵의 운영진 및 편집 데이터 검증 정책입니다.',
    url: 'https://jangnalmap.com/about',
    type: 'website',
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "장날맵 아카이브 편집국",
      "url": "https://jangnalmap.com/about",
      "founder": {
        "@type": "Person",
        "name": "장날맵 대표 에디터",
        "jobTitle": "전통시장 검증 전문가",
        "url": "https://jangnalmap.com/about",
        "knowsAbout": ["전통시장", "5일장", "국내여행", "지역경제"]
      },
      "description": "대한민국 1,300여 개 전통 오일장 지도를 발로 뛰며 검증하는 전문 아카이브 포털"
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
          <h1 className="text-3xl font-extrabold text-gray-900 border-b border-gray-150 pb-4">장날맵.com 소개 & 운영 정책</h1>
        </div>

        <section className="space-y-6 text-sm text-gray-600 leading-relaxed font-medium">
          <p className="text-base text-gray-900 font-extrabold leading-relaxed">
            안녕하세요! 전국 방방곡곡 장터의 사람 냄새에 푹 빠져버린 '찐' 오일장 마니아들의 모임, 장날맵입니다. 
          </p>
          
          <p>
            어릴 적 엄마 손 잡고 쫄래쫄래 따라가서 얻어먹던 핫바 한 입, 지글지글 부쳐내는 전 냄새… 오일장은 저한테 그냥 장보는 곳이 아니라 왁자지껄한 놀이공원이었거든요. 그런데 막상 차 끌고 가려니 “오늘 장 서는 날 맞나?”, “주차는 대체 어디에 해?” 물어볼 곳도 없고 매번 헛걸음치기 일쑤라 답답해서 제가 직접 만들었습니다!
          </p>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 space-y-3 shadow-sm">
            <h3 className="font-bold text-[#10B981] text-base">📊 대한민국 최대 수준의 1,300+ 전통 오일장 데이터베이스</h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
              딱딱한 공공데이터는 기본! 거기에 제가 전국 오일장을 싸돌아다니며 두 발로 건져 올린 진짜배기 꿀팁(비밀 주차 명당, 버스 노선, 장보고 가기 딱 좋은 근처 힙한 카페)까지 싹 다 긁어모아 지도 위에 꾹꾹 눌러 담았습니다.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-gray-900 text-base">👥 운영 주체 및 데이터 검증 철학 (E-E-A-T)</h3>
            <div className="space-y-2 text-xs sm:text-sm text-gray-600 font-semibold">
              <p>
                • <strong>운영 주체:</strong> 장날맵 아카이브 편집국 (대표 문의: support@jangnalmap.com)
              </p>
              <p>
                • <strong>데이터 검증 출처:</strong> 소상공인시장진흥공단 공공데이터, 17개 지자체 오일장 개설 고시, Open-Meteo 기상청 API
              </p>
              <p>
                • <strong>콘텐츠 신뢰성 선언:</strong> 장날맵은 사용자의 혼선을 방지하기 위해 가짜 리뷰나 보상성 광고 평가를 엄격히 금지하며, 오직 검증된 시장 주기 및 주차/교통 사실 정보만을 제공합니다.
              </p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-900 pt-4">우리가 추구하는 가치</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>진짜 열려? 맞춤 확인:</strong> 복잡한 5일장 주기, 저희가 다 계산해서 오늘 당장 갈 수 있는지 딱 알려드려요!</li>
            <li><strong>동네 시장 살리기:</strong> 대형마트에 밀리는 우리 동네 시장들, 그리고 골목골목 숨은 매력적인 가게들을 팍팍 밀어줍니다.</li>
            <li><strong>계절별 먹거리 추천:</strong> 제철 맞은 초당옥수수, 꿀수박부터 시장통 즉석 핫바까지! 젊은 분들도 푹 빠질 전통시장의 낭만을 쏙쏙 골라 전해드려요.</li>
          </ul>

          <p className="pt-4 border-t border-gray-150">
            앞으로도 장날맵은 전국의 장터 여행자분들에게 가장 믿을 수 있고 풍성한 5일장 꿀팁을 전하기 위해 쉼 없이 전국의 국도를 달리겠습니다. 발걸음마다 옛 장터의 따스한 정취가 묻어나는 장보기 여행을 장날맵과 함께 즐겨보세요!
          </p>

          {/* E-E-A-T Editorial Team Profile */}
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 space-y-3 shadow-sm mt-8">
            <h3 className="font-extrabold text-emerald-950 text-base flex items-center gap-2">
              ✍️ 작성자 : 장날맵 (Editorial Team & E-E-A-T)
            </h3>
            <div className="flex items-center gap-4 mt-2">
              <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-2xl font-black shrink-0 shadow-md">
                🏃
              </div>
              <div>
                <p className="font-extrabold text-gray-900 text-sm">작성자 : 장날맵 (전통 오일장 전문 팀)</p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  전국 1,300여 개 오일장을 직접 둘러보며 검증된 날짜 주기, 주차 환경, 대중교통 노선 및 제철 특산물 데이터를 팩트체크하여 기록합니다. 대형 마트와 다른 오일장 고유의 낭만을 100% 리얼 정보로 전달합니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
