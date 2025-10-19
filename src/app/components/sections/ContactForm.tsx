"use client";

import { CheckCircle2, Shield } from "lucide-react";
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

  // 目的ごとの送信ボタンテキスト（ベネフィット重視に変更）
  const submitButtonTexts = {
    資料請求: "無料で資料とトレンドレポートを今すぐ受け取る",
    お問い合わせ: "専門スタッフに相談する（無料）",
    その他: "今すぐ問い合わせる",
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
      className="bg-neutral-light-cyan py-8 md:py-12 px-lg relative overflow-hidden scroll-mt-20"
    >
      <SectionTitle title="CONTACT" />
      <div className="container mx-auto max-w-md md:max-w-2xl lg:max-w-3xl relative z-10">
        <div className="text-center mb-md md:mb-lg">
          <SectionHeader
            title="Youth Now!を体験してください"
            textColor="text-brand-primary"
            leadingTight
            className="mb-0"
          />
          <p className="text-body text-brand-primary/80 mt-sm">
            最短1分で完了。今なら無料トレンドレポート付き
          </p>
        </div>

        {/* ソーシャルプルーフ */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-sm mb-lg">
          <div className="bg-white/60 backdrop-blur-sm border border-brand-primary/10 rounded-xl p-md text-center">
            <div className="flex items-center justify-center mb-xs">
              <Users className="w-5 h-5 text-brand-secondary" />
            </div>
            <div className="text-h5 font-bold text-brand-primary">500+</div>
            <div className="text-caption text-brand-primary/70">導入企業</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-brand-primary/10 rounded-xl p-md text-center">
            <div className="flex items-center justify-center mb-xs">
              <TrendingUp className="w-5 h-5 text-brand-secondary" />
            </div>
            <div className="text-h5 font-bold text-brand-primary">98%</div>
            <div className="text-caption text-brand-primary/70">満足度</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-brand-primary/10 rounded-xl p-md text-center">
            <div className="flex items-center justify-center mb-xs">
              <Clock className="w-5 h-5 text-brand-secondary" />
            </div>
            <div className="text-h5 font-bold text-brand-primary">24時間</div>
            <div className="text-caption text-brand-primary/70">以内に返信</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-brand-primary/10 rounded-xl p-md text-center">
            <div className="flex items-center justify-center mb-xs">
              <Shield className="w-5 h-5 text-brand-secondary" />
            </div>
            <div className="text-h5 font-bold text-brand-primary">SSL</div>
            <div className="text-caption text-brand-primary/70">暗号化通信</div>
          </div>
        </div> */}

        {/* ベネフィットリスト（フォーム上部） */}
        <div className="bg-brand-secondary/10 border border-brand-secondary/20 rounded-2xl p-lg mb-lg">
          <h3 className="text-h6 font-bold text-brand-primary mb-md text-center">
            資料請求で今すぐ手に入るもの
          </h3>
          <ul className="space-y-sm">
            <li className="flex items-start gap-sm">
              <CheckCircle2 className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
              <span className="text-body-sm text-brand-primary">
                <strong>サービス紹介資料（PDF）</strong> -
                機能と料金プランの詳細
              </span>
            </li>
            <li className="flex items-start gap-sm">
              <CheckCircle2 className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
              <span className="text-body-sm text-brand-primary">
                <strong>最新トレンドレポート（限定）</strong> -
                Z世代の最新動向分析
              </span>
            </li>
          </ul>
        </div>

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
        />

        {/* 成功メッセージ */}
        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-lg mb-lg animate-fade-in">
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
        {/* トラストシグナル（フォーム下部） */}
        <div className="mt-lg text-center">
          <div className="flex items-center justify-center gap-md flex-wrap">
            <div className="flex items-center gap-xs text-brand-primary/70 text-caption">
              <Shield className="w-4 h-4" />
              <span>SSL暗号化通信</span>
            </div>
            <div className="text-brand-primary/40">•</div>
            <div className="flex items-center gap-xs text-brand-primary/70 text-caption">
              <CheckCircle2 className="w-4 h-4" />
              <span>個人情報保護方針準拠</span>
            </div>
          </div>
          <p className="text-caption text-brand-primary/60 mt-sm">
            入力いただいた情報は厳重に管理し、サービスのご案内以外には使用いたしません
          </p>
        </div>
      </div>
    </section>
  );
}
