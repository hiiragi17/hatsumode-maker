import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hatsumode-maker.vercel.app';
const ogpImageUrl = `${baseUrl}/api/ogp-image`;

export const metadata: Metadata = {
  title: 'AI初詣メーカー2026',
  description: 'AIがあなたの初詣先を強制的に決める - エンジニア向けエンタメWebアプリ',
  keywords: ['初詣', 'AI', '神社', '2026', 'おみくじ'],
  openGraph: {
    title: 'AI初詣メーカー2026',
    description: 'AIがあなたの初詣先を強制的に決めます',
    type: 'website',
    locale: 'ja_JP',
    url: baseUrl,
    images: [
      {
        url: ogpImageUrl,
        width: 1200,
        height: 630,
        alt: 'AI初詣メーカー2026 - AIがあなたの初詣先を決めます',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI初詣メーカー2026',
    description: 'AIがあなたの初詣先を強制的に決める',
    images: [ogpImageUrl],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
