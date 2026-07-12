import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-150 bg-gray-50 py-12 text-xs text-slate-500">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        
        {/* Left Column: 서비스 정보 */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-gray-800 text-sm">📍 서비스 정보</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-[#10B981] transition-colors duration-200 block py-0.5">
                서비스 소개
              </Link>
            </li>
            <li>
              <Link href="/guide" className="hover:text-[#10B981] transition-colors duration-200 block py-0.5">
                오일장 가이드
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#10B981] transition-colors duration-200 block py-0.5">
                문의하기
              </Link>
            </li>
          </ul>
        </div>

        {/* Center Column: 필수 법적 문서 */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-gray-800 text-sm">⚖️ 필수 문서</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy" className="hover:text-[#10B981] transition-colors duration-200 block py-0.5 font-bold">
                개인정보처리방침
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#10B981] transition-colors duration-200 block py-0.5">
                이용약관
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-[#10B981] transition-colors duration-200 block py-0.5">
                면책공고
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column: 저작권 및 출처 */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-gray-800 text-sm">🛡️ 데이터 저작권</h4>
          <div className="space-y-2 leading-relaxed text-slate-500 font-medium">
            <p>
              본 서비스의 기본 시장 위치 정보는 소상공인시장진흥공단 전국전통시장표준데이터 공공 데이터를 기반으로 가공 및 정밀 매핑되었습니다.
            </p>
            <p className="pt-1.5 border-t border-gray-200/60">
              © 2026 jangnalmap.com. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
