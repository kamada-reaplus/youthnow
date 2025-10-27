"use client";

import { ArrowRight } from "lucide-react";

interface ContactButtonProps {
  variant?: "yellow" | "blue";
  size?: "small" | "medium" | "large";
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
  const handleClick = onClick || defaultOnClick;
  const colors = {
    yellow: {
      bg: "bg-brand-secondary",
      hoverBg: "hover:bg-brand-secondary/90",
      labelBg: "bg-white",
      labelText: "text-brand-secondary-dark",
      buttonText: "text-neutral-black",
      iconBg: "bg-white/90",
      iconText: "text-brand-secondary-dark",
      labelBorder: "border-brand-secondary",
    },
    blue: {
      bg: "bg-brand-primary",
      hoverBg: "hover:bg-brand-primary/90",
      labelBg: "bg-white",
      labelText: "text-brand-primary",
      buttonText: "text-white",
      iconBg: "bg-white/90",
      iconText: "text-brand-primary",
      labelBorder: "border-brand-primary",
    },
  };

  const color = colors[variant];

  const sizes = {
    small: {
      container: "pt-2",
      labelMargin: "mb-[-12px]",
      labelPadding: "px-4 py-1.5",
      labelText: "text-xs",
      buttonPadding: "px-6 py-3",
      buttonText: "text-base md:text-lg",
      buttonMinWidth: "min-w-[240px]",
      iconSize: "w-8 h-8",
      iconRight: "right-3",
      arrowSize: "w-4 h-4",
    },
    medium: {
      container: "pt-4",
      labelMargin: "mb-[-16px]",
      labelPadding: "px-6 py-2.5",
      labelText: "text-sm",
      buttonPadding: "px-10 py-5",
      buttonText: "text-xl md:text-2xl",
      buttonMinWidth: "min-w-[320px]",
      iconSize: "w-10 h-10",
      iconRight: "right-5",
      arrowSize: "w-5 h-5",
    },
    large: {
      container: "pt-6",
      labelMargin: "mb-[-20px]",
      labelPadding: "px-8 py-3",
      labelText: "text-base",
      buttonPadding: "px-12 py-6",
      buttonText: "text-2xl md:text-3xl",
      buttonMinWidth: "min-w-[400px]",
      iconSize: "w-12 h-12",
      iconRight: "right-6",
      arrowSize: "w-6 h-6",
    },
  };

  const sizeConfig = sizes[size];

  return (
    <div className={`relative inline-block ${sizeConfig.container}`}>
      {/* Label - positioned on top of button */}
      <div
        className={`flex justify-center relative z-10 ${sizeConfig.labelMargin}`}
      >
        <div
          className={`${color.labelBg} ${color.labelText} ${color.labelBorder} border-2 rounded-full ${sizeConfig.labelPadding} shadow-sm ${sizeConfig.labelText}`}
        >
          {label}
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={handleClick}
        className={`relative ${color.bg} ${color.hoverBg} ${color.buttonText} rounded-full ${sizeConfig.buttonPadding} transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] w-full ${sizeConfig.buttonMinWidth} group`}
      >
        <span className={`block ${sizeConfig.buttonText} pr-12`}>{text}</span>

        {/* Arrow Icon */}
        <div
          className={`absolute ${sizeConfig.iconRight} top-1/2 -translate-y-1/2 ${color.iconBg} ${color.iconText} ${sizeConfig.iconSize} rounded-full flex items-center justify-center shadow-md group-hover:translate-x-1 transition-transform duration-300`}
        >
          <ArrowRight className={sizeConfig.arrowSize} />
        </div>
      </button>
    </div>
  );
}
