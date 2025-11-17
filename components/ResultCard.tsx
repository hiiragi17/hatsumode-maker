import { Temple } from '@/lib/temples';

interface ResultCardProps {
  temple: Temple;
  comment: string;
}

export default function ResultCard({ temple, comment }: ResultCardProps) {
  return (
    <div
      id="result-card"
      className="relative w-full max-w-md mx-auto p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl"
    >
      {/* 星のデコレーション */}
      <div className="absolute top-4 right-4 text-4xl">⭐</div>
      <div className="absolute top-8 left-6 text-2xl opacity-60">✨</div>
      <div className="absolute bottom-6 right-8 text-2xl opacity-60">✨</div>

      <div className="text-center space-y-6">
        {/* タイトル */}
        <h2 className="text-xl md:text-2xl font-bold text-white/90 tracking-wide">
          あなたの初詣先は…
        </h2>

        {/* 神社名 */}
        <div className="py-8 space-y-2">
          <div className="text-4xl mb-4">⛩️</div>
          <p className="text-3xl md:text-4xl font-bold text-white">
            {temple.name}
          </p>
          <p className="text-lg md:text-xl text-shrine-gold">
            （{temple.area}）
          </p>
        </div>

        {/* エンジニア専用コメント */}
        <div className="px-4 py-6 bg-white/5 rounded-lg border border-shrine-gold/30">
          <p className="text-xs text-shrine-gold/80 mb-2 font-bold">💻 エンジニア運勢</p>
          <p className="text-sm md:text-base text-white/90 leading-relaxed">
            {comment}
          </p>
        </div>

        {/* デコレーション */}
        <div className="flex justify-center items-center space-x-2 text-2xl">
          <span>🎍</span>
          <span>🎌</span>
          <span>🎍</span>
        </div>

        {/* フッター */}
        <p className="text-sm text-white/70 pt-4">
          AI初詣メーカー2026
        </p>
      </div>
    </div>
  );
}
