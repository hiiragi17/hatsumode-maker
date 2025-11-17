export interface Temple {
  name: string;
  area: string;
}

export const temples: Temple[] = [
  { name: "明治神宮", area: "東京" },
  { name: "伏見稲荷大社", area: "京都" },
  { name: "太宰府天満宮", area: "福岡" },
  { name: "伊勢神宮", area: "三重" },
  { name: "北海道神宮", area: "札幌" },
  { name: "厳島神社", area: "広島" },
  { name: "金刀比羅宮", area: "香川" },
  { name: "出雲大社", area: "島根" },
  { name: "日光東照宮", area: "栃木" },
  { name: "熱田神宮", area: "愛知" },
  { name: "住吉大社", area: "大阪" },
  { name: "八坂神社", area: "京都" },
  { name: "鶴岡八幡宮", area: "神奈川" },
  { name: "浅草寺", area: "東京" },
  { name: "大宮八幡宮", area: "東京" },
  { name: "春日大社", area: "奈良" },
  { name: "平安神宮", area: "京都" },
  { name: "清水寺", area: "京都" },
  { name: "鹿島神宮", area: "茨城" },
  { name: "香取神宮", area: "千葉" },
  { name: "諏訪大社", area: "長野" },
  { name: "戸隠神社", area: "長野" },
  { name: "善光寺", area: "長野" },
  { name: "石清水八幡宮", area: "京都" },
];

// エンジニア専用コメント
export const engineerComments: string[] = [
  "今日のあなたは Pull Request 運が最強です",
  "バグは増えますが成長も2倍です",
  "コミットログがきれいになるでしょう",
  "今年はマージコンフリクトと無縁の1年になります",
  "本番環境で動かないコードは書かないでしょう",
  "Stack Overflow を見なくても解決できる力が身につきます",
  "レビュー指摘が0件になる日が来るでしょう",
  "console.log を消し忘れることがなくなります",
  "テストカバレッジ100%を達成する運気です",
  "CI/CDパイプラインが一発で通る奇跡が起きます",
  "ドキュメントを書く習慣が自然と身につきます",
  "技術的負債を返済するチャンスに恵まれます",
  "無限ループから解放される年になります",
  "async/await の理解が深まる啓示を受けるでしょう",
  "命名センスが劇的に向上します",
  "デバッグ時間が半分になる直感力を得ます",
  "リファクタリングの楽しさに目覚めます",
  "型安全なコードを書く喜びを知るでしょう",
  "パフォーマンス最適化の才能が開花します",
  "セキュリティ脆弱性を見抜く目が養われます",
];

export function chooseRandomTemple(): Temple {
  return temples[Math.floor(Math.random() * temples.length)];
}

export function chooseRandomComment(): string {
  return engineerComments[Math.floor(Math.random() * engineerComments.length)];
}
