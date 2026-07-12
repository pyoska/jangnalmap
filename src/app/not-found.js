import Link from 'next/link';

export const metadata = {
  title: '페이지를 찾을 수 없습니다 | 장날맵',
  description: '찾으시는 전통 오일장 장터 페이지가 존재하지 않거나 일시적으로 휴장 중입니다.',
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white text-[#1A1A1A] px-4 py-16 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="text-[#10B981] font-black text-6xl sm:text-7xl animate-bounce">
          404
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
            아이쿠! 찾는 장터 정보가 일시적으로 휴장 중이거나 주소가 변경되었습니다.
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-semibold leading-relaxed">
            방문하시려는 전통 오일장 명칭 혹은 도로명 주소가 변경되었을 수 있습니다. 장날맵 메인 지도에서 오늘 열리는 전국의 생생한 오일장들을 바로 조회해 보세요.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto items-center justify-center bg-[#10B981] hover:bg-[#059669] text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl transition-all shadow-[0_8px_24px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            🏠 오늘 열리는 장터 지도로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
