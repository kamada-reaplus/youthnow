"use client";

import Image, { StaticImageData } from "next/image";

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
  features,
}: SolutionCardProps) {
  return (
    <div className="relative bg-neutral-light-cyan/30 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 lg:p-12 shadow-lg border-2 border-neutral-light-cyan/40">
      {/* メインコンテンツ: 左右2カラム */}
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-lg md:gap-xl lg:gap-2xl items-start">
        {/* 左側: アイコン + ラベル + Before吹き出し */}
        <div className="flex flex-col h-full items-start gap-md md:gap-lg">
          {/* アイコンとラベル */}
          <div className="flex items-center gap-3  md:gap-4">
            {/* 黄色アイコンボックス */}
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-brand-secondary rounded-2xl md:rounded-3xl text-brand-primary text-4xl flex items-center justify-center flex-shrink-0">
              {solutionNumber}
            </div>

            {/* ラベル（スピード、活用方法など） */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl text-white">
              {problemCategory}
            </h3>
          </div>

          {/* Before吹き出しエリア */}
          <div className="relative flex flex-col items-start justify-center gap-sm flex-1">
            {/* Beforeバッジ */}
            <div className="bg-brand-primary text-neutral-white text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full whitespace-nowrap">
              Before
            </div>

            {/* 吹き出しとキャラクター */}
            <div className="flex gap-2">
              {/* 吹き出し */}
              <div className="bg-neutral-light-cyan border-2 border-neutral-black rounded-2xl md:rounded-3xl px-3 md:px-4 py-3 md:py-4 shadow-sm max-w-[180px] md:max-w-[200px] lg:max-w-[240px] flex items-center">
                <p className="text-xs md:text-sm text-neutral-black/70 leading-snug">
                  {problemText}
                </p>
              </div>

              {/* キャラクター画像 */}
              <div className="flex-shrink-0 mb-2">
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
            <div className="bg-brand-secondary text-brand-primary text-sm md:text-base px-4 md:px-5 py-1.5 md:py-2 rounded-full shadow-sm">
              After
            </div>
          </div>

          {/* ソリューションタイトル */}
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-white leading-snug pr-12 sm:pr-16 md:pr-20 lg:pr-24">
            {solutionTitle.split("<br />").map((line, index, array) => (
              <span key={index}>
                {line}
                {index < array.length - 1 && <br />}
              </span>
            ))}
          </h3>

          {/* 説明文 */}
          <p className="text-sm md:text-base text-neutral-black/70 leading-relaxed whitespace-pre-line">
            {solutionDescription.split("||").join("\n")}
          </p>

          {/* 特徴リスト */}
          <div className="space-y-2 md:space-y-3 pt-2 bg-white/60 md:bg-white/70 p-4 md:p-5 rounded-xl md:rounded-2xl shadow-inner">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex gap-2.5 md:gap-3 items-start  backdrop-blur-sm rounded-xl"
              >
                <div className="bg-brand-secondary text-brand-primary rounded-full w-6 h-6 md:w-7 md:h-7 flex items-center justify-center flex-shrink-0 text-sm md:text-base shadow-sm">
                  ✓
                </div>
                <p className="text-sm md:text-base text-neutral-black/70 leading-relaxed">
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
