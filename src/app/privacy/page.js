import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: '개인정보처리방침 | 장날맵',
  description: '장날맵 서비스의 개인정보처리방침 및 구글 애드센스 쿠키 정책 안내 페이지입니다.',
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
        
        <p className="text-sm text-gray-500 font-medium">시행일자: 2026년 7월 12일 (최종 개정 및 구글 광고 정책 반영)</p>

        <section className="space-y-5 text-sm text-gray-600 leading-relaxed font-medium">
          <p>
            장날맵(이하 &apos;본 서비스&apos;)은 이용자의 개인정보를 소중하게 보호하며, &quot;개인정보보호법&quot; 등 관련 대한민국 법령을 준수하고 있습니다. 본 서비스는 개인정보처리방침을 통하여 이용자께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 보안 조치가 취해지고 있는지 투명하게 알려드립니다.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-4">1. 수집하는 개인정보 항목 및 방법</h2>
          <p>
            본 서비스는 회원 가입 등의 복잡한 절차 없이 누구나 자유롭게 전국의 전통 오일장 정보를 열람할 수 있는 공개형 웹 서비스입니다. 따라서 이용자의 주민등록번호, 연락처, 주소 등의 핵심 개인 식별 정보를 강제로 요구하거나 수집하지 않습니다. 다만, 이용자가 자발적으로 개선 제안이나 오류 수정 문의를 접수할 경우에 한하여 이메일 주소를 수집할 수 있습니다.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>수집항목: 이메일 주소, 문의 내용 (직접 문의하기 이메일 접수 시)</li>
            <li>수집방법: 사용자의 이메일 전송을 통한 자발적 제출 및 동의</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 pt-4">2. 개인정보의 수집 및 이용목적</h2>
          <p>
            수집된 이메일 주소는 오직 접수된 사용자의 오일장 오류 제보, 건의 사항에 대한 답변 처리 및 처리 결과 피드백을 전달하기 위한 단일 소통 목적으로만 안전하게 이용됩니다. 수집된 정보는 이용자가 동의하지 않은 범위를 벗어나거나 제3자에게 마케팅용 등으로 활용되는 일이 절대 없습니다.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-4">3. 개인정보의 보유 및 파기 절차</h2>
          <p>
            이용자의 이메일 주소 등은 접수된 문의 답변 및 민원 처리가 완결된 시점(처리 완료 후 30일 이내)에 재생 불가능한 방법으로 안전하게 영구 파기합니다. 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 서면 형태의 정보는 분쇄하거나 소각하여 지체 없이 파기합니다.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-4">4. 개인정보의 제3자 제공 및 위탁</h2>
          <p>
            본 서비스는 이용자의 동의 없이 수집한 개인정보를 외부에 유출하거나 무단으로 제공하지 않습니다. 다만, 법원의 명령이나 수사기관의 공식적인 협조 요청 등 법령에 따른 의무 규정이 적용되는 상황에 한하여 예외적으로 최소한의 정보가 제출될 수 있습니다.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-4">5. 이용자의 권리 및 거부 요령</h2>
          <p>
            이용자는 언제든지 본 서비스에 제출한 자신의 개인정보에 대해 열람, 정정 및 즉각적인 파기를 요청할 수 있습니다. 삭제 요청 이메일을 접수하는 즉시 당사는 보관 중인 해당 이용자의 정보를 즉각 삭제 및 영구 파기 조치합니다.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-4">6. 쿠키(Cookie) 및 구글 애드센스(Google AdSense) 광고 게재 안내 (필독)</h2>
          <p>
            본 서비스는 사이트의 안정적이고 지속적인 무료 정보 공급 및 운영을 위해 제3자 광고 파트너인 **Google(구글)**을 통해 광고를 게재하고 있습니다. 이와 관련하여 이용자분들은 아래 사항을 참고해 주시기 바랍니다.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3 shadow-sm text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
            <p>
              ① 구글을 포함한 제3자 제공업체는 사용자의 이전 웹사이트 방문 내역을 기반으로 맞춤형 광고를 제공하기 위해 **쿠키(Cookie)**를 활용합니다.
            </p>
            <p>
              ② 구글의 광고 쿠키 사용을 통해 구글 및 파트너사는 장날맵을 포함하여 사용자가 방문한 인터넷 사이트들의 행동 정보를 분석하고, 가장 연관성 높고 유익한 광고를 사용자에게 타겟팅해 송출할 수 있습니다.
            </p>
            <p>
              ③ 사용자는 원치 않는 경우 언제든지 구글의 **개인 맞춤광고 설정 페이지(https://www.google.com/settings/ads)**를 방문하여 맞춤형 광고 수집을 중단하거나 개인화 옵션을 해제할 수 있습니다.
            </p>
            <p>
              ④ 또한, 제3자 제공업체의 쿠키 사용을 원하지 않는 경우 **Network Advertising Initiative의 쿠키 선택 해제 페이지(http://www.networkadvertising.org/choices/)** 또는 **AboutAds의 맞춤 광고 차단 가이드(http://www.aboutads.info/choices/)**를 방문하여 맞춤 쿠키 수집 설정을 손쉽게 거부할 수 있습니다.
            </p>
          </div>
          <p>
            쿠키는 브라우저 사용 환경을 윤택하게 하는 작은 데이터 조각이지만, 사용자는 브라우저의 옵션 설정을 조정하여 모든 쿠키의 저장을 거부하거나, 쿠키가 저장될 때마다 경고를 보내도록 설정을 자유롭게 커스터마이징할 수 있습니다. 다만 쿠키 수집을 전면 차단할 경우 본 서비스의 일부 맞춤형 기능 사용에 제약이 있을 수 있습니다.
          </p>

          <h2 className="text-lg font-bold text-gray-900 pt-4">7. 개인정보 보호 책임자 안내</h2>
          <p>
            장날맵 서비스는 이용자의 의견을 경청하며, 개인정보 관련 불편 및 문의 사항을 신속하게 처리하기 위해 아래와 같이 문의 메일을 운영하고 있습니다.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>문의 담당 메일: support@jangnalmap.com</li>
            <li>역할: 정보 보안 감사 및 이용자 권익 침해 신고 접수</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
