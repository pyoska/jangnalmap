'use client';

import { useState } from 'react';

export default function GuideTabs({ transportTip, parkingTip, foodTip, tags }) {
  const [activeTab, setActiveTab] = useState('transport'); // 'transport' | 'parking' | 'food'

  return (
    <div className="flex flex-col gap-5">
      {/* Tab Switcher Buttons */}
      <div className="flex border-b border-gray-150 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('transport')}
          className={`px-4 py-2 text-xs sm:text-sm font-extrabold whitespace-nowrap cursor-pointer transition-all border-b-2 ${
            activeTab === 'transport'
              ? 'border-[#10B981] text-[#10B981]'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          🚇 대중교통 길찾기
        </button>
        <button
          onClick={() => setActiveTab('parking')}
          className={`px-4 py-2 text-xs sm:text-sm font-extrabold whitespace-nowrap cursor-pointer transition-all border-b-2 ${
            activeTab === 'parking'
              ? 'border-[#10B981] text-[#10B981]'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          🚗 주차/사고 예방 팁
        </button>
        <button
          onClick={() => setActiveTab('food')}
          className={`px-4 py-2 text-xs sm:text-sm font-extrabold whitespace-nowrap cursor-pointer transition-all border-b-2 ${
            activeTab === 'food'
              ? 'border-[#10B981] text-[#10B981]'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          🍲 먹거리 및 별미 추천
        </button>
      </div>

      {/* Tab Contents */}
      <div className="pt-2 animate-fadeIn">
        {activeTab === 'transport' && (
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-extrabold text-gray-900">🚇 지하철/버스 노선 환승 안내</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">{transportTip}</p>
          </div>
        )}

        {activeTab === 'parking' && (
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-extrabold text-gray-900">🚗 주차장 위치 및 사고 예방 팁</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">{parkingTip}</p>
            
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 space-y-2">
              <h4 className="font-extrabold text-[#10B981] text-xs sm:text-sm">📝 대안/대체 주차 팁</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                시장 내 전용 주차장이 만차이거나 혼잡할 경우에는 억지로 진입하시지 말고, 시장에서 약 300m 떨어진 인근 천변 공영주차장이나 주말에는 무료 개방되는 인근 공공복지센터 혹은 관공서 운동장 구역을 대체 주차장으로 정해 이용하시는 편이 마음 편하더라고요!
              </p>
            </div>
          </div>
        )}

        {activeTab === 'food' && (
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-extrabold text-gray-900">🍲 입맛 돋우는 대표 먹거리와 추천 메뉴</h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tags.map((tag, i) => (
                <span key={i} className="bg-gray-100 text-gray-600 text-[10px] sm:text-xs px-2.5 py-1 rounded-lg font-semibold">{tag}</span>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">{foodTip}</p>

            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 space-y-1.5">
              <h4 className="font-extrabold text-[#10B981] text-xs sm:text-sm">⭐ 우수/인기 메뉴 추천</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                시장 내 노점 골목의 가마솥 가래떡 즉석 떡볶이와 바삭한 수제 도넛, 갓 튀긴 핫바, 그리고 계절에 맞춘 7월 시원한 살얼음 미숫가루와 식혜는 필수 코스로 추천해 드려요.
              </p>
            </div>

            <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-4 space-y-1.5">
              <h4 className="font-extrabold text-blue-500 text-xs sm:text-sm">⏰ 시장 방문객 추천 시기/시간대</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                상인분들이 준비를 마치고 가장 싱싱한 나물과 제철 과일, 먹거리가 풍성하게 진열되는 정오 12시부터 오후 3시 사이가 가장 활력 넘쳐 방문하기 좋더라고요!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
