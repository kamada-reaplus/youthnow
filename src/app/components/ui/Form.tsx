"use client";

import { ArrowRight, AlertCircle } from "lucide-react";
import { useState, FormEvent } from "react";

// フォームデータの型
export type FormData = {
  company: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  purpose: string;
  agreement: boolean;
};

type ValidationErrors = Partial<Record<keyof FormData, string>>;
type TouchedFields = Partial<Record<keyof FormData, boolean>>;

type FormProps = {
  // 目的と興味の選択肢（カスタマイズ可能）
  purposes?: string[];
  interests?: string[];

  // 機能の表示/非表示
  showPurposeField?: boolean;
  showPhoneField?: boolean;
  phoneRequired?: boolean;

  // 送信ボタンのテキスト（目的ごとにカスタマイズ可能）
  submitButtonText?: string | Record<string, string>;

  // デザインカスタマイズ（必須）
  colors: {
    // フォーム背景
    formBg: string;
    formBorder: string;
    // テキスト
    labelText: string;
    inputText: string;
    inputPlaceholder: string;
    // 入力フィールド
    inputBg: string;
    inputBorder: string;
    inputBorderFocus: string;
    inputBorderError: string;
    inputBorderValid: string;
    // ボタン（目的選択）
    buttonBg: string;
    buttonBgHover: string;
    buttonBgActive: string;
    buttonText: string;
    buttonTextActive: string;
    // ラジオボタン
    radioBg: string;
    radioBgActive: string;
    radioBorder: string;
    radioBorderActive: string;
    radioText: string;
    radioBorderError: string;
    // チェックボックス
    checkboxBg: string;
    checkboxBorder: string;
    checkboxBorderHover: string;
    checkboxBorderError: string;
    checkboxText: string;
    checkboxLinkText: string;
    checkboxLinkHover: string;
    // 送信ボタン
    submitBg: string;
    submitText: string;
    submitHover: string;
    // エラー
    errorText: string;
    errorBg: string;
  };

  // イベントハンドラ
  onSubmit: (data: FormData) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;

  // 追加のクラス
  className?: string;
};

