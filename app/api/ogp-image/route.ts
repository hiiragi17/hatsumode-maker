import sharp from 'sharp';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const templeNameParam = searchParams.get('temple');
    const commentParam = searchParams.get('comment');
    const areaParam = searchParams.get('area');

    // デバッグログ
    console.log('OGP Image Request:', {
      temple: templeNameParam,
      comment: commentParam,
      area: areaParam,
      url: request.url
    });

    // パラメータがない場合はデフォルト（メインページ用）のOGP画像を生成
    const isDefaultImage = !templeNameParam && !commentParam && !areaParam;

    let svg: Buffer;
    if (isDefaultImage) {
      svg = generateDefaultOgpSvg();
    } else {
      // デフォルト値の設定
      const templeName = templeNameParam || '神社名';
      const comment = commentParam || 'エンジニア運勢';
      const area = areaParam || '未定';

      console.log('Generating OGP with:', { templeName, comment, area });
      svg = generateOgpSvg(templeName, comment, area);
    }

    // SVGをPNGに変換
    const buffer = await sharp(svg).png().toBuffer();

    console.log('OGP Image generated successfully, size:', buffer.length);

    return new Response(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
        'CDN-Cache-Control': 'public, max-age=86400',
        'Vercel-CDN-Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('OGP image generation failed:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return new Response('Failed to generate image', { status: 500 });
  }
}

