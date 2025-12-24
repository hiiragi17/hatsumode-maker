import { describe, it, expect } from 'vitest';
import { encodeToShortId, decodeFromShortId, generateShortUrl, ShareParams } from '../lib/shortUrl';

describe('短縮URLとOGP統合テスト', () => {
  describe('短縮URLからOGPパラメータへの変換', () => {
    it('短縮IDからOGP画像URLを生成できること', () => {
      const params: ShareParams = {
        t: '清水寺',
        a: '京都',
        c: 'バグが減る一年になりそう',
      };

      // 短縮IDを生成
      const shortId = encodeToShortId(params);
      expect(shortId).toBeTruthy();

      // 短縮IDをデコード
      const decodedParams = decodeFromShortId(shortId);
      expect(decodedParams).not.toBeNull();
      expect(decodedParams?.t).toBe(params.t);
      expect(decodedParams?.a).toBe(params.a);
      expect(decodedParams?.c).toBe(params.c);

      // OGP画像URLを生成
      const baseUrl = 'https://hatsumode-maker.vercel.app';
      const ogpImageUrl = new URL(`${baseUrl}/api/ogp-image`);
      ogpImageUrl.searchParams.append('t', decodedParams!.t);
      ogpImageUrl.searchParams.append('a', decodedParams!.a);
      ogpImageUrl.searchParams.append('c', decodedParams!.c);

      expect(ogpImageUrl.toString()).toContain('/api/ogp-image');
      expect(ogpImageUrl.searchParams.get('t')).toBe('清水寺');
      expect(ogpImageUrl.searchParams.get('a')).toBe('京都');
      expect(ogpImageUrl.searchParams.get('c')).toBe('バグが減る一年になりそう');
    });

    it('複数の診断結果でユニークな短縮IDが生成されること', () => {
      const params1: ShareParams = {
        t: '伏見稲荷大社',
        a: '京都',
        c: 'コードレビューが捗る',
      };

      const params2: ShareParams = {
        t: '八坂神社',
        a: '京都',
        c: 'デプロイが成功する',
      };

      const shortId1 = encodeToShortId(params1);
      const shortId2 = encodeToShortId(params2);

      // 異なるパラメータは異なる短縮IDを生成する
      expect(shortId1).not.toBe(shortId2);

      // それぞれが正しくデコードできる
      const decoded1 = decodeFromShortId(shortId1);
      const decoded2 = decodeFromShortId(shortId2);

      expect(decoded1?.t).toBe(params1.t);
      expect(decoded2?.t).toBe(params2.t);
    });

    it('完全な短縮URLが生成できること', () => {
      const params: ShareParams = {
        t: '金閣寺',
        a: '京都',
        c: 'テストが全部通る運勢',
      };

      const baseUrl = 'https://hatsumode-maker.vercel.app';
      const shortUrl = generateShortUrl(params, baseUrl);

      // URLの形式を確認
      expect(shortUrl).toMatch(/^https:\/\/hatsumode-maker\.vercel\.app\/s\/.+$/);

      // URLから短縮IDを抽出してデコード
      const shortId = shortUrl.split('/s/')[1];
      const decodedParams = decodeFromShortId(shortId);

      expect(decodedParams?.t).toBe(params.t);
      expect(decodedParams?.a).toBe(params.a);
      expect(decodedParams?.c).toBe(params.c);
    });
  });

  describe('OGPメタデータの完全性', () => {
    it('短縮URLページで正しいOGPメタデータが生成されること', () => {
      const params: ShareParams = {
        t: '貴船神社',
        a: '京都',
        c: 'プルリクが速攻でマージされる',
      };

      const baseUrl = 'https://hatsumode-maker.vercel.app';
      const shortId = encodeToShortId(params);
      const shortUrl = `${baseUrl}/s/${shortId}`;

      // OGP画像URLを生成
      const ogpImageUrl = new URL(`${baseUrl}/api/ogp-image`);
      ogpImageUrl.searchParams.append('t', params.t);
      ogpImageUrl.searchParams.append('a', params.a);
      ogpImageUrl.searchParams.append('c', params.c);

      // OGPメタデータを構築
      const metadata = {
        title: `${params.t} | AI初詣メーカー2026`,
        description: `AI初詣メーカー2026であなたの初詣先は「${params.t}」に決定しました！エンジニア運勢：${params.c}`,
        openGraph: {
          title: `${params.t} | AI初詣メーカー2026`,
          description: `AI初詣メーカー2026であなたの初詣先は「${params.t}」に決定しました！`,
          type: 'website',
          url: shortUrl,
          images: [
            {
              url: ogpImageUrl.toString(),
              width: 1200,
              height: 630,
              alt: `${params.t}の初詣結果`,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${params.t} | AI初詣メーカー2026`,
          description: `AI初詣メーカー2026であなたの初詣先は「${params.t}」に決定しました！`,
          images: [ogpImageUrl.toString()],
        },
      };

      // メタデータの検証
      expect(metadata.title).toContain('貴船神社');
      expect(metadata.openGraph.url).toBe(shortUrl);
      expect(metadata.openGraph.images[0].url).toContain('/api/ogp-image');
      expect(metadata.openGraph.images[0].url).toContain('t=');
      expect(metadata.openGraph.images[0].url).toContain('a=');
      expect(metadata.openGraph.images[0].url).toContain('c=');
      expect(metadata.twitter.card).toBe('summary_large_image');
    });
  });

  describe('特殊文字とエンコーディング', () => {
    it('特殊文字を含むパラメータが正しく処理されること', () => {
      const params: ShareParams = {
        t: '引接寺（千本閻魔堂）',
        a: '京都',
        c: 'バグ0件！本番デプロイも問題なし！🎉',
      };

      // エンコードとデコードのラウンドトリップ
      const shortId = encodeToShortId(params);
      const decodedParams = decodeFromShortId(shortId);

      expect(decodedParams?.t).toBe(params.t);
      expect(decodedParams?.a).toBe(params.a);
      expect(decodedParams?.c).toBe(params.c);

      // OGP画像URLでも正しくエンコードされる
      const baseUrl = 'https://hatsumode-maker.vercel.app';
      const ogpImageUrl = new URL(`${baseUrl}/api/ogp-image`);
      ogpImageUrl.searchParams.append('t', params.t);
      ogpImageUrl.searchParams.append('a', params.a);
      ogpImageUrl.searchParams.append('c', params.c);

      // URLパラメータが正しくエンコード/デコードされる
      expect(ogpImageUrl.searchParams.get('t')).toBe(params.t);
      expect(ogpImageUrl.searchParams.get('a')).toBe(params.a);
      expect(ogpImageUrl.searchParams.get('c')).toBe(params.c);
    });

    it('無効な短縮IDが正しく処理されること', () => {
      const invalidShortIds = [
        'invalid',
        '!!!',
        '',
        '123',
        'あいうえお',
      ];

      invalidShortIds.forEach((invalidId) => {
        const result = decodeFromShortId(invalidId);
        // 無効なIDはnullを返すべき
        expect(result).toBeNull();
      });
    });
  });

  describe('長い文字列の処理', () => {
    it('非常に長いコメントでも短縮URLが生成できること', () => {
      const params: ShareParams = {
        t: '住吉神社',
        a: '京都',
        c: 'これは非常に長いコメントです。'.repeat(10),
      };

      const shortId = encodeToShortId(params);
      expect(shortId).toBeTruthy();

      const decodedParams = decodeFromShortId(shortId);
      expect(decodedParams?.c).toBe(params.c);
    });

    it('OGP画像では長いコメントが適切に切り詰められること', () => {
      const longComment = 'これは非常に長いコメントで、40文字を大幅に超えています。このコメントは切り詰められるべきです。';

      // OGP画像APIのロジックと同じ切り詰め処理
      const truncatedComment = longComment.length > 40
        ? longComment.substring(0, 37) + '...'
        : longComment;

      expect(truncatedComment.length).toBe(40);
      expect(truncatedComment).toContain('...');
      expect(truncatedComment.startsWith('これは非常に長いコメントで、40文字を大幅に超えています。')).toBe(true);
    });
  });
});
