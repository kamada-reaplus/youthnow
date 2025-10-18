interface SectionDecorationProps {
  variant?: "circles" | "triangles" | "lines" | "dots";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: "sm" | "md" | "lg";
  opacity?: "low" | "medium" | "high";
  className?: string;
}

export function SectionDecoration({
  variant = "circles",
  position = "top-right",
  size = "md",
  opacity = "low",
  className = "",
}: SectionDecorationProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  const opacityClasses = {
    low: "opacity-5",
    medium: "opacity-10",
    high: "opacity-15",
  };

  const renderDecoration = () => {
    switch (variant) {
      case "circles":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient
                id={`circles-${position}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00BCD4" />
                <stop offset="100%" stopColor="#4DD0E1" />
              </linearGradient>
            </defs>
            <circle cx="25" cy="25" r="8" fill={`url(#circles-${position})`} />
            <circle cx="75" cy="35" r="12" fill="#FFD700" opacity="0.7" />
            <circle cx="45" cy="70" r="6" fill="#4DD0E1" />
          </svg>
        );

      case "triangles":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient
                id={`triangles-${position}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFC700" />
              </linearGradient>
            </defs>
            <polygon
              points="20,80 30,60 40,80"
              fill={`url(#triangles-${position})`}
            />
            <polygon points="60,40 75,20 90,40" fill="#00BCD4" opacity="0.6" />
            <polygon points="10,30 20,15 30,30" fill="#4DD0E1" />
          </svg>
        );

      case "lines":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient
                id={`lines-${position}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00BCD4" />
                <stop offset="50%" stopColor="#4DD0E1" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
            </defs>
            <path
              d="M10,50 Q30,30 50,50 T90,50"
              stroke={`url(#lines-${position})`}
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M20,20 L80,20"
              stroke="#FFD700"
              strokeWidth="1.5"
              opacity="0.7"
            />
            <path d="M15,80 Q50,60 85,80" stroke="#4DD0E1" strokeWidth="1" />
          </svg>
        );

      case "dots":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="20" cy="20" r="2" fill="#00BCD4" />
            <circle cx="50" cy="15" r="1.5" fill="#FFD700" />
            <circle cx="80" cy="25" r="2.5" fill="#4DD0E1" />
            <circle cx="15" cy="50" r="1" fill="#FFC700" />
            <circle cx="45" cy="45" r="2" fill="#00BCD4" opacity="0.7" />
            <circle cx="75" cy="55" r="1.5" fill="#FFE44D" />
            <circle cx="25" cy="80" r="2" fill="#4DD0E1" />
            <circle cx="60" cy="75" r="1" fill="#00BCD4" />
            <circle cx="85" cy="85" r="1.5" fill="#FFD700" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} ${opacityClasses[opacity]} ${className} pointer-events-none`}
    >
      {renderDecoration()}
    </div>
  );
}
