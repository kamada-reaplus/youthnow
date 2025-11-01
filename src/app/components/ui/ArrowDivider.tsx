import Image from "next/image";
import arrow from "../../assets/arrow_yellow.png";

type ArrowDividerProps = {
  className?: string;
  widthClass?: string; // 例: "w-16"
  alt?: string;
};

export function ArrowDivider({
  className = "mb-xl flex justify-center md:mb-lg",
  widthClass = "w-16 lg:w-16",
  alt = "矢印",
}: ArrowDividerProps) {
  return (
    <div className={className}>
      <div className={widthClass}>
        <Image src={arrow} alt={alt} className="h-auto w-full" loading="lazy" />
      </div>
    </div>
  );
}

export default ArrowDivider;
