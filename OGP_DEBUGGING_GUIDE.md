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

### 問題1: 「Invalid URL」エラーが表示される
**原因：**
- OGP画像生成APIがエラーを返している（500エラー）
- URLパラメータが長すぎる
- 特殊文字の処理に問題がある
- TwitterのクローラーがOGP画像URLにアクセスできない

**解決策：**
1. **まず、OGP画像URLに直接アクセスしてテスト**
   ```
   https://hatsumode-maker.vercel.app/api/ogp-image?temple=月輪寺&area=京都&comment=今日のあなたは大吉
   ```
   - 画像が表示される → OGP生成は正常、Twitter側の問題
   - エラーが出る → サーバー側の問題（Vercelログを確認）

2. **Vercelのログを確認**
   - Vercelダッシュボード → プロジェクト → Logs タブ
   - エラーメッセージを確認
   - `OGP image generation failed:` で検索

3. **コメントを短くしてテスト**
   - 長いコメント（50文字以上）は問題を起こす可能性があります
   - 短いコメントで試してみてください
   ```
   https://hatsumode-maker.vercel.app/share?temple=月輪寺&area=京都&comment=大吉
   ```

4. **環境変数の確認**
   - Vercelダッシュボード → Settings → Environment Variables
   - `NEXT_PUBLIC_BASE_URL` が正しく設定されているか確認
   - 値: `https://hatsumode-maker.vercel.app`

### 問題2: 画像が表示されない
**原因：**
- APIエンドポイントがエラーを返している
- 画像生成に失敗している
- sharpライブラリの問題

**確認方法：**
```bash
# ヘッダーのみ取得
curl -I "https://hatsumode-maker.vercel.app/api/ogp-image?temple=test&area=test&comment=test"

# 画像を実際にダウンロード
curl "https://hatsumode-maker.vercel.app/api/ogp-image?temple=test&area=test&comment=test" -o test.png
```

**期待される結果：**
```
HTTP/2 200
content-type: image/png
cache-control: public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400
```

**デバッグ手順：**
1. Vercelのログで`OGP Image Request:`を検索
2. パラメータが正しく渡されているか確認
3. エラーがあれば`OGP image generation failed:`を確認

### 問題3: 古いOGP画像が表示される
**原因：**
- Twitterのキャッシュ（24-48時間）
- Vercelのキャッシュ

**解決策：**
- URLにバージョンパラメータを追加
- 例：`...&comment=今年は大吉&v=2`
- 時間をおいて再度シェア

### 問題4: metaタグが見つからない
**原因：**
- Next.jsのメタデータ生成が動作していない
- デプロイされていない
- ビルドエラー

**確認方法：**
```bash
# HTMLソースを取得してmetaタグを確認
curl -s "https://hatsumode-maker.vercel.app/share?temple=test&area=test&comment=test" | grep -E 'property="og:|name="twitter:'
```

**期待される出力：**
```html
<meta property="og:image" content="https://hatsumode-maker.vercel.app/api/ogp-image?temple=test&area=test&comment=test"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:image" content="https://hatsumode-maker.vercel.app/api/ogp-image?temple=test&area=test&comment=test"/>
```

### 問題5: 空白を含むコメントでエラー
**原因：**
- URLエンコーディングの問題
- `+`が空白として正しく処理されない

**解決策：**
- 現在のコードは自動的に処理するはずですが、問題がある場合：
- 空白の代わりに他の文字（`・`など）を使用
- コメントを短くする

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
3. **その次**: Vercelのログでエラーを確認
4. **最後**: 実際にTwitterで投稿してテスト

## 具体的なデバッグ手順（あなたのケース）

あなたが試したURL：
```
https://hatsumode-maker.vercel.app/share?temple=%E6%9C%88%E8%BC%AA%E5%AF%BA&area=%E4%BA%AC%E9%83%BD&comment=%E4%BB%8A%E6%97%A5%E3%81%AE%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AF+Pull+Request+%E9%81%8B%E3%81%8C%E6%9C%80%E5%BC%B7%E3%81%A7%E3%81%99
```

デコードすると：
- temple: 月輪寺
- area: 京都
- comment: 今日のあなたは Pull Request 運が最強です

### ステップ1: OGP画像が生成できるか確認

以下のURLをブラウザで開いてください：
```
https://hatsumode-maker.vercel.app/api/ogp-image?temple=月輪寺&area=京都&comment=今日のあなたは Pull Request 運が最強です
```

**画像が表示される場合:**
- OGP生成は正常です
- 問題はTwitterのキャッシュまたはmetaタグの設定です
- → ステップ2へ

**エラーが表示される場合:**
- サーバー側で画像生成に失敗しています
- Vercelのログを確認してください
- コメントを短くして再度試してください

### ステップ2: metaタグを確認

以下のコマンドでmetaタグを確認：
```bash
curl -s "https://hatsumode-maker.vercel.app/share?temple=月輪寺&area=京都&comment=大吉" | grep -E 'property="og:|name="twitter:'
```

または、ブラウザで以下のURLを開いて右クリック→「ページのソースを表示」：
```
https://hatsumode-maker.vercel.app/share?temple=月輪寺&area=京都&comment=大吉
```

### ステップ3: OGPチェッカーでテスト

https://www.opengraph.xyz/ で以下のURLをチェック：
```
https://hatsumode-maker.vercel.app/share?temple=月輪寺&area=京都&comment=大吉
```

### ステップ4: Twitterキャッシュを回避してテスト

URLにバージョンパラメータを追加：
```
https://hatsumode-maker.vercel.app/share?temple=月輪寺&area=京都&comment=大吉&v=1
```

このURLでTwitterシェアを試してください。

## 今回の修正内容

1. **デバッグログの追加**: Vercelログでパラメータとエラーを確認できるようになりました
2. **キャッシュヘッダーの改善**: Twitter/CDN向けに最適化しました
3. **エラーハンドリングの改善**: より詳細なエラーメッセージを出力します
4. **Twitterメタデータの改善**: Twitter Cardの設定を最適化しました

## 次のステップ

1. デプロイ後、上記の手順でテストしてください
2. Vercelのログでエラーがないか確認してください
3. 問題が解決しない場合は、ログの内容を共有してください
