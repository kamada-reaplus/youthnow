"use client";
import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { trackButtonClick } from "@/app/lib/analytics";

// デザインシステム使用コンポーネント
// - カラー: brand-primary, neutral-white など
// - スペーシング: px-lg, py-md, gap-sm など
// - タイポグラフィ: text-body-sm

export function FloatingCTAButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // ContactFormセクションが見えている場合は非表示にする
      const contactSection = document.getElementById("contact");
      let hideInContactSection = false;
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        hideInContactSection =
          contactRect.top <= windowHeight && contactRect.bottom >= 0;
      }

      // ページの最下部近くでは非表示にする
      const isNearBottom =
        scrollPosition + windowHeight >= documentHeight - 100;

      // スクロール位置が300px以上で、ContactFormセクションが見えておらず、最下部でもない場合に表示
      const shouldShow =
        scrollPosition > 300 && !hideInContactSection && !isNearBottom;

      setIsVisible(shouldShow);
    };

    // 初回チェック
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleClick = () => {
    // イベントトラッキング
    trackButtonClick("お問い合わせ", "floating_cta_button");

    // スクロールしてコンタクトフォームまで移動
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      {/* メインのフローティングボタン */}
      <button
        onClick={handleClick}
        className="relative bg-brand-primary hover:bg-brand-primary/90 active:bg-brand-primary/80 text-white rounded-full px-4 py-3 md:px-6 md:py-5 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 md:gap-4 group border-2 border-neutral-white"
        aria-label="お問い合わせ"
      >
        {/* アイコン */}
        <MessageCircle className="w-5 h-5 md:w-7 md:h-7 flex-shrink-0" />

        {/* テキスト（スマホ・PCともに常に表示） */}
        <span className="text-sm md:text-base whitespace-nowrap">
          お問い合わせ
        </span>

        {/* パルスアニメーション */}
        <span className="absolute inset-0 rounded-full bg-brand-primary animate-ping opacity-20 pointer-events-none"></span>
      </button>

      {/* バッジ（未読風） */}
      <span className="absolute -top-1 -right-1 bg-brand-secondary text-brand-primary text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-md pointer-events-none">
        !
      </span>
    </div>
  );
}
