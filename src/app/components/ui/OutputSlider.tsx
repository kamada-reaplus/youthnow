"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface OutputSample {
  image: string;
  title: string;
}

export interface OutputSliderProps {
  samples: OutputSample[];
}

export function OutputSlider({ samples }: OutputSliderProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setSlideIndex((prev) => (prev + 1) % samples.length);
  }, [samples.length]);

  const prevSlide = useCallback(() => {
    setSlideIndex((prev) => (prev === 0 ? samples.length - 1 : prev - 1));
  }, [samples.length]);

  const handleSlideClick = useCallback((index: number) => {
    setSlideIndex(index);
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Slide */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-neutral-white">
        <div className="aspect-[16/9] relative">
          {samples.map((sample, index) => (
            <div
              key={`slide-${index}`}
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === slideIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={sample.image}
                alt={sample.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority={index === 0}
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Slide Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-black/80 to-transparent p-lg z-20">
          <p
            className="text-caption md:text-body-sm lg:text-body text-neutral-white/90"
            aria-live="polite"
          >
            {samples[slideIndex].title}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-neutral-white hover:bg-brand-primary text-neutral-black hover:text-neutral-white rounded-full p-md shadow-lg transition-all duration-300 z-10"
        aria-label="前のスライド"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-neutral-white hover:bg-brand-primary text-neutral-black hover:text-neutral-white rounded-full p-md shadow-lg transition-all duration-300 z-10"
        aria-label="次のスライド"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-sm mt-lg">
        {samples.map((_, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => handleSlideClick(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === slideIndex
                ? "bg-brand-primary w-8"
                : "bg-neutral-black/20 hover:bg-neutral-black/40"
            }`}
            aria-label={`スライド${index + 1}へ移動`}
          />
        ))}
      </div>
    </div>
  );
}

export default OutputSlider;
