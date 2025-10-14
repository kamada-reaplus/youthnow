interface SectionHeaderProps {
  title: string;
  className?: string;
  leadingTight?: boolean;
  textColor?: string;
  centered?: boolean;
  responsive?: boolean;
}

export function SectionHeader({
  title,
  className = "mb-section-spacing",
  leadingTight = false,
  textColor = "text-neutral-dark",
  centered = true,
  responsive = false,
}: SectionHeaderProps) {
  // 改行を含むタイトルをJSXとしてレンダリング
  const titleWithBreaks = title.split("<br />").map((part, index, array) => (
    <span key={index}>
      {part}
      {index < array.length - 1 && <br />}
    </span>
  ));

  const textSizeClass = responsive
    ? "text-h2 md:text-h1 lg:text-display"
    : "text-h2";

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <div className="relative inline-block">
        <h2
          className={`${textSizeClass} font-bold ${textColor} ${
            leadingTight ? "leading-tight" : ""
          } relative z-10`}
        >
          {titleWithBreaks}
        </h2>
      </div>
    </div>
  );
}
