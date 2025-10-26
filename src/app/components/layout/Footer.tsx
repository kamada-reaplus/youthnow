import Image from "next/image";
import logo from "../../assets/logo-black.png";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, neutral-black, brand-primary など
// - スペーシング: section-spacing, gap-xl など
// - タイポグラフィ: text-h4, text-body, text-body-sm

export function Footer() {
  return (
    <footer className="bg-neutral-light-cyan border-t border-neutral-black/5">
      <div className="container mx-auto max-w-6xl px-lg py-xl md:py-2xl">
        {/* メインコンテンツ */}
        <div className="text-center mb-lg">
          <div className="flex justify-center mb-sm">
            <Image
              src={logo}
              alt="Youth Now!"
              width={200}
              height={60}
              className="w-auto h-6 md:h-8"
            />
          </div>
          <p className="text-body md:text-body-lg text-neutral-black/80 font-medium">
            トレンドのすぐそばに
          </p>
          <p className="text-body-sm md:text-body text-neutral-black/60 mt-xs max-w-2xl mx-auto">
            消費者の&ldquo;今&rdquo;を可視化する次世代型インサイトマーケティング
          </p>
        </div>

        {/* 区切り線 */}
        <div className="border-t border-neutral-black/10 my-lg"></div>

        {/* コピーライト */}
        <div className="text-center">
          <p className="text-caption md:text-body-sm text-neutral-black/50">
            © {new Date().getFullYear()} Youth Now! All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
