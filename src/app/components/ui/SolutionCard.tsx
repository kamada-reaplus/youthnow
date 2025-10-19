"use client";

import { LucideIcon, Zap, BarChart3, Lightbulb } from "lucide-react";
import Image, { StaticImageData } from "next/image";

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  barChart3: BarChart3,
  lightbulb: Lightbulb,
};

interface SolutionCardProps {
  problemNumber: string;
  problemCategory: string;
  problemText: string;
  problemImage?: StaticImageData;
  solutionTitle: string;
  solutionDescription: string;
  iconName?: string;
  features?: string[];
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

export function SolutionCard({
  problemNumber,
  problemCategory,
  problemText,
  problemImage,
  solutionTitle,
  solutionDescription,
  iconName,
  features,
  stats,
}: SolutionCardProps) {
  const Icon = iconName ? iconMap[iconName] : null;

  return (
    <div className="bg-neutral-white rounded-3xl md:rounded-[2.5rem] border-2 border-neutral-black/10 shadow-lg overflow-hidden">
      {/* ヘッダー: 課題 */}
      <div className="bg-gradient-to-r from-brand-primary/10 to-brand-primary/5 px-xl md:px-2xl py-lg md:py-xl border-b-2 border-neutral-black/10">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="inline-flex items-center justify-center bg-brand-primary text-neutral-white font-bold text-sm md:text-base lg:text-lg px-2.5 md:px-3 lg:px-3.5 py-1 md:py-1.5 lg:py-1.5 rounded-full">
            課題{problemNumber}
          </span>
          <span className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-primary">
            {problemCategory}
          </span>
        </div>
      </div>

      {/* メインコンテンツ: BEFORE / AFTER */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr]">
        {/* BEFORE */}
        <div className="px-md md:px-lg py-lg md:py-xl border-b md:border-b-0 md:border-r-2 border-neutral-black/10 bg-neutral-light-cyan/30">
          <div className="text-center flex flex-col justify-center h-full">
            <div className="inline-block bg-neutral-black/80 text-neutral-white font-bold text-xs px-2.5 py-0.5 rounded-full mb-sm mx-auto">
              BEFORE
            </div>

            {/* 課題のイラストエリア */}
            <div className="mb-sm flex justify-center">
              {problemImage ? (
                <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
                  <Image
                    src={problemImage}
                    alt={problemText}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-neutral-black/5 border-2 border-neutral-black/20 flex items-center justify-center">
                  <span className="text-xl md:text-2xl lg:text-3xl">😰</span>
                </div>
              )}
            </div>

            <p className="text-body-sm md:text-body lg:text-body-lg font-semibold text-neutral-black/70 leading-tight px-sm">
              {problemText}
            </p>
          </div>
        </div>

        {/* AFTER */}
        <div className="px-xl md:px-2xl py-2xl bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
          <div className="text-center">
            <div className="inline-block bg-brand-secondary text-brand-primary font-bold text-sm md:text-base px-4 py-1.5 rounded-full mb-lg">
              AFTER
            </div>

            {/* アイコン */}
            {Icon && (
              <div className="mb-lg flex justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-brand-primary to-brand-primary/80 flex items-center justify-center shadow-xl">
                  <Icon
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            )}

            {/* タイトル */}
            <h3 className="text-h5 md:text-h4 lg:text-h3 font-bold text-brand-primary mb-lg leading-tight">
              {solutionTitle.split('<br />').map((line, index, array) => (
                <span key={index}>
                  {line}
                  {index < array.length - 1 && <br />}
                </span>
              ))}
            </h3>

            {/* 説明 */}
            <p className="text-body-sm md:text-body lg:text-body-lg text-neutral-black/80 leading-relaxed mb-lg">
              {solutionDescription}
            </p>

            {/* 特徴 */}
            {features && features.length > 0 && (
              <div className="space-y-sm text-left">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-sm items-start">
                    <div className="bg-brand-secondary text-brand-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                      ✓
                    </div>
                    <p className="text-body-sm md:text-body text-neutral-black/80 leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="mt-lg grid grid-cols-2 gap-sm">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/50 rounded-xl p-sm md:p-md border border-brand-primary/20"
                  >
                    <div className="text-h6 md:text-h5 font-bold text-brand-primary mb-xs">
                      {stat.value}
                    </div>
                    <div className="text-caption md:text-body-sm text-neutral-black/70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