function generateOgpSvg(
  templeName: string,
  comment: string,
  area: string
): Buffer {
  // 1200x630はOGP標準サイズ
  const width = 1200;
  const height = 630;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- グラデーション背景 -->
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#4a148c;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- 背景 -->
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>

      <!-- 装飾的な星 -->
      <circle cx="100" cy="80" r="8" fill="#ffd700" opacity="0.8"/>
      <circle cx="1100" cy="100" r="6" fill="#ffd700" opacity="0.6"/>
      <circle cx="1050" cy="550" r="7" fill="#ffd700" opacity="0.7"/>
      <circle cx="150" cy="550" r="5" fill="#ffd700" opacity="0.5"/>

      <!-- タイトル -->
      <text
        x="${width / 2}"
        y="90"
        font-size="48"
        font-weight="bold"
        fill="white"
        text-anchor="middle"
        font-family="Arial, sans-serif"
      >
        AI初詣メーカー2026
      </text>

      <!-- 装飾的な鳥居（シンプルなデザイン） -->
      <!-- 左の柱 -->
      <rect x="530" y="120" width="12" height="90" fill="#dc143c" opacity="0.9"/>
      <!-- 右の柱 -->
      <rect x="658" y="120" width="12" height="90" fill="#dc143c" opacity="0.9"/>
      <!-- 上の横木（笠木） -->
      <rect x="510" y="112" width="180" height="16" rx="2" fill="#dc143c" opacity="0.9"/>
      <!-- 下の横木（貫） -->
      <rect x="525" y="150" width="150" height="10" rx="2" fill="#dc143c" opacity="0.9"/>

      <!-- 神社名 -->
      <text
        x="${width / 2}"
        y="280"
        font-size="72"
        font-weight="bold"
        fill="white"
        text-anchor="middle"
        font-family="Arial, sans-serif"
      >
        ${escapeXml(templeName)}
      </text>

      <!-- 地域 -->
      <text
        x="${width / 2}"
        y="340"
        font-size="40"
        fill="#d4af37"
        text-anchor="middle"
        font-family="Arial, sans-serif"
      >
        （${escapeXml(area)}）
      </text>

      <!-- コメントボックス背景 -->
      <rect
        x="100"
        y="390"
        width="${width - 200}"
        height="180"
        rx="10"
        fill="rgba(255, 255, 255, 0.1)"
        stroke="#d4af37"
        stroke-width="2"
      />

      <!-- エンジニア運勢ラベル -->
      <text
        x="130"
        y="425"
        font-size="26"
        font-weight="bold"
        fill="#d4af37"
        font-family="Arial, sans-serif"
      >
        エンジニア運勢
      </text>

      <!-- コメント -->
      <text
        x="${width / 2}"
        y="490"
        font-size="${getTextLength(comment) > 30 ? 28 : 36}"
        fill="white"
        text-anchor="middle"
        font-family="Arial, sans-serif"
      >
        ${escapeXml(truncateText(comment, 40))}
      </text>

      <!-- フッター -->
      <text
        x="${width / 2}"
        y="${height - 20}"
        font-size="20"
        fill="rgba(255, 255, 255, 0.5)"
        text-anchor="middle"
        font-family="Arial, sans-serif"
      >
        hatsumode-maker.vercel.app
      </text>
    </svg>
  `;

  return Buffer.from(svg.trim(), 'utf-8');
}

function generateDefaultOgpSvg(): Buffer {
  // 1200x630はOGP標準サイズ
  const width = 1200;
  const height = 630;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- グラデーション背景 -->
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#4a148c;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- 背景 -->
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>

      <!-- 装飾的な星（多めに） -->
      <circle cx="100" cy="80" r="8" fill="#ffd700" opacity="0.8"/>
      <circle cx="1100" cy="100" r="6" fill="#ffd700" opacity="0.6"/>
      <circle cx="1050" cy="550" r="7" fill="#ffd700" opacity="0.7"/>
      <circle cx="150" cy="550" r="5" fill="#ffd700" opacity="0.5"/>
      <circle cx="300" cy="150" r="6" fill="#ffd700" opacity="0.7"/>
      <circle cx="900" cy="500" r="5" fill="#ffd700" opacity="0.6"/>
      <circle cx="200" cy="300" r="7" fill="#ffd700" opacity="0.5"/>
      <circle cx="1000" cy="250" r="6" fill="#ffd700" opacity="0.8"/>

      <!-- 装飾的な鳥居（シンプルなデザイン） -->
      <!-- 左の柱 -->
      <rect x="480" y="200" width="15" height="120" fill="#dc143c" opacity="0.9"/>
      <!-- 右の柱 -->
      <rect x="705" y="200" width="15" height="120" fill="#dc143c" opacity="0.9"/>
      <!-- 上の横木（笠木） -->
      <rect x="450" y="190" width="300" height="20" rx="3" fill="#dc143c" opacity="0.9"/>
      <!-- 下の横木（貫） -->
      <rect x="470" y="240" width="260" height="12" rx="2" fill="#dc143c" opacity="0.9"/>

      <!-- タイトル -->
      <text
        x="${width / 2}"
        y="140"
        font-size="64"
        font-weight="bold"
        fill="white"
        text-anchor="middle"
        font-family="Arial, sans-serif"
      >
        AI初詣メーカー2026
      </text>

      <!-- キャッチコピー -->
      <text
        x="${width / 2}"
        y="400"
        font-size="52"
        font-weight="bold"
        fill="#d4af37"
        text-anchor="middle"
        font-family="Arial, sans-serif"
      >
        AIがあなたの初詣先を
      </text>
      <text
        x="${width / 2}"
        y="465"
        font-size="52"
        font-weight="bold"
        fill="#d4af37"
        text-anchor="middle"
        font-family="Arial, sans-serif"
      >
        強制的に決めます
      </text>

      <!-- サブテキスト -->
      <text
        x="${width / 2}"
        y="545"
        font-size="28"
        fill="rgba(255, 255, 255, 0.8)"
        text-anchor="middle"
        font-family="Arial, sans-serif"
      >
        迷っているあなたに、運命の神社を選びます
      </text>

      <!-- フッター -->
      <text
        x="${width / 2}"
        y="${height - 20}"
        font-size="20"
        fill="rgba(255, 255, 255, 0.5)"
        text-anchor="middle"
        font-family="Arial, sans-serif"
      >
        hatsumode-maker.vercel.app
      </text>
    </svg>
  `;

  return Buffer.from(svg.trim(), 'utf-8');
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getTextLength(text: string): number {
  return text.length;
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
}
