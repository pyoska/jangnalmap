import Link from 'next/link';

export const metadata = {
  title: '개인정보처리방침 | 장날맵',
  description: '장날맵 서비스의 개인정보처리방침 안내 페이지입니다.',
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-extrabold text-gray-900 border-b border-gray-150 pb-4">개인정보처리방침</h1>
        
        <p className="text-sm text-gray-500 font-medium">시행일자: 2026년 7월 10일</p>

        <section className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            장날맵(이하 &apos;본 서비스&apos;)은 이용자의 개인정보를 중요시하며, &quot;개인정보보호법&quot; 등 관련 법령을 준수하고 있습니다. 본 서비스는 개인정보처리방침을 통하여 이용자께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-4">1. 수집하는 개인정보 항목</h2>
          <p>
            본 서비스는 별도의 회원가입 없이 이용할 수 있는 공개적인 정보를 서빙합니다. 기본적으로 사용자의 개인식별정보(이름, 이메일, 전화번호 등)를 강제로 수집하지 않습니다. 다만 서비스 문의 처리 등을 위해 아래와 같은 개인정보가 자발적 동의 하에 수집될 수 있습니다.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>수집항목: 이메일 주소, 문의 내용 (직접 문의하기 이용 시에 한함)</li>
            <li>수집방법: 홈페이지 문의 폼 작성을 통한 동의 제출</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 pt-4">2. 개인정보의 수집 및 이용목적</h2>
          <p>
            수집된 개인정보는 오직 이용자의 문의 내용 답변 처리 및 피드백 개선을 위한 소통 목적으로만 이용됩니다. 이 외의 상업적 마케팅 목적으로는 활용되지 않습니다.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-4">3. 개인정보의 보유 및 이용기간</h2>
          <p>
            이용자의 개인정보는 수집 및 이용목적이 달성된 후(문의에 대한 답변 완료 후 30일 이내) 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 법정 기간 동안 안전하게 보관합니다.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-4">4. 개인정보의 제3자 제공</h2>
          <p>
            본 서비스는 이용자의 동의 없이 개인정보를 외부에 제공하거나 제3자에게 위탁하지 않습니다.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-4">5. 이용자의 권리와 그 행사방법</h2>
          <p>
            이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정을 요구할 수 있으며, 이메일을 통해 동의 철회(삭제)를 요청하실 수 있습니다. 요청 시 지체 없이 파기 조치하겠습니다.
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
