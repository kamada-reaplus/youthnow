import CharacterPlaceholder from "../ui/speech-bubble";
import { SectionHeader } from "../ui/section-header";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, neutral-black, brand-primary, brand-secondary など
// - スペーシング: section-spacing, px-lg, gap-xl など
// - タイポグラフィ: text-body, text-body-sm, text-h6 など

export function ProblemSection() {
  const problems = [
    "Z世代に刺さる企画が思いつかない...",
    "調査するにも時間とコストがかかりすぎる...",
    "社内で若者知見が不足しており、若年層のニーズがわからない...",
  ];

  const targetAudiences = [
    "マーケティング部",
    "商品開発",
    "企画・研究",
    "事業企画",
    "経営企画",
  ];

  return (
    <section
      id="problem"
      className="bg-neutral-white  section-spacing px-lg relative overflow-hidden"
    >
      {/* Background blur effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.04] pointer-events-none">
        <div className="absolute -top-20 -left-12 w-[700px] h-[580px] bg-brand-primary rounded-full blur-[120px]" />
        <div className="absolute top-[500px] -right-40 w-[766px] h-[655px] bg-brand-secondary rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-2xl md:mb-3xl">
          <SectionHeader
            title="若年層マーケティングで<br />こんな課題を感じていませんか?"
            textColor="text-neutral-black"
            leadingTight
            responsive
            className="mb-0 px-lg"
          />
        </div>

        {/* Main Content Card */}
        <div className="bg-neutral-white border border-neutral-black/20 rounded-3xl md:rounded-[2.5rem] px-3xl py-2xl md:px-3xl md:py-3xl lg:px-14 lg:py-4xl shadow-sm mb-xl md:mb-2xl">
          {/* Target Audiences */}
          <div className="mb-3xl md:mb-14 lg:mb-4xl">
            <div className="max-w-xl md:max-w-2xl mx-auto space-y-md md:space-y-lg">
              {/* Mobile: 2x3 grid, Desktop: 2+3 layout */}
              <div className="grid grid-cols-2 md:flex md:justify-center gap-2.5 md:gap-md lg:gap-lg">
                {targetAudiences.slice(0, 2).map((audience, index) => (
                  <div
                    key={index}
                    className="bg-neutral-white border border-neutral-black/30 rounded-full px-lg md:px-xl lg:px-7 py-sm md:py-2.5 lg:py-md text-body-sm md:text-body lg:text-h6 text-neutral-black/70 shadow-sm text-center"
                  >
                    {audience}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2.5 md:gap-md lg:gap-lg">
                {targetAudiences.slice(2).map((audience, index) => (
                  <div
                    key={index + 2}
                    className="bg-neutral-white border border-neutral-black/30 rounded-full px-lg md:px-xl lg:px-7 py-sm md:py-2.5 lg:py-md text-body-sm md:text-body lg:text-h6 text-neutral-black/70 shadow-sm text-center"
                  >
                    {audience}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Problems with character illustration */}
          <div className="md:max-w-3xl md:mx-auto">
            {/* Problems */}
            <div className="space-y-xl md:space-y-xl lg:space-y-7 mb-3xl md:mb-3xl lg:mb-3xl">
              {problems.map((problem, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`relative ${
                      isLeft
                        ? "-ml-6 mr-auto md:ml-0 md:mr-auto"
                        : "-mr-6 ml-auto md:mr-0 md:ml-auto"
                    }`}
                    style={{ maxWidth: "260px" }}
                  >
                    {/* Speech bubble */}
                    <div className="bg-neutral-white border border-neutral-black/30 rounded-3xl px-xl md:px-7 lg:px-2xl py-lg md:py-xl lg:py-xl shadow-sm relative md:max-w-[320px] lg:max-w-[360px]">
                      <p className="text-body-sm md:text-body lg:text-h6 text-neutral-black/70 leading-relaxed">
                        {problem}
                      </p>
                      {/* Tail - larger and more prominent */}
                      <div
                        className={`absolute -bottom-2.5 md:-bottom-3 ${
                          isLeft
                            ? "left-8 md:left-12 lg:left-14"
                            : "right-8 md:right-12 lg:right-14"
                        }`}
                      >
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-neutral-white border-b border-r border-neutral-black/30 rotate-45" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Character illustration */}
            <div className="flex justify-center mb-2xl md:mb-2xl lg:mb-3xl">
              <div className="w-52 md:w-64 lg:w-80">
                <CharacterPlaceholder />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
