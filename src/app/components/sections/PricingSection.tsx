"use client";

import { useState } from "react";
import { SectionHeader } from "../ui/section-header";
import { SectionTitle } from "../ui/SectionTitle";
import { PricingCard } from "../ui/PricingCard";
import { DiagonalBackground } from "../ui/DiagonalBackground";

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
      usage: "社内共有用",
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
      usage: "商品開発・広告施策に直結",
    },
    custom: {
      name: "カスタム",
      price: "¥500,000〜",
      description: "完全オーダーメイドの調査プラン",
      features: ["定量調査（アンケート）[1,000人 10問]", "ギフティング調査"],
      report: "カスタム仕様",
      timeline: "内容に応じて別途調整",
      usage: "調査からマーケ行為まで一気通貫",
    },
  };

  const currentPlan = plans[selectedPlan];

  return (
    <section
      id="pricing"
      className="section-spacing bg-neutral-light-cyan relative overflow-hidden -mb-px"
    >
      {" "}
      {/* 斜めの白背景（特徴カードの途中から） */}
      <DiagonalBackground bgColor="bg-brand-primary" position="lower" />
      <SectionTitle title="PRICING" />
      {/* 楕円形装飾 */}
      <div className="absolute top-5xl left-10 w-[600px] h-[400px] bg-brand-primary rounded-full opacity-5 blur-3xl transform rotate-[-20deg]"></div>
      <div className="absolute bottom-5xl right-10 w-[650px] h-[420px] bg-brand-secondary rounded-full opacity-5 blur-3xl transform rotate-[-28deg]"></div>
      <div className="container mx-auto px-lg relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="料金プラン" responsive className="mb-4xl" />

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
              usage={currentPlan.usage}
              badge={"badge" in currentPlan ? currentPlan.badge : undefined}
              variant={selectedPlan === "standard" ? "standard" : "default"}
              className="rounded-[3rem] shadow-2xl"
            />
          </div>

          {/* PC: 3カラム表示 */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            <PricingCard
              name={plans.light.name}
              price={plans.light.price}
              description={plans.light.description}
              features={plans.light.features}
              report={plans.light.report}
              timeline={plans.light.timeline}
              usage={plans.light.usage}
            />

            <PricingCard
              name={plans.standard.name}
              price={plans.standard.price}
              description={plans.standard.description}
              features={plans.standard.features}
              report={plans.standard.report}
              timeline={plans.standard.timeline}
              usage={plans.standard.usage}
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
              usage={plans.custom.usage}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="mt-12 text-sm text-neutral-medium space-y-2">
          <p>
            ※1
            キャスティング（タレント/インフルエンサー）やスタジオ利用が必要な場合は、別途費用が発生いたします。
          </p>
          <p>
            ※2
            東京23区外での座談会やインタビュー実施の場合、交通費を別途請求させていただきます。
          </p>
          <p>
            ※3
            ロケ地や選定方（往復3時間以上）の場合、拘束費として５万円/人を別途ご請求させていただきます。
          </p>
          <p>
            ※4
            レポート修正は原則2回まででお受けさせていただきます。追加修正や再調査が必要な場合は、別途費用を頂戴いたします。
          </p>
          <p>
            ※5
            座談会・インタビューの録画データ提供はオプションとなります。編集が必要な場合は編集費を別途ご請求させていただきます。
          </p>
          <p>
            ※6
            ギフティング調査における商品提供/発送は、原則としてクライアント様にご準備いただきます。弊社にて手配する場合は、実費＋手数料をご請求させていただきます。
          </p>
          <p>
            ※7
            インフルエンサーインタビューに関しては、対象者によって謝礼金が異なります。事前にお見積りを提示いたします。
          </p>
          <p>
            ※8
            納品データはPDFレポートを基本とし、PowerPoint形式やExcel形式をご希望の場合は追加料金をいただく場合がございます。
          </p>
        </div>
      </div>
    </section>
  );
}
