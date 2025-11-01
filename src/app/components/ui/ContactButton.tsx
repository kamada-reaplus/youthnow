"use client";

import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import { trackButtonClick } from "@/app/lib/analytics";

const contactButtonVariants = cva(
  "relative rounded-full transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.2)] hover:shadow-2xl hover:translate-y-[-2px] w-full group",
  {
    variants: {
      variant: {
        yellow:
          "bg-gradient-to-b from-[#FFDD4C] to-[#FFC107] hover:from-[#FFE666] hover:to-[#FFD020] text-gray-900 font-extrabold",
        blue: "bg-gradient-to-b from-brand-primary-light to-brand-primary hover:from-brand-primary hover:to-brand-primary-dark text-white font-extrabold",
      },
      size: {
        small: "px-6 py-3 min-w-[240px]",
        medium: "px-10 py-5 min-w-[320px]",
        large: "px-12 py-6 min-w-[400px]",
      },
    },
    defaultVariants: {
      variant: "yellow",
      size: "medium",
    },
  }
);

interface ContactButtonProps
  extends VariantProps<typeof contactButtonVariants> {
  label?: string;
  text?: string;
  onClick?: () => void;
}

export function ContactButton({
  variant = "yellow",
  size = "medium",
  label = "簡単30秒で入力完了",
  text = "お問い合わせはこちら",
  onClick,
}: ContactButtonProps) {
  // デフォルトのonClickイベント - contactセクションへのスクロール
  const defaultOnClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // onClickが提供されている場合はそれを使用、そうでなければデフォルトを使用
  const handleClick = () => {
    // イベントトラッキング
    trackButtonClick(text, "contact_button");

    // 元のonClickを実行
    if (onClick) {
      onClick();
    } else {
      defaultOnClick();
    }
  };
  const labelConfig = {
    yellow: {
      bg: "bg-white",
      text: "text-gray-800", // 濃いグレーに変更（コントラスト改善）
      border: "border-brand-secondary",
      iconBg: "bg-brand-secondary", // 黄色の円に変更
      iconText: "text-gray-800", // 濃いグレーの矢印に変更
    },
    blue: {
      bg: "bg-white",
      text: "text-brand-primary",
      border: "border-brand-primary",
      iconBg: "bg-brand-primary", // 水色の円に変更
      iconText: "text-white", // 白い矢印に変更
    },
  }[variant || "yellow"];

  const sizeConfig = {
    small: {
      container: "pt-2",
      labelMargin: "mb-[-12px]",
      labelPadding: "px-4 py-1.5 text-xs",
      buttonText: "text-base md:text-lg",
      iconSize: "w-8 h-8",
      iconRight: "right-3",
      arrowSize: "w-4 h-4",
    },
    medium: {
      container: "pt-4",
      labelMargin: "mb-[-16px]",
      labelPadding: "px-6 py-2.5 text-sm",
      buttonText: "text-xl md:text-2xl",
      iconSize: "w-10 h-10",
      iconRight: "right-5",
      arrowSize: "w-5 h-5",
    },
    large: {
      container: "pt-6",
      labelMargin: "mb-[-20px]",
      labelPadding: "px-8 py-3 text-base",
      buttonText: "text-2xl md:text-3xl",
      iconSize: "w-12 h-12",
      iconRight: "right-6",
      arrowSize: "w-6 h-6",
    },
  }[size || "medium"];

  return (
    <div className={cn("relative inline-block", sizeConfig.container)}>
      {/* Label - positioned on top of button */}
      <div
        className={cn(
          "flex justify-center relative z-10",
          sizeConfig.labelMargin
        )}
      >
        <div
          className={cn(
            labelConfig.bg,
            labelConfig.text,
            labelConfig.border,
            "border-2 rounded-full shadow-sm font-bold",
            sizeConfig.labelPadding
          )}
        >
          {label}
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={handleClick}
        className={cn(contactButtonVariants({ variant, size }))}
      >
        <span className={cn("block pr-12 font-bold", sizeConfig.buttonText)}>
          {text}
        </span>

        {/* Arrow Icon */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center shadow-md",
            "group-hover:translate-x-1 transition-transform duration-300",
            labelConfig.iconBg,
            labelConfig.iconText,
            sizeConfig.iconSize,
            sizeConfig.iconRight
          )}
        >
          <ArrowRight className={sizeConfig.arrowSize} />
        </div>
      </button>
    </div>
  );
}
