import { SectionHeader } from "../ui/section-header";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, neutral-black, brand-primary など
// - スペーシング: section-spacing, px-lg, gap-xl など
// - タイポグラフィ: text-h6, text-body, text-h4 など

export function StorySection() {
  const capabilities = [
    "数千人のインフルエンサーとの直接リレーション",
    "D2Cブランド運営で培った若年層マーケ知見",
    "調査から施策提案までのワンストップ体制",
  ];

  return (
    <section
      id="story"
      className="bg-neutral-white/60 section-spacing px-lg relative overflow-hidden"
    >
      {/* Background blur effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute -top-6xl -left-40 w-[583px] h-[509px] bg-brand-primary  rounded-full blur-3xl" />
        <div className="absolute top-[450px] -left-10 w-[633px] h-[522px] bg-brand-secondary  rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-md relative z-10">
        <div className="mb-3xl">
          <SectionHeader
            title="なぜYouth Now!を<br />作ったのか"
            responsive
            className="mb-md md:mb-lg px-lg"
          />
        </div>

        {/* Story Content */}
        <div className="bg-neutral-white rounded-[48px] shadow-lg p-2xl">
          <div className="space-y-2xl">
            {/* Introduction */}
            <p className="text-h6 text-neutral-black/70 leading-relaxed">
              Reaplusはインフルエンサー事務所とD2Cブランドを運営する中で、何度も同じ悩みを聞いてきました。
            </p>

            {/* Pain Point */}
            <div className="text-center py-lg">
              <p className="text-h4 text-brand-primary leading-relaxed">
                「Z世代向け商品を作りたいが、
                <br />
                何が刺さるか分からない」
              </p>
            </div>

            {/* Problem */}
            <p className="text-h6 text-neutral-black/70 leading-relaxed">
              既存の調査会社では、レポートが届く頃にはトレンドが変わっている。データを読んでも、施策が見えない。
            </p>

            {/* Decision */}
            <p className="text-h6 text-neutral-black/70 leading-relaxed">
              だからこそ、私たちは決意しました。
            </p>

            {/* Capabilities */}
            <div className="border border-brand-primary/20 rounded-3xl p-2xl">
              <div className="space-y-md">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex gap-md items-start">
                    <div className="w-1.5 h-1.5 bg-brand-primary  rounded-full mt-2.5 flex-shrink-0" />
                    <p className="text-h6 text-neutral-black/70 leading-relaxed">
                      {capability}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission */}
            <div>
              <p className="text-h6 text-neutral-black/70 leading-relaxed">
                これらすべてを掛け合わせた
              </p>
              <p className="text-h5 text-brand-primary font-bold my-sm">
                「いままでにない調査体験」を提供しよう
              </p>
              <p className="text-h6 text-neutral-black/70 leading-relaxed">
                、と。
              </p>
            </div>

            {/* Conclusion */}
            <div className="text-center pt-lg">
              <p className="text-h4 text-brand-primary font-bold">
                それがYouth Now!です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
