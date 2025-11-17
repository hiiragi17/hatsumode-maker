import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI初詣メーカー2025',
  description: 'AIがあなたの初詣先を強制的に決める - エンジニア向けエンタメWebアプリ',
  keywords: ['初詣', 'AI', '神社', '2025', 'おみくじ'],
  openGraph: {
    title: 'AI初詣メーカー2025',
    description: 'AIがあなたの初詣先を強制的に決めます',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI初詣メーカー2025',
    description: 'AIがあなたの初詣先を強制的に決める',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
