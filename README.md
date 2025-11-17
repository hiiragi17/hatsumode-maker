# 🎍 AI初詣メーカー2025（AI Hatsumode Maker 2025）

AIがあなたの初詣先を強制的に決める、エンジニア向けエンタメWebアプリ

## ✨ 特徴

- **ランダム抽選**: 全国の有名神社からAIがランダムに初詣先を選定
- **結果の画像化**: HTML→PNG変換で結果をダウンロード可能
- **SNSシェア**: X（Twitter）へ簡単に投稿
- **和風デザイン**: 夜空と星をモチーフにしたダークテーマ
- **レスポンシブ**: スマホ・タブレット・PC対応

## 🚀 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイル**: Tailwind CSS
- **画像生成**: html-to-image
- **デプロイ**: Vercel

## 📁 プロジェクト構成

```
ai-hatsumode-maker/
├── app/
│   ├── page.tsx          # メインページ
│   ├── layout.tsx        # レイアウト
│   └── globals.css       # グローバルスタイル
├── components/
│   ├── ResultCard.tsx    # 結果表示カード
│   └── ShareButton.tsx   # シェア・ダウンロードボタン
├── lib/
│   ├── temples.ts        # 神社データ
│   └── generateImage.ts  # 画像生成ユーティリティ
└── public/               # 静的アセット
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
3. 結果が表示されたら、以下の操作が可能:
   - **ダウンロード**: 結果をPNG画像として保存
   - **𝕏 でシェア**: X（Twitter）に投稿
   - **もう一度引く**: 別の神社を選び直す

## 🗺️ 対象神社（12社）

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

## 🎯 今後の拡張案

- [ ] おみくじ機能の追加（大吉・吉・凶など）
- [ ] エンジニア向けメッセージ（「今日のPull Request運」など）
- [ ] ジオロケーション対応（近くの神社を優先表示）
- [ ] 参拝履歴の保存（LocalStorage）
- [ ] OGP画像の自動生成

## 📄 ライセンス

MIT

## 🙏 謝辞

日本全国の神社に感謝を込めて。

---

Made with ❤️ by Next.js 14 & Tailwind CSS
