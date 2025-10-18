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
  usage: string;
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
  usage,
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
          <div className="bg-brand-secondary text-brand-primary text-xs px-4 py-1 rounded-full font-bold">
            {badge}
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h3
          className={`text-2xl font-bold mb-2 ${
            isStandard ? "text-neutral-white" : "text-brand-primary"
          }`}
        >
          {name}
        </h3>
        <div
          className={`text-4xl font-bold mb-2 ${
            isStandard ? "text-neutral-white" : "text-neutral-dark"
          }`}
        >
          {price}
        </div>
        <div
          className={`text-sm ${
            isStandard ? "text-neutral-white/80" : "text-neutral-medium"
          }`}
        >
          (税抜)
        </div>
        {description && (
          <p
            className={`mt-2 text-sm ${
              isStandard ? "text-neutral-white/90" : "text-neutral-medium"
            }`}
          >
            {description}
          </p>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h4
            className={`font-bold mb-3 ${
              isStandard ? "text-neutral-white" : "text-neutral-dark"
            }`}
          >
            調査内容
          </h4>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div
                  className={`rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mt-1 ${
                    isStandard ? "bg-brand-secondary" : "bg-brand-primary"
                  }`}
                >
                  <Check
                    className={`w-3 h-3 ${
                      isStandard ? "text-brand-primary" : "text-neutral-white"
                    }`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    isStandard ? "text-neutral-white" : "text-neutral-dark"
                  }`}
                >
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p
            className={`font-bold ${
              isStandard ? "text-neutral-white" : "text-neutral-dark"
            }`}
          >
            レポート:{report}
          </p>
        </div>

        <div>
          <p
            className={`font-bold ${
              isStandard ? "text-neutral-white" : "text-neutral-dark"
            }`}
          >
            納期目安:{timeline}
          </p>
        </div>

        <div>
          <p
            className={`font-bold text-center ${
              isStandard ? "text-neutral-white" : "text-brand-primary"
            }`}
          >
            {usage}
          </p>
        </div>
      </div>
    </div>
  );
}
