"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Section } from "../ui/composite";
import { ServiceCard } from "../ui/ServiceCard";
import { PricingCard } from "../ui/PricingCard";
import { SectionShell } from "../ui/SectionShell";
import { ContactButton } from "../ui/ContactButton";
import { OutputSlider } from "../ui/OutputSlider";
import { NavigationDots } from "../ui/NavigationDots";
import { Container } from "../ui/Container";
import { SERVICES, OUTPUT_SAMPLES } from "../../content/services";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, neutral-black, brand-primary, brand-secondary など
// - スペーシング: section-spacing, px-lg, gap-xl など
// - タイポグラフィ: text-h2, text-body, text-body-sm など

// Output sliderの型はui/OutputSliderから再利用

type PlanKey = "light" | "standard" | "custom";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  report: string;
  timeline: string;
  badge?: string;
}

// データは content/services.ts に外出し
// NavigationDotsはui/NavigationDotsに移動

// OutputSliderはui/OutputSliderに移動

// ===== プラン定義を外出し =====
const PLANS: Record<PlanKey, Plan> = {
  light: {
    name: "ライト",
    price: "¥250,000",
    description: "初回調査に最適なベーシックプラン",
    features: [
      "定量調査（アンケート）[500人 10問]",
      "トレンド調査資料（レポート）",
    ],
    report: "簡易レポート（10〜15P）",
    timeline: "調査開始から2〜4週間",
  },
  standard: {
    name: "スタンダード",
    price: "¥500,000",
    description: "本格的なマーケティング戦略立案に",
    badge: "おすすめ",
    features: [
      "定量調査（アンケート）[500人 10問]",
      "トレンド調査資料（レポート）",
      "座談会（グループインタビュー）[4名]",
      "インフルエンサーインタビュー[2名〜]",
    ],
    report: "詳細レポート（30〜50P）",
    timeline: "1ヶ月〜1ヶ月半",
  },
  custom: {
    name: "カスタム",
    price: "¥500,000〜",
    description: "完全オーダーメイドの調査プラン",
    features: ["定量調査（アンケート）[1,000人 10問]", "ギフティング調査"],
    report: "カスタム仕様",
    timeline: "内容に応じて別途調整",
  },
};

