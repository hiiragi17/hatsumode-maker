'use client';

import { useState } from 'react';
import { chooseRandomTemple, chooseRandomComment, Temple } from '@/lib/temples';
import ResultCard from '@/components/ResultCard';
import ShareButton from '@/components/ShareButton';

export default function Home() {
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [selectedComment, setSelectedComment] = useState<string>('');
  const [isRolling, setIsRolling] = useState(false);
  const [rollingTemple, setRollingTemple] = useState<Temple | null>(null);

  const handleChoose = () => {
    setIsRolling(true);
    setRollingTemple(null);

    // ローディング演出：神社名を高速で切り替える
    let count = 0;
    const maxRolls = 20; // 20回切り替える
    const interval = setInterval(() => {
      setRollingTemple(chooseRandomTemple());
      count++;

      if (count >= maxRolls) {
        clearInterval(interval);
        // 最終的な神社とコメントを決定
        setTimeout(() => {
          const temple = chooseRandomTemple();
          const comment = chooseRandomComment();
          setSelectedTemple(temple);
          setSelectedComment(comment);
          setIsRolling(false);
          setRollingTemple(null);
        }, 300);
      }
    }, 80); // 80msごとに切り替え
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
        {!selectedTemple && !isRolling ? (
          // 初期画面
          <div className="text-center space-y-8 animate-fade-in">
            {/* タイトル */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
                🎍 AI初詣メーカー2026
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
                2026年の初詣先、決まりましたか？
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
              お任せする ⛩️
            </button>
          </div>
        ) : isRolling ? (
          // ローディング画面
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-2xl">
                AIが選定中...
              </h2>
              <div className="text-9xl animate-bounce">⛩️</div>
            </div>

            {/* ローディング中の神社名表示 */}
            {rollingTemple && (
              <div className="min-h-[200px] flex items-center justify-center">
                <div className="py-8 px-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
                  <p className="text-4xl md:text-5xl font-bold text-shrine-gold animate-pulse">
                    {rollingTemple.name}
                  </p>
                  <p className="text-xl md:text-2xl text-white/80 mt-4">
                    （{rollingTemple.area}）
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-center items-center space-x-2 text-2xl animate-pulse">
              <span>✨</span>
              <span>✨</span>
              <span>✨</span>
            </div>
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
