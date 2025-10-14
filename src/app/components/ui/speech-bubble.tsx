import React from "react";
import Image from "next/image";
import problemImage from "../../assets/problem.png";

interface SpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
  tailPosition?: "left" | "right";
  tailOffset?: string;
}

export function SpeechBubble({
  children,
  className = "",
  tailPosition = "left",
  tailOffset = "left-8 md:left-12 lg:left-14",
}: SpeechBubbleProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Speech bubble */}
      <div className="bg-neutral-white border border-neutral-light rounded-3xl px-md md:px-lg lg:px-xl py-sm md:py-md lg:py-lg shadow-sm relative">
        {children}

        {/* Tail - 吹き出しの尻尾 */}
        <div
          className={`absolute -bottom-2.5 md:-bottom-3 ${
            tailPosition === "left"
              ? tailOffset
              : tailOffset.replace("left", "right")
          }`}
        >
          <div className="w-5 h-5 md:w-6 md:h-6 bg-neutral-white border-b border-r border-neutral-light rotate-45" />
        </div>
      </div>
    </div>
  );
}

interface CharacterPlaceholderProps {
  className?: string;
}

export function CharacterPlaceholder({
  className = "",
}: CharacterPlaceholderProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative w-64 md:w-80 lg:w-96 h-48 md:h-60 lg:h-72">
        {/* Character image */}
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={problemImage}
            alt="Problem character"
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

// デフォルトエクスポート（Frameの代替）
export default CharacterPlaceholder;
