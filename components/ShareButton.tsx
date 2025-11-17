'use client';

import { useState } from 'react';
import { Temple } from '@/lib/temples';
import { generateImage, downloadImage } from '@/lib/generateImage';

interface ShareButtonProps {
  temple: Temple;
}

export default function ShareButton({ temple }: ShareButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const dataUrl = await generateImage('result-card');
      downloadImage(dataUrl, `hatsumode-${temple.name}.png`);
    } catch (error) {
      console.error('Failed to download image:', error);
      alert('画像のダウンロードに失敗しました');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = () => {
    const text = `AI初詣メーカー2025で初詣先を決めてもらいました！\nあなたの初詣先は「${temple.name}」⛩️\n\n#AI初詣メーカー2025`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="px-6 py-3 bg-shrine-red hover:bg-shrine-darkRed disabled:bg-gray-500 text-white font-bold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
      >
        {isGenerating ? '生成中...' : '📥 ダウンロード'}
      </button>
      <button
        onClick={handleShare}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        𝕏 でシェア
      </button>
    </div>
  );
}
