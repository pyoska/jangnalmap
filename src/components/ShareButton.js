'use client';

import { useState } from 'react';

export default function ShareButton({ marketName }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${marketName} 장날 정보 - 장날맵.com`,
      text: `오늘 ${marketName} 장날 정보와 주차 꿀팁을 확인해보세요!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User canceled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        // Fallback
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full bg-[#FEE500] hover:bg-[#FDD835] text-[#191919] font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-sm transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
    >
      <svg className="w-5 h-5 text-[#191919]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.78 2.94-.123.49.178.483.376.352.155-.103 2.466-1.676 3.473-2.363.54.08 1.095.132 1.661.132 4.97 0 9-3.186 9-7.115S16.97 3 12 3z"/>
      </svg>
      {copied ? '🎉 공유 링크가 복사되었습니다!' : `💬 카카오톡·가족/지인에게 ${marketName} 소식 공유하기`}
    </button>
  );
}
