'use client';

import { useState, useEffect } from 'react';

export default function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user dismissed the banner previously
    const isDismissed = localStorage.getItem('pwa_banner_dismissed') === 'true';
    if (isDismissed) return;

    const handleBeforeInstallPrompt = (e) => {
      // Prevent browser's default automatic prompt bar
      e.preventDefault();
      // Save event so we can trigger it later
      setDeferredPrompt(e);
      // Show our custom banner
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Safari / iOS standalone check
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.navigator.standalone === true;
    if (isIOS && !isStandalone) {
      // iOS doesn't support beforeinstallprompt, but we can show a guide banner
      // We only show it if they haven't dismissed it
      const iosShown = localStorage.getItem('pwa_ios_guide_shown') === 'true';
      if (!iosShown) {
        setIsVisible(true);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // iOS fallback or generic alert guide
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isIOS) {
        alert("📢 아이폰(Safari)에서 홈 화면에 추가하는 방법:\n\n1. 브라우저 하단의 [공유] 버튼을 누릅니다.\n2. 스크롤을 내려 [홈 화면에 추가]를 선택합니다.");
        localStorage.setItem('pwa_ios_guide_shown', 'true');
        setIsVisible(false);
      }
      return;
    }

    // Show native prompt
    deferredPrompt.prompt();
    
    // Wait for user outcome
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    
    // Clear deferred prompt
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa_banner_dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-[9999] max-w-md mx-auto animate-fade-in-up">
      <div className="glass-effect relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-[#060913]/95 p-5 shadow-[0_8px_32px_rgba(16,185,129,0.15)] backdrop-blur-xl">
        {/* Glow decorative effect */}
        <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-emerald-500/10 blur-xl"></div>
        
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-md shadow-emerald-500/25">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h4 className="text-sm font-extrabold text-[#F3F4F6] tracking-tight">
              📱 장날맵을 앱으로 만나보세요!
            </h4>
            <p className="mt-1 text-xs font-medium text-gray-400 leading-relaxed">
              홈 화면에 추가하면 검색창을 켜지 않고도 터치 한 번으로 전국의 모든 5일장 일정을 즉시 확인할 수 있습니다.
            </p>
            
            <div className="mt-3.5 flex items-center gap-2">
              <button
                onClick={handleInstallClick}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] px-4 py-2 text-xs font-bold text-white shadow-sm hover:from-emerald-400 hover:to-emerald-600 transition-all cursor-pointer active:scale-95 duration-150"
              >
                홈 화면에 추가
              </button>
              <button
                onClick={handleDismiss}
                className="inline-flex items-center justify-center rounded-xl border border-gray-800 bg-[#0c1222] px-3.5 py-2 text-xs font-semibold text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
              >
                나중에 하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
