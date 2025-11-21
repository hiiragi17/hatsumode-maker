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

    return new Response(buffer, {
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
        y="100"
        font-size="52"
        font-weight="bold"
        fill="white"
        text-anchor="middle"
        font-family="Arial, sans-serif"
      >
        🎍 AI初詣メーカー2026
      </text>

      <!-- 神社アイコン -->
      <text
        x="${width / 2}"
        y="220"
        font-size="80"
        text-anchor="middle"
      >
        ⛩️
      </text>

      <!-- 神社名 -->
      <text
        x="${width / 2}"
        y="320"
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
        y="380"
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
        y="420"
        width="${width - 200}"
        height="160"
        rx="10"
        fill="rgba(255, 255, 255, 0.1)"
        stroke="#d4af37"
        stroke-width="2"
      />

      <!-- エンジニア運勢ラベル -->
      <text
        x="130"
        y="450"
        font-size="24"
        font-weight="bold"
        fill="#d4af37"
        font-family="Arial, sans-serif"
      >
        💻 エンジニア運勢
      </text>

      <!-- コメント -->
      <text
        x="${width / 2}"
        y="520"
        font-size="${getTextLength(comment) > 30 ? 24 : 32}"
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
        🎍 AI初詣メーカー2026
      </text>

      <!-- 神社アイコン -->
      <text
        x="${width / 2}"
        y="310"
        font-size="120"
        text-anchor="middle"
      >
        ⛩️
      </text>

      <!-- キャッチコピー -->
      <text
        x="${width / 2}"
        y="420"
        font-size="48"
        font-weight="bold"
        fill="#d4af37"
        text-anchor="middle"
        font-family="Arial, sans-serif"
      >
        AIがあなたの初詣先を
      </text>
      <text
        x="${width / 2}"
        y="480"
        font-size="48"
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
        y="550"
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
