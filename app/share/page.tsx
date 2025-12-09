import { Metadata } from 'next';
import { temples } from '@/lib/temples';
import SharePageClient from '@/components/SharePageClient';

interface SharePageProps {
  searchParams: {
    t?: string;  // temple (短縮)
    a?: string;  // area (短縮)
    c?: string;  // comment (短縮)
  };
}

// ダイナミックメタデータの生成
export async function generateMetadata(props: SharePageProps): Promise<Metadata> {
  const { t: temple = '神社名', a: area = '未定', c: comment = 'エンジニア運勢' } = props.searchParams;

  // OGP画像APIのURL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hatsumode-maker.vercel.app';
  const ogpImageUrl = new URL(`${baseUrl}/api/ogp-image`);
  ogpImageUrl.searchParams.append('t', temple);
  ogpImageUrl.searchParams.append('a', area);
  ogpImageUrl.searchParams.append('c', comment);

  return {
    title: `${temple} | AI初詣メーカー2026`,
    description: `AI初詣メーカー2026であなたの初詣先は「${temple}」に決定しました！エンジニア運勢：${comment}`,
    openGraph: {
      title: `${temple} | AI初詣メーカー2026`,
      description: `AI初詣メーカー2026であなたの初詣先は「${temple}」に決定しました！`,
      type: 'website',
      images: [
        {
          url: ogpImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: `${temple}の初詣結果`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${temple} | AI初詣メーカー2026`,
      description: `AI初詣メーカー2026であなたの初詣先は「${temple}」に決定しました！`,
      images: [ogpImageUrl.toString()],
    },
  };
}

export default function SharePage({ searchParams }: SharePageProps) {
  const { t: temple = '神社名', a: area = '未定', c: comment = 'エンジニア運勢' } = searchParams;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center space-y-6 sm:space-y-8 max-w-2xl w-full px-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-2xl px-4">
          🎍 AI初詣メーカー2026
        </h1>

        <div className="py-6 sm:py-8 space-y-3 sm:space-y-4">
          <div className="text-7xl sm:text-8xl md:text-9xl opacity-80">⛩️</div>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white break-words px-2">{temple}</p>
          <p className="text-xl sm:text-2xl text-shrine-gold">（{area}）</p>
        </div>

        <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-white/5 rounded-lg border border-shrine-gold/30">
          <p className="text-xs sm:text-sm text-shrine-gold/80 mb-2 sm:mb-3 font-bold">💻 エンジニア運勢</p>
          <p className="text-base sm:text-lg md:text-xl text-white/90 break-words">{comment}</p>
        </div>

        <div className="flex justify-center items-center space-x-3 sm:space-x-4 text-2xl sm:text-3xl">
          <span>🎍</span>
          <span>🎌</span>
          <span>🎍</span>
        </div>

        <SharePageClient temple={temple} area={area} comment={comment} />

        <a
          href="/"
          className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-shrine-red hover:bg-shrine-darkRed text-white font-bold rounded-lg shadow-lg transition-all duration-200"
        >
          ← もう一度引く
        </a>
      </div>
    </main>
  );
}
