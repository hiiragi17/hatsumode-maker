'use client';

import { useState } from 'react';

interface SharePageClientProps {
  temple: string;
  area: string;
  comment: string;
}

export default function SharePageClient({ temple, area, comment }: SharePageClientProps) {
  const [isShortening, setIsShortening] = useState(false);

  const handleShare = async () => {
    setIsShortening(true);
    try {
      // 現在のページのURL
      const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

      // URL短縮を試みる
      let finalUrl = currentUrl;
      try {
        const response = await fetch('/api/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: currentUrl }),
        });
        const data = await response.json();
        if (data.shortUrl) {
          finalUrl = data.shortUrl;
        }
      } catch (error) {
        console.error('URL短縮に失敗しました。元のURLを使用します。', error);
      }

      // ツイートテキスト
      const text = `AI初詣メーカー2026で初詣先を決めてもらいました！\n${temple}（${area}）⛩️\n\n#AI初詣メーカー2026`;

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
    <div className="space-y-4">
      <p className="text-lg text-white/70">
        このページをツイートしてシェアできます
      </p>
      <button
        onClick={handleShare}
        disabled={isShortening}
        className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-wait text-white font-bold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
      >
        {isShortening ? 'URL短縮中...' : '𝕏 でシェア'}
      </button>
    </div>
  );
}
