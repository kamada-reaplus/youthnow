"use client";

import { useState } from "react";
import { SectionHeader } from "../ui/section-header";
import { SectionTitle } from "../ui/SectionTitle";
import { PricingCard } from "../ui/PricingCard";
import { DiagonalBackground } from "../ui/DiagonalBackground";
import { ContactButton } from "../ui/ContactButton";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, neutral-black, brand-primary, brand-secondary など
// - スペーシング: section-spacing, px-lg, gap-xl など
// - タイポグラフィ: text-h4, text-body, text-body-sm など

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<
    "light" | "standard" | "custom"
  >("standard");
  const plans = {
    light: {
      name: "ライト",
      price: "¥250,000",
      description: "初回調査に最適なベーシックプラン",
      features: [
        "定量調査（アンケート）[500人 10問]",
        "トレンド調査資料（レポート）",
      ],
      report: "簡易レポート（10〜15P）",
      timeline: "調査開始から2〜4週間",
    },
    standard: {
      name: "スタンダード",
      price: "¥500,000",
      description: "本格的なマーケティング戦略立案に",
      badge: "おすすめ",
      features: [
        "定量調査（アンケート）[500人 10問]",
        "トレンド調査資料（レポート）",
        "座談会（グループインタビュー）[4名]",
        "インフルエンサーインタビュー[2名〜]",
      ],
      report: "詳細レポート（30〜50P）",
      timeline: "1ヶ月〜1ヶ月半",
    },
    custom: {
      name: "カスタム",
      price: "¥500,000〜",
      description: "完全オーダーメイドの調査プラン",
      features: ["定量調査（アンケート）[1,000人 10問]", "ギフティング調査"],
      report: "カスタム仕様",
      timeline: "内容に応じて別途調整",
    },
  };

  const currentPlan = plans[selectedPlan];

  return (
    <section
      id="pricing"
      className="section-spacing md:py-12 bg-neutral-light-cyan relative overflow-hidden -mb-px"
    >
      {" "}
      {/* 斜めの白背景（特徴カードの途中から） */}
      <DiagonalBackground bgColor="bg-brand-primary" />
      <SectionTitle title="PRICING" />
      <div className="container mx-auto px-lg relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="料金プラン"
            responsive
            className="mb-4xl md:mb-4xl"
          />

          {/* SP: プラン選択ボタン */}
          <div className="flex justify-center mb-8 md:hidden">
            <div className="inline-flex bg-neutral-light  rounded-full p-1 shadow-sm">
              <button
                onClick={() => setSelectedPlan("light")}
                className={`px-6 py-2 text-sm rounded-full transition-all ${
                  selectedPlan === "light"
                    ? "bg-neutral-white  text-brand-primary shadow-md"
                    : "text-neutral-medium hover:text-neutral-dark"
                }`}
              >
                ライト
              </button>
              <button
                onClick={() => setSelectedPlan("standard")}
                className={`px-6 py-2 text-sm rounded-full transition-all relative ${
                  selectedPlan === "standard"
                    ? "bg-brand-primary text-neutral-white shadow-md"
                    : "text-neutral-medium hover:text-neutral-dark"
                }`}
              >
                スタンダード
              </button>
              <button
                onClick={() => setSelectedPlan("custom")}
                className={`px-6 py-2 text-sm rounded-full transition-all ${
                  selectedPlan === "custom"
                    ? "bg-neutral-white  text-brand-primary shadow-md"
                    : "text-neutral-medium hover:text-neutral-dark"
                }`}
              >
                カスタム
              </button>
            </div>
          </div>

          {/* SP: 選択されたプラン詳細 */}
          <div className="md:hidden mb-8">
            <PricingCard
              name={currentPlan.name}
              price={currentPlan.price}
              description={currentPlan.description}
              features={currentPlan.features}
              report={currentPlan.report}
              timeline={currentPlan.timeline}
              badge={"badge" in currentPlan ? currentPlan.badge : undefined}
              variant={selectedPlan === "standard" ? "standard" : "default"}
              className="rounded-[3rem] shadow-2xl"
            />
          </div>

          {/* PC: 3カラム表示 */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6">
            <PricingCard
              name={plans.light.name}
              price={plans.light.price}
              description={plans.light.description}
              features={plans.light.features}
              report={plans.light.report}
              timeline={plans.light.timeline}
            />

            <PricingCard
              name={plans.standard.name}
              price={plans.standard.price}
              description={plans.standard.description}
              features={plans.standard.features}
              report={plans.standard.report}
              timeline={plans.standard.timeline}
              badge={plans.standard.badge}
              variant="standard"
            />

            <PricingCard
              name={plans.custom.name}
              price={plans.custom.price}
              description={plans.custom.description}
              features={plans.custom.features}
              report={plans.custom.report}
              timeline={plans.custom.timeline}
            />
          </div>

          {/* CTA追加 */}
          <div className="mt-12 lg:mt-16 text-center">
            <ContactButton
              variant="yellow"
              label="今すぐ無料相談（所要時間30秒）"
              text="料金プランを相談する"
            />
            <p className="mt-4 text-sm text-neutral-dark">
              ※ 強引な営業は一切いたしません。まずはお気軽にご相談ください。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
