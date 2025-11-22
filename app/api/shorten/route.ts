import { NextRequest, NextResponse } from 'next/server';
import { generateShortUrl, type ShareParams } from '@/lib/shortUrl';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // URLからパラメータを抽出
    const urlObj = new URL(url);
    const temple = urlObj.searchParams.get('t');
    const area = urlObj.searchParams.get('a');
    const comment = urlObj.searchParams.get('c');

    // パラメータが存在しない場合は元のURLを返す
    if (!temple || !area || !comment) {
      return NextResponse.json({ shortUrl: url });
    }

    // 短縮URLを生成
    const params: ShareParams = {
      t: temple,
      a: area,
      c: comment,
    };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hatsumode-maker.vercel.app';
    const shortUrl = generateShortUrl(params, baseUrl);

    return NextResponse.json({ shortUrl });
  } catch (error) {
    console.error('Error shortening URL:', error);
    // エラーの場合は元のURLを返す
    const { url } = await req.json().catch(() => ({ url: '' }));
    return NextResponse.json({ shortUrl: url }, { status: 500 });
  }
}
