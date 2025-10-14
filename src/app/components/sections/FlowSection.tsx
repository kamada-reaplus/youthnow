import {
  Mail,
  MessageCircle,
  Lightbulb,
  FileText,
  Users,
  BarChart3,
} from "lucide-react";
import { SectionHeader } from "../ui/section-header";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, neutral-black, brand-primary, brand-secondary など
// - スペーシング: section-spacing, px-lg, gap-xl など
// - タイポグラフィ: text-h6, text-body, text-body-sm など

export function FlowSection() {
  const steps = [
    {
      number: "01",
      title: "問い合わせ・資料請求",
      icon: Mail,
      description:
        "まずはフォームまたはメールよりご連絡ください。サービスの概要資料や料金表、過去の調査事例のサンプルをお送りします。",
    },
    {
      number: "02",
      title: "ヒアリング",
      icon: MessageCircle,
      description:
        "担当者が貴社の課題や調査目的を詳しく伺います。ターゲット層、知りたいテーマ、活用シーンなどを共有いただくことで、最適な調査設計が可能になります。",
    },
    {
      number: "03",
      title: "調査設計",
      icon: Lightbulb,
      description:
        "ヒアリング内容を基に、調査対象（年齢/性別/地域など）、手法（定量/座談会/インタビュー）、スケジュールを設計。御見積りとともにご提案いたします。",
    },
    {
      number: "04",
      title: "契約",
      icon: FileText,
      description: "ご提案後問題なければ正式に契約書の記入をお願いしています。",
    },
    {
      number: "05",
      title: "調査実施",
      icon: Users,
      description:
        "調査を実際に実施。アンケート配信、座談会の開催、インフルエンサーインタビュー、ギフティングなどをスピーディに進めます。調査規模や手法により所要期間は変動します。",
    },
    {
      number: "06",
      title: "分析・レポート",
      icon: BarChart3,
      description:
        "調査結果を整理し、PDFまたはCanva形式でレポート納品。データの提示にとどまらず、広告施策・商品開発にどう活かすかまで提案します。",
    },
  ];

  return (
    <section
      id="flow"
      className="bg-neutral-white section-spacing px-lg relative overflow-hidden"
    >
      {/* Background blur effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.06] pointer-events-none">
        <div className="absolute -top-28 -left-32 w-[719px] h-[646px] bg-brand-primary rounded-full blur-[120px]" />
        <div className="absolute top-[280px] -right-48 w-[766px] h-[655px] bg-brand-secondary rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-3xl">
          <SectionHeader
            title="ご利用の流れ"
            textColor="text-neutral-black"
            responsive
            className="mb-md md:mb-lg px-lg"
          />
          <p className="text-neutral-black/70 max-w-2xl mx-auto px-lg">
            簡単6ステップで高品質な調査を実現
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-lg md:space-y-xl mb-3xl md:mb-4xl">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index}>
                <div className="bg-neutral-white border border-neutral-black/20 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 p-xl md:p-2xl lg:p-3xl relative overflow-hidden group hover:border-brand-primary/40">
                  {/* Subtle gradient bar on the left */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary opacity-60 group-hover:opacity-100 transition-opacity" />

                  {/* Content container */}
                  <div className="relative z-10 pl-lg md:pl-xl">
                    {/* Mobile Layout */}
                    <div className="md:hidden">
                      {/* Number and Title row */}
                      <div className="flex items-start gap-md mb-md">
                        {/* Step Number */}
                        <div className="relative flex-shrink-0">
                          <div className="absolute inset-0 bg-brand-primary/10 rounded-xl blur-sm" />
                          <div className="relative bg-brand-primary  text-neutral-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-body-sm">{step.number}</span>
                          </div>
                        </div>

                        {/* Icon */}
                        <div className="flex-shrink-0 pt-1">
                          <IconComponent className="w-7 h-7 text-brand-primary" />
                        </div>

                        {/* Title */}
                        <div className="flex-1 min-w-0 pt-1">
                          <h3 className="text-body text-neutral-black break-words leading-snug">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-body-sm text-neutral-black/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-start gap-xl lg:gap-2xl">
                      {/* Step Number */}
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-brand-primary/10 rounded-2xl blur-md" />
                        <div className="relative bg-brand-primary  text-neutral-white min-w-[4rem] h-4xl rounded-2xl flex items-center justify-center shadow-lg px-lg">
                          <span className="text-h5">{step.number}</span>
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="flex-shrink-0 pt-md">
                        <IconComponent className="w-9 lg:w-10 h-9 lg:h-10 text-brand-primary" />
                      </div>

                      {/* Title and Description */}
                      <div className="flex-1 pt-1.5">
                        <h3 className="text-h5 lg:text-h4 text-neutral-black mb-sm lg:mb-md">
                          {step.title}
                        </h3>
                        <p className="text-body-sm lg:text-body text-neutral-black/70 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-md md:py-lg">
                    <div className="w-px h-2xl md:h-10 bg-brand-primary " />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Message */}
        <div className="relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-brand-primary/5  rounded-2xl md:rounded-3xl" />

          <div className="relative bg-neutral-white border border-neutral-black/20 rounded-2xl md:rounded-3xl p-xl md:p-2xl lg:p-3xl shadow-sm text-center">
            {/* Top accent bar */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6xl h-1 bg-brand-primary rounded-full" />

            {/* Text content */}
            <p className="text-body md:text-h6 text-neutral-black leading-relaxed mb-sm">
              不明な点がございましたら、いつでもお気軽にお問い合わせください。
            </p>
            <p className="text-body-sm md:text-body text-neutral-black/70">
              専門スタッフが丁寧にサポートいたします
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
