"use client";
import { Container } from "../ui/Container";

import {
  Mail,
  MessageCircle,
  Lightbulb,
  FileText,
  Users,
  BarChart3,
  LucideIcon,
} from "lucide-react";
import { Section } from "../ui/composite";
import { DiagonalBackground } from "../ui/DiagonalBackground";
import { useState, useRef, useEffect } from "react";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, neutral-black, brand-primary, brand-secondary など
// - スペーシング: section-spacing, px-lg, gap-xl など
// - タイポグラフィ: text-h6, text-body, text-body-sm など

interface Step {
  number: string;
  title: string;
  icon: LucideIcon;
  description: string;
}

interface FlowCardProps {
  step: Step;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "問い合わせ",
    icon: Mail,
    description:
      "まずはフォームまたはメールよりご連絡ください。\nサービスの概要資料や過去の調査レポートサンプルをお送りします。",
  },
  {
    number: "02",
    title: "ヒアリング",
    icon: MessageCircle,
    description:
      "担当者が貴社の課題や調査目的を詳しく伺います。ターゲット層、知りたいインサイト、活用シーンなどを共有いただくことで、最適な調査設計が可能になります。",
  },
  {
    number: "03",
    title: "調査設計",
    icon: Lightbulb,
    description:
      "ヒアリング内容を基に、調査対象(年齢/性別/地域など）、手法(定量/座談会/インタビュー）、スケジュールを設計。御見積とともにご提案いたします。",
  },
  {
    number: "04",
    title: "契約",
    icon: FileText,
    description:
      "ご提案後、問題がなければ正式に契約書の記入をお願いしています。",
  },
  {
    number: "05",
    title: "調査実施",
    icon: Users,
    description:
      "調査を実際に実施。アンケート配信、座談会の開催、インフルエンサーインタビュー、ギフティングなどをスピーディに進めます。調査規模や手法により所要期間は変動します。",
  },
  {
    number: "06",
    title: "レポート納品",
    icon: BarChart3,
    description:
      "調査結果を整理し、PDFまたはCanva形式でレポート納品。データの提示にとどまらず、広告施策・商品開発にどう活かすかまで提案します。",
  },
];

// Desktop用のFlowCard
function DesktopFlowCard({ step }: FlowCardProps) {
  const Icon = step.icon;

  return (
    <div className="bg-neutral-white border border-neutral-black/20 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-md lg:p-lg group hover:border-brand-primary/40 relative overflow-hidden flex flex-col w-[160px] lg:w-[210px] h-[320px] lg:h-[300px]">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Small Number in top-left */}
      <div className="absolute top-sm left-sm">
        <span className="text-md text-brand-primary">STEP {step.number}</span>
      </div>

      {/* Icon - Large and centered */}
      <div className="flex justify-center mb-md mt-lg">
        <Icon className="w-12 h-12 lg:w-14 lg:h-14 text-brand-primary" />
      </div>

      {/* Title */}
      <h3 className="text-body-sm lg:text-body text-neutral-black text-center mb-md px-xs">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-caption text-neutral-black/70 leading-relaxed text-center px-xs whitespace-pre-line">
        {step.description}
      </p>

      {/* Spacer to fill remaining space */}
      <div className="flex-1" />
    </div>
  );
}

// Mobile用のFlowCard
function MobileFlowCard({ step }: FlowCardProps) {
  const Icon = step.icon;

  return (
    <div className="bg-neutral-white border border-neutral-black/20 rounded-2xl shadow-md p-lg h-full relative">
      {/* Small Number in top-left */}
      <div className="absolute top-md left-md">
        <span className="text-xl text-brand-primary">STEP {step.number}</span>
      </div>

      {/* Icon - Large and centered */}
      <div className="flex justify-center mb-md mt-xl">
        <Icon className="w-16 h-16 text-brand-primary" />
      </div>

      {/* Title */}
      <h3 className="text-h6 text-neutral-black text-center mb-md">
        {step.title}
      </h3>

      {/* Spacer to push description down */}
      <div className="flex-1" />

      {/* Description */}
      <p className="text-body-sm text-neutral-black/70 leading-relaxed text-center mb-md whitespace-pre-line">
        {step.description}
      </p>
    </div>
  );
}

// ナビゲーションドット
interface NavigationDotsProps {
  totalSteps: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}

function NavigationDots({
  totalSteps,
  currentIndex,
  onDotClick,
}: NavigationDotsProps) {
  return (
    <div className="flex justify-center gap-sm mt-lg mb-xl">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-2 h-2 rounded-full transition-all ${
            index === currentIndex
              ? "bg-brand-primary w-6"
              : "bg-neutral-black/20"
          }`}
          aria-label={`ステップ${index + 1}へ移動`}
        />
      ))}
    </div>
  );
}

export function FlowSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // スクロール位置からcurrentIndexを更新
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.scrollWidth / STEPS.length;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // ドットクリック時のスクロール
  const handleDotClick = (index: number) => {
    if (!scrollContainerRef.current) return;

    const cardWidth = scrollContainerRef.current.scrollWidth / STEPS.length;
    scrollContainerRef.current.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="flow"
      className="bg-neutral-light-cyan py-12 md:py-16 px-lg relative overflow-hidden min-h-screen -mb-px"
    >
      <DiagonalBackground bgColor="bg-brand-primary" />

      <Section id="flow" centered>
        <Section.Header spacing="md" className="px-lg">
          <Section.Label size="lg" color="primary">
            FLOW
          </Section.Label>
          <Section.Title size="responsive" color="black">
            ご利用の流れ
          </Section.Title>
          <Section.Subtitle
            size="md"
            color="muted"
            className="max-w-2xl mx-auto mt-sm"
          >
            簡単6ステップで高品質な調査を実現
          </Section.Subtitle>
        </Section.Header>
      </Section>

      <Container
        padding="none"
        className="relative z-10 w-full flex flex-col justify-center max-w-[1400px]"
      >
        {/* Mobile & Tablet: Swipeable Cards */}
        <div className="xl:hidden mb-xl">
          <div
            ref={scrollContainerRef}
            className="flex gap-md overflow-x-auto snap-x snap-mandatory scrollbar-hide px-lg -mx-lg pb-lg"
          >
            {STEPS.map((step, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85vw] max-w-[340px] md:max-w-[400px] snap-center"
              >
                <MobileFlowCard step={step} />
              </div>
            ))}
          </div>

          <NavigationDots
            totalSteps={STEPS.length}
            currentIndex={currentIndex}
            onDotClick={handleDotClick}
          />
        </div>

        {/* Desktop (XL以上): 横1列 x 6個の縦長カード */}
        <div className="hidden xl:flex items-start justify-center gap-3 lg:gap-4 mb-xl w-full px-md">
          {STEPS.map((step, index) => (
            <DesktopFlowCard key={index} step={step} />
          ))}
        </div>

        {/* Support Message */}
        <div className="text-center mb-lg">
          <p className="text-body md:text-h6 text-neutral-black leading-relaxed mb-sm">
            不明な点がございましたら、
            <br className="md:hidden" />
            いつでもお気軽にお問い合わせください。
          </p>
          <p className="text-body-sm md:text-body text-neutral-black/70">
            専門スタッフが丁寧にサポートいたします
          </p>
        </div>
      </Container>
    </section>
  );
}
