"use client";

import { LucideIcon } from "lucide-react";
import { parseTextWithMarker } from "@/app/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  category: string;
  catchphrase: string;
  description: string;
  badge?: string;
  className?: string;
}

export function ServiceCard({
  icon: Icon,
  title,
  category,
  catchphrase,
  description,
  className = "",
}: ServiceCardProps) {
  return (
    <div
      className={`bg-neutral-white border-2 border-neutral-black/10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 md:p-6 group hover:border-brand-primary/40 relative overflow-hidden flex flex-col h-[280px] md:min-h-[300px] md:h-auto ${className}`}
    >
      {/* Top accent bar - appears on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Icon - 濃い水色で強調 */}
      <div className="flex justify-center mb-3 md:mb-4 flex-shrink-0">
        <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
          <Icon className="w-8 h-8 md:w-9 md:h-9 text-brand-primary stroke-[2.5]" />
        </div>
      </div>

      {/* Title - バッジデザイン */}
      <div className="flex justify-center mb-2 md:mb-3 flex-shrink-0">
        <div className="inline-block bg-brand-primary text-white px-4 py-2 rounded-full shadow-sm">
          <h3 className="font-bold text-sm md:text-base leading-tight text-center">
            {title}
          </h3>
        </div>
      </div>

      {/* Category Tag - アクセントカラー */}
      <div className="flex justify-center mb-2 md:mb-3 flex-shrink-0">
        <span className="text-brand-primary text-xs md:text-sm font-bold">
          【{category}】
        </span>
      </div>

      {/* Catchphrase - 中太で目立たせる */}
      <p className="text-sm md:text-base font-semibold text-gray-800 text-center mb-2 md:mb-3 leading-snug flex-shrink-0">
        {parseTextWithMarker(catchphrase)}
      </p>

      {/* Description - 小さく薄く */}
      <div className="flex-grow flex items-start justify-center overflow-hidden">
        <p className="text-xs md:text-sm font-normal text-gray-600 text-center leading-relaxed">
          {parseTextWithMarker(description)}
        </p>
      </div>
    </div>
  );
}
