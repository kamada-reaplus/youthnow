// デザインシステム使用コンポーネント
// - カラー: neutral-black, neutral-white など
// - スペーシング: section-spacing-lg, gap-xl など
// - タイポグラフィ: text-h4, text-body, text-body-sm

export function Footer() {
  return (
    <footer className="bg-neutral-black  text-neutral-white section-spacing-lg px-lg md:px-xl">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-xl md:gap-3xl">
          <div className="mb-xl">
            <div className="text-h4 font-bold mb-sm">Youth Now!</div>
            <p className="text-neutral-white/70 text-body-sm">
              トレンドのすぐそばに
            </p>
            <p className="text-neutral-white/60 text-caption mt-xs">
              消費者の”今”を可視化する次世代型インサイトマーケティング
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
