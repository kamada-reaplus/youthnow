"use client";

import { LucideIcon, Zap, BarChart3, Lightbulb } from "lucide-react";
import Image, { StaticImageData } from "next/image";

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  barChart3: BarChart3,
  lightbulb: Lightbulb,
};

interface SolutionCardProps {
  solutionNumber: string;
  problemCategory: string;
  problemText: string;
  problemImage: StaticImageData;
  solutionTitle: string;
  solutionDescription: string;
  iconName: string;
  features: string[];
}

export function SolutionCard({
  solutionNumber,
  problemCategory,
  problemText,
  problemImage,
  solutionTitle,
  solutionDescription,
  iconName,
  features,
}: SolutionCardProps) {
  const Icon = iconMap[iconName];

  return (
    <div className="relative bg-white rounded-3xl md:rounded-[2.5rem] p-lg md:p-xl lg:p-2xl shadow-lg border-2 border-neutral-light-cyan">
      {/* 大きな番号（右上） */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 lg:top-12 lg:right-12 z-10">
        <span className="text-7xl md:text-8xl lg:text-9xl font-bold text-white text-stroke-3 text-stroke-brand-primary opacity-100" style={{ WebkitTextStroke: '3px #00BCD4' }}>
          {solutionNumber}
        </span>
      </div>

      {/* メインコンテンツ: 左右2カラム */}
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-lg md:gap-xl lg:gap-2xl items-start">
        {/* 左側: アイコン + Before吹き出し */}
        <div className="flex flex-col items-center gap-md md:gap-lg">
          {/* 黄色アイコンボックス */}
          <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-brand-secondary rounded-2xl flex items-center justify-center shadow-md flex-shrink-0">
            {Icon && (
              <Icon
                className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-brand-primary"
                strokeWidth={2}
              />
            )}
          </div>

          {/* Before吹き出し */}
          <div className="flex flex-col items-center gap-sm">
            <div className="bg-neutral-black/80 text-neutral-white font-bold text-xs md:text-sm px-3 py-1 rounded-full whitespace-nowrap">
              Before
            </div>
            <div className="flex items-center gap-md">
              <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20">
                <Image
                  src={problemImage}
                  alt={problemText}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="bg-neutral-light-cyan border border-neutral-black rounded-3xl px-md md:px-lg py-md shadow-sm max-w-[200px] md:max-w-[240px]">
                <div className="flex items-center gap-2 mb-xs flex-wrap">
                  <span className="text-xs md:text-sm font-bold text-brand-primary">
                    {problemCategory}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-neutral-black/70 leading-tight">
                  {problemText}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 右側: Afterコンテンツ */}
        <div className="space-y-md md:space-y-lg relative">
          {/* Afterバッジ */}
          <div className="inline-block">
            <div className="bg-brand-secondary text-brand-primary font-bold text-sm md:text-base px-4 md:px-5 py-1.5 md:py-2 rounded-full">
              After
            </div>
          </div>

          {/* ソリューションタイトル */}
          <h3 className="text-h6 md:text-h5 lg:text-h4 font-bold text-brand-primary leading-tight pr-16 md:pr-20 lg:pr-24">
            {solutionTitle.split("<br />").map((line, index, array) => (
              <span key={index}>
                {line}
                {index < array.length - 1 && <br />}
              </span>
            ))}
          </h3>

          {/* 説明文 */}
          <p className="text-body-sm md:text-body text-neutral-black/80 leading-relaxed">
            {solutionDescription}
          </p>

          {/* 特徴リスト */}
          <div className="space-y-xs md:space-y-sm">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-sm items-start">
                <div className="bg-brand-secondary text-brand-primary rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center flex-shrink-0 text-xs md:text-sm font-bold mt-1">
                  ✓
                </div>
                <p className="text-body-sm md:text-body text-neutral-black/80 leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
