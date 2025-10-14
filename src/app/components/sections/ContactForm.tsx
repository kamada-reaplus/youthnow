"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "../ui/section-header";

// デザインシステム使用コンポーネント
// - カラー: brand-primary, brand-secondary, error, neutral-white など
// - スペーシング: section-spacing, px-lg, gap-md など
// - タイポグラフィ: text-body-sm, text-h5, text-caption など

export function ContactForm() {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    interest: "",
    agreement: false,
  });

  const interests = [
    "まずは話を聞きたい",
    "料金・プランの詳細を知りたい",
    "調査スピード・精度を確認したい",
    "その他",
  ];

  return (
    <section
      id="contact"
      className="bg-brand-primary  section-spacing px-lg relative overflow-hidden"
    >
      {/* Background subtle effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute -top-6xl -left-4xl w-[500px] h-[400px] bg-neutral-white/20 rounded-full blur-xl" />
      </div>

      <div className="container mx-auto max-w-md relative z-10">
        <SectionHeader
          title="まずは無料資料で<br />Youth Now!を体験してください"
          textColor="text-neutral-white"
          leadingTight
          className="text-center mb-lg"
        />
        <div className="text-center mb-3xl">
          <div className="inline-flex items-center gap-sm text-body-sm text-neutral-white">
            <Clock className="w-5 h-5 text-brand-secondary" />
            <span className="font-bold">60秒で完了</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-neutral-white/5 backdrop-blur-sm border border-neutral-white/10 rounded-[48px] p-2xl mb-xl">
          <div className="space-y-xl">
            {/* Company Name */}
            <div>
              <label className="block text-body-sm font-bold text-neutral-white mb-sm">
                会社名 <span className="text-error">*</span>
              </label>
              <input
                type="text"
                placeholder="株式会社〇〇"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full bg-neutral-white/10 border border-neutral-white/20 rounded-lg px-lg py-md text-neutral-white placeholder:text-neutral-white/40 focus:outline-none focus:border-neutral-white/40"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-body-sm font-bold text-neutral-white mb-sm">
                お名前 <span className="text-error">*</span>
              </label>
              <input
                type="text"
                placeholder="山田 太郎"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-neutral-white/10 border border-neutral-white/20 rounded-lg px-lg py-md text-neutral-white placeholder:text-neutral-white/40 focus:outline-none focus:border-neutral-white/40"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-body-sm font-bold text-neutral-white mb-sm">
                メールアドレス <span className="text-error">*</span>
              </label>
              <input
                type="email"
                placeholder="example@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-neutral-white/10 border border-neutral-white/20 rounded-lg px-lg py-md text-neutral-white placeholder:text-neutral-white/40 focus:outline-none focus:border-neutral-white/40"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-body-sm font-bold text-neutral-white mb-sm">
                電話番号
              </label>
              <input
                type="tel"
                placeholder="03-1234-5678"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-neutral-white/10 border border-neutral-white/20 rounded-lg px-lg py-md text-neutral-white placeholder:text-neutral-white/40 focus:outline-none focus:border-neutral-white/40"
              />
            </div>

            {/* Interest */}
            <div>
              <label className="block text-body-sm font-bold text-neutral-white mb-md">
                最も知りたいこと <span className="text-error">*</span>
              </label>
              <div className="space-y-md">
                {interests.map((interest, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-md bg-neutral-white/5 rounded-lg px-lg py-md cursor-pointer hover:bg-neutral-white/10 transition-colors"
                  >
                    <input
                      type="radio"
                      name="interest"
                      value={interest}
                      checked={formData.interest === interest}
                      onChange={(e) =>
                        setFormData({ ...formData, interest: e.target.value })
                      }
                      className="w-4 h-4 text-brand-secondary bg-transparent border-neutral-white/40 focus:ring-0"
                    />
                    <span className="text-body-sm text-neutral-white">
                      {interest}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Agreement */}
            <div>
              <label className="flex items-start gap-md bg-neutral-white/5 rounded-lg px-lg py-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreement}
                  onChange={(e) =>
                    setFormData({ ...formData, agreement: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 text-brand-secondary bg-transparent border-neutral-white/40 rounded focus:ring-0"
                />
                <span className="text-body-sm text-neutral-white/80">
                  <a href="#privacy" className="text-brand-primary underline">
                    個人情報の取り扱い
                  </a>
                  に同意する <span className="text-error">*</span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-brand-secondary  text-brand-primary py-lg px-xl rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-sm">
              今すぐ無料で資料をダウンロード
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Bonus */}
            <div className="text-center">
              <p className="text-body-sm text-brand-secondary mb-xs">
                今なら5万円相当のトレンドレポートも同時プレゼント
              </p>
              <p className="text-caption text-neutral-white/60">
                ※資料DL後24時間以内限定
              </p>
            </div>
          </div>
        </div>

        {/* Resource Info */}
        <div className="bg-neutral-white/5 backdrop-blur-sm rounded-3xl p-2xl">
          <h3 className="text-h6 text-neutral-white font-bold mb-lg">
            資料に含まれる内容
          </h3>
          <ul className="space-y-sm text-body-sm text-neutral-white/80">
            <li>• サービス詳細(全20ページ)</li>
            <li>• 料金プラン・見積もり例</li>
            <li>• 調査プロセス・スケジュール</li>
            <li>• FAQ詳細版</li>
            <li>• β版テスト事例集</li>
            <li className="text-brand-secondary">
              • 【特典】2025年Z世代トレンドレポート(5万円相当)
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Clock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
