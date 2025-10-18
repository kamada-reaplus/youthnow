import Image, { StaticImageData } from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
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
    <div className="bg-neutral-white rounded-xl p-2.5 md:p-4 shadow-lg border-2 border-neutral-black">
      <div className="text-brand-primary mb-1.5 text-center">
        <span className="block font-bold text-xs md:text-sm">{title}</span>
      </div>
      <div
        className="text-[10px] md:text-xs text-center mb-2 text-gray-700 leading-tight"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
        <Image src={image} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
