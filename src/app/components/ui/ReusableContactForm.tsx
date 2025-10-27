"use client";

import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

// フォームバリデーション用の型定義
type ValidationErrors = {
  company?: string;
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  agreement?: string;
};

type TouchedFields = {
  company?: boolean;
  name?: boolean;
  email?: boolean;
  phone?: boolean;
  interest?: boolean;
  agreement?: boolean;
};

export type FormData = {
  company: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  purpose: string;
  agreement: boolean;
};

export type ReusableContactFormProps = {
  // スタイル設定
  backgroundColor?: string;
  formBackgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  labelColor?: string;
  inputBackgroundColor?: string;
  inputBorderColor?: string;
  inputFocusBorderColor?: string;
  inputTextColor?: string;
  inputPlaceholderColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  buttonHoverOpacity?: string;
  errorColor?: string;
  successColor?: string;

  // コンテンツ設定
  title?: string;
  subtitle?: string;
  completionTime?: string;
  purposes?: string[];
  interests?: string[];
  submitButtonText?: string;
  bonusText?: string;
  bonusSubtext?: string;
  successTitle?: string;
  successMessage?: string;
  privacyPolicyUrl?: string;
  privacyPolicyText?: string;

  // 機能設定
  showPurposeSelection?: boolean;
  showPhoneField?: boolean;
  phoneRequired?: boolean;
  showBonusSection?: boolean;
  showResourceInfo?: boolean;
  resourceInfoItems?: string[];

  // イベントハンドラ
  onSubmit?: (data: FormData) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;

  // その他
  className?: string;
  formClassName?: string;
};

