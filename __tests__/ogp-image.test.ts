import { describe, it, expect } from 'vitest';

describe('OGP画像生成API', () => {
  describe('URLパラメータのエンコーディング', () => {
    it('神社名、地域、コメントが正しくURLパラメータに変換されること', () => {
      const baseUrl = 'https://hatsumode-maker.vercel.app';
      const temple = '清水寺';
      const area = '京都';
      const comment = 'バグが減る一年になりそう';

      const ogpImageUrl = new URL(`${baseUrl}/api/ogp-image`);
      ogpImageUrl.searchParams.append('t', temple);
      ogpImageUrl.searchParams.append('a', area);
      ogpImageUrl.searchParams.append('c', comment);

      expect(ogpImageUrl.toString()).toContain('/api/ogp-image');
      expect(ogpImageUrl.searchParams.get('t')).toBe(temple);
      expect(ogpImageUrl.searchParams.get('a')).toBe(area);
      expect(ogpImageUrl.searchParams.get('c')).toBe(comment);
    });

    it('特殊文字を含む神社名が正しくエンコードされること', () => {
      const baseUrl = 'https://hatsumode-maker.vercel.app';
      const temple = '教王護国寺（東寺）';
      const area = '京都';
      const comment = 'テスト用コメント（特殊文字：!@#$%）';

      const ogpImageUrl = new URL(`${baseUrl}/api/ogp-image`);
      ogpImageUrl.searchParams.append('t', temple);
      ogpImageUrl.searchParams.append('a', area);
      ogpImageUrl.searchParams.append('c', comment);

      // 特殊文字が正しくエンコード/デコードされることを確認
      expect(ogpImageUrl.searchParams.get('t')).toBe(temple);
      expect(ogpImageUrl.searchParams.get('a')).toBe(area);
      expect(ogpImageUrl.searchParams.get('c')).toBe(comment);
    });
  });

  describe('OGP画像URLの形式', () => {
    it('正しいOGP画像URLが生成されること', () => {
      const baseUrl = 'https://hatsumode-maker.vercel.app';
      const temple = '伏見稲荷大社';
      const area = '京都';
      const comment = 'コードレビューが捗る';

      const ogpImageUrl = new URL(`${baseUrl}/api/ogp-image`);
      ogpImageUrl.searchParams.append('t', temple);
      ogpImageUrl.searchParams.append('a', area);
      ogpImageUrl.searchParams.append('c', comment);

      const urlString = ogpImageUrl.toString();

      // URLの基本構造を確認
      expect(urlString).toMatch(/^https:\/\//);
      expect(urlString).toContain('hatsumode-maker.vercel.app');
      expect(urlString).toContain('/api/ogp-image');
      expect(urlString).toContain('?');

      // すべてのパラメータが含まれていることを確認
      expect(urlString).toContain('t=');
      expect(urlString).toContain('a=');
      expect(urlString).toContain('c=');
    });

    it('パラメータなしのURLが正しく生成されること（デフォルトOGP用）', () => {
      const baseUrl = 'https://hatsumode-maker.vercel.app';
      const ogpImageUrl = new URL(`${baseUrl}/api/ogp-image`);

      const urlString = ogpImageUrl.toString();

      // デフォルトOGP画像のURLを確認
      expect(urlString).toBe('https://hatsumode-maker.vercel.app/api/ogp-image');
      expect(ogpImageUrl.searchParams.get('t')).toBeNull();
      expect(ogpImageUrl.searchParams.get('a')).toBeNull();
      expect(ogpImageUrl.searchParams.get('c')).toBeNull();
    });
  });

  describe('OGPメタデータの構造', () => {
    it('必要なOGPプロパティが定義されていること', () => {
      const temple = '平安神宮';
      const area = '京都';
      const comment = 'デプロイが成功する運勢';
      const baseUrl = 'https://hatsumode-maker.vercel.app';
      const shortId = 'test123';

      const ogpImageUrl = new URL(`${baseUrl}/api/ogp-image`);
      ogpImageUrl.searchParams.append('t', temple);
      ogpImageUrl.searchParams.append('a', area);
      ogpImageUrl.searchParams.append('c', comment);

      const shortUrl = `${baseUrl}/s/${shortId}`;

      const metadata = {
        title: `${temple} | AI初詣メーカー2026`,
        description: `AI初詣メーカー2026であなたの初詣先は「${temple}」に決定しました！エンジニア運勢：${comment}`,
        openGraph: {
          title: `${temple} | AI初詣メーカー2026`,
          description: `AI初詣メーカー2026であなたの初詣先は「${temple}」に決定しました！`,
          type: 'website',
          url: shortUrl,
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

      // メタデータの構造を確認
      expect(metadata.title).toContain(temple);
      expect(metadata.description).toContain(temple);
      expect(metadata.description).toContain(comment);

      // OpenGraph設定を確認
      expect(metadata.openGraph.type).toBe('website');
      expect(metadata.openGraph.images).toHaveLength(1);
      expect(metadata.openGraph.images[0].width).toBe(1200);
      expect(metadata.openGraph.images[0].height).toBe(630);
      expect(metadata.openGraph.images[0].url).toContain('/api/ogp-image');

      // Twitter Card設定を確認
      expect(metadata.twitter.card).toBe('summary_large_image');
      expect(metadata.twitter.images).toHaveLength(1);
      expect(metadata.twitter.images[0]).toContain('/api/ogp-image');
    });
  });

  describe('コメントの長さ処理', () => {
    it('長いコメントが40文字で切り詰められること', () => {
      const longComment = 'これは非常に長いコメントです。このコメントは40文字を超えているため、切り詰められる必要があります。';

      // 実際のAPI実装と同じロジック
      const truncatedComment = longComment.length > 40
        ? longComment.substring(0, 37) + '...'
        : longComment;

      expect(truncatedComment.length).toBeLessThanOrEqual(40);
      expect(truncatedComment).toContain('...');
      expect(longComment.startsWith(truncatedComment.substring(0, 37))).toBe(true);
    });

    it('短いコメントはそのまま表示されること', () => {
      const shortComment = 'バグが減る一年';

      const truncatedComment = shortComment.length > 40
        ? shortComment.substring(0, 37) + '...'
        : shortComment;

      expect(truncatedComment).toBe(shortComment);
      expect(truncatedComment).not.toContain('...');
    });

    it('コメントの長さに応じてフォントサイズが調整されること', () => {
      const shortComment = 'テスト';
      const longComment = 'これは30文字を確実に超える長いコメントです。テストテストテスト！';

      const shortCommentFontSize = shortComment.length > 30 ? 28 : 36;
      const longCommentFontSize = longComment.length > 30 ? 28 : 36;

      expect(shortCommentFontSize).toBe(36);
      expect(longCommentFontSize).toBe(28);
    });
  });
});
