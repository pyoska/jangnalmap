import { getMarkets } from '@/lib/db';
import HomeClient from '@/components/HomeClient';

export const revalidate = 600; // 10 minutes ISR cache

export const metadata = {
  title: '오일장지도 장날맵 - 성남 모란시장 5일장 날짜, 경기도 5일장날 날짜표 안내',
  description: '전국 오일장 정보를 한눈에! 성남 모란시장 5일장 날짜와 경기도 5일장날 날짜표 등 장날 일정과 주차 정보를 확인하세요.',
  keywords: '성남 모란시장 5일장 날짜, 모란시장 5일장 날짜, 경기도 5일장날 날짜표, 전국 오일장 지도',
};

export default async function Home() {
  const markets = await getMarkets();
  
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "성남 모란시장 5일장 날짜는 언제인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "모란시장 5일장 날짜는 매월 4일과 9일로 끝나는 날(4일, 9일, 14일, 19일, 24일, 29일)에 열립니다. 장날맵에서 성남 모란시장 5일장 날짜를 비롯한 경기도 5일장날 날짜표를 정확하게 확인할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "전국 오일장(5일장)이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "오일장은 5일 주기로 열리는 대한민국 전통 시장입니다. 매달 끝자리 날짜(예: 2일·7일 장, 3일·8일 장)에 따라 정기적으로 장이 섭니다. 성남 모란시장 5일장 날짜나 경기도 5일장날 날짜표 일정 등도 모두 이 기준을 따릅니다."
        }
      },
      {
        "@type": "Question",
        "name": "오늘 열리는 오일장은 어떻게 확인하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "장날맵.com 메인 페이지의 '오늘 열리는 장터' 필터를 클릭하거나 위치 기반 내 주변 검색을 통해 오늘 바로 방문 가능한 5일장을 실시간으로 확인하실 수 있습니다."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="sr-only">전국 오일장 지도 - 성남 모란시장 5일장 날짜 및 경기도 5일장날 날짜표</h1>
      <HomeClient initialMarkets={markets} />
    </>
  );
}
