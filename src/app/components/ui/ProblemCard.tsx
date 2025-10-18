import { Frown, Check } from "lucide-react";

interface ProblemCardProps {
  items: string[];
  variant?: "problem" | "capability";
}

export function ProblemCard({
  items,
  variant = "problem",
}: ProblemCardProps) {
  const isProblem = variant === "problem";

  const renderIcon = () => {
    if (isProblem) {
      return (
        <div className="flex-shrink-0 w-12 h-12 bg-neutral-black/10 rounded-full flex items-center justify-center">
          <Frown className="w-7 h-7 text-neutral-black/50" />
        </div>
      );
    }
    return (
      <div className="flex-shrink-0 w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center">
        <Check className="w-5 h-5 text-neutral-white" strokeWidth={3} />
      </div>
    );
  };

  const getCardBackground = () => {
    return isProblem ? "bg-neutral-black/10" : "bg-neutral-white shadow-sm";
  };

  const getTextStyle = () => {
    return isProblem
      ? "text-body text-neutral-black font-bold"
      : "text-body text-neutral-black font-bold";
  };

  return (
    <div className="space-y-md">
      {items.map((item, index) => (
        <div key={index} className={`${getCardBackground()} rounded-2xl p-lg`}>
          <div className="flex items-center gap-md pl-4 md:pl-20">
            {renderIcon()}
            <div>
              <p
                className={`${getTextStyle()} leading-relaxed whitespace-pre-line`}
              >
                {item}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
