import Image from "next/image";
import { DiagonalBackground } from "../ui/DiagonalBackground";
import { ProblemCard } from "../ui/ProblemCard";
import { SectionHeader } from "../ui/section-header";
import { SectionTitle } from "../ui/SectionTitle";
import Story from "../../assets/story.png";
import LogoBlack from "../../assets/logo-black.png";
import { ContactButton } from "../ui/ContactButton";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, neutral-black, brand-primary など
// - スペーシング: section-spacing, px-lg, gap-xl など
// - タイポグラフィ: text-h6, text-body, text-h4 など

export function StorySection() {
  const capabilities = [
    "数千人のインフルエンサーとの\n直接リレーション",
    "D2Cブランド運営で培った\n若年層マーケ知見",
    "調査から施策提案までの\nワンストップ体制",
  ];

  const problems = [
    "レポートが届く頃には\nトレンドが変わっている。",
    "データを読んでも、\n施策が見えない。",
  ];

  return (
    <section
      id="story"
      className="bg-brand-primary py-8 md:py-12 px-lg relative overflow-hidden -mb-px min-h-screen flex items-center"
    >
      {/* 斜めの白背景（特徴カードの途中から） */}
      <DiagonalBackground bgColor="bg-neutral-light-cyan" />

      <div className="container mx-auto max-w-5xl relative z-10 w-full">
        {/* Section Header */}
        <SectionTitle title="REASON" titleColor="text-neutral-white" />

        <div className="mb-lg md:mb-xl">
          <SectionHeader
            title="なぜYouth Now!を作ったのか?"
            textColor="text-neutral-white"
            leadingTight
            responsive
            className="mb-0"
          />
        </div>
        {/* Story Content */}
        <div className="bg-neutral-white rounded-3xl md:rounded-[48px] shadow-lg p-lg md:p-xl">
          {/* Mobile: 縦レイアウト */}
          <div className="md:hidden space-y-lg">
            {/* Introduction */}
            <p className="text-body text-neutral-black/70 leading-relaxed text-center">
              Reaplusは広告代理店事業、インフルエンサー事務所、D2Cブランドを運営する中で、何度も同じ悩みを聞いてきました。
            </p>

            {/* Pain Point */}
            <div className="relative py-md">
              <div className="flex flex-col items-center gap-md">
                <div className="w-full max-w-[200px] relative aspect-square">
                  <Image
                    src={Story}
                    alt="Z世代向け商品を作りたいが、何が刺さるかわからない"
                    fill
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="text-center">
                  <p className="text-body-sm text-brand-primary leading-relaxed font-bold">
                    「Z世代向け商品を作りたいが、
                    <br />
                    何が刺さるか分からない」
                  </p>
                </div>
              </div>
            </div>

            {/* Problem */}
            <div className="space-y-md">
              <p className="text-h6 text-neutral-black font-bold text-center">
                既存の会社では・・・
              </p>
              <div className="max-w-md mx-auto">
                <ProblemCard items={problems} variant="problem" />
              </div>
            </div>

            <div className="mb-lg text-center">
              <p className="text-h5 text-neutral-black leading-tight">
                だからこそ私たちは<span className="text-2xl font-bold text-brand-secondary mx-1">決意</span>しました
              </p>
            </div>

            {/* Capabilities */}
            <div className="bg-gradient-to-br from-brand-primary/10 via-brand-secondary/10 to-brand-primary/10 rounded-2xl p-lg">
              <div className="max-w-md mx-auto">
                <ProblemCard items={capabilities} variant="capability" />
              </div>
            </div>

            {/* Mission */}
            <div className="text-center py-md">
              <p className="text-body text-neutral-black/70 leading-relaxed">
                これらすべてを掛け合わせた
              </p>
              <p className="text-h5 text-brand-primary font-bold my-sm leading-relaxed">
                「今までにない調査体験」
              </p>
              <p className="text-body text-neutral-black/70 leading-relaxed">
                を提供しよう、と。
              </p>
            </div>

            {/* Conclusion */}
            <div className="text-center pt-md pb-sm">
              <p className="text-body text-neutral-black/70 leading-relaxed mb-sm">
                それが
              </p>
              <Image
                src={LogoBlack}
                alt="Youth Now! ロゴ"
                width={240}
                height={86}
                className="mx-auto mb-sm"
                loading="lazy"
              />
              <p className="text-body text-neutral-black/70 leading-relaxed">
                です。
              </p>
            </div>
          </div>

          {/* Desktop: 縦スクロール、一部横配置 */}
          <div className="hidden md:block space-y-lg">
            {/* Introduction */}
            <p className="text-body md:text-h6 text-neutral-black/70 leading-relaxed text-center">
              Reaplusは広告代理店事業、インフルエンサー事務所、D2Cブランドを運営する中で、
              <br />
              何度も同じ悩みを聞いてきました。
            </p>

            {/* Pain Point */}
            <div className="relative py-md flex justify-center">
              <div className="flex items-center gap-xl bg-brand-primary/5 rounded-2xl p-lg max-w-fit mx-auto">
                <div className="w-48 lg:w-56 h-48 lg:h-56 relative flex-shrink-0">
                  <Image
                    src={Story}
                    alt="Z世代向け商品を作りたいが、何が刺さるかわからない"
                    fill
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="max-w-lg">
                  <p className="text-h5 lg:text-h4 text-brand-primary leading-relaxed font-bold">
                    「Z世代向け商品を作りたいが、
                    <br />
                    何が刺さるか分からない」
                  </p>
                </div>
              </div>
            </div>

            {/* Problem - 横並び */}
            <div className="space-y-md">
              <p className="text-h6 md:text-h5 text-neutral-black font-bold text-center">
                既存の会社では・・・
              </p>
              <div className="max-w-4xl mx-auto">
                <ProblemCard
                  items={problems}
                  variant="problem"
                  layout="horizontal"
                />
              </div>
            </div>

            <div className="mb-md text-center">
              <p className="text-h5 md:text-h4 text-neutral-black leading-tight">
                だからこそ私たちは<span className="text-3xl md:text-4xl font-bold text-brand-secondary mx-1">決意</span>しました
              </p>
            </div>

            {/* Capabilities - 横並び */}
            <div className="bg-gradient-to-br from-brand-primary/10 via-brand-secondary/10 to-brand-primary/10 rounded-3xl p-lg">
              <div className="max-w-5xl mx-auto">
                <ProblemCard
                  items={capabilities}
                  variant="capability"
                  layout="horizontal"
                />
              </div>
            </div>

            {/* Mission */}
            <div className="text-center py-md">
              <p className="text-body md:text-h6 text-neutral-black/70 leading-relaxed">
                これらすべてを掛け合わせた
              </p>
              <p className="text-h5 md:text-h4 text-brand-primary font-bold my-sm leading-relaxed">
                「今までにない調査体験」
              </p>
              <p className="text-body md:text-h6 text-neutral-black/70 leading-relaxed">
                を提供しよう、と。
              </p>
            </div>

            {/* Conclusion */}
            <div className="text-center pt-md pb-sm">
              <p className="text-body md:text-h6 text-neutral-black/70 leading-relaxed mb-sm">
                それが
              </p>
              <Image
                src={LogoBlack}
                alt="Youth Now! ロゴ"
                width={240}
                height={86}
                className="mx-auto mb-sm"
                loading="lazy"
              />
              <p className="text-body md:text-h6 text-neutral-black/70 leading-relaxed">
                です。
              </p>
            </div>
          </div>
        </div>
        {/* CTA Button */}
        <div className="flex justify-center">
          <ContactButton variant="yellow" size="medium" />
        </div>
      </div>
    </section>
  );
}
