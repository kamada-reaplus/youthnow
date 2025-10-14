import imgMessageSent11 from "../../assets/a6098e93863e363299deaa059f7a3078ffa6a4b2.png";
import imgVlog11 from "../../assets/b43e6154c79ff2cfc4f6b4614a63f3cfc5d1edfe.png";
import imgSurvey1 from "../../assets/5253e49509695ee36fe8d7d54cde8555d7e000e0.png";
import Image from "next/image";
import logoHeader from "../../assets/header-logo.png";
import { ContactButton } from "../ui/ContactButton";

// デザインシステム使用コンポーネント
// - カラー: brand-primary, brand-secondary, neutral-white など
// - スペーシング: px-lg, py-lg, gap-xl など
// - タイポグラフィ: text-h1, text-body, text-body-sm など

export function Hero() {
  return (
    <section className="bg-brand-primary text-neutral-white pt-sm md:pt-lg pb-lg md:pb-2xl px-lg md:px-xl overflow-hidden relative min-h-screen flex flex-col">
      {/* Background blur effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute -top-20 -left-12 w-[700px] h-[580px] bg-brand-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 flex flex-col justify-between flex-1 py-sm md:py-lg">
        {/* Top Section - Logo */}
        <div className="flex justify-center pt-lg md:pt-2xl">
          <div className="relative">
            <Image
              src={logoHeader}
              alt="Youth Now Logo"
              width={1200}
              height={300}
              className="h-4xl md:h-6xl lg:h-28 xl:h-32 w-auto"
            />
          </div>
        </div>

        {/* Middle Section - Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl lg:gap-4xl items-center w-full max-w-6xl">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-right">
              <div className="relative" style={{ transform: "rotate(-5deg)" }}>
                <div className="text-center space-y-lg md:space-y-xl">
                  <h1 className="text-neutral-white text-h1 font-bold leading-tight">
                    若年層が
                  </h1>
                  <div className="bg-brand-secondary text-brand-secondary px-xl py-md md:px-2xl md:py-lg rounded-full shadow-lg relative inline-block">
                    <h1 className="text-brand-primary text-h1 font-bold whitespace-nowrap">
                      &quot;本当に買いたい&quot;
                    </h1>
                  </div>
                  <h1 className="text-neutral-white text-h1 font-bold leading-tight">
                    ものがわかる!
                  </h1>
                </div>
              </div>
            </div>

            {/* Right Column - Image Placeholder */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-md lg:max-w-lg h-[250px] md:h-[300px] lg:h-[350px] bg-neutral-white/10 rounded-2xl backdrop-blur-sm border border-neutral-white/20 flex items-center justify-center">
                <p className="text-neutral-white/60 text-h6 md:text-h5">
                  画像エリア
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Features & CTA */}
        <div className="space-y-xl md:space-y-2xl">
          {/* Features - Horizontal Layout */}
          <div className="grid grid-cols-3 gap-lg md:gap-2xl lg:gap-3xl max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-[90px] md:w-[120px] lg:w-[140px] h-[90px] md:h-[120px] lg:h-[140px] mx-auto mb-md md:mb-lg rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={imgMessageSent11}
                  alt="最短24時間"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-body-sm md:text-body lg:text-h6 font-bold mb-xs md:mb-sm">
                最短24時間
              </div>
              <div className="text-caption md:text-body-sm text-neutral-white/80 leading-tight">
                数千人から本音収集
              </div>
            </div>
            <div className="text-center">
              <div className="w-[90px] md:w-[120px] lg:w-[140px] h-[90px] md:h-[120px] lg:h-[140px] mx-auto mb-md md:mb-lg rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={imgVlog11}
                  alt="発信源に調査"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-body-sm md:text-body lg:text-h6 font-bold mb-xs md:mb-sm">
                発信源に調査
              </div>
              <div className="text-caption md:text-body-sm text-neutral-white/80 leading-tight">
                インフルエンサー直接調査
              </div>
            </div>
            <div className="text-center">
              <div className="w-[90px] md:w-[120px] lg:w-[140px] h-[90px] md:h-[120px] lg:h-[140px] mx-auto mb-md md:mb-lg rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={imgSurvey1}
                  alt="圧倒的コスパ"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-body-sm md:text-body lg:text-h6 font-bold mb-xs md:mb-sm">
                圧倒的コスパ
              </div>
              <div className="text-caption md:text-body-sm text-neutral-white/80 leading-tight">
                1/8のコスト・1/10の期間
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center space-y-md md:space-y-lg">
            <ContactButton />
          </div>
        </div>
      </div>
    </section>
  );
}
