"use client";

import { LucideIcon, Zap, BarChart3, Users, Lightbulb } from "lucide-react";
import { ReactNode } from "react";
import Image from "next/image";

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  barChart3: BarChart3,
  users: Users,
  lightbulb: Lightbulb,
};

interface StrengthCardProps {
  index: number;
  title: string;
  subtitle?: string;
  description: string;
  reason?: string;
  icon?: LucideIcon;
  iconName?: string;
  image?: string;
  visual?: ReactNode;
  layout?: "default" | "split" | "overlay";
  stats?: Array<{
    value: string;
    label: string;
  }>;
  features?: string[];
  note?: string;
  solvesProblem?: {
    number: string;
    category: string;
  };
}

export default function StrengthCard({
  index,
  title,
  subtitle,
  description,
  icon,
  iconName,
  image,
  visual,
  stats,
  features,
  note,
  solvesProblem,
}: StrengthCardProps) {
  const isEven = index % 2 === 0;
  const Icon = iconName ? iconMap[iconName] : icon;

  // 共通のネガティブマージンクラス
  const cardExtendClass = isEven
    ? "w-[calc(100%+20vw)] -ml-[20vw]"
    : "w-[calc(100%+20vw)] -mr-[20vw]";

  // Split Layout
  return (
    <div className="relative w-full group">
      <div
        className={`bg-neutral-white/95 backdrop-blur-sm border-2 border-gray-200 hover:border-brand-primary/30 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-brand-primary/10 ${cardExtendClass}`}
      >
        <div
          className={`flex flex-col lg:flex-row items-stretch min-h-[400px] lg:min-h-[500px] ${
            isEven ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
        >
          {/* ビジュアル領域 */}
          <div
            className={`w-full lg:w-1/2 relative bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 p-lg lg:p-2xl overflow-visible ${
              isEven ? "lg:ml-[20vw]" : "lg:mr-[20vw]"
            }`}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-primary rounded-full blur-3xl animate-float-slow" />
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-brand-secondary rounded-full blur-3xl animate-float-medium" />
            </div>

            {/* アイコン・ビジュアル - スマホでは右上、デスクトップでは中央 */}
            <div className="relative z-10 min-h-[120px] lg:min-h-0 lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-full">
              {Icon && (
                <div className="absolute -top-2 -right-2 lg:static w-20 h-20 md:w-24 md:h-24 lg:w-40 lg:h-40 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-brand-primary to-brand-primary/80 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                  <Icon
                    className="w-10 h-10 md:w-12 md:h-12 lg:w-20 lg:h-20 text-white"
                    strokeWidth={1.5}
                  />
                </div>
              )}
              {visual && (
                <div className="absolute -top-2 -right-2 lg:static w-32 md:w-40 lg:w-full lg:max-w-md">
                  {visual}
                </div>
              )}
              {image && (
                <div className="absolute -top-2 -right-2 lg:static w-32 md:w-40 lg:w-full lg:max-w-md rounded-xl lg:rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={image}
                    alt={title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              )}
              {!Icon && !visual && !image && (
                <div className="absolute -top-2 -right-2 lg:static w-32 h-32 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-2xl">
                  <span className="text-4xl lg:text-7xl text-white opacity-20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* コンテンツ領域 */}
          <div
            className={`w-full my-4 lg:w-1/2 flex flex-col justify-center ${
              isEven
                ? "pl-[15vw] pr-lg lg:pl-2xl lg:pr-2xl"
                : "pr-[10vw] pl-lg lg:pr-2xl lg:pl-2xl"
            }`}
          >
            <div className="max-w-full overflow-hidden">
              {/* 解決する課題バッジ */}
              {solvesProblem && (
                <div className="mb-lg flex items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-2 bg-brand-secondary/10 border-2 border-brand-secondary rounded-full px-3 md:px-4 py-1.5 md:py-2">
                    <span className="text-brand-secondary text-sm md:text-base">
                      ✓
                    </span>
                    <span className="text-xs md:text-sm text-neutral-black/80">
                      解決する課題:
                    </span>
                    <span className="inline-flex items-center justify-center bg-brand-primary text-neutral-white text-xs md:text-sm px-2 md:px-2.5 py-0.5 md:py-1 rounded-full">
                      課題{solvesProblem.number}
                    </span>
                    <span className="text-sm md:text-base text-brand-primary">
                      {solvesProblem.category}
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-lg">
                <p className="text-5xl md:text-6xl lg:text-7xl text-brand-primary leading-none">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </div>

              <h3 className="text-h4 md:text-h3 lg:text-h2 mb-md text-brand-primary leading-tight break-words">
                {title}
              </h3>
              {subtitle && (
                <p className="text-body-lg md:text-h6 font-semibold text-neutral-black/90 px-lg py-md rounded-lg mb-lg leading-snug break-words border-l-4 border-brand-primary">
                  {subtitle}
                </p>
              )}
              <p className="text-body md:text-body-lg leading-relaxed text-neutral-black/80 mb-xl break-words">
                {description}
              </p>

              <div className="bg-brand-primary/5 rounded-2xl p-lg lg:p-xl border-l-4 border-brand-secondary">
                {stats && stats.length > 0 && (
                  <div className="mb-lg">
                    <div className="grid grid-cols-2 gap-md">
                      {stats.map((stat, statIndex) => (
                        <div
                          key={statIndex}
                          className="text-center bg-white/50 rounded-xl p-md"
                        >
                          <div className="text-h5 lg:text-h4 text-brand-primary mb-xs leading-tight break-words">
                            {stat.value}
                          </div>
                          <div className="text-body-sm text-neutral-black/70 leading-snug break-words">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {features && features.length > 0 && (
                  <div className="space-y-sm mb-lg">
                    {features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex gap-sm items-start"
                      >
                        <div className="bg-brand-primary text-neutral-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                          ✓
                        </div>
                        <p className="text-body-sm text-neutral-black/80 leading-relaxed break-words">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {note && (
                  <div className="bg-brand-secondary/10 border border-brand-secondary/20 rounded-xl p-md mt-md">
                    <p className="text-body-sm text-neutral-black/80 leading-relaxed break-words">
                      {note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
