import { SectionHeader } from "../ui/section-header";
import { SectionTitle } from "../ui/SectionTitle";
import { TagGrid } from "../ui/TagGrid";
import { ContentCard } from "../ui/ContentCard";
import { CTABlock } from "../ui/CTABlock";
import problem1 from "../../assets/problem_1.png";
import problem2 from "../../assets/problem_2.png";
import problem3 from "../../assets/problem_3.png";
import arrow from "../../assets/arrow.png";
import Image from "next/image";
import { DiagonalBackground } from "../ui/DiagonalBackground";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, neutral-black, brand-primary, brand-secondary など
// - スペーシング: section-spacing, px-lg, gap-xl など
// - タイポグラフィ: text-body, text-body-sm, text-h6 など

export function ProblemSection() {
  const problems = [
    {
      text: "Z世代に刺さる企画が思いつかない...",
      image: problem1,
    },
    {
      text: "調査するにも時間とコストがかかりすぎる...",
      image: problem2,
    },
    {
      text: "社内で若者知見が不足しており、若年層のニーズがわからない...",
      image: problem3,
    },
  ];

  const targetAudiences = [
    "マーケティング部",
    "商品開発",
    "企画・研究",
    "事業企画",
    "経営企画",
  ];

  return (
    <section
      id="problem"
      className="bg-neutral-light-cyan pb-12 md:pb-16 px-lg relative overflow-hidden"
    >
      {/* 斜めの白背景（特徴カードの途中から） */}
      <DiagonalBackground bgColor="bg-brand-primary" position="lower" />
      <SectionTitle title="PROBLEM" />
      {/* Background blur effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.04] pointer-events-none">
        <div className="absolute -top-20 -left-12 w-[700px] h-[580px] bg-brand-primary rounded-full blur-[120px]" />
        <div className="absolute top-[500px] -right-40 w-[766px] h-[655px] bg-brand-secondary rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Main Content Card */}
        <div className="bg-neutral-white border border-neutral-black/20 rounded-3xl md:rounded-[2.5rem] px-3xl py-2xl md:px-3xl md:py-3xl lg:px-14 lg:py-4xl shadow-sm mb-xl md:mb-2xl">
          <div className="text-center mb-2xl md:mb-3xl">
            <SectionHeader
              title="若年層マーケティングで<br />こんな課題を感じていませんか?"
              textColor="text-neutral-black"
              leadingTight
              responsive
              className="mb-0 px-lg"
            />
          </div>
          {/* Target Audiences */}
          <TagGrid
            items={targetAudiences}
            className="mb-3xl md:mb-14 lg:mb-4xl"
          />

          {/* Problems with character illustration */}
          <div className="md:max-w-3xl md:mx-auto">
            {/* Problems */}
            <div className="space-y-xl md:space-y-xl lg:space-y-7 mb-3xl md:mb-3xl lg:mb-3xl">
              {problems.map((problem, index) => {
                const imagePosition = index % 2 === 0 ? "right" : "left";
                return (
                  <ContentCard
                    key={index}
                    text={problem.text}
                    image={problem.image}
                    imageAlt={`問題 ${index + 1}`}
                    imagePosition={imagePosition}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {/* 矢印 */}
        <div className="flex justify-center mb-xl md:mb-2xl">
          <div className="w-12 md:w-16 lg:w-20">
            <Image src={arrow} alt="矢印" className="w-full h-auto" />
          </div>
        </div>

        {/* CTAブロック */}
        <div className="flex justify-center">
          <CTABlock />
        </div>
      </div>
    </section>
  );
}
