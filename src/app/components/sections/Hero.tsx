import Image from "next/image";
import { ContactButton } from "../ui/ContactButton";
import { FeatureCard } from "../ui/FeatureCard";
import { DiagonalBackground } from "../ui/DiagonalBackground";
import imgSpeed from "../../assets/speed.png";
import imgSearch from "../../assets/saerch.png";
import imgCost from "../../assets/cost.png";
import logoHeader from "../../assets/logo.png";
import FirstView from "../../assets/first_view.png";
import type { StaticImageData } from "next/image";

interface Feature {
  title: string;
  description: string[];
  image: StaticImageData;
  alt: string;
}

const FEATURES: Feature[] = [
  {
    title: "最短24時間で回答回収",
    description: ["数千人のSNS発信者やトレンド層から", '"生の声"を収集'],
    image: imgSpeed,
    alt: "最短24時間で回答回収",
  },
  {
    title: "SNS発信源に直接リーチ",
    description: ["フォロワーを動かす人たちの", "リアルな意見を直接取得"],
    image: imgSearch,
    alt: "SNS発信源に直接リーチ",
  },
  {
    title: "コスパよく即活用",
    description: ["一般調査の1/8コスト"],
    image: imgCost,
    alt: "コスパよく即活用",
  },
];

export function Hero() {
  return (
    <section className="text-white min-h-screen flex flex-col items-center px-3 py-6 relative overflow-hidden">
      <BackgroundLayer />

      <h1 className="sr-only">
        Youth Now! - 若年層インサイトマーケティング
        最短24時間で数千人から本音収集
      </h1>

      <Logo />

      <MainContent />
    </section>
  );
}

function BackgroundLayer() {
  return (
    <>
      {/* 背景レイヤー */}
      <div className="absolute inset-0 bg-brand-primary" />

      {/* 斜めの白背景（特徴カードの途中から） */}
      <DiagonalBackground bgColor="bg-neutral-light-cyan" />
    </>
  );
}

function Logo() {
  return (
    <div className="mb-4 md:mb-5 lg:mb-6 z-10 w-full max-w-[180px] md:max-w-[240px] lg:max-w-[280px]">
      <Image
        src={logoHeader}
        alt="次世代型 インサイトマーケティング Youth Now!"
        className="w-full h-auto"
        quality={75}
        priority
        placeholder="blur"
      />
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex flex-col items-center w-full z-10 space-y-6 md:space-y-8">
      <MobileLayout />
      <DesktopLayout />

      {/* CTAボタン */}
      <div className="w-full flex justify-center">
        <ContactButton />
      </div>
    </div>
  );
}

function MobileLayout() {
  return (
    <div className="md:hidden w-full flex flex-col items-center">
      <SharedContent isMobile={true} />
    </div>
  );
}

function DesktopLayout() {
  return (
    <div className="hidden md:flex flex-row items-start justify-center w-full">
      <SharedContent isMobile={false} />
    </div>
  );
}

interface SharedContentProps {
  isMobile: boolean;
}

