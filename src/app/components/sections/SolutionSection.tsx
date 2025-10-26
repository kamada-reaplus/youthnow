"use client";

import { DiagonalBackground } from "../ui/DiagonalBackground";
import { SectionHeader } from "../ui/section-header";
import { SectionTitle } from "../ui/SectionTitle";
import { ContactButton } from "../ui/ContactButton";
import { SolutionCard } from "../ui/SolutionCard";
import solution1 from "../../assets/solution_1.png";
import solution2 from "../../assets/solution_2.png";
import solution3 from "../../assets/solution_3.png";

export function SolutionSection() {
  const solutions = [
    {
      solutionNumber: "01",
      problemCategory: "スピード",
      problemText:
        "トレンドの移り変わりが早いのに、調査に時間がかかりすぎて追いつけない...",
      problemImage: solution1,
      solutionTitle:
        '独自ネットワークで、<br />"今"、"生"の若者の声を即キャッチ',
      solutionDescription:
        "独自のインフルエンサーネットワーク（数千人規模）を活用し、最短24時間でリアルな声を収集。||スピードだけでなく「回答の質」にこだわり、意思決定にすぐ使えるデータを届けます。",
      iconName: "zap",
      features: [
        "数千人規模の若年層の回答をスピーディーに収集",
        "SNS発信層へのリーチで最新トレンドを正確に把握",
        "調査からレポーティングまで一気通貫のスムーズ対応",
      ],
    },
    {
      solutionNumber: "02",
      problemCategory: "活用方法",
      problemText: "調査はしたけど結局どう施策に繋げればいいかわからない...",
      problemImage: solution2,
      solutionTitle: '豊富なデータから導く、<br />"刺さる"戦略提案',
      solutionDescription:
        "収集したデータは、若年層特有の感情・行動文脈まで読み解く独自アルゴリズムで分析。||数字では見えない「選ばれる理由」を明確にします。",
      iconName: "lightbulb",
      features: [
        "実際の購買・発信行動データや実践知見を交えた高精度分析",
        "ブランド課題に合わせたカスタマイズ設計",
        "データ解析から施策立案までワンストップでサポート",
      ],
    },
    {
      solutionNumber: "03",
      problemCategory: "仮説検証",
      problemText: "施策を行ってみたけど思ったような成果が出なかった...",
      problemImage: solution3,
      solutionTitle: "4つの手法で、<br />若年層の本音を多角的に把握",
      solutionDescription:
        'アンケート調査（定量）、インフルエンサーインタビュー（定性）、グループインタビュー（定性）、ギフティング調査（定量・定性）を組み合わせ、表層的な"流行"ではなく、"根底の価値観"を掘り下げる。||「数字×ストーリー×トレンド」を立体的に可視化。',
      iconName: "barChart3",
      features: [
        "アンケート調査で市場全体の傾向を数値化",
        "インフルエンサーインタビュー・グループインタビューでリアルな声を深掘り",
        "ギフティング調査で体験後の本音を回収＆投稿ブーストも可能",
      ],
    },
  ];

  return (
    <section
      id="solution"
      className="bg-brand-primary section-spacing px-xl md:px-lg relative overflow-x-hidden -mb-px"
    >
      {/* 斜めの白背景（特徴カードの途中から） */}
      <DiagonalBackground bgColor="bg-neutral-light-cyan" />
      <SectionTitle title="SOLUTION" titleColor="text-neutral-white" />

      <div className="container mx-auto max-w-7xl relative z-10 px-xl lg:px-2xl">
        {/* Section Header */}
        <div className="mb-2xl lg:mb-3xl">
          <SectionHeader
            title="その課題Youth Now!が解決します"
            textColor="text-neutral-white"
            highlightColor="text-brand-secondary"
            leadingTight
            responsive
            className="mb-0"
          />
        </div>

        {/* Solutions - Before/After Cards */}
        <div className="space-y-2xl lg:space-y-3xl">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              solutionNumber={solution.solutionNumber}
              problemCategory={solution.problemCategory}
              problemText={solution.problemText}
              problemImage={solution.problemImage}
              solutionTitle={solution.solutionTitle}
              solutionDescription={solution.solutionDescription}
              iconName={solution.iconName}
              features={solution.features}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-3xl lg:mt-4xl flex justify-center">
          <ContactButton
            variant="yellow"
            size="medium"
            text="Youth Nowで解決！"
          />
        </div>
      </div>
    </section>
  );
}
