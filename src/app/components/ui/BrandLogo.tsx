import Image from "next/image";
import logoColor from "../../assets/logo.png";
import logoBlack from "../../assets/logo-black.png";
import logoSvg from "../../assets/logo.svg";

type BrandLogoProps = {
  variant?: "color" | "black" | "svg";
  width?: number;
  height?: number;
  priority?: boolean;
  alt?: string;
  className?: string;
};

export function BrandLogo({
  variant = "color",
  width = 120,
  height = 40,
  priority = false,
  alt = "Youth Now! ロゴ",
  className = "",
}: BrandLogoProps) {
  const src =
    variant === "black" ? logoBlack : variant === "svg" ? logoSvg : logoColor;
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-contain ${className}`}
      priority={priority}
    />
  );
}

export default BrandLogo;
