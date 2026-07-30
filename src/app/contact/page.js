import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: '문의 및 제보 | 장날맵',
  description: '장날맵 서비스 정보 정정 제보 및 이메일 제휴 문의 안내 페이지입니다.',
  alternates: {
    canonical: 'https://jangnalmap.com/contact',
  },
  openGraph: {
    title: '문의 및 제보 | 장날맵',
    description: '장날맵 서비스 정보 정정 제보 및 이메일 제휴 문의 안내 페이지입니다.',
    url: 'https://jangnalmap.com/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "장날맵 고객센터 및 정보 제보",
    "url": "https://jangnalmap.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "장날맵 아카이브 편집국",
      "url": "https://jangnalmap.com",
      "email": "support@jangnalmap.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "support@jangnalmap.com",
        "contactType": "customer service",
        "availableLanguage": "Korean"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-16 flex flex-col gap-8 justify-center">
        <div className="space-y-3.5 text-center">
          <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider block">신속하고 정확한 피드백</span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900">문의 및 정보 제보 안내</h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-md mx-auto font-medium">
            장날맵은 전국 1,378개 전통 오일장 방문자분들의 정확한 정보 공유를 지향합니다. 장날 변경 제보, 공영주차장 정보 보완 등 모든 문의는 공식 메일로 상시 접수합니다.
          </p>
        </div>

        {/* Support Card */}
        <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-3xl p-8 flex flex-col items-center gap-6 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#10B981] text-white flex items-center justify-center text-3xl shadow-md">
            📧
          </div>
          
          <div className="space-y-1.5">
            <span className="block font-black text-gray-900 text-lg">공식 이메일 접수처</span>
            <span className="text-[#10B981] text-base font-black">support@jangnalmap.com</span>
          </div>

          <p className="text-xs text-gray-600 max-w-sm leading-relaxed font-semibold">
            문의 및 제보해 주신 내용은 편집국 에디터가 현장 검증 및 지자체 조회를 거쳐 영업일 기준 1~2일 내로 지도 데이터베이스에 100% 반영해 드립니다.
          </p>

          <a 
            href="mailto:support@jangnalmap.com?subject=%5B%EC%9E%A5%EB%82%A0%EB%A7%B5%20%EC%A0%9C%EB%B3%B4%2F%EB%AC%B8%EC%9D%98%5D" 
            className="w-full sm:w-auto bg-[#10B981] hover:bg-[#059669] text-white font-extrabold px-8 py-3.5 rounded-2xl transition-all shadow-md text-sm cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            이메일 작성하기 &rarr;
          </a>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
