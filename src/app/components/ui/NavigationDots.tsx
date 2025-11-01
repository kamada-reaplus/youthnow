"use client";

import { memo } from "react";

export interface NavigationDotsProps {
  totalItems: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}

export const NavigationDots = memo(function NavigationDots({
  totalItems,
  currentIndex,
  onDotClick,
}: NavigationDotsProps) {
  return (
    <div className="flex justify-center gap-sm mt-lg">
      {Array.from({ length: totalItems }).map((_, index) => (
        <button
          key={`nav-dot-${index}`}
          onClick={() => onDotClick(index)}
          className={`w-2 h-2 rounded-full transition-all ${
            index === currentIndex
              ? "bg-brand-primary w-6"
              : "bg-neutral-black/20"
          }`}
          aria-label={`サービス${index + 1}へ移動`}
        />
      ))}
    </div>
  );
});

export default NavigationDots;
