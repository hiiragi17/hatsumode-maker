/**
 * 短縮URLのエンコード/デコード機能
 * Base64URLエンコーディングを使用してパラメータを短縮IDに変換
 */

export interface ShareParams {
  t: string; // temple
  a: string; // area
  c: string; // comment
}

/**
 * パラメータを短縮IDにエンコード
 */
export function encodeToShortId(params: ShareParams): string {
  const json = JSON.stringify(params);
  // Base64エンコードしてURL-safeに変換
  const base64 = Buffer.from(json, 'utf-8').toString('base64');
  // URL-safe形式に変換 (+を-に、/を_に、=を削除)
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * 短縮IDをパラメータにデコード
 */
export function decodeFromShortId(shortId: string): ShareParams | null {
  try {
    // URL-safe形式を元に戻す
    let base64 = shortId.replace(/-/g, '+').replace(/_/g, '/');
    // パディングを復元
    while (base64.length % 4) {
      base64 += '=';
    }
    const json = Buffer.from(base64, 'base64').toString('utf-8');
    return JSON.parse(json) as ShareParams;
  } catch (error) {
    return null;
  }
}

/**
 * 完全な短縮URLを生成
 */
export function generateShortUrl(params: ShareParams, baseUrl: string): string {
  const shortId = encodeToShortId(params);
  return `${baseUrl}/s/${shortId}`;
}
