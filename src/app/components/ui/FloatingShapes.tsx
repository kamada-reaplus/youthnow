"use client";

import { useEffect, useState } from "react";

export function FloatingShapes() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {/* Floating ellipse with brand primary */}
      <div className="absolute top-1/4 left-1/4 w-32 h-24 opacity-10 animate-float-slow">
        <svg viewBox="0 0 100 75" className="w-full h-full">
          <defs>
            <radialGradient
              id="floatEllipse1"
              cx="50%"
              cy="50%"
              rx="60%"
              ry="40%"
            >
              <stop offset="0%" stopColor="#00BCD4" />
              <stop offset="100%" stopColor="#4DD0E1" />
            </radialGradient>
          </defs>
          <ellipse
            cx="50"
            cy="37.5"
            rx="35"
            ry="25"
            fill="url(#floatEllipse1)"
            transform="rotate(15 50 37.5)"
          />
        </svg>
      </div>

      {/* Floating tilted ellipse */}
      <div className="absolute top-1/3 right-1/4 w-28 h-20 opacity-8 animate-float-medium">
        <svg viewBox="0 0 100 75" className="w-full h-full">
          <defs>
            <linearGradient
              id="floatEllipse2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFC700" />
            </linearGradient>
          </defs>
          <ellipse
            cx="50"
            cy="37.5"
            rx="32"
            ry="22"
            fill="url(#floatEllipse2)"
            transform="rotate(-25 50 37.5)"
          />
        </svg>
      </div>

      {/* Floating organic ellipse cluster */}
      <div className="absolute bottom-1/3 left-1/3 w-40 h-32 opacity-6 animate-float-fast">
        <svg viewBox="0 0 120 90" className="w-full h-full">
          <defs>
            <linearGradient
              id="floatEllipse3"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#4DD0E1" />
              <stop offset="50%" stopColor="#00BCD4" />
              <stop offset="100%" stopColor="#FFE44D" />
            </linearGradient>
          </defs>
          <ellipse
            cx="30"
            cy="45"
            rx="25"
            ry="18"
            fill="url(#floatEllipse3)"
            transform="rotate(20 30 45)"
          />
          <ellipse
            cx="70"
            cy="30"
            rx="20"
            ry="15"
            fill="url(#floatEllipse3)"
            transform="rotate(-15 70 30)"
          />
          <ellipse
            cx="60"
            cy="60"
            rx="22"
            ry="16"
            fill="url(#floatEllipse3)"
            transform="rotate(30 60 60)"
          />
        </svg>
      </div>

      {/* Small floating elliptical dots */}
      <div className="absolute top-1/2 right-1/3 w-6 h-4 opacity-12 animate-pulse">
        <svg viewBox="0 0 20 15" className="w-full h-full">
          <ellipse
            cx="10"
            cy="7.5"
            rx="8"
            ry="5"
            fill="#00BCD4"
            transform="rotate(10 10 7.5)"
          />
        </svg>
      </div>

      <div className="absolute top-2/3 left-1/2 w-5 h-3 opacity-15 animate-ping">
        <svg viewBox="0 0 20 15" className="w-full h-full">
          <ellipse
            cx="10"
            cy="7.5"
            rx="7"
            ry="4"
            fill="#FFD700"
            transform="rotate(-20 10 7.5)"
          />
        </svg>
      </div>

      <div className="absolute bottom-1/4 right-1/2 w-4 h-3 opacity-20 animate-bounce">
        <svg viewBox="0 0 20 15" className="w-full h-full">
          <ellipse
            cx="10"
            cy="7.5"
            rx="6"
            ry="3.5"
            fill="#4DD0E1"
            transform="rotate(25 10 7.5)"
          />
        </svg>
      </div>

      {/* Large background elliptical wave */}
      <div className="absolute -bottom-20 left-0 w-full h-80 opacity-4">
        <svg
          viewBox="0 0 1200 400"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="floatEllipseWave"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#00BCD4" />
              <stop offset="50%" stopColor="#4DD0E1" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
          <ellipse
            cx="300"
            cy="250"
            rx="250"
            ry="100"
            fill="url(#floatEllipseWave)"
            transform="rotate(5 300 250)"
          />
          <ellipse
            cx="700"
            cy="280"
            rx="280"
            ry="120"
            fill="url(#floatEllipseWave)"
            transform="rotate(-8 700 280)"
          />
          <ellipse
            cx="1100"
            cy="230"
            rx="220"
            ry="90"
            fill="url(#floatEllipseWave)"
            transform="rotate(12 1100 230)"
          />
        </svg>
      </div>

      {/* Elliptical pattern overlay */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 opacity-4">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <pattern
              id="ellipticalPattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <ellipse
                cx="20"
                cy="20"
                rx="3"
                ry="2"
                fill="#00BCD4"
                opacity="0.4"
                transform="rotate(15 20 20)"
              />
              <ellipse
                cx="10"
                cy="30"
                rx="2.5"
                ry="1.5"
                fill="#FFD700"
                opacity="0.3"
                transform="rotate(-30 10 30)"
              />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#ellipticalPattern)" />
        </svg>
      </div>
    </div>
  );
}
