import { Users, Lightbulb, BarChart3 } from "lucide-react";
import { SectionHeader } from "../ui/section-header";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, neutral-black, brand-primary, brand-secondary など
// - スペーシング: section-spacing, px-lg, gap-xl など
// - タイポグラフィ: text-h5, text-body, text-body-sm など

export function WhySection() {
  const reasons = [
    {
      icon: Users,
      badge: "理由 1",
      title: "インフルエンサーを含む若年層コミュニティを独自にネットワーク",
      description:
        "広告代理店業を行ってきた弊社だからこそのネットワークで、多様なインフルエンサーをアサインできます。",
      stats: [
        { value: "523名", label: "登録インフルエンサー" },
        { value: "1,247万", label: "フォロワー総数" },
        { value: "24h", label: "平均レスポンス" },
        { value: "2.5年", label: "平均契約期間" },
      ],
      note: "→ 一般調査会社が「募集」から始めるところを、私たちは「即座に依頼」できます",
    },
    {
      icon: Lightbulb,
      badge: "理由 2",
      title: "広告代理店・D2Cブランド運営で培った実践知見",
      description:
        "自社D2Cブランドで若年層マーケを200回以上実践。調査データを「机上の空論」で終わらせません。",
      features: [
        "「どう見せれば刺さるか」の肌感覚とデータ",
        "失敗も成功も含めた、リアルなノウハウ蓄積",
        "実行可能な施策提案までサポート",
      ],
    },
    {
      icon: BarChart3,
      badge: "理由 3",
      title:
        "アンケート＋座談会＋インタビュー＋ギフティングなど多面的に調査を実施",
      description:
        "定量×定性のハイブリッド設計で、「なぜ?」と「どれくらい?」の両方に答えます。",
      features: [
        "アンケート(定量)だけでは見えない本音",
        "インタビュー(定性)だけでは見えない全体像",
        "両方を組み合わせた、立体的なインサイト提供",
      ],
    },
  ];

  return (
    <section
      id="evidence"
      className="bg-neutral-white section-spacing px-lg md:px-xl relative overflow-hidden"
    >
      {/* Background blur effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute -top-32 -left-96 w-[831px] h-[739px] bg-brand-primary rounded-full blur-3xl" />
        <div className="absolute top-[500px] -left-16 w-[936px] h-[791px] bg-brand-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-3xl md:mb-4xl lg:mb-5xl">
          <SectionHeader
            title="なぜYouth Now!が<br />実現できるのか？"
            leadingTight
            responsive
            className="mb-0"
          />
        </div>

        {/* Reasons */}
        <div className="space-y-2xl md:space-y-3xl">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-neutral-white border border-neutral-black/10 rounded-[48px] shadow-lg p-2xl"
            >
              {/* Header */}
              <div className="flex items-start gap-lg mb-xl">
                <div className="bg-brand-secondary  rounded-2xl p-lg shadow-lg flex-shrink-0">
                  <reason.icon className="w-8 h-8 text-brand-primary" />
                </div>
                <div className="flex-1 pt-2">
                  <div className="bg-brand-primary  text-neutral-white px-lg py-xs rounded-full text-body-sm font-bold inline-block mb-md shadow-sm">
                    {reason.badge}
                  </div>
                  <h3 className="text-h5 leading-snug text-neutral-black">
                    {reason.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-body text-neutral-black/70 mb-xl leading-relaxed">
                {reason.description}
              </p>

              {/* Stats or Features */}
              {reason.stats ? (
                <>
                  <div className="border border-brand-primary/10 rounded-2xl p-xl mb-lg">
                    <div className="grid grid-cols-2 gap-lg">
                      {reason.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="text-center">
                          <div className="text-h4 font-bold text-brand-primary mb-xs">
                            {stat.value}
                          </div>
                          <div className="text-body-sm text-neutral-black/70">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-brand-secondary/10  border border-brand-secondary/20 rounded-2xl p-lg">
                    <p className="text-body-sm text-neutral-black/80 leading-relaxed">
                      {reason.note}
                    </p>
                  </div>
                </>
              ) : (
                <div className="border border-neutral-black/10 rounded-2xl p-xl space-y-md">
                  {reason.features?.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex gap-md items-start">
                      <div
                        className="bg-brand-primary
                     text-neutral-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-body-sm shadow-sm"
                      >
                        ✓
                      </div>
                      <p className="text-body text-neutral-black/80 pt-0.5">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
