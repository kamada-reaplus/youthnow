import Image from "next/image";
import { SectionHeader } from "../ui/section-header";
import { SectionTitle } from "../ui/SectionTitle";
import { ContentCard } from "../ui/ContentCard";
import { DiagonalBackground } from "../ui/DiagonalBackground";
import problem1 from "../../assets/problem_1.png";
import problem2 from "../../assets/problem_2.png";
import problem3 from "../../assets/problem_3.png";
import arrow from "../../assets/arrow_yellow.png";
import type { StaticImageData } from "next/image";

/**
 * デザインシステム使用コンポーネント
 * - カラー: neutral-white, neutral-black, brand-primary, brand-secondary など
 * - スペーシング: section-spacing, px-lg, gap-xl など
 * - タイポグラフィ: text-body, text-body-sm, text-h6 など
 */

interface Problem {
  text: string;
  image: StaticImageData;
  category: string;
  number: string;
}

const PROBLEMS: Problem[] = [
  {
    text: "トレンドの移り変わりが早いのに、調査に時間がかかりすぎて追いつけない...",
    image: problem1,
    category: "スピード",
    number: "01",
  },
  {
    text: "調査はしたけど、結局どう施策に繋げればいいかわからない...",
    image: problem2,
    category: "活用方法",
    number: "02",
  },
  {
    text: "施策を打ってみたけど、思ったような成果が出なかった...",
    image: problem3,
    category: "仮説検証",
    number: "03",
  },
];

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative overflow-hidden bg-neutral-light-cyan px-lg pb-8 md:py-6 -mb-px"
    >
      <DiagonalBackground bgColor="bg-brand-primary" />

      <SectionTitle title="PROBLEM" />

      <SectionHeaderBlock />

      <div className="container relative z-10 mx-auto max-w-5xl">
        <MainContentCard />
        <ArrowDivider />
      </div>
    </section>
  );
}

function SectionHeaderBlock() {
  return (
    <div className="mb-2xl text-center md:mb-xl">
      <SectionHeader
        title="若年層マーケティングで<br />こんな課題を感じていませんか?"
        textColor="text-neutral-black"
        leadingTight
        responsive
        className="mb-0 px-lg"
      />
    </div>
  );
}

function MainContentCard() {
  return (
    <div className="mb-xl rounded-3xl border border-neutral-black/20 bg-neutral-white px-3xl py-2xl shadow-sm md:mb-lg md:rounded-[2.5rem] md:px-xl md:py-xl lg:px-2xl lg:py-lg">
      <ProblemList />
    </div>
  );
}

function ProblemList() {
  return (
    <div className="md:mx-auto md:max-w-3xl">
      <div className="mb-3xl space-y-xl md:mb-0 md:space-y-md lg:space-y-md">
        {PROBLEMS.map((problem, index) => (
          <ContentCard
            key={`problem-${index}`}
            text={problem.text}
            image={problem.image}
            imageAlt={`問題 ${index + 1}`}
            imagePosition={index % 2 === 0 ? "right" : "left"}
            category={problem.category}
            number={problem.number}
          />
        ))}
      </div>
    </div>
  );
}

function ArrowDivider() {
  return (
    <div className="mb-xl flex justify-center md:mb-lg">
      <div className="w-16 lg:w-16">
        <Image
          src={arrow}
          alt="矢印"
          className="h-auto w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}
