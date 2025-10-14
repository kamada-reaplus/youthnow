"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { SectionHeader } from "../ui/section-header";

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
      className="section-spacing bg-neutral-white relative overflow-hidden"
    >
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
                {selectedPlan === "standard" && (
                  <span className="absolute -top-4 -right-4 bg-brand-secondary  text-brand-primary text-xs px-2 py-0.5 rounded-full shadow-sm text-[10px]">
                    おすすめ
                  </span>
                )}
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
            <div
              className={`rounded-[3rem] p-8 shadow-2xl border-2 transition-all ${
                selectedPlan === "standard"
                  ? "bg-brand-primary text-neutral-white border-brand-primary"
                  : "bg-neutral-lighter text-neutral-dark border-neutral-light"
              }`}
            >
              <div className="text-center mb-8">
                <h3
                  className="text-2xl mb-4"
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  {currentPlan.name}
                </h3>
                <div className="mb-4">
                  <span
                    className={`text-4xl font-bold ${
                      selectedPlan === "standard"
                        ? "text-neutral-white"
                        : "text-brand-primary"
                    }`}
                  >
                    {currentPlan.price}
                  </span>
                  <span
                    className={`ml-2 text-sm ${
                      selectedPlan === "standard"
                        ? "text-neutral-white/80"
                        : "text-neutral-medium"
                    }`}
                  >
                    (税抜)
                  </span>
                </div>
                <p
                  className={`text-base ${
                    selectedPlan === "standard"
                      ? "text-neutral-white/90"
                      : "text-neutral-medium"
                  }`}
                >
                  {currentPlan.description}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4
                    className={`font-bold mb-3 ${
                      selectedPlan === "standard"
                        ? "text-neutral-white"
                        : "text-neutral-dark"
                    }`}
                  >
                    調査内容
                  </h4>
                  <div className="space-y-3">
                    {currentPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                            selectedPlan === "standard"
                              ? "bg-brand-secondary"
                              : "bg-brand-primary"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${
                              selectedPlan === "standard"
                                ? "text-brand-primary"
                                : "text-neutral-white"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-sm ${
                            selectedPlan === "standard"
                              ? "text-neutral-white"
                              : "text-neutral-dark"
                          }`}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p
                    className={`font-bold ${
                      selectedPlan === "standard"
                        ? "text-neutral-white"
                        : "text-neutral-dark"
                    }`}
                  >
                    レポート：{currentPlan.report}
                  </p>
                  <p
                    className={`font-bold ${
                      selectedPlan === "standard"
                        ? "text-neutral-white"
                        : "text-neutral-dark"
                    }`}
                  >
                    納期目安：{currentPlan.timeline}
                  </p>
                  <p
                    className={`font-bold text-center ${
                      selectedPlan === "standard"
                        ? "text-neutral-white"
                        : "text-brand-primary"
                    }`}
                  >
                    {currentPlan.usage}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PC: 3カラム表示 */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {/* Light Plan */}
            <div className="bg-neutral-white border-2 border-neutral-light rounded-3xl p-8 relative">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-brand-primary mb-2">
                  {plans.light.name}
                </h3>
                <div className="text-4xl font-bold text-neutral-dark mb-2">
                  {plans.light.price}
                </div>
                <div className="text-sm text-neutral-medium">(税抜)</div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-neutral-dark mb-3">調査内容</h4>
                  <div className="space-y-2">
                    {plans.light.features.map((feature, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <div className="bg-brand-primary rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-3 h-3 text-neutral-white" />
                        </div>
                        <p className="text-sm text-neutral-dark">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-bold text-neutral-dark">
                    レポート：{plans.light.report}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-neutral-dark">
                    納期目安：{plans.light.timeline}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-brand-primary text-center">
                    {plans.light.usage}
                  </p>
                </div>
              </div>
            </div>

            {/* Standard Plan */}
            <div className="bg-brand-primary border-2 border-brand-primary rounded-3xl p-8 relative scale-105 shadow-xl">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-brand-secondary text-brand-primary text-xs px-4 py-1 rounded-full font-bold">
                  {plans.standard.badge}
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-neutral-white mb-2">
                  {plans.standard.name}
                </h3>
                <div className="text-4xl font-bold text-neutral-white mb-2">
                  {plans.standard.price}
                </div>
                <div className="text-sm text-neutral-white/80">(税抜)</div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-neutral-white mb-3">
                    調査内容
                  </h4>
                  <div className="space-y-2">
                    {plans.standard.features.map((feature, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <div className="bg-brand-secondary rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-3 h-3 text-brand-primary" />
                        </div>
                        <p className="text-sm text-neutral-white">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-bold text-neutral-white">
                    レポート：{plans.standard.report}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-neutral-white">
                    納期目安：{plans.standard.timeline}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-neutral-white text-center">
                    {plans.standard.usage}
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Plan */}
            <div className="bg-neutral-white border-2 border-neutral-light rounded-3xl p-8 relative">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-brand-primary mb-2">
                  {plans.custom.name}
                </h3>
                <div className="text-4xl font-bold text-neutral-dark mb-2">
                  {plans.custom.price}
                </div>
                <div className="text-sm text-neutral-medium">(税抜)</div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-neutral-dark mb-3">調査内容</h4>
                  <div className="space-y-2">
                    {plans.custom.features.map((feature, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <div className="bg-brand-primary rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-3 h-3 text-neutral-white" />
                        </div>
                        <p className="text-sm text-neutral-dark">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-bold text-neutral-dark">
                    レポート：{plans.custom.report}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-neutral-dark">
                    納期目安：{plans.custom.timeline}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-brand-primary text-center">
                    {plans.custom.usage}
                  </p>
                </div>
              </div>
            </div>
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
