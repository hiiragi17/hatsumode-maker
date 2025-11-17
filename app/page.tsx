'use client';

import { useState } from 'react';
import { chooseRandomTemple, chooseRandomComment, Temple } from '@/lib/temples';
import ResultCard from '@/components/ResultCard';
import ShareButton from '@/components/ShareButton';

export default function Home() {
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [selectedComment, setSelectedComment] = useState<string>('');
  const [isRolling, setIsRolling] = useState(false);

  const handleChoose = () => {
    setIsRolling(true);
    // アニメーション効果のために少し遅延
    setTimeout(() => {
      const temple = chooseRandomTemple();
      const comment = chooseRandomComment();
      setSelectedTemple(temple);
      setSelectedComment(comment);
      setIsRolling(false);
    }, 1000);
  };

  const handleReset = () => {
    setSelectedTemple(null);
    setSelectedComment('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* 背景の星 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center">
        {!selectedTemple ? (
          // 初期画面
          <div className="text-center space-y-8 animate-fade-in">
            {/* タイトル */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
                🎍 AI初詣メーカー2025
              </h1>
              <p className="text-xl md:text-2xl text-white/80">
                AIがあなたの初詣先を強制的に決めます
              </p>
            </div>

            {/* トーリーのビジュアル */}
            <div className="my-12">
              <div className="text-9xl opacity-80 animate-pulse">⛩️</div>
            </div>

            {/* 説明文 */}
            <div className="max-w-md mx-auto space-y-4">
              <p className="text-lg text-white/70">
                2025年の初詣先、決まりましたか？
              </p>
              <p className="text-lg text-white/70">
                迷っているあなたに、AIが最適な神社を選びます。
              </p>
            </div>

            {/* ボタン */}
            <button
              onClick={handleChoose}
              disabled={isRolling}
              className="mt-8 px-12 py-4 bg-shrine-red hover:bg-shrine-darkRed disabled:bg-gray-500 text-white text-xl font-bold rounded-full shadow-2xl transition-all duration-200 transform hover:scale-110 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isRolling ? '選定中...' : 'お任せする ⛩️'}
            </button>
          </div>
        ) : (
          // 結果画面
          <div className="w-full max-w-2xl space-y-8 animate-fade-in">
            <ResultCard temple={selectedTemple} comment={selectedComment} />
            <ShareButton temple={selectedTemple} comment={selectedComment} />

            {/* もう一度ボタン */}
            <div className="text-center">
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/30 transition-all duration-200"
              >
                もう一度引く
              </button>
            </div>
          </div>
        )}

        {/* フッター */}
        <footer className="absolute bottom-4 text-center text-white/50 text-sm">
          <p>Made with Next.js 14 & Tailwind CSS</p>
        </footer>
      </div>
    </main>
  );
}
