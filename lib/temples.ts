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
];

export function chooseRandomTemple(): Temple {
  return temples[Math.floor(Math.random() * temples.length)];
}
