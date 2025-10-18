"use client";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";

// デザインシステム使用コンポーネント
// - カラー: brand-primary/95, border-brand-primary
// - スペーシング: px-lg, gap-sm など

export function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // ヒーローセクションの高さを取得（大体の値として800pxを使用）
      const heroHeight = 800;
      const scrollPosition = window.scrollY;

      // ヒーローセクションを過ぎたらヘッダーを表示
      const shouldShow = scrollPosition > heroHeight * 0.7;
      console.log("Header scroll:", { scrollPosition, heroHeight, shouldShow });
      setIsVisible(shouldShow);
    };

    // 初回チェック
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-brand-primary/95 backdrop-blur-md border-b border-brand-primary shadow-lg transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-lg md:px-xl h-4xl md:h-5xl flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-sm">
          <div className="flex items-center">
            <Image
              src={logo}
              alt="Youth Now Logo"
              width={120}
              height={40}
              className="h-2xl md:h-10 w-auto"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
