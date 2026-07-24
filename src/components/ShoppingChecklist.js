'use client';

import { useState, useEffect } from 'react';

export default function ShoppingChecklist({ marketId }) {
  const [checkedItems, setCheckedItems] = useState({
    corn: false,
    watermelon: false,
    peach: false,
    plum: false
  });
  const [isMounted, setIsMounted] = useState(false);

  const storageKey = marketId ? `shopping_checklist_${marketId}` : 'shopping_checklist_global';

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse checklist', e);
      }
    }
  }, [storageKey]);

  const toggleCheck = (item) => {
    setCheckedItems(prev => {
      const next = {
        ...prev,
        [item]: !prev[item]
      };
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  if (!isMounted) return null;

  return (
    <section className="bg-orange-50/40 border border-orange-100 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-4">
      <div>
        <h4 className="text-sm sm:text-base font-extrabold text-orange-900 flex items-center gap-1.5">
          🍲 이번 달 장바구니 추천 Checklist
        </h4>
        <p className="text-xs text-orange-700/80 mt-0.5 font-semibold">7월 여름 장날에 들르면 꼭 카트에 담아야 할 제철 특산품 추천 리스트입니다. 직접 체크하며 장을 보세요!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Item 1 */}
        <label 
          onClick={() => toggleCheck('corn')}
          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none active:scale-[0.98] duration-150 ${
            checkedItems.corn 
              ? 'bg-orange-100/60 border-orange-400 text-orange-950 font-bold shadow-[0_4px_12px_rgba(249,115,22,0.12)]' 
              : 'bg-white border-gray-150 text-gray-700 hover:bg-orange-50/20 hover:border-orange-200 shadow-sm'
          }`}
        >
          <input 
            type="checkbox" 
            checked={checkedItems.corn} 
            onChange={() => {}}
            className="w-5 h-5 rounded text-orange-600 focus:ring-orange-500 border-gray-300 cursor-pointer shrink-0"
          />
          <span className="text-xs sm:text-sm flex items-center gap-1">🌽 초당옥수수 <span className="text-[10px] text-orange-700 bg-orange-100/80 px-1.5 py-0.5 rounded font-bold shrink-0">여름 최고 인기</span></span>
        </label>

        {/* Item 2 */}
        <label 
          onClick={() => toggleCheck('watermelon')}
          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none active:scale-[0.98] duration-150 ${
            checkedItems.watermelon 
              ? 'bg-orange-100/60 border-orange-400 text-orange-950 font-bold shadow-[0_4px_12px_rgba(249,115,22,0.12)]' 
              : 'bg-white border-gray-150 text-gray-700 hover:bg-orange-50/20 hover:border-orange-200 shadow-sm'
          }`}
        >
          <input 
            type="checkbox" 
            checked={checkedItems.watermelon} 
            onChange={() => {}}
            className="w-5 h-5 rounded text-orange-600 focus:ring-orange-500 border-gray-300 cursor-pointer shrink-0"
          />
          <span className="text-xs sm:text-sm flex items-center gap-1">🍉 꿀수박/참외 <span className="text-[10px] text-orange-700 bg-orange-100/80 px-1.5 py-0.5 rounded font-bold shrink-0">무더위 수분충전</span></span>
        </label>

        {/* Item 3 */}
        <label 
          onClick={() => toggleCheck('peach')}
          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none active:scale-[0.98] duration-150 ${
            checkedItems.peach 
              ? 'bg-orange-100/60 border-orange-400 text-orange-950 font-bold shadow-[0_4px_12px_rgba(249,115,22,0.12)]' 
              : 'bg-white border-gray-150 text-gray-700 hover:bg-orange-50/20 hover:border-orange-200 shadow-sm'
          }`}
        >
          <input 
            type="checkbox" 
            checked={checkedItems.peach} 
            onChange={() => {}}
            className="w-5 h-5 rounded text-orange-600 focus:ring-orange-500 border-gray-300 cursor-pointer shrink-0"
          />
          <span className="text-xs sm:text-sm flex items-center gap-1">🍑 백도/황도 복숭아 <span className="text-[10px] text-orange-700 bg-orange-100/80 px-1.5 py-0.5 rounded font-bold shrink-0">달콤함 보장</span></span>
        </label>

        {/* Item 4 */}
        <label 
          onClick={() => toggleCheck('plum')}
          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none active:scale-[0.98] duration-150 ${
            checkedItems.plum 
              ? 'bg-orange-100/60 border-orange-400 text-orange-950 font-bold shadow-[0_4px_12px_rgba(249,115,22,0.12)]' 
              : 'bg-white border-gray-150 text-gray-700 hover:bg-orange-50/20 hover:border-orange-200 shadow-sm'
          }`}
        >
          <input 
            type="checkbox" 
            checked={checkedItems.plum} 
            onChange={() => {}}
            className="w-5 h-5 rounded text-orange-600 focus:ring-orange-500 border-gray-300 cursor-pointer shrink-0"
          />
          <span className="text-xs sm:text-sm flex items-center gap-1">🍒 대석 자두 <span className="text-[10px] text-orange-700 bg-orange-100/80 px-1.5 py-0.5 rounded font-bold shrink-0">새콤달콤 비타민</span></span>
        </label>
      </div>
    </section>
  );
}
