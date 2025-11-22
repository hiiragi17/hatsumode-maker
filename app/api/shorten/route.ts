import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // is.gd API を使用してURL短縮
    const shortenUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`;
    const response = await fetch(shortenUrl);

    if (!response.ok) {
      throw new Error('Failed to shorten URL');
    }

    const shortUrl = await response.text();

    return NextResponse.json({ shortUrl: shortUrl.trim() });
  } catch (error) {
    console.error('Error shortening URL:', error);
    // エラーの場合は元のURLを返す
    const { url } = await req.json().catch(() => ({ url: '' }));
    return NextResponse.json({ shortUrl: url }, { status: 500 });
  }
}
