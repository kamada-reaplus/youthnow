import {
  BarChart3,
  Users,
  MessageCircle,
  Gift,
  Lightbulb,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { OutputSample } from "../components/ui/OutputSlider";

export interface ServiceItem {
  icon: LucideIcon;
  title: string; // メインタイトル（例: アンケート調査）
  category: string; // カテゴリタグ（例: 定量調査）
  catchphrase: string; // キャッチコピー
  description: string; // 詳細本文
  badge?: string;
}

export const SERVICES: ServiceItem[] = [
  {
    icon: BarChart3,
    title: "アンケート調査",
    category: "定量調査",
    catchphrase: "数で見抜く、[[購買行動のリアル]]。",
    description:
      '商品の利用シーンや購買行動を数値化し、若年層の意思決定パターンを可視化。ターゲット設計や販促戦略の"根拠データ"を提供します。',
  },
  {
    icon: Users,
    title: "インフルエンサーインタビュー",
    category: "定性調査",
    catchphrase: "[[発信者視点]]から、トレンドの芽を探る。",
    description:
      "フォロワー数万〜数十万規模のインフルエンサーにヒアリング。流行の「作り手」から、共感を生む要因を分析します。",
  },
  {
    icon: MessageCircle,
    title: "グループインタビュー",
    category: "定性調査",
    catchphrase: "[[共感の瞬間]]を、言葉で捉える。",
    description:
      '若年層4〜8名による座談会形式で、定量調査では見えない感情のトーンを可視化。会話の中から"本音"や"無意識のニーズ"を抽出します。',
  },
  {
    icon: Gift,
    title: "ギフティング調査",
    category: "定量・定性調査",
    catchphrase: "[[体験]]が[[購買意欲]]にどう影響するかを測る。",
    description:
      "商品やサービスを若年層に提供し、SNS発信と同時に購買意向の変化を可視化。使用前とは異なる、手に届いた後のリアルな声を発見できます。",
  },
  {
    icon: Lightbulb,
    title: "ワンストップ施策提案",
    category: "施策立案",
    catchphrase: "データを施策に変えるまで、[[ワンチーム]]で。",
    description:
      "調査結果を分析し、マーケティングや広告施策へ落とし込み。インサイトを軸に、実行可能なプランを設計します。",
  },
  {
    icon: FileText,
    title: "トレンド調査資料",
    category: "レポート",
    catchphrase: "若年層のいまを[[定点観測]]。",
    description:
      "業種横断で若年層のトレンドをまとめたレポートを定期配信。社内資料や次期企画立案のインプットとして活用できます。",
  },
];

export const OUTPUT_SAMPLES: OutputSample[] = [
  { image: "/images/slides/nail1.svg", title: "グループインタビュー" },
  { image: "/images/slides/nail2.svg", title: "グループインタビュー" },
  { image: "/images/slides/nail3.svg", title: "グループインタビュー" },
  { image: "/images/slides/halloween1.svg", title: "トレンド調査資料" },
  { image: "/images/slides/halloween2.svg", title: "トレンド調査資料" },
  { image: "/images/slides/halloween3.svg", title: "トレンド調査資料" },
  { image: "/images/slides/cosme1.svg", title: "アンケート調査" },
  { image: "/images/slides/cosme2.svg", title: "アンケート調査" },
  { image: "/images/slides/cosme3.svg", title: "アンケート調査" },
];
