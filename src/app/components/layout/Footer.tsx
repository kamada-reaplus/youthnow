import { BrandLogo } from "../ui/BrandLogo";
import { Container } from "../ui/Container";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, neutral-black, brand-primary など
// - スペーシング: section-spacing, gap-xl など
// - タイポグラフィ: text-h4, text-body, text-body-sm

export function Footer() {
  return (
    <footer className="bg-brand-primary border-t border-neutral-black/5">
      <Container size="6xl" padding="none" className="py-xl md:py-2xl">
        {/* メインコンテンツ */}
        <div className="text-center mb-lg">
          <div className="flex justify-center mb-sm">
            <BrandLogo
              responsive
              className="h-6 md:h-8 w-auto"
            />
          </div>
          <p className="text-body md:text-body-lg text-neutral-white font-medium">
            トレンドのすぐそばに
          </p>
          <p className="text-body-sm md:text-body text-neutral-white mt-xs max-w-2xl mx-auto">
            消費者の&ldquo;今&rdquo;を可視化する次世代型インサイトマーケティング
          </p>
        </div>

        {/* 区切り線 */}
        <div className="border-t border-neutral-black/10 my-lg"></div>

        {/* 運営会社 */}
        <div className="text-center">
          <p className="text-caption md:text-body-sm text-neutral-white flex items-center justify-center gap-2 flex-wrap">
            <span>運営会社：</span>
            <a
              href="https://reaplus.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-secondary underline underline-offset-2 transition-colors duration-200"
            >
              株式会社Reaplus
            </a>
          </p>
        </div>

        {/* コピーライト */}
        <div className="text-center">
          <p className="text-caption md:text-body-sm text-neutral-white/50">
            © {new Date().getFullYear()} Youth Now! All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
