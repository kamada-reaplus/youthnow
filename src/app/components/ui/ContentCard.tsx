import Image, { StaticImageData } from "next/image";

interface ContentCardProps {
  text: string;
  image?: StaticImageData | string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  className?: string;
  category?: string;
  number?: string;
}

export function ContentCard({
  text,
  image,
  imageAlt = "",
  imagePosition = "left",
  className = "",
  category,
  number,
}: ContentCardProps) {
  const isLeft = imagePosition === "left";

  return (
    <div
      className={`flex items-center gap-2 md:gap-3 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      } ${className}`}
    >
      {/* 画像 */}
      {image && (
        <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
          <Image
            src={image}
            alt={imageAlt}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* テキストカード */}
      <div className="bg-neutral-light-cyan border border-neutral-black rounded-3xl px-xl md:px-7 lg:px-2xl py-lg md:py-xl lg:py-xl shadow-sm flex-1 max-w-[320px] lg:max-w-[360px]">
        {/* カテゴリーと番号 */}
        {(category || number) && (
          <div className="flex items-center gap-2 md:gap-3 mb-md md:mb-lg flex-wrap">
            {number && (
              <span className="inline-flex items-center justify-center bg-brand-primary text-neutral-white font-bold text-sm md:text-base lg:text-lg px-2.5 md:px-3 lg:px-3.5 py-1 md:py-1.5 lg:py-1.5 rounded-full whitespace-nowrap flex-shrink-0">
                課題{number}
              </span>
            )}
            {category && (
              <span className="text-base md:text-xl lg:text-2xl font-bold text-brand-primary whitespace-nowrap">
                {category}
              </span>
            )}
          </div>
        )}

        <p className="text-body-sm md:text-body lg:text-h6 text-neutral-black/70 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}
