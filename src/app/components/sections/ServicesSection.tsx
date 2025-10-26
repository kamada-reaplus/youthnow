"use client";

import { useState, useRef, useEffect } from "react";
import {
  BarChart3,
  Users,
  MessageCircle,
  Gift,
  Lightbulb,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "../ui/section-header";
import { SectionTitle } from "../ui/SectionTitle";
import { ServiceCard } from "../ui/ServiceCard";
import { PricingCard } from "../ui/PricingCard";
import { DiagonalBackground } from "../ui/DiagonalBackground";
import { ContactButton } from "../ui/ContactButton";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, neutral-black, brand-primary, brand-secondary など
// - スペーシング: section-spacing, px-lg, gap-xl など
// - タイポグラフィ: text-h2, text-body, text-body-sm など

const SERVICES = [
  {
    icon: BarChart3,
    title: "アンケート調査\n【定量調査】",
    description:
      '数で見抜く、購買行動のリアル。\n商品の利用シーンや購買行動を数値化し、若年層の意思決定パターンを可視化。\nターゲット設計や販促戦略の"根拠データ"を提供します。',
  },
  {
    icon: Users,
    title: "インフルエンサー\nインタビュー【定性調査】",
    description:
      "発信者視点から、トレンドの芽を探る。\nフォロワー数万〜数十万規模のインフルエンサーにヒアリング。\n流行の「作り手」から、共感を生む要因を分析します。",
  },
  {
    icon: MessageCircle,
    title: "グループインタビュー\n【定性調査】",
    description:
      '共感の瞬間を、言葉で捉える。\n若年層4〜8名による座談会形式で、定量調査では見えない感情のトーンを可視化。\n会話の中から"本音"や"無意識のニーズ"を抽出します。',
  },
  {
    icon: Gift,
    title: "ギフティング調査\n【定量・定性調査】",
    description:
      "体験が購買意欲にどう影響するかを測る。\n商品やサービスを若年層に提供し、SNS発信と同時に購買意向の変化を可視化。\n使用前とは異なる、手に届いた後のリアルな声を発見できます。",
  },
  {
    icon: Lightbulb,
    title: "ワンストップ施策提案\n【施策立案】",
    badge: "人気",
    description:
      "データを施策に変えるまで、ワンチームで。\n調査結果を分析し、マーケティングや広告施策へ落とし込み。\nインサイトを軸に、実行可能なプランを設計します。",
  },
  {
    icon: FileText,
    title: "トレンド調査資料\n【レポート】",
    description:
      '若年層の"いま"を定点観測。\n業種横断で若年層のトレンドをまとめたレポートを定期配信。\n社内資料や次期企画立案のインプットとして活用できます。',
  },
];

// アウトプット例のスライド
const OUTPUT_SAMPLES = [
  {
    image: "/images/slides/nail1.svg",
    title: "Z世代のネイルに対する意識調査と効果的なPR戦略",
    subtitle: "ワンストップ施策提案（P1）",
  },
  {
    image: "/images/slides/nail2.svg",
    title: "Z世代のネイルに対する意識調査と効果的なPR戦略",
    subtitle: "ワンストップ施策提案（P2）",
  },
  {
    image: "/images/slides/nail3.svg",
    title: "Z世代のネイルに対する意識調査と効果的なPR戦略",
    subtitle: "ワンストップ施策提案（P3）",
  },
  {
    image: "/images/slides/halloween1.svg",
    title: "ハロウィンにおけるZ世代の参加/消費行動調査",
    subtitle: "トレンド調査資料（P1）",
  },
  {
    image: "/images/slides/halloween2.svg",
    title: "ハロウィンにおけるZ世代の参加/消費行動調査",
    subtitle: "トレンド調査資料（P2）",
  },
  {
    image: "/images/slides/halloween3.svg",
    title: "ハロウィンにおけるZ世代の参加/消費行動調査",
    subtitle: "トレンド調査資料（P3）",
  },
  {
    image: "/images/slides/cosme1.svg",
    title: "コスメに関する消費者の購買行動調査",
    subtitle: "アンケート調査（P1）",
  },
  {
    image: "/images/slides/cosme2.svg",
    title: "コスメに関する消費者の購買行動調査",
    subtitle: "アンケート調査（P2）",
  },
  {
    image: "/images/slides/cosme3.svg",
    title: "コスメに関する消費者の購買行動調査",
    subtitle: "アンケート調査（P3）",
  },
];

interface NavigationDotsProps {
  totalItems: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}

function NavigationDots({
  totalItems,
  currentIndex,
  onDotClick,
}: NavigationDotsProps) {
  return (
    <div className="flex justify-center gap-sm mt-lg">
      {Array.from({ length: totalItems }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-2 h-2 rounded-full transition-all ${
            index === currentIndex
              ? "bg-brand-primary w-6"
              : "bg-neutral-black/20"
          }`}
          aria-label={`サービス${index + 1}へ移動`}
        />
      ))}
    </div>
  );
}

export function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<
    "light" | "standard" | "custom"
  >("standard");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Pricing Plans データ
  const plans = {
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

  const currentPlan = plans[selectedPlan];

  // スクロール位置からcurrentIndexを更新
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.scrollWidth / SERVICES.length;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
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

  // Output スライダーのハンドラー
  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % OUTPUT_SAMPLES.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) =>
      prev === 0 ? OUTPUT_SAMPLES.length - 1 : prev - 1
    );
  };

  return (
    <section
      id="services"
      className="section-spacing bg-neutral-light-cyan relative overflow-hidden -mb-px"
    >
      <DiagonalBackground bgColor="bg-brand-primary" />
      <SectionTitle title="SERVICES" />

      <div className="container mx-auto px-lg relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-lg md:mb-xl">
            <SectionHeader title="提供サービス" responsive className="mb-md" />
            <p className="text-body-sm md:text-body text-neutral-black/70 max-w-2xl mx-auto">
              若年層の「リアル」を多角的に調査し、
              <br className="md:hidden" />
              マーケティング戦略に落とし込みます
            </p>
          </div>

          {/* Mobile: Swipeable Cards */}
          <div className="md:hidden">
            <div
              ref={scrollContainerRef}
              className="flex gap-md overflow-x-auto snap-x snap-mandatory scrollbar-hide px-lg -mx-lg pb-lg"
            >
              {SERVICES.map((service, index) => (
                <div
                  key={index}
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
            {SERVICES.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          {/* OUTPUT セクション */}
          <div className="mt-xl pt-xl">
            <div className="text-center mb-lg md:mb-xl">
              <SectionHeader
                title="アウトプット例"
                responsive
                className="mb-md"
              />
              <p className="text-body-sm md:text-body text-neutral-black/70 max-w-2xl mx-auto">
                実際の調査レポートの一部をご紹介
              </p>
            </div>

            {/* Slider Container */}
            <div className="relative max-w-4xl mx-auto">
              {/* Slide */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-neutral-white">
                <div className="aspect-[16/9] relative">
                  <Image
                    src={OUTPUT_SAMPLES[slideIndex].image}
                    alt={OUTPUT_SAMPLES[slideIndex].title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority={slideIndex === 0}
                  />
                </div>

                {/* Slide Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-black/80 to-transparent p-lg">
                  <h4 className="text-body-lg md:text-h5 text-neutral-white font-bold mb-xs">
                    {OUTPUT_SAMPLES[slideIndex].title}
                  </h4>
                  <p className="text-body-sm md:text-body text-neutral-white/90">
                    {OUTPUT_SAMPLES[slideIndex].subtitle}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-neutral-white hover:bg-brand-primary text-neutral-black hover:text-neutral-white rounded-full p-md shadow-lg transition-all duration-300 z-10"
                aria-label="前のスライド"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-neutral-white hover:bg-brand-primary text-neutral-black hover:text-neutral-white rounded-full p-md shadow-lg transition-all duration-300 z-10"
                aria-label="次のスライド"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-sm mt-lg">
                {OUTPUT_SAMPLES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSlideIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === slideIndex
                        ? "bg-brand-primary w-8"
                        : "bg-neutral-black/20 hover:bg-neutral-black/40"
                    }`}
                    aria-label={`スライド${index + 1}へ移動`}
                  />
                ))}
              </div>
            </div>
            {/* CTA追加 */}
            <div className="mt-6 text-center">
              <ContactButton
                variant="yellow"
                label="30秒で入力完了!"
                text="資料を請求する"
              />
            </div>
          </div>

          {/* PRICING セクション */}
          <div className="mt-xl pt-xl">
            <div className="text-center mb-2xl">
              <SectionHeader title="料金プラン" responsive className="mb-md" />
            </div>

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
                name={plans.light.name}
                price={plans.light.price}
                description={plans.light.description}
                features={plans.light.features}
                report={plans.light.report}
                timeline={plans.light.timeline}
              />

              <PricingCard
                name={plans.standard.name}
                price={plans.standard.price}
                description={plans.standard.description}
                features={plans.standard.features}
                report={plans.standard.report}
                timeline={plans.standard.timeline}
                badge={plans.standard.badge}
                variant="standard"
              />

              <PricingCard
                name={plans.custom.name}
                price={plans.custom.price}
                description={plans.custom.description}
                features={plans.custom.features}
                report={plans.custom.report}
                timeline={plans.custom.timeline}
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
      </div>
    </section>
  );
}
