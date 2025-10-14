import { Clock, Target, TrendingUp } from "lucide-react";
import { SectionHeader } from "../ui/section-header";

// デザインシステム使用コンポーネント
// - カラー: brand-primary, brand-secondary, neutral-white など
// - スペーシング: section-spacing, px-lg, gap-xl など
// - タイポグラフィ: text-h4, text-h5, text-body など

export function SolutionSection() {
  const solutions = [
    {
      icon: Clock,
      badge: "違い 1",
      title: "スピード",
      subtitle: "最短24時間で仮説検証",
      description:
        "インフルエンサーネットワークを活かし、従来1〜2ヶ月かかる調査を最短24時間で完了。トレンドを逃しません。",
      scenes: [
        "商品企画会議の前日に急ぎで若年層の反応を知りたい",
        "SNSでバズった競合の勝因を即座に分析したい",
        "週末のキャンペーン前に仮説を検証したい",
      ],
    },
    {
      icon: Target,
      badge: "違い 2",
      title: "精度",
      subtitle: "トレンドの発信源に直接アクセス",
      description:
        "一般消費者ではなく、Z世代トレンドを作る「インフルエンサー」に直接調査。表面的でない本質的なインサイトが得られます。",
      scenes: [
        "なぜこの商品がTikTokでバズったのか理由を知りたい",
        "次に流行りそうなテイストやデザインの傾向を掴みたい",
        "競合がヒットした理由を深掘りしたい",
      ],
    },
    {
      icon: TrendingUp,
      badge: "違い 3",
      title: "実行性",
      subtitle: "調査だけでなく施策提案まで",
      description:
        "D2Cブランド運営の実践知見を活かし、データ分析で終わらず「具体的に何をすべきか」まで提案。すぐ動けます。",
      scenes: [
        "調査結果を見ても、何から手をつければいいか分からない",
        "上司や経営層を説得できる具体的な施策案が欲しい",
        "実行フェーズまでサポートしてほしい",
      ],
    },
  ];

  return (
    <section
      id="solution"
      className="bg-brand-primary text-neutral-white section-spacing px-lg md:px-xl relative overflow-hidden"
    >
      {/* Background blur effect */}
      <div className="absolute top-[500px] left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute w-[936px] h-[791px] bg-neutral-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-3xl md:mb-4xl lg:mb-5xl">
          <SectionHeader
            title="その悩み<br />Youth Now!が解決します"
            textColor="text-neutral-white"
            leadingTight
            responsive
            className="mb-0"
          />
        </div>

        {/* Solutions */}
        <div className="space-y-3xl md:space-y-4xl lg:space-y-5xl">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-neutral-white/10 backdrop-blur-sm border border-neutral-white/20 rounded-[48px] p-2xl"
            >
              {/* Header */}
              <div className="flex items-start gap-lg mb-xl">
                <div className="bg-brand-secondary  rounded-2xl p-lg shadow-lg flex-shrink-0">
                  <solution.icon className="w-8 h-8 text-brand-primary" />
                </div>
                <div className="flex-1 pt-2">
                  <div className="bg-brand-primary  text-neutral-white px-lg py-xs rounded-full text-body-sm font-bold inline-block mb-md shadow-sm">
                    {solution.badge}
                  </div>
                  <h3 className="text-h4 font-bold mb-sm">{solution.title}</h3>
                  <p className="text-brand-secondary text-h5">
                    {solution.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-neutral-white/5 backdrop-blur-sm border border-neutral-white/10 rounded-2xl p-xl mb-xl">
                <p className="text-h6 text-neutral-white/90 leading-relaxed">
                  {solution.description}
                </p>
              </div>

              {/* Scenes */}
              <div>
                <div className="flex items-center gap-sm mb-lg">
                  <span className="text-h6">💡</span>
                  <h4 className="text-h6 font-bold">こんなシーンで活躍</h4>
                </div>
                <div className="space-y-md">
                  {solution.scenes.map((scene, sceneIndex) => (
                    <div
                      key={sceneIndex}
                      className="bg-neutral-white/5 backdrop-blur-sm border border-neutral-white/10 rounded-2xl p-lg flex gap-md"
                    >
                      <div className="bg-brand-secondary text-brand-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-body-sm font-bold">
                        {sceneIndex + 1}
                      </div>
                      <p className="text-body-sm text-neutral-white/90 leading-relaxed pt-0.5">
                        {scene}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
