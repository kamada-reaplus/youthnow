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
      problemNumber: "01",
      problemCategory: "時間・コスト",
      problemText: "調査したいけど、時間もコストもかかりすぎて手が出せない",
      problemImage: problem1,
      solutionNumber: "01",
      solutionTitle: "24時間×低コストで<br />若者の声が集まる",
      solutionDescription:
        "独自のインフルエンサーネットワークにより、一般的な調査会社が「募集」から始める作業を省略。最短24時間、従来の1/10の期間・1/8のコストで若者の本音を収集します。",
      iconName: "zap",
      features: [
        "最短24時間で調査結果をご報告",
        "従来の1/10の期間、1/8のコストを実現",
        "523名のインフルエンサーと即座に繋がる",
      ],
      stats: [
        { value: "523名", label: "登録インフルエンサー" },
        { value: "1,247万", label: "フォロワー総数" },
        { value: "24h", label: "平均レスポンス" },
        { value: "2.5年", label: "平均契約期間" },
      ],
    },
    {
      problemNumber: "02",
      problemCategory: "活用方法",
      problemText: "調査はしたけど、結局どう施策に繋げればいいかわからない",
      problemImage: problem2,
      solutionNumber: "02",
      solutionTitle: "データと実践知見で<br />刺さる施策をご提案",
      solutionDescription:
        "自社D2Cブランドで若年層マーケを200回以上実践した経験から、「なぜ刺さるか」を肌感覚とデータで理解。調査データを「机上の空論」で終わらせず、実行可能な施策として提案します。",
      iconName: "lightbulb",
      features: [
        "200回以上の実践から得た「刺さるポイント」",
        "データと肌感覚を組み合わせた確度の高い施策",
        "調査から実行まで一気通貫でサポート",
      ],
    },
    {
      problemNumber: "03",
      problemCategory: "仮説検証",
      problemText: "施策を打ってみたけど、思ったような成果が出なかった",
      problemImage: problem3,
      solutionNumber: "03",
      solutionTitle: "定量×定性で<br />若者ニーズを完全把握",
      solutionDescription:
        "アンケートだけでは見えない「生の声」と、インタビューだけでは見えない「全体像」。両方を組み合わせることで、若年層を立体的に理解できます。仮説検証を繰り返し、精度の高い施策へ。",
      iconName: "barChart3",
      features: [
        "定量調査で市場全体の傾向を数値化",
        "定性調査で若者の本音・感情を深掘り",
        "多角的なアプローチで次の一手が見える",
      ],
    },
  ];

  return (
    <section
      id="solution"
      className="bg-brand-primary section-spacing px-xl md:px-lg relative overflow-x-hidden -mb-px"
    >
      {/* 斜めの白背景（特徴カードの途中から） */}
      <DiagonalBackground bgColor="bg-neutral-light-cyan" position="lower" />
      <SectionTitle title="SOLUTION" titleColor="text-neutral-white" />

      {/* Background blur effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.04] pointer-events-none">
        <div className="absolute -top-20 -left-12 w-[700px] h-[580px] bg-brand-primary rounded-full blur-[120px]" />
        <div className="absolute top-[500px] -right-40 w-[766px] h-[655px] bg-brand-secondary rounded-full blur-[120px]" />
      </div>

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
              problemNumber={solution.problemNumber}
              problemCategory={solution.problemCategory}
              problemText={solution.problemText}
              problemImage={solution.problemImage}
              solutionTitle={solution.solutionTitle}
              solutionDescription={solution.solutionDescription}
              iconName={solution.iconName}
              features={solution.features}
              stats={solution.stats}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-3xl lg:mt-4xl flex justify-center">
          <ContactButton variant="yellow" size="medium" />
        </div>
      </div>
    </section>
  );
}
