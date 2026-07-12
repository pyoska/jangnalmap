'use client';

import { useState } from 'react';

export default function YoutubeFeedback() {
  const [voted, setVoted] = useState(false);
  const [voteType, setVoteType] = useState('');

  const handleVote = (type) => {
    setVoteType(type);
    setVoted(true);
  };

  return (
    <div className="bg-gray-50 border border-gray-150 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
      <div>
        <p className="text-xs sm:text-sm font-bold text-gray-800">🤔 방금 시청하신 영상이 유익했나요?</p>
        <p className="text-[11px] text-gray-400 mt-0.5">사용자 추천 반응을 모아 더 가치 있는 현장 영상을 큐레이션합니다.</p>
      </div>
      
      {!voted ? (
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => handleVote('up')}
            className="bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-700 hover:text-[#10B981] font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1 active:scale-95"
          >
            👍 유익해요
          </button>
          <button
            onClick={() => handleVote('down')}
            className="bg-white border border-gray-200 hover:border-rose-200 hover:bg-rose-50 text-gray-600 hover:text-rose-500 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1 active:scale-95"
          >
            👎 조금 아쉬워요
          </button>
        </div>
      ) : (
        <div className="text-xs font-bold text-[#10B981] shrink-0 animate-pulse">
          {voteType === 'up' ? '🎉 추천 피드백을 전달해 주셔서 대단히 감사합니다!' : '✔️ 소중한 의견 반영하여 영상 정보를 보완하겠습니다!'}
        </div>
      )}
    </div>
  );
}
