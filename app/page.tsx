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
          // おみくじ筒を振るローディング画面
          <div className="text-center space-y-8 animate-fade-in">
            <div className="relative h-96 flex flex-col items-center justify-center overflow-hidden">
              {/* おみくじ筒 */}
              <div className="relative z-20 mb-8">
                <div
                  className="text-9xl transition-transform duration-300"
                  style={{
                    transform: toriiStage > 0
                      ? `rotate(${Math.sin(toriiStage * 2) * 15}deg)`
                      : 'rotate(0deg)',
                  }}
                >
                  🎋
                </div>
              </div>

              {/* 飛び出すおみくじ棒 */}
              <div className="relative h-32 flex items-end justify-center">
                <div
                  className="text-6xl transition-all duration-500 ease-out"
                  style={{
                    transform: `translateY(${Math.max(0, (5 - toriiStage) * 20)}px)`,
                    opacity: toriiStage > 0 ? 1 : 0,
                  }}
                >
                  📜
                </div>
              </div>

              {/* キラキラエフェクト */}
              {toriiStage >= 4 && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="absolute text-4xl animate-ping"
                      style={{
                        animationDuration: '1s',
                        left: '35%',
                        top: '30%'
                      }}
                    >
                      ✨
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="absolute text-4xl animate-ping"
                      style={{
                        animationDuration: '1.2s',
                        animationDelay: '0.2s',
                        right: '35%',
                        top: '35%'
                      }}
                    >
                      ✨
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="absolute text-3xl animate-ping"
                      style={{
                        animationDuration: '1s',
                        animationDelay: '0.3s',
                        left: '45%',
                        top: '60%'
                      }}
                    >
                      ⭐
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="absolute text-3xl animate-ping"
                      style={{
                        animationDuration: '1.2s',
                        animationDelay: '0.1s',
                        right: '40%',
                        top: '55%'
                      }}
                    >
                      💫
                    </div>
                  </div>
                </>
              )}

              {/* プログレス表示 */}
              <div className="absolute bottom-8 flex space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i <= toriiStage
                        ? 'bg-shrine-gold scale-125'
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* テキスト */}
            <p className="text-xl text-white/80 animate-pulse">
              おみくじを引いています...
            </p>
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
