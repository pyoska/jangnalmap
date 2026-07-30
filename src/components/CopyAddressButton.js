'use client';

import { useState } from 'react';

export default function CopyAddressButton({ address }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(address);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = address;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-extrabold text-gray-900 leading-relaxed">{address}</span>
      <button
        onClick={handleCopy}
        className={`text-xs px-2.5 py-1.5 rounded-lg border font-bold transition-all cursor-pointer flex items-center gap-1 active:scale-95 shrink-0 ${
          copied 
            ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' 
            : 'bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 border-gray-200 hover:border-emerald-300'
        }`}
        title="네비게이션/지도 입력용 주소 복사"
      >
        <span>{copied ? '✓ 복사완료!' : '📋 주소 복사'}</span>
      </button>
    </div>
  );
}
