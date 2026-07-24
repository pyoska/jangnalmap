'use client';

import { useState, useEffect } from 'react';

export default function FeedbackLoop({ marketId }) {
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [feedbackType, setFeedbackType] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (marketId) {
      const savedType = localStorage.getItem(`feedback_type_${marketId}`);
      if (savedType) {
        setFeedbackType(savedType);
        setFeedbackGiven(true);
      }
    }
  }, [marketId]);

  const handleFeedback = (type) => {
    setFeedbackType(type);
    setFeedbackGiven(true);
    if (marketId) {
      localStorage.setItem(`feedback_type_${marketId}`, type);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-5 sm:p-6 text-center shadow-sm">
      {!feedbackGiven ? (
        <div className="space-y-3.5">
          <p className="text-sm font-bold text-gray-800">📊 이 시장 정보가 정확한가요?</p>
          <p className="text-xs text-gray-500">이용자분들의 소중한 피드백을 통해 더 정확한 지도를 만들어갑니다.</p>
          <div className="flex justify-center gap-3 mt-1">
            <button
              onClick={() => handleFeedback('yes')}
              className="bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-100"
            >
              네, 정확해요! 👍
            </button>
            <button
              onClick={() => handleFeedback('no')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-100"
            >
              아니오, 수정이 필요해요 👎
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-1.5 animate-fadeIn">
          <p className="text-sm font-bold text-[#10B981]">
            {feedbackType === 'yes' ? '감사합니다! 큰 힘이 됩니다. 💚' : '소중한 의견 제보 감사드립니다. 💬'}
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            피드백을 바탕으로 에디터가 수시 검증하여 항시 최신 정보로 안내해 드릴게요.
          </p>
        </div>
      )}
    </div>
  );
}
