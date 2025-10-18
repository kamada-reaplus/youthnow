"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "../ui/section-header";
import { SectionTitle } from "../ui/SectionTitle";
import { Form, FormData } from "../ui/Form";

export function ContactForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const purposes = ["資料請求", "お問い合わせ", "その他"];

  const interests = [
    "まずは話を聞きたい",
    "料金・プランの詳細を知りたい",
    "調査スピード・精度を確認したい",
    "その他",
  ];

  // 目的ごとの送信ボタンテキスト
  const submitButtonTexts = {
    資料請求: "今すぐ無料で資料をダウンロード",
    お問い合わせ: "お問い合わせを送信する",
    その他: "送信する",
  };

  // フォームのカラー設定（視認性を改善）
  const formColors = {
    // フォーム背景
    formBg: "bg-white/90",
    formBorder: "border-brand-primary/20",
    // テキスト
    labelText: "text-brand-primary",
    inputText: "text-brand-primary",
    inputPlaceholder: "placeholder:text-brand-primary/50",
    // 入力フィールド
    inputBg: "bg-white",
    inputBorder: "border-brand-primary/30",
    inputBorderFocus: "focus:border-brand-primary",
    inputBorderError: "border-error focus:border-error",
    inputBorderValid: "border-green-500",
    // ボタン（目的選択）
    buttonBg: "bg-brand-primary/15",
    buttonBgHover: "hover:bg-brand-primary/25",
    buttonBgActive: "bg-brand-secondary",
    buttonText: "text-brand-primary",
    buttonTextActive: "text-brand-primary",
    // ラジオボタン
    radioBg: "bg-white",
    radioBgActive: "bg-brand-secondary/30",
    radioBorder: "border-brand-primary/20",
    radioBorderActive: "border-brand-secondary",
    radioText: "text-brand-primary",
    radioBorderError: "border-error",
    // チェックボックス
    checkboxBg: "bg-white",
    checkboxBorder: "border-brand-primary/20",
    checkboxBorderHover: "hover:bg-brand-primary/5",
    checkboxBorderError: "border-error",
    checkboxText: "text-brand-primary",
    checkboxLinkText: "text-brand-primary",
    checkboxLinkHover: "hover:text-brand-secondary",
    // 送信ボタン
    submitBg: "bg-brand-secondary",
    submitText: "text-brand-primary",
    submitHover: "hover:brightness-110",
    // エラー
    errorText: "text-error",
    errorBg: "bg-error/10",
  };

  // カラーカスタマイズ例（必要に応じて指定）
  // const formColors = {
  //   formBg: "bg-blue-50",
  //   formBorder: "border-blue-200",
  //   labelText: "text-blue-900",
  //   inputText: "text-blue-900",
  //   inputPlaceholder: "placeholder:text-blue-400",
  //   inputBg: "bg-blue-100",
  //   inputBorder: "border-blue-300",
  //   inputBorderFocus: "focus:border-blue-500",
  //   inputBorderError: "border-red-500 focus:border-red-500",
  //   inputBorderValid: "border-green-500",
  //   buttonBg: "bg-blue-100",
  //   buttonBgHover: "hover:bg-blue-200",
  //   buttonBgActive: "bg-blue-500",
  //   buttonText: "text-blue-700",
  //   buttonTextActive: "text-white",
  //   radioBg: "bg-blue-50",
  //   radioBgActive: "bg-blue-100",
  //   radioBorder: "border-transparent",
  //   radioBorderActive: "border-blue-500",
  //   radioText: "text-blue-900",
  //   radioBorderError: "border-red-500",
  //   checkboxBg: "bg-blue-50",
  //   checkboxBorder: "border-transparent",
  //   checkboxBorderHover: "hover:bg-blue-100",
  //   checkboxBorderError: "border-red-500",
  //   checkboxText: "text-blue-800",
  //   checkboxLinkText: "text-blue-900",
  //   checkboxLinkHover: "hover:text-blue-600",
  //   submitBg: "bg-blue-500",
  //   submitText: "text-white",
  //   submitHover: "hover:bg-blue-600",
  //   errorText: "text-red-600",
  //   errorBg: "bg-red-50",
  // };

  const handleSubmit = async (data: FormData) => {
    // ここで実際のAPI呼び出しを行う
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });

    // デモ用の遅延
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("送信データ:", data);
  };

  const handleSuccess = () => {
    setSubmitSuccess(true);
  };

  const handleError = () => {
    alert("送信に失敗しました。もう一度お試しください。");
  };

  return (
    <section
      id="contact"
      className="bg-neutral-light-cyan section-spacing px-lg relative overflow-hidden scroll-mt-20"
    >
      <SectionTitle title="CONTACT" />
      <div className="container mx-auto max-w-md md:max-w-2xl lg:max-w-3xl relative z-10">
        <SectionHeader
          title="Youth Now!を体験してください"
          textColor="text-brand-primary"
          leadingTight
          className="text-center mb-lg"
        />
        <div className="text-center mb-3xl">
          <div className="inline-flex items-center gap-sm text-body-sm text-neutral-white">
            <Clock className="w-5 h-5 text-brand-secondary" />
            <span className="font-bold">60秒で完了</span>
          </div>
        </div>

        {/* 成功メッセージ */}
        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-xl mb-xl animate-fade-in">
            <div className="flex items-start gap-md">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-h6 text-green-800 font-bold mb-sm">
                  送信完了しました!
                </h3>
                <p className="text-body-sm text-green-700">
                  ご登録いただいたメールアドレスに資料をお送りしました。
                  <br />
                  24時間以内に特典のトレンドレポートもお届けします。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <Form
          purposes={purposes}
          interests={interests}
          showPurposeField={true}
          showPhoneField={true}
          phoneRequired={true}
          submitButtonText={submitButtonTexts}
          colors={formColors}
          onSubmit={handleSubmit}
          onSuccess={handleSuccess}
          onError={handleError}
          className="mb-xl"
        />

        {/* Bonus Message */}
        {/* <div className="text-center mb-xl">
          <p className="text-body-sm text-brand-secondary mb-xs font-bold">
            🎁 今なら5万円相当のトレンドレポートも同時プレゼント
          </p>
          <p className="text-caption text-brand-primary/60">
            ※資料DL後24時間以内限定
          </p>
        </div> */}

        {/* Resource Info */}
        {/* <div className="bg-brand-primary/5 backdrop-blur-sm rounded-3xl p-2xl">
          <h3 className="text-h6 text-brand-primary font-bold mb-lg">
            資料に含まれる内容
          </h3>
          <ul className="space-y-sm text-body-sm text-brand-primary/80">
            <li>• サービス詳細(全20ページ)</li>
            <li>• 料金プラン・見積もり例</li>
            <li>• 調査プロセス・スケジュール</li>
            <li>• FAQ詳細版</li>
            <li>• β版テスト事例集</li>
            <li className="text-brand-secondary">
              • 【特典】2025年Z世代トレンドレポート(5万円相当)
            </li>
          </ul>
        </div> */}
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
