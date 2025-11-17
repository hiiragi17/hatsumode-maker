import { Metadata } from 'next';
import { temples } from '@/lib/temples';

interface SharePageProps {
  searchParams: {
    temple?: string;
    area?: string;
    comment?: string;
  };
}

// ダイナミックメタデータの生成
export async function generateMetadata(props: SharePageProps): Promise<Metadata> {
  const { temple = '神社名', area = '未定', comment = 'エンジニア運勢' } = props.searchParams;

  // OGP画像APIのURL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const ogpImageUrl = new URL(`${baseUrl}/api/ogp-image`);
  ogpImageUrl.searchParams.append('temple', temple);
  ogpImageUrl.searchParams.append('area', area);
  ogpImageUrl.searchParams.append('comment', comment);

  return {
    title: `${temple} | AI初詣メーカー2025`,
    description: `AI初詣メーカー2025であなたの初詣先は「${temple}」に決定しました！エンジニア運勢：${comment}`,
    openGraph: {
      title: `${temple} | AI初詣メーカー2025`,
      description: `AI初詣メーカー2025であなたの初詣先は「${temple}」に決定しました！`,
      type: 'website',
      images: [
        {
          url: ogpImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: `${temple}の初詣結果`,
        },
      ],
      url: `${baseUrl}/share?temple=${encodeURIComponent(temple)}&area=${encodeURIComponent(area)}&comment=${encodeURIComponent(comment)}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${temple} | AI初詣メーカー2025`,
      description: `AI初詣メーカー2025であなたの初詣先は「${temple}」に決定しました！`,
      images: [ogpImageUrl.toString()],
    },
  };
}

export default function SharePage({ searchParams }: SharePageProps) {
  const { temple = '神社名', area = '未定', comment = 'エンジニア運勢' } = searchParams;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-5xl font-bold text-white drop-shadow-2xl">
          🎍 AI初詣メーカー2025
        </h1>

        <div className="py-8 space-y-4">
          <div className="text-9xl opacity-80">⛩️</div>
          <p className="text-4xl font-bold text-white">{temple}</p>
          <p className="text-2xl text-shrine-gold">（{area}）</p>
        </div>

        <div className="px-8 py-6 bg-white/5 rounded-lg border border-shrine-gold/30">
          <p className="text-sm text-shrine-gold/80 mb-3 font-bold">💻 エンジニア運勢</p>
          <p className="text-xl text-white/90">{comment}</p>
        </div>

        <div className="flex justify-center items-center space-x-4 text-3xl">
          <span>🎍</span>
          <span>🎌</span>
          <span>🎍</span>
        </div>

        <div className="space-y-4">
          <p className="text-lg text-white/70">
            このページをツイートしてシェアできます
          </p>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`AI初詣メーカー2025で初詣先を決めてもらいました！\\n${temple}（${area}）⛩️\\n\\n#AI初詣メーカー2025`)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
            className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            𝕏 でシェア
          </a>
        </div>

        <a
          href="/"
          className="inline-block px-8 py-3 bg-shrine-red hover:bg-shrine-darkRed text-white font-bold rounded-lg shadow-lg transition-all duration-200"
        >
          ← もう一度引く
        </a>
      </div>
    </main>
  );
}
