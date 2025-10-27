import { Frown, Check } from "lucide-react";

interface ProblemCardProps {
  items: string[];
  variant?: "problem" | "capability";
  layout?: "vertical" | "horizontal";
}

export function ProblemCard({
  items,
  variant = "problem",
  layout = "vertical",
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
      ? "text-body text-neutral-black"
      : "text-body text-neutral-black";
  };

  const getContainerClass = () => {
    if (layout === "vertical") return "space-y-md";

    // horizontal layout: 2 items = 2 cols, 3+ items = 3 cols
    const cols =
      items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";
    return `grid grid-cols-1 ${cols} gap-md`;
  };

  const containerClass = getContainerClass();

  const getItemLayout = () => {
    if (layout === "vertical") {
      return "flex items-center gap-md pl-4 md:pl-20";
    }
    // horizontal: center alignment for capability cards
    return variant === "capability"
      ? "flex flex-col items-center gap-md text-center"
      : "flex items-center gap-md pl-4";
  };

  return (
    <div className={containerClass}>
      {items.map((item, index) => (
        <div key={index} className={`${getCardBackground()} rounded-2xl p-lg`}>
          <div className={getItemLayout()}>
            {renderIcon()}
            <div
              className={
                layout === "horizontal" && variant === "capability"
                  ? ""
                  : "flex-1"
              }
            >
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
