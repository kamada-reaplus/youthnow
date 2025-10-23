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
    <div className="relative bg-neutral-light-cyan/40 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 lg:p-12 shadow-lg border-2 border-neutral-light-cyan/40">
      {/* 大きな番号（右上） */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12 lg:top-16 lg:right-16 z-10">
        <span className="text-7xl md:text-8xl lg:text-9xl font-bold text-white opacity-90">
          {solutionNumber}
        </span>
      </div>

      {/* メインコンテンツ: 左右2カラム */}
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-lg md:gap-xl lg:gap-2xl items-start">
        {/* 左側: アイコン + ラベル + Before吹き出し */}
        <div className="flex flex-col items-start gap-md md:gap-lg">
          {/* アイコンとラベル */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* 黄色アイコンボックス */}
            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-brand-secondary rounded-2xl md:rounded-3xl flex items-center justify-center shadow-md flex-shrink-0">
              {Icon && (
                <Icon
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-brand-primary"
                  strokeWidth={2.5}
                />
              )}
            </div>

            {/* ラベル（スピード、活用方法など） */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              {problemCategory}
            </h3>
          </div>

          {/* Before吹き出しエリア */}
          <div className="relative flex flex-col items-start gap-sm">
            {/* Beforeバッジ */}
            <div className="bg-neutral-black text-neutral-white font-bold text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full whitespace-nowrap">
              Before
            </div>

            {/* 吹き出しとキャラクター */}
            <div className="flex items-end gap-2">
              {/* 吹き出し */}
              <div className="bg-neutral-light-cyan border-2 border-neutral-black rounded-2xl md:rounded-3xl px-3 md:px-4 py-3 md:py-4 shadow-sm max-w-[180px] md:max-w-[220px] lg:max-w-[240px]">
                <p className="text-xs md:text-sm text-neutral-black/80 leading-snug">
                  {problemText}
                </p>
              </div>

              {/* キャラクター画像 */}
              <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-2">
                <Image
                  src={problemImage}
                  alt={problemText}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 右側: Afterコンテンツ */}
        <div className="space-y-3 md:space-y-4 relative">
          {/* Afterバッジ */}
          <div className="inline-block">
            <div className="bg-brand-secondary text-brand-primary font-bold text-sm md:text-base px-4 md:px-5 py-1.5 md:py-2 rounded-full shadow-sm">
              After
            </div>
          </div>

          {/* ソリューションタイトル */}
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight pr-16 md:pr-20 lg:pr-24">
            {solutionTitle.split("<br />").map((line, index, array) => (
              <span key={index}>
                {line}
                {index < array.length - 1 && <br />}
              </span>
            ))}
          </h3>

          {/* 説明文 */}
          <p className="text-sm md:text-base text-white leading-relaxed">
            {solutionDescription}
          </p>

          {/* 特徴リスト */}
          <div className="space-y-2 md:space-y-3 pt-2">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2.5 md:gap-3 items-start">
                <div className="bg-brand-secondary text-brand-primary rounded-full w-6 h-6 md:w-7 md:h-7 flex items-center justify-center flex-shrink-0 text-sm md:text-base font-bold mt-0.5 shadow-sm">
                  ✓
                </div>
                <p className="text-sm md:text-base text-white leading-relaxed">
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
