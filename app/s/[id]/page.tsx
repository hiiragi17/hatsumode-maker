import { Metadata } from 'next';
import { decodeFromShortId } from '@/lib/shortUrl';
import { redirect } from 'next/navigation';

interface ShortUrlPageProps {
  params: {
    id: string;
  };
}

// ダイナミックメタデータの生成（Twitterクローラー用）
export async function generateMetadata({ params }: ShortUrlPageProps): Promise<Metadata> {
  const { id } = params;

  // 短縮IDをデコード
  const decodedParams = decodeFromShortId(id);

  if (!decodedParams) {
    return {
      title: 'AI初詣メーカー2026',
      description: 'AIがあなたの初詣先を強制的に決めます',
    };
  }

  const { t: temple, a: area, c: comment } = decodedParams;

  // OGP画像APIのURL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hatsumode-maker.vercel.app';
  const ogpImageUrl = new URL(`${baseUrl}/api/ogp-image`);
  ogpImageUrl.searchParams.append('t', temple);
  ogpImageUrl.searchParams.append('a', area);
  ogpImageUrl.searchParams.append('c', comment);

  // 短縮URLそのものをog:urlに設定（リダイレクトなし）
  const shortUrl = `${baseUrl}/s/${id}`;

  return {
    title: `${temple} | AI初詣メーカー2026`,
    description: `AI初詣メーカー2026であなたの初詣先は「${temple}」に決定しました！エンジニア運勢：${comment}`,
    openGraph: {
      title: `${temple} | AI初詣メーカー2026`,
      description: `AI初詣メーカー2026であなたの初詣先は「${temple}」に決定しました！`,
      type: 'website',
      url: shortUrl, // 短縮URLをそのまま使用
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
      images: {
        url: ogpImageUrl.toString(),
        alt: `${temple}の初詣結果`,
      },
    },
  };
}

export default function ShortUrlPage({ params }: ShortUrlPageProps) {
  const { id } = params;

  // 短縮IDをデコード
  const decodedParams = decodeFromShortId(id);

  if (!decodedParams) {
    // デコードに失敗した場合はトップページにリダイレクト
    redirect('/');
  }

  const { t: temple, a: area, c: comment } = decodedParams;

  // 元の共有ページURLを構築
  const shareUrl = `/share?t=${encodeURIComponent(temple)}&a=${encodeURIComponent(area)}&c=${encodeURIComponent(comment)}`;

  // 通常のブラウザの場合、クライアントサイドでリダイレクト
  // （クローラーはこのJSを実行しないので、OGPタグだけを取得する）
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=${shareUrl}`} />
        <script dangerouslySetInnerHTML={{
          __html: `window.location.href = '${shareUrl}';`
        }} />
      </head>
      <body>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily: 'sans-serif'
        }}>
          <p>リダイレクト中...</p>
        </div>
      </body>
    </html>
  );
}
