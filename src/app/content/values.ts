import VALUE1 from "../assets/solution_1.png";
import VALUE2 from "../assets/solution_2.png";
import VALUE3 from "../assets/solution_3.png";
import type { StaticImageData } from "next/image";

export interface VALUEItem {
  ValueNumber: string;
  problemCategory: string;
  problemText: string;
  problemImage: StaticImageData;
  ValueTitle: string; // HTML文字列を想定
  ValueDescription: string; // '||' で段落区切り
  iconName: "zap" | "lightbulb" | "barChart3";
  features: string[];
}

export const VALUES: VALUEItem[] = [
  {
    ValueNumber: "01",
    problemCategory: "独自の収集ネットワーク",
    problemText:
      "トレンドの移り変わりが早いのに、調査に時間がかかりすぎて追いつけない...",
    problemImage: VALUE1,
    ValueTitle: "独自ネットワークで、<br />[[今、生の若者の声]]を即キャッチ",
    ValueDescription:
      "独自のインフルエンサーネットワーク（数千人規模）を活用し、最短24時間でリアルな声を収集。||スピードだけでなく「回答の質」にこだわり、意思決定にすぐ使えるデータを届けます。",
    iconName: "zap",
    features: [
      "数千人規模の若年層の回答をスピーディーに収集",
      "SNS発信層へのリーチで最新トレンドを正確に把握",
      "調査からレポーティングまで一気通貫のスムーズ対応",
    ],
  },
  {
    ValueNumber: "02",
    problemCategory: "多角的なインサイト分析",
    problemText: "施策を行ってみたけど思ったような成果が出なかった...",
    problemImage: VALUE2,
    ValueTitle: "4つの手法で、[[若年層の本音]]を多角的に把握",
    ValueDescription:
      'アンケート調査（定量）、インフルエンサーインタビュー（定性）、グループインタビュー（定性）、ギフティング調査（定量・定性）を組み合わせ、表層的な"流行"ではなく、"根底の価値観"を掘り下げる。||「数字×ストーリー×トレンド」を立体的に可視化。',
    iconName: "barChart3",
    features: [
      "アンケート調査で市場全体の傾向を数値化",
      "インフルエンサーインタビュー・グループインタビューでリアルな声を深掘り",
      "ギフティング調査で体験後の本音を回収＆投稿ブーストも可能",
    ],
  },
  {
    ValueNumber: "03",
    problemCategory: "ワンストップ施策支援",
    problemText: "調査はしたけど結局どう施策に繋げればいいかわからない...",
    problemImage: VALUE3,
    ValueTitle: "[[豊富なデータ]]から導く、刺さる戦略提案",
    ValueDescription:
      "収集したデータは、若年層特有の感情・行動文脈まで読み解く独自アルゴリズムで分析。||数字では見えない「選ばれる理由」を明確にします。",
    iconName: "lightbulb",
    features: [
      "実際の購買・発信行動データや実践知見を交えた高精度分析",
      "ブランド課題に合わせたカスタマイズ設計",
      "データ解析から施策立案までワンストップでサポート",
    ],
  },
];
