interface SectionDividerProps {
  variant?: "wave" | "blob" | "geometric" | "curve";
  flip?: boolean;
  className?: string;
}

export function SectionDivider({
  variant = "wave",
  flip = false,
  className = "",
}: SectionDividerProps) {
  const baseClasses = `w-full h-16 md:h-24 overflow-hidden ${
    flip ? "rotate-180" : ""
  } ${className}`;

  const renderSVG = () => {
    switch (variant) {
      case "wave":
        return (
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="waveGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#00BCD4" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#4DD0E1" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path
              d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
              fill="url(#waveGradient)"
            />
          </svg>
        );

      case "blob":
        return (
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="blobGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#00BCD4" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            <path
              d="M0,80 Q200,20 400,60 Q600,100 800,40 Q1000,0 1200,60 L1200,120 L0,120 Z"
              fill="url(#blobGradient)"
            />
          </svg>
        );

      case "geometric":
        return (
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="geometricGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#4DD0E1" stopOpacity="0.06" />
                <stop offset="50%" stopColor="#FFD700" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#00BCD4" stopOpacity="0.06" />
              </linearGradient>
            </defs>
            <polygon
              points="0,120 200,40 400,80 600,20 800,70 1000,30 1200,60 1200,120"
              fill="url(#geometricGradient)"
            />
          </svg>
        );

      case "curve":
        return (
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="curveGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#00BCD4" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#FFE44D" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path
              d="M0,40 C300,80 600,0 900,50 C1050,75 1150,25 1200,40 L1200,120 L0,120 Z"
              fill="url(#curveGradient)"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return <div className={baseClasses}>{renderSVG()}</div>;
}
