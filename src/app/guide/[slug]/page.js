import Link from 'next/link';
import Footer from '@/components/Footer';

const ARTICLES = {
  'onnuri': {
    title: '모바일 온누리상품권 사용처 가맹점 총정리 & 10% 충전 할인법 | 장날맵',
    seoTitle: '모바일 온누리상품권 사용처 가맹점 총정리 & 10% 충전 할인법 | 장날맵',
    description: '충전식 카드형 모바일 온누리상품권 가입 구매 방법, 10% 특별 선할인 팁 및 전통시장 연말정산 소득공제 40% 적용 혜택 완벽 해설.',
    category: '금융/할인 꿀팁',
    date: '2026.07.24',
    readTime: '4분',
    contentHtml: `
      <div class="space-y-6">
        <p class="text-base text-gray-700 leading-relaxed">
          전통시장에서 알뜰하고 똑똑하게 지출을 절약하는 가장 강력한 무기는 바로 <strong>모바일 및 카드형 온누리상품권</strong>입니다. 온누리상품권은 중소벤처기업부와 소상공인시장진흥공단에서 발행하는 전통시장 전용 상품권으로, 소비자는 평상시에도 <strong>10% 할인된 가격</strong>으로 상품권을 충전할 수 있는 특별한 상시 혜택을 제공받습니다.
        </p>
        <p class="text-base text-gray-700 leading-relaxed">
          즉, 10만 원어치의 상품권을 단돈 9만 원에 계좌 충전식으로 구매하여 전국 오일장 가맹 노점과 전통시장 상점가 점포에서 현금과 동일한 가치로 즉시 결제할 수 있는 강력한 재테크 생활 팁입니다.
        </p>

        <div class="bg-emerald-50 border-l-4 border-[#10B981] p-4.5 rounded-r-2xl my-6">
          <h4 class="text-sm font-extrabold text-emerald-950 mb-1">💡 온누리상품권 핵심 요약 (소득공제 40%)</h4>
          <p class="text-xs text-emerald-800 leading-relaxed">
            모바일 온누리상품권 앱에 본인이 사용하던 신용카드나 체크카드를 연동해 결제할 경우, 일반 신용카드 소득공제율(15%)의 2배가 넘는 <strong>40%의 소득공제율</strong>이 그대로 자동 적용됩니다.
          </p>
        </div>

        <h3 class="text-lg font-bold text-gray-900 mt-8 mb-3">1. 모바일 온누리상품권 가입 및 10% 할인 구매처</h3>
        <p class="text-base text-gray-700 leading-relaxed">
          과거에는 은행 지점에 직접 방문해 종이(지류) 상품권을 신분증을 지참하고 현금으로 사야 하는 불편함이 있었습니다. 하지만 최근 출시된 '온누리상품권 앱'을 다운로드하면 스마트폰에서 본인 명의 계좌 등록 후 즉시 10% 할인율로 간편하게 충전할 수 있습니다.
        </p>
        <p class="text-base text-gray-700 leading-relaxed">
          소비자가 평소 사용 중이던 신용카드/체크카드를 앱에 등록해 두고, 시장 결제 시 해당 카드로 긁기만 하면 사전에 할인 충전해 둔 온누리 잔액에서 먼저 빠져나가는 방식입니다. 카드 실적과 전통시장 특별 적립 실적까지 동시에 쌓이므로 가장 합리적인 결제 수단입니다.
        </p>

        <h3 class="text-lg font-bold text-gray-900 mt-8 mb-3">2. 사용처(가맹점) 확인 요령 및 제한 업종</h3>
        <p class="text-base text-gray-700 leading-relaxed">
          전통시장 구역 내에 위치해 있더라도 개별 상인이 온누리상품권 가맹점 등록을 마쳐야 결제가 가능합니다. 전국 전통시장의 가맹 등록 비율은 85% 이상에 달하지만, 노점상이나 영세 업체의 경우 카드 결제 단말기가 없는 경우가 있으므로 다음 방식으로 사용처를 확인하시는 것을 추천합니다.
        </p>
        <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm my-4">
          <li><strong>공식 사이트(onnuri.gift) 조회:</strong> 모바일/PC 웹에서 전통시장 이름 및 가맹점명을 직접 검색할 수 있습니다.</li>
          <li><strong>디지털온누리 앱 지도 검색:</strong> GPS 정보를 기반으로 사용자 주변의 온누리상품권 사용처 점포를 지도 위에 가시적으로 띄워 줍니다.</li>
          <li><strong>제한 사항:</strong> 사행성 업종, 금융업, 일반 입시 학원, 대기업 계열 브랜드 매장 등은 사용이 불가합니다. 단, 일반 식당, 정육점, 청과물점 등 생활 밀착형 점포에서는 자유롭게 사용 가능합니다.</li>
        </ul>
      </div>
    `
  },
  'parking': {
    title: '전통 5일장 주차 안심 이용법 & 사고 대처 요령 | 장날맵',
    seoTitle: '전통 5일장 주차 안심 이용법 & 사고 대처 요령 | 장날맵',
    description: '전국 오일장 전통시장 방문 시 주차 꿀팁, 시장 인근 공영주차장 요금 감면 대상 및 경미한 차량 접촉사고 대처 자동차 보험 활용 가이드.',
    category: '주차/안전 가이드',
    date: '2026.07.24',
    readTime: '3.5분',
    contentHtml: `
      <div class="space-y-6">
        <p class="text-base text-gray-700 leading-relaxed">
          많은 초보 운전자들이 오일장 나들이를 망설이는 가장 큰 이유는 바로 극심한 주차 혼잡과 좁은 골목길에서의 차량 정체 때문입니다. 5일장이 서는 날에는 전국 각지에서 모여든 보부상들의 노점 트럭과 장보기 고객들의 차량이 시장 중심가 도로변을 가득 채워 주차 전쟁이 연출되곤 합니다.
        </p>

        <div class="bg-orange-50 border-l-4 border-orange-500 p-4.5 rounded-r-2xl my-6">
          <h4 class="text-sm font-extrabold text-orange-950 mb-1">🚗 초보운전 오일장 주차 절대 수칙</h4>
          <p class="text-xs text-orange-850 leading-relaxed">
            네비게이션에 시장 이름 자체를 목적지로 삼고 가지 마세요! 시장 중심가는 차가 갇혀 회차가 어려우므로, <strong>시장에서 300m 이격된 공영주차장이나 임시 개방 관공서 주차장</strong>을 미리 찍고 우회 진입하는 것이 정석입니다.
          </p>
        </div>

        <h3 class="text-lg font-bold text-gray-900 mt-8 mb-3">1. 공영주차장 요금 할인 및 전통시장 혜택</h3>
        <p class="text-base text-gray-700 leading-relaxed">
          대다수 공영주차장은 전통시장에서 장을 보고 점포에서 배부하는 '무료 주차권(보통 30분~1시간)'을 제시하면 주차 요금을 대폭 감면받을 수 있습니다. 또한 경차, 저공해 차량(친환경 하이브리드, 전기차), 다자녀 가구 카드를 등록한 차량은 증빙을 통해 <strong>주차 요금의 50%를 상시 추가 감면</strong>받을 수 있습니다.
        </p>

        <h3 class="text-lg font-bold text-gray-900 mt-8 mb-3">2. 좁은 장터 길 가벼운 접촉사고 대처법</h3>
        <p class="text-base text-gray-700 leading-relaxed">
          시장 주변은 이동 보행자와 차량이 얽혀 있어 저속 통행 중이라도 가벼운 휀더 긁힘이나 문콕 등의 경미한 접촉사고가 빈번하게 일어납니다. 만약 사고가 발생했다면 당황하지 말고 즉시 비상등을 켜고 블랙박스 메모리 보존 여부를 확인하세요.
        </p>
        <p class="text-base text-gray-700 leading-relaxed">
          사진을 원거리와 근거리로 다각도로(바퀴의 방향, 도로 페인트선 기준 등) 촬영해 둔 뒤, 사고 지점에 차량을 방치하면 보행자 2차 사고와 교통체증을 가중시키므로 안전구역으로 차량을 신속히 이동시키고 <strong>자동차 보험</strong>사 현장 출동을 불러 시비를 맡기는 것이 합의 비용을 아끼는 현명한 대응 방법입니다.
        </p>
      </div>
    `
  },
  'recommend': {
    title: '주말 국내 여행: 서울 근교 경기도 오일장 5대 명소 추천 | 장날맵',
    seoTitle: '주말 국내 여행: 서울 근교 경기도 오일장 5대 명소 추천 | 장날맵',
    description: '주말 당일치기 나들이 코스로 제격인 경기도 수도권 대표 전통 오일장 5대 추천. 성남 모란장, 김포 북변장, 양평 물맑은장 일정 및 대표 먹거리 여행 팁.',
    category: '여행/로컬 명소',
    date: '2026.07.24',
    readTime: '5분',
    contentHtml: `
      <div class="space-y-6">
        <p class="text-base text-gray-700 leading-relaxed">
          단순히 찬거리를 장보는 것을 넘어, 도심을 벗어나 지역 고유의 문화와 즉석 길거리 음식, 주변 힐링 풍경을 동시에 즐길 수 있는 경기도 오일장 나들이가 대세로 자리 잡았습니다. 대중교통(지하철)이나 외곽 순환 고속도로로 쉽게 가 닿을 수 있는 대표적인 추천 코스 5곳을 엄선했습니다.
        </p>

        <h3 class="text-lg font-bold text-gray-900 mt-8 mb-3">1. 도심 속 대한민국 최대 시장, 성남 모란장 (4일, 9일)</h3>
        <p class="text-base text-gray-700 leading-relaxed">
          수인분당선과 8호선 모란역 출구 코앞에 서는 수도권 최대 규모의 장터입니다. 전설적인 즉석 참기름 골목의 고소한 향기와 철판 가마솥 즉석 핫바, 푸짐한 칼국수 먹거리는 오감을 자극합니다. 도심 한복판에 있어 대중교통 당일치기 나들이로 강력 추천합니다.
        </p>

        <h3 class="text-lg font-bold text-gray-900 mt-8 mb-3">2. 잣 향기 가득한 산골 힐링, 가평 잣고을시장 (5일, 10일)</h3>
        <p class="text-base text-gray-700 leading-relaxed">
          가평역 인근에 서며 지역 최고 특산물인 명품 가평 잣과 고랭지 농산물이 주를 이루는 웰빙 장터입니다. 7월 시원한 가평 계곡 펜션이나 캠핑 피서지로 이동하는 길목에 부담 없이 들러 고소한 가평잣 막걸리와 즉석 메밀전을 즐기기에 안성맞춤입니다.
        </p>

        <h3 class="text-lg font-bold text-gray-900 mt-8 mb-3">3. 철도와 강변 나들이 명소, 양평 물맑은시장 (3일, 8일)</h3>
        <p class="text-base text-gray-700 leading-relaxed">
          경의중앙선 양평역 바로 앞에 있어 자전거 동호회 라이더들의 참새 방앗간 같은 장터입니다. 남한강 자전거길, 세미원, 두물머리 등 양평의 유명 자연 휴양지와 묶어 당일치기 힐링 가족 나들이를 짜기에 최상의 지리적 매력을 선사합니다.
        </p>
      </div>
    `
  }
};

