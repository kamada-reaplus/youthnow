import { DiagonalBackground } from "../ui/DiagonalBackground";
import { SectionHeader } from "../ui/section-header";
import { SectionTitle } from "../ui/SectionTitle";
import { ContactButton } from "../ui/ContactButton";
import StrengthCard from "../ui/StrengthCard";

export function SolutionSection() {
  const strengths = [
    {
      badge: "STRENGTH01",
      title: "SNS時代の即時性", // コンパクト化
      subtitle:
        "独自のインフルエンサーネットワークで、調査結果を最短24時間でご報告", // サブタイトルでメリットを補足
      description:
        "一般調査会社が「募集」から始める作業を、私たちは「即座に依頼」できる独自のコミュニティを保有。SNSのトレンドに合わせたスピーディな調査・フィードバックを実現します。",
      iconName: "zap",
      stats: [
        { value: "523名", label: "登録インフルエンサー" },
        { value: "1,247万", label: "フォロワー総数" },
        { value: "24h", label: "平均レスポンス" },
        { value: "2.5年", label: "平均契約期間" },
      ],
      note: "→ 若年層に特化したリサーチ手法と効率的なデータ収集システムにより、従来の調査期間を大幅短縮",
    },
    {
      badge: "STRENGTH02",
      title: "ワントップ支援", // コンパクト化
      subtitle: "調査から実行まで一気通貫。D2C運営で培った実践知見を施策に直結", // サブタイトルで一気通貫と実践知見を補足
      description:
        "自社D2Cブランドで若年層マーケを200回以上実践。調査データを「机上の空論」で終わらせません。",
      iconName: "lightbulb",
      features: [
        "「なぜ刺さるか」の肌感覚とデータに基づく確度の高い示唆",
        "失敗も成功も含めた、リアルなノウハウ蓄積",
        "調査に留まらず、実行可能な施策提案まで一気通貫サポート",
      ],
    },
    {
      badge: "STRENGTH03",
      title: "立体的なインサイト", // コンパクト化
      subtitle:
        "定量×定性のハイブリッド調査で、「なぜ？」と「どれくらい？」の両方に回答", // サブタイトルで多角的なアプローチを補足
      description:
        "定量×定性のハイブリッド設計で、「なぜ?」と「どれくらい?」の両方に答えます。",
      iconName: "barChart3",
      features: [
        "アンケート（定量）だけでは見えない、若年層の「生の声・本音」",
        "インタビュー（定性）だけでは見えない、市場全体の「傾向・全体像」",
        "多様な手法を組み合わせた、漏れのない立体的なインサイト提供",
      ],
    },
  ];

  return (
    <section
      id="solution"
      className="bg-brand-primary section-spacing px-xl md:px-lg relative overflow-x-hidden -mb-px"
    >
      {/* 斜めの白背景（特徴カードの途中から） */}
      <DiagonalBackground bgColor="bg-neutral-light-cyan" position="lower" />
      <SectionTitle title="SOLUTION" titleColor="text-neutral-white" />

      {/* Background blur effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.04] pointer-events-none">
        <div className="absolute -top-20 -left-12 w-[700px] h-[580px] bg-brand-primary rounded-full blur-[120px]" />
        <div className="absolute top-[500px] -right-40 w-[766px] h-[655px] bg-brand-secondary rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 px-xl lg:px-2xl">
        {/* Section Header */}
        <div className="mb-2xl lg:mb-3xl">
          <SectionHeader
            title="Youth Now!が解決する"
            subtitle="3つの決定的な違い"
            textColor="text-neutral-white"
            highlightWord="解決"
            highlightColor="text-brand-secondary"
            highlightSize="text-5xl md:text-6xl lg:text-7xl"
            subtitleHighlightWord="3"
            leadingTight
            responsive
            className="mb-0"
          />
        </div>

        {/* Strengths - Full Width Cards */}
        <div className="space-y-3xl lg:space-y-4xl">
          {strengths.map((strength, index) => (
            <StrengthCard
              key={index}
              index={index}
              title={strength.title}
              subtitle={strength.subtitle}
              description={strength.description}
              iconName={strength.iconName}
              stats={strength.stats}
              features={strength.features}
              note={strength.note}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-3xl lg:mt-4xl flex justify-center">
          <ContactButton variant="yellow" size="medium" />
        </div>
      </div>
    </section>
  );
}