export function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("standard");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentPlan = useMemo(() => PLANS[selectedPlan], [selectedPlan]);

  // スクロール位置からcurrentIndexを更新
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let rafId = 0 as number | undefined;
    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.scrollWidth / SERVICES.length;
        const newIndex = Math.round(scrollLeft / cardWidth);
        setCurrentIndex(newIndex);
        rafId = undefined;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll as EventListener);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ドットクリック時のスクロール
  const handleDotClick = (index: number) => {
    if (!scrollContainerRef.current) return;

    const cardWidth = scrollContainerRef.current.scrollWidth / SERVICES.length;
    scrollContainerRef.current.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
  };

  // Output スライダーのハンドラー（メモ化で再レンダリング防止）
  // OutputSliderに責務移譲済み

  return (
    <SectionShell
      id="services"
      bgColor="bg-neutral-light-cyan"
      diagonalBgColor="bg-brand-primary"
      className="section-spacing relative overflow-hidden -mb-px"
    >
      <Section id="services" centered>
        <Section.Header spacing="md" className="px-lg">
          <Section.Label size="lg" color="primary">
            SERVICES
          </Section.Label>
          <Section.Title size="responsive" color="black">
            提供サービス
          </Section.Title>
        </Section.Header>
      </Section>

      <Container size="7xl" padding="none" className="relative z-10 px-lg">
        <div className="max-w-6xl mx-auto">
          {/* Mobile: Swipeable Cards */}
          <div className="md:hidden">
            <div
              ref={scrollContainerRef}
              className="flex gap-md overflow-x-auto snap-x snap-mandatory scrollbar-hide px-lg -mx-lg pb-lg"
            >
              {SERVICES.map((service) => (
                <div
                  key={service.title}
                  className="flex-shrink-0 w-[85vw] max-w-[340px] snap-center"
                >
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>

            <NavigationDots
              totalItems={SERVICES.length}
              currentIndex={currentIndex}
              onDotClick={handleDotClick}
            />
          </div>

          {/* Desktop: 3x2 Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>

          {/* OUTPUT セクション */}
          <div className="mt-xl pt-xl">
            <Section centered>
              <Section.Header spacing="md">
                <Section.Title size="responsive" color="black">
                  アウトプット例
                </Section.Title>
                <Section.Subtitle
                  size="md"
                  color="muted"
                  className="max-w-2xl mx-auto mt-sm"
                >
                  実際の調査レポートの一部をご紹介
                </Section.Subtitle>
              </Section.Header>
            </Section>

            {/* Slider Container */}
            <OutputSlider samples={OUTPUT_SAMPLES} />
            {/* CTA追加 */}
            <div className="mt-6 text-center">
              <ContactButton label="30秒で入力完了!" text="資料を請求する" />
            </div>
          </div>

          {/* PRICING セクション */}
          <div className="mt-xl pt-xl">
            <Section centered>
              <Section.Header spacing="lg">
                <Section.Title size="responsive" color="black">
                  料金プラン
                </Section.Title>
              </Section.Header>
            </Section>

            {/* SP: プラン選択ボタン */}
            <div className="flex justify-center mb-8 md:hidden">
              <div className="inline-flex bg-neutral-light rounded-full p-1 shadow-sm">
                <button
                  onClick={() => setSelectedPlan("light")}
                  className={`px-6 py-2 text-sm rounded-full transition-all ${
                    selectedPlan === "light"
                      ? "bg-neutral-white text-brand-primary shadow-md"
                      : "text-neutral-medium hover:text-neutral-dark"
                  }`}
                >
                  ライト
                </button>
                <button
                  onClick={() => setSelectedPlan("standard")}
                  className={`px-6 py-2 text-sm rounded-full transition-all relative ${
                    selectedPlan === "standard"
                      ? "bg-brand-primary text-neutral-white shadow-md"
                      : "text-neutral-medium hover:text-neutral-dark"
                  }`}
                >
                  スタンダード
                </button>
                <button
                  onClick={() => setSelectedPlan("custom")}
                  className={`px-6 py-2 text-sm rounded-full transition-all ${
                    selectedPlan === "custom"
                      ? "bg-neutral-white text-brand-primary shadow-md"
                      : "text-neutral-medium hover:text-neutral-dark"
                  }`}
                >
                  カスタム
                </button>
              </div>
            </div>

            {/* SP: 選択されたプラン詳細 */}
            <div className="md:hidden mb-8">
              <PricingCard
                name={currentPlan.name}
                price={currentPlan.price}
                description={currentPlan.description}
                features={currentPlan.features}
                report={currentPlan.report}
                timeline={currentPlan.timeline}
                badge={"badge" in currentPlan ? currentPlan.badge : undefined}
                variant={selectedPlan === "standard" ? "standard" : "default"}
                className="rounded-[3rem] shadow-2xl"
              />
            </div>

            {/* PC: 3カラム表示 */}
            <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6">
              <PricingCard
                name={PLANS.light.name}
                price={PLANS.light.price}
                description={PLANS.light.description}
                features={PLANS.light.features}
                report={PLANS.light.report}
                timeline={PLANS.light.timeline}
              />

              <PricingCard
                name={PLANS.standard.name}
                price={PLANS.standard.price}
                description={PLANS.standard.description}
                features={PLANS.standard.features}
                report={PLANS.standard.report}
                timeline={PLANS.standard.timeline}
                badge={PLANS.standard.badge}
                variant="standard"
              />

              <PricingCard
                name={PLANS.custom.name}
                price={PLANS.custom.price}
                description={PLANS.custom.description}
                features={PLANS.custom.features}
                report={PLANS.custom.report}
                timeline={PLANS.custom.timeline}
              />
            </div>

            {/* CTA追加 */}
            <div className="mt-6 text-center">
              <ContactButton
                variant="yellow"
                label="今すぐ無料相談（所要時間30秒）"
                text="料金プランを相談する"
              />
            </div>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
