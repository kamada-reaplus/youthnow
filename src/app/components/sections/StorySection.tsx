import Image from "next/image";
import { DiagonalBackground } from "../ui/DiagonalBackground";
import { ProblemCard } from "../ui/ProblemCard";
import { SectionHeader } from "../ui/section-header";
import { SectionTitle } from "../ui/SectionTitle";
import Story from "../../assets/story.png";
import LogoBlack from "../../assets/logo-black.png";

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
      id="problem"
      className="bg-brand-primary section-spacing px-lg relative overflow-hidden -mb-px"
    >
      {/* 斜めの白背景（特徴カードの途中から） */}
      <DiagonalBackground bgColor="bg-neutral-light-cyan" position="lower" />
      <SectionTitle title="REASON" titleColor="text-neutral-white" />
      {/* Background blur effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute -top-6xl -left-40 w-[583px] h-[509px] bg-brand-primary  rounded-full blur-3xl" />
        <div className="absolute top-[450px] -left-10 w-[633px] h-[522px] bg-brand-secondary  rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="mb-3xl">
          <SectionHeader
            title="なぜYouth Now!を"
            subtitle="作ったのか?"
            textColor="text-neutral-white"
            highlightColor="text-brand-secondary"
            highlightSize="text-5xl md:text-6xl lg:text-7xl"
            subtitleHighlightWord="作った"
            leadingTight
            responsive
            className="mb-0"
          />
        </div>
        {/* Story Content */}
        <div className="bg-neutral-white rounded-[48px] shadow-lg p-2xl">
          <div className="space-y-2xl">
            {/* Introduction */}
            <p className="text-h6 text-neutral-black/70 leading-relaxed text-center">
              Reaplusは
              <br />
              広告代理店事業、インフルエンサー事務所、D2Cブランドを運営する中で、
              <br />
              何度も同じ悩みを聞いてきました。
            </p>

            {/* Pain Point */}
            <div className="relative py-xl">
              <div className="flex flex-col items-center gap-lg">
                {/* イラスト画像 */}
                <div className="w-full max-w-xs mx-auto relative aspect-square">
                  <Image
                    src={Story}
                    alt="Z世代向け商品を作りたいが、何が刺さるかわからない"
                    fill
                    className="object-contain"
                  />
                </div>
                {/* メインメッセージ */}
                <div className="text-center">
                  <p className="text-h5 text-brand-primary leading-relaxed font-bold">
                    「Z世代向け商品を作りたいが、
                    <br />
                    何が刺さるか分からない」
                  </p>
                </div>
              </div>
            </div>

            {/* Problem */}
            <div className="space-y-lg">
              <p className="text-h5 text-neutral-black font-bold text-center">
                既存の会社では・・・
              </p>
              <div className="max-w-md mx-auto">
                <ProblemCard items={problems} variant="problem" />
              </div>
            </div>

            <div className="mb-3xl">
              <SectionHeader
                title="だからこそ私たちは"
                subtitle="決意しました"
                textColor="text-neutral-black"
                highlightColor="text-brand-secondary"
                highlightSize="text-5xl md:text-5xl lg:text-6xl"
                subtitleHighlightWord="決意"
                leadingTight
                responsive
                className="mb-0"
              />
            </div>

            {/* Capabilities */}
            <div className="bg-gradient-to-br from-brand-primary/10 via-brand-secondary/10 to-brand-primary/10 rounded-3xl p-2xl">
              <div className="max-w-md mx-auto">
                <ProblemCard items={capabilities} variant="capability" />
              </div>
            </div>

            {/* Mission */}
            <div className="text-center py-lg">
              <p className="text-h6 text-neutral-black/70 leading-relaxed">
                これらすべてを掛け合わせた
              </p>
              <p className="text-h4 text-brand-primary font-bold my-md leading-relaxed">
                「今までにない調査体験」
              </p>
              <p className="text-h6 text-neutral-black/70 leading-relaxed">
                を提供しよう、と。
              </p>
            </div>

            {/* Conclusion */}
            <div className="text-center pt-xl pb-lg">
              <p className="text-h6 text-neutral-black/70 leading-relaxed mb-md">
                それが
              </p>
              <Image
                src={LogoBlack}
                alt="Youth Now! ロゴ"
                width={280}
                height={100}
                className="mx-auto mb-md"
              />
              <p className="text-h6 text-neutral-black/70 leading-relaxed">
                です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
