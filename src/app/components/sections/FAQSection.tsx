"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "../ui/section-header";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, brand-primary, neutral-black など
// - スペーシング: section-spacing, px-lg, gap-md など
// - タイポグラフィ: text-h6, text-body, text-body-sm など

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Q1: 実績はありますか?",
      answer:
        "はい、これまで100社以上の企業様にご利用いただいております。食品、アパレル、美容、エンタメなど、様々な業界での調査実績がございます。",
    },
    {
      question: "Q2: 調査の信頼性は担保されますか?",
      answer:
        "登録インフルエンサー523名、フォロワー総数1,247万人という独自ネットワークにより、信頼性の高いデータを収集しています。また、定量・定性の両面からアプローチすることで、多角的な分析を行っています。",
    },
    {
      question: "Q3: どんな業界・商材に対応できますか?",
      answer:
        "若年層をターゲットとする商材であれば、業界を問わず対応可能です。食品、ファッション、美容、IT、エンタメ、金融など、幅広い業界での実績がございます。",
    },
    {
      question: "Q4: 地方企業でも利用できますか?",
      answer:
        "はい、全国どこからでもご利用いただけます。オンラインでのヒアリングや報告会も可能ですので、お気軽にご相談ください。",
    },
    {
      question: "Q5: 料金以外に追加費用は発生しますか?",
      answer:
        "基本的には発生いたしません。ただし、調査範囲の大幅な変更や追加調査が必要な場合は、事前にご相談の上、お見積もりをご提示いたします。",
    },
    {
      question: "Q6: 契約前に相談できますか?",
      answer:
        "はい、まずは無料相談をご利用ください。貴社の課題をお伺いし、最適なプランをご提案いたします。お気軽にお問い合わせください。",
    },
  ];

  return (
    <section
      id="faq"
      className="bg-neutral-white section-spacing px-lg relative overflow-hidden"
    >
      {/* Background blur effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-4xl -left-2xl w-[641px] h-[530px] bg-brand-primary rounded-full blur-3xl" />
        <div className="absolute top-[90px] -left-52 w-[709px] h-[629px] bg-brand-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-md relative z-10">
        <div className="mb-3xl">
          <SectionHeader
            title="よくあるご質問"
            responsive
            className="mb-md md:mb-lg px-lg"
          />
        </div>

        {/* FAQ Items */}
        <div className="space-y-md mb-3xl">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-neutral-white rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-xl py-xl flex items-center justify-between text-left hover:bg-neutral-white/50 transition-colors"
              >
                <h3 className="text-h6 text-neutral-black pr-lg">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-black/60 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-xl pb-xl">
                  <p className="text-body text-neutral-black/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="space-y-md">
          <button className="w-full bg-brand-primary text-neutral-white py-lg px-xl rounded-full font-bold text-body-sm shadow-lg hover:opacity-90 transition-opacity">
            不安を解消する。無料資料を確認
          </button>
          <p className="text-center text-body-sm text-neutral-black/60">
            ※FAQ詳細版・β版事例集も同梱
          </p>
        </div>
      </div>
    </section>
  );
}
