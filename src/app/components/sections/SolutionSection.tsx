"use client";

import { DiagonalBackground } from "../ui/DiagonalBackground";
import { SectionHeader } from "../ui/section-header";
import { SectionTitle } from "../ui/SectionTitle";
import { ContactButton } from "../ui/ContactButton";
import { SolutionCard } from "../ui/SolutionCard";
import problem1 from "../../assets/problem_1.png";
import problem2 from "../../assets/problem_2.png";
import problem3 from "../../assets/problem_3.png";

export function SolutionSection() {
  const solutions = [
    {
      solutionNumber: "01",
      problemCategory: "スピード",
      problemText:
        "トレンドの移り変わりが早いのに、調査に時間がかかりすぎて追いつけない...",
      problemImage: problem1,
      solutionTitle: "独自ネットワークで<br />最短24時間で若者の声が集まる",
      solutionDescription:
        "独自のインフルエンサーネットワーク（数千人規模）により、一般的な調査会社が「募集」から始める作業を省略。最短24時間で若者の本音を収集します。",
      iconName: "zap",
      features: [
        "最短24時間で調査結果をご報告",
        "数千人のインフルエンサーと即座にコンタクト可能",
        "独自ネットワークだから実現できるスピード",
      ],
    },
    {
      solutionNumber: "02",
      problemCategory: "活用方法",
      problemText: "調査はしたけど結局どう施策に繋げればいいかわからない...",
      problemImage: problem2,
      solutionTitle: "豊富データから導く、<br />刺さる施策をご提案",
      solutionDescription:
        "過去の広告代理店での実績やデータを元に、効果的な施策を提案。調査データを「机上の空論」で終わらせず、実行可能な施策として落とし込みます。",
      iconName: "lightbulb",
      features: [
        "実際の調査データから導き出した施策提案",
        "データと実践知見を組み合わせた確度の高い施策",
        "調査から実行まで一気通貫でサポート",
      ],
    },
    {
      solutionNumber: "03",
      problemCategory: "仮説検証",
      problemText: "施策を行ってみたけど思ったような成果が出なかった...",
      problemImage: problem3,
      solutionTitle: "4つの施策を組んで深いニーズを<br />理解、企画を外さない",
      solutionDescription:
        "アンケート調査（定量）、インフルエンサーインタビュー（定性）、グループインタビュー（定性）、ギフティング調査（インサイト検証）を組み合わせることで、若年層を立体的に理解。企画を外さない。",
      iconName: "barChart3",
      features: [
        "アンケート調査で市場全体の傾向を数値化",
        "インフルエンサーインタビュー・グループインタビューで本音を追求",
        "ギフティング調査で質感の反応を検証",
        "多角的なアプローチで仮説検証を繰り返し、企画を外さない",
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