export async function generateStaticParams() {
  return [
    { slug: 'onnuri' },
    { slug: 'parking' },
    { slug: 'recommend' }
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return {};

  return {
    title: article.seoTitle,
    description: article.description,
    alternates: {
      canonical: `https://jangnalmap.com/guide/${slug}`,
    },
    openGraph: {
      title: article.seoTitle,
      description: article.description,
      url: `https://jangnalmap.com/guide/${slug}`,
      siteName: "장날맵.com",
      images: [
        {
          url: "/favicon.ico",
          width: 512,
          height: 512,
          alt: article.title,
        }
      ],
      type: 'article',
    },
    twitter: {
      card: "summary",
      title: article.seoTitle,
      description: article.description,
      images: ["/favicon.ico"],
    }
  };
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">
        <div className="text-center space-y-4">
          <p className="font-bold text-lg">존재하지 않는 가이드 기사입니다.</p>
          <Link href="/guide" className="text-[#10B981] font-bold hover:underline">
            가이드 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col antialiased">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#10B981] to-[#FF5A1F] bg-clip-text text-transparent">
            장날맵.com
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/guide" className="text-xs text-gray-600 hover:text-[#10B981] transition-colors font-semibold">
              이용 백서 목록
            </Link>
            <Link href="/" className="text-xs text-gray-500 hover:text-[#10B981] transition-colors bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-200/60 font-semibold shadow-sm">
              홈으로 가기
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-12">
        <article className="space-y-6">
          {/* Category & Metadata */}
          <div className="space-y-3">
            <span className="inline-flex bg-emerald-50 text-[#10B981] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-gray-400 font-semibold pt-1">
              <span>작성일: {article.date}</span>
              <span className="text-gray-200">•</span>
              <span>읽는 시간: {article.readTime}</span>
            </div>
          </div>

          {/* Banner Ad Area (Policy Compliant Clean Card) */}
          <div className="border border-dashed border-gray-200 bg-gray-50/50 rounded-2xl p-6.5 flex flex-col items-center justify-center min-h-[100px] text-center my-6">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">ADVERTISEMENT</span>
            {/* Standard Adsense Ad Unit */}
            <div className="w-full text-center">
              <ins className="adsbygoogle"
                   style={{ display: 'block', textAlign: 'center' }}
                   data-ad-layout="in-article"
                   data-ad-format="fluid"
                   data-ad-client="ca-pub-3887993426553204"
                   data-ad-slot="9847192803"></ins>
            </div>
          </div>

          {/* Article HTML Content */}
          <div 
            className="prose max-w-none text-gray-700 font-medium leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          {/* Internal Traffic Recirculation */}
          <div className="border border-emerald-100 bg-emerald-50/30 rounded-2xl p-5 sm:p-6 mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <h4 className="font-extrabold text-emerald-950 text-sm sm:text-base">📍 내 주변 오늘 열린 5일장이 궁금하다면?</h4>
              <p className="text-xs text-emerald-700/80 mt-1 font-semibold">
                장날맵에서 제공하는 전국 1,300여 개 전통 오일장 실시간 개장 지도 서비스를 이용해 보세요.
              </p>
            </div>
            <Link 
              href="/" 
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:from-emerald-400 hover:to-emerald-600 transition-all cursor-pointer active:scale-95 duration-150 shrink-0 text-center"
            >
              실시간 지도 확인하러 가기 →
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
