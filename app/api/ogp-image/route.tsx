import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const templeNameParam = searchParams.get('t');
    const commentParam = searchParams.get('c');
    const areaParam = searchParams.get('a');

    // パラメータがない場合はデフォルト（メインページ用）のOGP画像を生成
    const isDefaultImage = !templeNameParam && !commentParam && !areaParam;

    if (isDefaultImage) {
      return new ImageResponse(
        (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #1a1a2e 0%, #4a148c 50%, #1a1a2e 100%)',
              position: 'relative',
            }}
          >
            {/* 装飾的な星 */}
            <div style={{ position: 'absolute', top: '80px', left: '100px', width: '16px', height: '16px', borderRadius: '50%', background: '#ffd700', opacity: 0.8 }} />
            <div style={{ position: 'absolute', top: '100px', left: '1100px', width: '12px', height: '12px', borderRadius: '50%', background: '#ffd700', opacity: 0.6 }} />
            <div style={{ position: 'absolute', top: '550px', left: '1050px', width: '14px', height: '14px', borderRadius: '50%', background: '#ffd700', opacity: 0.7 }} />
            <div style={{ position: 'absolute', top: '550px', left: '150px', width: '10px', height: '10px', borderRadius: '50%', background: '#ffd700', opacity: 0.5 }} />
            <div style={{ position: 'absolute', top: '150px', left: '300px', width: '12px', height: '12px', borderRadius: '50%', background: '#ffd700', opacity: 0.7 }} />
            <div style={{ position: 'absolute', top: '500px', left: '900px', width: '10px', height: '10px', borderRadius: '50%', background: '#ffd700', opacity: 0.6 }} />
            <div style={{ position: 'absolute', top: '300px', left: '200px', width: '14px', height: '14px', borderRadius: '50%', background: '#ffd700', opacity: 0.5 }} />
            <div style={{ position: 'absolute', top: '250px', left: '1000px', width: '12px', height: '12px', borderRadius: '50%', background: '#ffd700', opacity: 0.8 }} />

            {/* タイトル */}
            <div
              style={{
                position: 'absolute',
                top: '100px',
                fontSize: '64px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: 'Noto Sans JP',
              }}
            >
              AI初詣メーカー2026
            </div>

            {/* 鳥居 - 上の横木（笠木） */}
            <div style={{ position: 'absolute', top: '190px', left: '450px', width: '300px', height: '20px', background: '#dc143c', opacity: 0.9, borderRadius: '3px' }} />
            {/* 鳥居 - 左の柱 */}
            <div style={{ position: 'absolute', top: '210px', left: '480px', width: '15px', height: '120px', background: '#dc143c', opacity: 0.9 }} />
            {/* 鳥居 - 右の柱 */}
            <div style={{ position: 'absolute', top: '210px', left: '705px', width: '15px', height: '120px', background: '#dc143c', opacity: 0.9 }} />
            {/* 鳥居 - 下の横木 */}
            <div style={{ position: 'absolute', top: '260px', left: '470px', width: '260px', height: '12px', background: '#dc143c', opacity: 0.9, borderRadius: '2px' }} />

            {/* キャッチコピー */}
            <div
              style={{
                position: 'absolute',
                top: '360px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '52px',
                  fontWeight: 'bold',
                  color: '#d4af37',
                  fontFamily: 'Noto Sans JP',
                  marginBottom: '20px',
                }}
              >
                AIがあなたの初詣先を
              </div>
              <div
                style={{
                  fontSize: '52px',
                  fontWeight: 'bold',
                  color: '#d4af37',
                  fontFamily: 'Noto Sans JP',
                }}
              >
                強制的に決めます
              </div>
            </div>

            {/* サブテキスト */}
            <div
              style={{
                position: 'absolute',
                top: '530px',
                fontSize: '28px',
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'Noto Sans JP',
              }}
            >
              迷っているあなたに、運命の神社を選びます
            </div>

            {/* フッター */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: 'Noto Sans JP',
              }}
            >
              hatsumode-maker.vercel.app
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    // デフォルト値の設定
    const templeName = templeNameParam || '神社名';
    const comment = commentParam || 'エンジニア運勢';
    const area = areaParam || '未定';

    const truncatedComment = comment.length > 40 ? comment.substring(0, 37) + '...' : comment;
    const commentFontSize = comment.length > 30 ? 28 : 36;

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #4a148c 50%, #1a1a2e 100%)',
            position: 'relative',
          }}
        >
          {/* 装飾的な星 */}
          <div style={{ position: 'absolute', top: '80px', left: '100px', width: '16px', height: '16px', borderRadius: '50%', background: '#ffd700', opacity: 0.8 }} />
          <div style={{ position: 'absolute', top: '100px', left: '1100px', width: '12px', height: '12px', borderRadius: '50%', background: '#ffd700', opacity: 0.6 }} />
          <div style={{ position: 'absolute', top: '550px', left: '1050px', width: '14px', height: '14px', borderRadius: '50%', background: '#ffd700', opacity: 0.7 }} />
          <div style={{ position: 'absolute', top: '550px', left: '150px', width: '10px', height: '10px', borderRadius: '50%', background: '#ffd700', opacity: 0.5 }} />

          {/* タイトル */}
          <div
            style={{
              position: 'absolute',
              top: '50px',
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              fontFamily: 'Noto Sans JP',
            }}
          >
            AI初詣メーカー2026
          </div>

          {/* 鳥居 - 上の横木（笠木） */}
          <div style={{ position: 'absolute', top: '112px', left: '510px', width: '180px', height: '16px', background: '#dc143c', opacity: 0.9, borderRadius: '2px' }} />
          {/* 鳥居 - 左の柱 */}
          <div style={{ position: 'absolute', top: '128px', left: '530px', width: '12px', height: '90px', background: '#dc143c', opacity: 0.9 }} />
          {/* 鳥居 - 右の柱 */}
          <div style={{ position: 'absolute', top: '128px', left: '658px', width: '12px', height: '90px', background: '#dc143c', opacity: 0.9 }} />
          {/* 鳥居 - 下の横木 */}
          <div style={{ position: 'absolute', top: '166px', left: '525px', width: '150px', height: '10px', background: '#dc143c', opacity: 0.9, borderRadius: '2px' }} />

          {/* 神社名 */}
          <div
            style={{
              position: 'absolute',
              top: '240px',
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              fontFamily: 'Noto Sans JP',
            }}
          >
            {templeName}
          </div>

          {/* 地域 */}
          <div
            style={{
              position: 'absolute',
              top: '320px',
              fontSize: '40px',
              color: '#d4af37',
              fontFamily: 'Noto Sans JP',
            }}
          >
            （{area}）
          </div>

          {/* コメントボックス */}
          <div
            style={{
              position: 'absolute',
              top: '390px',
              left: '100px',
              width: '1000px',
              height: '180px',
              border: '2px solid #d4af37',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              padding: '30px',
            }}
          >
            <div
              style={{
                fontSize: '26px',
                fontWeight: 'bold',
                color: '#d4af37',
                fontFamily: 'Noto Sans JP',
                marginBottom: '30px',
              }}
            >
              エンジニア運勢
            </div>
            <div
              style={{
                fontSize: commentFontSize,
                color: 'white',
                fontFamily: 'Noto Sans JP',
                textAlign: 'center',
              }}
            >
              {truncatedComment}
            </div>
          </div>

          {/* フッター */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: 'Noto Sans JP',
            }}
          >
            hatsumode-maker.vercel.app
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    return new Response('Failed to generate image', { status: 500 });
  }
}
