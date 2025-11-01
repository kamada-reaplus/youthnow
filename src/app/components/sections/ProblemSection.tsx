import { Section } from "../ui/composite";
import { ContentCard } from "../ui/ContentCard";
import { SectionShell } from "../ui/SectionShell";
import ArrowDivider from "../ui/ArrowDivider";
import { Container } from "../ui/Container";
import { PROBLEMS } from "../../content/problems";

/**
 * デザインシステム使用コンポーネント
 * - カラー: neutral-white, neutral-black, brand-primary, brand-secondary など
 * - スペーシング: section-spacing, px-lg, gap-xl など
 * - タイポグラフィ: text-body, text-body-sm, text-h6 など
 */

// データは content/problems.ts に外出し

export function ProblemSection() {
  return (
    <SectionShell
      id="problem"
      bgColor="bg-neutral-light-cyan"
      diagonalBgColor="bg-brand-primary"
      className="px-lg pb-8 md:py-6 relative overflow-hidden -mb-px"
    >
      <Section id="problem" centered>
        <Section.Header spacing="lg" className="px-lg">
          <Section.Label size="lg" color="primary">
            PROBLEM
          </Section.Label>
          <Section.Title color="black" size="responsive">
            若年層マーケティングで
            <br />
            こんな課題を感じていませんか?
          </Section.Title>
        </Section.Header>
      </Section>

      <Container size="5xl" padding="none" className="relative z-10">
        <MainContentCard />
        <ArrowDivider />
      </Container>
    </SectionShell>
  );
}

// 新しい Section コンポーネントを使用

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

// 共通化済み ArrowDivider を使用
