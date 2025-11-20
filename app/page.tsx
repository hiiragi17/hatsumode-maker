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
  const [toriiStage, setToriiStage] = useState(0);

  const handleChoose = () => {
    setIsRolling(true);
    setRollingTemple(null);
    setToriiStage(0);

    // 鳥居くぐり演出：5つの鳥居を順番にくぐる
    const totalTorii = 5;
    let currentStage = 0;

    const toriiInterval = setInterval(() => {
      currentStage++;
      setToriiStage(currentStage);
      setRollingTemple(chooseRandomTemple());

      if (currentStage >= totalTorii) {
        clearInterval(toriiInterval);
        // 最終的な神社とコメントを決定
        setTimeout(() => {
          const temple = chooseRandomTemple();
          const comment = chooseRandomComment();
          setSelectedTemple(temple);
          setSelectedComment(comment);
          setIsRolling(false);
          setRollingTemple(null);
          setToriiStage(0);
        }, 500);
      }
    }, 600); // 600msごとに次の鳥居へ
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
          // 鳥居くぐりローディング画面
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-2xl">
                参道を進んでいます...
              </h2>
              <p className="text-lg text-white/70">
                {toriiStage}/5 の鳥居
              </p>
            </div>

            {/* 鳥居くぐり演出 */}
            <div className="relative h-96 flex items-center justify-center overflow-hidden">
              {/* 背景の参道 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-full bg-gradient-to-b from-transparent via-shrine-gold/20 to-transparent blur-sm"></div>
              </div>

              {/* 複数の鳥居を表示 */}
              {[0, 1, 2, 3, 4].map((index) => {
                // 現在のステージとの位置関係を計算
                const relativePosition = index - toriiStage;

                // まだ来ていない鳥居（奥）、現在の鳥居、通過した鳥居を判定
                if (relativePosition < -1 || relativePosition > 2) return null;

                // 奥から手前への距離に応じてスケールと位置を調整
                let scale = 0.3;
                let translateY = 0;
                let opacity = 0.3;

                if (relativePosition === -1) {
                  // 通過直後の鳥居
                  scale = 2.5;
                  translateY = 0;
                  opacity = 0.1;
                } else if (relativePosition === 0) {
                  // 現在くぐっている鳥居
                  scale = 1.5;
                  translateY = 0;
                  opacity = 1;
                } else if (relativePosition === 1) {
                  // 次の鳥居
                  scale = 0.8;
                  translateY = -20;
                  opacity = 0.6;
                } else if (relativePosition === 2) {
                  // その次の鳥居
                  scale = 0.4;
                  translateY = -40;
                  opacity = 0.3;
                }

                return (
                  <div
                    key={index}
                    className="absolute transition-all duration-600 ease-in-out"
                    style={{
                      transform: `scale(${scale}) translateY(${translateY}px)`,
                      opacity: opacity,
                      zIndex: 10 - relativePosition,
                    }}
                  >
                    <div className={`text-9xl ${relativePosition === 0 ? 'drop-shadow-2xl' : ''}`}>
                      ⛩️
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ローディング中の神社名表示 */}
            {rollingTemple && (
              <div className="min-h-[120px] flex items-center justify-center">
                <div className="py-6 px-10 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
                  <p className="text-3xl md:text-4xl font-bold text-shrine-gold">
                    {rollingTemple.name}
                  </p>
                  <p className="text-lg md:text-xl text-white/80 mt-2">
                    （{rollingTemple.area}）
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-center items-center space-x-2 text-2xl">
              <span className="animate-pulse">🎌</span>
              <span className="animate-pulse delay-100">🎌</span>
              <span className="animate-pulse delay-200">🎌</span>
            </div>
          </div>
        ) : (
          // 結果画面
          <div className="w-full max-w-2xl space-y-8 animate-fade-in">
            <ResultCard temple={selectedTemple!} comment={selectedComment} />
            <ShareButton temple={selectedTemple!} comment={selectedComment} />

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
