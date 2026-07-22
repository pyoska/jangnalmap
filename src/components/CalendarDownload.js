'use client';

import { useRef, useEffect, useState } from 'react';

export default function CalendarDownload({ marketName, openingCycle }) {
  const canvasRef = useRef(null);
  const [imgUrl, setImgUrl] = useState('');

  // Extract cycle numbers (e.g. "2일+7일" -> [2, 7])
  const getCycleDays = () => {
    if (openingCycle === '매일') return Array.from({ length: 31 }, (_, i) => i + 1);
    const matches = openingCycle.match(/\d+/g);
    if (!matches) return [];
    return matches.map(Number);
  };

  const cycleDays = getCycleDays();

  // Check if a date is a market day
  const isMarketDay = (day) => {
    if (openingCycle === '매일') return true;
    const dateStr = String(day);
    // Matches if the single-digit date matches, or the last digit of two-digit date matches
    return cycleDays.some(d => {
      if (d === 5) {
        // special match for 5, 10, 15, 20, 25, 30
        return day % 5 === 0;
      }
      return day % 10 === d;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 800;
    const height = 900;
    canvas.width = width;
    canvas.height = height;

    // 1. Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Border
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, width - 10, height - 10);

    // 2. Header Box
    ctx.fillStyle = '#060913';
    ctx.fillRect(10, 10, width - 20, 150);

    // Header Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${marketName}`, width / 2, 75);

    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(`🗓️ 2026년 7월 장날 달력 (${openingCycle})`, width / 2, 115);

    // 3. Weekday Names Header (Sun ~ Sat)
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const startX = 80;
    const colWidth = 108;
    const startY = 220;
    const rowHeight = 95;

    ctx.font = 'bold 22px sans-serif';
    weekdays.forEach((day, i) => {
      if (i === 0) ctx.fillStyle = '#EF4444'; // Sun
      else if (i === 6) ctx.fillStyle = '#3B82F6'; // Sat
      else ctx.fillStyle = '#374151'; // Weekdays
      ctx.fillText(day, startX + i * colWidth, startY);
    });

    // Divider line below weekday header
    ctx.strokeStyle = '#F3F4F6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, startY + 25);
    ctx.lineTo(width - 40, startY + 25);
    ctx.stroke();

    // 4. Draw Calendar Days for July 2026
    // July 1, 2026 starts on Wednesday (index 3)
    const startOffset = 3;
    const totalDays = 31;
    let dayCounter = 1;
    const gridYStart = startY + 70;

    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        const gridIndex = row * 7 + col;
        if (gridIndex >= startOffset && dayCounter <= totalDays) {
          const x = startX + col * colWidth;
          const y = gridYStart + row * rowHeight;

          const isMarket = isMarketDay(dayCounter);

          // Highlight Market Day
          if (isMarket) {
            ctx.fillStyle = '#FFEBE3';
            ctx.beginPath();
            ctx.arc(x, y - 8, 38, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#FF5A1F';
            ctx.lineWidth = 3;
            ctx.stroke();
          }

          // Draw Day Number
          ctx.font = 'bold 24px sans-serif';
          ctx.textAlign = 'center';

          if (isMarket) {
            ctx.fillStyle = '#FF5A1F';
          } else if (col === 0) {
            ctx.fillStyle = '#EF4444'; // Sun
          } else if (col === 6) {
            ctx.fillStyle = '#3B82F6'; // Sat
          } else {
            ctx.fillStyle = '#111827';
          }

          ctx.fillText(String(dayCounter), x, y);

          // Draw small text label under market day
          if (isMarket) {
            ctx.font = 'bold 12px sans-serif';
            ctx.fillStyle = '#FF5A1F';
            ctx.fillText('장날', x, y + 16);
          }

          dayCounter++;
        }
      }
    }

    // 5. Footer Branding
    ctx.fillStyle = '#F9FAFB';
    ctx.fillRect(10, height - 90, width - 20, 80);

    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('대한민국 1등 오일장지도 — 장날맵.com', width / 2, height - 52);

    ctx.font = '12px sans-serif';
    ctx.fillText('※ 본 이미지를 다운로드하여 갤러리에 저장하거나 카톡방에 공유하여 편하게 사용하세요.', width / 2, height - 25);

    // Save as URL
    try {
      setImgUrl(canvas.toDataURL('image/png'));
    } catch (e) {
      console.error(e);
    }
  }, [marketName, openingCycle]);

  return (
    <div className="bg-gradient-to-tr from-amber-50 to-orange-50/30 border border-amber-200/80 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm sm:text-base font-extrabold text-gray-900 flex items-center gap-1.5">
            📷 이번 달 스마트폰 오일장 달력 다운로드
          </h4>
          <p className="text-[11px] text-gray-500 mt-1 font-semibold leading-relaxed">
            {marketName}의 7월 장서는 날을 자동 표기한 세련된 모바일 이미지 달력입니다. 다운로드하여 사진첩에 소장하거나 가족/지인에게 전송해보세요!
          </p>
        </div>
        <span className="bg-amber-100 text-amber-800 text-[10px] px-2.5 py-0.5 rounded-full font-bold whitespace-nowrap shrink-0">
          소유 넛지
        </span>
      </div>

      {/* Hidden canvas used for rendering */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {imgUrl && (
        <a
          href={imgUrl}
          download={`${marketName.replace(/\s+/g, '')}_2026_07_달력.png`}
          className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-extrabold py-3 px-4 rounded-xl text-xs sm:text-sm text-center flex items-center justify-center gap-1.5 shadow-sm transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          📥 이미지 달력 다운로드 하기 (PNG)
        </a>
      )}
    </div>
  );
}
