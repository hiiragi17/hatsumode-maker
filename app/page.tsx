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
          // 流れ星/天啓演出のローディング画面
          <div className="text-center space-y-8 animate-fade-in">
            <div className="relative h-96 flex flex-col items-center justify-center overflow-hidden">
              {/* 流れ星 */}
              <div
                className="absolute text-7xl transition-all duration-700 ease-out"
                style={{
                  left: toriiStage === 0 ? '10%' : '50%',
                  top: toriiStage === 0 ? '10%' : '35%',
                  transform: toriiStage >= 3 ? 'scale(1.5)' : 'scale(1)',
                  filter: toriiStage >= 3 ? 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))' : 'none',
                }}
              >
                🌠
              </div>

              {/* 流れ星の軌跡 */}
              {toriiStage > 0 && toriiStage < 3 && (
                <>
                  <div
                    className="absolute text-4xl opacity-70 transition-all duration-500"
                    style={{
                      left: `${15 + toriiStage * 8}%`,
                      top: `${15 + toriiStage * 5}%`,
                    }}
                  >
                    ✨
                  </div>
                  <div
                    className="absolute text-3xl opacity-50 transition-all duration-500"
                    style={{
                      left: `${12 + toriiStage * 6}%`,
                      top: `${12 + toriiStage * 4}%`,
                    }}
                  >
                    💫
                  </div>
                </>
              )}

              {/* 光の指し示す方向（Stage 3以降） */}
              {toriiStage >= 3 && (
                <>
                  {/* 中心から放射状に広がる光 */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="absolute w-2 h-48 bg-gradient-to-b from-shrine-gold via-shrine-gold/50 to-transparent opacity-60 animate-pulse"
                      style={{
                        top: '35%',
                        left: '50%',
                        transformOrigin: 'top center',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }}
                    />
                  </div>

                  {/* 光のパーティクル */}
                  <div className="absolute text-3xl animate-ping" style={{ left: '48%', top: '50%', animationDuration: '1s' }}>⭐</div>
                  <div className="absolute text-2xl animate-ping" style={{ left: '52%', top: '55%', animationDuration: '1.2s', animationDelay: '0.1s' }}>✨</div>
                  <div className="absolute text-3xl animate-ping" style={{ left: '46%', top: '58%', animationDuration: '1.3s', animationDelay: '0.2s' }}>💫</div>
                </>
              )}

              {/* 鳥居の出現（Stage 4以降） */}
              {toriiStage >= 4 && (
                <div
                  className="absolute text-9xl transition-all duration-1000 ease-out"
                  style={{
                    bottom: '15%',
                    opacity: toriiStage >= 4 ? 1 : 0,
                    transform: toriiStage >= 4 ? 'scale(1)' : 'scale(0.3)',
                    filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.6))',
                  }}
                >
                  ⛩️
                </div>
              )}

              {/* 周囲のキラキラエフェクト（最終段階） */}
              {toriiStage >= 5 && (
                <>
                  <div className="absolute text-4xl animate-ping" style={{ left: '25%', top: '70%', animationDuration: '1s' }}>✨</div>
                  <div className="absolute text-4xl animate-ping" style={{ right: '25%', top: '70%', animationDuration: '1.2s', animationDelay: '0.1s' }}>✨</div>
                  <div className="absolute text-3xl animate-ping" style={{ left: '35%', top: '25%', animationDuration: '1.1s', animationDelay: '0.2s' }}>⭐</div>
                  <div className="absolute text-3xl animate-ping" style={{ right: '35%', top: '25%', animationDuration: '1.3s', animationDelay: '0.15s' }}>💫</div>
                </>
              )}

              {/* プログレス表示 */}
              <div className="absolute bottom-8 flex space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i <= toriiStage
                        ? 'bg-shrine-gold scale-125 shadow-lg shadow-shrine-gold/50'
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* テキスト */}
            <p className="text-xl text-white/80 animate-pulse">
              {toriiStage < 3 ? '流れ星が導いています...' : toriiStage < 4 ? 'あなたの初詣先を探しています...' : '神社が見えてきました...'}
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
