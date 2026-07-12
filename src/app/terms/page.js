import Link from 'next/link';

export const metadata = {
  title: '이용약관 | 장날맵',
  description: '장날맵 서비스의 이용약관 안내 페이지입니다.',
};

export default function TermsPage() {
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
        <h1 className="text-3xl font-extrabold text-gray-900 border-b border-gray-150 pb-4">서비스 이용약관</h1>
        
        <p className="text-sm text-gray-500 font-medium">시행일자: 2026년 7월 10일</p>

        <section className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            본 약관은 장날맵(이하 &apos;서비스&apos;)이 제공하는 지도 및 정보 서비스의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-4">제 1 조 (목적)</h2>
          <p>
            본 약관은 이용자가 서비스 홈페이지에 접속하여 제공받는 모든 정보의 열람 및 기능 사용에 관한 기본적인 규율을 정의합니다.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-4">제 2 조 (이용 계약의 성립)</h2>
          <p>
            서비스 이용 계약은 이용자가 본 웹사이트에 접속하여 정보를 열람하는 것과 동시에 발생하며, 별도의 계정 등록이나 가입을 요구하지 않습니다.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-4">제 3 조 (정보 제공의 한계 및 면책)</h2>
          <p>
            1. 본 서비스는 공공데이터포털의 공용 전통시장 정보 및 에디터 수집 정보에 근거하여 작성되었습니다. 현지 사정(천재지변, 시장 상인 협의체 규정 등)에 따라 개장 여부와 위치가 다를 수 있습니다.
            <br />
            2. 이용자는 정보 열람 후 중요한 일정 시 방문 전에 해당 지자체나 상인회에 실제 개장 상태를 최종 확인하시기를 강력히 권장합니다.
            <br />
            3. 본 서비스의 정보 오류 또는 지연으로 인하여 발생한 직/간접적 손해에 대해 본 서비스 운영팀은 일체의 손해배상 책임을 지지 않습니다.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-4">제 4 조 (이용자의 의무)</h2>
          <p>
            이용자는 서비스에 해를 끼치는 비정상적인 데이터 크롤링, 서버 과부하 행위 등을 금하며, 정당한 정보 조회 목적으로만 본 웹사이트를 이용하여야 합니다.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-150 bg-gray-50 py-8 text-center text-xs text-gray-500">
        <p className="font-bold text-gray-600 mb-2">장날맵.com — 전국 전통 오일장 지도</p>
        <p>© 2026 jangnalmap.com. All rights reserved.</p>
      </footer>
    </div>
  );
}
