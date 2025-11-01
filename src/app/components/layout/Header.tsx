"use client";
import { BrandLogo } from "../ui/BrandLogo";
import { Container } from "../ui/Container";
import { useState, useEffect, useRef } from "react";
import { navItems } from "../../config/navigation";
import { Menu, X } from "lucide-react";

// デザインシステム使用コンポーネント
// - カラー: brand-primary/95, border-brand-primary
// - スペーシング: px-lg, gap-sm など

// navItems は config から参照

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 800;
      const scrollPosition = window.scrollY;

      // ファーストビュー（ヒーローセクション）では非表示
      const isInHeroSection = scrollPosition < heroHeight * 0.7;

      // 上スクロールを検出
      const isScrollingUp = scrollPosition < lastScrollYRef.current;

      // ファーストビュー以外かつ上スクロール時のみ表示
      const shouldShow = !isInHeroSection && isScrollingUp;

      setIsVisible(shouldShow);
      lastScrollYRef.current = scrollPosition;

      // 現在のセクションを検出
      const sections = navItems.map((item) => item.id);
      let currentSection = "";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // ビューポートの上部から1/3の位置にあるセクションをアクティブに
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= 0) {
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // モバイルメニューを閉じる
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-brand-primary/95 backdrop-blur-md border-b border-brand-primary shadow-lg transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* モバイル用：ロゴ + ハンバーガーメニュー */}
        <Container
          padding="none"
          className="md:hidden h-4xl flex items-center justify-between max-w-7xl mx-0 px-4"
        >
          <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")}>
            <BrandLogo width={120} height={40} priority />
          </a>

          {/* ハンバーガーメニューボタン */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-neutral-white p-2 hover:bg-brand-primary-dark rounded-lg transition-colors"
            aria-label="メニュー"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </Container>

        {/* PC用：ロゴ + ナビゲーションリンク */}
        <Container
          padding="none"
          className="hidden md:flex px-8 h-16 items-center justify-between max-w-7xl"
        >
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex-shrink-0"
          >
            <BrandLogo width={100} height={40} priority />
          </a>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`group relative px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-brand-secondary text-brand-primary"
                    : "text-neutral-white hover:bg-brand-primary-dark"
                }`}
                title={item.label}
              >
                <span
                  className={`text-xs ${
                    activeSection === item.id
                      ? "text-brand-primary"
                      : "text-neutral-white"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            ))}
          </nav>
        </Container>
      </header>

      {/* モバイルメニュー（スライドイン） */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 animate-in fade-in duration-200">
          {/* 背景オーバーレイ */}
          <div
            className="absolute inset-0 bg-neutral-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* メニューコンテンツ */}
          <nav className="absolute top-4xl right-0 left-0 bg-brand-primary shadow-2xl border-b-2 border-brand-secondary">
            <Container padding="none" className="px-lg py-6">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeSection === item.id
                          ? "bg-brand-secondary text-brand-primary"
                          : "text-neutral-white hover:bg-brand-primary-dark"
                      }`}
                    >
                      <span
                        className={`text-sm ${
                          activeSection === item.id
                            ? "text-brand-primary"
                            : "text-neutral-white"
                        }`}
                      >
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Container>
          </nav>
        </div>
      )}
    </>
  );
}
