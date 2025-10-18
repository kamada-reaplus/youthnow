import imgSpeed from "../../assets/speed.png";
import imgSearch from "../../assets/saerch.png";
import imgCost from "../../assets/cost.png";
import Image from "next/image";
import logoHeader from "../../assets/header-logo.png";
import FirstView from "../../assets/first_view.png";

import { ContactButton } from "../ui/ContactButton";
import { FeatureCard } from "../ui/FeatureCard";
import { DiagonalBackground } from "../ui/DiagonalBackground";

export function Hero() {
  return (
    <section className="text-white min-h-screen flex flex-col items-center px-5 py-6 md:py-12 relative overflow-hidden">
      {/* 背景レイヤー */}
      <div className="absolute inset-0 bg-brand-primary" />

      {/* 斜めの白背景（特徴カードの途中から） */}
      <DiagonalBackground bgColor="bg-neutral-light-cyan" />
      {/* ロゴ */}
      <div className="mb-12 md:mb-10 z-10 w-full max-w-[280px] md:max-w-md">
        <Image
          src={logoHeader}
          alt="次世代型 インサイトマーケティング Youth Now!"
          className="w-full h-auto"
        />
      </div>

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col items-center justify-start w-full z-10 pb-8 px-2">
        {/* モバイル版レイアウト */}
        <div className="md:hidden w-full mb-12">
          {/* スマホ画像とテキストのグリッド */}
          <div className="grid grid-cols-[auto_1fr] items-start gap-1">
            {/* スマートフォン画像 */}
            <div className="w-[clamp(160px,42vw,200px)] flex-shrink-0">
              <Image
                src={FirstView}
                alt="スマートフォンを見る女性"
                className="w-full h-auto rounded-2xl"
              />
            </div>

            {/* テキストエリア */}
            <div className="flex flex-col justify-center items-start pt-0 space-y-4 -ml-8">
              {/* 若年層が 吹き出し */}
              <div className="inline-block transform rotate-[-8deg]">
                <div className="flex items-center whitespace-nowrap">
                  <div className="bg-brand-secondary text-brand-primary px-3 py-1.5 rounded-full shadow-lg">
                    <span className="font-bold text-[clamp(2.5rem,9vw,3.25rem)] leading-none">
                      若年層
                    </span>
                  </div>
                  <span className="text-[clamp(2.25rem,8vw,2.75rem)] text-transparent text-stroke-white text-stroke-2 font-black leading-none -ml-2">
                    が
                  </span>
                </div>
              </div>

              {/* "本当に買いたい" テキスト */}
              <div className="inline-block transform rotate-[-8deg] ml-3">
                <div className="text-[clamp(2.5rem,9vw,3.25rem)] leading-tight">
                  <div className="whitespace-nowrap mb-4">
                    <span className="font-bold text-white drop-shadow-lg">
                      &quot;本当に
                    </span>
                  </div>
                  <div className="whitespace-nowrap ml-2">
                    <span className="font-bold text-white drop-shadow-lg">
                      買いたい&quot;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ものがわかる！ */}
          <div className="-mt-6 z-20 relative">
            <div className="w-full transform rotate-[-8deg] flex justify-center">
              <div className="bg-brand-primary text-brand-secondary text-[clamp(2.5rem,10vw,4rem)] font-bold py-2 px-4 whitespace-nowrap tracking-widest inline-block">
                ものがわかる！
              </div>
            </div>
          </div>

          {/* 3つの特徴カード */}
          <div className="grid grid-cols-3 gap-2.5 w-full max-w-[350px] mx-auto mt-6">
            <FeatureCard
              title="最短24時間"
              description="数千人から<br />本音収集"
              image={imgSpeed}
              alt="最短24時間"
            />
            <FeatureCard
              title="発信源に調査"
              description="インフルエンサー<br />直接調査"
              image={imgSearch}
              alt="発信源に調査"
            />
            <FeatureCard
              title="圧倒的コスパ"
              description="1/8のコスト<br />1/10の期間"
              image={imgCost}
              alt="圧倒的コスパ"
            />
          </div>
        </div>

        {/* PC版レイアウト */}
        <div className="hidden md:flex flex-row items-start w-full max-w-[min(90vw,1200px)] ml-8 gap-8 mb-12">
          {/* 左側: スマートフォン画像 */}
          <div className="flex-shrink-0">
            <div className="w-[clamp(350px,35vw,480px)]">
              <Image
                src={FirstView}
                alt="スマートフォンを見る女性"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>

          {/* 右側: テキストエリアとFeatureCard */}
          <div className="flex flex-col justify-start pt-0 space-y-4">
            {/* 若年層が 吹き出し */}
            <div className="inline-block transform rotate-[-8deg] self-start">
              <div className="flex items-center whitespace-nowrap">
                <div className="bg-brand-secondary text-brand-primary px-7 py-3 rounded-full shadow-lg">
                  <span className="font-bold text-7xl leading-none">
                    若年層
                  </span>
                </div>
                <span className="text-6xl text-transparent text-stroke-white text-stroke-3 font-black leading-none -ml-4">
                  が
                </span>
              </div>
            </div>

            {/* "本当に買いたい" テキスト */}
            <div className="inline-block transform rotate-[-8deg] self-start">
              <div className="text-7xl leading-[1.3]">
                <div className="whitespace-nowrap">
                  <span className="font-bold text-white drop-shadow-lg">
                    &quot;本当に買いたい&quot;
                  </span>
                </div>
              </div>
            </div>

            {/* ものがわかる！ */}
            <div className="z-20 relative">
              <div className="transform rotate-[-8deg]">
                <div className="text-brand-secondary text-7xl font-bold py-4 px-6 whitespace-nowrap tracking-widest inline-block">
                  ものがわかる！
                </div>
              </div>
            </div>

            {/* 3つの特徴カード */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-[600px] !mt-16">
              <FeatureCard
                title="最短24時間"
                description="数千人から<br />本音収集"
                image={imgSpeed}
                alt="最短24時間"
              />
              <FeatureCard
                title="発信源に調査"
                description="インフルエンサー<br />直接調査"
                image={imgSearch}
                alt="発信源に調査"
              />
              <FeatureCard
                title="圧倒的コスパ"
                description="1/8のコスト<br />1/10の期間"
                image={imgCost}
                alt="圧倒的コスパ"
              />
            </div>
          </div>
        </div>

        {/* CTAボタン */}
        <ContactButton />
      </div>
    </section>
  );
}
