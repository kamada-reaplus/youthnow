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
import { SectionHeader } from "../ui/section-header";
import { SectionTitle } from "../ui/SectionTitle";
import { ServiceCard } from "../ui/ServiceCard";
import { DiagonalBackground } from "../ui/DiagonalBackground";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, neutral-black, brand-primary, brand-secondary など
// - スペーシング: section-spacing, px-lg, gap-xl など
// - タイポグラフィ: text-h2, text-body, text-body-sm など

const SERVICES = [
  {
    icon: BarChart3,
    title: "アンケート調査\n[定量調査]",
    description:
      "商品の利用シーンや消費者の購買行動などを可視化して分析します。",
  },
  {
    icon: Users,
    title: "インフルエンサー\nインタビュー[定性調査]",
    description:
      "フォロワー数万〜数十万規模のZ世代インフルエンサーにヒアリング。トレンドの「作り手」の視点から分析。",
  },
  {
    icon: MessageCircle,
    title: "グループインタビュー\n[定性調査]",
    description:
      "Z世代（4〜8名）を招集し、定量調査では見えない「感情のニュアンス」「言葉の選び方」を可視化。",
  },
  {
    icon: Gift,
    title: "ギフティング調査\n[インサイト検証]",
    description:
      "商品やサービスを若年層に提供し、リアルな声とSNS発信の両面から認知・購買意欲への影響を測定。",
  },
  {
    icon: Lightbulb,
    title: "ワンストップ\n施策提案",
    badge: "人気",
    description:
      "調査結果を分析し、具体的なマーケティング施策や広告キャンペーン企画まで落とし込み。",
  },
  {
    icon: FileText,
    title: "トレンド調査資料\n(レポート)",
    description:
      "若年層に関する業種横断型の調査レポートをポータル形式で閲覧できるサービス。",
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

// アウトプット例のスライド
const OUTPUT_SAMPLES = [
  {
    image: "/images/slides/slide1.png",
    title: "Z世代トレンド調査2024",
    subtitle: "SNSから見る消費行動の変化",
  },
  {
    image: "/images/slides/slide2.png",
    title: "インフルエンサー分析レポート",
    subtitle: "フォロワー層の深層心理を解明",
  },
  {
    image: "/images/slides/slide3.png",
    title: "ギフティング調査結果",
    subtitle: "商品体験からの本音フィードバック",
  },
];

export function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const cardWidth =
      scrollContainerRef.current.scrollWidth / SERVICES.length;
    scrollContainerRef.current.scrollTo({
      left: cardWidth * currentIndex,
      behavior: "smooth",
    });
  }, [currentIndex]);

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
      className="section-spacing bg-neutral-white relative overflow-hidden"
    >
      <DiagonalBackground bgColor="bg-neutral-light-cyan" />
      <SectionTitle title="SERVICES" />

      {/* 楕円形装飾 */}
      <div className="absolute top-10 right-10 w-[500px] h-[350px] bg-brand-primary rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-[450px] h-[380px] bg-brand-secondary rounded-full opacity-5 blur-3xl"></div>

      <div className="container mx-auto px-lg relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-lg md:mb-xl">
            <SectionHeader
              title="提供サービス"
              responsive
              className="mb-md"
            />
            <p className="text-body-sm md:text-body text-neutral-black/70 max-w-2xl mx-auto">
              Z世代の「リアル」を多角的に調査し、<br className="md:hidden" />
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
              onDotClick={setCurrentIndex}
            />
          </div>

          {/* Desktop: 3x2 Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {SERVICES.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          {/* Bottom CTA Message */}
          <div className="mt-xl text-center">
            <p className="text-body md:text-h6 text-neutral-black/80 leading-relaxed">
              各サービスの詳細や組み合わせプランについては
              <br className="hidden md:block" />
              お気軽にお問い合わせください
            </p>
          </div>

          {/* Output Samples Slider */}
          <div className="mt-4xl">
            <div className="text-center mb-lg">
              <h3 className="text-h4 md:text-h3 text-neutral-black font-bold mb-md">
                アウトプット例
              </h3>
              <p className="text-body-sm md:text-body text-neutral-black/70">
                実際の調査レポートの一部をご紹介
              </p>
            </div>

            {/* Slider Container */}
            <div className="relative max-w-4xl mx-auto">
              {/* Slide */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-neutral-white">
                <div className="aspect-[16/9] relative">
                  <img
                    src={OUTPUT_SAMPLES[slideIndex].image}
                    alt={OUTPUT_SAMPLES[slideIndex].title}
                    className="w-full h-full object-contain"
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
          </div>
        </div>
      </div>
    </section>
  );
}
