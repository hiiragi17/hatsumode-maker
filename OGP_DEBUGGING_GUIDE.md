# TwitterのOGP画像デバッグガイド

## 1. OGPチェッカーツールで確認

### おすすめツール
- **https://www.opengraph.xyz/** - シンプルで見やすい
- **https://metatags.io/** - Twitter/Facebook両方のプレビュー
- **https://rakko.tools/tools/9/** - 日本語対応

### 使い方
1. ツールにアクセス
2. あなたのページURL（例：`https://hatsumode-maker.vercel.app/share?temple=明治神宮&area=東京都&comment=今年は大吉`）を入力
3. プレビューを確認

## 2. ブラウザの開発者ツールで確認

### 手順
1. 共有ページを開く
2. F12キーで開発者ツールを開く
3. `Elements`タブ（または`要素`タブ）を選択
4. `<head>`タグ内を確認
5. 以下のmetaタグが存在するか確認：

```html
<meta property="og:image" content="...">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="...">
```

## 3. OGP画像のURLに直接アクセス

### 確認方法
1. ブラウザで以下のようなURLに直接アクセス：
   ```
   https://hatsumode-maker.vercel.app/api/ogp-image?temple=明治神宮&area=東京都&comment=今年は大吉
   ```
2. 画像が正しく表示されるか確認
3. エラーが出る場合は、サーバー側の問題

## 4. Twitterのキャッシュクリア

Twitterは一度取得したOGP情報をキャッシュします。更新を反映させる方法：

### 方法A: パラメータを少し変更
- URLの末尾に`&v=1`などのダミーパラメータを追加
- 例：`...&comment=今年は大吉&v=1`

### 方法B: 時間をおく
- Twitter側のキャッシュは24〜48時間程度で更新される

## よくある問題と解決策

### 問題1: 画像が表示されない
**原因：**
- APIエンドポイントがエラーを返している
- 画像生成に失敗している

**確認方法：**
```bash
curl -I https://hatsumode-maker.vercel.app/api/ogp-image?temple=test
```

**期待される結果：**
```
HTTP/2 200
content-type: image/png
```

### 問題2: 古いOGP画像が表示される
**原因：**
- Twitterのキャッシュ

**解決策：**
- URLにバージョンパラメータを追加
- 時間をおいて再度シェア

### 問題3: metaタグが見つからない
**原因：**
- Next.jsのメタデータ生成が動作していない
- デプロイされていない

**確認方法：**
- ブラウザの開発者ツールでHTMLソースを確認
- `view-source:https://...` でソースコード表示

## デバッグ用コマンド

### OGP画像の取得テスト
```bash
# メインページのOGP
curl https://hatsumode-maker.vercel.app/api/ogp-image -o test-main.png

# 共有ページのOGP（パラメータ付き）
curl "https://hatsumode-maker.vercel.app/api/ogp-image?temple=明治神宮&area=東京都&comment=大吉" -o test-share.png
```

### metaタグの確認
```bash
curl -s https://hatsumode-maker.vercel.app/share?temple=test | grep -E 'og:|twitter:'
```

## Twitter投稿前のチェックリスト

- [ ] OGPチェッカーで画像が表示される
- [ ] 画像URLに直接アクセスできる
- [ ] metaタグが正しく設定されている
- [ ] 画像サイズが1200x630である
- [ ] Content-Typeが`image/png`である

## トラブルシューティング優先順位

1. **まず**: OGP画像URLに直接アクセスして画像が表示されるか確認
2. **次に**: OGPチェッカーツールでmetaタグを確認
3. **最後**: 実際にTwitterで投稿してテスト
