import { Check } from "lucide-react";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, brand-primary, brand-secondary など
// - タイポグラフィ: text-2xl, text-4xl, text-sm など

interface PricingCardProps {
  name: string;
  price: string;
  description?: string;
  features: string[];
  report: string;
  timeline: string;
  badge?: string;
  variant?: "standard" | "default";
  className?: string;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  report,
  timeline,
  badge,
  variant = "default",
  className = "",
}: PricingCardProps) {
  const isStandard = variant === "standard";

  return (
    <div
      className={`rounded-3xl p-8 relative ${
        isStandard
          ? "bg-brand-primary border-2 border-brand-primary scale-105 shadow-xl"
          : "bg-neutral-white border-2 border-neutral-light"
      } ${className}`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-brand-secondary text-brand-primary text-xs px-4 py-1 rounded-full">
            {badge}
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h3
          className={`text-2xl mb-2 ${
            isStandard ? "text-neutral-white" : "text-brand-primary"
          }`}
        >
          {name}
        </h3>
        <div
          className={`text-3xl font-bold mb-2 ${
            isStandard ? "text-white" : "text-gray-900"
          }`}
        >
          {price}
        </div>

        {/* 税抜 */}
        <div
          className={`text-sm font-normal ${
            isStandard ? "text-gray-100" : "text-gray-600"
          }`}
        >
          (税抜)
        </div>

        {/* 説明文 */}
        {description && (
          <p
            className={`mt-2 text-base font-normal ${
              isStandard ? "text-gray-50" : "text-gray-700"
            }`}
          >
            {description}
          </p>
        )}
      </div>

      <div className="space-y-8">
        <div>
          <h4
            className={`text-sm mb-4 ${
              isStandard ? "text-neutral-white/90" : "text-neutral-medium"
            }`}
          >
            調査内容
          </h4>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div
                  className={`rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isStandard ? "bg-brand-secondary" : "bg-brand-primary"
                  }`}
                >
                  <Check
                    className={`w-3.5 h-3.5 ${
                      isStandard ? "text-brand-primary" : "text-neutral-white"
                    }`}
                  />
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    isStandard ? "text-neutral-white" : "text-neutral-dark"
                  }`}
                >
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`border-t pt-2 ${
            isStandard ? "border-neutral-white/20" : "border-neutral-light"
          }`}
        >
          <p
            className={`text-xs font-medium mb-2 ${
              isStandard ? "text-neutral-white/80" : "text-neutral-medium"
            }`}
          >
            レポート
          </p>
          <p
            className={`text-base leading-relaxed ${
              isStandard ? "text-neutral-white" : "text-neutral-dark"
            }`}
          >
            {report}
          </p>
        </div>

        <div
          className={`border-t pt-2 ${
            isStandard ? "border-neutral-white/20" : "border-neutral-light"
          }`}
        >
          <p
            className={`text-xs font-medium mb-2 ${
              isStandard ? "text-neutral-white/80" : "text-neutral-medium"
            }`}
          >
            納期目安
          </p>
          <p
            className={`text-base leading-relaxed ${
              isStandard ? "text-neutral-white" : "text-neutral-dark"
            }`}
          >
            {timeline}
          </p>
        </div>
      </div>
    </div>
  );
}
