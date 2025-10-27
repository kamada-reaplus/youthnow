import Image, { StaticImageData } from "next/image";

interface FeatureCardProps {
  title: string;
  description: string[];
  image: StaticImageData;
  alt: string;
}

export function FeatureCard({
  title,
  description,
  image,
  alt,
}: FeatureCardProps) {
  return (
    <div className="bg-neutral-white rounded-xl p-2.5 md:p-4 shadow-lg border-2 border-neutral-black flex flex-col h-full">
      {/* タイトル部分 - 固定高さ */}
      <div className="text-brand-primary mb-1 md:mb-1.5 text-center min-h-[2.5rem] md:min-h-[3rem] flex items-center justify-center px-1">
        <span className="block text-xs md:text-sm leading-snug">
          {title}
        </span>
      </div>
      {/* 説明文 - 固定高さ */}
      <div className="text-[10px] md:text-xs text-center mb-2 text-gray-700 leading-snug min-h-[2.5rem] md:min-h-[3rem] flex items-center justify-center px-1">
        <div>
          {description.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </div>
      {/* 画像 - 正方形を維持 */}
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        <Image src={image} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
