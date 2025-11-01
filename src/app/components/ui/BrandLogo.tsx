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
  style?: React.CSSProperties;
  responsive?: boolean;
};

export function BrandLogo({
  variant = "color",
  width = 120,
  height = 40,
  priority = false,
  alt = "Youth Now! ロゴ",
  className = "",
  style,
  responsive = false,
}: BrandLogoProps) {
  const src =
    variant === "black" ? logoBlack : variant === "svg" ? logoSvg : logoColor;

  if (responsive) {
    return (
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        className={`object-contain ${className}`}
        style={{ ...style, width: 'auto', height: 'auto' }}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-contain ${className}`}
      style={style}
      priority={priority}
    />
  );
}

export default BrandLogo;
