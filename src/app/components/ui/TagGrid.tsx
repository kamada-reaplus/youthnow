interface TagGridProps {
  items: string[];
  className?: string;
}

export function TagGrid({ items, className = "" }: TagGridProps) {
  // 奇数の場合は最初の1つを取り出し、残りを2つずつのペアに分ける
  const isOdd = items.length % 2 !== 0;
  const firstItem = isOdd ? items[0] : null;
  const remainingItems = isOdd ? items.slice(1) : items;

  // 残りのアイテムを2つずつのペアに分ける
  const pairs: string[][] = [];
  for (let i = 0; i < remainingItems.length; i += 2) {
    pairs.push(remainingItems.slice(i, i + 2));
  }

  return (
    <div
      className={`max-w-xl md:max-w-2xl mx-auto space-y-md md:space-y-lg ${className}`}
    >
      {/* 奇数の場合：最初の1つを中央に配置 */}
      {firstItem && (
        <div className="flex justify-center">
          <div className="bg-brand-primary-main border border-neutral-white/30 rounded-full px-lg md:px-xl lg:px-7 py-sm md:py-2.5 lg:py-md text-body-sm md:text-body lg:text-h6 text-neutral-white shadow-sm text-center font-bold">
            {firstItem}
          </div>
        </div>
      )}

      {/* 残りのアイテムを2つずつ横並びに配置 */}
      {pairs.map((pair, pairIndex) => (
        <div
          key={pairIndex}
          className="grid grid-cols-2 gap-2.5 md:gap-md lg:gap-lg"
        >
          {pair.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="bg-brand-primary-main border border-neutral-white/30 rounded-full px-lg md:px-xl lg:px-7 py-sm md:py-2.5 lg:py-md text-body-sm md:text-body lg:text-h6 text-neutral-white shadow-sm text-center font-bold"
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