export function Form({
  purposes = ["資料請求", "お問い合わせ", "その他"],
  interests = [
    "まずは話を聞きたい",
    "料金・プランの詳細を知りたい",
    "調査スピード・精度を確認したい",
    "その他",
  ],
  showPurposeField = true,
  showPhoneField = true,
  phoneRequired = false,
  submitButtonText = "送信する",
  colors,
  onSubmit,
  onSuccess,
  onError,
  className = "",
}: FormProps) {
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

  // 送信ボタンのテキストを取得（目的に応じて変更）
  const getSubmitButtonText = () => {
    if (typeof submitButtonText === "string") {
      return submitButtonText;
    }
    if (
      typeof submitButtonText === "object" &&
      submitButtonText[formData.purpose]
    ) {
      return submitButtonText[formData.purpose];
    }
    return "送信する";
  };

  // バリデーション
  const validateField = (name: keyof FormData, value: string | boolean) => {
    switch (name) {
      case "company":
        return !value ? "会社名を入力してください" : "";
      case "name":
        return !value ? "お名前を入力してください" : "";
      case "email":
        if (!value) return "メールアドレスを入力してください";
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)
          ? "正しいメールアドレスを入力してください"
          : "";
      case "phone":
        if (phoneRequired && !value) return "電話番号を入力してください";
        return value && !/^[\d-+() ]+$/.test(value as string)
          ? "正しい電話番号を入力してください"
          : "";
      case "interest":
        // 任意項目に変更
        return "";
      case "agreement":
        return !value ? "個人情報の取り扱いに同意してください" : "";
      default:
        return "";
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formData[field]);
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const allTouched: TouchedFields = {
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

    if (Object.values(newErrors).some((error) => error)) {
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
      await onSubmit(formData);
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
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`${colors.formBg} backdrop-blur-sm border ${colors.formBorder} rounded-[48px] p-2xl ${className}`}
    >
      <div className="space-y-xl">
        {/* 目的選択 */}
        {showPurposeField && (
          <div>
            <label
              className={`block text-body-sm font-bold ${colors.labelText} mb-md`}
            >
              お問い合わせ目的
            </label>
            <div className="grid grid-cols-3 gap-sm">
              {purposes.map((purpose) => (
                <button
                  key={purpose}
                  type="button"
                  onClick={() => handleChange("purpose", purpose)}
                  className={`px-sm py-sm rounded-lg text-caption sm:text-body-sm font-medium transition-all whitespace-nowrap ${
                    formData.purpose === purpose
                      ? `${colors.buttonBgActive} ${colors.buttonTextActive} shadow-md`
                      : `${colors.buttonBg} ${colors.buttonText} ${colors.buttonBgHover}`
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
          value={formData.company}
          onChange={(value) => handleChange("company", value)}
          onBlur={() => handleBlur("company")}
          error={touched.company ? errors.company : undefined}
          placeholder="株式会社〇〇"
          autoComplete="organization"
          colors={colors}
        />

        {/* 名前 */}
        <FormField
          id="name"
          label="お名前"
          required
          value={formData.name}
          onChange={(value) => handleChange("name", value)}
          onBlur={() => handleBlur("name")}
          error={touched.name ? errors.name : undefined}
          placeholder="山田 太郎"
          autoComplete="name"
          colors={colors}
        />

        {/* メールアドレス */}
        <FormField
          id="email"
          label="メールアドレス"
          required
          type="email"
          value={formData.email}
          onChange={(value) => handleChange("email", value)}
          onBlur={() => handleBlur("email")}
          error={touched.email ? errors.email : undefined}
          placeholder="example@company.com"
          autoComplete="email"
          colors={colors}
        />

        {/* 電話番号 */}
        {showPhoneField && (
          <FormField
            id="phone"
            label="電話番号"
            required={phoneRequired}
            type="tel"
            value={formData.phone}
            onChange={(value) => handleChange("phone", value)}
            onBlur={() => handleBlur("phone")}
            error={touched.phone ? errors.phone : undefined}
            placeholder="03-1234-5678"
            autoComplete="tel"
            colors={colors}
          />
        )}

        {/* 興味のある内容 */}
        <div>
          <label
            className={`block text-body-sm font-bold ${colors.labelText} mb-md`}
          >
            最も知りたいこと{" "}
            <span className={`${colors.labelText}/60`}>(任意)</span>
          </label>
          <div className="space-y-md">
            {interests.map((interest, index) => (
              <label
                key={index}
                className={`flex items-center gap-md ${
                  colors.radioBg
                } rounded-lg px-lg py-md cursor-pointer transition-all ${
                  formData.interest === interest
                    ? `${colors.radioBgActive} border-2 ${colors.radioBorderActive}`
                    : `border-2 ${colors.radioBorder} hover:bg-brand-primary/10`
                } ${
                  touched.interest && errors.interest
                    ? `border-2 ${colors.radioBorderError}`
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="interest"
                  value={interest}
                  checked={formData.interest === interest}
                  onChange={(e) => handleChange("interest", e.target.value)}
                  onBlur={() => handleBlur("interest")}
                  className="w-5 h-5 text-brand-secondary bg-transparent border-brand-primary/40 focus:ring-2 focus:ring-brand-secondary cursor-pointer"
                />
                <span
                  className={`text-body-sm ${colors.radioText} font-medium`}
                >
                  {interest}
                </span>
              </label>
            ))}
          </div>
          {touched.interest && errors.interest && (
            <div
              className={`mt-sm flex items-center gap-xs ${colors.errorText} text-caption`}
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
                ? `${colors.errorBg} border-2 ${colors.checkboxBorderError}`
                : `${colors.checkboxBg} border-2 ${colors.checkboxBorder} ${colors.checkboxBorderHover}`
            }`}
          >
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={(e) => handleChange("agreement", e.target.checked)}
              onBlur={() => handleBlur("agreement")}
              required
              aria-invalid={
                touched.agreement && errors.agreement ? "true" : "false"
              }
              aria-describedby={
                touched.agreement && errors.agreement
                  ? "agreement-error"
                  : undefined
              }
              className="mt-1 w-5 h-5 text-brand-secondary bg-transparent border-brand-primary/40 rounded focus:ring-2 focus:ring-brand-secondary cursor-pointer"
            />
            <span className={`text-body-sm ${colors.checkboxText}`}>
              <a
                href="#privacy"
                className={`${colors.checkboxLinkText} underline ${colors.checkboxLinkHover} transition-colors`}
              >
                個人情報の取り扱い
              </a>
              に同意する <span className={colors.errorText}>*</span>
            </span>
          </label>
          {touched.agreement && errors.agreement && (
            <div
              id="agreement-error"
              className={`mt-sm flex items-center gap-xs ${colors.errorText} text-caption ml-[52px]`}
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
          className={`w-full ${colors.submitBg} ${
            colors.submitText
          } py-lg px-xl rounded-full font-bold shadow-lg transition-all flex items-center justify-center gap-sm ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : `${colors.submitHover} hover:shadow-xl hover:scale-[1.02]`
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              送信中...
            </>
          ) : (
            <>
              {getSubmitButtonText()}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// フォームフィールドコンポーネント
type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  autoComplete?: string;
  colors: {
    labelText: string;
    inputText: string;
    inputPlaceholder: string;
    inputBg: string;
    inputBorder: string;
    inputBorderFocus: string;
    inputBorderError: string;
    inputBorderValid: string;
    errorText: string;
  };
};

function FormField({
  id,
  label,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  colors,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-body-sm font-bold ${colors.labelText} mb-sm`}
      >
        {label}{" "}
        {required ? (
          <span className={colors.errorText}>*</span>
        ) : (
          <span className={`${colors.labelText}/60`}>(任意)</span>
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
        className={`w-full ${colors.inputBg} border rounded-lg px-lg py-md ${
          colors.inputText
        } ${colors.inputPlaceholder} focus:outline-none transition-colors ${
          error
            ? colors.inputBorderError
            : `${colors.inputBorder} ${colors.inputBorderFocus}`
        } ${!error && value ? colors.inputBorderValid : ""}`}
      />
      {error && (
        <div
          id={`${id}-error`}
          className={`mt-sm flex items-center gap-xs ${colors.errorText} text-caption`}
          role="alert"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
