# 🎍 AI初詣メーカー2026（AI Hatsumode Maker 2026）

AIがあなたの初詣先を強制的に決める、エンジニア向けエンタメWebアプリ

## ✨ 特徴

- **ランダム抽選**: 全国24の有名神社からAIがランダムに初詣先を選定
- **エンジニア運勢**: 20種類のエンジニア専用コメント（Pull Request運、バグ運など）
- **結果の画像化**: HTML→PNG変換で結果をダウンロード可能
- **SNSシェア**: X（Twitter）へ簡単に投稿
- **動的OGP画像生成**: @vercel/ogを使用したSNSカード画像の自動生成
- **自前短縮URL**: Base64エンコード方式の独自短縮URLシステム
- **和風デザイン**: 夜空と星をモチーフにしたダークテーマ
- **レスポンシブ**: スマホ・タブレット・PC対応

## 🚀 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイル**: Tailwind CSS
- **画像生成**: html-to-image
- **OGP画像生成**: @vercel/og (Edge Runtime)
- **短縮URL**: 独自実装（Base64エンコード）
- **テスト**: Vitest
- **デプロイ**: Vercel

## 📁 プロジェクト構成

```
hatsumode-maker/
├── app/
│   ├── page.tsx                    # メインページ
│   ├── layout.tsx                  # レイアウト
│   ├── globals.css                 # グローバルスタイル
│   ├── share/
│   │   └── page.tsx                # シェア専用ページ（動的OGP）
│   ├── s/[id]/
│   │   └── page.tsx                # 短縮URLリダイレクト
│   └── api/
│       ├── ogp-image/
│       │   └── route.tsx           # OGP画像生成API（@vercel/og）
│       └── shorten/
│           └── route.ts            # URL短縮API
├── components/
│   ├── ResultCard.tsx              # 結果表示カード
│   ├── ShareButton.tsx             # シェア・ダウンロードボタン
│   └── SharePageClient.tsx         # シェアページクライアント
├── lib/
│   ├── temples.ts                  # 神社データ（24社）
│   └── shortUrl.ts                 # 短縮URLエンコード/デコード
├── __tests__/                       # テストファイル
└── public/                          # 静的アセット
```

## 🛠️ セットアップ

### 前提条件

- Node.js 18.17以上
- npm または yarn

### インストール

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで http://localhost:3000 を開く

### ビルド

```bash
# プロダクションビルド
npm run build

# プロダクションサーバーの起動
npm start
```

## 📝 使い方

1. トップページで「お任せする ⛩️」ボタンをクリック
2. AIが全国の神社からランダムに初詣先を選定
3. 結果が表示される（神社名 + エンジニア運勢コメント）
4. 以下の操作が可能:
   - **ダウンロード**: 結果をPNG画像として保存
   - **𝕏 でシェア**: X（Twitter）に投稿
   - **もう一度引く**: 別の神社とコメントを選び直す

## 🗺️ 対象神社（24社）

- 明治神宮（東京）
- 伏見稲荷大社（京都）
- 太宰府天満宮（福岡）
- 伊勢神宮（三重）
- 北海道神宮（札幌）
- 厳島神社（広島）
- 金刀比羅宮（香川）
- 出雲大社（島根）
- 日光東照宮（栃木）
- 熱田神宮（愛知）
- 住吉大社（大阪）
- 八坂神社（京都）
- 鶴岡八幡宮（神奈川）
- 浅草寺（東京）
- 大宮八幡宮（東京）
- 春日大社（奈良）
- 平安神宮（京都）
- 清水寺（京都）
- 鹿島神宮（茨城）
- 香取神宮（千葉）
- 諏訪大社（長野）
- 戸隠神社（長野）
- 善光寺（長野）
- 石清水八幡宮（京都）

## 💻 エンジニア運勢コメント（20種類）

- 「今日のあなたは Pull Request 運が最強です」
- 「バグは増えますが成長も2倍です」
- 「コミットログがきれいになるでしょう」
- 「今年はマージコンフリクトと無縁の1年になります」
- 「本番環境で動かないコードは書かないでしょう」
- その他15種類のエンジニア向けメッセージ

## 🔧 カスタマイズ

### 神社の追加

`lib/temples.ts` を編集:

```typescript
export const temples: Temple[] = [
  { name: "新しい神社", area: "都道府県" },
  // ...
];
```

### デザインの変更

`tailwind.config.js` でカラーテーマを調整:

```javascript
colors: {
  shrine: {
    red: '#D32F2F',     // 神社の朱色
    darkRed: '#B71C1C',
    gold: '#FFD700',
  },
}
```

## 🚢 デプロイ（Vercel）

### 方法1: GitHub連携（推奨）

1. GitHubにプッシュ
2. [Vercel](https://vercel.com)にログイン
3. プロジェクトをインポート
4. 自動デプロイ完了

### 方法2: CLIデプロイ

```bash
npm install -g vercel
vercel login
vercel deploy
```

## 🔧 主要機能の詳細

### 動的OGP画像生成

@vercel/ogを使用して、シェア時のTwitterカード画像を動的に生成します。

- **Edge Runtime**: 高速なレスポンス
- **カスタマイズ可能**: 神社名、地域、運勢を含む
- **エンドポイント**: `/api/ogp-image?t={神社名}&a={地域}&c={コメント}`

### 自前短縮URLシステム

外部APIに依存しない独自の短縮URLシステムを実装。

- **Base64エンコード**: パラメータをコンパクトに変換
- **サーバーサイド処理**: データベース不要
- **リダイレクト**: `/s/[id]` から `/share` へ自動転送
- **Twitterカード対応**: 短縮URLでも正しくOGP画像を表示

```typescript
// 短縮URL生成例
const params = { t: "明治神宮", a: "東京", c: "Pull Request運が最強です" };
const shortUrl = generateShortUrl(params, baseUrl);
// => https://hatsumode-maker.vercel.app/s/eyJ0Ijoi...
```

## 🎯 今後の拡張案

- [ ] おみくじ機能の追加（大吉・吉・凶など）
- [x] エンジニア向けメッセージ（「今日のPull Request運」など）✅ 実装済み
- [x] OGP画像の自動生成 ✅ 実装済み（@vercel/og使用）
- [x] 短縮URLシステム ✅ 実装済み（独自実装）
- [ ] ジオロケーション対応（近くの神社を優先表示）
- [ ] 参拝履歴の保存（LocalStorage）
- [ ] ダークモード/ライトモードの切り替え

## 📄 ライセンス

MIT

## 🙏 謝辞

日本全国の神社に感謝を込めて。

---

Made with ❤️ by Next.js 14 & Tailwind CSS
