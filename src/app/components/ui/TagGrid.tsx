interface TagGridProps {
  items: string[];
  className?: string;
}

export function TagGrid({ items, className = "" }: TagGridProps) {
  return (
    <div className={`${className}`}>
      {/* モバイル: 従来の2列レイアウト */}
      <div className="md:hidden max-w-xl mx-auto space-y-md">
        {/* 最初の1つを中央に配置 */}
        <div className="flex justify-center">
          <div className="bg-brand-primary-main border border-neutral-white/30 rounded-full px-lg py-sm text-body-sm text-neutral-white shadow-sm text-center font-bold">
            {items[0]}
          </div>
        </div>

        {/* 残りを2つずつ横並びに配置 */}
        {Array.from({ length: Math.ceil((items.length - 1) / 2) }).map(
          (_, pairIndex) => {
            const startIndex = pairIndex * 2 + 1;
            const pair = items.slice(startIndex, startIndex + 2);
            return (
              <div key={pairIndex} className="grid grid-cols-2 gap-2.5">
                {pair.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-brand-primary-main border border-neutral-white/30 rounded-full px-lg py-sm text-body-sm text-neutral-white shadow-sm text-center font-bold"
                  >
                    {item}
                  </div>
                ))}
              </div>
            );
          }
        )}
      </div>

      {/* PC: 1行に全て横並び */}
      <div className="hidden md:flex justify-center items-center gap-sm lg:gap-md flex-wrap">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-brand-primary-main border border-neutral-white/30 rounded-full px-md lg:px-lg py-1 lg:py-1.5 text-body-sm lg:text-body-sm text-neutral-white shadow-sm text-center font-bold whitespace-nowrap"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
