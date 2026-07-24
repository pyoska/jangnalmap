import { getMarkets } from '@/lib/db';
import HomeClient from '@/components/HomeClient';

export const revalidate = 600; // 10 minutes ISR cache

export default async function Home() {
  const markets = await getMarkets();
  
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "전국 오일장(5일장)이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "오일장은 5일 주기로 열리는 대한민국 전통 시장입니다. 매달 끝자리 날짜(예: 2일·7일 장, 3일·8일 장)에 따라 정기적으로 장이 섭니다."
        }
      },
      {
        "@type": "Question",
        "name": "오늘 열리는 오일장은 어떻게 확인하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "장날맵.com 메인 페이지의 '오늘 열리는 장터' 필터를 클릭하거나 위치 기반 내 주변 검색을 통해 오늘 바로 방문 가능한 5일장을 실시간으로 확인하실 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "온누리상품권 사용이 가능한가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "대부분의 전통 오일장은 종이 온누리상품권 및 모바일/카드형 온누리상품권 가맹점이 다수 입점해 있어 주차 및 쇼핑 시 할인 혜택을 받으실 수 있습니다."
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
      <HomeClient initialMarkets={markets} />
    </>
  );
}
