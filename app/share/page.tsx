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

  // デバッグログ
  console.log('generateMetadata called with:', { temple, area, comment });

  // OGP画像APIのURL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hatsumode-maker.vercel.app';
  const ogpImageUrl = new URL(`${baseUrl}/api/ogp-image`);
  ogpImageUrl.searchParams.append('t', temple);
  ogpImageUrl.searchParams.append('a', area);
  ogpImageUrl.searchParams.append('c', comment);

  console.log('Generated OGP image URL:', ogpImageUrl.toString());

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
      url: `${baseUrl}/share?t=${encodeURIComponent(temple)}&a=${encodeURIComponent(area)}&c=${encodeURIComponent(comment)}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${temple} | AI初詣メーカー2026`,
      description: `AI初詣メーカー2026であなたの初詣先は「${temple}」に決定しました！`,
      images: {
        url: ogpImageUrl.toString(),
        alt: `${temple}の初詣結果`,
      },
    },
  };
}

export default function SharePage({ searchParams }: SharePageProps) {
  const { t: temple = '神社名', a: area = '未定', c: comment = 'エンジニア運勢' } = searchParams;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-5xl font-bold text-white drop-shadow-2xl">
          🎍 AI初詣メーカー2026
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

        <SharePageClient temple={temple} area={area} comment={comment} />

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