function SharedContent({ isMobile }: SharedContentProps) {
  if (isMobile) {
    return (
      <div className="flex flex-col items-center w-full space-y-4">
        {/* 画像とテキストエリア */}
        <div className="flex flex-row items-center justify-center gap-2 w-full max-w-[450px] mx-auto px-2">
          {/* スマートフォン画像 */}
          <div className="flex-shrink-0">
            <div className="w-[clamp(120px,35vw,160px)]">
              <Image
                src={FirstView}
                alt="スマートフォンを見る女性"
                className="w-full h-auto rounded-xl"
                quality={80}
                priority
                sizes="35vw"
                placeholder="blur"
              />
            </div>
          </div>

          {/* テキストエリア */}
          <div className="flex flex-col space-y-2 flex-1">
            {/* メインキャッチ - PC版と同じ白背景 */}
            <div className="self-start">
              <div className="bg-white rounded-lg border-2 border-brand-primary px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(255,215,0,1)]">
                <h2 className="font-extrabold leading-tight text-brand-primary text-[clamp(1rem,5vw,1.3rem)]">
                  企画も販促も
                </h2>
              </div>
            </div>

            {/* サブキャッチ - マーカー風 */}
            <div className="self-start -mt-0.5">
              <p className="leading-tight text-white text-[clamp(0.85rem,6vw,1rem)]">
                若年層の
                <br />
                <span className="relative inline-block mx-0.5">
                  <span className="relative z-10 font-extrabold text-white text-[clamp(0.95rem,7vw,1.5rem)]">
                    &quot;リアルな声&quot;
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-[35%] bg-brand-secondary/80 -z-0"></span>
                </span>
                から！
              </p>
            </div>

            {/* サブメッセージ - PC版と同じデザイン */}
            <div className="self-start">
              <p className="text-white font-extrabold leading-tight text-[clamp(0.75rem,2vw,1rem)]">
                <span className="inline-block text-brand-primary bg-brand-secondary rounded-lg border-2 border-brand-primary px-1.5 py-1 mx-1 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                  データ
                </span>
                と
                <span className="inline-block text-brand-primary bg-brand-secondary rounded-lg border-2 border-brand-primary px-1.5 py-1 mx-1 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                  インサイト
                </span>
                で、
                <br />
                <span className="inline-block mt-2">次の一手を早く。</span>
              </p>
            </div>
          </div>
        </div>

        {/* 3つの特徴カード - 横並び */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-[420px] mx-auto px-2">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={`feature-${index}`}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              alt={feature.alt}
            />
          ))}
        </div>
      </div>
    );
  }

  // デスクトップレイアウト
  return (
    <div className="flex flex-row items-center justify-center w-full gap-6 lg:gap-8">
      {/* 左側: スマートフォン画像 */}
      <div className="flex-shrink-0 pt-4">
        <div className="w-[clamp(240px,26vw,320px)] lg:w-[clamp(260px,28vw,340px)]">
          <Image
            src={FirstView}
            alt="スマートフォンを見る女性"
            className="w-full h-auto rounded-xl"
            quality={80}
            priority
            sizes="28vw"
            placeholder="blur"
          />
        </div>
      </div>

      {/* 右側: テキストエリアとFeatureCard */}
      <div className="flex flex-col justify-start space-y-4">
        <div className="self-start">
          <div className="bg-white rounded-lg border-2 border-brand-primary px-6 py-3 shadow-[4px_4px_0px_0px_rgba(255,215,0,1)]">
            <h2 className="font-extrabold leading-tight text-brand-primary text-[clamp(2rem,3vw,2.5rem)]">
              企画も販促も
            </h2>
          </div>
        </div>

        <div className="self-start -mt-1">
          <p className="leading-tight text-white text-[clamp(1.6rem,2.8vw,2.2rem)] lg:text-[clamp(1.8rem,3.2vw,2.6rem)]">
            若年層の
            <span className="relative inline-block mx-1">
              <span className="relative z-10 font-extrabold text-white text-[clamp(1.8rem,3.2vw,2.5rem)] lg:text-[clamp(2rem,3.6vw,2.8rem)]">
                &quot;リアルな声&quot;
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[35%] bg-brand-secondary/80 -z-0"></span>
            </span>
            から！
          </p>
        </div>

        <div className="self-start">
          <div>
            <p className="text-neutral-white font-extrabold leading-tight text-[clamp(1.1rem,2vw,1.5rem)] lg:text-[clamp(1.3rem,2.3vw,1.8rem)]">
              <span className="inline-block text-brand-primary bg-brand-secondary rounded-lg border-2 border-brand-primary px-2 py-2 mx-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                データ
              </span>
              と
              <span className="inline-block text-brand-primary bg-brand-secondary rounded-lg border-2 border-brand-primary px-2 py-2 mx-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                インサイト
              </span>
              で、次の一手を早く。
            </p>
          </div>
        </div>

        {/* 3つの特徴カード */}
        <div className="grid grid-cols-3 w-full gap-2 lg:gap-2.5 max-w-[420px] lg:max-w-[480px] !mt-4 lg:!mt-5">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={`feature-${index}`}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              alt={feature.alt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
