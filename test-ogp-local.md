# ローカルでOGPをテストする方法

## 方法1: 開発サーバーで直接OGP画像を確認

### 1. 開発サーバーを起動
```bash
npm run dev
```

### 2. ブラウザでOGP画像URLにアクセス

#### デフォルトOGP画像
```
http://localhost:3000/api/ogp-image
```

#### 診断結果のOGP画像（パラメータ付き）
```
http://localhost:3000/api/ogp-image?t=清水寺&a=京都&c=バグが減る一年になりそう
```

ブラウザでこれらのURLにアクセスすると、生成されたOGP画像（PNG）が表示されます。

### 3. 短縮URLページのOGPメタデータを確認

#### 短縮IDを生成してアクセス
まず診断を実行して短縮URLを取得し、そのURLにアクセスします：
```
http://localhost:3000/s/[短縮ID]
```

ページのソースを表示（Ctrl+U / Cmd+U）して、`<meta property="og:...">` タグを確認できます。

---

## 方法2: ブラウザの開発者ツールでOGPタグを確認

### 1. 診断ページで診断を実行
```
http://localhost:3000
```

### 2. 共有URLを取得して短縮URLページにアクセス

### 3. ブラウザの開発者ツールを開く（F12）

### 4. Elements/要素タブでHTMLの`<head>`セクションを確認

以下のようなOGPタグが表示されるはずです：
```html
<meta property="og:title" content="清水寺 | AI初詣メーカー2026">
<meta property="og:description" content="AI初詣メーカー2026であなたの初詣先は「清水寺」に決定しました！">
<meta property="og:image" content="http://localhost:3000/api/ogp-image?t=清水寺&a=京都&c=...">
<meta property="og:url" content="http://localhost:3000/s/...">
<meta name="twitter:card" content="summary_large_image">
```

---

## 方法3: OGPプレビュー拡張機能を使用

### Chrome拡張機能
- **Open Graph Preview**: OGPタグを自動的にプレビュー
- **Meta SEO Inspector**: OGPタグを含むすべてのメタタグを表示

これらをインストールすると、ページを開いたときにOGPがどう表示されるかプレビューできます。

---

## 方法4: ngrokで外部からアクセス可能にしてテスト

TwitterやFacebookのOGPデバッガーを使いたい場合は、ローカルサーバーを公開する必要があります。

### 1. ngrokをインストール
```bash
# Homebrewの場合
brew install ngrok

# または公式サイトからダウンロード
# https://ngrok.com/download
```

### 2. 開発サーバーを起動
```bash
npm run dev
```

### 3. 別のターミナルでngrokを起動
```bash
ngrok http 3000
```

### 4. 表示されたURLを使ってテスト

ngrokが提供する一時的なURL（例：`https://xxxx-xx-xxx-xxx.ngrok-free.app`）を使って：

#### TwitterのCard Validator
```
https://cards-dev.twitter.com/validator
```

#### Facebookのシェアデバッガー
```
https://developers.facebook.com/tools/debug/
```

これらのツールにngrokのURLを入力すると、実際にSNSでどう表示されるかプレビューできます。

---

## 方法5: curlでOGP画像のステータスを確認（自動テスト）

### OGP画像が正常に生成されるかチェック
```bash
# デフォルトOGP画像
curl -I http://localhost:3000/api/ogp-image

# 診断結果OGP画像
curl -G http://localhost:3000/api/ogp-image \
  --data-urlencode "t=清水寺" \
  --data-urlencode "a=京都" \
  --data-urlencode "c=バグが減る一年になりそう" \
  -I
```

`HTTP/1.1 200 OK` と `content-type: image/png` が返ってくれば成功です。

---

## おすすめの確認フロー

1. **開発サーバーを起動**: `npm run dev`
2. **OGP画像を直接確認**: ブラウザで `/api/ogp-image?t=...` にアクセス
3. **実際のページで確認**: 診断を実行して短縮URLページを表示
4. **ページソースでメタタグ確認**: Ctrl+U / Cmd+U でソースを表示
5. **必要に応じてngrokで公開テスト**: TwitterやFacebookのデバッガーで確認

---

## トラブルシューティング

### OGP画像が表示されない
- エラーログを確認: 開発サーバーのターミナル出力をチェック
- パラメータのエンコーディングを確認: 日本語は正しくURLエンコードされているか

### メタタグが表示されない
- Next.jsの`generateMetadata`が正しく動作しているか確認
- ページをリロードして再生成

### ngrokでアクセスできない
- ポート番号が正しいか確認（デフォルトは3000）
- ファイアウォール設定を確認
