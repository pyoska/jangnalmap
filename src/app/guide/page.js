import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: '오일장 이용 가이드 | 장날맵',
  description: '전통 5일장의 날짜 주기 계산법, 주차 요령 및 장날 쇼핑 시 필수 꿀팁을 전수하는 백서 가이드 페이지입니다.',
  alternates: {
    canonical: 'https://jangnalmap.com/guide',
  },
  openGraph: {
    title: '오일장 이용 가이드 | 장날맵',
    description: '전통 5일장의 날짜 주기 계산법, 주차 요령 및 장날 쇼핑 시 필수 꿀팁을 전수하는 백서 가이드 페이지입니다.',
    url: 'https://jangnalmap.com/guide',
    type: 'website',
  },
};

const GUIDE_POSTS = [
  {
    slug: 'onnuri',
    title: '1. 모바일 온누리상품권 사용처 총정리 & 10% 충전 할인법',
    description: '지류(종이) 상품권보다 훨씬 간편한 카드형/모바일 온누리상품권의 가입 방법, 가맹점 조회법, 연말정산 소득공제 40% 적용 및 10% 특별 선할인 구매 방법을 상세 설명합니다.',
    category: '금융/할인 꿀팁',
    readTime: '4분',
    badge: '🔥 인기 고단가'
  },
  {
    slug: 'parking',
    title: '2. 초보자를 위한 전통 5일장 주차 안심 이용법 & 접촉사고 대처 요령',
    description: '장터 날 주차 혼잡을 영리하게 우회하는 인근 무료 공영주차장 확보 팁, 주차 요금 감면 대상 및 좁은 시장길 교통사고 시 긴급 자동차 보험 처리 대응 순서를 전수합니다.',
    category: '주차/안전 가이드',
    readTime: '3.5분',
    badge: '🚗 운전자 필수'
  },
  {
    slug: 'recommend',
    title: '3. 에디터 추천! 이번 주말 꼭 가봐야 할 수도권 전통 오일장 5대 코스',
    description: '대중교통으로 가기 편하고 제철 먹거리가 넘치는 대표 5일장(성남 모란시장, 가평 잣고을시장, 양평 물맑은시장)의 일정 정보와 나들이 연계 힐링 코스를 제안합니다.',
    category: '여행/로컬 명소',
    readTime: '5분',
    badge: '🌿 힐링 추천'
  }
];

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
          <p className="text-sm text-gray-500 font-semibold">
            전국의 오일장을 100% 즐길 수 있도록 전문가들이 작성한 정보성 아티클 모음입니다. 상세 내용을 클릭하여 읽어보세요.
          </p>
        </div>

        {/* Guide Article Card List */}
        <section className="space-y-6">
          {GUIDE_POSTS.map((post) => (
            <div key={post.slug} className="group relative border border-gray-200/80 bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-emerald-500/35 transition-all duration-300">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="text-[10px] bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-md">
                  {post.category}
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-extrabold px-2 py-0.5 rounded-md">
                  {post.badge}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold ml-auto">
                  읽는 시간: {post.readTime}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 group-hover:text-[#10B981] transition-colors leading-snug">
                <Link href={`/guide/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-gray-500 font-semibold leading-relaxed">
                {post.description}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                <Link 
                  href={`/guide/${post.slug}`} 
                  className="text-xs font-bold text-[#10B981] hover:text-[#059669] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  기사 읽어보기 →
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
