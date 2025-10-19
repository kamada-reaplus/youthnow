interface SectionTitleProps {
  title: string;
  titleColor?: string;
}

export function SectionTitle({
  title,
  titleColor = "text-brand-primary",
}: SectionTitleProps) {
  return (
    <div className="text-center mb-4">
      {/* 大きなタイトル（PROBLEM風） */}
      <h2
        className={`text-5xl md:text-6xl font-black ${titleColor} opacity-40 leading-none`}
      >
        {title}
      </h2>
    </div>
  );
}
