"use client";
import { useState, useEffect } from "react";
import { ContactButton } from "../ui/ContactButton";

// デザインシステム使用コンポーネント
// - カラー: brand-primary, neutral-white など
// - スペーシング: px-lg, py-md, gap-sm など
// - タイポグラフィ: text-body-sm

export function FloatingCTAButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // ヘッダーと同じロジック：ヒーローセクションの高さを取得
      const heroHeight = 800;
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

      // ヒーローセクションを過ぎて、ContactFormセクションが見えておらず、最下部でもない場合に表示
      setIsVisible(
        scrollPosition > heroHeight * 0.7 &&
          !hideInContactSection &&
          !isNearBottom
      );
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleClick = () => {
    // スクロールしてコンタクトフォームまで移動
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-neutral-white border-t border-brand-primary/20 shadow-md backdrop-blur-sm transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
            <div className="container mx-auto px-lg py-sm max-w-7xl">
        <div className="flex justify-center">
          <ContactButton
            variant="blue"
            size="small"
            label="簡単30秒で入力完了"
            text="無料資料をダウンロード"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
