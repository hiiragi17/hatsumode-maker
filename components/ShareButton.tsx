'use client';

import { useState } from 'react';
import { Temple } from '@/lib/temples';

interface ShareButtonProps {
  temple: Temple;
  comment?: string;
}

export default function ShareButton({ temple, comment = 'エンジニア運勢' }: ShareButtonProps) {
  const [isShortening, setIsShortening] = useState(false);

  const handleShare = async () => {
    setIsShortening(true);
    try {
      // シェアリングページのURL
      const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BASE_URL || 'https://hatsumode-maker.vercel.app';
      const shareUrl = new URL(`${baseUrl}/share`);
      shareUrl.searchParams.append('t', temple.name);
      shareUrl.searchParams.append('a', temple.area);
      shareUrl.searchParams.append('c', comment);

      // URL短縮を試みる
      let finalUrl = shareUrl.toString();
      try {
        const response = await fetch('/api/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: shareUrl.toString() }),
        });
        const data = await response.json();
        if (data.shortUrl) {
          finalUrl = data.shortUrl;
        }
      } catch (error) {
        // URL短縮に失敗した場合は元のURLを使用
      }

      // ツイートテキスト
      const text = `AI初詣メーカー2026で初詣先を決めてもらいました！\nあなたの初詣先は「${temple.name}」⛩️\n\n#AI初詣メーカー2026`;

      // ツイート意図URL
      const tweetUrl = new URL('https://twitter.com/intent/tweet');
      tweetUrl.searchParams.append('text', text);
      tweetUrl.searchParams.append('url', finalUrl);

      window.open(tweetUrl.toString(), '_blank', 'noopener,noreferrer');
    } finally {
      setIsShortening(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <button
        onClick={handleShare}
        disabled={isShortening}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-wait text-white font-bold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
      >
        {isShortening ? 'URL短縮中...' : '𝕏 でシェア'}
      </button>
    </div>
  );
}
