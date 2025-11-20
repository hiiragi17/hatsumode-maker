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
        }, 800);
      }
    }, 900); // 900msごとに次のステージへ（よりゆっくり）
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
                className="absolute text-8xl transition-all duration-900 ease-out"
                style={{
                  left: toriiStage === 0 ? '80%' : toriiStage === 1 ? '65%' : toriiStage === 2 ? '52%' : '50%',
                  top: toriiStage === 0 ? '5%' : toriiStage === 1 ? '15%' : toriiStage === 2 ? '28%' : '35%',
                  transform: toriiStage === 0
                    ? 'scale(1) rotate(-35deg)'
                    : toriiStage === 1
                    ? 'scale(1.1) rotate(-30deg)'
                    : toriiStage === 2
                    ? 'scale(1.3) rotate(-20deg)'
                    : toriiStage >= 3
                    ? 'scale(2.2) rotate(0deg)'
                    : 'scale(1)',
                  filter: toriiStage >= 3
                    ? 'drop-shadow(0 0 40px rgba(255, 215, 0, 1)) drop-shadow(0 0 60px rgba(255, 255, 255, 0.8))'
                    : toriiStage >= 1
                    ? 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.7))'
                    : 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))',
                }}
              >
                🌠
              </div>

              {/* 流れ星の軌跡（強化版・斜め移動に対応） */}
              {toriiStage > 0 && (
                <>
                  {/* Stage 1の軌跡（右上から） */}
                  {toriiStage >= 1 && (
                    <>
                      <div
                        className="absolute text-5xl transition-all duration-800 animate-pulse"
                        style={{
                          left: '75%',
                          top: '7%',
                          opacity: toriiStage === 1 ? 0.9 : toriiStage === 2 ? 0.6 : 0.3,
                        }}
                      >
                        ✨
                      </div>
                      <div
                        className="absolute text-4xl transition-all duration-800"
                        style={{
                          left: '78%',
                          top: '6%',
                          opacity: toriiStage === 1 ? 0.7 : toriiStage === 2 ? 0.4 : 0.2,
                        }}
                      >
                        💫
                      </div>
                    </>
                  )}

                  {/* Stage 2の軌跡 */}
                  {toriiStage >= 2 && (
                    <>
                      <div
                        className="absolute text-5xl transition-all duration-800 animate-pulse"
                        style={{
                          left: '60%',
                          top: '12%',
                          opacity: toriiStage === 2 ? 0.9 : 0.5,
                        }}
                      >
                        ⭐
                      </div>
                      <div
                        className="absolute text-4xl transition-all duration-800"
                        style={{
                          left: '63%',
                          top: '10%',
                          opacity: toriiStage === 2 ? 0.7 : 0.4,
                        }}
                      >
                        ✨
                      </div>
                      <div
                        className="absolute text-3xl transition-all duration-800"
                        style={{
                          left: '68%',
                          top: '9%',
                          opacity: toriiStage === 2 ? 0.6 : 0.3,
                        }}
                      >
                        💫
                      </div>
                    </>
                  )}

                  {/* Stage 3の軌跡 */}
                  {toriiStage >= 3 && (
                    <>
                      <div
                        className="absolute text-4xl transition-all duration-800 animate-pulse"
                        style={{
                          left: '55%',
                          top: '22%',
                          opacity: 0.7,
                        }}
                      >
                        ✨
                      </div>
                      <div
                        className="absolute text-3xl transition-all duration-800"
                        style={{
                          left: '58%',
                          top: '18%',
                          opacity: 0.5,
                        }}
                      >
                        💫
                      </div>
                    </>
                  )}

                  {/* 長い軌跡のサブエフェクト */}
                  {toriiStage === 1 && (
                    <>
                      <div className="absolute text-3xl opacity-50 animate-pulse" style={{ left: '82%', top: '5%' }}>✨</div>
                      <div className="absolute text-2xl opacity-40" style={{ left: '85%', top: '4%' }}>💫</div>
                    </>
                  )}
                  {toriiStage === 2 && (
                    <>
                      <div className="absolute text-3xl opacity-50 animate-pulse" style={{ left: '70%', top: '8%' }}>⭐</div>
                      <div className="absolute text-2xl opacity-40" style={{ left: '73%', top: '7%' }}>✨</div>
                    </>
                  )}
                </>
              )}

              {/* 光の指し示す方向（Stage 3以降） */}
              {toriiStage >= 3 && (
                <>
                  {/* 中心から放射状に広がる光（複数） */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="absolute w-3 h-56 bg-gradient-to-b from-shrine-gold via-shrine-gold/60 to-transparent opacity-80 animate-pulse"
                      style={{
                        top: '35%',
                        left: '50%',
                        transformOrigin: 'top center',
                        animation: 'pulse 1.2s ease-in-out infinite'
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="absolute w-2 h-48 bg-gradient-to-b from-white via-shrine-gold/40 to-transparent opacity-60 animate-pulse"
                      style={{
                        top: '35%',
                        left: '48%',
                        transformOrigin: 'top center',
                        animation: 'pulse 1.5s ease-in-out infinite',
                        animationDelay: '0.2s'
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="absolute w-2 h-48 bg-gradient-to-b from-white via-shrine-gold/40 to-transparent opacity-60 animate-pulse"
                      style={{
                        top: '35%',
                        left: '52%',
                        transformOrigin: 'top center',
                        animation: 'pulse 1.5s ease-in-out infinite',
                        animationDelay: '0.3s'
                      }}
                    />
                  </div>

                  {/* 光のパーティクル（大幅増量） */}
                  <div className="absolute text-4xl animate-ping" style={{ left: '48%', top: '48%', animationDuration: '0.8s' }}>⭐</div>
                  <div className="absolute text-3xl animate-ping" style={{ left: '52%', top: '52%', animationDuration: '1s', animationDelay: '0.1s' }}>✨</div>
                  <div className="absolute text-4xl animate-ping" style={{ left: '46%', top: '56%', animationDuration: '1.1s', animationDelay: '0.2s' }}>💫</div>
                  <div className="absolute text-3xl animate-ping" style={{ left: '54%', top: '50%', animationDuration: '1.2s', animationDelay: '0.15s' }}>⭐</div>
                  <div className="absolute text-4xl animate-ping" style={{ left: '50%', top: '54%', animationDuration: '0.9s', animationDelay: '0.25s' }}>✨</div>
                  <div className="absolute text-3xl animate-ping" style={{ left: '45%', top: '52%', animationDuration: '1.3s', animationDelay: '0.3s' }}>💫</div>

                  {/* 周囲に広がるパーティクル */}
                  <div className="absolute text-3xl animate-ping" style={{ left: '40%', top: '45%', animationDuration: '1.4s', animationDelay: '0.1s' }}>✨</div>
                  <div className="absolute text-3xl animate-ping" style={{ right: '40%', top: '45%', animationDuration: '1.3s', animationDelay: '0.2s' }}>✨</div>
                  <div className="absolute text-2xl animate-ping" style={{ left: '35%', top: '60%', animationDuration: '1.5s', animationDelay: '0.3s' }}>⭐</div>
                  <div className="absolute text-2xl animate-ping" style={{ right: '35%', top: '60%', animationDuration: '1.2s', animationDelay: '0.25s' }}>💫</div>
                </>
              )}

              {/* 鳥居の出現（Stage 4以降） */}
              {toriiStage >= 4 && (
                <>
                  <div
                    className="absolute text-9xl transition-all duration-1200 ease-out"
                    style={{
                      bottom: '15%',
                      opacity: toriiStage >= 4 ? 1 : 0,
                      transform: toriiStage >= 4 ? 'scale(1.2)' : 'scale(0.2)',
                      filter: 'drop-shadow(0 0 50px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 80px rgba(255, 255, 255, 0.6))',
                    }}
                  >
                    ⛩️
                  </div>
                  {/* 鳥居周りの光の輪 */}
                  <div
                    className="absolute transition-all duration-1200"
                    style={{
                      bottom: '15%',
                      left: '50%',
                      transform: 'translate(-50%, 0)',
                      opacity: toriiStage >= 4 ? 0.6 : 0,
                    }}
                  >
                    <div className="w-72 h-72 rounded-full border-4 border-shrine-gold/40 animate-ping" style={{ animationDuration: '2s' }} />
                  </div>
                  <div
                    className="absolute transition-all duration-1200"
                    style={{
                      bottom: '15%',
                      left: '50%',
                      transform: 'translate(-50%, 0)',
                      opacity: toriiStage >= 4 ? 0.4 : 0,
                    }}
                  >
                    <div className="w-96 h-96 rounded-full border-4 border-white/30 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
                  </div>
                </>
              )}

              {/* 周囲のキラキラエフェクト（最終段階・大幅増量） */}
              {toriiStage >= 5 && (
                <>
                  {/* メインのキラキラ */}
                  <div className="absolute text-5xl animate-ping" style={{ left: '20%', top: '65%', animationDuration: '0.8s' }}>✨</div>
                  <div className="absolute text-5xl animate-ping" style={{ right: '20%', top: '65%', animationDuration: '1s', animationDelay: '0.1s' }}>✨</div>
                  <div className="absolute text-4xl animate-ping" style={{ left: '30%', top: '20%', animationDuration: '0.9s', animationDelay: '0.2s' }}>⭐</div>
                  <div className="absolute text-4xl animate-ping" style={{ right: '30%', top: '20%', animationDuration: '1.1s', animationDelay: '0.15s' }}>💫</div>

                  {/* サブのキラキラ */}
                  <div className="absolute text-4xl animate-ping" style={{ left: '15%', top: '35%', animationDuration: '1.2s', animationDelay: '0.3s' }}>💫</div>
                  <div className="absolute text-4xl animate-ping" style={{ right: '15%', top: '35%', animationDuration: '1.3s', animationDelay: '0.25s' }}>⭐</div>
                  <div className="absolute text-3xl animate-ping" style={{ left: '25%', top: '50%', animationDuration: '1.4s', animationDelay: '0.2s' }}>✨</div>
                  <div className="absolute text-3xl animate-ping" style={{ right: '25%', top: '50%', animationDuration: '1.5s', animationDelay: '0.35s' }}>✨</div>

                  {/* 四隅のキラキラ */}
                  <div className="absolute text-3xl animate-ping" style={{ left: '10%', top: '15%', animationDuration: '1.1s', animationDelay: '0.4s' }}>⭐</div>
                  <div className="absolute text-3xl animate-ping" style={{ right: '10%', top: '15%', animationDuration: '1.2s', animationDelay: '0.35s' }}>💫</div>
                  <div className="absolute text-3xl animate-ping" style={{ left: '10%', top: '75%', animationDuration: '1.3s', animationDelay: '0.2s' }}>💫</div>
                  <div className="absolute text-3xl animate-ping" style={{ right: '10%', top: '75%', animationDuration: '1.4s', animationDelay: '0.3s' }}>⭐</div>

                  {/* 上下のキラキラ */}
                  <div className="absolute text-4xl animate-ping" style={{ left: '50%', top: '10%', animationDuration: '1s', animationDelay: '0.1s' }}>✨</div>
                  <div className="absolute text-4xl animate-ping" style={{ left: '50%', top: '80%', animationDuration: '1.2s', animationDelay: '0.2s' }}>✨</div>
                </>
              )}

              {/* プログレス表示 */}
              <div className="absolute bottom-8 flex space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full transition-all duration-500 ${
                      i <= toriiStage
                        ? 'bg-shrine-gold scale-150 shadow-2xl shadow-shrine-gold/80 animate-pulse'
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* テキスト */}
            <p className="text-2xl text-white/90 animate-pulse font-bold drop-shadow-lg">
              {toriiStage < 3 ? '✨ 流れ星が導いています... ✨' : toriiStage < 4 ? '🌟 あなたの初詣先を探しています... 🌟' : '⛩️ 神社が見えてきました... ⛩️'}
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
