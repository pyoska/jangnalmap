'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 z-40 bg-white/90 backdrop-blur-md hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 p-3 rounded-full border border-gray-200/80 shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center text-xs font-bold gap-1"
      aria-label="최상단으로 이동"
      title="맨 위로 이동"
    >
      <span className="text-sm">▲</span>
      <span className="hidden sm:inline">TOP</span>
    </button>
  );
}