export function ReusableContactForm({
  // デフォルトスタイル（現在のデザインシステム）
  backgroundColor = "bg-neutral-light-cyan",
  formBackgroundColor = "bg-brand-primary/5",
  borderColor = "border-brand-primary/10",
  textColor = "text-brand-primary",
  labelColor = "text-brand-primary",
  inputBackgroundColor = "bg-brand-primary/10",
  inputBorderColor = "border-brand-primary/20",
  inputFocusBorderColor = "focus:border-brand-primary/40",
  inputTextColor = "text-brand-primary",
  inputPlaceholderColor = "placeholder:text-brand-primary/40",
  buttonBackgroundColor = "bg-brand-secondary",
  buttonTextColor = "text-brand-primary",
  buttonHoverOpacity = "hover:opacity-90",
  errorColor = "text-error",
  successColor = "text-green-600",

  // デフォルトコンテンツ
  title = "お問い合わせ",
  subtitle = "お気軽にご連絡ください",
  completionTime = "60秒で完了",
  purposes = ["資料請求", "お問い合わせ", "その他"],
  interests = [
    "まずは話を聞きたい",
    "料金・プランの詳細を知りたい",
    "調査スピード・精度を確認したい",
    "その他",
  ],
  submitButtonText = "今すぐ無料で資料をダウンロード",
  bonusText = "🎁 今なら5万円相当のトレンドレポートも同時プレゼント",
  bonusSubtext = "※資料DL後24時間以内限定",
  successTitle = "送信完了しました!",
  successMessage = "ご登録いただいたメールアドレスに資料をお送りしました。\n24時間以内に特典のトレンドレポートもお届けします。",
  privacyPolicyUrl = "#privacy",
  privacyPolicyText = "個人情報の取り扱い",

  // デフォルト機能設定
  showPurposeSelection = true,
  showPhoneField = true,
  phoneRequired = false,
  showBonusSection = true,
  showResourceInfo = false,
  resourceInfoItems = [],

  // イベントハンドラ
  onSubmit,
  onSuccess,
  onError,

  // その他
  className = "",
  formClassName = "",
}: ReusableContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    company: "",
    name: "",
    email: "",
    phone: "",
    interest: "",
    purpose: purposes[0],
    agreement: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // バリデーション関数
  const validateField = (name: string, value: string | boolean) => {
    switch (name) {
      case "company":
        if (!value) return "会社名を入力してください";
        return "";
      case "name":
        if (!value) return "お名前を入力してください";
        return "";
      case "email":
        if (!value) return "メールアドレスを入力してください";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value as string))
          return "正しいメールアドレスを入力してください";
        return "";
      case "phone":
        if (phoneRequired && !value) return "電話番号を入力してください";
        if (value && !/^[\d-+() ]+$/.test(value as string))
          return "正しい電話番号を入力してください";
        return "";
      case "interest":
        if (!value) return "最も知りたいことを選択してください";
        return "";
      case "agreement":
        if (!value) return "個人情報の取り扱いに同意してください";
        return "";
      default:
        return "";
    }
  };

  // リアルタイムバリデーション
  const handleBlur = (field: keyof TouchedFields) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(
      field,
      formData[field as keyof typeof formData]
    );
    setErrors({ ...errors, [field]: error });
  };

  // 入力変更時のハンドラー
  const handleChange = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field as keyof TouchedFields]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  // フォーム送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = {
      company: true,
      name: true,
      email: true,
      phone: true,
      interest: true,
      agreement: true,
    };
    setTouched(allTouched);

    const newErrors: ValidationErrors = {
      company: validateField("company", formData.company),
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      interest: validateField("interest", formData.interest),
      agreement: validateField("agreement", formData.agreement),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      const firstErrorField = Object.keys(newErrors).find(
        (key) => newErrors[key as keyof ValidationErrors]
      );
      if (firstErrorField) {
        document
          .querySelector(`[name="${firstErrorField}"]`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // デフォルトの動作（デモ用）
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      setSubmitSuccess(true);
      setFormData({
        company: "",
        name: "",
        email: "",
        phone: "",
        interest: "",
        purpose: purposes[0],
        agreement: false,
      });
      setErrors({});
      setTouched({});

      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) {
        onError(error as Error);
      } else {
        alert("送信に失敗しました。もう一度お試しください。");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${backgroundColor} section-spacing px-lg relative overflow-hidden scroll-mt-20 ${className}`}
    >
      <div className="container mx-auto max-w-md relative z-10">
        {/* ヘッダー */}
        {title && (
          <h2 className={`text-h3 ${textColor} text-center mb-md`}>
            {title}
          </h2>
        )}
        {subtitle && (
          <p className={`text-h6 ${textColor} text-center mb-lg`}>{subtitle}</p>
        )}
        {completionTime && (
          <div className="text-center mb-3xl">
            <div
              className={`inline-flex items-center gap-sm text-body-sm ${textColor}`}
            >
              <Clock className="w-5 h-5" />
              <span className="">{completionTime}</span>
            </div>
          </div>
        )}

        {/* 成功メッセージ */}
        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-xl mb-xl animate-fade-in">
            <div className="flex items-start gap-md">
              <CheckCircle2
                className={`w-6 h-6 ${successColor} flex-shrink-0 mt-1`}
              />
              <div>
                <h3 className={`text-h6 ${successColor} mb-sm`}>
                  {successTitle}
                </h3>
                <p
                  className="text-body-sm text-green-700"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {successMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* フォーム */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className={`${formBackgroundColor} backdrop-blur-sm border ${borderColor} rounded-[48px] p-2xl mb-xl ${formClassName}`}
        >
          <div className="space-y-xl">
            {/* 目的選択 */}
            {showPurposeSelection && (
              <div>
                <label
                  className={`block text-body-sm ${labelColor} mb-md`}
                >
                  お問い合わせ目的
                </label>
                <div className="grid grid-cols-3 gap-sm">
                  {purposes.map((purpose) => (
                    <button
                      key={purpose}
                      type="button"
                      onClick={() => handleChange("purpose", purpose)}
                      className={`px-md py-sm rounded-lg text-body-sm font-medium transition-all ${
                        formData.purpose === purpose
                          ? `${buttonBackgroundColor} ${buttonTextColor} shadow-md`
                          : `${inputBackgroundColor} ${inputTextColor}/70 hover:${inputBackgroundColor.replace(
                              "/10",
                              "/20"
                            )}`
                      }`}
                    >
                      {purpose}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 会社名 */}
            <FormField
              id="company"
              label="会社名"
              required
              type="text"
              placeholder="株式会社〇〇"
              value={formData.company}
              onChange={(value) => handleChange("company", value)}
              onBlur={() => handleBlur("company")}
              error={touched.company ? errors.company : undefined}
              autoComplete="organization"
              labelColor={labelColor}
              inputBackgroundColor={inputBackgroundColor}
              inputBorderColor={inputBorderColor}
              inputFocusBorderColor={inputFocusBorderColor}
              inputTextColor={inputTextColor}
              inputPlaceholderColor={inputPlaceholderColor}
              errorColor={errorColor}
            />

            {/* 名前 */}
            <FormField
              id="name"
              label="お名前"
              required
              type="text"
              placeholder="山田 太郎"
              value={formData.name}
              onChange={(value) => handleChange("name", value)}
              onBlur={() => handleBlur("name")}
              error={touched.name ? errors.name : undefined}
              autoComplete="name"
              labelColor={labelColor}
              inputBackgroundColor={inputBackgroundColor}
              inputBorderColor={inputBorderColor}
              inputFocusBorderColor={inputFocusBorderColor}
              inputTextColor={inputTextColor}
              inputPlaceholderColor={inputPlaceholderColor}
              errorColor={errorColor}
            />

            {/* メールアドレス */}
            <FormField
              id="email"
              label="メールアドレス"
              required
              type="email"
              placeholder="example@company.com"
              value={formData.email}
              onChange={(value) => handleChange("email", value)}
              onBlur={() => handleBlur("email")}
              error={touched.email ? errors.email : undefined}
              autoComplete="email"
              labelColor={labelColor}
              inputBackgroundColor={inputBackgroundColor}
              inputBorderColor={inputBorderColor}
              inputFocusBorderColor={inputFocusBorderColor}
              inputTextColor={inputTextColor}
              inputPlaceholderColor={inputPlaceholderColor}
              errorColor={errorColor}
            />

            {/* 電話番号 */}
            {showPhoneField && (
              <FormField
                id="phone"
                label="電話番号"
                required={phoneRequired}
                type="tel"
                placeholder="03-1234-5678"
                value={formData.phone}
                onChange={(value) => handleChange("phone", value)}
                onBlur={() => handleBlur("phone")}
                error={touched.phone ? errors.phone : undefined}
                autoComplete="tel"
                labelColor={labelColor}
                inputBackgroundColor={inputBackgroundColor}
                inputBorderColor={inputBorderColor}
                inputFocusBorderColor={inputFocusBorderColor}
                inputTextColor={inputTextColor}
                inputPlaceholderColor={inputPlaceholderColor}
                errorColor={errorColor}
              />
            )}

            {/* 興味のある内容 */}
            <div>
              <label
                className={`block text-body-sm ${labelColor} mb-md`}
              >
                最も知りたいこと <span className={errorColor}>*</span>
              </label>
              <div className="space-y-md">
                {interests.map((interest, index) => (
                  <label
                    key={index}
                    className={`flex items-center gap-md ${inputBackgroundColor}/50 rounded-lg px-lg py-md cursor-pointer transition-all ${
                      formData.interest === interest
                        ? `${buttonBackgroundColor}/20 border-2 ${borderColor.replace(
                            "/10",
                            ""
                          )}`
                        : `border-2 border-transparent hover:${inputBackgroundColor}`
                    } ${
                      touched.interest && errors.interest ? "border-error" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="interest"
                      value={interest}
                      checked={formData.interest === interest}
                      onChange={(e) => handleChange("interest", e.target.value)}
                      onBlur={() => handleBlur("interest")}
                      required
                      className={`w-5 h-5 ${buttonTextColor} bg-transparent ${inputBorderColor} focus:ring-2 focus:ring-${buttonBackgroundColor.replace(
                        "bg-",
                        ""
                      )} cursor-pointer`}
                    />
                    <span
                      className={`text-body-sm ${inputTextColor} font-medium`}
                    >
                      {interest}
                    </span>
                  </label>
                ))}
              </div>
              {touched.interest && errors.interest && (
                <div
                  className={`mt-sm flex items-center gap-xs ${errorColor} text-caption`}
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.interest}</span>
                </div>
              )}
            </div>

            {/* 同意 */}
            <div>
              <label
                className={`flex items-start gap-md rounded-lg px-lg py-lg cursor-pointer transition-colors ${
                  touched.agreement && errors.agreement
                    ? "bg-error/5 border-2 border-error"
                    : `${inputBackgroundColor}/50 border-2 border-transparent hover:${inputBackgroundColor}`
                }`}
              >
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={(e) => handleChange("agreement", e.target.checked)}
                  onBlur={() => handleBlur("agreement")}
                  required
                  className={`mt-1 w-5 h-5 ${buttonTextColor} bg-transparent ${inputBorderColor} rounded focus:ring-2 focus:ring-${buttonBackgroundColor.replace(
                    "bg-",
                    ""
                  )} cursor-pointer`}
                />
                <span className={`text-body-sm ${inputTextColor}/80`}>
                  <a
                    href={privacyPolicyUrl}
                    className={`${inputTextColor} underline hover:opacity-80 transition-colors`}
                  >
                    {privacyPolicyText}
                  </a>
                  に同意する <span className={errorColor}>*</span>
                </span>
              </label>
              {touched.agreement && errors.agreement && (
                <div
                  className={`mt-sm flex items-center gap-xs ${errorColor} text-caption ml-[52px]`}
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.agreement}</span>
                </div>
              )}
            </div>

            {/* 送信ボタン */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${buttonBackgroundColor} ${buttonTextColor} py-lg px-xl rounded-full shadow-lg transition-all flex items-center justify-center gap-sm ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : `${buttonHoverOpacity} hover:shadow-xl hover:scale-[1.02]`
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  送信中...
                </>
              ) : (
                <>
                  {submitButtonText}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* ボーナス */}
            {showBonusSection && (
              <div className="text-center">
                <p
                  className={`text-body-sm ${buttonTextColor} mb-xs`}
                >
                  {bonusText}
                </p>
                {bonusSubtext && (
                  <p className={`text-caption ${inputTextColor}/60`}>
                    {bonusSubtext}
                  </p>
                )}
              </div>
            )}
          </div>
        </form>

        {/* リソース情報 */}
        {showResourceInfo && resourceInfoItems.length > 0 && (
          <div
            className={`${formBackgroundColor} backdrop-blur-sm rounded-3xl p-2xl`}
          >
            <h3 className={`text-h6 ${labelColor} mb-lg`}>
              資料に含まれる内容
            </h3>
            <ul className={`space-y-sm text-body-sm ${inputTextColor}/80`}>
              {resourceInfoItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// フォームフィールドコンポーネント
type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  autoComplete?: string;
  labelColor: string;
  inputBackgroundColor: string;
  inputBorderColor: string;
  inputFocusBorderColor: string;
  inputTextColor: string;
  inputPlaceholderColor: string;
  errorColor: string;
};

function FormField({
  id,
  label,
  required,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  labelColor,
  inputBackgroundColor,
  inputBorderColor,
  inputFocusBorderColor,
  inputTextColor,
  inputPlaceholderColor,
  errorColor,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-body-sm ${labelColor} mb-sm`}
      >
        {label}{" "}
        {required ? (
          <span className={errorColor}>*</span>
        ) : (
          <span className={`${labelColor}/60`}>(任意)</span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full ${inputBackgroundColor} border rounded-lg px-lg py-md ${inputTextColor} ${inputPlaceholderColor} focus:outline-none transition-colors ${
          error
            ? "border-error focus:border-error"
            : `${inputBorderColor} ${inputFocusBorderColor}`
        } ${!error && value ? "border-green-500" : ""}`}
      />
      {error && (
        <div
          id={`${id}-error`}
          className={`mt-sm flex items-center gap-xs ${errorColor} text-caption`}
          role="alert"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

// Clock コンポーネント
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
