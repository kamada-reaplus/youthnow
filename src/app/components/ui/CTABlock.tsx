import Image from "next/image";
import logo from "../../assets/logo.png";

interface CTABlockProps {
  topText?: string;
  bottomText?: string;
  className?: string;
}

export function CTABlock({
  topText = "その悩み",
  bottomText = "で解決しませんか？",
  className = "",
}: CTABlockProps) {
  return (
    <div
      className={`flex flex-col text-center px-2xl py-xl md:px-3xl md:py-2xl gap-sm rounded-[48px] border-brand-primary w-full max-w-md md:max-w-lg mx-auto ${className}`}
      style={{
        background:
          "linear-gradient(102.87deg, #FFFFFF 0%, rgba(0, 187, 212, 0.8) 46.15%, rgba(255, 217, 0, 0.5) 96.63%)",
        borderWidth: "1.36377px",
      }}
    >
      {/* 上部テキスト */}
      {topText && (
        <p className="text-h5 md:text-h4 font-bold text-center text-white drop-shadow-md">
          {topText}
        </p>
      )}

      {/* ロゴ */}
      <div className="w-full max-w-[200px] md:max-w-[250px] mx-auto">
        <Image src={logo} alt="Youth Now ロゴ" className="w-full h-auto" />
      </div>

      {/* 下部テキスト */}
      {bottomText && (
        <p className="text-h5 md:text-h4 font-bold text-white drop-shadow-md">
          {bottomText}
        </p>
      )}
    </div>
  );
}
