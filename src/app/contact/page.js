'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) {
      alert('이메일과 문의 내용을 입력해 주세요!');
      return;
    }
    
    const subject = encodeURIComponent('[장날맵 제보/문의]');
    const body = encodeURIComponent(`제보자 이메일: ${email}\n\n[제보/문의 내용]\n${message}`);
    window.location.href = `mailto:support@jangnalmap.com?subject=${subject}&body=${body}`;
    
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col antialiased">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#10B981] to-[#FF5A1F] bg-clip-text text-transparent">
            장날맵.com
          </Link>
          <Link href="/" className="text-xs text-gray-500 hover:text-[#10B981] transition-colors bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-200/60 font-semibold shadow-sm">
            홈으로 가기
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-12 flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold text-gray-900 border-b border-gray-150 pb-4">문의 및 피드백</h1>
        
        <p className="text-sm text-gray-500 leading-relaxed font-medium">
          서비스 개선 제안, 시장 정보 정정 요청(장날 변경, 주차장 정보 보완 등) 또는 일반 문의 사항이 있으시다면 아래 폼을 통해 편하게 메시지를 보내주세요. 에디터가 확인 후 빠르게 반영하겠습니다.
        </p>

        <div className="bg-gray-50 border border-gray-150 rounded-2xl p-4.5 flex items-center justify-between gap-3 text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
          <div>
            <span className="block font-bold text-gray-900 text-sm">📧 공식 이메일 접수</span>
            <span className="text-gray-500 font-medium">support@jangnalmap.com (24시간 접수 가능)</span>
          </div>
          <a href="mailto:support@jangnalmap.com" className="bg-[#10B981] hover:bg-[#059669] text-white text-xs px-3.5 py-2 rounded-xl transition-all font-bold">
            이메일 보내기
          </a>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center text-emerald-800 font-bold shadow-sm space-y-2 mt-4">
            <p>✓ 피드백이 성공적으로 접수되었습니다!</p>
            <p className="text-xs text-emerald-600 font-medium">소중한 의견 감사드립니다. 신속히 검토하여 반영하겠습니다.</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setEmail('');
                setMessage('');
              }}
              className="mt-4 bg-[#10B981] text-white text-xs px-4 py-2 rounded-xl hover:bg-[#059669] transition-colors font-bold cursor-pointer"
            >
              추가 문의하기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">
                답변 받을 이메일 주소
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200/80 rounded-xl px-4 py-2 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">
                문의 또는 제보 내용
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="장날 변경 제보, 정보 추가 요청 등 구체적인 내용을 작성해 주세요..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-colors"
                required
              ></textarea>
            </div>
            <div className="py-1">
              <label className="flex items-start gap-2.5 text-xs text-gray-500 cursor-pointer select-none">
                <input type="checkbox" required className="w-4 h-4 rounded border-gray-300 text-[#10B981] focus:ring-[#10B981] mt-0.5" />
                <span>(필수) 피드백 답변 및 처리 결과를 받기 위해 입력한 이메일 주소를 수집 및 활용하는 데 동의합니다.</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 rounded-xl transition-all cursor-pointer shadow-sm text-sm"
            >
              피드백 제출하기 &rarr;
            </button>
          </form>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-150 bg-gray-50 py-8 text-center text-xs text-gray-500">
        <p className="font-bold text-gray-600 mb-2">장날맵.com — 전국 전통 오일장 지도</p>
        <p>© 2026 jangnalmap.com. All rights reserved.</p>
      </footer>
    </div>
  );
}
